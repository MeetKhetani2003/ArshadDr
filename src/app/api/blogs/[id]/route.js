import { NextResponse } from "next/server";
import dbConnect, { getGridFSBucket } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import mongoose from "mongoose";
import { Readable } from "stream";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (blog.imageId) {
      try {
        const bucket = await getGridFSBucket();
        await bucket.delete(new mongoose.Types.ObjectId(blog.imageId));
      } catch (err) {
        console.warn("Failed to delete image from GridFS:", err);
      }
    }

    await Blog.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Blog DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const slug = formData.get("slug") || title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    const excerpt = formData.get("excerpt");
    const content = formData.get("content");
    const author = formData.get("author");
    const category = formData.get("category");
    const readTime = formData.get("readTime");
    const tags = formData.get("tags")?.split(",") || [];
    const file = formData.get("image");

    let updateData = { title, slug, excerpt, content, author, category, readTime, tags };

    if (file && typeof file !== "string") {
      const bucket = await getGridFSBucket();
      
      if (blog.imageId) {
        try {
          await bucket.delete(new mongoose.Types.ObjectId(blog.imageId));
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

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Blog PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
