"use client";
import { FaWhatsapp } from "react-icons/fa6";

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/916378062237?text=Hello%20MyoMotion,%20I%20would%20like%20to%20book%20an%20appointment.";
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_15px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 group"
      aria-label="Contact on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 group-hover:opacity-0 transition-opacity pointer-events-none" />
      <FaWhatsapp size={28} className="relative z-10" />
    </a>
  );
}
