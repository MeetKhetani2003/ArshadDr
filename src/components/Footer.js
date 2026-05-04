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
    <footer className="bg-medical-blue text-slate-400 pt-32 pb-12 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-medical-teal/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="container-wide px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-10">
            <Link href="/">
              <div className="text-white font-light text-2xl tracking-tight leading-tight flex items-center gap-3">
                <div className="w-10 h-10 bg-medical-teal rounded-xl flex items-center justify-center text-white">
                  <Heart size={24} fill="currentColor" />
                </div>
                <div>
                  Healing Hands <br />
                  <span className="text-medical-teal font-medium">Physiotherapy</span>
                </div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm font-normal text-slate-400/80">
              Healing Hands / MyoMotion is Jodhpur's leading physiotherapy network, dedicated to 
              providing world-class, evidence-based rehabilitation across multiple specialized 
              centers since 2013.
            </p>
            
            {/* Trust Badges in Footer */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-medical-teal" size={20} />
                <span className="text-[0.6rem] uppercase tracking-widest text-white/60 font-medium">ISO 9001:2015</span>
              </div>
              <div className="w-px h-4 bg-slate-800" />
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500" size={20} fill="currentColor" />
                <span className="text-[0.6rem] uppercase tracking-widest text-white/60 font-medium">4.9 Google Rating</span>
              </div>
            </div>

            <div className="flex gap-4">
              {[
                { Icon: FaFacebookF, href: "#" },
                { Icon: FaInstagram, href: "#" },
                { Icon: FaXTwitter, href: "#" },
                { Icon: FaYoutube, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-medical-teal hover:text-white hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-medium mb-10 tracking-wider uppercase text-[0.65rem]">Platform</h4>
            <ul className="space-y-5">
              {[
                { href: "/", label: "Home" },
                { href: "/treatments", label: "Treatments" },
                { href: "/about", label: "Our Story" },
                { href: "/blogs", label: "Journal" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white flex items-center gap-2 group transition-colors font-normal"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0 text-medical-teal" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Links */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-medium mb-10 tracking-wider uppercase text-[0.65rem]">Clinical Hubs</h4>
            <ul className="space-y-5">
              {locations.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="text-sm hover:text-white flex items-center gap-2 group transition-colors font-normal"
                  >
                    <MapPin size={12} className="text-slate-600 group-hover:text-medical-teal transition-colors" />
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-medium mb-10 tracking-wider uppercase text-[0.65rem]">Direct Support</h4>
            <div className="space-y-8">
              <a href="tel:6378062237" className="group block">
                <p className="text-[0.6rem] uppercase tracking-widest text-slate-500 mb-2 font-medium">Dr. Arshad Solanki</p>
                <div className="flex items-center gap-3 text-lg text-white font-light group-hover:text-medical-teal transition-colors">
                  <Phone size={18} className="text-medical-teal" />
                  6378-062237
                </div>
              </a>
              <a href="tel:9571052222" className="group block">
                <p className="text-[0.6rem] uppercase tracking-widest text-slate-500 mb-2 font-medium">General Enquiry</p>
                <div className="flex items-center gap-3 text-lg text-white font-light group-hover:text-medical-teal transition-colors">
                  <Phone size={18} className="text-medical-teal" />
                  9571052222
                </div>
              </a>
              <div className="flex items-center gap-3 text-sm font-normal">
                <Clock size={18} className="text-slate-600" />
                <span>Mon - Sat: 9 AM - 8 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Areas We Serve Grid */}
        <div className="pt-16 pb-12 border-t border-slate-800/60">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
            <h4 className="text-white font-medium tracking-wider uppercase text-[0.65rem]">Areas We Serve in Jodhpur</h4>
            <Link href="/contact" className="text-[0.6rem] uppercase tracking-[0.2em] text-medical-teal hover:text-white transition-colors">Book Assessment Near You</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-4 gap-x-8">
            {locations.flatMap(l => l.areas).concat(["Ratanada", "Sardarpura", "Shastri Nagar", "Kamla Nehru Nagar"]).map((area, i) => (
              <span key={i} className="text-[0.7rem] text-slate-400 hover:text-white cursor-default transition-colors font-normal whitespace-nowrap flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-slate-800" />
                Physiotherapy in {area}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-[0.7rem] font-normal">
              © {new Date().getFullYear()} Healing Hands / MyoMotion Physiotherapy.
            </p>
            <div className="flex items-center gap-6 text-[0.7rem] font-medium uppercase tracking-widest">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
          <p className="flex items-center gap-2 text-[0.7rem] font-normal">
            Clinically Excellence in <Heart size={14} className="text-medical-teal" fill="currentColor" /> Jodhpur, Rajasthan
          </p>
        </div>
      </div>
    </footer>
  );
}
