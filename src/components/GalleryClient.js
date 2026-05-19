"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, Play, X, ChevronLeft, ChevronRight, 
  ImageIcon, Video as VideoIcon, Loader2, ZoomIn, Info
} from "lucide-react";
import Image from "next/image";

// Helper to extract YouTube video ID
function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function GalleryClient({ initialItems }) {
  const [items, setItems] = useState(initialItems || []);
  const [filter, setFilter] = useState("all"); // "all" | "image" | "video"
  const [activeVideo, setActiveVideo] = useState(null); // active YouTube URL for playing
  const [activePhotoIndex, setActivePhotoIndex] = useState(null); // active photo index in lightbox
  const [downloadingId, setDownloadingId] = useState(null);

  // Fetch fresh items if needed or use initial
  useEffect(() => {
    if (!initialItems || initialItems.length === 0) {
      const loadItems = async () => {
        try {
          const res = await fetch("/api/gallery");
          if (res.ok) {
            const data = await res.json();
            setItems(data);
          }
        } catch (err) {
          console.error("Client fetch error:", err);
        }
      };
      loadItems();
    }
  }, [initialItems]);

  // Filter items
  const filteredItems = filter === "all" 
    ? items 
    : items.filter(item => item.type === filter);

  // Get index array of photos for lightbox traversal
  const photosOnly = filteredItems.filter(item => item.type === "image");
  
  const currentPhotoIndexInPhotos = activePhotoIndex !== null 
    ? photosOnly.findIndex(p => p._id === filteredItems[activePhotoIndex]?._id)
    : -1;

  const handlePrevPhoto = useCallback(() => {
    if (currentPhotoIndexInPhotos <= 0) return;
    const prevPhoto = photosOnly[currentPhotoIndexInPhotos - 1];
    const originalIdx = filteredItems.findIndex(item => item._id === prevPhoto._id);
    setActivePhotoIndex(originalIdx);
  }, [currentPhotoIndexInPhotos, photosOnly, filteredItems]);

  const handleNextPhoto = useCallback(() => {
    if (currentPhotoIndexInPhotos === -1 || currentPhotoIndexInPhotos >= photosOnly.length - 1) return;
    const nextPhoto = photosOnly[currentPhotoIndexInPhotos + 1];
    const originalIdx = filteredItems.findIndex(item => item._id === nextPhoto._id);
    setActivePhotoIndex(originalIdx);
  }, [currentPhotoIndexInPhotos, photosOnly, filteredItems]);

  // Handle keyboard events for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") setActivePhotoIndex(null);
      if (e.key === "ArrowRight") handleNextPhoto();
      if (e.key === "ArrowLeft") handlePrevPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, handleNextPhoto, handlePrevPhoto]);

  // Image Downloader
  const handleDownload = async (e, imageId, filename) => {
    e.stopPropagation();
    setDownloadingId(imageId);
    try {
      const res = await fetch(`/api/media/${imageId}`);
      if (!res.ok) throw new Error("Failed to fetch image data");
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename || `healing-hands-recovery-${imageId}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert("Could not download image. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  const tabs = [
    { id: "all", label: "All Media" },
    { id: "image", label: "Photos" },
    { id: "video", label: "Videos" }
  ];

  return (
    <div className="space-y-16">
      {/* 3-Way Switcher Tab Filter */}
      <div className="flex justify-center items-center">
        <div className="relative flex p-1.5 bg-slate-100 rounded-full border border-slate-200/50 shadow-inner max-w-md w-full">
          {tabs.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setFilter(tab.id);
                  setActivePhotoIndex(null);
                }}
                className={`relative flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-full select-none z-10 ${
                  isActive ? "text-white" : "text-slate-500 hover:text-medical-blue"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-medical-blue rounded-full -z-10 shadow-lg shadow-medical-blue/10"
                    transition={{ type: "spring", stiffness: 350, damping: 26 }}
                  />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Media Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            const ytId = item.type === "video" ? getYouTubeId(item.videoUrl) : null;
            const thumbUrl = item.type === "image" 
              ? `/api/media/${item.imageId}` 
              : ytId 
                ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
                : null;

            return (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_15px_40px_-15px_rgba(15,23,42,0.06)] hover:shadow-[0_30px_70px_-10px_rgba(37,99,235,0.15)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                {/* Media Wrapper */}
                <div 
                  className="aspect-[4/3] relative w-full bg-slate-50 overflow-hidden"
                >
                  {thumbUrl ? (
                    <img 
                      src={thumbUrl} 
                      alt={item.title || "Clinical Media"} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <ImageIcon size={40} />
                    </div>
                  )}

                  {/* cinematic hover backdrop overlay with actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-medical-blue/40 backdrop-blur-[2px]">
                    {item.type === "image" ? (
                      <>
                        <button 
                          onClick={() => setActivePhotoIndex(index)}
                          className="w-14 h-14 rounded-full bg-white hover:bg-medical-teal hover:text-white shadow-xl flex items-center justify-center text-medical-blue transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border-none"
                          title="Zoom Photo"
                        >
                          <ZoomIn size={22} />
                        </button>
                        <button 
                          onClick={(e) => handleDownload(e, item.imageId, item.title)}
                          disabled={downloadingId === item.imageId}
                          className="w-14 h-14 rounded-full bg-white hover:bg-medical-teal hover:text-white shadow-xl flex items-center justify-center text-medical-blue transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border-none"
                          title="Download Photo"
                        >
                          {downloadingId === item.imageId ? (
                            <Loader2 className="animate-spin" size={20} />
                          ) : (
                            <Download size={20} />
                          )}
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => setActiveVideo(item.videoUrl)}
                        className="w-16 h-16 rounded-full bg-white hover:bg-medical-teal hover:text-white shadow-xl flex items-center justify-center text-medical-blue transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border-none"
                        title="Play Video"
                      >
                        <Play size={24} className="text-medical-teal hover:text-white fill-current ml-1" />
                      </button>
                    )}
                  </div>

                  {/* type indicator icon */}
                  <div className="absolute top-6 left-6 z-20 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-medical-blue border border-slate-100">
                    {item.type === "image" ? <ImageIcon size={18} /> : <VideoIcon size={18} className="text-red-500 fill-red-500/10" />}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-28 border border-dashed border-slate-200 rounded-[3rem] bg-slate-50/50 max-w-xl mx-auto"
        >
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            {filter === "image" ? <ImageIcon size={28} /> : <VideoIcon size={28} />}
          </div>
          <h3 className="text-xl font-bold text-medical-blue">No media uploaded</h3>
          <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
            {filter === "image" 
              ? "We haven't uploaded recovery or clinical photos yet. Check back soon!" 
              : "We haven't linked any case study videos yet. Check back soon!"
            }
          </p>
        </motion.div>
      )}

      {/* --- LIGHTBOX MODALS & OVERLAYS --- */}
      
      {/* 1. YouTube Video Lightbox Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 bg-medical-blue/90 backdrop-blur-md z-[200] flex items-center justify-center p-4 md:p-10"
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-medical-blue flex items-center justify-center transition-all hover:rotate-90"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/10"
            >
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(activeVideo)}?autoplay=1&rel=0`}
                title="Clinical Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Full-Screen Photo Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && filteredItems[activePhotoIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhotoIndex(null)}
            className="fixed inset-0 bg-medical-blue/95 backdrop-blur-lg z-[200] flex flex-col justify-between p-6 select-none"
          >
            {/* Top Bar of Lightbox */}
            <div className="flex items-center justify-between text-white relative z-10">
              <div className="flex items-center gap-3">
                <ImageIcon size={18} className="text-medical-teal" />
                <span className="text-[0.65rem] font-bold uppercase tracking-widest opacity-80">
                  Image {currentPhotoIndexInPhotos + 1} of {photosOnly.length}
                </span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={(e) => handleDownload(e, filteredItems[activePhotoIndex].imageId, filteredItems[activePhotoIndex].title)}
                  disabled={downloadingId === filteredItems[activePhotoIndex].imageId}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-medical-blue flex items-center justify-center transition-all hover:scale-105"
                  title="Download photo"
                >
                  {downloadingId === filteredItems[activePhotoIndex].imageId ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Download size={18} />
                  )}
                </button>
                <button
                  onClick={() => setActivePhotoIndex(null)}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-medical-blue flex items-center justify-center transition-all hover:rotate-90"
                  title="Close lightbox"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Middle Section: Image & Navigation */}
            <div className="relative flex-1 flex items-center justify-center py-4">
              {/* Navigation Left */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevPhoto();
                }}
                disabled={currentPhotoIndexInPhotos <= 0}
                className={`absolute left-0 w-14 h-14 rounded-full flex items-center justify-center text-white border transition-all z-20 ${
                  currentPhotoIndexInPhotos <= 0 
                    ? "opacity-20 border-white/10 cursor-not-allowed" 
                    : "bg-white/5 border-white/10 hover:bg-white hover:text-medical-blue hover:scale-105"
                }`}
              >
                <ChevronLeft size={28} />
              </button>

              {/* Main Lightbox Image */}
              <motion.div
                key={filteredItems[activePhotoIndex]._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-[85vw] max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl relative border border-white/5 bg-slate-950 flex items-center justify-center"
              >
                <img
                  src={`/api/media/${filteredItems[activePhotoIndex].imageId}`}
                  alt={filteredItems[activePhotoIndex].title || "Lightbox Media"}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </motion.div>

              {/* Navigation Right */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextPhoto();
                }}
                disabled={currentPhotoIndexInPhotos >= photosOnly.length - 1}
                className={`absolute right-0 w-14 h-14 rounded-full flex items-center justify-center text-white border transition-all z-20 ${
                  currentPhotoIndexInPhotos >= photosOnly.length - 1 
                    ? "opacity-20 border-white/10 cursor-not-allowed" 
                    : "bg-white/5 border-white/10 hover:bg-white hover:text-medical-blue hover:scale-105"
                }`}
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Bottom Bar: Title Caption */}
            <div className="text-center text-white max-w-xl mx-auto pb-4 relative z-10">
              <h4 className="text-lg font-bold tracking-tight">
                {filteredItems[activePhotoIndex].title || "Healing Hands Recovery Archive"}
              </h4>
              <p className="text-xs text-slate-400 mt-2">
                Click side arrows or use key arrows (← / →) on your keyboard to navigate photos.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
