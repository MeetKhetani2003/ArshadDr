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

export default function FounderPage() {
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
        <div className="absolute inset-0 z-0">
          <Image
            src="/about_hero.png"
            alt="About Founder"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-blue/95 via-medical-blue/80 to-transparent z-10" />
        </div>

        <div className="max-site relative z-20 pt-20">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.span
              variants={itemVariants}
              className="text-sm font-bold uppercase tracking-[0.4em] text-medical-teal block mb-6"
            >
              The Visionary Behind
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
            >
              Our Founder's <br />
              Journey.
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* ===== FOUNDER JOURNEY ===== */}
      <section className="section-padding bg-medical-surface relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-medical-surface pointer-events-none" />
        <div className="max-site grid lg:grid-cols-12 gap-16 items-start relative z-10">

          <div className="lg:col-span-5 will-animate scroll-reveal reveal lg:sticky lg:top-32 mb-12 lg:mb-0">
            <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-slate-100 border-4 border-white">
              <Image
                src="/doctor/doc1.jpg"
                alt="Dr. Asad Solanki"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/30 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="absolute -bottom-6 -right-6 lg:-right-8 glass-panel p-6 rounded-xl hidden md:block shadow-xl border border-white/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-medical-teal rounded-full flex items-center justify-center text-white shadow-lg">
                  <Award size={24} />
                </div>
                <div>
                  <p className="font-medium text-medical-blue">Dr. Asad Solanki</p>
                  <p className="text-[0.65rem] uppercase tracking-widest text-slate-500 font-medium">Founder & Chief PT</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-10">
            <h2 className="text-4xl md:text-5xl mb-8 will-animate scroll-reveal reveal text-medical-blue font-light">
              Healing Hands / MyoMotion.
            </h2>

            <div className="space-y-8 text-slate-500 leading-relaxed font-normal text-lg will-animate scroll-reveal reveal">
              <p>
                Dr. Asad Solanki began his journey in physiotherapy with a clear vision—to bring advanced,
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
                Dr. Asad started his professional practice at **Yuvraj Shivraj Singh Neuro Rehab Center**, Jodhpur,
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
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="section-padding bg-white">
        <div className="max-site">
          <div className="will-animate scroll-reveal reveal modern-card !bg-medical-blue text-white border-none shadow-xl flex flex-col md:flex-row justify-between items-center gap-12 p-12 md:p-20 rounded-[3rem]">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-3xl md:text-5xl mb-6 font-light">Join the journey to <br /> healthy living.</h2>
              <p className="text-slate-300">Experience world-class rehabilitation with Dr. Asad and his team.</p>
            </div>
            <Link href="/contact" className="btn-modern bg-white text-medical-blue hover:bg-medical-teal hover:text-white px-10 py-4 shadow-xl">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
