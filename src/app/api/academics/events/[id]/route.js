import { NextResponse } from "next/server";
import dbConnect, { getGridFSBucket } from "@/lib/mongodb";
import AcademicsEvent from "@/models/AcademicsEvent";
import GalleryItem from "@/models/GalleryItem";
import mongoose from "mongoose";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    await dbConnect();
    const event = await AcademicsEvent.findById(id);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const bucket = await getGridFSBucket();

    // Delete the cover image from GridFS
    try {
      if (event.coverImageId) {
        await bucket.delete(new mongoose.Types.ObjectId(event.coverImageId));
      }
    } catch (e) {
      console.warn("Could not delete cover image from GridFS", e);
    }

    // Find and delete all associated GalleryItems and their GridFS images
    const galleryItems = await GalleryItem.find({ eventId: id });
    for (const item of galleryItems) {
      if (item.type === "image" && item.imageId) {
        try {
          await bucket.delete(new mongoose.Types.ObjectId(item.imageId));
        } catch (e) {
          console.warn("Could not delete gallery image from GridFS", e);
        }
      }
      await GalleryItem.findByIdAndDelete(item._id);
    }

    await AcademicsEvent.findByIdAndDelete(id);

    return NextResponse.json({ message: "Event and associated media deleted successfully" });
  } catch (error) {
    console.error("Event DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    await dbConnect();
    const event = await AcademicsEvent.findById(id);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const file = formData.get("image");

    if (title) event.title = title;
    if (description !== null) event.description = description;

    if (file && typeof file !== "string") {
      const bucket = await getGridFSBucket();
      
      // Delete old cover image
      if (event.coverImageId) {
        try {
          await bucket.delete(new mongoose.Types.ObjectId(event.coverImageId));
        } catch (e) {
          console.warn("Could not delete old cover image from GridFS", e);
        }
      }

      // Upload new cover image
      const { Readable } = await import("stream");
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

      event.coverImageId = uploadStream.id;
    }

    await event.save();

    return NextResponse.json(event);
  } catch (error) {
    console.error("Event PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
