"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Home, Clock, ShieldCheck, ArrowRight, 
  CheckCircle2, Phone, MapPin, Users 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomeVisitPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-medical-surface">
        <div className="absolute inset-0 bg-mesh opacity-40" />
        <div className="max-site relative z-10 px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 mb-8">
                <div className="w-2 h-2 rounded-full bg-medical-teal animate-pulse" />
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-medical-blue">Convenience & Care</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-light text-medical-blue mb-8 leading-[1.1] tracking-tight">
                Physiotherapy at <br />
                <span className="text-medical-teal font-medium">Your Doorstep.</span>
              </h1>
              <p className="text-slate-500 text-lg mb-10 leading-relaxed font-normal max-w-xl">
                Expert recovery shouldn't require painful travel. Our senior physiotherapists bring 
                advanced equipment and personalized care to your home in Jodhpur.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/contact" className="btn-modern btn-primary hover-glow">
                  Book Home Session <ArrowRight size={18} />
                </Link>
                <a href="tel:6378062237" className="btn-modern btn-outline">
                  Call for Enquiry <Phone size={18} />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <Image 
                  src="/doctor/doc1.jpg" 
                  alt="Home Physiotherapy" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 glass-panel p-6 rounded-2xl z-20 flex items-center gap-4 animate-float">
                <div className="w-12 h-12 rounded-full bg-medical-teal/10 flex items-center justify-center text-medical-teal">
                  <Home size={24} />
                </div>
                <div>
                  <p className="text-xl font-light text-medical-blue leading-none mb-1">Recovery at Home</p>
                  <p className="text-[0.6rem] uppercase tracking-widest text-slate-400 font-medium">Safe & Convenient</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="max-site px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-light text-medical-blue mb-6">Why Choose Home Visits?</h2>
            <p className="text-slate-500 font-normal">Dedicated care tailored to your home environment, ensuring maximum comfort and effective recovery.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: "No Travel Pain", d: "Avoid the stress and physical strain of commuting to a clinic.", i: MapPin },
              { t: "Personalized Environment", d: "Exercises designed based on your home setup.", i: Home },
              { t: "Family Involvement", d: "Easier for family members to stay informed and involved.", i: Users },
              { t: "Flexible Scheduling", d: "Book sessions that fit perfectly into your daily routine.", i: Clock },
              { t: "Senior Specialized", i: ShieldCheck, d: "Ideal for elderly patients and post-surgery rehab." },
              { t: "Safety First", i: ShieldCheck, d: "Reduced exposure to external clinical environments." }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-medical-surface border border-slate-100 hover:border-medical-teal/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-medical-teal mb-6 shadow-sm">
                  <item.i size={20} />
                </div>
                <h4 className="text-lg font-medium text-medical-blue mb-3">{item.t}</h4>
                <p className="text-slate-500 text-sm font-normal leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding pt-0">
        <div className="max-site px-6">
          <div className="bg-medical-blue rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-medical-teal/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-light text-white mb-8">Start Your Recovery Journey Today</h2>
              <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto font-normal">
                Our team is ready to provide expert clinical care in the comfort of your home. 
                Available across all major areas in Jodhpur.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/contact" className="btn-modern btn-primary bg-white text-medical-blue hover:bg-medical-teal hover:text-white px-12 py-5 text-lg font-medium">
                  Schedule Home Visit
                </Link>
                <a href="tel:6378062237" className="text-white flex items-center gap-2 text-lg font-light hover:text-medical-teal transition-colors">
                  <Phone size={20} /> 6378-062237
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
