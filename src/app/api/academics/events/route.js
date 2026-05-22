import { NextResponse } from "next/server";
import dbConnect, { getGridFSBucket } from "@/lib/mongodb";
import AcademicsEvent from "@/models/AcademicsEvent";
import { Readable } from "stream";
import mongoose from "mongoose";

export async function GET() {
  try {
    await dbConnect();
    const events = await AcademicsEvent.find({}).sort({ createdAt: -1 });
    return NextResponse.json(events);
  } catch (error) {
    console.error("Events GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();
    
    const title = formData.get("title");
    const description = formData.get("description") || "";
    const file = formData.get("image");

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Cover image is required" }, { status: 400 });
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

    const coverImageId = uploadStream.id;

    const event = await AcademicsEvent.create({
      title,
      description,
      coverImageId,
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Events POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
