"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle, Loader2, Image as ImageIcon, Type, AlignLeft, User, Hash, Clock, Tag } from "lucide-react";

export default function AdminBlogUpload() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSuccess(true);
        e.target.reset();
        setImagePreview(null);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const err = await res.json();
        alert(`Upload failed: ${err.error}`);
      }
    } catch (err) {
      alert("Upload failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-site max-w-5xl">
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-medical-blue p-10 text-white flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Clinical Journal Editor</h1>
              <p className="text-slate-400 mt-2 font-medium">Create a high-fidelity medical article</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
              <Type size={32} className="text-medical-teal" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-10">
            {/* Header Section: Title & Slug */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Article Title</label>
                <div className="relative">
                  <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    required
                    name="title"
                    placeholder="e.g., Advances in Neuro-Rehab"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">URL Slug (Auto-generated if empty)</label>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    name="slug"
                    placeholder="advances-in-neuro-rehab"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Media Section */}
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Featured Image</label>
              <div className="relative group">
                <input
                  required
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className="w-full aspect-[21/9] bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center group-hover:border-medical-teal transition-colors overflow-hidden">
                  {imagePreview ? (
                    <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <>
                      <ImageIcon className="text-slate-300 mb-3" size={48} />
                      <p className="text-sm font-bold text-slate-400">Click to upload high-res cover image</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Excerpt Section */}
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Short Excerpt (Search Preview)</label>
              <div className="relative">
                <AlignLeft className="absolute left-4 top-4 text-slate-300" size={18} />
                <textarea
                  required
                  name="excerpt"
                  rows={2}
                  placeholder="A brief summary for the blog listing page..."
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all resize-none"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Article Content (Supports Markdown)</label>
              <textarea
                required
                name="content"
                rows={12}
                placeholder="Write your comprehensive clinical article here..."
                className="w-full px-6 py-6 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all resize-none font-mono text-sm"
              />
            </div>

            {/* Metadata Section */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Author</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    name="author"
                    defaultValue="Dr. Asad Solanki"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Category</label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <select
                    name="category"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal appearance-none"
                  >
                    <option>Orthopedic</option>
                    <option>Neurology</option>
                    <option>Advanced Therapy</option>
                    <option>Women's Health</option>
                    <option>Pediatric</option>
                    <option>Geriatric</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Read Time</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    name="readTime"
                    defaultValue="5 min read"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all"
                  />
                </div>
              </div>
            </div>

            <button
              disabled={isSubmitting}
              className="w-full py-6 bg-medical-blue text-white rounded-[2rem] font-bold text-lg hover:bg-medical-teal hover:-translate-y-1 transition-all shadow-xl flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : success ? (
                <><CheckCircle /> Published Successfully!</>
              ) : (
                <><Upload /> Publish to Clinical Journal</>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
