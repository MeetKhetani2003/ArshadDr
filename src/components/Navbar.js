"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/treatments", label: "Treatments" },
  {
    label: "About",
    subLinks: [
      { href: "/about/founder", label: "Our Founder" },
      { href: "/about/team", label: "Our Team" },
    ]
  },
  { href: "/blogs", label: "Journal" },
  { href: "/contact", label: "Appointments" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="nav-slim"
    >
      <div className="nav-container">
        <Link href="/" className="relative flex items-center justify-center -ml-2">
          <div className="w-[180px] h-[40px] md:w-[220px] md:h-[45px] relative transform scale-125 md:scale-[1.3] origin-left">
            <Image
              src="/Logo.png"
              alt="Healing Hands"
              fill
              className="object-cover "
              priority
              sizes="(max-width: 768px) 180px, 220px"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <div
              key={link.label}
              className="relative group"
              onMouseEnter={() => link.subLinks && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {link.href ? (
                <Link
                  href={link.href}
                  className={`px-4 py-2 text-[0.75rem] font-medium transition-colors duration-300 rounded-lg flex items-center gap-1 ${pathname === link.href
                    ? "text-medical-blue bg-slate-100/80"
                    : "text-slate-600 hover:text-medical-blue hover:bg-slate-50"
                    }`}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  className={`px-4 py-2 text-[0.75rem] font-medium transition-colors duration-300 rounded-lg flex items-center gap-1 ${pathname.startsWith("/about")
                    ? "text-medical-blue bg-slate-100/80"
                    : "text-slate-600 hover:text-medical-blue hover:bg-slate-50"
                    }`}
                >
                  {link.label}
                  <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                </button>
              )}

              {/* Submenu Dropdown */}
              <AnimatePresence>
                {link.subLinks && activeDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden py-2"
                  >
                    {link.subLinks.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`block px-5 py-3 text-[0.7rem] font-bold uppercase tracking-widest transition-colors ${pathname === sub.href ? "text-medical-teal bg-slate-50" : "text-slate-500 hover:text-medical-blue hover:bg-slate-50"
                          }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div className="w-px h-4 bg-slate-200 mx-3" />
          <Link href="/contact" className="btn-modern btn-primary !py-2 !px-6 !text-[0.7rem] !font-medium">
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2 text-medical-blue z-50" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 top-0 left-0 w-screen h-screen bg-white/95 backdrop-blur-md z-[110] p-8 flex flex-col pt-24"
          >
            <div className="flex flex-col gap-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  {link.href ? (
                    <Link
                      href={link.href}
                      className={`text-4xl font-light tracking-tight block ${pathname === link.href ? "text-medical-teal" : "text-medical-blue"
                        }`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm font-bold uppercase tracking-widest text-slate-400">{link.label}</p>
                      <div className="flex flex-col gap-4 pl-4">
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`text-3xl font-light tracking-tight block ${pathname === sub.href ? "text-medical-teal" : "text-medical-blue"
                              }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-auto flex flex-col gap-6"
            >
              <div className="flex flex-col gap-4">
                <a href="tel:6378062237" className="p-5 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                  <div>
                    <p className="text-[0.6rem] font-medium uppercase tracking-widest text-slate-500 mb-1">Dr. Asad Solanki</p>
                    <p className="text-xl font-light text-medical-blue">6378-062237</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-medical-teal/10 flex items-center justify-center text-medical-teal">
                    <Phone size={20} />
                  </div>
                </a>
                <Link href="/contact" className="btn-modern btn-primary w-full py-5 text-lg font-medium text-center">
                  Book Assessment
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
