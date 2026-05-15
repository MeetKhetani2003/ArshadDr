"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Bone, Brain, HeartPulse, Flower2, Baby, PersonStanding, Zap,
  Activity, ArrowRight, Phone, CheckCircle2, ChevronRight,
  Home, ArrowUpRight, Dumbbell, Laptop, Users, Stethoscope
} from "lucide-react";
import Image from "next/image";
import { useBooking } from "@/components/BookingContext";

gsap.registerPlugin(ScrollTrigger);

const treatmentIcons = {
  "orthopedic-physiotherapy": Bone,
  "neurological-physiotherapy": Brain,
  "pediatric-physiotherapy": Baby,
  "sports-physiotherapy": Activity,
  "geriatric-physiotherapy": HeartPulse,
  "cardiopulmonary-physiotherapy": Activity,
  "womens-health-physiotherapy": Users,
  "pain-management-physiotherapy": Zap,
  "post-surgical-rehabilitation": Stethoscope,
  "manual-therapy-advanced-rehab": Users,
  "vestibular-balance-rehabilitation": ArrowUpRight,
  "occupational-ergonomic-rehabilitation": Laptop,
  "fitness-lifestyle-rehabilitation": Dumbbell,
};

export default function TreatmentDetailClient({ treatment, related }) {
  const Icon = treatmentIcons[treatment.slug] || Activity;
  const { openBookingModal } = useBooking();
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
    <main ref={containerRef} className="bg-white min-h-screen selection:bg-medical-teal selection:text-white">

      {/* ===== CINEMATIC HERO ===== */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={treatment.image || "/treatments_hero_v2.png"}
            alt={treatment.title}
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-blue/95 via-medical-blue/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/40 to-transparent z-10" />
        </div>

        <div className="max-site relative z-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
          >
            {/* Breadcrumbs */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-8 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/60">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={10} />
              <Link href="/treatments" className="hover:text-white transition-colors">Treatments</Link>
              <ChevronRight size={10} />
              <span className="text-medical-teal">{treatment.title}</span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-medical-teal shadow-2xl">
                <Icon size={32} />
              </div>
              <div className="px-4 py-1.5 rounded-full bg-medical-teal/20 border border-medical-teal/30 backdrop-blur-sm">
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-medical-teal">Clinical Protocol</span>
              </div>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-bold text-white tracking-tight leading-[1.05] max-w-4xl">
              {treatment.title}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 1: ABOUT (Left Image, Right Content) ===== */}
      <section className="py-16 bg-white">
        <div className="max-site">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src={treatment.image || "/clinic.png"}
                alt="Treatment Context"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/40 to-transparent" />
            </motion.div>

            {/* Content Side */}
            <div className="space-y-6">
              <div className="will-animate scroll-reveal reveal">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-medical-teal block mb-3">The Approach</span>
                <h2 className="text-3xl md:text-4xl font-bold text-medical-blue mb-4 tracking-tight">Understanding {treatment.title}.</h2>
                <p className="text-slate-500 text-lg leading-relaxed font-normal">
                  {treatment.fullDescription}
                </p>
              </div>

              <div className="will-animate scroll-reveal reveal">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-medical-teal/10 flex items-center justify-center text-medical-teal shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-medical-blue mb-1">Evidence-Based Care</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">We utilize globally recognized protocols and the latest clinical research for every patient.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: PROTOCOL (Left Content, Right Image) ===== */}
      <section className="py-16 bg-slate-50">
        <div className="max-site">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="order-2 lg:order-1 space-y-10">
              <div className="will-animate scroll-reveal reveal">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-medical-blue block mb-3">Clinical Protocol</span>
                <h2 className="text-3xl md:text-4xl font-bold text-medical-blue mb-6 tracking-tight">Our Specialized <br /> Treatment Matrix.</h2>

                <div className="grid gap-4">
                  {treatment.techniques.slice(0, 4).map((tech, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm group hover:border-medical-teal transition-all">
                      <div className="w-9 h-9 rounded-lg bg-medical-blue/5 flex items-center justify-center text-medical-blue group-hover:bg-medical-teal group-hover:text-white transition-all">
                        <Zap size={18} />
                      </div>
                      <span className="text-medical-blue font-bold tracking-tight text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="will-animate scroll-reveal reveal">
                <p className="text-slate-500 text-base mb-6">
                  Our clinicians are trained in multiple manual therapy schools, ensuring a multi-dimensional approach to your recovery.
                </p>
                <button 
                  onClick={() => openBookingModal({ treatment: treatment.title })}
                  className="btn-modern btn-primary inline-flex py-3 px-8 text-sm"
                >
                  Consult a Specialist
                </button>
              </div>
            </div>

            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/treatment_process_v2.png"
                alt="Clinical Process"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/40 to-transparent" />
              {/* Floating Stat Badge */}
              <div className="absolute bottom-6 right-6 p-5 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 max-w-[160px]">
                <p className="text-2xl font-bold text-medical-blue mb-0.5">10k+</p>
                <p className="text-[0.55rem] font-bold text-slate-500 uppercase tracking-widest leading-tight">Recoveries handled in this domain</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== RESTORED CONTENT GRID (Conditions & Techniques) ===== */}
      <section className="py-20 bg-white relative z-10">
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
                <button 
                  onClick={() => openBookingModal({ treatment: treatment.title })}
                  className="btn-modern bg-white text-medical-blue hover:bg-slate-50 w-full relative z-10 font-bold py-4 rounded-xl flex items-center justify-center gap-2"
                >
                  <Phone size={16} /> Book Appointment
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== RELATED TREATMENTS ===== */}
      {related.length > 0 && (
        <section className="section-padding bg-slate-50 border-t border-slate-100">
          <div className="max-site">
            <div className="will-animate scroll-reveal reveal flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
              <div>
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-medical-teal">Directory</span>
                <h2 className="text-4xl font-bold text-medical-blue mt-2 tracking-tight">Other Specialties.</h2>
              </div>
              <Link href="/treatments" className="text-medical-teal font-bold uppercase tracking-widest text-xs hover:underline">
                View All Treatments
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {related.map((t) => {
                const RelIcon = treatmentIcons[t.slug] || Activity;
                return (
                  <motion.div
                    key={t.slug}
                    whileHover={{ y: -10 }}
                    className="will-animate scroll-reveal reveal"
                  >
                    <Link
                      href={`/treatments/${t.slug}`}
                      className="group block bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] transition-all duration-500 border border-slate-100/50 hover:border-medical-teal/30 h-full flex flex-col"
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={t.image || "/placeholder.png"}
                          alt={t.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                        <div className="absolute top-4 right-4 z-20">
                          <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-medical-teal group-hover:bg-medical-teal group-hover:text-white group-hover:rotate-[360deg] transition-all duration-700">
                            <RelIcon size={20} />
                          </div>
                        </div>

                        <div className="absolute bottom-4 left-6 z-20">
                          <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-medical-teal transition-colors leading-tight">
                            {t.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <p className="text-slate-500 font-normal text-xs leading-relaxed mb-6 line-clamp-2">
                          {t.shortDesc || "Explore our comprehensive clinical approach to this specialized area of physiotherapy."}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-50">
                          <span className="text-medical-teal font-bold uppercase tracking-[0.15em] text-[0.55rem] group-hover:tracking-[0.25em] transition-all duration-500">
                            Explore Protocol
                          </span>
                          <div className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-medical-teal group-hover:text-medical-teal group-hover:bg-medical-teal/5 transition-all">
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
