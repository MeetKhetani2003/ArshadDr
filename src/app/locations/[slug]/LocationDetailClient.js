"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MapPin, Phone, ArrowRight, CheckCircle2, 
  Clock, ShieldCheck, Star, Users, Navigation 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LocationDetailClient({ location }) {
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
                Physiotherapy <br />
                in <span className="text-medical-teal">{location.name}</span>
              </h1>
              <p className="text-slate-200 text-lg mb-10 leading-relaxed font-normal max-w-xl opacity-90">
                {location.description} Located near {location.landmarks.map(l => typeof l === 'string' ? l : l.name).join(" and ")}, our specialized center provides 
                advanced evidence-based care for residents in {location.areas.slice(0, 2).join(", ")}.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/contact" className="px-8 py-4 bg-medical-teal text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-medical-blue transition-all flex items-center gap-3 group">
                  Book at {location.name} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:+916378062237" className="px-8 py-4 glass-panel text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-3">
                  <Phone size={16} /> +91 63780 62237
                </a>
              </div>
            </motion.div>

            {/* Quick Metrics Badge Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-white/20 text-white relative backdrop-blur-2xl shadow-2xl"
            >
              <h3 className="text-2xl font-medium mb-8">Clinical Center Highlights</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-medical-teal shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h5 className="font-medium text-sm text-white">Daily Operational Hours</h5>
                    <p className="text-slate-300 text-xs mt-1">{location.hours || "Morning: 8:00 AM – 1:00 PM | Evening: 4:00 PM – 8:00 PM"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-medical-teal shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h5 className="font-medium text-sm text-white">Exact Address</h5>
                    <p className="text-slate-300 text-xs mt-1">{location.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-medical-teal shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h5 className="font-medium text-sm text-white">Care Standards</h5>
                    <p className="text-slate-300 text-xs mt-1">Certified protocols under Dr. Asad Solanki, Apollo & Yuvraj Rehab Alumnus.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Local Landmarks & Areas Section */}
      <section className="section-padding bg-slate-50">
        <div className="max-site px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-medical-teal">Neighborhood Access</span>
              <h2 className="text-4xl md:text-5xl mt-4 mb-8 text-medical-blue font-light">
                Serving {location.name} & Adjoining Localities
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Healing Hands Physiotherapy is strategically located in {location.name} to offer seamless 
                access for patients seeking advanced orthopedic, neurological, and pediatric rehabilitation.
              </p>

              <div className="space-y-4 mb-8">
                <h4 className="text-sm font-bold uppercase tracking-wider text-medical-blue">Key Nearby Landmarks</h4>
                <div className="flex flex-wrap gap-2">
                  {location.landmarks.map((landmark, i) => {
                    const label = typeof landmark === "string" ? landmark : landmark.name;
                    const tag = typeof landmark === "object" && landmark.tag ? landmark.tag : null;
                    return (
                      <span key={i} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-sm flex items-center gap-2">
                        <Navigation size={12} className="text-medical-teal" />
                        <span>{label}</span>
                        {tag && <span className="text-[0.55rem] font-bold text-medical-teal bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">{tag}</span>}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-medical-blue">Surrounding Areas Covered</h4>
                <div className="flex flex-wrap gap-2">
                  {location.areas.map((area, i) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-sm flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-medical-teal" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
                <h3 className="text-xl font-bold text-medical-blue">Physiotherapy Services at {location.name}</h3>
                <div className="space-y-3">
                  {[
                    "Neurological Rehabilitation (Stroke, Paralysis, Parkinson's)",
                    "Orthopedic Physiotherapy (Back, Neck, Joint & Knee Pain)",
                    "Post-Operative Recovery & Joint Replacement Care",
                    "Pediatric & Child Development Therapy",
                    "Home Visit Physiotherapy in " + location.name,
                  ].map((service, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 size={16} className="text-medical-teal shrink-0" />
                      <span className="text-xs font-medium text-slate-800">{service}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-wider text-slate-400 font-bold">Helpline</p>
                    <a href="tel:+916378062237" className="text-lg font-bold text-medical-blue hover:text-medical-teal transition-colors">
                      +91 63780 62237
                    </a>
                  </div>
                  <Link href="/contact" className="btn-modern btn-primary text-xs py-3 px-6">
                    Book Assessment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Embed */}
      <section className="section-padding bg-white pt-0">
        <div className="max-site px-6">
          <div className="rounded-[2.5rem] overflow-hidden bg-medical-surface border border-slate-100 shadow-xl relative group">
            <div className="absolute top-8 left-8 z-10 glass-panel p-6 rounded-2xl border-white/40 shadow-2xl backdrop-blur-2xl max-w-sm">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-8 h-8 rounded-lg bg-medical-teal flex items-center justify-center text-white shadow-lg">
                  <MapPin size={16} />
                </div>
                <h4 className="text-base font-semibold text-medical-blue">Healing Hands {location.name}</h4>
              </div>
              <p className="text-[0.7rem] text-slate-600 font-normal leading-relaxed">{location.address}</p>
              <div className="mt-4 flex gap-4">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=Healing+Hands+Physiotherapy+${location.name}+Jodhpur`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-medical-blue text-white rounded-xl text-[0.65rem] font-medium uppercase tracking-widest hover:bg-medical-teal transition-all flex items-center gap-2"
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
                className="grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Excellence Features */}
      <section className="section-padding bg-medical-surface">
        <div className="max-site px-6 text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-medical-teal">Clinical Excellence</span>
          <h2 className="text-4xl md:text-5xl mt-4 mb-16 text-medical-blue font-light">Why Choose Healing Hands {location.name}?</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { t: "Expert Doctors", d: "Trained at premier institutions like Apollo.", i: Users },
              { t: "Advanced Modalities", d: "Digital Gait, LASER, Shockwave & Ultrasound.", i: ShieldCheck },
              { t: "Flexible Timing", d: "Morning & evening sessions daily.", i: Clock },
              { t: "Proven Care", d: "Over a decade of trusted clinical practice.", i: Star }
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
