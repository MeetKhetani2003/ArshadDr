import { NextResponse } from "next/server";
import dbConnect, { getGridFSBucket } from "@/lib/mongodb";
import GalleryItem from "@/models/GalleryItem";
import { Readable } from "stream";

export async function GET() {
  try {
    await dbConnect();
    const items = await GalleryItem.find({}).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    console.error("Gallery GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();
    
    const type = formData.get("type");
    const title = formData.get("title") || "";
    const videoUrl = formData.get("videoUrl") || "";
    const file = formData.get("image");

    if (!type || (type !== "image" && type !== "video")) {
      return NextResponse.json({ error: "Invalid gallery item type" }, { status: 400 });
    }

    let imageId = null;

    if (type === "image") {
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

      imageId = uploadStream.id;
    } else if (type === "video") {
      if (!videoUrl) {
        return NextResponse.json({ error: "YouTube Video URL is required" }, { status: 400 });
      }
    }

    const item = await GalleryItem.create({
      type,
      title,
      imageId,
      videoUrl: type === "video" ? videoUrl : undefined,
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Gallery Upload Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
