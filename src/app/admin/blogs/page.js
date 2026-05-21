"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle, Loader2, Image as ImageIcon, Type, AlignLeft, User, Hash, Clock, Tag, Bold, Italic, Underline, Highlighter, Heading1, Heading2, Heading3, List, ListOrdered, Edit, Trash2, X } from "lucide-react";
import Image from "next/image";

export default function AdminBlogUpload() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [content, setContent] = useState("");
  const contentRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [doctors, setDoctors] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await fetch("/api/doctors");
      if (res.ok) {
        const data = await res.json();
        setDoctors(data);
      }
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchDoctors();
  }, []);

  const applyFormat = (prefix, suffix = "") => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);

    let newText = "";
    if (prefix === "ul" || prefix === "ol") {
      const lines = selectedText.split("\n");
      const bullet = prefix === "ul" ? "- " : "1. ";
      const formattedLines = lines.map(line => `${bullet}${line}`);
      newText = formattedLines.join("\n");
    } else {
      newText = `${prefix}${selectedText}${suffix}`;
    }

    setContent(beforeText + newText + afterText);

    // Refocus and set selection after react re-renders
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    
    // Ensure controlled content is saved
    formData.set("content", content);

    const url = editingBlog ? `/api/blogs/${editingBlog._id}` : "/api/blogs";
    const method = editingBlog ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (res.ok) {
        setSuccess(true);
        e.target.reset();
        setImagePreview(null);
        setContent("");
        setEditingBlog(null);
        fetchBlogs();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const err = await res.json();
        alert(`${editingBlog ? "Update" : "Upload"} failed: ${err.error}`);
      }
    } catch (err) {
      alert(`${editingBlog ? "Update" : "Upload"} failed`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setContent(blog.content);
    if (blog.imageId) {
      setImagePreview(`/api/media/${blog.imageId}`);
    } else if (blog.image) {
      setImagePreview(blog.image);
    } else {
      setImagePreview(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingBlog(null);
    setContent("");
    setImagePreview(null);
    document.querySelector("form").reset();
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this blog?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) fetchBlogs();
    } catch (err) {
      console.error(err);
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
                    defaultValue={editingBlog ? editingBlog.title : ""}
                    key={editingBlog ? `title-${editingBlog._id}` : "title-new"}
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
                    defaultValue={editingBlog ? editingBlog.slug : ""}
                    key={editingBlog ? `slug-${editingBlog._id}` : "slug-new"}
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
                  type="file"
                  name="image"
                  accept="image/*"
                  required={!editingBlog}
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
                  defaultValue={editingBlog ? editingBlog.excerpt : ""}
                  key={editingBlog ? `excerpt-${editingBlog._id}` : "excerpt-new"}
                  rows={2}
                  placeholder="A brief summary for the blog listing page..."
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all resize-none"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Article Content (Supports Markdown & HTML)</label>
              
              {/* Markdown Toolbar */}
              <div className="flex flex-wrap gap-2 p-2 bg-slate-100 border border-b-0 border-slate-200 rounded-t-2xl">
                <div className="flex items-center gap-1 border-r border-slate-300 pr-2">
                  <button type="button" onClick={() => applyFormat("**", "**")} className="p-2 hover:bg-white rounded-lg text-slate-600 transition-colors" title="Bold"><Bold size={16} /></button>
                  <button type="button" onClick={() => applyFormat("*", "*")} className="p-2 hover:bg-white rounded-lg text-slate-600 transition-colors" title="Italic"><Italic size={16} /></button>
                  <button type="button" onClick={() => applyFormat("<u>", "</u>")} className="p-2 hover:bg-white rounded-lg text-slate-600 transition-colors" title="Underline"><Underline size={16} /></button>
                  <button type="button" onClick={() => applyFormat("<mark>", "</mark>")} className="p-2 hover:bg-white rounded-lg text-slate-600 transition-colors" title="Highlight"><Highlighter size={16} /></button>
                </div>
                <div className="flex items-center gap-1 border-r border-slate-300 pr-2">
                  <button type="button" onClick={() => applyFormat("# ", "")} className="p-2 hover:bg-white rounded-lg text-slate-600 transition-colors" title="Heading 1"><Heading1 size={16} /></button>
                  <button type="button" onClick={() => applyFormat("## ", "")} className="p-2 hover:bg-white rounded-lg text-slate-600 transition-colors" title="Heading 2"><Heading2 size={16} /></button>
                  <button type="button" onClick={() => applyFormat("### ", "")} className="p-2 hover:bg-white rounded-lg text-slate-600 transition-colors" title="Heading 3"><Heading3 size={16} /></button>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => applyFormat("ul")} className="p-2 hover:bg-white rounded-lg text-slate-600 transition-colors" title="Bullet List"><List size={16} /></button>
                  <button type="button" onClick={() => applyFormat("ol")} className="p-2 hover:bg-white rounded-lg text-slate-600 transition-colors" title="Numbered List"><ListOrdered size={16} /></button>
                </div>
              </div>

              <textarea
                ref={contentRef}
                required
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={16}
                placeholder="Write your comprehensive clinical article here... Select text and use the toolbar above to format it."
                className="w-full px-6 py-6 bg-slate-50 border border-slate-200 rounded-b-2xl focus:outline-none focus:border-medical-teal transition-all resize-none font-mono text-sm leading-relaxed"
              />
            </div>

            {/* Metadata Section */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Author</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <select
                    name="author"
                    defaultValue={editingBlog ? editingBlog.author : ""}
                    key={editingBlog ? `author-${editingBlog._id}` : "author-new"}
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal appearance-none transition-all"
                  >
                    {doctors.map(doc => (
                      <option key={doc._id} value={doc.name}>{doc.name}</option>
                    ))}
                    {doctors.length === 0 && <option value="Admin">Admin</option>}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Category</label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    required
                    name="category"
                    placeholder="e.g. Orthopedic"
                    defaultValue={editingBlog ? editingBlog.category : ""}
                    key={editingBlog ? `category-${editingBlog._id}` : "category-new"}
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Read Time</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    name="readTime"
                    defaultValue={editingBlog ? editingBlog.readTime : "5 min read"}
                    key={editingBlog ? `readTime-${editingBlog._id}` : "readTime-new"}
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                disabled={isSubmitting}
                className="flex-1 py-6 bg-medical-blue text-white rounded-[2rem] font-bold text-lg hover:bg-medical-teal hover:-translate-y-1 transition-all shadow-xl flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : success ? (
                  <><CheckCircle /> {editingBlog ? "Updated Successfully!" : "Published Successfully!"}</>
                ) : (
                  <><Upload /> {editingBlog ? "Update Clinical Journal" : "Publish to Clinical Journal"}</>
                )}
              </button>
              
              {editingBlog && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-8 py-6 bg-white text-slate-600 border border-slate-200 rounded-[2rem] font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <X /> Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Existing Blogs List */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-medical-blue mb-8 px-4 md:px-0">Manage Published Journals</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`bg-white rounded-3xl p-6 shadow-sm border transition-all ${editingBlog?._id === blog._id ? 'border-medical-teal ring-4 ring-medical-teal/10' : 'border-slate-100 hover:shadow-md'}`}
              >
                <div className="aspect-[16/9] relative rounded-2xl overflow-hidden mb-4 bg-slate-50">
                  <Image 
                    src={blog.imageId ? `/api/media/${blog.imageId}` : blog.image} 
                    alt={blog.title} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-widest text-medical-blue shadow-sm">
                    {blog.category}
                  </div>
                </div>
                
                <h3 className="font-bold text-medical-blue line-clamp-2 mb-2">{blog.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-6">{blog.excerpt}</p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="flex-1 py-2.5 bg-slate-50 hover:bg-medical-blue hover:text-white text-medical-blue rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          {blogs.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
              <p className="text-slate-500 font-medium">No journals published yet.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
