"use client";
import { useState, useEffect, use, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { defaultBlogs } from "@/data/blogs";
import { Home, ChevronRight, Clock, User, Phone, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function BlogDetailPage({ params }) {
  const { slug } = use(params);
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("hh_blogs") : null;
    const customBlogs = stored ? JSON.parse(stored) : [];
    const allBlogs = [...customBlogs, ...defaultBlogs];
    const found = allBlogs.find((b) => b.slug === slug);
    setBlog(found || null);
    setRelatedBlogs(allBlogs.filter((b) => b.slug !== slug).slice(0, 3));
  }, [slug]);

  useEffect(() => {
    if (!blog) return;
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
  }, [blog]);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-medical-surface pt-40">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-slate-200 border-t-medical-teal rounded-full mb-6"
        />
        <h2 className="text-xl font-bold text-medical-blue">Loading Journal Entry...</h2>
      </div>
    );
  }

  const renderContent = (content) => {
    return content.split("\n\n").map((paragraph, i) => {
      if (paragraph.startsWith("## ")) {
        return (
          <h2 key={i} className="text-2xl md:text-3xl font-bold text-medical-blue mt-12 mb-6 tracking-tight">
            {paragraph.replace("## ", "")}
          </h2>
        );
      }
      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
        return (
          <h3 key={i} className="text-xl font-bold text-medical-blue mt-8 mb-4">
            {paragraph.replace(/\*\*/g, "")}
          </h3>
        );
      }
      if (paragraph.includes("\n-") || paragraph.includes("\n1.")) {
        const lines = paragraph.split("\n");
        return (
          <div key={i} className="mb-8 bg-slate-50 p-8 rounded-2xl border border-slate-100">
            {lines.map((line, j) => {
              if (line.startsWith("- ") || /^\d+\.\s/.test(line)) {
                return (
                  <div key={j} className="flex gap-4 mb-4 text-slate-600 leading-relaxed font-normal">
                    <span className="text-medical-teal font-bold shrink-0 mt-1">•</span>
                    <span dangerouslySetInnerHTML={{ __html: line.replace(/^-\s/, "").replace(/^\d+\.\s/, "").replace(/\*\*(.*?)\*\*/g, "<strong class='text-medical-blue'>$1</strong>") }} />
                  </div>
                );
              }
              return (
                <p key={j} className="text-slate-600 leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong class='text-medical-blue'>$1</strong>") }} />
              );
            })}
          </div>
        );
      }
      return (
        <p key={i} className="text-slate-600 text-[1.05rem] leading-[1.8] mb-8 font-normal" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong class='text-medical-blue font-bold'>$1</strong>") }} />
      );
    });
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
    <main ref={containerRef} className="bg-medical-surface min-h-screen pt-40 selection:bg-medical-teal selection:text-white">
      
      {/* ===== HERO ===== */}
      <section className="section-padding bg-mesh !pt-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-medical-teal/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        
        <motion.div 
          className="max-w-4xl mx-auto relative z-10"
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          {/* Breadcrumbs */}
          <motion.div variants={itemVariants} className="flex items-center flex-wrap gap-2 mb-8 text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-medical-teal flex items-center gap-1.5 transition-colors">
              <Home size={12} /> Home
            </Link>
            <ChevronRight size={12} />
            <Link href="/blogs" className="hover:text-medical-teal transition-colors">Journal</Link>
            <ChevronRight size={12} />
            <span className="text-medical-teal truncate max-w-[200px] sm:max-w-xs">{blog.title}</span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full shadow-sm border border-slate-100 mb-8">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-medical-blue">{blog.category}</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-display text-4xl md:text-6xl lg:text-7xl mb-8 leading-[1.1]">
              {blog.title}
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center flex-wrap gap-6 text-[0.7rem] font-bold uppercase tracking-widest text-slate-500 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 inline-flex">
            <span className="flex items-center gap-2 text-medical-blue"><User size={14} className="text-medical-teal" /> {blog.author}</span>
            <span className="flex items-center gap-2"><Clock size={14} className="text-slate-400" /> {blog.date}</span>
            <span className="flex items-center gap-2 text-medical-teal">{blog.readTime}</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="section-padding !pt-0 relative z-10 pb-32">
        <div className="max-w-4xl mx-auto">
          
          {/* Featured Image */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-2xl mb-16 relative border-8 border-white bg-slate-100"
          >
            <Image src={blog.image} alt={blog.title} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 1024px" />
          </motion.div>

          {/* Article Body */}
          <article className="will-animate scroll-reveal reveal max-w-3xl mx-auto">
            {renderContent(blog.content)}
          </article>

          {/* CTA Box */}
          <div className="will-animate scroll-reveal reveal modern-card !bg-medical-blue text-white mt-16 text-center border-none shadow-2xl overflow-hidden p-12 md:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-slate-800 via-medical-blue to-medical-blue" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-medical-teal/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Need Expert Physiotherapy Care?</h3>
              <p className="text-slate-300 mb-8 font-normal">Book a clinical consultation with our specialists today and begin your recovery journey.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact" className="btn-modern bg-white text-medical-blue hover:bg-slate-50">Book Assessment</Link>
                <a href="tel:6378062237" className="btn-modern border border-white/20 text-white hover:bg-white/10"><Phone size={16} /> 6378062237</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RELATED POSTS ===== */}
      {relatedBlogs.length > 0 && (
        <section className="section-padding bg-white relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <div className="max-site">
            <div className="will-animate scroll-reveal reveal mb-12">
              <span className="text-label">Continue Reading</span>
              <h2 className="text-title text-4xl mt-2 text-medical-blue">Related Entries.</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedBlogs.map((b) => (
                <Link 
                  key={b.slug}
                  href={`/blogs/${b.slug}`}
                  className="will-animate scroll-reveal reveal modern-card group flex flex-col h-full border-slate-100 shadow-md bg-slate-50/50"
                >
                  <div className="aspect-[16/10] relative rounded-xl overflow-hidden mb-6 bg-slate-100">
                    <Image src={b.image} alt={b.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-medical-blue/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-medical-teal">{b.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-medical-blue group-hover:text-medical-teal transition-colors leading-tight mb-4">
                    {b.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-4">
                    <span className="text-slate-500 text-[0.65rem] font-bold uppercase tracking-widest">{b.date}</span>
                    <ArrowUpRight size={16} className="text-slate-300 group-hover:text-medical-teal" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
