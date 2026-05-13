"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { teamMembers } from "@/data/team";
import { motion } from "framer-motion";
import { Users, Award, ShieldCheck, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function TeamPage() {
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
            alt="Our Team"
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
              The Pillars of Care
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
            >
              Meet Our <br />
              Medical Team.
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-slate-200 text-lg md:text-xl max-w-2xl leading-relaxed font-normal opacity-90"
            >
              Expert physiotherapists, nurses, and technicians working together 
              to provide the highest standard of personalized rehabilitation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== TEAM GRID ===== */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="max-site relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="aspect-[4/5] relative rounded-[2.5rem] overflow-hidden mb-6 bg-slate-100 shadow-xl border border-slate-100">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                    <Link href={`/doctor/${m.slug}`} className="btn-modern bg-white text-medical-blue text-xs py-3 w-full text-center">
                      View Profile
                    </Link>
                  </div>
                </div>

                <div className="px-4">
                  <h3 className="text-2xl font-bold text-medical-blue mb-1">{m.name}</h3>
                  <p className="text-medical-teal font-bold uppercase tracking-widest text-[0.65rem] mb-4">{m.role}</p>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                    {m.experience || "Expert in evidence-based clinical rehabilitation and patient care."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
