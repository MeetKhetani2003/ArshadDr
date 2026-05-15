"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone, MapPin, CheckCircle2, Clock,
  ArrowRight, Loader2, Calendar, User, Activity, 
  Stethoscope, Info, Navigation2, ArrowUpRight
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { teamMembers, locations } from "@/data/team";
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
      <section className="relative min-h-[75vh] flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/contact_hero_v2.png"
            alt="Book Appointment"
            fill
            className="object-cover scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-blue via-medical-blue/90 to-medical-blue/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/50 to-transparent z-10" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(6,182,212,0.15),transparent_50%)] z-10" />
        </div>

        <div className="max-site relative z-20">
          <motion.div initial="hidden" animate="visible" variants={heroVariants}>
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-10">
              <div className="w-12 h-px bg-medical-teal" />
              <span className="text-[0.65rem] md:text-xs font-bold uppercase tracking-[0.4em] text-medical-teal">Clinical Scheduler</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-[0.9] mb-10">
              Book Your <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-teal to-blue-400">Recovery.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-slate-300 text-lg md:text-2xl max-w-2xl font-light opacity-90 leading-relaxed mb-12">
              Schedule your consultation with Jodhpur's leading clinical specialists. 
              Personalized assessment for <span className="text-white font-medium italic">home or clinic care</span>.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-medical-teal/20 flex items-center justify-center text-medical-teal">
                  <CheckCircle2 size={18} />
                </div>
                <span className="text-white/80 text-sm font-bold uppercase tracking-widest">Verified Experts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-medical-teal/20 flex items-center justify-center text-medical-teal">
                  <CheckCircle2 size={18} />
                </div>
                <span className="text-white/80 text-sm font-bold uppercase tracking-widest">Cashless Schemes</span>
              </div>
            </motion.div>
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
            {locations.map((loc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative"
              >
                <div className="bg-[#E5E9F0] rounded-[2.5rem] p-6 md:p-8 shadow-2xl border border-white/20 flex flex-col h-full relative overflow-hidden text-left">
                  {/* Card Header: PIN Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="px-3 py-1 bg-[#3B82F6] rounded-md flex items-center gap-2 shadow-lg shadow-blue-500/20">
                      <span className="text-[0.6rem] font-bold text-white uppercase tracking-wider">PIN {loc.pincode}</span>
                      <div className="w-1 h-1 bg-white/40 rounded-full" />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  </div>

                  {/* Title Section */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-[#1E293B] tracking-tight leading-none mb-1">Healing Hands Clinic</h3>
                    <p className="text-[0.65rem] font-bold text-[#64748B] uppercase tracking-[0.2em]">{loc.name}</p>
                  </div>

                  {/* Location Section */}
                  <div className="mb-6">
                    <p className="text-[0.55rem] font-black text-[#3B82F6] uppercase tracking-widest mb-2 opacity-60">Location Coordinates</p>
                    <div className="p-4 rounded-xl bg-white/40 border border-white/60">
                      <p className="text-[0.7rem] font-bold text-[#1E293B] leading-relaxed">{loc.address}</p>
                    </div>
                  </div>

                  {/* Access Points Section */}
                  <div className="mb-6">
                    <p className="text-[0.55rem] font-black text-[#3B82F6] uppercase tracking-widest mb-3 opacity-60">Access Points</p>
                    <div className="space-y-2">
                      {[
                        { label: "Near AIIMS Jodhpur", tag: "3 KM DRIVE", icon: <Navigation2 size={12} /> },
                        { label: "Near Tai Puliya", tag: "WALKABLE", icon: <Navigation2 size={12} /> },
                        { label: "DPS Circle", icon: <Navigation2 size={12} />, tag: "5 MINS AWAY" }
                      ].map((point, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/60 border border-white/80 group/point hover:bg-white transition-all">
                          <div className="flex items-center gap-3">
                            <div className="text-blue-500">{point.icon}</div>
                            <span className="text-[0.65rem] font-bold text-[#475569]">{point.label}</span>
                          </div>
                          <span className="text-[0.55rem] font-black text-blue-500 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">{point.tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Availability Matrix Section */}
                  <div className="mb-6">
                    <div className="p-4 rounded-2xl bg-[#0F172A] flex items-center gap-4 border border-white/10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400 shrink-0 border border-white/5">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="text-[0.5rem] font-black text-blue-400 uppercase tracking-widest mb-0.5">Availability Matrix</p>
                        <p className="text-[0.65rem] font-bold text-white">Mon–Sat: 8 AM–2 PM & 4–8:30 PM</p>
                      </div>
                    </div>
                  </div>

                  {/* Founder Info */}
                  <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3 bg-white/60 p-2 pr-6 rounded-full border border-white/80">
                      <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden relative border-2 border-white shadow-sm">
                         <Image src="/doctor/doc1.jpg" alt="Dr. Asad" fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-[0.7rem] font-black text-[#1E293B] leading-none mb-0.5">Dr. Asad Solanki</p>
                        <p className="text-[0.55rem] font-black text-blue-500 uppercase tracking-widest leading-none">Founder</p>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <a
                      href={`tel:+916378062237`}
                      className="flex-1 py-4 bg-[#3B82F6] text-white rounded-2xl text-[0.7rem] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/30 hover:bg-[#2563EB] transition-all text-center flex items-center justify-center group/btn"
                    >
                      Call Clinic
                    </a>
                    <button className="w-14 h-14 bg-white/60 border border-white/80 rounded-2xl flex items-center justify-center text-[#64748B] hover:text-blue-500 hover:bg-white transition-all shadow-sm">
                      <MapPin size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
