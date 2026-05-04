"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Bone, Brain, HeartPulse, Flower2, Baby, PersonStanding, Zap,
  Activity, ArrowRight, Phone, CheckCircle2, ChevronRight,
  Home, ArrowUpRight
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const treatmentIcons = {
  "orthopedic-physiotherapy": Bone,
  "neurological-physiotherapy": Brain,
  "cardio-pulmonary-physiotherapy": HeartPulse,
  "gynecological-physiotherapy": Flower2,
  "pediatric-physiotherapy": Baby,
  "geriatric-physiotherapy": PersonStanding,
  "advanced-physiotherapy-services": Zap,
};

export default function TreatmentDetailClient({ treatment, related }) {
  const Icon = treatmentIcons[treatment.slug] || Activity;
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
  }, [treatment]);

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
      
      {/* ===== HERO ===== */}
      <section className="section-padding bg-mesh !pt-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-medical-teal/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        
        <motion.div 
          className="max-site relative z-10"
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          {/* Breadcrumbs */}
          <motion.div variants={itemVariants} className="flex items-center flex-wrap gap-2 mb-10 text-[0.65rem] font-medium uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-medical-teal flex items-center gap-1.5 transition-colors">
              <Home size={12} /> Home
            </Link>
            <ChevronRight size={12} />
            <Link href="/treatments" className="hover:text-medical-teal transition-colors">Treatments</Link>
            <ChevronRight size={12} />
            <span className="text-medical-teal">{treatment.title}</span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <motion.div variants={itemVariants} className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-xl shadow-medical-blue/5 flex items-center justify-center text-medical-teal border border-slate-100">
                  <Icon size={32} />
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full shadow-sm border border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-medical-teal animate-pulse" />
                  <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-medical-blue">Clinical Protocol</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h1 className="text-display text-5xl md:text-7xl mb-8 leading-[1.05] font-light">
                  {treatment.title.split(' ').map((word, i, arr) => (
                    i === arr.length - 1 ? (
                      <span key={i} className="text-medical-teal relative inline-block font-light">
                        {word}
                        <svg className="absolute -bottom-2 left-0 w-full h-3 text-medical-teal/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                          <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/>
                        </svg>
                      </span>
                    ) : (
                      <span key={i}>{word} </span>
                    )
                  ))}
                </h1>
              </motion.div>
            </div>
            
            <div className="lg:col-span-4 pb-4">
              <motion.div variants={itemVariants}>
                <p className="text-slate-500 text-lg leading-relaxed font-normal">
                  {treatment.fullDescription}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== CONTENT GRID ===== */}
      <section className="section-padding !pt-0 relative z-10 pb-32">
        <div className="max-site">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Conditions Box */}
            <div className="will-animate scroll-reveal reveal">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-medical-teal/10 flex items-center justify-center text-medical-teal">
                  <Activity size={24} />
                </div>
                <h2 className="text-3xl text-medical-blue font-light">Conditions We Treat</h2>
              </div>
              
              <div className="space-y-4">
                {treatment.conditions.map((condition, i) => (
                  <div key={i} className="modern-card !p-5 flex items-center gap-5 border-none shadow-md group transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-medical-teal/10 flex items-center justify-center text-medical-teal font-medium text-sm shrink-0 group-hover:bg-medical-teal group-hover:text-white transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span className="text-medical-blue font-medium transition-colors">
                      {condition}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Techniques Box */}
            <div className="will-animate scroll-reveal reveal">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-medical-blue/10 flex items-center justify-center text-medical-blue">
                  <Zap size={24} />
                </div>
                <h2 className="text-3xl text-medical-blue font-light">Treatment Techniques</h2>
              </div>
              
              <div className="space-y-4">
                {treatment.techniques.map((technique, i) => (
                  <div key={i} className="modern-card !p-5 flex items-center gap-5 border-none shadow-md group">
                    <div className="w-10 h-10 rounded-lg bg-medical-blue/5 flex items-center justify-center text-medical-blue shrink-0 group-hover:bg-medical-blue group-hover:text-white transition-colors duration-300">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="text-slate-600 font-normal">
                      {technique}
                    </span>
                  </div>
                ))}
              </div>

              {/* Sticky CTA inside Techniques Column */}
              <div className="mt-12 modern-card !bg-medical-blue text-white border-none shadow-xl overflow-hidden relative p-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-medical-teal/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <h3 className="text-2xl font-light mb-2 relative z-10">Start Recovery</h3>
                <p className="text-slate-300 mb-6 font-normal text-sm relative z-10">
                  Book a consultation with our expert team today for a personalized assessment.
                </p>
                <a href="tel:6378062237" className="btn-modern bg-white text-medical-blue hover:bg-slate-50 w-full relative z-10 font-medium">
                  <Phone size={16} /> 6378062237
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== RELATED TREATMENTS ===== */}
      {related.length > 0 && (
        <section className="section-padding bg-white relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <div className="max-site">
            <div className="will-animate scroll-reveal reveal flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
              <div>
                <span className="text-[0.65rem] font-medium uppercase tracking-widest text-medical-teal">Comprehensive Care</span>
                <h2 className="text-4xl mt-2 text-medical-blue font-light">Other Treatments.</h2>
              </div>
              <Link href="/treatments" className="btn-modern btn-outline font-medium">
                View All Directory
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {related.map((t) => {
                const RelIcon = treatmentIcons[t.slug] || Activity;
                return (
                  <Link 
                    key={t.slug}
                    href={`/treatments/${t.slug}`}
                    className="will-animate scroll-reveal reveal modern-card group flex flex-col h-full bg-slate-50 border-none shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-medical-blue group-hover:scale-110 group-hover:border-medical-teal group-hover:text-medical-teal transition-all duration-500 mb-6 shadow-sm">
                      <RelIcon size={24} />
                    </div>
                    <h3 className="text-xl font-medium text-medical-blue group-hover:text-medical-teal transition-colors leading-tight mb-3">
                      {t.title}
                    </h3>
                    <p className="text-slate-500 font-normal text-sm leading-relaxed mb-6 line-clamp-2">
                      {t.shortDesc}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-5">
                      <span className="text-medical-teal text-[0.65rem] font-medium uppercase tracking-widest">
                        Explore Protocol
                      </span>
                      <ArrowUpRight size={16} className="text-slate-300 group-hover:text-medical-teal" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
