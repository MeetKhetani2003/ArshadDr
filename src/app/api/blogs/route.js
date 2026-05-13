import { NextResponse } from "next/server";
import dbConnect, { getGridFSBucket } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { Readable } from "stream";

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    
    // Add safe slugs for any legacy data
    const sanitizedBlogs = blogs.map(b => {
      const doc = b.toObject();
      if (!doc.slug) {
        doc.slug = doc.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
      }
      return doc;
    });

    return NextResponse.json(sanitizedBlogs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
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

    let imageId = null;

    if (file && typeof file !== "string") {
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
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      author,
      category,
      readTime,
      tags,
      imageId,
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Blog Upload Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
