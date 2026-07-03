import { NextResponse } from "next/server";
import dbConnect, { getGridFSBucket } from "@/lib/mongodb";
import Treatment from "@/models/Treatment";
import { treatments as staticTreatments } from "@/data/treatments";
import { Readable } from "stream";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const dbTreatments = await Treatment.find({}).sort({ createdAt: -1 });
    
    // Merge dbTreatments with static treatments. dbTreatments take precedence.
    const merged = JSON.parse(JSON.stringify(dbTreatments));
    const dbSlugs = new Set(dbTreatments.map(t => t.slug));
    
    for (const t of staticTreatments) {
      if (!dbSlugs.has(t.slug)) {
        merged.push(t);
      }
    }
    
    return NextResponse.json(merged);
  } catch (error) {
    console.error("Treatments GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
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

    const bucket = await getGridFSBucket();

    // Helper to upload file to GridFS
    const uploadToGridFS = async (file) => {
      if (!file || typeof file === "string" || file.size === 0) return null;
      const buffer = Buffer.from(await file.arrayBuffer());
      const stream = Readable.from(buffer);
      const uploadStream = bucket.openUploadStream(file.name, {
        contentType: file.type,
      });
      await new Promise((resolve, reject) => {
        stream.pipe(uploadStream).on("finish", resolve).on("error", reject);
      });
      return uploadStream.id.toString();
    };

    const image = await uploadToGridFS(imageFile);
    const protocolImage = await uploadToGridFS(protocolImageFile);

    let conditions = [];
    try {
      conditions = JSON.parse(conditionsStr);
    } catch (e) {
      conditions = conditionsStr.split('\n').map(s => s.trim()).filter(Boolean);
    }

    let techniques = [];
    try {
      techniques = JSON.parse(techniquesStr);
    } catch (e) {
      techniques = techniquesStr.split('\n').map(s => s.trim()).filter(Boolean);
    }

    const treatment = await Treatment.create({
      title,
      slug,
      icon,
      shortDesc,
      color,
      fullDescription,
      conditions,
      techniques,
      image,
      protocolImage
    });

    return NextResponse.json(treatment, { status: 201 });
  } catch (error) {
    console.error("Treatment POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
