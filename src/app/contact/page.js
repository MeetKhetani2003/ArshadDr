"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Phone, MapPin, CheckCircle2, MessageSquare, Clock
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("success"), 1500);
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
    <main ref={containerRef} className="bg-medical-surface min-h-screen pt-40 selection:bg-medical-teal selection:text-white">
      {/* ===== HEADER ===== */}
      <section className="section-padding bg-mesh !pt-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-medical-teal/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <motion.div 
          className="max-site relative z-10"
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full shadow-sm border border-slate-100 mb-8">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-medical-blue">Support Hub</span>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h1 className="text-display text-5xl md:text-7xl lg:text-[5.5rem] mt-2">
              Contact & <br /> 
              <span className="text-medical-teal relative inline-block">
                Care.
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-medical-teal/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/>
                </svg>
              </span>
            </h1>
          </motion.div>
          <motion.div variants={itemVariants}>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mt-10 leading-relaxed font-normal">
              Reach out via phone, WhatsApp, or the form below. Our clinical team is ready to 
              assist you with your recovery journey.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="section-padding !pt-0 relative z-10">
        <div className="max-site">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Form */}
            <div className="lg:col-span-7 will-animate scroll-reveal reveal">
              <div className="modern-card p-8 md:p-12 shadow-xl border-none">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-title text-3xl text-medical-blue">Submit Query.</h2>
                  <MessageSquare className="text-slate-200" size={32} />
                </div>
                
                {status === "success" ? (
                  <div className="text-center py-20">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="w-20 h-20 bg-medical-teal/10 text-medical-teal rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={36} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-medical-blue">Inquiry Received.</h3>
                    <p className="text-slate-500 mt-3 font-normal max-w-sm mx-auto">
                      Our clinical coordination team will review your case and contact you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                        <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-5 outline-none focus:border-medical-teal focus:ring-4 focus:ring-medical-teal/10 transition-all font-medium text-medical-blue placeholder-slate-400" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                        <input required type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-5 outline-none focus:border-medical-teal focus:ring-4 focus:ring-medical-teal/10 transition-all font-medium text-medical-blue placeholder-slate-400" placeholder="+91 00000 00000" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-500 ml-1">Primary Concern</label>
                      <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-5 outline-none focus:border-medical-teal focus:ring-4 focus:ring-medical-teal/10 transition-all font-medium text-medical-blue placeholder-slate-400" placeholder="e.g., Lower Back Pain, Post-Op Rehab" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-500 ml-1">Additional Details</label>
                      <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-5 outline-none focus:border-medical-teal focus:ring-4 focus:ring-medical-teal/10 transition-all font-medium text-medical-blue placeholder-slate-400 resize-none" placeholder="Briefly describe your symptoms..." />
                    </div>
                    <button type="submit" className="btn-modern btn-primary w-full py-4.5 mt-4 text-base">
                      {status === "sending" ? "Securely Submitting..." : "Submit Inquiry"}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Info Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* WhatsApp Premium Card */}
              <div className="will-animate scroll-reveal reveal modern-card relative overflow-hidden group border-none shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-medical-blue to-slate-800" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-medical-teal/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10 text-white">
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    <FaWhatsapp size={28} className="text-medical-teal" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">WhatsApp <br /> Assistance.</h3>
                  <p className="text-slate-300 mb-8 leading-relaxed text-sm font-normal">
                    Quickest way to book today. Our support team is available for urgent clinical queries.
                  </p>
                  <a href="https://wa.me/916378062237" className="btn-modern w-full bg-white text-medical-blue hover:bg-medical-teal hover:text-white transition-colors duration-300">
                    Chat with Specialist
                  </a>
                </div>
              </div>

              {/* Info Premium Card */}
              <div className="will-animate scroll-reveal reveal modern-card border-none shadow-xl bg-white">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-medical-teal/10 flex items-center justify-center text-medical-teal">
                    <Clock size={16} />
                  </div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-500">Contact Details</p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-5 group cursor-default">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-medical-blue border border-slate-100 group-hover:border-medical-teal/30 group-hover:text-medical-teal transition-colors">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest mb-1">Direct Line</p>
                      <p className="text-lg font-bold text-medical-blue">6378062237</p>
                    </div>
                  </div>
                  
                  <div className="w-full h-px bg-slate-100" />
                  
                  <div className="flex items-center gap-5 group cursor-default">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-medical-blue border border-slate-100 group-hover:border-medical-teal/30 group-hover:text-medical-teal transition-colors">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest mb-1">Primary Clinic</p>
                      <p className="text-base font-bold text-medical-blue leading-tight">Vasundhara Hospital, <br/> Jodhpur</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Map Segment - Improved blend */}
      <section className="h-[400px] w-full relative">
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-medical-surface to-transparent z-10" />
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114480.20786598!2d72.93240217594924!3d26.27042571343719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c4eaa0628e7%3A0x388655a15320d366!2sJodhpur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1714570000000!5m2!1sen!2sin" 
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
          className="grayscale contrast-[1.1] opacity-50"
        />
      </section>
    </main>
  );
}
