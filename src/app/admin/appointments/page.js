"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Calendar, User, FileText, Clock, Stethoscope, Video, MapPin, Edit2, X, CheckCircle, Mail, Phone, Trash2 } from "lucide-react";

export default function AdminAppointments() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Edit State
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editData, setEditData] = useState({ date: "", time: "", status: "" });
  const [isSaving, setIsSaving] = useState(false);

  // Filters
  const [filterDoctor, setFilterDoctor] = useState("");
  const [filterService, setFilterService] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterTime, setFilterTime] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleEditClick = (booking) => {
    setEditingBookingId(booking._id);
    setEditData({
      date: booking.date,
      time: booking.time,
      status: booking.status || "Pending"
    });
  };

  const handleSaveEdit = async (id) => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (res.ok) {
        setEditingBookingId(null);
        
        // Update selectedBooking if it's currently open
        if (selectedBooking && selectedBooking._id === id) {
          setSelectedBooking({
            ...selectedBooking,
            date: editData.date,
            time: editData.time,
            status: editData.status
          });
        }

        fetchBookings(); // Refresh list to get updated data
      } else {
        alert("Failed to update booking");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating booking");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSelectedBooking(null);
        setEditingBookingId(null);
        fetchBookings();
      } else {
        alert("Failed to delete booking");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting booking");
    }
  };

  // Derive unique values for filter dropdowns
  const uniqueDoctors = [...new Set(bookings.map((b) => b.doctor))].filter(Boolean);
  const uniqueServices = [...new Set(bookings.map((b) => b.treatment))].filter(Boolean);
  const uniqueDates = [...new Set(bookings.map((b) => b.date))].filter(Boolean);
  const uniqueTimes = [...new Set(bookings.map((b) => b.time))].filter(Boolean);

  // Apply filters
  const filteredBookings = bookings.filter((b) => {
    if (filterDoctor && b.doctor !== filterDoctor) return false;
    if (filterService && b.treatment !== filterService) return false;
    if (filterDate && b.date !== filterDate) return false;
    if (filterTime && b.time !== filterTime) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-site max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 px-4 md:px-0">
          <div>
            <h1 className="text-3xl font-bold text-medical-blue mb-2">Appointments Directory</h1>
            <p className="text-slate-500 font-medium">Manage and filter patient inquiries</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-medical-teal animate-pulse" />
            <span className="text-sm font-bold text-medical-blue">{filteredBookings.length} Inquiries Found</span>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 mb-10 px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Doctor Filter */}
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Filter by Doctor</label>
              <div className="relative">
                <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <select
                  value={filterDoctor}
                  onChange={(e) => setFilterDoctor(e.target.value)}
                  className="w-full pl-10 pr-6 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-medical-teal appearance-none text-sm font-medium text-medical-blue"
                >
                  <option value="">All Doctors</option>
                  {uniqueDoctors.map((doc) => (
                    <option key={doc} value={doc}>{doc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Service Filter */}
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Filter by Service</label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <select
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                  className="w-full pl-10 pr-6 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-medical-teal appearance-none text-sm font-medium text-medical-blue"
                >
                  <option value="">All Services</option>
                  {uniqueServices.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date Filter */}
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Filter by Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <select
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full pl-10 pr-6 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-medical-teal appearance-none text-sm font-medium text-medical-blue"
                >
                  <option value="">All Dates</option>
                  {uniqueDates.map((date) => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Filter */}
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Filter by Time</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <select
                  value={filterTime}
                  onChange={(e) => setFilterTime(e.target.value)}
                  className="w-full pl-10 pr-6 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-medical-teal appearance-none text-sm font-medium text-medical-blue"
                >
                  <option value="">All Times</option>
                  {uniqueTimes.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* Clear Filters */}
          {(filterDoctor || filterService || filterDate || filterTime) && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setFilterDoctor("");
                  setFilterService("");
                  setFilterDate("");
                  setFilterTime("");
                }}
                className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors bg-red-50 px-4 py-2 rounded-lg"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Listings */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-medical-teal" size={48} />
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-4 px-4 md:px-0">
            {filteredBookings.map((booking) => (
              <motion.div
                key={booking._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedBooking(booking)}
                className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-medical-teal/50 transition-all relative overflow-hidden cursor-pointer group"
              >
                {/* Status Indicator (Dot) */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`px-2.5 py-1 rounded-md text-[0.6rem] font-bold uppercase tracking-widest text-white ${
                    booking.status === "Scheduled" ? "bg-emerald-500" :
                    booking.status === "Completed" ? "bg-blue-500" :
                    booking.status === "Cancelled" ? "bg-red-500" :
                    "bg-medical-teal"
                  }`}>
                    {booking.status || "Pending"}
                  </div>
                  {booking.consultType === "Online" ? (
                    <Video size={14} className="text-slate-400 group-hover:text-medical-teal transition-colors" />
                  ) : (
                    <MapPin size={14} className="text-slate-400 group-hover:text-medical-teal transition-colors" />
                  )}
                </div>

                {/* Patient Info */}
                <h3 className="text-base font-bold text-medical-blue mb-1 line-clamp-1">{booking.name}</h3>
                
                <div className="text-xs text-slate-500 space-y-1.5 mt-3 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <FileText size={12} className="text-medical-teal" />
                    <span className="line-clamp-1">{booking.treatment}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={12} className="text-slate-400" />
                    <span>{booking.date} at {booking.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 px-4 md:px-0">
            <Calendar size={48} className="mx-auto text-slate-200 mb-4" />
            <h3 className="text-xl font-bold text-medical-blue mb-2">No Appointments Found</h3>
            <p className="text-slate-500">There are no inquiries matching your current filters.</p>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-medical-blue/40 backdrop-blur-sm"
            onClick={() => {
              setSelectedBooking(null);
              setEditingBookingId(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-100 px-8 py-5 flex items-center justify-between z-10">
                <h2 className="text-xl font-bold text-medical-blue">Inquiry Details</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(selectedBooking._id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                    title="Delete Inquiry"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBooking(null);
                      setEditingBookingId(null);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="p-8">
                {/* Header Info */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-medical-blue mb-2">{selectedBooking.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5"><Mail size={14} /> {selectedBooking.email}</span>
                      <span className="flex items-center gap-1.5"><Phone size={14} /> {selectedBooking.phone}</span>
                    </div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest text-white ${
                    selectedBooking.status === "Scheduled" ? "bg-emerald-500" :
                    selectedBooking.status === "Completed" ? "bg-blue-500" :
                    selectedBooking.status === "Cancelled" ? "bg-red-500" :
                    "bg-medical-teal"
                  }`}>
                    {selectedBooking.status || "Pending"}
                  </div>
                </div>

                {/* Logistics */}
                <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                  {editingBookingId === selectedBooking._id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-1.5 block">Status</label>
                        <select
                          value={editData.status}
                          onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-medical-teal font-medium"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Scheduled">Scheduled (Sends Confirmation Email)</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-1.5 block">Date</label>
                          <input
                            type="date"
                            value={editData.date}
                            onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-medical-teal font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-1.5 block">Time</label>
                          <input
                            type="time"
                            value={editData.time}
                            onChange={(e) => setEditData({ ...editData, time: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-medical-teal font-medium"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4 border-t border-slate-200">
                        <button
                          onClick={() => handleSaveEdit(selectedBooking._id)}
                          disabled={isSaving}
                          className="flex-1 bg-medical-blue hover:bg-medical-teal text-white py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
                        >
                          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />} Save Changes
                        </button>
                        <button
                          onClick={() => setEditingBookingId(null)}
                          disabled={isSaving}
                          className="flex-1 bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
                        >
                          <X size={16} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-slate-100">
                            <Calendar size={18} className="text-medical-teal" />
                          </div>
                          <div>
                            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">Date & Time</p>
                            <p className="text-base font-bold text-medical-blue">{selectedBooking.date} at {selectedBooking.time}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleEditClick(selectedBooking)}
                          className="text-slate-500 hover:text-medical-teal hover:bg-white p-2 rounded-lg border border-transparent hover:border-slate-200 hover:shadow-sm transition-all flex items-center gap-2 text-sm font-bold"
                        >
                          <Edit2 size={16} /> Edit
                        </button>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-slate-100">
                            <Stethoscope size={18} className="text-medical-teal" />
                          </div>
                          <div>
                            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">Consultant</p>
                            <p className="text-sm font-bold text-medical-blue">{selectedBooking.doctor}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-slate-100">
                            {selectedBooking.consultType === "Online" ? <Video size={18} className="text-medical-teal" /> : <MapPin size={18} className="text-medical-teal" />}
                          </div>
                          <div>
                            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">Mode</p>
                            <p className="text-sm font-bold text-medical-blue">{selectedBooking.consultType} Consultation</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Treatment & Problem */}
                <div>
                  <h4 className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-3">Medical Inquiry</h4>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-medical-blue/5 text-medical-blue rounded-xl text-sm font-bold mb-4 border border-medical-blue/10">
                    <FileText size={16} />
                    {selectedBooking.treatment}
                  </div>
                  
                  {selectedBooking.problem ? (
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                      <p className="text-slate-600 text-sm leading-relaxed italic">
                        "{selectedBooking.problem}"
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400 italic">No additional problem description provided.</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
