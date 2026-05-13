import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: "Dr. Arshad Solanki" },
  category: { type: String, default: "Clinical" },
  readTime: { type: String, default: "5 min read" },
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: "media.files" },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
