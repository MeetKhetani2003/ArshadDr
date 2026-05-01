"use client";
import Link from "next/link";
import Image from "next/image";
import { treatments } from "@/data/treatments";
import { locations } from "@/data/team";
import { Phone, MapPin, ArrowRight, Heart, Mail, Clock } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-24 pb-12">
      <div className="container-wide px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link href="/">
              <Image
                src="/Logo.png"
                alt="Healing Hands"
                width={160}
                height={40}
                className="h-10 w-auto brightness-200 grayscale contrast-200"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Healing Hands Physiotherapy is dedicated to providing high-quality, 
              evidence-based rehabilitation services in Jodhpur.
            </p>
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
                  className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-600 hover:text-white transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/treatments", label: "Treatments" },
                { href: "/about", label: "About Us" },
                { href: "/blogs", label: "Blog" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-teal-400 flex items-center gap-2 group transition-colors"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-8">Specializations</h4>
            <ul className="space-y-4">
              {treatments.slice(0, 5).map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/treatments/${t.slug}`}
                    className="text-sm hover:text-teal-400 flex items-center gap-2 group transition-colors"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-8">Contact Info</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-teal-500 flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Phone</p>
                  <a href="tel:6378062237" className="text-sm text-slate-200 block hover:text-teal-400">6378062237</a>
                  <a href="tel:9571052222" className="text-sm text-slate-200 block hover:text-teal-400">9571052222</a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-teal-500 flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Address</p>
                  <p className="text-sm text-slate-200">Vasundhara Hospital, Multiple locations in Jodhpur</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-teal-500 flex-shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Working Hours</p>
                  <p className="text-sm text-slate-200">Mon - Sat: 9:00 AM - 8:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs">
            © {new Date().getFullYear()} Healing Hands Physiotherapy. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-xs">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <p className="flex items-center gap-1">
              Made with <Heart size={12} className="text-teal-500" /> in Jodhpur
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
