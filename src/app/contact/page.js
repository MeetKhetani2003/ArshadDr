"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone, MapPin, CheckCircle2, Clock,
  ArrowRight, Loader2, Calendar, User, Activity, 
  Stethoscope, Info
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { teamMembers } from "@/data/team";
import { treatments } from "@/data/treatments";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".scroll-reveal", {
        y: 0,
        opacity: 1,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".scroll-reveal",
          start: "top 85%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (err) {
      alert("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <main ref={containerRef} className="bg-white min-h-screen selection:bg-medical-teal selection:text-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/contact_hero_v2.png"
            alt="Book Appointment"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-medical-blue/85 z-10" />
        </div>

        <div className="max-site relative z-20">
          <motion.div initial="hidden" animate="visible" variants={heroVariants}>
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 mb-8">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-medical-teal">Clinical Scheduler</span>
              </div>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-8">
              Book Your <br /> <span className="text-medical-teal">Recovery.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-slate-300 text-lg md:text-xl max-w-xl font-normal opacity-90 leading-relaxed">
              Schedule your consultation with Jodhpur's leading clinical specialists. 
              Personalized assessment for home or clinic care.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== BOOKING GRID ===== */}
      <section className="section-padding bg-white relative -mt-20 z-30">
        <div className="max-site">
          <div className="grid lg:grid-cols-12 gap-12 items-start">

            {/* Left: Info & Trust */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-medical-blue rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-medical-teal/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                
                <h2 className="text-2xl font-bold mb-6 relative z-10">Why Book Online?</h2>
                <div className="space-y-6 relative z-10">
                  {[
                    { title: "Priority Slots", desc: "Online bookings are prioritized in our daily schedule." },
                    { title: "Instant Receipt", desc: "Get a clinical receipt immediately on your email." },
                    { title: "Zero Wait Time", desc: "Report 5 mins before your slot for instant consultation." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1"><CheckCircle2 className="text-medical-teal" size={18} /></div>
                      <div>
                        <p className="font-bold text-sm mb-1">{item.title}</p>
                        <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-medical-teal/10 flex items-center justify-center text-medical-teal">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest">Support Line</p>
                    <p className="font-bold text-medical-blue">+91 63780 62237</p>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-medical-blue/10 flex items-center justify-center text-medical-blue">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest">Hours</p>
                    <p className="font-bold text-medical-blue">8 AM — 8 PM (Mon-Sat)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Detailed Booking Form */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-100 relative">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold text-medical-blue tracking-tight">Book Appointment</h2>
                  <p className="text-slate-500 mt-2 font-medium">Please fill in the details below to schedule your consultation.</p>
                </div>
                
                {status === "success" ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-3xl font-bold text-medical-blue mb-4">Booking Confirmed!</h3>
                    <p className="text-slate-500 text-lg max-w-md mx-auto mb-10">
                      We've received your request. A clinical receipt has been sent to your email. Our team will call you to confirm the final slot.
                    </p>
                    <button 
                      onClick={() => setStatus(null)} 
                      className="btn-modern btn-primary px-10 py-4"
                    >
                      Schedule Another Slot
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Patient Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input required name="name" type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-medical-teal focus:bg-white transition-all font-medium text-medical-blue" placeholder="Enter full name" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input required name="phone" type="tel" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-medical-teal focus:bg-white transition-all font-medium text-medical-blue" placeholder="+91 00000 00000" />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Email (For Receipt)</label>
                        <div className="relative">
                          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input required name="email" type="email" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-medical-teal focus:bg-white transition-all font-medium text-medical-blue" placeholder="name@email.com" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Consultation Mode</label>
                        <div className="grid grid-cols-2 gap-2">
                          <label className="flex items-center justify-center gap-2 p-4 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50 transition-all has-[:checked]:bg-medical-blue has-[:checked]:text-white">
                            <input type="radio" name="consultType" value="Offline" defaultChecked className="hidden" />
                            <MapPin size={16} /> <span className="text-xs font-bold uppercase tracking-widest">Clinic</span>
                          </label>
                          <label className="flex items-center justify-center gap-2 p-4 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50 transition-all has-[:checked]:bg-medical-teal has-[:checked]:text-white">
                            <input type="radio" name="consultType" value="Online" className="hidden" />
                            <Activity size={16} /> <span className="text-xs font-bold uppercase tracking-widest">Online</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Select Treatment</label>
                        <div className="relative">
                          <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <select name="treatment" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-medical-teal focus:bg-white transition-all font-medium text-medical-blue appearance-none">
                            {treatments.map((t, idx) => (
                              <option key={idx} value={t.title}>{t.title}</option>
                            ))}
                            <option value="General Consultation">General Consultation</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Select Specialist</label>
                        <div className="relative">
                          <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <select name="doctor" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-medical-teal focus:bg-white transition-all font-medium text-medical-blue appearance-none">
                            {teamMembers.map((d, idx) => (
                              <option key={idx} value={d.name}>{d.name}</option>
                            ))}
                            <option value="Any Specialist">Any Available Specialist</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Appointment Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input required name="date" type="date" min={new Date().toISOString().split('T')[0]} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-medical-teal focus:bg-white transition-all font-medium text-medical-blue" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Preferred Time Slot</label>
                        <div className="relative">
                          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <select name="time" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-medical-teal focus:bg-white transition-all font-medium text-medical-blue appearance-none">
                            <option>Morning (08:00 AM - 12:00 PM)</option>
                            <option>Afternoon (12:00 PM - 04:00 PM)</option>
                            <option>Evening (04:00 PM - 08:00 PM)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Clinical Details (Optional)</label>
                      <div className="relative">
                        <Info className="absolute left-4 top-4 text-slate-300" size={18} />
                        <textarea name="problem" rows={4} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-medical-teal focus:bg-white transition-all font-medium text-medical-blue resize-none" placeholder="Briefly describe your symptoms or recovery goals..." />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-6 bg-medical-blue text-white rounded-[2rem] font-bold text-sm uppercase tracking-widest hover:bg-medical-teal transition-all shadow-2xl shadow-medical-blue/20 flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="animate-spin" /> Processing...</>
                      ) : (
                        <>Confirm Appointment <ArrowRight size={20} /></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOCATIONS MAP SECTION ===== */}
      <section className="section-padding bg-slate-50 border-t border-slate-100">
        <div className="max-site">
          <div className="text-center max-w-2xl mx-auto mb-16 will-animate scroll-reveal reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-medical-blue mb-4 tracking-tight">Our Presence</h2>
            <p className="text-slate-500 font-medium text-lg">Multiple clinical hubs across Jodhpur for your convenience.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Main Clinical Center", location: "Chopasni Housing Board", phone: "6378062237" },
              { title: "AIIMS Hub", location: "Near AIIMS, Jodhpur", phone: "9571052222" },
              { title: "Paota Center", location: "Paota B Road, Jodhpur", phone: "6378062237" }
            ].map((loc, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                <div className="w-12 h-12 rounded-2xl bg-medical-blue/5 flex items-center justify-center text-medical-blue mb-6">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-bold text-medical-blue mb-2">{loc.title}</h3>
                <p className="text-slate-500 text-sm mb-6">{loc.location}</p>
                <a href={`tel:${loc.phone}`} className="text-medical-teal font-bold text-sm uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                  Contact <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
