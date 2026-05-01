"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { defaultBlogs } from "@/data/blogs";
import { ArrowUpRight, Search, Clock, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("All");
  const containerRef = useRef(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("hh_blogs") : null;
    const customBlogs = stored ? JSON.parse(stored) : [];
    setBlogs([...customBlogs, ...defaultBlogs]);

    // Setup scroll reveals for dynamically rendered elements
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
  }, [blogs.length]);

  const categories = ["All", ...new Set(blogs.map((b) => b.category))];
  const filteredBlogs = filter === "All" ? blogs : blogs.filter((b) => b.category === filter);

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
    <main ref={containerRef} className="bg-medical-surface min-h-screen pt-40 selection:bg-medical-teal selection:text-white">
      {/* ===== HEADER ===== */}
      <section className="section-padding bg-mesh !pt-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-medical-teal/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <motion.div 
          className="max-site relative z-10"
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full shadow-sm border border-slate-100 mb-8">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-medical-blue">Clinical Journal</span>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h1 className="text-display text-5xl md:text-7xl lg:text-[5.5rem] mt-2">
              Insights & <br /> 
              <span className="text-medical-teal relative inline-block">
                Guides.
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-medical-teal/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/>
                </svg>
              </span>
            </h1>
          </motion.div>
          <motion.div variants={itemVariants}>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mt-8 leading-relaxed font-normal">
              Explore the latest evidence-based physiotherapy research, recovery protocols, 
              and expert clinical advice from our specialists.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== BLOG LIST ===== */}
      <section className="section-padding !pt-0 relative z-10">
        <div className="max-site">
          
          {/* Filter Bar */}
          <div className="will-animate scroll-reveal reveal flex overflow-x-auto gap-3 py-6 mb-10 no-scrollbar items-center border-b border-slate-200/60">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-[0.75rem] font-bold tracking-wider uppercase transition-all whitespace-nowrap shadow-sm border ${
                  filter === cat 
                    ? "bg-medical-blue text-white border-medical-blue shadow-medical-blue/20" 
                    : "bg-white text-slate-500 hover:text-medical-blue hover:border-medical-teal/50 hover:bg-medical-teal/5 border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredBlogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Link 
                    href={`/blogs/${blog.slug}`}
                    className="modern-card group flex flex-col h-full border-none shadow-xl bg-white block"
                  >
                    <div className="aspect-[16/10] relative rounded-xl overflow-hidden mb-8 bg-slate-100">
                      <Image 
                        src={blog.image} 
                        alt={blog.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105" 
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-medical-blue/10 group-hover:bg-transparent transition-colors duration-500" />
                      <div className="absolute top-4 left-4 glass-panel px-3 py-1.5 rounded-lg flex items-center gap-1.5 z-10">
                        <Clock size={12} className="text-medical-teal" />
                        <span className="text-[0.6rem] font-bold uppercase tracking-wider text-medical-blue">{blog.readTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">{blog.date}</span>
                      <span className="w-1 h-1 rounded-full bg-medical-teal" />
                      <span className="text-[0.65rem] font-bold uppercase tracking-widest text-medical-teal">{blog.category}</span>
                    </div>

                    <h2 className="text-2xl font-bold mb-4 group-hover:text-medical-teal transition-colors leading-tight text-medical-blue">
                      {blog.title}
                    </h2>
                    
                    <p className="text-slate-500 font-normal text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                          <Image src="/doctor.png" alt={blog.author} width={24} height={24} className="object-cover" />
                        </div>
                        <span className="font-semibold text-xs text-medical-blue">{blog.author}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:border-medical-teal group-hover:text-medical-teal group-hover:bg-medical-teal/5 transition-all">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredBlogs.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
              className="text-center py-32 bg-white rounded-2xl border border-slate-100 shadow-sm mt-8"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-slate-300" />
              </div>
              <p className="text-2xl font-bold text-medical-blue">No entries found.</p>
              <p className="text-slate-500 mt-2">Try selecting a different category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="section-padding pt-10 pb-32">
        <div className="max-site bg-medical-blue rounded-2xl p-12 md:p-24 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-800 via-medical-blue to-medical-blue" />
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-medical-teal opacity-10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-label !text-medical-teal mb-4 block">Stay Informed</span>
            <h2 className="text-title text-3xl md:text-5xl mb-12 leading-tight">
              Subscribe to Clinical Updates.
            </h2>
            <div className="flex flex-col md:flex-row gap-4 p-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow bg-transparent px-6 py-4 outline-none text-white font-medium placeholder-white/40" 
              />
              <button className="btn-modern bg-white text-medical-blue hover:bg-slate-100 rounded-xl px-8 shadow-lg">
                Subscribe <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
