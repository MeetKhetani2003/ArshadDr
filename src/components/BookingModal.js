"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, Phone, Mail, Stethoscope, ChevronDown, CheckCircle2, Loader2 } from "lucide-react";
import { teamMembers } from "@/data/team";
import { treatments } from "@/data/treatments";

export default function BookingModal({ isOpen, onClose, initialData = {} }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    treatment: initialData.treatment || "",
    doctor: initialData.doctor || "",
    consultType: initialData.consultType || "Offline",
    problem: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        treatment: initialData.treatment || prev.treatment || "",
        doctor: initialData.doctor || prev.doctor || "",
        consultType: initialData.consultType || "Offline",
      }));
      setIsSuccess(false);
    }
  }, [isOpen, initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-medical-blue/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-medical-blue p-8 flex justify-between items-center text-white shrink-0">
              <div>
                <h2 className="text-2xl font-bold">Book Appointment</h2>
                <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-bold">Healing Hands Physiotherapy</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto p-8 pt-6 scrollbar-hide">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 bg-medical-teal/10 rounded-full flex items-center justify-center text-medical-teal mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-bold text-medical-blue mb-2">Booking Confirmed!</h3>
                  <p className="text-slate-500 max-w-sm">A professional receipt has been sent to your email. We will contact you shortly to confirm the slot.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          required
                          type="text"
                          placeholder="John Doe"
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal focus:ring-4 focus:ring-medical-teal/5 transition-all"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          required
                          type="tel"
                          placeholder="+91 00000 00000"
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal focus:ring-4 focus:ring-medical-teal/5 transition-all"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal focus:ring-4 focus:ring-medical-teal/5 transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Treatment & Doctor */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Treatment Type</label>
                      <div className="relative">
                        <select
                          required
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none appearance-none cursor-pointer"
                          value={formData.treatment}
                          onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                        >
                          <option value="">Select Treatment</option>
                          {treatments.map((t) => (
                            <option key={t.slug} value={t.title}>{t.title}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Preferred Doctor</label>
                      <div className="relative">
                        <select
                          required
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none appearance-none cursor-pointer"
                          value={formData.doctor}
                          onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                        >
                          <option value="">Select Doctor</option>
                          {teamMembers.map((m) => (
                            <option key={m.slug} value={m.name}>{m.name}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                  </div>

                  {/* Consult Type */}
                  <div className="flex gap-4 p-1 bg-slate-100 rounded-2xl">
                    {["Offline", "Online"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, consultType: type })}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                          formData.consultType === type
                            ? "bg-white text-medical-blue shadow-sm"
                            : "text-slate-500 hover:text-medical-blue"
                        }`}
                      >
                        {type} Consultation
                      </button>
                    ))}
                  </div>

                  {/* Problem Details */}
                  <div className="space-y-1.5">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Problem Details</label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your condition..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-medical-teal focus:ring-4 focus:ring-medical-teal/5 transition-all resize-none"
                      value={formData.problem}
                      onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    />
                  </div>

                  {/* Date & Time */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          required
                          type="date"
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Preferred Time</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          required
                          type="time"
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-5 bg-medical-blue text-white rounded-[2rem] font-bold text-lg hover:bg-medical-teal hover:-translate-y-1 transition-all shadow-xl flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>Confirm Appointment</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
