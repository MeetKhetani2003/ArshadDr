"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Video, Globe, ShieldCheck, ArrowRight, 
  CheckCircle2, Phone, Zap, Monitor 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OnlineConsultationPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-medical-blue text-white">
        <div className="absolute inset-0 bg-[url('/mesh.png')] opacity-10" />
        <div className="max-site relative z-10 px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-medical-teal animate-pulse" />
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white">Global Tele-Rehab</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-light mb-8 leading-[1.1] tracking-tight text-white">
                Expert Guidance, <br />
                <span className="text-medical-teal font-medium">Virtually Anywhere.</span>
              </h1>
              <p className="text-white/60 text-lg mb-10 leading-relaxed font-normal max-w-xl">
                Distance is no longer a barrier to recovery. Consult our senior physiotherapists 
                from the comfort of your home via high-definition video consultations.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/contact" className="btn-modern bg-medical-teal text-white hover:bg-white hover:text-medical-blue transition-all px-8 py-4 rounded-xl font-medium shadow-xl">
                  Book Video Call <ArrowRight size={18} />
                </Link>
                <a href="tel:6378062237" className="text-white/80 flex items-center gap-2 hover:text-white transition-colors">
                  <Phone size={18} /> 6378-062237
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl relative z-10 border-4 border-white/10">
                <Image 
                  src="/doctor/doc2.jpg" 
                  alt="Online Consultation" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-medical-blue/20 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 animate-pulse">
                    <Video size={32} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="section-padding bg-white">
        <div className="max-site px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-light text-medical-blue mb-6">How Online Physio Works?</h2>
            <p className="text-slate-500 font-normal">Three simple steps to connect with our experts and start your guided recovery journey.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", t: "Book Appointment", d: "Choose a time slot that works for you through our portal or WhatsApp.", i: Monitor },
              { step: "02", t: "Connect via Video", d: "Join a secure video call where our therapist assesses your condition.", i: Video },
              { step: "03", t: "Guided Recovery", d: "Receive a personalized exercise plan and real-time guidance.", i: Zap }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-medical-surface flex items-center justify-center text-medical-teal mx-auto mb-8 relative">
                  <item.i size={24} />
                  <span className="absolute -top-2 -right-2 bg-medical-blue text-white text-[0.6rem] font-bold w-6 h-6 rounded-full flex items-center justify-center">{item.step}</span>
                </div>
                <h4 className="text-xl font-medium text-medical-blue mb-4">{item.t}</h4>
                <p className="text-slate-500 text-sm font-normal leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
