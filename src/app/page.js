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
  MapPin, ChevronRight, Zap, ArrowUpRight, Phone,
  Stethoscope, CheckCircle2, Crosshair, Navigation,
  Search, Target, Cpu, Layers, Sparkles, Clock, Wallet, Laptop, Star, Home, Navigation2
} from "lucide-react";
import { treatments } from "@/data/treatments";
import { teamMembers, locations } from "@/data/team";
import { useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Marquee from "react-fast-marquee";

gsap.registerPlugin(ScrollTrigger);

const numberFormatter = new Intl.NumberFormat("en-US");

function StatCounter({ value }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: node,
        start: "top 95%",
      },
      onUpdate: () => {
        if (node) {
          node.innerText = numberFormatter.format(Math.floor(obj.val));
        }
      }
    });

    return () => {
      tween.kill();
    };
  }, [value]);

  return <span ref={ref} />;
}

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
      {/* ===== HERO: PRECISION RECOVERY ===== */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://r2.vidzflow.com/v/RvbC1fBjQk_1080p_1743260519.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay for readability - Using medical-blue with alpha for brand consistency */}
          <div className="absolute inset-0 bg-medical-blue/30 backdrop-blur-[1px]" />
          {/* <div className="absolute inset-0 bg-gradient-to-b from-medical-blue/20 via-transparent to-medical-blue/40" /> */}
        </div>

        <div className="container-wide relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-medical-teal/20 rounded-full border border-medical-teal/30 mb-8 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-medical-teal animate-pulse" />
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white">Now Serving Across Jodhpur</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8">
                Precision Physiotherapy <br />
                <span className="text-medical-teal drop-shadow-sm">for Long-Term Recovery</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-200 mb-10 font-normal leading-relaxed max-w-2xl mx-auto">
                Restore movement, eliminate pain at its root cause, and prevent recurrence with advanced, evidence-based rehabilitation.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                <Link href="/contact" className="btn-modern bg-medical-teal text-white px-10 py-5 text-lg w-full sm:w-auto text-center shadow-2xl shadow-medical-teal/40 hover:scale-105 hover:shadow-medical-teal/60 transition-all font-bold">
                  Book Appointment
                </Link>
                <a href="tel:+916378062237" className="btn-modern border-2 border-white text-white px-10 py-5 text-lg w-full sm:w-auto text-center hover:bg-white hover:text-medical-blue transition-all font-bold">
                  Call Now
                </a>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-white/90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-medical-teal" />
                  <span className="text-xs font-medium uppercase tracking-widest">Expert Care</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-medical-teal" />
                  <span className="text-xs font-medium uppercase tracking-widest">Modern Tech</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-medical-teal" />
                  <span className="text-xs font-medium uppercase tracking-widest">Trusted Results</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/40 font-bold">Discover More</span>
          <div className="w-px h-12 bg-gradient-to-b from-medical-teal to-transparent" />
        </motion.div>
      </section>

      {/* ===== MARQUEE SECTION: THE BRAND ESSENCE ===== */}
      <section className="bg-medical-blue py-12 md:py-20 overflow-hidden relative border-y border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-medical-blue via-transparent to-medical-blue z-10 pointer-events-none" />
        
        <div className="container-wide mb-8 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-medical-teal mb-3 block">The Healing Hands Method</span>
            <h2 className="text-2xl md:text-4xl font-semibold text-white tracking-tighter uppercase">Redefining Recovery for Jodhpur.</h2>
          </motion.div>
        </div>

        <div className="flex flex-col gap-3 md:gap-6">
          <Marquee speed={40} gradient={false} className="overflow-hidden">
            <span className="text-3xl md:text-5xl font-bold text-white px-6 uppercase tracking-tighter">
              Assessment • Manual Therapy • Rehabilitation • Assessment • Manual Therapy • Rehabilitation •
            </span>
          </Marquee>
          
          <Marquee speed={60} direction="right" gradient={false} className="overflow-hidden">
            <span className="text-3xl md:text-5xl font-bold text-transparent px-6 uppercase tracking-tighter" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}>
              Recover Better • Move Faster • Live Pain Free • Recover Better • Move Faster • Live Pain Free •
            </span>
          </Marquee>
          
          <Marquee speed={30} gradient={false} className="overflow-hidden">
            <span className="text-3xl md:text-5xl font-bold text-white px-6 uppercase tracking-tighter">
              Clinic Visit • Home Visit • Online Physio • Clinic Visit • Home Visit • Online Physio •
            </span>
          </Marquee>
        </div>

        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-medical-teal/10 rounded-full blur-[100px] pointer-events-none" />
      </section>
      {/* ===== CLINICAL FOCUS AREAS: PREMIUM CARDS ===== */}
      <section className="section-padding bg-medical-surface relative overflow-hidden">
        {/* Pattern Left */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <svg className="w-full h-full opacity-[0.05]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad-focus-left" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 0 L100 100" stroke="url(#grad-focus-left)" strokeWidth="0.2" fill="none" />
            <path d="M0 10 L90 100" stroke="url(#grad-focus-left)" strokeWidth="0.2" fill="none" />
            <path d="M10 0 L100 90" stroke="url(#grad-focus-left)" strokeWidth="0.2" fill="none" />
          </svg>
        </div>

        <div className="max-site relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="will-animate scroll-reveal reveal">
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-medical-teal mb-4 block">Specialized Expertise</span>
              <h2 className="text-4xl md:text-5xl text-medical-blue font-bold tracking-tight">Clinical Focus Areas.</h2>
            </div>
            <Link href="/treatments" className="will-animate scroll-reveal reveal btn-modern btn-outline bg-white group font-semibold border-slate-200 shadow-sm hover:shadow-md">
              Explore All Services 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
      </section>
      {/* ===== WHY PAIN COMES BACK: THE ROOT CAUSE ===== */}
      <section className="section-padding bg-white relative overflow-hidden border-t border-slate-50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="will-animate scroll-reveal reveal">
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-medical-teal mb-6 block">The Problem</span>
              <h2 className="text-4xl md:text-5xl font-bold text-medical-blue mb-8 leading-tight tracking-tight">
                Why Your Pain <br />Keeps Coming Back
              </h2>
              <div className="space-y-6 text-xl text-slate-600 font-normal leading-relaxed">
                <p>
                  Most treatments focus only on temporary relief. Painkillers, rest, or basic exercises may reduce symptoms—but they don’t address the underlying dysfunction.
                </p>
                <p>
                  At our center, we focus on identifying the root cause of your pain, correcting movement patterns, and rebuilding strength to ensure long-term recovery.
                </p>
              </div>
              <div className="mt-12 p-8 bg-medical-surface rounded-3xl border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-medical-teal/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                <p className="text-2xl font-medium text-medical-blue relative z-10">
                  We don’t just treat pain—<span className="text-medical-teal font-bold">we correct the cause behind it.</span>
                </p>
              </div>
            </div>

            <div className="will-animate scroll-reveal reveal relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative">
                <Image 
                  src="/movement_analysis.png" 
                  alt="Root Cause Analysis" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/40 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 p-8 glass-panel !bg-white/90 rounded-2xl border-none">
                  <p className="text-xl font-bold text-medical-blue mb-2">We Fix the Root Cause.</p>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">Not Just Pain.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW WE FIX ROOT CAUSE: THE SOLUTION ===== */}
      <section className="section-padding bg-medical-surface relative overflow-hidden">
        {/* Left Corner Pattern */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <svg className="w-full h-full opacity-[0.15]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad-left-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 0 L100 100" stroke="url(#grad-left-1)" strokeWidth="0.2" fill="none" />
            <path d="M0 10 L90 100" stroke="url(#grad-left-1)" strokeWidth="0.2" fill="none" />
            <path d="M0 20 L80 100" stroke="url(#grad-left-1)" strokeWidth="0.2" fill="none" />
            <path d="M10 0 L100 90" stroke="url(#grad-left-1)" strokeWidth="0.2" fill="none" />
            <path d="M20 0 L100 80" stroke="url(#grad-left-1)" strokeWidth="0.2" fill="none" />
          </svg>
        </div>
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 will-animate scroll-reveal reveal relative">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative">
                <Image 
                  src="/patient_therapy.png" 
                  alt="Root Cause Treatment" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 will-animate scroll-reveal reveal">
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-medical-teal mb-6 block">Our Solution</span>
              <h2 className="text-4xl md:text-5xl font-bold text-medical-blue mb-8 leading-tight tracking-tight">
                How We Fix <br />The Root Cause
              </h2>
              <div className="space-y-6 text-xl text-slate-600 font-normal leading-relaxed">
                <p>
                  We move beyond the surface. Our clinical experts use advanced movement screening to identify exactly where your body is over-compensating or failing.
                </p>
                <p>
                  By combining manual therapy with precision loading, we retrain your nervous system and rebuild structural integrity to ensure pain never returns.
                </p>
              </div>
              <div className="mt-12 flex flex-col sm:flex-row gap-8">
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-medical-blue mb-2">100%</span>
                  <span className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-400">Bespoke Protocols</span>
                </div>
                <div className="w-px h-12 bg-slate-100 hidden sm:block" />
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-medical-blue mb-2">AI</span>
                  <span className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-400">Recovery Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICE SEGMENTATION: INTEGRATED ECOSYSTEM ===== */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Right Corner Pattern */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <svg className="w-full h-full opacity-[0.15]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad-right-1" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M100 0 L0 100" stroke="url(#grad-right-1)" strokeWidth="0.2" fill="none" />
            <path d="M100 10 L10 100" stroke="url(#grad-right-1)" strokeWidth="0.2" fill="none" />
            <path d="M100 20 L20 100" stroke="url(#grad-right-1)" strokeWidth="0.2" fill="none" />
            <path d="M90 0 L0 90" stroke="url(#grad-right-1)" strokeWidth="0.2" fill="none" />
            <path d="M80 0 L0 80" stroke="url(#grad-right-1)" strokeWidth="0.2" fill="none" />
          </svg>
        </div>
        {/* Animated Ecosystem Path */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 hidden lg:block">
          <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M-100 300 C 200 100, 400 500, 600 300 C 800 100, 1000 500, 1300 300" 
              stroke="url(#path-grad)" 
              strokeWidth="2" 
              strokeDasharray="10 15"
              className="animate-flow-line"
            />
            <defs>
              <linearGradient id="path-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Technical Dot Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
        />

        <div className="container-wide relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 will-animate scroll-reveal reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-medical-blue mb-3 tracking-tight">Clinic + Home + Online.</h2>
            <p className="text-slate-500 text-lg font-normal">A seamless care ecosystem designed around your lifestyle.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {[
              {
                id: "01",
                title: "Healing Hands Clinic",
                subtitle: "Chopasni Housing Board",
                pin: "342008",
                address: "Chopasni Housing Board, Jodhpur, Rajasthan",
                landmarks: [
                  { name: "Near AIIMS Jodhpur", detail: "2 min drive" },
                  { name: "Near 1st Puliya", detail: "Walkable" },
                  { name: "DPS Circle", detail: "5 mins away" }
                ],
                hours: "Mon–Sat: 8 AM–2 PM & 4–8:30 PM",
                doctor: "Dr. Arshad Solanki",
                doctorRole: "Founder — 10+ Years Experience",
                buttonText: "VIEW CLINIC",
                mapImg: "/map_placeholder.png"
              },
              {
                id: "02",
                title: "Healing Hands Home Care",
                subtitle: "Across Jodhpur City",
                pin: "SERVICE AREA",
                address: "We bring the entire clinical setup to your home.",
                landmarks: [
                  { name: "Service Available 24/7", detail: "Express" },
                  { name: "All major areas", detail: "Full Coverage" },
                  { name: "Doorstep Rehab", detail: "At Home" }
                ],
                hours: "Available: 7 AM–9 PM (Daily)",
                doctor: "Senior On-Call PT",
                doctorRole: "Home Care Specialist",
                buttonText: "BOOK HOME VISIT",
                mapImg: "/map_placeholder.png"
              },
              {
                id: "03",
                title: "Healing Hands Online",
                subtitle: "Virtual Consultation",
                pin: "DIGITAL CLINIC",
                address: "Consult our experts via video call from anywhere.",
                landmarks: [
                  { name: "HD Video Call", detail: "Global" },
                  { name: "Digital Plan", detail: "Instant" },
                  { name: "Remote Monitoring", detail: "Daily" }
                ],
                hours: "Mon–Sun: 10 AM–8 PM (IST)",
                doctor: "Expert Consultant",
                doctorRole: "Tele-Rehab Specialist",
                buttonText: "START CONSULTATION",
                mapImg: "/map_placeholder.png"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="group relative"
              >
                {/* Background Large Number */}
                <div className="absolute -top-10 -right-4 text-[10rem] font-black text-slate-100/50 select-none pointer-events-none group-hover:text-medical-teal/5 transition-colors">
                  {item.id}
                </div>

                <div className="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col h-full hover:shadow-[0_40px_120px_-25px_rgba(37,99,235,0.12)] transition-all duration-500 overflow-hidden">
                  
                  {/* Modern Header */}
                  <div className="mb-6 relative">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="px-2.5 py-0.5 rounded-lg bg-medical-teal text-white text-[0.6rem] font-bold tracking-tight uppercase">
                        PIN: {item.pin}
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-medical-teal animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold text-medical-blue tracking-tight leading-none mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold tracking-tight">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Technical Detail Blocks */}
                  <div className="space-y-6 flex-1">
                    {/* Address Block */}
                    <div className="relative pl-5 border-l-2 border-slate-100 group-hover:border-medical-teal/30 transition-colors">
                      <span className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-tight block mb-1.5">Location Coordinates</span>
                      <p className="text-sm font-bold text-medical-blue leading-relaxed">{item.address}</p>
                    </div>

                    {/* Landmarks "Distance Chips" */}
                    <div>
                      <span className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-tight block mb-3">Access Points</span>
                      <div className="space-y-2">
                        {item.landmarks.map((l, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/50 border border-slate-100 group-hover:bg-white transition-all">
                            <div className="flex items-center gap-2.5">
                              <Navigation2 size={13} className="text-medical-teal" />
                              <span className="text-[0.7rem] font-semibold text-slate-600">{l.name}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded-md bg-white text-[0.55rem] font-bold text-medical-teal border border-slate-100 shadow-sm uppercase tracking-tighter">
                              {l.detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technical Hours */}
                    <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-900/10">
                      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                        <Clock size={18} className="text-medical-teal" />
                      </div>
                      <div>
                        <span className="text-[0.55rem] font-bold text-white/40 uppercase tracking-tight block">Availability Matrix</span>
                        <p className="text-[0.7rem] font-bold tracking-tight">{item.hours}</p>
                      </div>
                    </div>
                  </div>

                  {/* High-End Doctor Spotlight */}
                  <div className="mt-8 mb-6 p-1 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-between group/doc hover:bg-white transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white relative">
                        <Image src={item.doctor === "Dr. Arshad Solanki" ? teamMembers[0].image : teamMembers[1].image} alt="Doctor" fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-[0.75rem] font-bold text-medical-blue leading-none mb-1">{item.doctor}</p>
                        <p className="text-[0.5rem] text-slate-500 font-bold uppercase tracking-tight">{item.doctorRole.split('—')[0]}</p>
                      </div>
                    </div>
                    <div className="pr-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 block animate-pulse" />
                    </div>
                  </div>

                  {/* Circular Map Portal */}
                  <div className="absolute bottom-24 -right-10 w-32 h-32 rounded-full border-8 border-white shadow-2xl overflow-hidden hidden group-hover:block will-animate hover:scale-150 transition-all cursor-crosshair">
                    <Image src={item.mapImg} alt="Map Portal" fill className="object-cover" />
                  </div>

                  {/* Dual Primary Actions */}
                  <div className="flex gap-2.5 mt-auto">
                    <Link 
                      href="/contact" 
                      className="flex-1 bg-medical-teal text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-wider text-center shadow-xl shadow-medical-teal/20 hover:bg-medical-blue transition-all"
                    >
                      {item.buttonText}
                    </Link>
                    <button className="w-14 h-14 rounded-2xl border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:border-medical-teal hover:text-medical-teal hover:bg-medical-teal/5 transition-all shadow-sm">
                      <MapPin size={22} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FLOATING TRUST BAR ===== */}
      <section className="relative z-30 -mt-16 mb-20">
        <div className="container-wide bg-medical-blue text-white rounded-2xl p-10 shadow-2xl shadow-medical-blue/10 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-medical-blue to-slate-800" />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x divide-white/10">
            {[
              { n: 15000, suffix: "+", l: "Patients Restored" },
              { n: 10, suffix: "+ Years", l: "Clinical Excellence" },
              { n: 7, suffix: " Experts", l: "Specialized Staff" },
              { n: 6, suffix: " Centers", l: "Across Jodhpur" }
            ].map((item, i) => (
              <div key={i} className="will-animate scroll-reveal reveal px-4">
                <p className="text-3xl md:text-4xl font-light mb-2 tracking-tight text-white drop-shadow-sm flex items-center justify-center">
                  <StatCounter value={item.n} />{item.suffix}
                </p>
                <p className="text-medical-teal font-medium uppercase tracking-[0.2em] text-[0.55rem] opacity-90">{item.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ===== RECOVERY ROADMAP: 3-STEP SYSTEM ===== */}
      <section className="section-padding bg-medical-surface relative overflow-hidden">
        {/* Left Corner Pattern */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <svg className="w-full h-full opacity-[0.15]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad-left-2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 0 L100 100" stroke="url(#grad-left-2)" strokeWidth="0.2" fill="none" />
            <path d="M0 10 L90 100" stroke="url(#grad-left-2)" strokeWidth="0.2" fill="none" />
            <path d="M0 20 L80 100" stroke="url(#grad-left-2)" strokeWidth="0.2" fill="none" />
            <path d="M10 0 L100 90" stroke="url(#grad-left-2)" strokeWidth="0.2" fill="none" />
            <path d="M20 0 L100 80" stroke="url(#grad-left-2)" strokeWidth="0.2" fill="none" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-medical-surface rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 opacity-60" />
        <div className="max-site relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 will-animate scroll-reveal reveal">
            <span className="text-label">The Patient Journey</span>
            <h2 className="text-title text-4xl md:text-6xl mt-4 text-medical-blue">The Path to Restoration.</h2>
            <p className="text-slate-500 mt-6 text-lg font-normal">Our 3-step evidence-based recovery model ensures precision in every movement and certainty in your results.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-slate-100 -translate-y-12 z-0" />
            
            {[
              { 
                step: "01", 
                title: "Assess", 
                desc: "Scientific movement analysis and clinical evaluation to map your current physiological state.",
                icon: Search,
                color: "text-medical-teal",
                bg: "bg-medical-teal/10"
              },
              { 
                step: "02", 
                title: "Plan", 
                desc: "Creation of a precision-rehab protocol tailored to your unique anatomical and lifestyle requirements.",
                icon: Target,
                color: "text-medical-blue",
                bg: "bg-medical-blue/10"
              },
              { 
                step: "03", 
                title: "Recover", 
                desc: "Execution of your roadmap under expert supervision, leveraging data to track your return to strength.",
                icon: Activity,
                color: "text-medical-teal",
                bg: "bg-medical-teal/10"
              }
            ].map((item, i) => (
              <div key={i} className="will-animate scroll-reveal reveal relative z-10">
                <div className="modern-card group hover:shadow-2xl transition-all duration-700 bg-white border-slate-100 p-10 h-full flex flex-col items-center text-center">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-50">
                    {item.step}
                  </div>
                  <div className={`w-20 h-20 rounded-[2rem] ${item.bg} ${item.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon size={36} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-light text-medical-blue mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-slate-500 text-[0.95rem] leading-relaxed font-normal">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES GRID: PREMIUM BENTO ===== */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Right Corner Pattern */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <svg className="w-full h-full opacity-[0.15]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad-right-2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M100 0 L0 100" stroke="url(#grad-right-2)" strokeWidth="0.2" fill="none" />
            <path d="M100 10 L10 100" stroke="url(#grad-right-2)" strokeWidth="0.2" fill="none" />
            <path d="M100 20 L20 100" stroke="url(#grad-right-2)" strokeWidth="0.2" fill="none" />
            <path d="M90 0 L0 90" stroke="url(#grad-right-2)" strokeWidth="0.2" fill="none" />
            <path d="M80 0 L0 80" stroke="url(#grad-right-2)" strokeWidth="0.2" fill="none" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white to-medical-surface pointer-events-none" />
   
      </section>

      {/* ===== COMMON CONDITIONS: MINIMAL LIST ===== */}
      <section className="section-padding bg-medical-surface -mt-48">
        <div className="max-site">
          <div className="text-center max-w-3xl mx-auto mb-20 will-animate scroll-reveal reveal">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-medical-teal block mb-6">Common Conditions</span>
            <h2 className="text-4xl md:text-5xl font-bold text-medical-blue tracking-tight">We Treat.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { cat: "Orthopedic", items: ["Back Pain & Sciatica", "Cervical Spondylosis", "Slip Disc (IVDP)", "Arthritis (OA/RA)"] },
              { cat: "Neurological", items: ["Stroke (Paralysis)", "Parkinson's Disease", "Bell's Palsy", "Spinal Cord Injury"] },
              { cat: "Sports", items: ["ACL & Ligament Rehab", "TKR / THR Recovery", "Tennis Elbow", "Muscle Strains"] }
            ].map((group, i) => (
              <div key={i} className="will-animate scroll-reveal reveal">
                <h4 className="text-2xl font-bold text-medical-blue mb-8 border-b border-slate-100 pb-4">{group.cat}</h4>
                <ul className="space-y-4">
                  {group.items.map((item, j) => (
                    <li key={j} className="text-lg text-slate-500 font-normal hover:text-medical-teal cursor-default transition-colors">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRECISION TECH: AI & INNOVATION ===== */}
      <section className="section-padding bg-medical-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-5" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[1000px] h-[1000px] bg-medical-teal/10 rounded-full blur-[150px]" />
        
        <div className="max-site relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="will-animate scroll-reveal reveal">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8">
                <Sparkles size={16} className="text-medical-teal" />
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/80">Next-Gen Rehabilitation</span>
              </div>
              <h2 className="text-title text-4xl md:text-6xl text-white mb-8 leading-tight">Precision Rehab. <br />Driven by Technology.</h2>
              <p className="text-slate-300 text-lg mb-12 font-light leading-relaxed">
                We bridge the gap between traditional therapy and high-performance recovery using AI-assisted protocols and digital movement tracking. 
                Experience rehabilitation that is mapped to your biology, not just your symptoms.
              </p>
              
              <div className="space-y-6">
                {[
                  { t: "AI Recovery Paths", d: "Dynamic protocols that adapt based on your session progress.", i: Cpu },
                  { t: "Precision Bio-Metrics", d: "Real-time tracking of joint angles and muscle activation.", i: Layers },
                  { t: "Digital Health Integration", d: "Access your recovery roadmap and progress data 24/7.", i: Activity }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-medical-teal group-hover:bg-medical-teal group-hover:text-white transition-all">
                      <feature.i size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">{feature.t}</h4>
                      <p className="text-slate-400 text-sm font-normal">{feature.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="will-animate scroll-reveal reveal relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl relative">
                <Image 
                  src="/doctor/doc3.jpg" 
                  alt="Precision Technology" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-medical-blue/20" />
              </div>
              {/* Floating Tech Tag */}
              <div className="absolute -top-10 -right-10 glass-panel !bg-medical-teal/90 p-8 rounded-3xl border-none shadow-2xl animate-float">
                <div className="text-4xl font-light text-white mb-1">98%</div>
                <div className="text-[0.6rem] font-bold uppercase tracking-widest text-white/70">Recovery Precision</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE HEALING HANDS STANDARD: CORE VALUES ===== */}
      <section className="section-padding bg-medical-blue relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-medical-teal/10 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-medical-teal/5 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4 pointer-events-none" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-site relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 will-animate scroll-reveal reveal">
            <span className="text-sm font-bold uppercase tracking-[0.4em] text-medical-teal mb-4 block">Clinical Excellence</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
              The Healing Hands Standard.
            </h2>
            <p className="text-white/60 font-normal text-xl leading-relaxed">
              We redefine physical rehabilitation through a systematic, evidence-based approach 
              that puts patient recovery at the center of everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Zero Waiting Time",
                desc: "Instant booking and priority slots. We value your time as much as your recovery.",
                icon: Clock
              },
              {
                title: "Certified Experts",
                desc: "Top-tier therapists with advanced certifications in Neuro, Ortho, and Pediatric care.",
                icon: Award
              },
              {
                title: "Affordable Quality",
                desc: "Premium clinical rehabilitation accessible to everyone with transparent pricing.",
                icon: Wallet
              },
              {
                title: "Evidence-Based",
                desc: "Every protocol is backed by the latest clinical research and proven medical outcomes.",
                icon: ShieldCheck
              },
              {
                title: "Home-Like Comfort",
                desc: "Whether at clinic or home, we ensure a stress-free environment for healing.",
                icon: Home
              },
              {
                title: "Advanced Tech",
                desc: "Utilizing world-class modalities like LASER, Shockwave, and Digital Gait Analysis.",
                icon: Zap
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-medical-teal/40 hover:bg-white/[0.08] transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-medical-teal/5 rounded-full blur-2xl group-hover:bg-medical-teal/20 transition-all duration-500" />
                
                <div className="w-14 h-14 rounded-xl bg-medical-teal/10 flex items-center justify-center text-medical-teal mb-8 group-hover:scale-110 group-hover:bg-medical-teal group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                  <item.icon size={28} />
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-medical-teal transition-colors tracking-tight">
                  {item.title}
                </h3>
                
                <p className="text-white/50 text-sm leading-relaxed font-normal group-hover:text-white/70 transition-colors">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ===== DOCTOR: EDITORIAL OVERLAP ===== */}
      <section className="section-padding bg-medical-surface overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-medical-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-site grid lg:grid-cols-12 gap-12 lg:gap-0 items-center">
          <div className="lg:col-span-5 will-animate scroll-reveal reveal relative z-20">
            <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-slate-100 border-4 border-white">
              <Image 
                src="/doctor/doc1.jpg" 
                alt="Dr. Arshad Solanki" 
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
                  <p className="font-medium text-medical-blue">Dr. Arshad Solanki</p>
                  <p className="text-[0.65rem] uppercase tracking-widest text-slate-500 font-medium">Founder & Chief PT</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 lg:pl-20 will-animate scroll-reveal reveal relative z-10">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-medical-teal">Clinical Leadership</span>
            <h2 className="text-4xl md:text-6xl mt-4 mb-6 font-light">Dr. Arshad Solanki.</h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed max-w-xl font-normal">
              Founder of Healing Hands, Dr. Arshad Solanki trained at Apollo Hospital 
              and has served at the Yuvraj Shivraj Singh Neuro Rehab Center. He currently leads 
              the physiotherapy department at Vasundhara Hospital, Jodhpur, bringing 
              advanced international protocols to Rajasthan. His vision is to redefine 
              recovery through evidence-based practice and compassionate clinical care.
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
                  <p className="text-slate-400 text-[0.65rem] font-medium uppercase tracking-widest mb-1">{stat.l}</p>
                  <p className="text-lg font-medium text-medical-blue">{stat.v}</p>
                </div>
              ))}
            </div>
            
            <Link href="/about" className="btn-modern btn-primary px-8 font-medium">
              Read Full Journey
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS: SUCCESS STORIES ===== */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="max-site">
          <div className="text-center max-w-3xl mx-auto mb-20 will-animate scroll-reveal reveal">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-medical-teal block mb-6">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-medical-blue mb-8 tracking-tight">What Our Patients Say</h2>
            <div className="flex items-center justify-center gap-2 text-yellow-400">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={20} fill="currentColor" />)}
              <span className="ml-2 text-slate-400 font-medium">4.9/5.0 Google Rating</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "After months of back pain, I finally got relief with proper diagnosis and treatment here. Highly recommended.",
                author: "Patient Review",
                source: "Google Maps"
              },
              {
                text: "Excellent neuro rehabilitation services. The doctors are highly skilled and the environment is very professional.",
                author: "Patient Review",
                source: "Google Maps"
              },
              {
                text: "Best physiotherapy clinic in Jodhpur. They really focus on the root cause rather than just short-term relief.",
                author: "Patient Review",
                source: "Google Maps"
              }
            ].map((test, i) => (
              <div key={i} className="will-animate scroll-reveal reveal p-10 rounded-[2.5rem] bg-medical-surface border border-slate-50 shadow-sm hover:shadow-xl transition-all duration-500 relative">
                <div className="absolute top-8 left-8 text-6xl text-medical-teal/20 font-serif">“</div>
                <p className="text-lg text-slate-600 font-normal leading-relaxed mb-8 relative z-10 italic">
                  {test.text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-medical-teal flex items-center justify-center text-white font-bold text-xs">
                    G
                  </div>
                  <div>
                    <p className="text-sm font-bold text-medical-blue">{test.author}</p>
                    <p className="text-[0.6rem] uppercase tracking-widest text-slate-400 font-medium">{test.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOCATIONS: OUR PRESENCE ===== */}
      <section className="section-padding bg-medical-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-5" />
        <div className="max-site relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="will-animate scroll-reveal reveal">
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-medical-teal block mb-6">Our Presence</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">Serving Across Jodhpur</h2>
              <p className="text-slate-300 text-xl mb-12 font-light leading-relaxed">
                We are available at multiple locations to ensure easy access to advanced physiotherapy care. Our hubs are equipped with high-end rehabilitation technology.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {[
                  "Chopasni Housing Board",
                  "Kamla Nehru Nagar",
                  "Paota (1st Polo & Main Road)",
                  "Khetanadi Road",
                  "Near Mandore Garden",
                  "Ramsagar Circle"
                ].map((loc, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-medical-teal group-hover:bg-medical-teal group-hover:text-white transition-all">
                      <MapPin size={16} />
                    </div>
                    <span className="text-white/80 font-medium">{loc}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-16 p-8 bg-white/5 rounded-3xl border border-white/10 inline-block">
                <p className="text-medical-teal font-bold uppercase tracking-widest text-xs">Expanding to more locations soon.</p>
              </div>
            </div>

            <div className="will-animate scroll-reveal reveal">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white/5">
                <Image 
                  src="/clinic_interior.png" 
                  alt="Healing Hands Clinic" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRANSPARENT PRICING: TRUST BUILDER ===== */}
      <section className="section-padding bg-medical-surface relative overflow-hidden">
        {/* Right Corner Pattern */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <svg className="w-full h-full opacity-[0.15]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad-right-3" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M100 0 L0 100" stroke="url(#grad-right-3)" strokeWidth="0.2" fill="none" />
            <path d="M100 10 L10 100" stroke="url(#grad-right-3)" strokeWidth="0.2" fill="none" />
            <path d="M100 20 L20 100" stroke="url(#grad-right-3)" strokeWidth="0.2" fill="none" />
            <path d="M90 0 L0 90" stroke="url(#grad-right-3)" strokeWidth="0.2" fill="none" />
            <path d="M80 0 L0 80" stroke="url(#grad-right-3)" strokeWidth="0.2" fill="none" />
          </svg>
        </div>
        <div className="max-site">
          <div className="bg-medical-blue rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-medical-teal/10 to-transparent pointer-events-none" />
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="will-animate scroll-reveal reveal">
                <span className="text-sm font-medium uppercase tracking-[0.2em] text-medical-teal">Patient First Policy</span>
                <h2 className="text-4xl md:text-5xl mt-6 mb-8 text-white font-light leading-tight">Care Beyond Recovery. <br /> Pricing Beyond Doubt.</h2>
                <p className="text-white/70 text-lg mb-10 leading-relaxed font-normal">
                  We believe in complete transparency. Our treatment plans are built around 
                  your recovery goals, with no hidden package fees or unnecessary sessions.
                </p>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-medical-teal" />
                    <span className="text-white/80 text-sm font-medium">No Hidden Costs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-medical-teal" />
                    <span className="text-white/80 text-sm font-medium">Session-wise Billing</span>
                  </div>
                </div>
              </div>

              <div className="will-animate scroll-reveal reveal lg:flex lg:justify-end">
                <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md text-center">
                  <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-slate-500 mb-4">Initial Consultation</p>
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="text-2xl font-light text-slate-500 mt-2">₹</span>
                    <span className="text-7xl font-light text-medical-blue tracking-tighter">500</span>
                  </div>
                  <p className="text-slate-500 text-sm mb-10 font-normal leading-relaxed">
                    Includes detailed history taking, physical assessment, and personalized recovery roadmap.
                  </p>
                  <Link href="/contact" className="btn-modern btn-primary w-full py-5 text-lg font-medium hover-glow">
                    Book Assessment Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FIND US ON MAP ===== */}
      <section className="section-padding bg-white pt-0">
        <div className="max-site">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-medical-teal">Our Presence</span>
            <h2 className="text-4xl md:text-5xl mt-4 text-medical-blue font-light tracking-tight">Visit Our Centers.</h2>
          </div>
          
          <div className="rounded-[3rem] overflow-hidden bg-medical-surface border border-slate-100 shadow-2xl relative group">
            <div className="absolute top-12 left-12 z-10 glass-panel p-8 rounded-3xl border-white/40 shadow-2xl backdrop-blur-3xl hidden lg:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-medical-teal flex items-center justify-center text-white shadow-lg">
                  <MapPin size={20} />
                </div>
                <h4 className="text-xl font-medium text-medical-blue">Main Clinical Center</h4>
              </div>
              <p className="text-sm text-slate-500 font-normal leading-relaxed mb-8 max-w-[250px]">
                Paota B Road, near Landmark landmarks, Jodhpur, Rajasthan 342001
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Healing+Hands+Physiotherapy+Jodhpur"
                  target="_blank"
                  className="px-8 py-4 bg-medical-blue text-white rounded-2xl text-[0.7rem] font-medium uppercase tracking-widest hover:bg-medical-teal transition-all flex items-center gap-2"
                >
                  <Navigation size={16} /> Open in Maps
                </a>
              </div>
            </div>
            
            <div className="aspect-[21/9] min-h-[500px] w-full relative">
              <iframe 
                src="https://www.google.com/maps?q=Healing+Hands+Physiotherapy+Jodhpur&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ: FREQUENT QUESTIONS ===== */}
      <section className="section-padding bg-medical-surface">
        <div className="max-site">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 will-animate scroll-reveal reveal">
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-medical-teal">Common Queries</span>
              <h2 className="text-4xl md:text-5xl mt-4 mb-8 text-medical-blue font-light">Questions & <br /> Answers.</h2>
              <p className="text-slate-500 font-normal text-lg mb-10 leading-relaxed">
                Everything you need to know about starting your physical therapy journey with us.
              </p>
              <Link href="/contact" className="btn-modern btn-outline bg-white font-medium">
                Ask a Specific Question
              </Link>
            </div>
            
            <div className="lg:col-span-7 space-y-4">
              {[
                { q: "What should I bring to my first appointment?", a: "Please bring your recent medical reports, scans (X-ray/MRI), and wear comfortable, loose clothing for the assessment." },
                { q: "How long is a typical physiotherapy session?", a: "A standard session lasts between 45 to 60 minutes, depending on the severity of the condition and the treatment plan." },
                { q: "Do you offer home visit services?", a: "Yes, we provide specialized home rehabilitation for patients with mobility issues or post-surgical cases." },
                { q: "How many sessions will I need?", a: "This depends on your specific diagnosis. We provide a projected timeline after your initial assessment." }
              ].map((item, i) => (
                <div key={i} className="will-animate scroll-reveal reveal p-8 rounded-2xl bg-white border border-slate-100 group">
                  <h4 className="text-lg font-medium text-medical-blue mb-3 group-hover:text-medical-teal transition-colors">{item.q}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-normal">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA: PREMIUM BANNER ===== */}
      <section className="section-padding pt-10">
        <div className="max-site bg-medical-blue rounded-2xl p-12 md:p-24 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-medical-blue via-slate-800 to-medical-blue" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-medical-teal opacity-20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl mb-10 leading-tight will-animate scroll-reveal reveal font-light">
              Ready to begin your <br /> Recovery Journey?
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 will-animate scroll-reveal reveal">
              <Link href="/contact" className="btn-modern bg-white text-medical-blue hover:bg-slate-50 px-10 py-4 shadow-xl font-medium">
                Book Initial Assessment
              </Link>
              <a href="tel:6378062237" className="group flex items-center gap-3 text-white/90 font-medium uppercase tracking-widest text-[0.7rem] hover:text-white transition-colors">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-medical-teal transition-colors">
                  <Phone size={14} />
                </span>
                Call: 6378-062237
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
