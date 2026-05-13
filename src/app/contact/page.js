"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone, MapPin, CheckCircle2, MessageSquare, Clock,
  ArrowUpRight,
  Navigation2
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { teamMembers } from "@/data/team";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const [status, setStatus] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("success"), 1500);
  };

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
    <main ref={containerRef} className="bg-white min-h-screen selection:bg-medical-teal selection:text-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[45vh] flex items-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/contact_hero_v2.png"
            alt="Contact Healing Hands"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-medical-blue/80 z-10" />
        </div>

        <div className="max-site relative z-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 mb-6">
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-medical-teal">Support Hub</span>
              </div>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-6">
              Contact Us
            </motion.h1>
            <motion.p variants={itemVariants} className="text-slate-300 text-lg max-w-xl font-normal">
              Have questions about your recovery? Our clinical team is ready to provide expert guidance and support.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT GRID ===== */}
      <section className="section-padding bg-white">
        <div className="max-site">
          <div className="grid lg:grid-cols-2 gap-20 items-start">

            {/* Left: Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-medical-blue mb-4">Get in Touch</h2>
                <p className="text-slate-500 text-lg">Use any of the following channels to reach our clinic directly.</p>
              </div>

              <div className="grid gap-6">
                {/* WhatsApp */}
                <a href="https://wa.me/916378062237" className="group flex items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-medical-teal hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl">
                  <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-all">
                    <FaWhatsapp size={28} />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">Fastest Response</p>
                    <p className="text-xl font-bold text-medical-blue group-hover:text-medical-teal transition-colors">WhatsApp Chat</p>
                  </div>
                  <ArrowUpRight className="ml-auto text-slate-300 group-hover:text-medical-teal transition-colors" size={24} />
                </a>

                {/* Phone 1 */}
                <div className="flex items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                  <div className="w-14 h-14 rounded-xl bg-medical-teal/10 flex items-center justify-center text-medical-teal">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">Clinical Head</p>
                    <a href="tel:6378062237" className="text-xl font-bold text-medical-blue hover:text-medical-teal">6378-062237</a>
                  </div>
                </div>

                {/* Phone 2 */}
                <div className="flex items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                  <div className="w-14 h-14 rounded-xl bg-medical-blue/10 flex items-center justify-center text-medical-blue">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">Administrative</p>
                    <a href="tel:9571052222" className="text-xl font-bold text-medical-blue hover:text-medical-teal">9571052222</a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                  <div className="w-14 h-14 rounded-xl bg-slate-200 flex items-center justify-center text-slate-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1">Primary Clinic</p>
                    <p className="text-base font-bold text-medical-blue leading-tight">Chopasni Housing Board, Jodhpur</p>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-8 rounded-2xl bg-medical-blue text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-medical-teal/20 rounded-full blur-3xl" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Clock className="text-medical-teal" size={24} />
                  </div>
                  <div>
                    <p className="text-lg font-bold">Clinical Hours</p>
                    <p className="text-sm text-white/70">Mon — Sat: 8 AM to 8 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Clean Form */}
            <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-medical-blue mb-2">Send a Message</h3>
                <p className="text-slate-500 text-sm">We'll get back to you within 24 hours.</p>
              </div>

              {status === "success" ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-medical-teal/10 text-medical-teal rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-xl font-bold text-medical-blue">Message Received</h4>
                  <p className="text-slate-500 mt-2">Our team will contact you shortly.</p>
                  <button onClick={() => setStatus(null)} className="mt-8 text-medical-teal font-bold uppercase tracking-widest text-xs">Send New Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <input required type="text" className="w-full bg-white border border-slate-200 rounded-xl py-4 px-6 outline-none focus:border-medical-teal focus:ring-4 focus:ring-medical-teal/5 transition-all font-medium text-medical-blue" placeholder="John Doe" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                    <input required type="tel" className="w-full bg-white border border-slate-200 rounded-xl py-4 px-6 outline-none focus:border-medical-teal focus:ring-4 focus:ring-medical-teal/5 transition-all font-medium text-medical-blue" placeholder="+91 00000 00000" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Subject / Concern</label>
                    <input type="text" className="w-full bg-white border border-slate-200 rounded-xl py-4 px-6 outline-none focus:border-medical-teal focus:ring-4 focus:ring-medical-teal/5 transition-all font-medium text-medical-blue" placeholder="e.g. Back Pain Consultation" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 ml-1">Message</label>
                    <textarea rows={5} className="w-full bg-white border border-slate-200 rounded-xl py-4 px-6 outline-none focus:border-medical-teal focus:ring-4 focus:ring-medical-teal/5 transition-all font-medium text-medical-blue resize-none" placeholder="How can we help you?" />
                  </div>

                  <button type="submit" className="w-full py-5 bg-medical-blue text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-medical-teal transition-all shadow-lg shadow-medical-blue/10">
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAP SECTION ===== */}
      <div className="container-wide relative z-10 bg-white py-12">
        <div className="text-center max-w-3xl mx-auto mb-12 will-animate scroll-reveal reveal">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-medical-teal mb-4 block">Physical Center</span>
          <h2 className="text-4xl md:text-5xl font-bold text-medical-blue mb-3 tracking-tight">Serving Across Jodhpur</h2>
          <p className="text-slate-500 text-lg font-normal">We are available at multiple locations to ensure easy access to advanced physiotherapy care. Our hubs are equipped with high-end rehabilitation technology.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              id: "01",
              title: "Healing Hands Clinic",
              subtitle: "Chopasni Housing Board",
              pin: "342008",
              address: "Chopasni Housing Board, Jodhpur, Rajasthan",
              landmarks: [
                { name: "Near AIIMS Jodhpur", detail: "2 min drive" },
                { name: "Near 1st Puliya", detail: "Walkable" },
                { name: "DPS Circle", detail: "5 mins away" }
              ],
              hours: "Mon–Sat: 8 AM–2 PM & 4–8:30 PM",
              doctor: "Dr. Arshad Solanki",
              doctorRole: "Founder — 10+ Years Experience",
              buttonText: "VIEW CLINIC",
              mapImg: "/map_placeholder.png"
            },
            {
              id: "02",
              title: "Healing Hands Clinic",
              subtitle: "Chopasni Housing Board",
              pin: "342008",
              address: "Chopasni Housing Board, Jodhpur, Rajasthan",
              landmarks: [
                { name: "Near AIIMS Jodhpur", detail: "2 min drive" },
                { name: "Near 1st Puliya", detail: "Walkable" },
                { name: "DPS Circle", detail: "5 mins away" }
              ],
              hours: "Mon–Sat: 8 AM–2 PM & 4–8:30 PM",
              doctor: "Dr. Arshad Solanki",
              doctorRole: "Founder — 10+ Years Experience",
              buttonText: "VIEW CLINIC",
              mapImg: "/map_placeholder.png"
            }, {
              id: "03",
              title: "Healing Hands Clinic",
              subtitle: "Chopasni Housing Board",
              pin: "342008",
              address: "Chopasni Housing Board, Jodhpur, Rajasthan",
              landmarks: [
                { name: "Near AIIMS Jodhpur", detail: "2 min drive" },
                { name: "Near 1st Puliya", detail: "Walkable" },
                { name: "DPS Circle", detail: "5 mins away" }
              ],
              hours: "Mon–Sat: 8 AM–2 PM & 4–8:30 PM",
              doctor: "Dr. Arshad Solanki",
              doctorRole: "Founder — 10+ Years Experience",
              buttonText: "VIEW CLINIC",
              mapImg: "/map_placeholder.png"
            }, {
              id: "04",
              title: "Healing Hands Clinic",
              subtitle: "Chopasni Housing Board",
              pin: "342008",
              address: "Chopasni Housing Board, Jodhpur, Rajasthan",
              landmarks: [
                { name: "Near AIIMS Jodhpur", detail: "2 min drive" },
                { name: "Near 1st Puliya", detail: "Walkable" },
                { name: "DPS Circle", detail: "5 mins away" }
              ],
              hours: "Mon–Sat: 8 AM–2 PM & 4–8:30 PM",
              doctor: "Dr. Arshad Solanki",
              doctorRole: "Founder — 10+ Years Experience",
              buttonText: "VIEW CLINIC",
              mapImg: "/map_placeholder.png"
            }
            , {
              id: "05",
              title: "Healing Hands Clinic",
              subtitle: "Chopasni Housing Board",
              pin: "342008",
              address: "Chopasni Housing Board, Jodhpur, Rajasthan",
              landmarks: [
                { name: "Near AIIMS Jodhpur", detail: "2 min drive" },
                { name: "Near 1st Puliya", detail: "Walkable" },
                { name: "DPS Circle", detail: "5 mins away" }
              ],
              hours: "Mon–Sat: 8 AM–2 PM & 4–8:30 PM",
              doctor: "Dr. Arshad Solanki",
              doctorRole: "Founder — 10+ Years Experience",
              buttonText: "VIEW CLINIC",
              mapImg: "/map_placeholder.png"
            }, {
              id: "06",
              title: "Healing Hands Clinic",
              subtitle: "Chopasni Housing Board",
              pin: "342008",
              address: "Chopasni Housing Board, Jodhpur, Rajasthan",
              landmarks: [
                { name: "Near AIIMS Jodhpur", detail: "2 min drive" },
                { name: "Near 1st Puliya", detail: "Walkable" },
                { name: "DPS Circle", detail: "5 mins away" }
              ],
              hours: "Mon–Sat: 8 AM–2 PM & 4–8:30 PM",
              doctor: "Dr. Arshad Solanki",
              doctorRole: "Founder — 10+ Years Experience",
              buttonText: "VIEW CLINIC",
              mapImg: "/map_placeholder.png"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="group relative"
            >
              {/* Background Large Number */}
              <div className="absolute -top-10 -right-4 text-[10rem] font-black text-slate-100/50 select-none pointer-events-none group-hover:text-medical-teal/5 transition-colors">
                {item.id}
              </div>

              <div className="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col h-full hover:shadow-[0_40px_120px_-25px_rgba(37,99,235,0.12)] transition-all duration-500 overflow-hidden">

                {/* Modern Header */}
                <div className="mb-6 relative">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-2.5 py-0.5 rounded-lg bg-medical-teal text-white text-[0.6rem] font-bold tracking-tight uppercase">
                      PIN: {item.pin}
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-medical-teal animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold text-medical-blue tracking-tight leading-none mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold tracking-tight">
                    {item.subtitle}
                  </p>
                </div>

                {/* Technical Detail Blocks */}
                <div className="space-y-6 flex-1">
                  {/* Address Block */}
                  <div className="relative pl-5 border-l-2 border-slate-100 group-hover:border-medical-teal/30 transition-colors">
                    <span className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-tight block mb-1.5">Location Coordinates</span>
                    <p className="text-sm font-bold text-medical-blue leading-relaxed">{item.address}</p>
                  </div>

                  {/* Landmarks "Distance Chips" */}
                  <div>
                    <span className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-tight block mb-3">Access Points</span>
                    <div className="space-y-2">
                      {item.landmarks.map((l, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/50 border border-slate-100 group-hover:bg-white transition-all">
                          <div className="flex items-center gap-2.5">
                            <Navigation2 size={13} className="text-medical-teal" />
                            <span className="text-[0.7rem] font-semibold text-slate-600">{l.name}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-md bg-white text-[0.55rem] font-bold text-medical-teal border border-slate-100 shadow-sm uppercase tracking-tighter">
                            {l.detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Hours */}
                  <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-900/10">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                      <Clock size={18} className="text-medical-teal" />
                    </div>
                    <div>
                      <span className="text-[0.55rem] font-bold text-white/40 uppercase tracking-tight block">Availability Matrix</span>
                      <p className="text-[0.7rem] font-bold tracking-tight">{item.hours}</p>
                    </div>
                  </div>
                </div>

                {/* High-End Doctor Spotlight */}
                <div className="mt-8 mb-6 p-1 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-between group/doc hover:bg-white transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white relative">
                      <Image src={item.doctor === "Dr. Arshad Solanki" ? teamMembers[0].image : teamMembers[1].image} alt="Doctor" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-[0.75rem] font-bold text-medical-blue leading-none mb-1">{item.doctor}</p>
                      <p className="text-[0.5rem] text-slate-500 font-bold uppercase tracking-tight">{item.doctorRole.split('—')[0]}</p>
                    </div>
                  </div>
                  <div className="pr-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 block animate-pulse" />
                  </div>
                </div>

                {/* Circular Map Portal */}
                <div className="absolute bottom-24 -right-10 w-32 h-32 rounded-full border-8 border-white shadow-2xl overflow-hidden hidden group-hover:block will-animate hover:scale-150 transition-all cursor-crosshair">
                  <Image src={item.mapImg} alt="Map Portal" fill className="object-cover" />
                </div>

                {/* Dual Primary Actions */}
                <div className="flex gap-2.5 mt-auto">
                  <Link
                    href="/contact"
                    className="flex-1 bg-medical-teal text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-wider text-center shadow-xl shadow-medical-teal/20 hover:bg-medical-blue transition-all"
                  >
                    {item.buttonText}
                  </Link>
                  <button className="w-14 h-14 rounded-2xl border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:border-medical-teal hover:text-medical-teal hover:bg-medical-teal/5 transition-all shadow-sm">
                    <MapPin size={22} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
