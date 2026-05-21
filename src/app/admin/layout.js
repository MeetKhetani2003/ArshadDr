"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Stethoscope, Image as ImageIcon, BookOpen, LogOut, Menu, X, Calendar } from "lucide-react";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Blogs", href: "/admin/blogs", icon: BookOpen },
    { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 pt-24">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-24 left-4 z-50">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 bg-medical-blue text-white rounded-xl shadow-lg"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed w-64 bg-medical-blue text-white h-[calc(100vh-6rem)] left-0 top-24 flex flex-col shadow-xl z-40 transition-transform duration-300 rounded-tr-[2rem] rounded-br-[2rem]
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-8">
          <h2 className="text-xl font-bold tracking-tight mb-1">Admin Panel</h2>
          <p className="text-[0.65rem] text-medical-teal uppercase tracking-widest font-bold">Healing Hands</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-4 rounded-xl transition-all ${
                  isActive 
                    ? "bg-medical-teal text-white shadow-md font-bold" 
                    : "text-slate-300 hover:bg-white/10 hover:text-white font-medium"
                }`}
              >
                <item.icon size={18} />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-4 py-4 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-all font-medium">
            <LogOut size={18} />
            <span className="text-sm">Exit Admin</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-medical-blue/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 w-full">
        {/* We keep some padding for the content itself, but remove top padding since layout already has it */}
        <div className="px-4 md:px-10 pb-20 pt-16 md:pt-4">
          {children}
        </div>
      </div>
    </div>
  );
}
