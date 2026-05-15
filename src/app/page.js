"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, Activity, Bone, Brain, Baby, Dumbbell,
  HeartPulse, ShieldCheck, Award, Users,
  MapPin, ChevronRight, Zap, ArrowUpRight, Phone, Video,
  Stethoscope, CheckCircle2, Crosshair, Navigation,
  Search, Target, Cpu, Layers, Sparkles, Clock, Wallet, Laptop, Star, Home, Navigation2, Globe, Plus
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
  const [partnerIndex, setPartnerIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <section className="section-padding bg-white relative overflow-hidden">
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

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            {treatments.map((t, i) => (
              <motion.div
                key={t.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="min-w-[85vw] md:min-w-0 snap-center"
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
      <section className="section-padding bg-medical-blue relative overflow-hidden border-t border-white/5">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="will-animate scroll-reveal reveal">
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-medical-teal mb-6 block">The Problem</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
                Why Your Pain <br />Keeps Coming Back
              </h2>
              <div className="space-y-6 text-xl text-slate-300 font-normal leading-relaxed">
                <p>
                  Most treatments focus only on temporary relief. Painkillers, rest, or basic exercises may reduce symptoms—but they don’t address the underlying dysfunction.
                </p>
                <p>
                  At our center, we focus on identifying the root cause of your pain, correcting movement patterns, and rebuilding strength to ensure long-term recovery.
                </p>
              </div>
              <div className="mt-12 p-8 bg-white/5 rounded-3xl border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-medical-teal/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                <p className="text-2xl font-medium text-white relative z-10">
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
      <section className="section-padding bg-white relative overflow-hidden">
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

      {/* ===== SERVICE SEGMENTATION: CLINIC LOCATION ===== */}
      <section className="section-padding bg-medical-blue relative overflow-hidden border-t border-white/5">
        {/* Right Corner Pattern */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <svg className="w-full h-full opacity-[0.05]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad-right-1" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M100 0 L0 100" stroke="url(#grad-right-1)" strokeWidth="0.2" fill="none" />
            <path d="M100 10 L10 100" stroke="url(#grad-right-1)" strokeWidth="0.2" fill="none" />
            <path d="M100 20 L20 100" stroke="url(#grad-right-1)" strokeWidth="0.2" fill="none" />
            <path d="M90 0 L0 90" stroke="url(#grad-right-1)" strokeWidth="0.2" fill="none" />
            <path d="M80 0 L0 80" stroke="url(#grad-right-1)" strokeWidth="0.2" fill="none" />
          </svg>
        </div>

        {/* Technical Dot Grid Background */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />

        <div className="container-wide relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 will-animate scroll-reveal reveal">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-medical-teal mb-4 block">Physical Center</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">Serving Across Jodhpur</h2>
            <p className="text-slate-300 text-lg font-normal">We are available at multiple locations to ensure easy access to advanced physiotherapy care. Our hubs are equipped with high-end rehabilitation technology.</p>
          </div>

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            {locations.map((loc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative min-w-[320px] md:min-w-0"
              >
                <div className="bg-[#E5E9F0] rounded-[2.5rem] p-6 md:p-8 shadow-2xl border border-white/20 flex flex-col h-full relative overflow-hidden">
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
                    <Link
                      href="/contact"
                      className="flex-1 py-4 bg-[#3B82F6] text-white rounded-2xl text-[0.7rem] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/30 hover:bg-[#2563EB] transition-all text-center flex items-center justify-center group/btn"
                    >
                      View Clinic
                    </Link>
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

      {/* ===== SERVICE SEGMENTATION: HOME & ONLINE ===== */}
      <section className="section-padding bg-white relative overflow-hidden border-t border-slate-100">
        {/* Left Corner Pattern */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <svg className="w-full h-full opacity-[0.1]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad-left-new" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 0 L100 100" stroke="url(#grad-left-new)" strokeWidth="0.2" fill="none" />
            <path d="M0 10 L90 100" stroke="url(#grad-left-new)" strokeWidth="0.2" fill="none" />
            <path d="M0 20 L80 100" stroke="url(#grad-left-new)" strokeWidth="0.2" fill="none" />
          </svg>
        </div>

        <div className="container-wide relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 will-animate scroll-reveal reveal">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-medical-teal mb-4 block">Flexible Care</span>
            <h2 className="text-4xl md:text-5xl font-bold text-medical-blue mb-3 tracking-tight">Home & Online</h2>
            <p className="text-slate-500 text-lg font-normal">Bespoke rehabilitation protocols delivered wherever you are.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                id: "01",
                title: "Healing Hands Home Care",
                subtitle: "Across Jodhpur City",
                icon: Home,
                address: "We bring the entire clinical setup to your home.",
                doctor: "Senior On-Call PT",
                doctorRole: "Home Care Specialist",
                buttonText: "BOOK HOME VISIT",
              },
              {
                id: "02",
                title: "Healing Hands Online",
                subtitle: "Virtual Consultation",
                icon: Globe,
                address: "Consult our experts via video call from anywhere.",
                doctor: "Expert Consultant",
                doctorRole: "Tele-Rehab Specialist",
                buttonText: "START CONSULTATION",
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="group relative"
              >
                <div className="relative h-full bg-white rounded-[3rem] p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden flex flex-col transition-all duration-500 hover:shadow-[0_40px_100px_-20px_rgba(37,99,235,0.12)] hover:-translate-y-2">

                  {/* Subtle Background Pattern */}
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                    <item.icon size={240} strokeWidth={1} />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-medical-teal/10 flex items-center justify-center text-medical-teal">
                        <item.icon size={24} />
                      </div>
                      <span className="text-[0.6rem] font-bold text-medical-teal uppercase tracking-[0.25em]">Premium Care</span>
                    </div>

                    <h3 className="text-3xl font-bold text-medical-blue mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 font-medium mb-8">
                      {item.subtitle}
                    </p>

                    <div className="relative pl-6 border-l-2 border-slate-100 group-hover:border-medical-teal transition-colors duration-500 mb-10">
                      <span className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest block mb-2">Primary Objective</span>
                      <p className="text-lg font-medium text-medical-blue leading-relaxed">{item.address}</p>
                    </div>
                  </div>

                  {/* Refined Doctor Spotlight */}
                  <div className="mt-auto relative z-10">
                    <div className="flex items-center justify-between mb-8 p-1.5 pr-6 rounded-full bg-slate-50 border border-slate-100 group/doc hover:bg-white transition-all duration-500">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-white relative">
                          <Image
                            src={item.doctor === "Senior On-Call PT" ? teamMembers[0].image : teamMembers[1].image}
                            alt="Doctor"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-medical-blue leading-none mb-1">{item.doctor}</p>
                          <p className="text-[0.6rem] text-slate-500 font-bold uppercase tracking-tight">{item.doctorRole}</p>
                        </div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>

                    <Link
                      href="/contact"
                      className="w-full flex items-center justify-center gap-3 bg-medical-teal text-white py-5 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-medical-teal/20 hover:bg-medical-blue transition-all"
                    >
                      <span>{item.buttonText}</span>
                      <ArrowRight size={18} />
                    </Link>
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
              { n: 250000, suffix: "+", l: "Patients Restored" },
              { n: 13, suffix: "+ Years", l: "Clinical Experience" },
              { n: 1, suffix: " on 1", l: "Personalized Care" },
              { n: 8, suffix: "+ Hubs", l: "Expanding Across Jodhpur" }
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
      <section className="section-padding bg-medical-blue relative overflow-hidden border-t border-white/5">
        {/* Left Corner Pattern */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <svg className="w-full h-full opacity-[0.05]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad-left-2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 0 L100 100" stroke="url(#grad-left-2)" strokeWidth="0.2" fill="none" />
            <path d="M0 10 L90 100" stroke="url(#grad-left-2)" strokeWidth="0.2" fill="none" />
            <path d="M0 20 L80 100" stroke="url(#grad-left-2)" strokeWidth="0.2" fill="none" />
            <path d="M10 0 L100 90" stroke="url(#grad-left-2)" strokeWidth="0.2" fill="none" />
            <path d="M20 0 L100 80" stroke="url(#grad-left-2)" strokeWidth="0.2" fill="none" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-medical-teal/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 opacity-60" />
        <div className="max-site relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 will-animate scroll-reveal reveal">
            <span className="text-label">The Patient Journey</span>
            <h2 className="text-title text-4xl md:text-6xl mt-4 text-white">The Path to Restoration.</h2>
            <p className="text-slate-300 mt-6 text-lg font-normal">Our 3-step evidence-based recovery model ensures precision in every movement and certainty in your results.</p>
          </div>

          <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 relative">
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
              <div key={i} className="will-animate scroll-reveal reveal relative z-10 min-w-[85vw] md:min-w-0 snap-center">
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

      {/* ===== COMMON CONDITIONS: PREMIUM CARDS ===== */}
      <section className="section-padding bg-white -mt-48 relative z-30">
        <div className="max-site">
          <div className="text-center max-w-3xl mx-auto mb-16 will-animate scroll-reveal reveal">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-medical-teal block mb-6">Expert Specializations</span>
            <h2 className="text-4xl md:text-6xl font-bold text-medical-blue tracking-tight">What We Treat.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 px-4 md:px-0">
            {[
              { cat: "Orthopedic", icon: Bone, desc: "Bone, joint, and muscle pain recovery." },
              { cat: "Neurological", icon: Brain, desc: "Stroke, paralysis, and nerve disorders." },
              { cat: "Pediatric", icon: Baby, desc: "Developmental and childhood motor care." },
              { cat: "Sports Injury", icon: Activity, desc: "Athletic injuries and performance rehab." },
              { cat: "Geriatric", icon: HeartPulse, desc: "Age-related mobility and balance care." },
              { cat: "Cardiopulmonary", icon: Activity, desc: "Heart and lung health rehabilitation." },
              { cat: "Women’s Health", icon: Users, desc: "Pre/postnatal and pelvic floor care." },
              { cat: "Pain Management", icon: Zap, desc: "Chronic pain and trigger point therapy." },
              { cat: "Post Surgical", icon: Stethoscope, desc: "Recovery after major surgeries." },
              { cat: "Manual Therapy", icon: Layers, desc: "Hands-on mobilization and advanced rehab." },
              { cat: "Vestibular", icon: Navigation, desc: "Vertigo and balance restoration." },
              { cat: "Occupational", icon: Laptop, desc: "Work-related injuries and ergonomics." },
              { cat: "Fitness & Lifestyle", icon: Dumbbell, desc: "Weight loss and lifestyle rehabilitation." }
            ].map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 hover:border-medical-teal/30 hover:shadow-xl hover:shadow-medical-teal/5 transition-all duration-500 flex flex-col items-start text-left overflow-hidden h-full"
              >
                {/* Background Decor */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-medical-teal/5 rounded-full blur-2xl group-hover:bg-medical-teal/10 transition-all duration-500" />
                
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-medical-teal mb-6 group-hover:bg-medical-teal group-hover:text-white transition-all duration-500 shrink-0">
                  <group.icon size={24} />
                </div>

                <h3 className="text-lg font-bold text-medical-blue mb-3 tracking-tight group-hover:text-medical-teal transition-colors">
                  {group.cat}
                </h3>
                
                <p className="text-slate-500 font-normal text-[0.8rem] leading-relaxed mb-6">
                  {group.desc}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-50 w-full flex items-center justify-between">
                  <Link href="/contact" className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-400 group-hover:text-medical-teal transition-all flex items-center gap-2">
                    Inquire <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
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
      <section className="section-padding bg-medical-surface relative overflow-hidden border-y border-slate-100">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-medical-teal/5 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-medical-teal/5 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4 pointer-events-none" />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #0f172a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-site relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 will-animate scroll-reveal reveal">
            <span className="text-sm font-bold uppercase tracking-[0.4em] text-medical-teal mb-4 block">Clinical Excellence</span>
            <h2 className="text-4xl md:text-5xl font-bold text-medical-blue mb-8 tracking-tight">
              The Healing Hands Standard.
            </h2>
            <p className="text-slate-500 font-normal text-xl leading-relaxed">
              We redefine physical rehabilitation through a systematic, evidence-based approach
              that puts patient recovery at the center of everything we do.
            </p>
          </div>

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
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
                className="group p-8 rounded-2xl bg-white border border-slate-100 hover:border-medical-teal/40 hover:shadow-xl transition-all duration-500 relative overflow-hidden min-w-[85vw] md:min-w-0 snap-center"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-medical-teal/5 rounded-full blur-2xl group-hover:bg-medical-teal/10 transition-all duration-500" />

                <div className="w-14 h-14 rounded-xl bg-medical-teal/10 flex items-center justify-center text-medical-teal mb-8 group-hover:scale-110 group-hover:bg-medical-teal group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                  <item.icon size={28} />
                </div>

                <h3 className="text-xl font-bold mb-4 text-medical-blue group-hover:text-medical-teal transition-colors tracking-tight">
                  {item.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed font-normal group-hover:text-slate-600 transition-colors">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ===== DOCTOR: EDITORIAL OVERLAP ===== */}
      <section className="section-padding bg-medical-blue overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-medical-teal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="max-site grid lg:grid-cols-12 gap-12 lg:gap-0 items-center">
          <div className="lg:col-span-5 will-animate scroll-reveal reveal relative z-20">
            <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-slate-100 border-4 border-white/10">
              <Image
                src="/doctor/doc1.jpg"
                alt="Dr. Asad Solanki"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-white shadow-2xl p-6 rounded-3xl hidden md:block border border-slate-100 animate-float">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-medical-teal rounded-2xl flex items-center justify-center text-white shadow-lg shadow-medical-teal/20 rotate-3">
                  <Award size={28} />
                </div>
                <div>
                  <p className="font-bold text-medical-blue text-lg leading-tight">Dr. Asad Solanki</p>
                  <p className="text-[0.6rem] uppercase tracking-[0.2em] text-medical-teal font-bold mt-1">Founder & Chief PT</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-20 will-animate scroll-reveal reveal relative z-10">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-medical-teal">Clinical Leadership</span>
            <h2 className="text-4xl md:text-6xl mt-4 mb-6 font-light text-white">Dr. Asad Solanki.</h2>
            <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-xl font-normal">
              Founder of Healing Hands, Dr. Asad Solanki trained at Apollo Hospital
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
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-white/10 overflow-hidden">
                    <div className="w-full h-1/2 bg-medical-teal" />
                  </div>
                  <p className="text-slate-400 text-[0.65rem] font-medium uppercase tracking-widest mb-1">{stat.l}</p>
                  <p className="text-lg font-medium text-white">{stat.v}</p>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-modern btn-primary px-8 font-medium">
              Read Full Journey
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS: GOOGLE VERIFIED SUCCESS STORIES ===== */}
      <section className="section-padding bg-slate-50/50 relative overflow-hidden">
        <div className="max-site">
          <div className="text-center max-w-3xl mx-auto mb-20 will-animate scroll-reveal reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-100 shadow-sm mb-6">
              <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.83z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.83c.87-2.6 3.3-4.51 6.16-4.51z" fill="#EA4335" />
              </svg>
              <span className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-500">Google Verified Business</span>
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={10} fill="#FBBC05" className="text-[#FBBC05]" />)}
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-medical-blue mb-8 tracking-tight">Patient Success Stories</h2>
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-medical-blue">4.9</p>
                <p className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-400">Google Rating</p>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="text-center">
                <p className="text-3xl font-bold text-medical-blue">500+</p>
                <p className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-400">Verified Reviews</p>
              </div>
            </div>
          </div>

          <div className="relative group/carousel px-4 md:px-12">
            <div className="overflow-hidden py-12">
              <motion.div
                drag="x"
                dragConstraints={{
                  right: 0,
                  left: isMobile ? -(10 * 100) + '%' : -(8 * (100 / 3 + 1)) + '%'
                }}
                dragElastic={0.1}
                dragMomentum={false}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = offset.x;
                  const threshold = 50;
                  if (swipe < -threshold && testimonialIndex < (isMobile ? 10 : 8)) {
                    setTestimonialIndex(prev => prev + 1);
                  } else if (swipe > threshold && testimonialIndex > 0) {
                    setTestimonialIndex(prev => prev - 1);
                  }
                }}
                animate={{ x: `-${testimonialIndex * (isMobile ? 100 : 33.8)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex gap-0 md:gap-8 cursor-grab active:cursor-grabbing"
              >
                {[
                  {
                    text: "After months of back pain, I finally got relief with proper diagnosis and treatment here. Highly recommended for clinical precision.",
                    author: "Rajesh Kumar", role: "Verified Patient", date: "2 weeks ago"
                  },
                  {
                    text: "Excellent neuro rehabilitation services. The doctors are highly skilled and the environment is very professional and hygienic.",
                    author: "Ananya Sharma", role: "Verified Patient", date: "1 month ago"
                  },
                  {
                    text: "Best physiotherapy clinic in Jodhpur. They really focus on the root cause rather than just short-term relief. Amazing team.",
                    author: "Vikram Singh", role: "Verified Patient", date: "3 weeks ago"
                  },
                  {
                    text: "My arthritis pain has significantly reduced. The personalized exercise plan works wonders. Truly grateful to the team.",
                    author: "Meera Bai", role: "Verified Patient", date: "5 days ago"
                  },
                  {
                    text: "Recovered from an ACL injury faster than expected. The sports rehab protocol here is world-class and very scientific.",
                    author: "Amit Patel", role: "Verified Patient", date: "2 months ago"
                  },
                  {
                    text: "Cervical pain was making my life difficult. Within 10 sessions, I felt 90% better. The manual therapy is exceptional.",
                    author: "Sunita Devi", role: "Verified Patient", date: "1 week ago"
                  },
                  {
                    text: "My father showed great improvement in movement after his stroke. The neuro-physiotherapists are very patient and expert.",
                    author: "Rahul Verma", role: "Verified Patient", date: "3 months ago"
                  },
                  {
                    text: "The post-surgery rehabilitation for my knee replacement was seamless. I'm back to walking comfortably now.",
                    author: "Priya Sharma", role: "Verified Patient", date: "2 weeks ago"
                  },
                  {
                    text: "Dealing with a slip disc was terrifying, but the non-surgical approach here helped me avoid surgery and recover fully.",
                    author: "Kamal Kishor", role: "Verified Patient", date: "1 month ago"
                  },
                  {
                    text: "The Bell's Palsy treatment was very effective. I saw visible changes in facial movement within the first week of therapy.",
                    author: "Anita Gupta", role: "Verified Patient", date: "4 days ago"
                  },
                  {
                    text: "Great care for senior citizens. My grandfather's balance and mobility improved a lot with their geriatric specialized care.",
                    author: "Suresh Mehra", role: "Verified Patient", date: "6 weeks ago"
                  }
                ].map((test, i) => (
                  <div key={i} className="flex-shrink-0 w-full md:w-[calc(33.33%-1.5rem)] px-4 md:px-0">
                    <div className="will-animate scroll-reveal reveal p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500 relative flex flex-col h-full group/card">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill="#FBBC05" className="text-[#FBBC05]" />)}
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-50 text-green-600 border border-green-100">
                          <ShieldCheck size={12} />
                          <span className="text-[0.55rem] font-bold uppercase tracking-tighter">Verified</span>
                        </div>
                      </div>

                      <p className="text-base text-slate-600 font-normal leading-relaxed mb-8 flex-1 italic">
                        "{test.text}"
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover/card:bg-medical-teal/10 group-hover/card:text-medical-teal transition-all">
                            <Users size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-medical-blue">{test.author}</p>
                            <p className="text-[0.6rem] font-medium text-slate-400">{test.role} • {test.date}</p>
                          </div>
                        </div>
                        <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg" className="opacity-100 group-hover/card:scale-110 transition-all duration-500">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.83z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.83c.87-2.6 3.3-4.51 6.16-4.51z" fill="#EA4335" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Carousel Navigation */}
            <div className="absolute top-1/2 -left-4 md:-left-8 -right-4 md:-right-8 -translate-y-1/2 flex justify-between pointer-events-none">
              <button
                onClick={() => setTestimonialIndex(prev => Math.max(0, prev - 1))}
                className={`w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center transition-all pointer-events-auto ${testimonialIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-medical-teal hover:text-white"}`}
                disabled={testimonialIndex === 0}
              >
                <ChevronRight size={24} className="rotate-180" />
              </button>
              <button
                onClick={() => setTestimonialIndex(prev => Math.min(isMobile ? 10 : 8, prev + 1))}
                className={`w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center transition-all pointer-events-auto ${testimonialIndex >= (isMobile ? 10 : 8) ? "opacity-30 cursor-not-allowed" : "hover:bg-medical-teal hover:text-white"}`}
                disabled={testimonialIndex >= (isMobile ? 10 : 8)}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(isMobile ? 11 : 9)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${testimonialIndex === i ? "bg-medical-teal w-8" : "bg-slate-200"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOCATIONS: OUR PRESENCE ===== */}
      {/* <section className="section-padding bg-medical-blue relative overflow-hidden">
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
      </section> */}

      {/* ===== AFFILIATIONS & CERTIFICATIONS: TRUST & EMPANELMENT ===== */}
      <section className="py-24 bg-medical-blue relative overflow-hidden">
        <div className="max-site relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 will-animate scroll-reveal reveal">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-medical-teal block mb-6">Cashless Government Health Schemes</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Government Health Schemes</h2>
            <p className="text-slate-300 text-lg font-normal">
              Healing Hands Clinic is proud to be an authorized provider for major government healthcare initiatives, ensuring quality rehabilitation for all.
            </p>
          </div>

          <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            {[
              {
                name: "RGHS",
                fullName: "Rajasthan Government Health Scheme",
                desc: "Cashless Physiotherapy for Rajasthan state government employees and pensioners.",
                image: "/cirtificates/rghs.jpeg"
              },
              {
                name: "CGHS",
                fullName: "Central Government Health Scheme",
                desc: "Cashless Physiotherapy for Central Government employees and retirees across India.",
                image: "/cirtificates/cghs.jpeg"
              },
              {
                name: "ECHS",
                fullName: "Ex-Servicemen Contributory Health Scheme",
                desc: "Cashless Physiotherapy for our veterans and their dependents.",
                image: "/cirtificates/echs.jpeg"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center group min-w-[85vw] md:min-w-0 snap-center"
              >
                <div className="w-full aspect-[3/4] relative mb-8 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 group-hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src={item.image}
                    alt={item.fullName}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-medical-blue mb-2">{item.name}</h3>
                <p className="text-[0.65rem] font-bold text-medical-teal uppercase tracking-widest mb-4">{item.fullName}</p>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  {item.desc}
                </p>
                <div className="mt-auto flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-100">
                  <ShieldCheck size={14} />
                  <span className="text-[0.55rem] font-bold uppercase tracking-widest">Authorized Center</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MEDICAL TEAM: EXPERT PROFILES ===== */}
      <section className="section-padding bg-white relative overflow-hidden border-t border-slate-100">
        <div className="max-site">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="will-animate scroll-reveal reveal">
              <div className="w-12 h-1 bg-medical-teal mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold text-medical-blue mb-2 tracking-tight">Our Medical Team</h2>
              <p className="text-slate-500 font-medium text-lg">Expert Doctors, Nurses & Technicians for Home Care</p>
            </div>
            <Link href="/team" className="will-animate scroll-reveal reveal flex items-center gap-2 text-medical-teal font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all group">
              View All Team
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            {teamMembers.slice(0, 8).map((doctor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="group relative min-w-[85vw] md:min-w-0 snap-center"
              >
                <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-slate-100 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-medical-teal animate-pulse" />
                        <span className="text-[0.6rem] font-bold text-slate-600 uppercase tracking-widest">Available Today</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-1 text-yellow-400 mb-3">
                      <Star size={12} fill="currentColor" />
                      <span className="text-[0.7rem] font-bold text-slate-700">4.9/5.0</span>
                    </div>

                    <h3 className="text-xl font-bold text-medical-blue mb-1 group-hover:text-medical-teal transition-colors tracking-tight">
                      {doctor.name}
                    </h3>
                    <p className="text-xs font-bold text-medical-teal uppercase tracking-[0.15em] mb-6">{doctor.role}</p>

                    <div className="grid grid-cols-2 gap-4 mb-8 py-4 border-y border-slate-50">
                      <div>
                        <p className="text-[0.55rem] font-bold text-slate-400 uppercase tracking-widest mb-1">Experience</p>
                        <p className="text-xs font-bold text-medical-blue">{doctor.experience}</p>
                      </div>
                      <div>
                        <p className="text-[0.55rem] font-bold text-slate-400 uppercase tracking-widest mb-1">Specialist</p>
                        <p className="text-xs font-bold text-medical-blue truncate">{doctor.specialization.split(',')[0]}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <Link
                        href={`/doctor/${doctor.slug}`}
                        className="flex-1 py-3 rounded-xl border border-slate-100 text-medical-blue text-[0.65rem] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all text-center"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/contact"
                        className="flex-1 py-3 rounded-xl bg-medical-teal text-white text-[0.65rem] font-bold uppercase tracking-widest hover:bg-medical-blue hover:shadow-lg transition-all text-center"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HEALTHCARE PARTNERS: OUR NETWORK ===== */}
      <section className="py-24 bg-medical-blue relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-mesh opacity-5" />
        <div className="max-site relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="will-animate scroll-reveal reveal">
              <span className="text-sm font-bold uppercase tracking-[0.4em] text-medical-teal block mb-6 flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-medical-teal rotate-45" />
                Our Network
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Our Healthcare Partners</h2>
              <p className="text-slate-300 text-lg font-normal max-w-2xl">
                Trusted by leading medical institutions for fast response and quality care.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setPartnerIndex(prev => Math.max(0, prev - 1))}
                className={`w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center transition-all bg-white shadow-sm ${partnerIndex === 0 ? "opacity-50 cursor-not-allowed text-slate-300" : "text-slate-400 hover:border-medical-teal hover:text-medical-teal"}`}
                disabled={partnerIndex === 0}
              >
                <ChevronRight size={24} className="rotate-180" />
              </button>
              <button
                onClick={() => setPartnerIndex(prev => Math.min(isMobile ? 4 : 2, prev + 1))}
                className={`w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center transition-all bg-white shadow-sm ${partnerIndex >= (isMobile ? 4 : 2) ? "opacity-50 cursor-not-allowed text-slate-300" : "text-slate-400 hover:border-medical-teal hover:text-medical-teal"}`}
                disabled={partnerIndex >= (isMobile ? 4 : 2)}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="relative mb-12 overflow-hidden py-10">
            <motion.div
              drag="x"
              dragConstraints={{
                right: 0,
                left: isMobile ? -(4 * 100) + '%' : -(2 * 33.33) + '%'
              }}
              dragElastic={0.1}
              dragMomentum={false}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                const threshold = 50;
                if (swipe < -threshold && partnerIndex < (isMobile ? 4 : 2)) {
                  setPartnerIndex(prev => prev + 1);
                } else if (swipe > threshold && partnerIndex > 0) {
                  setPartnerIndex(prev => prev - 1);
                }
              }}
              animate={{ x: `-${partnerIndex * (isMobile ? 100 : 33.33)}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="flex gap-0 md:gap-8 cursor-grab active:cursor-grabbing"
            >
              {[
                { name: "Vasundhara Hospital", image: "/Hospitals/vasundhara.jpeg", rating: "5.0" },
                { name: "Marwar Hospital", image: "/Hospitals/marwar.jpeg", rating: "5.0" },
                { name: "Suncity Hospital", image: "/Hospitals/suncity.jpeg", rating: "5.0" },
                { name: "Chandramangal Hospital", image: "/Hospitals/chandramangal.jpeg", rating: "5.0" },
                { name: "Subham Hospital", image: "/Hospitals/subham.jpeg", rating: "5.0" },
              ].map((item, i) => (
                <div key={i} className="flex-shrink-0 w-full md:w-[calc(33.33%-1.5rem)] px-4 md:px-0">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-500 group flex flex-col h-full">
                    <div className="aspect-[4/3] relative mb-8 flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={200}
                        height={150}
                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-medical-blue mb-4 leading-tight">{item.name}</h3>
                    <div className="mt-auto">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100 w-fit mb-4">
                        <CheckCircle2 size={10} />
                        <span className="text-[0.6rem] font-bold uppercase tracking-widest">Verified</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={10} fill="#FFD700" color="#FFD700" />
                        ))}
                        <span className="text-[0.7rem] font-bold text-slate-400 ml-2">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>


          {/* Footer Icons */}
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 py-12 border-t border-white/10">
            {[
              { label: "Verified Partners", icon: <ShieldCheck size={20} className="text-medical-teal" /> },
              { label: "Quality Care", icon: <Award size={20} className="text-blue-400" /> },
              { label: "Instant Support", icon: <Zap size={20} className="text-yellow-400" /> },
              { label: "Global Standards", icon: <Globe size={20} className="text-indigo-400" /> }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center gap-3 group cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-white/5 shadow-sm border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <span className="text-[0.7rem] font-bold text-white uppercase tracking-widest">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRANSPARENT PRICING: TRUST BUILDER ===== */}


      {/* ===== FIND US ON MAP ===== */}
      {/* <section className="section-padding bg-white pt-0">
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
      </section> */}

      {/* ===== FAQ: FREQUENT QUESTIONS ===== */}
      <section className="section-padding bg-white relative overflow-hidden border-t border-slate-100">
        <div className="max-site">
          <div className="grid lg:grid-cols-12 gap-10 md:gap-16">
            <div className="lg:col-span-5 will-animate scroll-reveal reveal">
              <span className="text-[0.7rem] md:text-sm font-bold uppercase tracking-[0.2em] text-medical-teal">Common Queries</span>
              <h2 className="text-3xl md:text-5xl mt-4 mb-6 md:mb-8 text-medical-blue font-bold tracking-tight">Questions & <br className="hidden md:block" /> Answers.</h2>
              <p className="text-slate-500 font-normal text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
                Everything you need to know about starting your physical therapy journey with us.
              </p>
              <Link href="/contact" className="group flex items-center gap-4 text-medical-blue font-bold bg-slate-50 border border-slate-200 px-6 md:px-8 py-3.5 md:py-4 rounded-2xl hover:bg-medical-teal hover:text-white transition-all duration-500 w-full md:w-fit shadow-sm justify-center md:justify-start">
                <span className="text-sm md:text-base">Ask a Specific Question</span>
                <div className="w-8 h-8 rounded-full bg-medical-teal text-white flex items-center justify-center group-hover:translate-x-1 transition-transform shrink-0">
                  <ArrowRight size={16} />
                </div>
              </Link>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {[
                { q: "What should I bring to my first appointment?", a: "Please bring your recent medical reports, scans (X-ray/MRI), and wear comfortable, loose clothing for the assessment." },
                { q: "How long is a typical physiotherapy session?", a: "A standard session lasts between 45 to 60 minutes, depending on the severity of the condition and the treatment plan." },
                { q: "Do you offer home visit services?", a: "Yes, we provide specialized home rehabilitation for patients with mobility issues or post-surgical cases." },
                { q: "How many sessions will I need?", a: "This depends on your specific diagnosis. We provide a projected timeline after your initial assessment." },
                { q: "Is physiotherapy painful?", a: "Some treatments may cause temporary discomfort, but our goal is to manage pain and improve mobility using gentle, evidence-based techniques." },
                { q: "Do I need a doctor's referral?", a: "No, you can book an assessment directly with us. However, if you have a referral from a surgeon or GP, please bring it along." }
              ].map((item, i) => (
                <div
                  key={i}
                  className={`will-animate scroll-reveal reveal overflow-hidden transition-all duration-500 rounded-[1.5rem] md:rounded-3xl border ${activeFaq === i ? 'bg-slate-50 border-medical-teal/30 shadow-xl shadow-slate-200/50' : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'}`}
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? -1 : i)}
                    className="w-full p-5 md:p-8 flex items-center justify-between text-left group gap-4"
                  >
                    <h4 className={`text-base md:text-lg font-bold transition-colors duration-300 ${activeFaq === i ? 'text-medical-teal' : 'text-medical-blue group-hover:text-medical-teal'}`}>
                      {item.q}
                    </h4>
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500 shrink-0 ${activeFaq === i ? 'bg-medical-teal text-white rotate-45' : 'bg-slate-100 text-slate-400'}`}>
                      <Plus size={18} />
                    </div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: activeFaq === i ? "auto" : 0, opacity: activeFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 md:px-8 md:pb-8">
                      <div className="h-px w-full bg-slate-100 mb-4 md:mb-6" />
                      <p className="text-slate-500 text-sm md:text-base leading-relaxed font-normal max-w-2xl">
                        {item.a}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA: PREMIUM BANNER ===== */}
      <section className="section-padding bg-white relative overflow-hidden">
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
        <div className="md:max-site mx-2 py-10">
          <div className="bg-medical-blue rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-24 relative overflow-hidden group">
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-medical-teal/10 rounded-full blur-[100px] -mr-48 -mt-48 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -ml-48 -mb-48" />

            <div className="grid lg:grid-cols-12 gap-16 items-center relative z-10">
              <div className="lg:col-span-7 will-animate scroll-reveal reveal">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[0.65rem] md:text-xs font-bold uppercase tracking-[0.2em] text-medical-teal mb-8">
                  <ShieldCheck size={14} />
                  Patient First Policy
                </span>
                <h2 className="text-4xl md:text-6xl text-white font-bold leading-[1.1] mb-8 tracking-tight">
                  Care Beyond Recovery. <br />
                  <span className="text-medical-teal">Pricing Beyond Doubt.</span>
                </h2>
                <p className="text-slate-300 text-lg mb-12 leading-relaxed font-normal max-w-xl">
                  Healing Hands Physiotherapy is built on the foundation of trust. We believe medical care should be transparent, accessible, and focused entirely on the patient's well-being.
                </p>

                <div className="grid sm:grid-cols-2 gap-8 mb-12">
                  {[
                    { title: "No Hidden Costs", icon: Wallet, desc: "Clear, upfront pricing with zero hidden charges." },
                    { title: "Session-wise Billing", icon: Activity, desc: "Pay per session. No forced long-term packages." },
                    { title: "Instant Booking", icon: Zap, desc: "Skip the queue with our real-time scheduling." },
                    { title: "Expert Diagnosis", icon: Stethoscope, desc: "Detailed assessment by senior specialists." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 group/item">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover/item:bg-medical-teal/20 group-hover/item:border-medical-teal/30 transition-all duration-500">
                        <item.icon size={22} className="text-medical-teal" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1 tracking-tight">{item.title}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 will-animate scroll-reveal reveal">
                <div className="relative p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden group/cta">
                  <div className="absolute inset-0 bg-gradient-to-br from-medical-teal/5 to-transparent opacity-0 group-hover/cta:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 rounded-3xl bg-medical-teal flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-medical-teal/30 rotate-3 group-hover/cta:rotate-6 transition-transform">
                      <Phone size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Need Immediate Help?</h3>
                    <p className="text-slate-400 mb-10 text-sm">Our patient care coordinators are available to assist you with scheduling and recovery advice.</p>

                    <div className="space-y-4">
                      <Link
                        href="/contact"
                        className="w-full py-5 rounded-2xl bg-white text-medical-blue font-bold text-sm uppercase tracking-widest hover:bg-medical-teal hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl"
                      >
                        Book Your Session
                        <ArrowRight size={18} />
                      </Link>
                      <Link
                        href="tel:+916378062237"
                        className="w-full py-5 rounded-2xl bg-white/10 text-white border border-white/10 font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-3"
                      >
                        <Phone size={18} className="text-medical-teal" />
                        6378-062237
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
