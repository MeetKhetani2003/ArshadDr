"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, CheckCircle2, Loader2, Trash2, Edit3, 
  Plus, ExternalLink, Navigation, Phone, Clock, 
  Building2, Hash, FileText, Compass, Sparkles, X, RotateCcw
} from "lucide-react";

export default function AdminLocationsManager() {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editingLocation, setEditingLocation] = useState(null);

  // Form Fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [brand, setBrand] = useState("Healing Hands Physiotherapy");
  const [subtitle, setSubtitle] = useState("");
  const [isPartner, setIsPartner] = useState(false);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [hours, setHours] = useState("Mon–Sat: 8:00 AM – 2:00 PM & 4:00 PM – 8:30 PM");
  const [phone, setPhone] = useState("+91 63780 62237");
  const [description, setDescription] = useState("");

  // Dynamic Lists
  const [landmarks, setLandmarks] = useState([
    { name: "", tag: "MAIN HUB" }
  ]);
  const [areas, setAreas] = useState([]);
  const [newAreaInput, setNewAreaInput] = useState("");

  const [services, setServices] = useState([
    "Neurological Rehabilitation (Stroke, Paralysis, Parkinson's)",
    "Orthopedic Physiotherapy (Back, Neck, Joint & Knee Pain)",
    "Post-Operative Recovery & Joint Replacement Care",
    "Pediatric & Child Development Therapy",
  ]);
  const [newServiceInput, setNewServiceInput] = useState("");

  const fetchLocations = async () => {
    try {
      const res = await fetch("/api/locations", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setLocations(data);
      }
    } catch (err) {
      console.error("Failed to load locations:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    if (!editingLocation) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
    }
  };

  const handleEdit = (loc) => {
    setEditingLocation(loc);
    setName(loc.name || "");
    setSlug(loc.slug || "");
    setBrand(loc.brand || "Healing Hands Physiotherapy");
    setSubtitle(loc.subtitle || "");
    setIsPartner(Boolean(loc.isPartner));
    setAddress(loc.address || "");
    setPincode(loc.pincode || "");
    setHours(loc.hours || "Mon–Sat: 8:00 AM – 2:00 PM & 4:00 PM – 8:30 PM");
    setPhone(loc.phone || "+91 63780 62237");
    setDescription(loc.description || "");

    // Normalize landmarks
    const parsedLandmarks = (loc.landmarks || []).map((lm) => {
      if (typeof lm === "string") return { name: lm, tag: "LANDMARK" };
      return { name: lm.name || "", tag: lm.tag || "LANDMARK" };
    });
    setLandmarks(parsedLandmarks.length > 0 ? parsedLandmarks : [{ name: "", tag: "MAIN HUB" }]);

    setAreas(Array.isArray(loc.areas) ? [...loc.areas] : []);

    if (loc.services && loc.services.length > 0) {
      setServices([...loc.services]);
    } else {
      setServices([
        "Neurological Rehabilitation (Stroke, Paralysis, Parkinson's)",
        "Orthopedic Physiotherapy (Back, Neck, Joint & Knee Pain)",
        "Post-Operative Recovery & Joint Replacement Care",
        "Pediatric & Child Development Therapy",
        "Home Visit Physiotherapy in " + (loc.name || "this area"),
      ]);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingLocation(null);
    setName("");
    setSlug("");
    setBrand("Healing Hands Physiotherapy");
    setSubtitle("");
    setIsPartner(false);
    setAddress("");
    setPincode("");
    setHours("Mon–Sat: 8:00 AM – 2:00 PM & 4:00 PM – 8:30 PM");
    setPhone("+91 63780 62237");
    setDescription("");
    setLandmarks([{ name: "", tag: "MAIN HUB" }]);
    setAreas([]);
    setServices([
      "Neurological Rehabilitation (Stroke, Paralysis, Parkinson's)",
      "Orthopedic Physiotherapy (Back, Neck, Joint & Knee Pain)",
      "Post-Operative Recovery & Joint Replacement Care",
      "Pediatric & Child Development Therapy",
    ]);
  };

  // Landmark Handlers
  const addLandmark = () => {
    setLandmarks([...landmarks, { name: "", tag: "5 MINS DRIVE" }]);
  };

  const updateLandmark = (index, field, value) => {
    const updated = [...landmarks];
    updated[index][field] = value;
    setLandmarks(updated);
  };

  const removeLandmark = (index) => {
    if (landmarks.length === 1) {
      setLandmarks([{ name: "", tag: "MAIN HUB" }]);
      return;
    }
    setLandmarks(landmarks.filter((_, i) => i !== index));
  };

  // Area Handlers
  const addArea = () => {
    const trimmed = newAreaInput.trim();
    if (trimmed && !areas.includes(trimmed)) {
      setAreas([...areas, trimmed]);
      setNewAreaInput("");
    }
  };

  const removeArea = (areaToRemove) => {
    setAreas(areas.filter((a) => a !== areaToRemove));
  };

  // Service Handlers
  const addService = () => {
    const trimmed = newServiceInput.trim();
    if (trimmed && !services.includes(trimmed)) {
      setServices([...services, trimmed]);
      setNewServiceInput("");
    }
  };

  const removeService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const filteredLandmarks = landmarks.filter((l) => l.name && l.name.trim().length > 0);

    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      brand: brand.trim(),
      subtitle: subtitle.trim(),
      isPartner,
      description: description.trim(),
      address: address.trim(),
      pincode: pincode.trim(),
      hours: hours.trim(),
      phone: phone.trim(),
      landmarks: filteredLandmarks,
      areas,
      services,
    };

    try {
      const targetId = editingLocation ? (editingLocation._id || editingLocation.slug) : null;
      const url = editingLocation ? `/api/locations/${targetId}` : "/api/locations";
      const method = editingLocation ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccessMessage(
          editingLocation
            ? `Location "${payload.name}" updated successfully!`
            : `Location "${payload.name}" created successfully!`
        );
        fetchLocations();
        handleCancelEdit();
        setTimeout(() => setSuccessMessage(""), 4000);
      } else {
        const data = await res.json();
        setErrorMessage(data.error || "Failed to save location.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error while saving location.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (loc) => {
    if (!confirm(`Are you sure you want to delete "${loc.name}"?`)) return;

    try {
      const targetId = loc._id || loc.slug;
      const res = await fetch(`/api/locations/${targetId}`, { method: "DELETE" });
      if (res.ok) {
        setLocations((prev) => prev.filter((l) => (l._id ? l._id !== loc._id : l.slug !== loc.slug)));
      } else {
        const data = await res.json();
        alert(data.error || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting location");
    }
  };

  const popularTags = ["MAIN HUB", "5 MINS DRIVE", "PROMINENT", "1 MIN WALK", "LANDMARK", "CENTRAL", "WALKABLE", "NEAR CIRCLE"];

  return (
    <main className="w-full">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Alerts */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-emerald-500 text-white flex items-center gap-3 shadow-lg"
            >
              <CheckCircle2 size={20} />
              <span className="font-semibold text-sm">{successMessage}</span>
            </motion.div>
          )}

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-rose-500 text-white flex items-center gap-3 shadow-lg"
            >
              <X size={20} />
              <span className="font-semibold text-sm">{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Location Form Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-medical-blue p-8 md:p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-medical-teal/20 text-medical-teal font-bold text-xs uppercase tracking-wider">
                  Location Editor
                </span>
                {editingLocation && (
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs">
                    Editing: {editingLocation.name}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold">
                {editingLocation ? "Update Center & Landmarks" : "Add New Clinic Location"}
              </h1>
              <p className="text-slate-300 mt-2 text-sm max-w-xl">
                Configure clinic branch details, operational hours, nearby landmarks (with badges), and neighborhood coverage.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {editingLocation && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-all"
                >
                  <RotateCcw size={14} /> Cancel Edit
                </button>
              )}
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-medical-teal shrink-0">
                <MapPin size={28} />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
            {/* Primary Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Center / Hospital Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vasundhara Hospital"
                  value={name}
                  onChange={handleNameChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-teal text-slate-800 font-medium text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  URL Slug (Unique Page Identifier) *
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-3 bg-slate-100 text-slate-400 border border-r-0 border-slate-200 rounded-l-xl text-xs font-mono">
                    /locations/
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="vasundhara-hospital"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, ""))}
                    className="flex-1 px-4 py-3 rounded-r-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-teal text-slate-800 font-mono text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Brand / Hub Label
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Healing Hands Physiotherapy"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-teal text-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Branch Classification
                </label>
                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isPartner"
                      checked={!isPartner}
                      onChange={() => setIsPartner(false)}
                      className="accent-medical-teal"
                    />
                    <span className="text-xs font-bold text-slate-700">Healing Hands Direct Hub</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isPartner"
                      checked={isPartner}
                      onChange={() => setIsPartner(true)}
                      className="accent-medical-teal"
                    />
                    <span className="text-xs font-bold text-amber-700">Partner Clinic</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Phone / Helpline
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 63780 62237"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-teal text-slate-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 342008"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-teal text-slate-800 text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Operational Working Hours
                </label>
                <input
                  type="text"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="Mon–Sat: 8:00 AM – 2:00 PM & 4:00 PM – 8:30 PM"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-teal text-slate-800 text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Complete Address *
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Vasundhara Hospital, Chopasni Housing Board, Jodhpur"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-teal text-slate-800 text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Location Overview / Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short introductory description about this center and facilities..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-teal text-slate-800 text-sm"
                />
              </div>
            </div>

            {/* KEY NEARBY LANDMARKS SECTION (Target of User Request!) */}
            <div className="pt-6 border-t border-slate-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Navigation size={18} className="text-medical-teal" />
                    <h3 className="text-lg font-bold text-medical-blue">Key Nearby Landmarks</h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Displayed prominently on this center&apos;s page (e.g. &ldquo;Chopasni Housing Board Circle&rdquo; with tag badge &ldquo;MAIN HUB&rdquo;).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addLandmark}
                  className="px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-medical-teal font-bold text-xs flex items-center gap-2 transition-colors self-start md:self-auto"
                >
                  <Plus size={16} /> Add Landmark
                </button>
              </div>

              {/* Quick Tag Recommendations */}
              <div className="mb-4 flex items-center gap-1.5 flex-wrap">
                <span className="text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mr-1">Quick Tag Badges:</span>
                {popularTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.62rem] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded cursor-default border border-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-3">
                {landmarks.map((lm, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row items-stretch md:items-center gap-3 transition-all hover:border-medical-teal/40"
                  >
                    <div className="flex-1">
                      <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Landmark Name #{index + 1}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Chopasni Housing Board Circle"
                        value={lm.name}
                        onChange={(e) => updateLandmark(index, "name", e.target.value)}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-medical-teal"
                      />
                    </div>

                    <div className="w-full md:w-44">
                      <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Tag / Badge (e.g. MAIN HUB)
                      </label>
                      <input
                        type="text"
                        placeholder="MAIN HUB / 5 MINS DRIVE"
                        value={lm.tag}
                        onChange={(e) => updateLandmark(index, "tag", e.target.value)}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-xs font-bold text-slate-800 uppercase focus:outline-none focus:ring-1 focus:ring-medical-teal"
                      />
                    </div>

                    {/* Preview Badge */}
                    <div className="hidden lg:flex flex-col justify-end w-48">
                      <span className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Live Preview
                      </span>
                      <div className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-1.5 truncate">
                        <Navigation size={10} className="text-medical-teal shrink-0" />
                        <span className="truncate">{lm.name || "Landmark"}</span>
                        {lm.tag && (
                          <span className="text-[0.55rem] font-bold text-medical-teal bg-teal-50 px-1.5 py-0.2 rounded border border-teal-100 shrink-0">
                            {lm.tag}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeLandmark(index)}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white transition-colors"
                        title="Remove Landmark"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SURROUNDING AREAS COVERED SECTION */}
            <div className="pt-6 border-t border-slate-100">
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <Compass size={18} className="text-medical-teal" />
                  <h3 className="text-lg font-bold text-medical-blue">Surrounding Areas Covered</h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Localities and neighborhoods served by this facility (e.g. Shastri Nagar, Kamla Nehru Nagar, Pal Road).
                </p>
              </div>

              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Type area name (e.g. Shastri Nagar) and press Add"
                  value={newAreaInput}
                  onChange={(e) => setNewAreaInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addArea();
                    }
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-teal"
                />
                <button
                  type="button"
                  onClick={addArea}
                  className="px-5 py-2.5 rounded-xl bg-medical-blue hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Plus size={14} /> Add Area
                </button>
              </div>

              <div className="flex flex-wrap gap-2 min-h-10 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                {areas.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">No areas added yet. Type an area above to add.</span>
                ) : (
                  areas.map((area, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-sm"
                    >
                      <CheckCircle2 size={12} className="text-medical-teal" />
                      <span>{area}</span>
                      <button
                        type="button"
                        onClick={() => removeArea(area)}
                        className="text-slate-400 hover:text-rose-500"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* SERVICES OFFERED AT THIS LOCATION */}
            <div className="pt-6 border-t border-slate-100">
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-medical-teal" />
                  <h3 className="text-lg font-bold text-medical-blue">Physiotherapy Services at this Center</h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  List of specialized services highlighted in the location card on this page.
                </p>
              </div>

              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Add custom therapy (e.g. Sports Injury & Dry Needling)"
                  value={newServiceInput}
                  onChange={(e) => setNewServiceInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addService();
                    }
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-medical-teal"
                />
                <button
                  type="button"
                  onClick={addService}
                  className="px-5 py-2.5 rounded-xl bg-medical-blue hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Plus size={14} /> Add Service
                </button>
              </div>

              <div className="space-y-2">
                {services.map((srv, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 font-medium text-slate-800">
                      <CheckCircle2 size={14} className="text-medical-teal shrink-0" />
                      <span>{srv}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeService(idx)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-4">
              {editingLocation && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-6 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 rounded-xl bg-medical-teal hover:bg-[#559c2f] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-medical-teal/20 flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>{editingLocation ? "Save Changes" : "Create Location Center"}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* List of Existing Centers */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-medical-blue">Current Clinic Locations & Centers</h2>
              <p className="text-xs text-slate-500 mt-1">
                Click &ldquo;Edit&rdquo; on any center below (including Vasundhara Hospital) to change its landmarks and details.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600">
              {locations.length} Total Centers
            </span>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-slate-400">
              <Loader2 size={32} className="animate-spin mx-auto mb-2 text-medical-teal" />
              <p className="text-sm font-medium">Loading clinical locations...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {locations.map((loc) => (
                <div
                  key={loc.slug}
                  className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[0.65rem] font-bold text-white bg-medical-teal px-2.5 py-0.5 rounded-md uppercase">
                        PIN {loc.pincode || "Jodhpur"}
                      </span>
                      {loc.isPartner ? (
                        <span className="text-[0.65rem] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 uppercase">
                          Partner Clinic
                        </span>
                      ) : (
                        <span className="text-[0.65rem] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase">
                          Healing Hands Hub
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-medical-blue mb-1 flex items-center justify-between">
                      <span>{loc.name}</span>
                    </h3>
                    <p className="text-[0.7rem] font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      {loc.brand || "Healing Hands Physiotherapy"}
                    </p>

                    <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                      {loc.address}
                    </p>

                    {/* Landmarks pill preview */}
                    <div className="mb-4">
                      <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Key Nearby Landmarks ({(loc.landmarks || []).length}):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {(loc.landmarks || []).map((lm, i) => {
                          const label = typeof lm === "string" ? lm : lm.name;
                          const tag = typeof lm === "object" && lm.tag ? lm.tag : null;
                          return (
                            <span
                              key={i}
                              className="text-[0.65rem] font-medium bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md text-slate-700 flex items-center gap-1"
                            >
                              <Navigation size={9} className="text-medical-teal" />
                              <span>{label}</span>
                              {tag && (
                                <span className="text-[0.55rem] font-bold text-medical-teal bg-teal-50 px-1 py-0.2 rounded">
                                  {tag}
                                </span>
                              )}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Areas preview */}
                    <div className="mb-4">
                      <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Areas Covered ({(loc.areas || []).length}):
                      </span>
                      <p className="text-xs text-slate-600 truncate">
                        {(loc.areas || []).join(", ") || "No areas specified"}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <a
                      href={`/locations/${loc.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-medical-teal hover:underline flex items-center gap-1"
                    >
                      <ExternalLink size={12} /> View Page
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(loc)}
                        className="px-3.5 py-1.5 rounded-xl bg-medical-blue hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Edit3 size={12} /> Edit Details
                      </button>

                      {loc._id && (
                        <button
                          type="button"
                          onClick={() => handleDelete(loc)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Location"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
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
