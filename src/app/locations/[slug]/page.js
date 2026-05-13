"use client";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { locations } from "@/data/team";
import { motion } from "framer-motion";
import { 
  MapPin, Phone, ArrowRight, CheckCircle2, 
  Clock, ShieldCheck, Star, Users, Navigation 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LocationPage({ params }) {
  const { slug } = use(params);
  const location = locations.find(l => l.slug === slug);

  if (!location) return <div>Location not found</div>;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/locations_hero.png"
            alt="Locations Background"
            fill
            className="object-cover scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-blue via-medical-blue/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/40 to-transparent z-10" />
        </div>

        <div className="max-site relative z-20 px-6 pt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-sm border border-white/10 mb-8">
                <div className="w-2 h-2 rounded-full bg-medical-teal animate-pulse" />
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white">Pincode: {location.pincode}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                Best Physiotherapy <br />
                in <span className="text-medical-teal">{location.name}</span>
              </h1>
              <p className="text-slate-200 text-lg mb-10 leading-relaxed font-normal max-w-xl opacity-90">
                {location.description} Located near {location.landmarks.join(" and ")}, our specialized center provides 
                advanced evidence-based care for residents in {location.areas.slice(0, 2).join(", ")}.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/contact" className="px-8 py-4 bg-medical-teal text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-medical-blue transition-all flex items-center gap-3 group">
                  Book Assessment <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:6378062237" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-3">
                  Call Clinic <Phone size={18} />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl relative z-10 border-4 border-white/20">
                <Image 
                  src="/doctor/doc2.jpg" 
                  alt={location.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-2xl z-20 flex items-center gap-4 animate-float border border-white/20 shadow-2xl">
                <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400">
                  <Star size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xl font-bold text-medical-blue leading-none mb-1">4.9/5.0</p>
                  <p className="text-[0.6rem] uppercase tracking-widest text-slate-500 font-medium">Google Rating</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hyper-Local SEO Section: Areas & Landmarks */}
      <section className="section-padding bg-white">
        <div className="max-site px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-8 rounded-3xl bg-medical-surface border border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-medical-teal/10 flex items-center justify-center text-medical-teal mb-6">
                <Navigation size={24} />
              </div>
              <h3 className="text-xl font-medium text-medical-blue mb-4">Areas We Serve</h3>
              <ul className="space-y-3">
                {location.areas.map((area, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-500 text-sm font-normal">
                    <CheckCircle2 size={16} className="text-medical-teal" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-medical-surface border border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-medical-blue/5 flex items-center justify-center text-medical-blue mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-medium text-medical-blue mb-4">Nearby Landmarks</h3>
              <ul className="space-y-3">
                {location.landmarks.map((mark, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-500 text-sm font-normal">
                    <CheckCircle2 size={16} className="text-medical-blue/30" />
                    {mark}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-medical-blue text-white overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-medical-teal/20 to-transparent" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-light mb-4">Transparent Pricing</h3>
                <p className="text-white/70 text-sm mb-6 font-normal leading-relaxed">
                  We believe in high-quality care without hidden costs. Our sessions are competitively priced.
                </p>
                <div className="text-2xl font-light mb-2">Starting ₹500</div>
                <p className="text-[0.6rem] uppercase tracking-widest text-medical-teal font-medium">Initial Assessment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="section-padding bg-white pt-0">
        <div className="max-site px-6">
          <div className="rounded-[2.5rem] overflow-hidden bg-medical-surface border border-slate-100 shadow-xl relative group">
            <div className="absolute top-8 left-8 z-10 glass-panel p-6 rounded-2xl border-white/40 shadow-2xl backdrop-blur-2xl">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-8 h-8 rounded-lg bg-medical-teal flex items-center justify-center text-white shadow-lg">
                  <MapPin size={16} />
                </div>
                <h4 className="text-lg font-medium text-medical-blue">Our Clinic Location</h4>
              </div>
              <p className="text-[0.7rem] text-slate-500 font-normal uppercase tracking-widest">{location.address}</p>
              <div className="mt-6 flex gap-4">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=Healing+Hands+Physiotherapy+${location.name}+Jodhpur`}
                  target="_blank"
                  className="px-6 py-3 bg-medical-blue text-white rounded-xl text-[0.65rem] font-medium uppercase tracking-widest hover:bg-medical-teal transition-all flex items-center gap-2"
                >
                  <Navigation size={14} /> Get Directions
                </a>
              </div>
            </div>
            
            <div className="aspect-[21/9] min-h-[450px] w-full relative">
              <iframe 
                src={`https://www.google.com/maps?q=Healing+Hands+Physiotherapy+${location.name}+Jodhpur&output=embed`}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Persistence: Same Quality Sections */}
      <section className="section-padding bg-medical-surface">
        <div className="max-site px-6 text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-medical-teal">Clinical Excellence</span>
          <h2 className="text-4xl md:text-5xl mt-4 mb-16 text-medical-blue font-light">Why Choose This Center?</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { t: "Expert Doctors", d: "Trained at premier institutions like Apollo.", i: Users },
              { t: "Advanced Tech", d: "Latest IFT, LASER & Ultrasound units.", i: ShieldCheck },
              { t: "Flexible Timing", d: "Open from 8 AM to 8 PM daily.", i: Clock },
              { t: "Proven Results", d: "15,000+ satisfied patients restored.", i: Star }
            ].map((feature, i) => (
              <div key={i} className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-medical-blue mx-auto mb-6 shadow-sm">
                  <feature.i size={24} />
                </div>
                <h4 className="text-lg font-medium text-medical-blue mb-2">{feature.t}</h4>
                <p className="text-slate-500 text-sm font-normal leading-relaxed">{feature.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
