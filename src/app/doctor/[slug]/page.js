"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Star, MapPin, Award, GraduationCap, 
  Stethoscope, ShieldCheck, Activity, Calendar, 
  ChevronRight, Phone, Mail, ArrowRight
} from "lucide-react";
import { teamMembers } from "@/data/team";
import { useBooking } from "@/components/BookingContext";

export default function DoctorProfile() {
  const { slug } = useParams();
  const { openBookingModal } = useBooking();
  const doctor = teamMembers.find(m => m.slug === slug);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-medical-blue mb-4">Doctor Not Found</h2>
          <Link href="/about" className="text-medical-teal font-bold hover:underline">Return to Team</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen pb-24 selection:bg-medical-teal selection:text-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-40 pb-24 min-h-[70vh] flex items-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/doctor_hero.png"
            alt="Doctor Background"
            fill
            className="object-cover scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-blue via-medical-blue/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/40 to-transparent z-10" />
        </div>

        <div className="max-site relative z-20">
          <Link href="/about" className="inline-flex items-center gap-2 text-white/60 hover:text-medical-teal transition-colors mb-12 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Team</span>
          </Link>

          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Image Side */}
            <div className="lg:col-span-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/20 group"
              >
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </motion.div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-bold text-white/90">4.9/5.0</span>
                  </div>
                  <span className="text-white/20">|</span>
                  <span className="text-xs font-bold text-medical-teal uppercase tracking-widest">Verified Expert</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-none">
                  {doctor.name}
                </h1>
                <p className="text-2xl font-light text-slate-200/80 mb-10">{doctor.role}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-12 max-w-2xl">
                  <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm">
                    <p className="text-[0.6rem] font-bold text-slate-300 uppercase tracking-widest mb-2">Experience</p>
                    <p className="text-lg font-bold text-white">{doctor.slug === 'asad-solanki' ? '10+ Years' : '7+ Years'}</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm">
                    <p className="text-[0.6rem] font-bold text-slate-300 uppercase tracking-widest mb-2">Patients</p>
                    <p className="text-lg font-bold text-white">2,500+</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm">
                    <p className="text-[0.6rem] font-bold text-slate-300 uppercase tracking-widest mb-2">Success Rate</p>
                    <p className="text-lg font-bold text-white">99%</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => openBookingModal({ doctor: doctor.name, consultType: "Offline" })}
                    className="px-10 py-5 bg-medical-teal text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-medical-blue hover:shadow-xl hover:shadow-medical-blue/20 transition-all flex items-center gap-3 group"
                  >
                    Book Appointment
                    <Calendar size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => openBookingModal({ doctor: doctor.name, consultType: "Online" })}
                    className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-all"
                  >
                    Consult Online
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INFO SECTION ===== */}
      <section className="py-24">
        <div className="max-site">
          <div className="grid lg:grid-cols-12 gap-20">
            {/* Left Column: Biography */}
            <div className="lg:col-span-8">
              <div className="mb-16">
                <div className="w-12 h-1 bg-medical-teal mb-8" />
                <h2 className="text-3xl font-bold text-medical-blue mb-8">Professional Biography</h2>
                <p className="text-slate-500 text-lg leading-relaxed font-normal mb-8">
                  {doctor.bio}
                </p>
                
                {doctor.journey && (
                  <div className="space-y-6 mt-12">
                    <h3 className="text-xl font-bold text-medical-blue flex items-center gap-3">
                      <GraduationCap size={24} className="text-medical-teal" />
                      Clinical Journey & Achievements
                    </h3>
                    <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                      {doctor.journey.map((item, i) => (
                        <div key={i} className="relative group">
                          <div className="absolute -left-8 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-slate-100 group-hover:border-medical-teal transition-colors" />
                          <p className="text-slate-600 font-medium leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Expertise & Quick Contact */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                {/* Expertise Card */}
                <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50">
                  <h3 className="text-xl font-bold text-medical-blue mb-6 flex items-center gap-3">
                    <Stethoscope size={24} className="text-medical-teal" />
                    Specialized In
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {doctor.specialization.split(',').map((spec, i) => (
                      <span key={i} className="px-4 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold border border-slate-100">
                        {spec.trim()}
                      </span>
                    ))}
                  </div>
                  
                  <div className="pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-4 mb-4">
                      <ShieldCheck size={20} className="text-green-500" />
                      <p className="text-sm font-bold text-slate-700">Verified Clinical Practice</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Award size={20} className="text-medical-teal" />
                      <p className="text-sm font-bold text-slate-700">Patient-First Philosophy</p>
                    </div>
                  </div>
                </div>

                {/* Contact Card */}
                <div className="p-8 rounded-[2.5rem] bg-medical-blue text-white overflow-hidden relative group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                  <h3 className="text-xl font-bold mb-6">Need Assistance?</h3>
                  <div className="space-y-4 relative z-10">
                    <a href="tel:+919876543210" className="flex items-center gap-4 p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all">
                      <Phone size={20} className="text-medical-teal" />
                      <span className="text-sm font-medium">Connect Instantly</span>
                    </a>
                    <a href="mailto:contact@healinghands.com" className="flex items-center gap-4 p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all">
                      <Mail size={20} className="text-medical-teal" />
                      <span className="text-sm font-medium">Send Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="mt-20">
        <div className="max-site">
          <div className="bg-medical-surface rounded-[3rem] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-medical-blue mb-4 tracking-tight">
                Experience Advanced <br />
                Rehabilitation with {doctor.name.split('.')[1]}
              </h2>
              <p className="text-slate-500 text-lg max-w-xl">
                Take the first step towards pain-free movement today. Our specialist is ready to help you recover.
              </p>
            </div>
            <button 
              onClick={() => openBookingModal({ doctor: doctor.name, consultType: "Offline" })}
              className="relative z-10 px-12 py-6 bg-medical-teal text-white rounded-[2rem] font-bold text-lg uppercase tracking-widest hover:bg-medical-blue hover:shadow-2xl hover:shadow-medical-blue/20 transition-all flex items-center gap-4 group"
            >
              Start Your Plan
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="absolute bottom-0 right-0 opacity-5">
              <Activity size={300} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
