"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, CheckCircle, Loader2, Image as ImageIcon, 
  Video as VideoIcon, Type, Link as LinkIcon, Trash2, 
  ArrowLeft, FileImage, ShieldAlert
} from "lucide-react";
import Link from "next/link";

// Helper to extract YouTube video ID
function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function AdminGalleryManager() {
  const [type, setType] = useState("image"); // "image" | "video"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch gallery items
  const fetchItems = async () => {
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) {
        const data = await res.json();
        setGalleryItems(data);
      }
    } catch (err) {
      console.error("Failed to fetch gallery items:", err);
    } finally {
      setIsLoadingItems(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    formData.append("type", type);

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSuccess(true);
        e.target.reset();
        setImagePreview(null);
        fetchItems();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const err = await res.json();
        alert(`Upload failed: ${err.error}`);
      }
    } catch (err) {
      console.error(err);
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

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this gallery item? This action is permanent.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setGalleryItems(prev => prev.filter(item => item._id !== id));
      } else {
        const err = await res.json();
        alert(`Failed to delete: ${err.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="w-full">
      <div className="max-w-5xl mx-auto">

        {/* Upload Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 mb-12">
          <div className="bg-medical-blue p-10 text-white flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Clinical Gallery Manager</h1>
              <p className="text-slate-400 mt-2 font-medium">Add medical photos and rehabilitation case study videos</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-medical-teal">
              <ImageIcon size={32} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            {/* Type Selector Switcher */}
            <div className="space-y-3">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Media Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setType("image")}
                  className={`py-4 rounded-2xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
                    type === "image"
                      ? "bg-medical-teal/10 border-medical-teal text-medical-teal shadow-inner"
                      : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  <FileImage size={18} /> Photo File
                </button>
                <button
                  type="button"
                  onClick={() => setType("video")}
                  className={`py-4 rounded-2xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
                    type === "video"
                      ? "bg-medical-teal/10 border-medical-teal text-medical-teal shadow-inner"
                      : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  <VideoIcon size={18} /> YouTube Video
                </button>
              </div>
            </div>

            {/* Title / Caption */}
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Caption / Title (Optional)</label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  name="title"
                  placeholder="e.g., Post-Surgical Gait Analysis Study"
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium"
                />
              </div>
            </div>

            {/* Conditional Input Fields */}
            <AnimatePresence mode="wait">
              {type === "image" ? (
                <motion.div
                  key="image-picker"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Upload Photo File</label>
                  <div className="relative group">
                    <input
                      required={type === "image"}
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
                          <Upload className="text-slate-300 mb-3" size={40} />
                          <p className="text-sm font-bold text-slate-400">Click to choose image file</p>
                          <p className="text-xs text-slate-400 mt-1">Supports PNG, JPG, WEBP</p>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="video-picker"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">YouTube Video URL</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input
                      required={type === "video"}
                      type="url"
                      name="videoUrl"
                      placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium"
                    />
                  </div>
                  <p className="text-xs text-slate-400 ml-1">Enter a standard watch link or short link. The video will be rendered as a secure iframe player in the gallery.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              disabled={isSubmitting}
              className="w-full py-6 bg-medical-blue text-white rounded-[2rem] font-bold text-lg hover:bg-medical-teal hover:-translate-y-1 transition-all shadow-xl flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : success ? (
                <><CheckCircle /> Saved to Gallery!</>
              ) : (
                <><Upload /> Add to Public Gallery</>
              )}
            </button>
          </form>
        </div>

        {/* Existing Gallery Items List */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-md">
          <h2 className="text-2xl font-bold text-medical-blue mb-8">Active Gallery Items</h2>

          {isLoadingItems ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p className="font-medium text-sm">Loading gallery media...</p>
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-slate-100 rounded-[2rem] bg-slate-50/50">
              <ImageIcon className="text-slate-300 mx-auto mb-4" size={48} />
              <p className="text-medical-blue font-bold text-lg">No gallery items yet</p>
              <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">Upload recovery pictures and clinical education videos to populate the public gallery page and homepage carousel.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galleryItems.map((item) => {
                const ytId = item.type === "video" ? getYouTubeId(item.videoUrl) : null;
                const thumbUrl = item.type === "image" 
                  ? `/api/media/${item.imageId}` 
                  : ytId 
                    ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
                    : null;

                return (
                  <div key={item._id} className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 flex flex-col relative shadow-sm hover:shadow-md transition-all">
                    {/* Thumbnail Section */}
                    <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden shrink-0">
                      {thumbUrl ? (
                        <img 
                          src={thumbUrl} 
                          alt={item.title || "Gallery Item"} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                          <ImageIcon size={32} />
                        </div>
                      )}

                      {/* Type Badge */}
                      <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-wider ${
                        item.type === "image" ? "bg-blue-500 text-white" : "bg-red-500 text-white"
                      }`}>
                        {item.type}
                      </span>
                    </div>

                    {/* Metadata Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-medical-blue line-clamp-2 min-h-[2.5rem]">
                          {item.title || <span className="text-slate-400 italic">Untitled {item.type}</span>}
                        </p>
                        <p className="text-[0.65rem] text-slate-400 mt-1 font-medium">
                          Uploaded on {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={deletingId === item._id}
                        className="w-full py-3 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-red-100/50 hover:border-red-600"
                      >
                        {deletingId === item._id ? (
                          <Loader2 className="animate-spin" size={14} />
                        ) : (
                          <><Trash2 size={14} /> Delete Media</>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
