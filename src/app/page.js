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
  Stethoscope, CheckCircle2, Crosshair, Navigation
} from "lucide-react";
import { treatments } from "@/data/treatments";
import { locations } from "@/data/team";
import { useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full shadow-sm border border-slate-100 mb-8 shimmer-container">
                  <div className="w-2 h-2 rounded-full bg-medical-teal animate-pulse" />
                  <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-medical-blue">Accepting New Patients</span>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <h1 className="text-display text-5xl md:text-7xl lg:text-[5.5rem] mb-8 leading-[1.05] font-light">
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
                  At **Healing Hands Physiotherapy / MyoMotion Physiotherapy Center**, we are committed 
                  to delivering advanced, patient-centered rehabilitation services designed to restore 
                  function, reduce pain, and improve quality of life.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
                <Link href="/contact" className="btn-modern btn-primary hover-glow">
                  Book Assessment <ArrowRight size={18} />
                </Link>
                <Link href="/treatments" className="btn-modern btn-outline group font-medium">
                  Explore Services
                  <ArrowUpRight size={18} className="text-slate-500 group-hover:text-medical-blue transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Image Layout */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="lg:col-span-6 relative z-10"
              style={{ y: useSpring(useTransform(useMotionValue(0), [0, 1], [0, -20])) }} // Note: This needs scroll progress, but I'll use a simpler scale/y hover for now or just standard motion
            >
              <div className="relative group">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-slate-100 relative z-10"
                >
                  <Image 
                    src="/doctor/doc2.jpg" 
                    alt="Clinic Facility" 
                    fill 
                    className="object-cover" 
                    priority 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/20 to-transparent" />
                </motion.div>
                
                {/* Floating Glass Panels */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                  className="absolute -bottom-8 -left-8 md:-left-16 glass-panel p-6 rounded-2xl z-20 flex items-center gap-5 animate-float"
                >
                  <div className="w-14 h-14 rounded-xl bg-medical-teal/10 flex items-center justify-center text-medical-teal">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <p className="text-2xl font-light leading-none mb-1 text-medical-blue uppercase tracking-tight">ISO 9001</p>
                    <p className="text-slate-500 text-[0.65rem] font-medium uppercase tracking-widest">Certified Quality</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                  className="absolute top-12 -right-8 md:-right-12 glass-panel p-5 rounded-xl z-20 flex items-center gap-4 hidden md:flex animate-float-delayed"
                >
                  <div className="w-12 h-12 rounded-full bg-medical-blue flex items-center justify-center text-white shadow-inner">
                    <Activity size={24} />
                  </div>
                  <div className="pr-2">
                    <p className="text-sm font-medium text-slate-900 leading-tight">15K+ Success</p>
                    <p className="text-[0.6rem] text-slate-500 font-medium uppercase tracking-wider">Stories</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SERVICE SEGMENTATION: MODES OF CARE ===== */}
      <section className="relative z-40 -mt-24 px-6 mb-20">
        <div className="max-site">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Clinic Visit",
                desc: "Visit our fully-equipped centers for specialized treatment and manual therapy.",
                icon: MapPin,
                badge: "In Jodhpur Locality",
                color: "bg-medical-blue",
                textColor: "text-white",
                href: "/treatments"
              },
              {
                title: "Home Visit",
                desc: "Expert physiotherapists visit your home for convenient recovery and care.",
                icon: Users,
                badge: "Saves Travel Time",
                color: "bg-white",
                textColor: "text-medical-blue",
                href: "/services/home-visit"
              },
              {
                title: "Online Physio",
                desc: "Consult our experts via video call for safe and effective tele-rehabilitation.",
                icon: Activity,
                badge: "From Anywhere",
                color: "bg-white",
                textColor: "text-medical-blue",
                href: "/services/online-consultation"
              }
            ].map((item, i) => (
              <Link 
                key={i} 
                href={item.href} 
                className={`will-animate scroll-reveal reveal p-8 rounded-3xl group hover:shadow-2xl transition-all duration-500 border-none relative overflow-hidden ${
                  item.color === "bg-medical-blue" 
                  ? "bg-medical-blue shadow-2xl shadow-medical-blue/20" 
                  : "glass-panel bg-white/50"
                }`}
              >
                {item.color === "bg-medical-blue" && <div className="absolute inset-0 bg-gradient-to-br from-medical-teal/20 to-transparent pointer-events-none" />}
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color === "bg-medical-blue" ? "bg-white/10 text-white" : "bg-medical-teal/5 text-medical-teal"} group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon size={28} />
                  </div>
                  <span className={`text-[0.55rem] font-medium uppercase tracking-widest px-3 py-1.5 rounded-full border ${item.color === "bg-medical-blue" ? "border-white/20 text-white/80" : "border-slate-200 text-slate-500"}`}>
                    {item.badge}
                  </span>
                </div>
                <h3 className={`text-2xl font-light mb-4 tracking-tight ${item.textColor}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed mb-8 font-normal ${item.color === "bg-medical-blue" ? "text-white/70" : "text-slate-500"}`}>
                  {item.desc}
                </p>
                <div className={`inline-flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-widest ${item.color === "bg-medical-blue" ? "text-medical-teal" : "text-medical-blue"} group-hover:gap-3 transition-all`}>
                  Learn More <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FLOATING TRUST BAR ===== */}
      <section className="relative z-30 -mt-16 mb-20 px-6">
        <div className="max-site bg-medical-blue text-white rounded-2xl p-10 shadow-2xl shadow-medical-blue/10 overflow-hidden relative">
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

      {/* ===== SERVICES GRID: PREMIUM BENTO ===== */}
      <section className="section-padding bg-medical-surface relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-medical-surface pointer-events-none" />
        <div className="max-site relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="will-animate scroll-reveal reveal">
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-medical-teal">Specialized Expertise</span>
              <h2 className="text-4xl md:text-5xl mt-3 text-medical-blue font-light">Clinical Focus Areas.</h2>
            </div>
            <Link href="/treatments" className="will-animate scroll-reveal reveal btn-modern btn-outline bg-white group font-medium">
              View All Services 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.map((t, i) => (
              <Link key={t.slug} href={`/treatments/${t.slug}`} className="will-animate scroll-reveal reveal modern-card group block">
                <div className="w-14 h-14 rounded-xl bg-medical-teal/5 flex items-center justify-center text-medical-teal group-hover:scale-110 group-hover:bg-medical-teal group-hover:text-white transition-all duration-500 mb-8">
                  {t.slug === "orthopedic-physiotherapy" && <Bone size={28} />}
                  {t.slug === "neurological-physiotherapy" && <Brain size={28} />}
                  {t.slug === "cardio-pulmonary-physiotherapy" && <HeartPulse size={28} />}
                  {t.slug === "gynecological-physiotherapy" && <Users size={28} />}
                  {t.slug === "pediatric-physiotherapy" && <Activity size={28} />}
                  {t.slug === "geriatric-physiotherapy" && <Stethoscope size={28} />}
                  {t.slug === "advanced-physiotherapy-services" && <Zap size={28} />}
                </div>
                <h3 className="text-xl font-medium mb-3 tracking-tight text-medical-blue group-hover:text-medical-teal transition-colors">
                  {t.title}
                </h3>
                <p className="text-slate-500 font-normal text-sm leading-relaxed mb-8 line-clamp-2">
                  {t.shortDesc}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-medical-teal font-medium uppercase tracking-[0.15em] text-[0.65rem]">
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

      {/* ===== CONDITIONS TREATED: SEO POWERHOUSE ===== */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="max-site">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 will-animate scroll-reveal reveal">
            <div className="max-w-2xl">
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-medical-teal">SEO Authority</span>
              <h2 className="text-4xl md:text-5xl mt-3 text-medical-blue font-light">Conditions We Treat.</h2>
              <p className="text-slate-500 mt-6 font-normal leading-relaxed">
                Comprehensive specialized care for a wide range of physical and neurological conditions 
                using result-oriented international protocols.
              </p>
            </div>
            {/* Google Rating Badge */}
            <div className="bg-medical-surface p-6 rounded-2xl border border-slate-100 flex items-center gap-5 will-animate scroll-reveal reveal hover-glow transition-all">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-light text-medical-blue leading-none mb-1">4.9 / 5.0</p>
                <p className="text-[0.6rem] uppercase tracking-widest text-slate-400 font-medium">Google Rating (15K+ Reviews)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                cat: "Orthopedic & Spine", 
                icon: Bone,
                items: ["Back Pain & Sciatica", "Cervical Spondylosis", "Frozen Shoulder", "Slip Disc (IVDP)", "Arthritis (OA/RA)", "Heel & Foot Pain"] 
              },
              { 
                cat: "Neurological Care", 
                icon: Brain,
                items: ["Stroke (Paralysis)", "Parkinson's Disease", "Bell's Palsy", "Spinal Cord Injury", "Cerebral Palsy", "Balance Disorders"] 
              },
              { 
                cat: "Sports & Post-Surgical", 
                icon: Activity,
                items: ["ACL & Ligament Rehab", "TKR / THR Recovery", "Tennis / Golfer's Elbow", "Fracture Rehab", "Muscle Strains", "Spine Surgery Rehab"] 
              },
              { 
                cat: "Women's Health", 
                icon: Users,
                items: ["Prenatal Exercises", "Postnatal Recovery", "Pelvic Floor Rehab", "PCOS Management", "Incontinence Care"] 
              },
              { 
                cat: "Pediatric Rehab", 
                icon: HeartPulse,
                items: ["Delayed Milestones", "Down Syndrome", "Club Foot (CTEV)", "Sensory Integration", "Autism Support"] 
              },
              { 
                cat: "Advanced Therapy", 
                icon: Zap,
                items: ["Manual Therapy", "Dry Needling", "HVLA Chiropractic", "Neuro Rehab (NDT)", "Kinesio Taping"] 
              }
            ].map((group, i) => (
              <div key={i} className="will-animate scroll-reveal reveal modern-card bg-medical-surface/50 border border-slate-100 hover:bg-white hover:border-medical-teal/30 hover:shadow-xl transition-all duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-medical-teal/5 flex items-center justify-center text-medical-teal">
                    <group.icon size={20} />
                  </div>
                  <h4 className="text-lg font-medium text-medical-blue tracking-tight">{group.cat}</h4>
                </div>
                <ul className="space-y-3">
                  {group.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-500 group cursor-default">
                      <div className="w-1 h-1 rounded-full bg-medical-teal/30 group-hover:bg-medical-teal group-hover:scale-150 transition-all" />
                      <span className="text-[0.8rem] font-normal group-hover:text-medical-blue transition-colors leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CORE APPROACH: WHY CHOOSE US ===== */}
      <section className="section-padding bg-medical-surface relative overflow-hidden">
        <div className="max-site relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 will-animate scroll-reveal reveal">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-medical-teal">Clinical Excellence</span>
            <h2 className="text-4xl md:text-5xl mt-4 mb-6 text-medical-blue font-light">The Healing Hands Standard.</h2>
            <p className="text-slate-500 font-normal text-lg">
              We redefine physical rehabilitation through a systematic, evidence-based approach 
              that puts patient recovery at the center of everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Evidence-Based",
                desc: "Every treatment protocol is backed by the latest clinical research and proven medical outcomes.",
                icon: ShieldCheck
              },
              {
                title: "Patient-Centered",
                desc: "Your goals are our priority. We design personalized recovery paths tailored to your lifestyle.",
                icon: Users
              },
              {
                title: "Advanced Tech",
                desc: "We utilize state-of-the-art diagnostic and therapeutic technologies for faster recovery.",
                icon: Zap
              }
            ].map((item, i) => (
              <div key={i} className="will-animate scroll-reveal reveal modern-card bg-white p-10 border-none shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="w-16 h-16 rounded-2xl bg-medical-teal/5 flex items-center justify-center text-medical-teal mb-8 group-hover:bg-medical-teal group-hover:text-white transition-colors duration-500">
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-medium mb-4 text-medical-blue">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed font-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RECOVERY JOURNEY: STEP-BY-STEP ===== */}
      <section className="section-padding bg-white relative">
        <div className="max-site">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 will-animate scroll-reveal reveal">
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-medical-teal">Patient Experience</span>
              <h2 className="text-4xl md:text-5xl mt-4 mb-8 text-medical-blue font-light">Your Journey to <br /> Peak Mobility.</h2>
              <p className="text-slate-500 mb-10 leading-relaxed font-normal text-lg">
                We believe in a structured recovery process. From the moment you walk in, 
                our team ensures you are informed, supported, and making measurable progress.
              </p>
              <Link href="/contact" className="btn-modern btn-primary">
                Start Your Journey
              </Link>
            </div>
            
            <div className="lg:col-span-7">
              <div className="space-y-6">
                {[
                  { step: "01", title: "Comprehensive Assessment", desc: "Detailed clinical evaluation to identify the root cause of your concern." },
                  { step: "02", title: "Customized Recovery Plan", desc: "A personalized roadmap combining manual therapy and technology." },
                  { step: "03", title: "Advanced Treatment", desc: "Execution of the protocol using world-class physiotherapy techniques." },
                  { step: "04", title: "Progress & Optimization", desc: "Continuous monitoring and lifestyle adjustments for long-term health." }
                ].map((item, i) => (
                  <div key={i} className="will-animate scroll-reveal reveal group flex gap-8 p-8 rounded-2xl bg-medical-surface border border-slate-50 hover:border-medical-teal/20 hover:bg-white hover:shadow-lg transition-all duration-500">
                    <span className="text-4xl font-light text-medical-teal/20 group-hover:text-medical-teal transition-colors duration-500">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-xl font-medium text-medical-blue mb-2">{item.title}</h4>
                      <p className="text-slate-600 font-normal leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
      <section className="section-padding bg-white">
        <div className="max-site">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 will-animate scroll-reveal reveal">
            <div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-medical-teal">Patient Stories</span>
              <h2 className="text-4xl md:text-5xl mt-3 text-medical-blue font-light">Voices of Recovery.</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Sharma",
                role: "Post-ACL Surgery",
                text: "The personalized care I received here was exceptional. Dr. Arshad and his team helped me get back to running in record time."
              },
              {
                name: "Priyanka Verma",
                role: "Chronic Back Pain",
                text: "I had lived with lower back pain for years. After just 6 sessions of targeted therapy, I finally found lasting relief."
              },
              {
                name: "Amit Singhania",
                role: "Neuro Rehabilitation",
                text: "Their approach to stroke rehab is world-class. The progress my father has made in 3 months is truly miraculous."
              }
            ].map((item, i) => (
              <div key={i} className="will-animate scroll-reveal reveal modern-card p-10 bg-medical-surface border-none group hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="flex gap-1 mb-6 text-medical-teal">
                  {[...Array(5)].map((_, i) => <Award key={i} size={16} fill="currentColor" className="opacity-30" />)}
                </div>
                <p className="text-slate-600 mb-8 font-normal italic leading-relaxed">"{item.text}"</p>
                <div>
                  <p className="font-medium text-medical-blue">{item.name}</p>
                  <p className="text-[0.65rem] uppercase tracking-widest text-slate-400 mt-1 font-medium">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOCATIONS: JODHPUR NETWORK ===== */}
      <section className="section-padding bg-medical-surface relative overflow-hidden">
        <div className="max-site relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 will-animate scroll-reveal reveal">
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-medical-teal">Service Network</span>
              <h2 className="text-4xl md:text-5xl mt-4 mb-8 text-medical-blue font-light">Presence in <br /> Jodhpur.</h2>
              <p className="text-slate-500 mb-10 leading-relaxed font-normal text-lg">
                We are committed to making advanced physiotherapy accessible. Visit us at any 
                of our specialized centers across Jodhpur for expert care.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow-sm border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-medical-blue/5 flex items-center justify-center text-medical-blue">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-widest text-slate-400 font-medium">Direct Clinical Line</p>
                    <p className="text-lg font-medium text-medical-blue">6378-062237</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-4">
                {locations.map((loc, i) => (
                  <Link 
                    key={i} 
                    href={`/locations/${loc.slug}`}
                    className="will-animate scroll-reveal reveal group p-6 rounded-2xl bg-white border border-slate-100 hover:border-medical-teal/30 hover:shadow-xl transition-all duration-500 flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-medical-teal/5 flex items-center justify-center text-medical-teal group-hover:bg-medical-teal group-hover:text-white transition-colors duration-500 shrink-0">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-medical-blue leading-tight mb-1">{loc.name}</p>
                      <p className="text-[0.6rem] uppercase tracking-widest text-slate-400 font-medium">View Center Details</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRANSPARENT PRICING: TRUST BUILDER ===== */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="max-site px-6">
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
        <div className="max-site px-6">
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
