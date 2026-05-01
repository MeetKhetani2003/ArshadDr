"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowRight, Activity, Bone, Brain, 
  HeartPulse, ShieldCheck, Award, Users,
  MapPin, ChevronRight, Zap, ArrowUpRight, Phone
} from "lucide-react";
import { treatments } from "@/data/treatments";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".scroll-reveal", {
        y: 0,
        opacity: 1,
        autoAlpha: 1,
        duration: 1,
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

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <main ref={containerRef} className="bg-white selection:bg-medical-teal selection:text-white">
      {/* ===== HERO: ULTRA-PREMIUM ===== */}
      <section className="relative min-h-[95vh] flex items-center bg-mesh pt-40 pb-32 overflow-hidden">
        <div className="max-site px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div 
              className="lg:col-span-6 relative z-20"
              initial="hidden"
              animate="visible"
              variants={heroVariants}
            >
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full shadow-sm border border-slate-100 mb-8">
                  <div className="w-2 h-2 rounded-full bg-medical-teal animate-pulse" />
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-medical-blue">Accepting New Patients</span>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <h1 className="text-display text-5xl md:text-7xl lg:text-[5.5rem] mb-8 leading-[1.05]">
                  Recovery <br /> 
                  Redefined <br />
                  <span className="text-medical-teal relative inline-block">
                    Precision.
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-medical-teal/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/>
                    </svg>
                  </span>
                </h1>
              </motion.div>

              <motion.div variants={itemVariants}>
                <p className="text-slate-500 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-normal">
                  Experience world-class physiotherapy in Jodhpur. We combine advanced 
                  clinical technology with personalized, evidence-based recovery protocols.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
                <Link href="/contact" className="btn-modern btn-primary">
                  Book Assessment <ArrowRight size={18} />
                </Link>
                <Link href="/treatments" className="btn-modern btn-outline group">
                  Explore Services
                  <ArrowUpRight size={18} className="text-slate-400 group-hover:text-medical-blue transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Image Layout */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="lg:col-span-6 relative z-10"
            >
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-slate-100 relative z-10">
                  <Image 
                    src="/clinic.png" 
                    alt="Clinic Facility" 
                    fill 
                    className="object-cover" 
                    priority 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/20 to-transparent" />
                </div>
                
                {/* Floating Glass Panels */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                  className="absolute -bottom-8 -left-8 md:-left-16 glass-panel p-6 rounded-2xl z-20 flex items-center gap-5"
                >
                  <div className="w-14 h-14 rounded-xl bg-medical-teal/10 flex items-center justify-center text-medical-teal">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold leading-none mb-1 text-medical-blue">ISO 9001</p>
                    <p className="text-slate-500 text-[0.65rem] font-semibold uppercase tracking-widest">Certified Quality</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                  className="absolute top-12 -right-8 md:-right-12 glass-panel p-5 rounded-xl z-20 flex items-center gap-4 hidden md:flex"
                >
                  <div className="w-12 h-12 rounded-full bg-medical-blue flex items-center justify-center text-white shadow-inner">
                    <Activity size={24} />
                  </div>
                  <div className="pr-2">
                    <p className="text-sm font-bold text-slate-900 leading-tight">15K+ Success</p>
                    <p className="text-[0.6rem] text-slate-500 font-semibold uppercase tracking-wider">Stories</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FLOATING TRUST BAR ===== */}
      <section className="relative z-30 -mt-16 mb-20 px-6">
        <div className="max-site bg-medical-blue text-white rounded-2xl p-10 shadow-2xl shadow-medical-blue/10 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-medical-blue to-slate-800" />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x divide-white/10">
            {[
              { n: "15,000+", l: "Patients Restored" },
              { n: "10+ Years", l: "Clinical Excellence" },
              { n: "07 Experts", l: "Specialized Staff" },
              { n: "06 Centers", l: "Across Jodhpur" }
            ].map((item, i) => (
              <div key={i} className="will-animate scroll-reveal reveal px-4">
                <p className="text-3xl md:text-4xl font-bold mb-2 tracking-tight text-white drop-shadow-sm">
                  {item.n}
                </p>
                <p className="text-medical-teal font-semibold uppercase tracking-[0.2em] text-[0.55rem] opacity-90">{item.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES GRID: PREMIUM BENTO ===== */}
      <section className="section-padding bg-medical-surface relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-medical-surface pointer-events-none" />
        <div className="max-site relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="will-animate scroll-reveal reveal">
              <span className="text-label">Specialized Expertise</span>
              <h2 className="text-title text-4xl md:text-5xl mt-3 text-medical-blue">Clinical Focus Areas.</h2>
            </div>
            <Link href="/treatments" className="will-animate scroll-reveal reveal btn-modern btn-outline bg-white group">
              View All Services 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.slice(0, 6).map((t, i) => (
              <Link key={t.slug} href={`/treatments/${t.slug}`} className="will-animate scroll-reveal reveal modern-card group block">
                <div className="w-14 h-14 rounded-xl bg-medical-teal/5 flex items-center justify-center text-medical-teal group-hover:scale-110 group-hover:bg-medical-teal group-hover:text-white transition-all duration-500 mb-8">
                  <Activity size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight text-medical-blue group-hover:text-medical-teal transition-colors">
                  {t.title}
                </h3>
                <p className="text-slate-500 font-normal text-sm leading-relaxed mb-8 line-clamp-2">
                  {t.shortDesc}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-medical-teal font-bold uppercase tracking-[0.15em] text-[0.65rem]">
                    Explore Protocol
                  </span>
                  <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:border-medical-teal group-hover:text-medical-teal group-hover:bg-medical-teal/5 transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DOCTOR: EDITORIAL OVERLAP ===== */}
      <section className="section-padding bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-medical-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-site grid lg:grid-cols-12 gap-12 lg:gap-0 items-center">
          <div className="lg:col-span-5 will-animate scroll-reveal reveal relative z-20">
            <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-slate-100 border-4 border-white">
              <Image 
                src="/doctor.png" 
                alt="Dr. Asad" 
                fill 
                className="object-cover" 
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 lg:-right-12 glass-panel p-6 rounded-2xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-medical-teal rounded-full flex items-center justify-center text-white shadow-lg">
                  <Award size={24} />
                </div>
                <div>
                  <p className="font-bold text-medical-blue">Founder</p>
                  <p className="text-[0.65rem] uppercase tracking-widest text-slate-500 font-semibold">Chief PT</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 lg:pl-20 will-animate scroll-reveal reveal relative z-10">
            <span className="text-label">Clinical Leadership</span>
            <h2 className="text-title text-4xl md:text-6xl mt-4 mb-6">Dr. Asad Solanki.</h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed max-w-xl">
              Combining a decade of clinical excellence at Apollo Hospital with 
              advanced international certifications in COMT, NDT, and Dry Needling 
              to deliver unparalleled recovery outcomes.
            </p>
            
            <div className="grid grid-cols-2 gap-y-8 gap-x-6 mb-12">
              {[
                { l: "Certification", v: "BPT, COMT, NDT" },
                { l: "Specialization", v: "Neuro & Ortho" },
                { l: "Experience", v: "10+ Years" },
                { l: "Impact", v: "15,000+ Patients" }
              ].map((stat, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-slate-100 overflow-hidden">
                    <div className="w-full h-1/2 bg-medical-teal" />
                  </div>
                  <p className="text-slate-400 text-[0.65rem] font-bold uppercase tracking-widest mb-1">{stat.l}</p>
                  <p className="text-lg font-bold text-medical-blue">{stat.v}</p>
                </div>
              ))}
            </div>
            
            <Link href="/about" className="btn-modern btn-primary px-8">
              Read Full Journey
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA: PREMIUM BANNER ===== */}
      <section className="section-padding pt-10">
        <div className="max-site bg-medical-blue rounded-2xl p-12 md:p-24 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-medical-blue via-slate-800 to-medical-blue" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-medical-teal opacity-20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-title text-4xl md:text-6xl mb-10 leading-tight will-animate scroll-reveal reveal">
              Ready to begin your <br /> Recovery Journey?
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 will-animate scroll-reveal reveal">
              <Link href="/contact" className="btn-modern bg-white text-medical-blue hover:bg-slate-50 px-10 py-4 shadow-xl">
                Book Initial Assessment
              </Link>
              <a href="tel:6378062237" className="group flex items-center gap-3 text-white/90 font-bold uppercase tracking-widest text-[0.7rem] hover:text-white transition-colors">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-medical-teal transition-colors">
                  <Phone size={14} />
                </span>
                Call: 6378062237
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
