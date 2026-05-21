import { NextResponse } from "next/server";
import dbConnect, { getGridFSBucket } from "@/lib/mongodb";
import Doctor from "@/models/Doctor";
import mongoose from "mongoose";
import { Readable } from "stream";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    // Next.js 15: params is a promise
    const { id } = await params;
    
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    let doctor;
    
    if (isObjectId) {
      doctor = await Doctor.findById(id);
    }
    if (!doctor) {
      doctor = await Doctor.findOne({ slug: id });
    }
    
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }
    
    return NextResponse.json(doctor);
  } catch (error) {
    console.error("Doctor GET [id] Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    if (doctor.imageId) {
      try {
        const bucket = await getGridFSBucket();
        await bucket.delete(new mongoose.Types.ObjectId(doctor.imageId));
      } catch (err) {
        console.warn("Failed to delete image from GridFS:", err);
      }
    }

    await Doctor.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Doctor DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const name = formData.get("name");
    const slug = formData.get("slug");
    const role = formData.get("role");
    const specialization = formData.get("specialization");
    const experience = formData.get("experience");
    const rating = formData.get("rating");
    const patients = formData.get("patients");
    const successRate = formData.get("successRate");
    const bio = formData.get("bio");
    const journeyStr = formData.get("journey") || "";
    const file = formData.get("image");

    let updateData = { name, slug, role, specialization, experience, rating, patients, successRate, bio };

    try {
      updateData.journey = JSON.parse(journeyStr);
    } catch(e) {
      updateData.journey = journeyStr.split('\n').filter(s => s.trim());
    }

    if (file && typeof file !== "string") {
      const bucket = await getGridFSBucket();
      
      if (doctor.imageId) {
        try {
          await bucket.delete(new mongoose.Types.ObjectId(doctor.imageId));
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
        stream.pipe(uploadStream)
          .on("finish", resolve)
          .on("error", reject);
      });

      updateData.imageId = uploadStream.id.toString();
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updatedDoctor);
  } catch (error) {
    console.error("Doctor PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
