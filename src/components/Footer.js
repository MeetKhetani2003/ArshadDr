"use client";
import Link from "next/link";
import Image from "next/image";
import { treatments } from "@/data/treatments";
import { locations } from "@/data/team";
import {
  Phone, MapPin, ArrowRight, Heart, Mail,
  Clock, ShieldCheck, Star, Award
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-medical-blue text-slate-400 pt-24 pb-12 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-medical-teal/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">

          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 relative pt-40 md:pt-44 -mt-14 md:-mt-28">
            <Link href="/" className="absolute top-0 -left-4 block">
              <Image
                src="/Logo.png"
                alt="Healing Hands Logo"
                height={280}
                width={280}
                className="object-contain"
              />
            </Link>

            <div className="space-y-6 relative z-10">
              <p className="text-xl leading-relaxed max-w-md font-medium text-slate-300">
                Healing Hands / MyoMotion is Jodhpur's premier physiotherapy network,
                pioneering advanced, evidence-based rehabilitation and personalized
                patient care pathways since 2013.
              </p>

              <div className="flex gap-4 pt-4">
                {[
                  { Icon: FaFacebookF, href: "#" },
                  { Icon: FaInstagram, href: "#" },
                  { Icon: FaXTwitter, href: "#" },
                  { Icon: FaYoutube, href: "#" },
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-medical-teal hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-lg"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-8 tracking-wider uppercase text-[0.7rem]">Platform</h4>
            <ul className="space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/treatments", label: "Treatments" },
                { href: "/about", label: "Our Story" },
                { href: "/blogs", label: "Journal" },
                { href: "/faqs", label: "FAQs" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white flex items-center gap-2 group transition-colors font-medium tracking-tight"
                  >
                    <ArrowRight size={10} className="text-medical-teal opacity-0 group-hover:opacity-100 transition-all -ml-3 group-hover:ml-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-8 tracking-wider uppercase text-[0.7rem]">Clinical Hubs</h4>
            <ul className="space-y-4">
              {locations.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="text-sm hover:text-white flex items-center gap-2 group transition-colors font-medium tracking-tight"
                  >
                    <MapPin size={10} className="text-slate-600 group-hover:text-medical-teal transition-colors" />
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Trust & Empty Corner Fix (3 cols) */}
          <div className="lg:col-span-3 space-y-10">
            <div>
              <h4 className="text-white font-bold mb-8 tracking-wider uppercase text-[0.7rem]">Quality & Trust</h4>
              <div className="grid gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/50 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-medical-teal/10 flex items-center justify-center text-medical-teal shadow-inner">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-white text-[0.75rem] font-bold uppercase tracking-widest leading-none mb-1">Verified Clinical Care</p>
                    <p className="text-[0.7rem] text-slate-500 font-medium">ISO 9001:2015 Certified</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/50 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                    <Star size={20} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-white text-[0.75rem] font-bold uppercase tracking-widest leading-none mb-1">Patient Approved</p>
                    <p className="text-[0.7rem] text-slate-500 font-medium">4.9/5 Google Rating</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Health Scheme Badges */}
            <div className="pt-2">
              <p className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-slate-600 mb-4">Official Health Partner</p>
              <div className="flex flex-wrap gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <div className="px-3 py-1.5 bg-white rounded-md text-[0.5rem] font-black text-medical-blue flex items-center gap-1.5 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600" /> RGHS
                </div>
                <div className="px-3 py-1.5 bg-white rounded-md text-[0.5rem] font-black text-medical-blue flex items-center gap-1.5 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> CGHS
                </div>
                <div className="px-3 py-1.5 bg-white rounded-md text-[0.5rem] font-black text-medical-blue flex items-center gap-1.5 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600" /> ECHS
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Areas We Serve Grid */}
        <div className="pt-12 pb-10 border-t border-slate-800/60">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <h4 className="text-white font-bold tracking-wider uppercase text-[0.6rem]">Serving Greater Jodhpur</h4>
            <Link href="/contact" className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-medical-teal hover:text-white transition-all">
              Find a Clinic Near You →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-3 gap-x-8">
            {locations.flatMap(l => l.areas).concat(["Ratanada", "Sardarpura", "Shastri Nagar", "Kamla Nehru Nagar"]).slice(0, 12).map((area, i) => (
              <span key={i} className="text-[0.65rem] text-slate-500 hover:text-medical-teal cursor-default transition-colors font-medium flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-slate-800" />
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-[0.65rem] font-medium text-slate-500">
              © {new Date().getFullYear()} Healing Hands Physiotherapy. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 text-[0.65rem] font-bold uppercase tracking-widest text-slate-500">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-[0.65rem] font-medium text-slate-500">Clinical Excellence in</p>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full">
              <Heart size={10} className="text-medical-teal" fill="currentColor" />
              <span className="text-[0.6rem] font-bold uppercase tracking-widest text-white">Jodhpur, RJ</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
