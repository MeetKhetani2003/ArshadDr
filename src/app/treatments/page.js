"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { treatments } from "@/data/treatments";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, Activity, Bone, Brain, 
  HeartPulse, Baby, PersonStanding, Zap,
  Phone, Users, Stethoscope, ArrowRight
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);


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
    <main ref={containerRef} className="bg-white selection:bg-medical-teal selection:text-white">
      {/* ===== HEADER ===== */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/treatments_hero_v2.png"
            alt="Clinical Treatments"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-blue/95 via-medical-blue/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/40 to-transparent z-10" />
        </div>

        <div className="max-site relative z-20 pt-20">
          <motion.div 
            className="max-site relative z-10"
            initial="hidden"
            animate="visible"
            variants={heroVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-sm border border-white/10 mb-8">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-medical-teal">Clinical Scope</span>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white tracking-tight leading-[1.1]">
                Expertise & <br /> 
                <span className="text-medical-teal relative inline-block">
                  Protocols.
                </span>
              </h1>
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="text-slate-200 text-lg md:text-xl max-w-2xl mt-10 leading-relaxed font-normal opacity-90">
                Discover our specialized physiotherapy pathways designed for neurological, 
                orthopedic, and pediatric rehabilitation. All backed by evidence-based outcomes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== LIST ===== */}
      <section className="section-padding bg-medical-surface relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-medical-surface pointer-events-none" />
        <div className="max-site grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {treatments.map((t, i) => (
            <motion.div
              key={t.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Link 
                href={`/treatments/${t.slug}`} 
                className="group block bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] transition-all duration-500 border border-slate-100/50 hover:border-medical-teal/30 h-full flex flex-col"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image 
                    src={t.image} 
                    alt={t.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  <div className="absolute top-4 right-4 z-20">
                    <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-medical-teal group-hover:bg-medical-teal group-hover:text-white group-hover:rotate-[360deg] transition-all duration-700">
                      {t.slug === "orthopedic-physiotherapy" && <Bone size={24} />}
                      {t.slug === "neurological-physiotherapy" && <Brain size={24} />}
                      {t.slug === "cardio-pulmonary-physiotherapy" && <HeartPulse size={24} />}
                      {t.slug === "gynecological-physiotherapy" && <Users size={24} />}
                      {t.slug === "pediatric-physiotherapy" && <Activity size={24} />}
                      {t.slug === "geriatric-physiotherapy" && <Stethoscope size={24} />}
                      {t.slug === "advanced-physiotherapy-services" && <Zap size={24} />}
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-6 z-20">
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-medical-teal transition-colors">
                      {t.title}
                    </h3>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <p className="text-slate-500 font-normal text-sm leading-relaxed mb-8 line-clamp-2">
                    {t.shortDesc}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                    <span className="text-medical-teal font-bold uppercase tracking-[0.15em] text-[0.65rem] group-hover:tracking-[0.25em] transition-all duration-500">
                      Explore Protocol
                    </span>
                    <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-medical-teal group-hover:text-medical-teal group-hover:bg-medical-teal/5 transition-all">
                      <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
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
