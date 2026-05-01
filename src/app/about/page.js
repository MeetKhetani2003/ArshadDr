"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { teamMembers, locations } from "@/data/team";
import { motion } from "framer-motion";
import { 
  GraduationCap, Award, Stethoscope, 
  ShieldCheck, Users, MapPin 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
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

  const timeline = [
    { year: "2008", event: "Clinical Foundations", icon: GraduationCap },
    { year: "2013", event: "Apollo Hospital Residency", icon: Stethoscope },
    { year: "2015", event: "Mastering COMT", icon: Award },
    { year: "2020", event: "Healing Hands Inception", icon: ShieldCheck },
  ];

  return (
    <main ref={containerRef} className="bg-white pt-40 selection:bg-medical-teal selection:text-white">
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
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-medical-blue">The Clinical Journey</span>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h1 className="text-display text-5xl md:text-7xl lg:text-[5.5rem] mt-2">
              Authority & <br /> 
              <span className="text-medical-teal relative inline-block">
                Excellence.
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-medical-teal/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/>
                </svg>
              </span>
            </h1>
          </motion.div>
          <motion.div variants={itemVariants}>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mt-10 leading-relaxed font-normal">
              Founded by Dr. Asad Solanki, Healing Hands is built on a decade of 
              clinical mastery and evidence-based rehabilitation protocols.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== FOUNDER ===== */}
      <section className="section-padding bg-medical-surface relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-medical-surface pointer-events-none" />
        <div className="max-site grid lg:grid-cols-12 gap-16 items-start relative z-10">
          
          <div className="lg:col-span-5 will-animate scroll-reveal reveal sticky top-32">
            <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-slate-100 border-4 border-white">
              <Image 
                src="/doctor.png" 
                alt="Dr. Asad" 
                fill 
                className="object-cover" 
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/30 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="absolute -bottom-6 -right-6 lg:-right-8 glass-panel p-6 rounded-xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-medical-teal rounded-full flex items-center justify-center text-white shadow-lg">
                  <Award size={24} />
                </div>
                <div>
                  <p className="font-bold text-medical-blue">Dr. Asad Solanki</p>
                  <p className="text-[0.65rem] uppercase tracking-widest text-slate-500 font-semibold">Founder & Chief PT</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 lg:pl-10">
            <h2 className="text-title text-4xl md:text-5xl mb-12 will-animate scroll-reveal reveal text-medical-blue">
              A Decade of Mastery.
            </h2>
            
            <div className="space-y-6 will-animate scroll-reveal reveal relative">
              {/* Timeline Line */}
              <div className="absolute left-7 top-10 bottom-10 w-0.5 bg-slate-200" />
              
              {timeline.map((item, i) => (
                <div key={i} className="relative z-10 flex items-center gap-6 group">
                  <div className="w-14 h-14 shrink-0 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 group-hover:border-medical-teal group-hover:text-medical-teal group-hover:shadow-lg transition-all duration-300">
                    <item.icon size={22} />
                  </div>
                  <div className="flex-1 p-6 rounded-xl bg-white border border-slate-100 group-hover:border-medical-teal/20 group-hover:shadow-xl transition-all duration-300">
                    <p className="text-xl font-bold text-medical-teal mb-1">{item.year}</p>
                    <h4 className="text-lg font-bold tracking-tight text-medical-blue">{item.event}</h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 will-animate scroll-reveal reveal modern-card bg-white border-none shadow-xl">
              <h3 className="text-xl font-bold tracking-tight mb-4 text-medical-blue flex items-center gap-3">
                <ShieldCheck size={24} className="text-medical-teal" />
                Evidence-Based Mission
              </h3>
              <p className="text-slate-500 text-base leading-relaxed font-normal">
                Our treatment protocols are built on verified clinical outcomes and global standards 
                set by leading institutions. We believe in measurable recovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="section-padding bg-medical-blue text-white py-24 rounded-t-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-medical-blue to-medical-blue" />
        
        <div className="max-site relative z-10">
          <div className="flex justify-between items-end mb-16 will-animate scroll-reveal reveal">
            <div>
              <span className="text-label !text-medical-teal">Clinical Staff</span>
              <h2 className="text-title text-4xl md:text-5xl mt-4 text-white">Expert Team.</h2>
            </div>
            <Users size={48} className="text-white/5 hidden md:block" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {teamMembers.map((m, i) => (
              <div key={i} className="will-animate scroll-reveal reveal group">
                <div className="aspect-[3/4] relative rounded-xl overflow-hidden mb-4 bg-slate-800">
                  <Image 
                    src={m.image} 
                    alt={m.name} 
                    fill 
                    className="object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                    sizes="(max-width: 768px) 50vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-medical-blue via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="font-bold text-sm mb-1 text-white">{m.name}</h4>
                    <p className="text-medical-teal font-bold uppercase tracking-[0.15em] text-[0.55rem]">{m.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOCATIONS ===== */}
      <section className="section-padding bg-white">
        <div className="max-site">
          <div className="will-animate scroll-reveal reveal modern-card !bg-medical-surface border-none shadow-xl flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-medical-teal/10 text-medical-teal mb-6">
                <MapPin size={24} />
              </div>
              <h2 className="text-title text-3xl md:text-4xl mb-3 text-medical-blue">Network Hubs.</h2>
              <p className="text-slate-500 font-normal">Serving Jodhpur through 06 specialized clinical locations.</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-3 max-w-lg">
              {locations.map((loc, i) => (
                <div key={i} className="px-5 py-2.5 bg-white border border-slate-100 rounded-lg text-[0.65rem] font-bold uppercase tracking-widest text-medical-blue hover:border-medical-teal hover:text-medical-teal shadow-sm transition-all">
                  {loc}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
