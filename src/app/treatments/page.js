"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { treatments } from "@/data/treatments";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, Activity, Bone, Brain, 
  HeartPulse, Baby, PersonStanding, Zap,
  Phone
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const getIcon = (slug) => {
  const icons = {
    "orthopedic-physiotherapy": Bone,
    "neurological-physiotherapy": Brain,
    "cardio-pulmonary-physiotherapy": HeartPulse,
    "womens-health-physiotherapy": HeartPulse,
    "pediatric-physiotherapy": Baby,
    "geriatric-physiotherapy": PersonStanding,
    "advanced-physiotherapy-services": Zap,
  };
  return icons[slug] || Activity;
};

export default function TreatmentsPage() {
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
    <main ref={containerRef} className="bg-white pt-32 selection:bg-medical-teal selection:text-white">
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
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-medical-blue">Clinical Scope</span>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h1 className="text-display text-5xl md:text-7xl lg:text-[5.5rem] mt-2">
              Expertise & <br /> 
              <span className="text-medical-teal relative inline-block">
                Protocols.
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-medical-teal/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/>
                </svg>
              </span>
            </h1>
          </motion.div>
          <motion.div variants={itemVariants}>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mt-10 leading-relaxed font-normal">
              Discover our specialized physiotherapy pathways designed for neurological, 
              orthopedic, and pediatric rehabilitation. All backed by evidence-based outcomes.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== LIST ===== */}
      <section className="section-padding bg-medical-surface relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-medical-surface pointer-events-none" />
        <div className="max-site grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {treatments.map((t, i) => {
            const Icon = getIcon(t.slug);
            return (
              <Link key={t.slug} href={`/treatments/${t.slug}`} className="will-animate scroll-reveal reveal modern-card group block">
                <div className="w-14 h-14 rounded-xl bg-medical-teal/5 flex items-center justify-center text-medical-teal group-hover:scale-110 group-hover:bg-medical-teal group-hover:text-white transition-all duration-500 mb-6">
                  <Icon size={28} />
                </div>
                <h2 className="text-xl font-bold mb-3 tracking-tight text-medical-blue group-hover:text-medical-teal transition-colors">
                  {t.title}
                </h2>
                <p className="text-slate-500 font-normal text-sm leading-relaxed mb-8 line-clamp-2">
                  {t.shortDesc}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                  <span className="text-medical-teal font-bold uppercase tracking-[0.15em] text-[0.65rem]">
                    View Details
                  </span>
                  <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:border-medical-teal group-hover:text-medical-teal group-hover:bg-medical-teal/5 transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-padding">
        <div className="max-site bg-medical-blue text-white p-12 md:p-24 rounded-2xl text-center overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-bl from-medical-blue via-slate-800 to-medical-blue" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-medical-teal opacity-10 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-title text-4xl md:text-5xl mb-10 will-animate scroll-reveal reveal">Need Clinical Assessment?</h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center will-animate scroll-reveal reveal">
              <Link href="/contact" className="btn-modern bg-white text-medical-blue hover:bg-slate-50 px-10 py-4 shadow-xl">
                Book Appointment
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
