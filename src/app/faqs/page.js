"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/data/faqs";
import { ChevronDown, MessageCircle, ShieldCheck, HelpCircle, PhoneCall, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className={`mb-4 overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? "bg-white border-medical-teal/30 shadow-lg shadow-medical-teal/5" : "bg-slate-50 border-slate-100 hover:border-slate-200"}`}>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className={`text-lg font-bold tracking-tight ${isOpen ? "text-medical-teal" : "text-medical-blue"}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-500 ${isOpen ? "bg-medical-teal text-white rotate-180" : "bg-white text-slate-400"}`}>
          <ChevronDown size={18} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-2">
              <div className="w-full h-px bg-slate-100 mb-6" />
              <p className="text-slate-500 font-normal leading-relaxed text-base">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".scroll-reveal", {
        y: 0, opacity: 1, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: ".scroll-reveal", start: "top 85%" }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-medical-surface min-h-screen selection:bg-medical-teal selection:text-white pb-32">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/clinic_v2.png"
            alt="FAQs Background"
            fill
            className="object-cover scale-105 opacity-20 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-blue via-medical-blue/90 to-transparent z-10" />
        </div>

        <div className="max-site relative z-20 pt-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 mb-8">
                <HelpCircle size={14} className="text-medical-teal" />
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-medical-teal">Support Center</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8">
                Common <br />
                <span className="text-medical-teal">Questions.</span>
              </h1>
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-light">
                Find answers to the most frequently asked questions about physiotherapy, 
                clinical protocols, and what to expect during your recovery journey.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ACCORDION ===== */}
      <section className="relative z-10 -mt-16">
        <div className="max-site">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Sidebar / Categories */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-32 space-y-8">
                <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                  <h3 className="text-xl font-bold text-medical-blue mb-6">Need more help?</h3>
                  <div className="space-y-4">
                    <a href="tel:6378062237" className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-medical-teal hover:text-white transition-all group">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-medical-teal group-hover:bg-white/20 group-hover:text-white transition-all shadow-sm">
                        <PhoneCall size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.6rem] font-bold uppercase tracking-widest opacity-60">Call Us</span>
                        <span className="font-bold text-sm">6378062237</span>
                      </div>
                    </a>
                    <Link href="/contact" className="flex items-center gap-4 p-4 rounded-xl bg-medical-blue text-white hover:bg-medical-teal transition-all group">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-medical-teal group-hover:bg-white/20 group-hover:text-white transition-all">
                        <MessageCircle size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.6rem] font-bold uppercase tracking-widest opacity-60">Book Visit</span>
                        <span className="font-bold text-sm">Consultation</span>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="p-8 bg-medical-teal/5 rounded-3xl border border-medical-teal/10">
                  <ShieldCheck className="text-medical-teal mb-4" size={32} />
                  <h4 className="text-medical-blue font-bold mb-2 text-lg">Clinical Standards</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Every treatment protocol at Healing Hands is backed by evidence-based clinical research.
                  </p>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="lg:col-span-8 space-y-16">
              {faqs.map((category, catIdx) => (
                <div key={catIdx} className="will-animate scroll-reveal reveal opacity-0 translate-y-10">
                  <h2 className="text-2xl font-bold text-medical-blue mb-8 flex items-center gap-4">
                    <span className="w-10 h-1 h-1 bg-medical-teal rounded-full" />
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIdx) => {
                      const uniqueId = `${catIdx}-${faqIdx}`;
                      return (
                        <FAQItem
                          key={uniqueId}
                          question={faq.q}
                          answer={faq.a}
                          isOpen={openIndex === uniqueId}
                          onClick={() => setOpenIndex(openIndex === uniqueId ? null : uniqueId)}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="section-padding pt-32">
        <div className="max-site text-center">
          <div className="will-animate scroll-reveal reveal max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-medical-blue mb-6">Didn&apos;t find your answer?</h2>
            <p className="text-slate-500 mb-10 text-lg">
              Our clinical team is ready to help you with a personalized assessment and recovery roadmap.
            </p>
            <Link href="/contact" className="btn-modern bg-medical-blue text-white hover:bg-medical-teal px-12 py-4 rounded-xl inline-flex items-center gap-3">
              Book a Consultation <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
