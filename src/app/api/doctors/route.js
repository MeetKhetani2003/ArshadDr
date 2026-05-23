import { NextResponse } from "next/server";
import dbConnect, { getGridFSBucket } from "@/lib/mongodb";
import Doctor from "@/models/Doctor";
import { Readable } from "stream";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const doctors = await Doctor.find({}).sort({ createdAt: -1 });
    return NextResponse.json(doctors);
  } catch (error) {
    console.error("Doctors GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();
    
    const name = formData.get("name");
    const slug = formData.get("slug");
    const role = formData.get("role");
    const specialization = formData.get("specialization");
    const experience = formData.get("experience");
    const rating = formData.get("rating") || "4.9/5.0";
    const patients = formData.get("patients") || "2,500+";
    const successRate = formData.get("successRate") || "99%";
    const bio = formData.get("bio");
    const journeyStr = formData.get("journey") || "";
    const file = formData.get("image");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 });
    }

    const bucket = await getGridFSBucket();
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

    const imageId = uploadStream.id.toString();

    let journey = [];
    try {
      journey = JSON.parse(journeyStr);
    } catch(e) {
      journey = journeyStr.split('\n').filter(s => s.trim());
    }

    const doctor = await Doctor.create({
      name, slug, role, specialization, experience, bio, journey, imageId, rating, patients, successRate
    });

    return NextResponse.json(doctor, { status: 201 });
  } catch (error) {
    console.error("Doctor POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
