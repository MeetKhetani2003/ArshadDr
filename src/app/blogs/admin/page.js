"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Plus, X, Eye, Pencil, Trash2, ArrowRight, Send, FileText, LayoutDashboard } from "lucide-react";

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "", excerpt: "", content: "",
    author: "Dr. Asad Solanki", category: "General", readTime: "5 min read",
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("hh_blogs") : null;
    if (stored) setBlogs(JSON.parse(stored));
  }, []);

  const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) { setMessage("Title and content are required!"); return; }
    const newBlog = {
      id: editId || Date.now().toString(),
      slug: generateSlug(formData.title),
      title: formData.title,
      excerpt: formData.excerpt || formData.content.slice(0, 150) + "...",
      content: formData.content,
      author: formData.author, category: formData.category, readTime: formData.readTime,
      date: new Date().toISOString().split("T")[0],
      image: "/clinic.png",
    };
    const updatedBlogs = editId ? blogs.map((b) => (b.id === editId ? newBlog : b)) : [newBlog, ...blogs];
    setBlogs(updatedBlogs);
    localStorage.setItem("hh_blogs", JSON.stringify(updatedBlogs));
    setFormData({ title: "", excerpt: "", content: "", author: "Dr. Asad Solanki", category: "General", readTime: "5 min read" });
    setEditId(null); setShowForm(false);
    setMessage(editId ? "Blog updated successfully! ✅" : "Blog published successfully! ✅");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (blog) => {
    setFormData({ title: blog.title, excerpt: blog.excerpt, content: blog.content, author: blog.author, category: blog.category, readTime: blog.readTime });
    setEditId(blog.id); setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      const updated = blogs.filter((b) => b.id !== id);
      setBlogs(updated); localStorage.setItem("hh_blogs", JSON.stringify(updated));
      setMessage("Blog deleted! 🗑️"); setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <main>
      {/* Header */}
      <section className="bg-slate-900 pt-32 pb-20 text-white">
        <div className="container-wide px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <span className="badge !bg-slate-800 !text-teal-400 !border-slate-700">Admin Only</span>
              <h1 className="heading-xl text-white mb-0">Blog Dashboard</h1>
              <p className="text-slate-400 mt-4 max-w-md">Manage your articles, news, and health tips for the website.</p>
            </div>
            <div className="flex gap-4">
              <Link href="/blogs" className="btn btn-ghost border-slate-700 text-white hover:bg-slate-800">
                <Eye size={18} /> View Live Blog
              </Link>
              <button 
                onClick={() => { setShowForm(!showForm); setEditId(null); }}
                className="btn btn-primary"
              >
                {showForm ? <><X size={18} /> Cancel</> : <><Plus size={18} /> New Article</>}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Content */}
      <section className="section bg-subtle min-h-screen">
        <div className="container-wide px-6">
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                className={`mb-8 p-6 rounded-xl border text-center font-medium ${
                  message.includes("deleted") ? "bg-red-50 border-red-100 text-red-600" : "bg-teal-50 border-teal-100 text-teal-600"
                }`}
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Blog Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-12"
              >
                <div className="modern-card">
                  <h3 className="text-xl font-semibold text-slate-900 mb-8 flex items-center gap-3">
                    {editId ? <><Pencil size={20} className="text-teal-600" /> Edit Article</> : <><FileText size={20} className="text-teal-600" /> Create New Article</>}
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Article Title *</label>
                      <input 
                        type="text" value={formData.title} 
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                        placeholder="e.g., 5 Exercises for Lower Back Pain" required 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 outline-none focus:border-teal-600 focus:bg-white transition-all"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Author</label>
                        <select 
                          value={formData.author} 
                          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 outline-none focus:border-teal-600 focus:bg-white transition-all appearance-none"
                        >
                          <option>Dr. Asad Solanki</option>
                          <option>Dr. Hadiya Khilji</option>
                          <option>Medical Team</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Category</label>
                        <select 
                          value={formData.category} 
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 outline-none focus:border-teal-600 focus:bg-white transition-all appearance-none"
                        >
                          <option>General</option><option>Orthopedic</option><option>Neurology</option><option>Wellness</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Read Time</label>
                        <input 
                          type="text" value={formData.readTime} 
                          onChange={(e) => setFormData({ ...formData, readTime: e.target.value })} 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 outline-none focus:border-teal-600 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Excerpt (Summary)</label>
                      <textarea 
                        value={formData.excerpt} 
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} 
                        rows={2} placeholder="A short summary for the listing page..." 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 outline-none focus:border-teal-600 focus:bg-white transition-all resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Content *</label>
                      <textarea 
                        value={formData.content} 
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })} 
                        rows={12} required placeholder="Write your article content here..." 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 outline-none focus:border-teal-600 focus:bg-white transition-all font-mono text-sm leading-relaxed"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-full py-5 text-lg rounded-xl">
                      {editId ? <><Pencil size={20} /> Update Article</> : <><Send size={20} /> Publish Article</>}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Articles List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <LayoutDashboard size={20} className="text-teal-600" /> Recent Articles ({blogs.length})
            </h2>
            
            {blogs.length === 0 ? (
              <div className="modern-card text-center py-20 bg-white">
                <FileText size={48} className="text-slate-100 mx-auto mb-6" />
                <h3 className="text-lg font-medium text-slate-900">No custom articles yet</h3>
                <p className="text-slate-500 mb-8">Start by creating your first blog post.</p>
                <button onClick={() => setShowForm(true)} className="btn btn-primary">Create First Article</button>
              </div>
            ) : (
              <div className="grid gap-4">
                {blogs.map((blog) => (
                  <div key={blog.id} className="modern-card py-6 px-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-teal-300">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-0.5 bg-teal-50 text-teal-600 rounded text-[0.65rem] font-bold uppercase tracking-widest">{blog.category}</span>
                        <span className="text-xs text-slate-400">{blog.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">{blog.title}</h3>
                      <p className="text-xs text-slate-500">By {blog.author} • {blog.readTime}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/blogs/${blog.slug}`} className="p-3 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all" title="View">
                        <Eye size={20} />
                      </Link>
                      <button onClick={() => handleEdit(blog)} className="p-3 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all" title="Edit">
                        <Pencil size={20} />
                      </button>
                      <button onClick={() => handleDelete(blog.id)} className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
