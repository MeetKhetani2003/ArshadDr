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
  ShieldCheck, Users, MapPin, Target,
  HeartPulse, Activity, Zap
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

  const drArshad = teamMembers.find(m => m.name === "Dr. Arshad Solanki");

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
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-medical-blue">The Clinical Journey</span>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h1 className="text-display text-5xl md:text-7xl lg:text-[5.5rem] mt-2 font-light">
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
              At **Healing Hands Physiotherapy / MyoMotion Physiotherapy Center**, we are committed to 
              delivering advanced, patient-centered rehabilitation services designed to restore function, 
              reduce pain, and improve quality of life.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== WHO WE ARE & SPECIALIZATION ===== */}
      <section className="section-padding bg-white relative">
        <div className="max-site">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            <div className="will-animate scroll-reveal reveal">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-medical-teal/10 flex items-center justify-center text-medical-teal">
                  <Users size={20} />
                </div>
                <h2 className="text-2xl font-light text-medical-blue">Who We Are</h2>
              </div>
              <p className="text-slate-500 leading-relaxed font-normal">
                At Healing Hands Physiotherapy / MyoMotion Physiotherapy Center, we are committed to 
                delivering advanced, patient-centered rehabilitation services designed to restore function, 
                reduce pain, and improve quality of life. Our mission is to combine clinical excellence 
                with compassionate care to ensure every patient achieves their optimal health goals.
              </p>
            </div>
            <div className="will-animate scroll-reveal reveal">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-medical-blue/5 flex items-center justify-center text-medical-blue">
                  <Target size={20} />
                </div>
                <h2 className="text-2xl font-light text-medical-blue">Our Specialization</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Neuro Rehab", icon: Activity },
                  { title: "Ortho Rehab", icon: Zap },
                  { title: "Pediatric Rehab", icon: HeartPulse },
                  { title: "Women’s Health (Gynae)", icon: Users }
                ].map((spec, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-medical-surface border border-slate-100">
                    <spec.icon size={16} className="text-medical-teal" />
                    <span className="text-sm font-medium text-medical-blue">{spec.title}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-500 mt-6 leading-relaxed font-normal text-sm">
                Our approach combines manual therapy, advanced technology, and personalized exercise programs to ensure optimal recovery outcomes across all specialties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOUNDER JOURNEY ===== */}
      <section className="section-padding bg-medical-surface relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-medical-surface pointer-events-none" />
        <div className="max-site grid lg:grid-cols-12 gap-16 items-start relative z-10">
          
          <div className="lg:col-span-5 will-animate scroll-reveal reveal sticky top-32">
            <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-slate-100 border-4 border-white">
              <Image 
                src="/doctor/doc1.jpg" 
                alt="Dr. Arshad Solanki" 
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
                  <p className="font-medium text-medical-blue">Dr. Arshad Solanki</p>
                  <p className="text-[0.65rem] uppercase tracking-widest text-slate-500 font-medium">Founder & Chief PT</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 lg:pl-10">
            <h2 className="text-4xl md:text-5xl mb-8 will-animate scroll-reveal reveal text-medical-blue font-light">
              The Founder's Story.
            </h2>
            
            <div className="space-y-8 text-slate-500 leading-relaxed font-normal text-lg will-animate scroll-reveal reveal">
              <p>
                Dr. Arshad Solanki began his journey in physiotherapy with a clear vision—to bring advanced, 
                evidence-based rehabilitation services to patients with a focus on long-term recovery, 
                not just temporary relief.
              </p>

              <div className="grid sm:grid-cols-2 gap-8 py-8 border-y border-slate-100">
                <div>
                  <h4 className="text-medical-blue font-medium mb-3 flex items-center gap-2">
                    <GraduationCap size={18} className="text-medical-teal" />
                    Early Foundation
                  </h4>
                  <p className="text-sm">
                    Completed BPT in 2013 followed by clinical exposure at Apollo Hospital, Gandhinagar, 
                    training under renowned physiotherapist Dr. K.M. Annamalai.
                  </p>
                </div>
                <div>
                  <h4 className="text-medical-blue font-medium mb-3 flex items-center gap-2">
                    <Stethoscope size={18} className="text-medical-teal" />
                    Specialized Training
                  </h4>
                  <ul className="text-sm space-y-1 text-slate-600">
                    <li>• Certified COMT (Capri Institute)</li>
                    <li>• NDT Certification</li>
                    <li>• Dry Needling & Kinesio Taping</li>
                    <li>• Advanced HVLA Chiropractic</li>
                  </ul>
                </div>
              </div>

              <p>
                Dr. Arshad started his professional practice at **Yuvraj Shivraj Singh Neuro Rehab Center**, Jodhpur, 
                a trust-run institution managed by the royal family of Jodhpur, where he gained extensive 
                experience in neurological rehabilitation.
              </p>

              <div className="p-8 rounded-2xl bg-white shadow-sm border border-slate-100">
                <h4 className="text-medical-blue font-medium mb-3 flex items-center gap-2">
                  <Activity size={18} className="text-medical-teal" />
                  Current Association
                </h4>
                <p className="text-sm">
                  Currently associated with **Vasundhara Hospital, Jodhpur**, where he leads a 
                  state-of-the-art physiotherapy department equipped with advanced technologies 
                  and modern rehabilitation protocols.
                </p>
              </div>

              <p className="text-medical-blue italic font-light text-xl">
                "His vision is to build one of the most trusted physiotherapy networks in Rajasthan, 
                combining clinical excellence with compassionate care."
              </p>
            </div>

            <div className="mt-16 will-animate scroll-reveal reveal modern-card bg-white border-none shadow-xl">
              <h3 className="text-xl font-medium tracking-tight mb-4 text-medical-blue flex items-center gap-3">
                <ShieldCheck size={24} className="text-medical-teal" />
                Commitment to Excellence
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
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 will-animate scroll-reveal reveal gap-6">
            <div className="max-w-2xl">
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-medical-teal">Our Team</span>
              <h2 className="text-4xl md:text-5xl mt-4 text-white font-light">Clinical Experts.</h2>
              <p className="text-slate-300 mt-6 font-normal leading-relaxed">
                Our highly qualified and experienced physiotherapy team includes specialists trained in modern 
                techniques and evidence-based practice protocols.
              </p>
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
                    <h4 className="font-medium text-sm mb-1 text-white">{m.name}</h4>
                    <p className="text-medical-teal font-medium uppercase tracking-[0.15em] text-[0.55rem]">{m.role}</p>
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
              <h2 className="text-3xl md:text-4xl mb-3 text-medical-blue font-light">Presence in Jodhpur.</h2>
              <p className="text-slate-500 font-normal">We are actively serving patients across multiple locations:</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex flex-wrap justify-center md:justify-end gap-3 max-w-lg">
                {locations.map((loc, i) => (
                  <Link 
                    key={i} 
                    href={`/locations/${loc.slug}`}
                    className="px-5 py-2.5 bg-white border border-slate-100 rounded-lg text-[0.65rem] font-medium uppercase tracking-widest text-medical-blue hover:border-medical-teal hover:text-medical-teal shadow-sm transition-all"
                  >
                    {loc.name}
                  </Link>
                ))}
              </div>
              <p className="text-[0.65rem] font-medium uppercase tracking-widest text-medical-teal">
                …and expanding to more locations soon.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
