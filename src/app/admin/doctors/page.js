"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, CheckCircle, Loader2, Image as ImageIcon, 
  Type, Link as LinkIcon, Trash2, ArrowLeft, 
  Stethoscope, FileText, Clock, User, Star, Users, Percent
} from "lucide-react";
import Link from "next/link";

export default function AdminDoctorsManager() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [doctors, setDoctors] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);

  // Auto-generate slug from name
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const handleEdit = (doc) => {
    setEditingDoctor(doc);
    setName(doc.name);
    setSlug(doc.slug);
    setImagePreview(`/api/media/${doc.imageId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingDoctor(null);
    setName("");
    setSlug("");
    setImagePreview(null);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setSlug(newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
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
    } finally {
      setIsLoadingItems(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);

    try {
      const url = editingDoctor ? `/api/doctors/${editingDoctor._id}` : "/api/doctors";
      const method = editingDoctor ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (res.ok) {
        setSuccess(true);
        e.target.reset();
        handleCancelEdit();
        fetchDoctors();
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
    if (!confirm("Are you sure you want to delete this doctor? This action is permanent.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/doctors/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDoctors(prev => prev.filter(doc => doc._id !== id));
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
              <h1 className="text-3xl font-bold">{editingDoctor ? "Edit Doctor Profile" : "Doctor Management"}</h1>
              <p className="text-slate-400 mt-2 font-medium">{editingDoctor ? "Update existing details" : "Add or remove clinical specialists from the team"}</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-medical-teal">
              <Stethoscope size={32} />
            </div>
          </div>

          <form key={editingDoctor ? editingDoctor._id : 'new'} onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Doctor Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    required
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="e.g., Dr. John Doe"
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
                    placeholder="e.g., dr-john-doe"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Role / Designation</label>
                <div className="relative">
                  <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    required
                    name="role"
                    defaultValue={editingDoctor?.role || ""}
                    placeholder="e.g., Chief Physiotherapist"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium"
                  />
                </div>
              </div>

              {/* Specialization */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Specialization</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    required
                    name="specialization"
                    defaultValue={editingDoctor?.specialization || ""}
                    placeholder="e.g., BPT, Orthopedic, Neuro"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium"
                  />
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Experience</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    required
                    name="experience"
                    defaultValue={editingDoctor?.experience || ""}
                    placeholder="e.g., 10+ Years or Clinical Specialist"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium"
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Star Rating</label>
                <div className="relative">
                  <Star className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    name="rating"
                    defaultValue={editingDoctor?.rating || "4.9/5.0"}
                    placeholder="e.g., 4.9/5.0"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium"
                  />
                </div>
              </div>

              {/* Patients Treated */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Patients Treated</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    name="patients"
                    defaultValue={editingDoctor?.patients || "2,500+"}
                    placeholder="e.g., 2,500+"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium"
                  />
                </div>
              </div>

              {/* Success Rate */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Success Rate</label>
                <div className="relative">
                  <Percent className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    name="successRate"
                    defaultValue={editingDoctor?.successRate || "99%"}
                    placeholder="e.g., 99%"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Biography</label>
              <textarea
                required
                name="bio"
                defaultValue={editingDoctor?.bio || ""}
                rows={4}
                placeholder="Enter doctor's biography..."
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium resize-none"
              />
            </div>

            {/* Journey */}
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Journey / Milestones (One per line)</label>
              <textarea
                name="journey"
                defaultValue={editingDoctor?.journey?.join('\n') || ""}
                rows={5}
                placeholder="Bachelor of Physiotherapy&#10;10+ Years of Clinical Excellence&#10;Expert in Neuro Rehab"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium resize-none"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Upload Profile Photo</label>
              <div className="relative group">
                <input
                  required={!editingDoctor}
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className="w-full aspect-[4/2] bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center group-hover:border-medical-teal transition-colors overflow-hidden">
                  {imagePreview ? (
                    <img src={imagePreview} className="w-full h-full object-contain p-2" alt="Preview" />
                  ) : (
                    <>
                      <Upload className="text-slate-300 mb-3" size={40} />
                      <p className="text-sm font-bold text-slate-400">Click to choose image file</p>
                      <p className="text-xs text-slate-400 mt-1">Supports PNG, JPG, WEBP</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              {editingDoctor && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="w-1/3 py-6 bg-slate-100 text-slate-600 rounded-[2rem] font-bold text-lg hover:bg-slate-200 transition-all border border-slate-200"
                >
                  Cancel Edit
                </button>
              )}
              <button
                disabled={isSubmitting}
                className={`py-6 bg-medical-blue text-white rounded-[2rem] font-bold text-lg hover:bg-medical-teal hover:-translate-y-1 transition-all shadow-xl flex items-center justify-center gap-3 ${editingDoctor ? 'w-2/3' : 'w-full'}`}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : success ? (
                  <><CheckCircle /> {editingDoctor ? "Updated!" : "Saved Doctor!"}</>
                ) : (
                  <><Stethoscope /> {editingDoctor ? "Update Doctor" : "Add Doctor"}</>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Existing Doctors List */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-md">
          <h2 className="text-2xl font-bold text-medical-blue mb-8">Active Team Members</h2>

          {isLoadingItems ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p className="font-medium text-sm">Loading doctors...</p>
            </div>
          ) : doctors.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-slate-100 rounded-[2rem] bg-slate-50/50">
              <Stethoscope className="text-slate-300 mx-auto mb-4" size={48} />
              <p className="text-medical-blue font-bold text-lg">No doctors added yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {doctors.map((doc) => (
                <div key={doc._id} className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 flex flex-col relative shadow-sm hover:shadow-md transition-all">
                  <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden shrink-0">
                    <img 
                      src={`/api/media/${doc.imageId}`} 
                      alt={doc.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-medical-blue line-clamp-1">{doc.name}</p>
                      <p className="text-[0.65rem] text-slate-500 font-medium uppercase mt-1">{doc.role}</p>
                      <p className="text-[0.7rem] text-slate-400 mt-1 line-clamp-2">{doc.specialization}</p>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEdit(doc)}
                        className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-slate-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(doc._id)}
                        disabled={deletingId === doc._id}
                        className="flex-1 py-3 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-red-100/50 hover:border-red-600"
                      >
                        {deletingId === doc._id ? (
                          <Loader2 className="animate-spin" size={14} />
                        ) : (
                          <><Trash2 size={14} /> Remove</>
                        )}
                      </button>
                    </div>
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
