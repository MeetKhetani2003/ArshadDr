import { NextResponse } from "next/server";
import dbConnect, { getGridFSBucket } from "@/lib/mongodb";
import GalleryItem from "@/models/GalleryItem";
import mongoose from "mongoose";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const item = await GalleryItem.findById(id);
    if (!item) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }

    if (item.type === "image" && item.imageId) {
      try {
        const bucket = await getGridFSBucket();
        await bucket.delete(new mongoose.Types.ObjectId(item.imageId));
      } catch (err) {
        console.error("Failed to delete image from GridFS:", err);
        // We continue to delete the item from db even if GridFS file delete fails
      }
    }

    await GalleryItem.findByIdAndDelete(id);

    return NextResponse.json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    console.error("Gallery DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
