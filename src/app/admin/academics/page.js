"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, CheckCircle, Loader2, Image as ImageIcon, 
  Video as VideoIcon, Type, Link as LinkIcon, Trash2, 
  FileImage, Calendar, FileText, ChevronRight
} from "lucide-react";

function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function AdminAcademicsManager() {
  const [activeTab, setActiveTab] = useState("clinical"); // "clinical" | "events"
  
  // Clinical State
  const [clinicalType, setClinicalType] = useState("image"); // "image" | "video"
  const [isClinicalSubmitting, setIsClinicalSubmitting] = useState(false);
  const [clinicalSuccess, setClinicalSuccess] = useState(false);
  const [clinicalImagePreview, setClinicalImagePreview] = useState(null);
  const [clinicalItems, setClinicalItems] = useState([]);
  
  // Events State
  const [events, setEvents] = useState([]);
  const [isEventSubmitting, setIsEventSubmitting] = useState(false);
  const [eventSuccess, setEventSuccess] = useState(false);
  const [eventImagePreview, setEventImagePreview] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // The event currently being managed (to upload specific media)
  const [eventItems, setEventItems] = useState([]); // Media for the selected event
  
  // Shared State
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch initial data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [galleryRes, eventsRes] = await Promise.all([
        fetch("/api/gallery"),
        fetch("/api/academics/events")
      ]);
      
      if (galleryRes.ok && eventsRes.ok) {
        const galleryData = await galleryRes.json();
        const eventsData = await eventsRes.json();
        
        setClinicalItems(galleryData.filter(i => i.category === "clinical"));
        setEventItems(galleryData.filter(i => i.category === "event"));
        setEvents(eventsData);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- CLINICAL GALLERY HANDLERS ---
  const handleClinicalSubmit = async (e) => {
    e.preventDefault();
    setIsClinicalSubmitting(true);
    const formData = new FormData(e.target);
    formData.append("type", clinicalType);
    formData.append("category", "clinical");

    try {
      const res = await fetch("/api/gallery", { method: "POST", body: formData });
      if (res.ok) {
        setClinicalSuccess(true);
        e.target.reset();
        setClinicalImagePreview(null);
        fetchData();
        setTimeout(() => setClinicalSuccess(false), 3000);
      } else {
        const err = await res.json();
        alert(`Upload failed: ${err.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setIsClinicalSubmitting(false);
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    if (!confirm("Are you sure you want to delete this media?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      } else {
        const err = await res.json();
        alert(`Failed to delete: ${err.error}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  // --- EVENTS HANDLERS ---
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setIsEventSubmitting(true);
    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/academics/events", { method: "POST", body: formData });
      if (res.ok) {
        setEventSuccess(true);
        e.target.reset();
        setEventImagePreview(null);
        fetchData();
        setTimeout(() => setEventSuccess(false), 3000);
      } else {
        const err = await res.json();
        alert(`Failed to create event: ${err.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create event");
    } finally {
      setIsEventSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!confirm("Are you sure you want to delete this event AND all its associated media?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/academics/events/${id}`, { method: "DELETE" });
      if (res.ok) {
        if (selectedEvent === id) setSelectedEvent(null);
        fetchData();
      } else {
        const err = await res.json();
        alert(`Failed to delete: ${err.error}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEventMediaSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;
    setIsClinicalSubmitting(true); // Reusing this loading state for simplicity
    
    const formData = new FormData(e.target);
    formData.append("type", clinicalType);
    formData.append("category", "event");
    formData.append("eventId", selectedEvent);

    try {
      const res = await fetch("/api/gallery", { method: "POST", body: formData });
      if (res.ok) {
        setClinicalSuccess(true);
        e.target.reset();
        setClinicalImagePreview(null);
        fetchData();
        setTimeout(() => setClinicalSuccess(false), 3000);
      } else {
        const err = await res.json();
        alert(`Upload failed: ${err.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setIsClinicalSubmitting(false);
    }
  };

  return (
    <main className="w-full">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header & Tab Switcher */}
        <div className="mb-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-end">
          <div>
            <h1 className="text-4xl font-bold text-medical-blue tracking-tight">Academics Manager</h1>
            <p className="text-slate-500 mt-2 font-medium">Manage clinical gallery photos and academic events</p>
          </div>
          
          <div className="flex bg-white rounded-2xl shadow-sm border border-slate-200 p-1.5 w-full md:w-auto">
            <button
              onClick={() => setActiveTab("clinical")}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === "clinical" ? "bg-medical-blue text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              Clinical Gallery
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === "events" ? "bg-medical-teal text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              Event Manager
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "clinical" && (
            <motion.div key="clinical" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {/* --- CLINICAL GALLERY TAB --- */}
              <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 mb-12">
                <div className="bg-medical-blue p-10 text-white flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Upload to Clinical Gallery</h2>
                    <p className="text-slate-400 mt-1 font-medium text-sm">Add general medical photos and rehabilitation case study videos</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-medical-teal">
                    <ImageIcon size={28} />
                  </div>
                </div>

                <form onSubmit={handleClinicalSubmit} className="p-10 space-y-8">
                  {/* Type Selector Switcher */}
                  <div className="space-y-3">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Media Type</label>
                    <div className="grid grid-cols-2 gap-4 max-w-lg">
                      <button
                        type="button"
                        onClick={() => setClinicalType("image")}
                        className={`py-4 rounded-2xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
                          clinicalType === "image"
                            ? "bg-medical-teal/10 border-medical-teal text-medical-teal shadow-inner"
                            : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        <FileImage size={18} /> Photo File
                      </button>
                      <button
                        type="button"
                        onClick={() => setClinicalType("video")}
                        className={`py-4 rounded-2xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
                          clinicalType === "video"
                            ? "bg-medical-teal/10 border-medical-teal text-medical-teal shadow-inner"
                            : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        <VideoIcon size={18} /> YouTube Video
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 max-w-xl">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Caption / Title (Optional)</label>
                    <div className="relative">
                      <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input name="title" placeholder="e.g., Post-Surgical Gait Analysis Study" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium" />
                    </div>
                  </div>

                  <div className="max-w-2xl">
                    <AnimatePresence mode="wait">
                      {clinicalType === "image" ? (
                        <motion.div key="image-picker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                          <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Upload Photo File</label>
                          <div className="relative group">
                            <input required type="file" name="image" accept="image/*" onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) setClinicalImagePreview(URL.createObjectURL(file));
                            }} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                            <div className="w-full aspect-[21/9] bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center group-hover:border-medical-teal transition-colors overflow-hidden">
                              {clinicalImagePreview ? (
                                <img src={clinicalImagePreview} className="w-full h-full object-cover" alt="Preview" />
                              ) : (
                                <>
                                  <Upload className="text-slate-300 mb-3" size={40} />
                                  <p className="text-sm font-bold text-slate-400">Click to choose image file</p>
                                </>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div key="video-picker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                          <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">YouTube Video URL</label>
                          <div className="relative">
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input required type="url" name="videoUrl" placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal transition-all text-medical-blue font-medium" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button disabled={isClinicalSubmitting} className="max-w-xs w-full py-5 bg-medical-blue text-white rounded-2xl font-bold text-lg hover:bg-medical-teal transition-all shadow-lg flex items-center justify-center gap-3">
                    {isClinicalSubmitting ? <Loader2 className="animate-spin" /> : clinicalSuccess ? <><CheckCircle /> Saved!</> : <><Upload /> Add Media</>}
                  </button>
                </form>
              </div>

              {/* List Clinical Items */}
              <MediaGrid items={clinicalItems} onDelete={handleDeleteGalleryItem} deletingId={deletingId} isLoading={isLoading} emptyMessage="No clinical gallery items found" />
            </motion.div>
          )}

          {activeTab === "events" && (
            <motion.div key="events" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* LEFT COL: EVENT CREATOR & LIST */}
              <div className="lg:col-span-1 space-y-8">
                {/* Create Event */}
                <div className="bg-white rounded-[2rem] shadow-md border border-slate-100 overflow-hidden">
                  <div className="bg-medical-teal p-6 text-white">
                    <h2 className="text-xl font-bold">Create New Event</h2>
                  </div>
                  <form onSubmit={handleEventSubmit} className="p-6 space-y-5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Event Title</label>
                      <input required name="title" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-medical-teal focus:outline-none text-sm font-medium" placeholder="e.g., Annual Workshop 2024" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                      <textarea name="description" rows="3" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-medical-teal focus:outline-none text-sm" placeholder="Short description of the event..." />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Cover Image</label>
                      <div className="relative group aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl overflow-hidden flex items-center justify-center cursor-pointer">
                        <input required type="file" name="image" accept="image/*" onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) setEventImagePreview(URL.createObjectURL(file));
                        }} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                        {eventImagePreview ? (
                          <img src={eventImagePreview} className="w-full h-full object-cover" alt="Preview" />
                        ) : (
                          <Upload className="text-slate-300" size={24} />
                        )}
                      </div>
                    </div>
                    <button disabled={isEventSubmitting} className="w-full py-4 bg-medical-blue text-white rounded-xl font-bold hover:bg-medical-teal transition-all flex items-center justify-center gap-2">
                      {isEventSubmitting ? <Loader2 className="animate-spin" size={18} /> : eventSuccess ? <CheckCircle size={18} /> : <><Calendar size={18} /> Create Event</>}
                    </button>
                  </form>
                </div>

                {/* List Events */}
                <div className="bg-white rounded-[2rem] shadow-md border border-slate-100 p-6">
                  <h2 className="text-lg font-bold text-medical-blue mb-4">Existing Events</h2>
                  <div className="space-y-3">
                    {events.length === 0 && !isLoading && (
                      <p className="text-sm text-slate-400 italic">No events created yet.</p>
                    )}
                    {events.map(event => (
                      <div key={event._id} className={`p-4 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                        selectedEvent === event._id ? "border-medical-teal bg-medical-teal/5" : "border-slate-100 hover:border-slate-300"
                      }`} onClick={() => setSelectedEvent(event._id)}>
                        <div className="flex-1 truncate pr-2">
                          <p className="font-bold text-medical-blue text-sm truncate">{event.title}</p>
                          <p className="text-[0.65rem] text-slate-400 font-bold">{new Date(event.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event._id); }} className="text-slate-300 hover:text-red-500 p-2">
                            {deletingId === event._id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                          </button>
                          <ChevronRight size={18} className={selectedEvent === event._id ? "text-medical-teal" : "text-slate-300"} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COL: SELECTED EVENT MEDIA */}
              <div className="lg:col-span-2">
                {selectedEvent ? (
                  <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                    <div className="bg-slate-50 p-8 border-b border-slate-100">
                      <h2 className="text-2xl font-bold text-medical-blue">
                        Manage Media: {events.find(e => e._id === selectedEvent)?.title}
                      </h2>
                      <p className="text-sm text-slate-500 mt-1">Upload specific photos or videos that belong ONLY to this event.</p>
                    </div>

                    <form onSubmit={handleEventMediaSubmit} className="p-8 space-y-6 border-b border-slate-100 bg-white">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-3">
                          <label className="text-[0.65rem] font-bold uppercase text-slate-400">Media Type</label>
                          <div className="flex gap-2">
                            <button type="button" onClick={() => setClinicalType("image")} className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase border transition-all ${clinicalType === "image" ? "bg-medical-teal/10 border-medical-teal text-medical-teal" : "bg-slate-50 border-slate-100 text-slate-500"}`}><FileImage size={14} className="inline mr-1" /> Photo</button>
                            <button type="button" onClick={() => setClinicalType("video")} className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase border transition-all ${clinicalType === "video" ? "bg-medical-teal/10 border-medical-teal text-medical-teal" : "bg-slate-50 border-slate-100 text-slate-500"}`}><VideoIcon size={14} className="inline mr-1" /> Video</button>
                          </div>
                        </div>

                        <div className="flex-[2] space-y-3">
                          {clinicalType === "image" ? (
                            <>
                              <label className="text-[0.65rem] font-bold uppercase text-slate-400">Upload File</label>
                              <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-3 bg-slate-50 flex justify-between items-center group hover:border-medical-teal cursor-pointer">
                                <input required type="file" name="image" accept="image/*" onChange={(e) => { const f = e.target.files[0]; if(f) setClinicalImagePreview(URL.createObjectURL(f)); }} className="absolute inset-0 opacity-0 z-10 cursor-pointer" />
                                <span className="text-sm font-medium text-slate-500 pl-2">Select Image...</span>
                                {clinicalImagePreview && <img src={clinicalImagePreview} className="w-10 h-10 rounded-md object-cover" />}
                              </div>
                            </>
                          ) : (
                            <>
                              <label className="text-[0.65rem] font-bold uppercase text-slate-400">YouTube URL</label>
                              <input required type="url" name="videoUrl" placeholder="https://youtube.com/..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-medical-teal focus:outline-none text-sm font-medium" />
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button disabled={isClinicalSubmitting} className="px-8 py-3 bg-medical-blue text-white rounded-xl font-bold hover:bg-medical-teal transition-all flex items-center gap-2">
                          {isClinicalSubmitting ? <Loader2 className="animate-spin" size={16} /> : <><Upload size={16} /> Upload to Event</>}
                        </button>
                      </div>
                    </form>

                    <div className="p-8 bg-slate-50/50">
                      <MediaGrid 
                        items={eventItems.filter(i => i.eventId === selectedEvent)} 
                        onDelete={handleDeleteGalleryItem} 
                        deletingId={deletingId} 
                        isLoading={isLoading} 
                        emptyMessage="No media uploaded for this event yet." 
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-[2.5rem] border border-slate-100 flex items-center justify-center min-h-[500px] text-slate-400 flex-col gap-4 shadow-sm">
                    <Calendar size={48} className="text-slate-200" />
                    <p className="text-lg font-medium">Select an event from the left to manage its media</p>
                  </div>
                )}
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}

// Reusable Media Grid Component for Admin
function MediaGrid({ items, onDelete, deletingId, isLoading, emptyMessage }) {
  if (isLoading) {
    return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-slate-300" size={32} /></div>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-slate-200 rounded-[2rem] bg-white">
        <ImageIcon className="text-slate-200 mx-auto mb-4" size={40} />
        <p className="text-slate-400 text-sm font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item) => {
        const ytId = item.type === "video" ? getYouTubeId(item.videoUrl) : null;
        const thumbUrl = item.type === "image" 
          ? `/api/media/${item.imageId}` 
          : ytId 
            ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
            : null;

        return (
          <div key={item._id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative">
            <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
              {thumbUrl ? (
                <img src={thumbUrl} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center"><ImageIcon className="text-slate-300" /></div>
              )}
              <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[0.55rem] font-bold uppercase tracking-wider ${item.type === "image" ? "bg-blue-500 text-white" : "bg-red-500 text-white"}`}>
                {item.type}
              </span>
            </div>
            <div className="p-3">
              <p className="text-xs font-bold text-slate-600 truncate mb-2">{item.title || "Untitled"}</p>
              <button
                onClick={() => onDelete(item._id)}
                disabled={deletingId === item._id}
                className="w-full py-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg text-[0.65rem] font-bold uppercase transition-all flex items-center justify-center gap-1"
              >
                {deletingId === item._id ? <Loader2 size={12} className="animate-spin" /> : <><Trash2 size={12} /> Delete</>}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
