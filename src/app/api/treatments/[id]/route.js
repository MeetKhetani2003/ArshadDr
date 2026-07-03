import { NextResponse } from "next/server";
import dbConnect, { getGridFSBucket } from "@/lib/mongodb";
import Treatment from "@/models/Treatment";
import mongoose from "mongoose";
import { Readable } from "stream";
import { getTreatmentBySlug as getStaticTreatment } from "@/data/treatments";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    let treatment;
    
    if (isObjectId) {
      treatment = await Treatment.findById(id);
    }
    if (!treatment) {
      treatment = await Treatment.findOne({ slug: id });
    }
    if (!treatment) {
      // Try static fallback
      const staticTreatment = getStaticTreatment(id);
      if (staticTreatment) {
        return NextResponse.json(staticTreatment);
      }
      return NextResponse.json({ error: "Treatment not found" }, { status: 404 });
    }
    
    return NextResponse.json(treatment);
  } catch (error) {
    console.error("Treatment GET [id] Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const treatment = await Treatment.findById(id);
    if (!treatment) {
      return NextResponse.json({ error: "Treatment not found" }, { status: 404 });
    }

    const bucket = await getGridFSBucket();

    // Helper to delete from GridFS
    const deleteFromGridFS = async (fileId) => {
      if (fileId && mongoose.Types.ObjectId.isValid(fileId)) {
        try {
          await bucket.delete(new mongoose.Types.ObjectId(fileId));
        } catch (err) {
          console.warn(`Failed to delete GridFS file ${fileId}:`, err);
        }
      }
    };

    await deleteFromGridFS(treatment.image);
    await deleteFromGridFS(treatment.protocolImage);

    await Treatment.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Treatment DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const treatment = await Treatment.findById(id);
    if (!treatment) {
      return NextResponse.json({ error: "Treatment not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const slug = formData.get("slug");
    const icon = formData.get("icon") || "🩺";
    const shortDesc = formData.get("shortDesc");
    const color = formData.get("color") || "#0d9488";
    const fullDescription = formData.get("fullDescription") || "";
    const conditionsStr = formData.get("conditions") || "";
    const techniquesStr = formData.get("techniques") || "";
    
    const imageFile = formData.get("image");
    const protocolImageFile = formData.get("protocolImage");

    let updateData = { title, slug, icon, shortDesc, color, fullDescription };

    try {
      updateData.conditions = JSON.parse(conditionsStr);
    } catch(e) {
      updateData.conditions = conditionsStr.split('\n').map(s => s.trim()).filter(Boolean);
    }

    try {
      updateData.techniques = JSON.parse(techniquesStr);
    } catch(e) {
      updateData.techniques = techniquesStr.split('\n').map(s => s.trim()).filter(Boolean);
    }

    const bucket = await getGridFSBucket();

    // Helper to handle updating GridFS images
    const handleImageUpdate = async (file, oldFieldVal) => {
      if (file && typeof file !== "string" && file.size > 0) {
        // Delete old image if it exists and is an ObjectId
        if (oldFieldVal && mongoose.Types.ObjectId.isValid(oldFieldVal)) {
          try {
            await bucket.delete(new mongoose.Types.ObjectId(oldFieldVal));
          } catch (err) {
            console.warn("Failed to delete old image:", err);
          }
        }
        
        const buffer = Buffer.from(await file.arrayBuffer());
        const stream = Readable.from(buffer);
        const uploadStream = bucket.openUploadStream(file.name, {
          contentType: file.type,
        });
        await new Promise((resolve, reject) => {
          stream.pipe(uploadStream).on("finish", resolve).on("error", reject);
        });
        return uploadStream.id.toString();
      }
      return undefined;
    };

    const newImage = await handleImageUpdate(imageFile, treatment.image);
    if (newImage !== undefined) {
      updateData.image = newImage;
    }

    const newProtocolImage = await handleImageUpdate(protocolImageFile, treatment.protocolImage);
    if (newProtocolImage !== undefined) {
      updateData.protocolImage = newProtocolImage;
    }

    const updatedTreatment = await Treatment.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updatedTreatment);
  } catch (error) {
    console.error("Treatment PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
