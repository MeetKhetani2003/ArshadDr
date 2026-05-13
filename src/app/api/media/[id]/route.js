import { NextResponse } from "next/server";
import { getGridFSBucket } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const bucket = await getGridFSBucket();
    
    const fileId = new mongoose.Types.ObjectId(id);
    const files = await bucket.find({ _id: fileId }).toArray();
    
    if (!files.length) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const file = files[0];
    const stream = bucket.openDownloadStream(fileId);

    // Convert stream to ReadableStream for NextResponse
    const webStream = new ReadableStream({
      start(controller) {
        stream.on("data", (chunk) => controller.enqueue(chunk));
        stream.on("end", () => controller.close());
        stream.on("error", (err) => controller.error(err));
      },
    });

    return new NextResponse(webStream, {
      headers: {
        "Content-Type": file.contentType || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
