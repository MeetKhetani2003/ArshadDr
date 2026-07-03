"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, CheckCircle, Loader2, Image as ImageIcon, 
  Type, Link as LinkIcon, Trash2, ArrowLeft, 
  FileText, Activity, Layers, Sparkles, CheckSquare, Plus
} from "lucide-react";
import Link from "next/link";

export default function AdminTreatmentsManager() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [protocolPreview, setProtocolPreview] = useState(null);
  
  const [treatments, setTreatments] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [editingTreatment, setEditingTreatment] = useState(null);

  // Form states to bind
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const handleEdit = (treat) => {
    // Only allow editing if it has an _id (i.e. stored in the database)
    if (!treat._id) {
      alert("Static default treatments cannot be edited. Create a new custom treatment instead.");
      return;
    }
    setEditingTreatment(treat);
    setTitle(treat.title);
    setSlug(treat.slug);
    setImagePreview(treat.image ? (treat.image.startsWith("/") ? treat.image : `/api/media/${treat.image}`) : null);
    setProtocolPreview(treat.protocolImage ? (treat.protocolImage.startsWith("/") ? treat.protocolImage : `/api/media/${treat.protocolImage}`) : null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTreatment(null);
    setTitle("");
    setSlug("");
    setImagePreview(null);
    setProtocolPreview(null);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const fetchTreatments = async () => {
    try {
      const res = await fetch("/api/treatments");
      if (res.ok) {
        const data = await res.json();
        setTreatments(data);
      }
    } catch (err) {
      console.error("Failed to fetch treatments:", err);
    } finally {
      setIsLoadingItems(false);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);

    try {
      const url = editingTreatment ? `/api/treatments/${editingTreatment._id}` : "/api/treatments";
      const method = editingTreatment ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (res.ok) {
        setSuccess(true);
        e.target.reset();
        handleCancelEdit();
        fetchTreatments();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const err = await res.json();
        alert(`Submit failed: ${err.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Submit failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === "image") setImagePreview(url);
      if (type === "protocol") setProtocolPreview(url);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this treatment? This action is permanent.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/treatments/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTreatments(prev => prev.filter(t => t._id !== id));
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

        {/* Form Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 mb-12">
          <div className="bg-medical-blue p-10 text-white flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{editingTreatment ? "Edit Treatment Profile" : "Treatment Management"}</h1>
              <p className="text-slate-400 mt-2 font-medium">{editingTreatment ? "Update existing treatment details" : "Add or remove clinical focus areas/services"}</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-medical-teal">
              <Activity size={32} />
            </div>
          </div>

          <form key={editingTreatment ? editingTreatment._id : 'new'} onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Treatment Title</label>
                <div className="relative">
                  <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    required
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="e.g., Orthopedic Physiotherapy"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium"
                  />
                </div>
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">URL Slug</label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    required
                    name="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g., orthopedic-physiotherapy"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium"
                  />
                </div>
              </div>

              {/* Icon Emoji */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Icon (Emoji / Character)</label>
                <div className="relative">
                  <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    required
                    name="icon"
                    defaultValue={editingTreatment?.icon || "🩺"}
                    placeholder="e.g., 🦴 or 🧠"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium"
                  />
                </div>
              </div>

              {/* Color Code */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Brand Color Code (Hex)</label>
                <div className="relative">
                  <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    required
                    name="color"
                    defaultValue={editingTreatment?.color || "#0d9488"}
                    placeholder="e.g., #1a2e5a"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Short Description</label>
              <textarea
                required
                name="shortDesc"
                rows={2}
                defaultValue={editingTreatment?.shortDesc || ""}
                placeholder="Brief summary of the focus area shown on the cards..."
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium resize-none"
              />
            </div>

            {/* Full Description */}
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Detailed Description</label>
              <textarea
                required
                name="fullDescription"
                rows={4}
                defaultValue={editingTreatment?.fullDescription || ""}
                placeholder="In-depth details for the treatment detail page..."
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Conditions Treated */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Conditions Treated (One per line)</label>
                <textarea
                  name="conditions"
                  rows={4}
                  defaultValue={editingTreatment?.conditions?.join('\n') || ""}
                  placeholder="e.g.&#10;Back Pain&#10;Slip Disc&#10;Frozen Shoulder"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium resize-none"
                />
              </div>

              {/* Techniques Applied */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Techniques Used (One per line)</label>
                <textarea
                  name="techniques"
                  rows={4}
                  defaultValue={editingTreatment?.techniques?.join('\n') || ""}
                  placeholder="e.g.&#10;Joint Mobilization&#10;Dry Needling&#10;Exercise Therapy"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium resize-none"
                />
              </div>
            </div>

            {/* Image Uploads */}
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              {/* Cover Image */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Cover Image</label>
                <div className="border-2 border-dashed border-slate-100 rounded-[2rem] p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer relative overflow-hidden group min-h-[220px]">
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => handleImageChange(e, "image")}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    accept="image/*"
                    required={!editingTreatment}
                  />
                  {imagePreview ? (
                    <div className="absolute inset-0 w-full h-full">
                      <img src={imagePreview} className="w-full h-full object-cover" alt="Cover Preview" />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-2">
                        <Upload size={14} /> Change Cover Image
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-medical-teal/10 flex items-center justify-center text-medical-teal mx-auto">
                        <ImageIcon size={22} />
                      </div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upload Main Image</p>
                      <p className="text-[0.6rem] text-slate-400 font-medium">PNG, JPG or WEBP up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Protocol Image */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Protocol Image</label>
                <div className="border-2 border-dashed border-slate-100 rounded-[2rem] p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer relative overflow-hidden group min-h-[220px]">
                  <input
                    type="file"
                    name="protocolImage"
                    onChange={(e) => handleImageChange(e, "protocol")}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    accept="image/*"
                    required={!editingTreatment}
                  />
                  {protocolPreview ? (
                    <div className="absolute inset-0 w-full h-full">
                      <img src={protocolPreview} className="w-full h-full object-cover" alt="Protocol Preview" />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-2">
                        <Upload size={14} /> Change Protocol Image
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-medical-teal/10 flex items-center justify-center text-medical-teal mx-auto">
                        <ImageIcon size={22} />
                      </div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upload Protocol Image</p>
                      <p className="text-[0.6rem] text-slate-400 font-medium">PNG, JPG or WEBP up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4 border-t border-slate-100 justify-end">
              {editingTreatment && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-8 py-4 border border-slate-200 text-slate-500 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-all"
                >
                  Cancel Edit
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-4 bg-medical-teal text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-medical-blue transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-medical-teal/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Saving...
                  </>
                ) : editingTreatment ? "Update Treatment" : "Add Treatment"}
              </button>
            </div>
          </form>
        </div>

        {/* Success Modal */}
        <AnimatePresence>
          {success && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-10 right-10 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3"
            >
              <CheckCircle size={20} />
              <span className="text-xs font-bold uppercase tracking-wider">Treatment Saved Successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Listing Section */}
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 p-10">
          <h2 className="text-2xl font-bold text-medical-blue mb-8">Existing Focus Areas ({treatments.length})</h2>
          
          {isLoadingItems ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
              <Loader2 className="animate-spin text-medical-teal" size={32} />
              <p className="text-xs font-bold uppercase tracking-widest">Loading treatments database...</p>
            </div>
          ) : treatments.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="font-bold text-lg mb-2">No custom treatments added yet</p>
              <p className="text-sm">Create your first custom treatment using the form above.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {treatments.map((treat) => (
                <div key={treat._id || treat.slug} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-[1.5rem] bg-slate-50 border border-slate-100/50 hover:border-slate-200 transition-all gap-6 group">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-2xl shadow-sm shrink-0">
                      {treat.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-medical-blue text-lg leading-tight">{treat.title}</h3>
                        {!treat._id && (
                          <span className="px-2 py-0.5 rounded-full bg-slate-200 text-[#475569] text-[0.55rem] font-bold uppercase tracking-widest border border-slate-300 shadow-sm">
                            Static Default
                          </span>
                        )}
                        {treat._id && (
                          <span className="px-2 py-0.5 rounded-full bg-medical-teal/10 text-medical-teal text-[0.55rem] font-bold uppercase tracking-widest border border-medical-teal/20 shadow-sm">
                            Database Live
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-xs font-medium mt-1 leading-normal max-w-xl">{treat.shortDesc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                    <button
                      onClick={() => handleEdit(treat)}
                      disabled={!treat._id}
                      className="px-5 py-3 rounded-xl bg-white border border-slate-100 text-xs font-bold uppercase tracking-wider text-medical-blue hover:border-medical-teal hover:text-medical-teal transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(treat._id)}
                      disabled={deletingId === treat._id || !treat._id}
                      className="p-3 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl border border-red-100 transition-all disabled:opacity-30 flex items-center justify-center shadow-sm"
                    >
                      {deletingId === treat._id ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
