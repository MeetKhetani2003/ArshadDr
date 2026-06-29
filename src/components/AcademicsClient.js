"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GalleryClient from "./GalleryClient";
import Image from "next/image";
import { 
  Calendar, ChevronRight, BookOpen, CheckCircle2, 
  Activity, Heart, FileText, AlertTriangle 
} from "lucide-react";
import { studyNotes } from "@/data/academics";

export default function AcademicsClient({ initialEvents, initialClinicalItems, initialEventItems }) {
  const [activeTab, setActiveTab] = useState("events"); // "events" | "clinical" | "notes"
  const [activeEventId, setActiveEventId] = useState(initialEvents?.[0]?._id || null);
  const [activeNoteSlug, setActiveNoteSlug] = useState(studyNotes[0].slug);

  const activeEvent = initialEvents.find(e => e._id === activeEventId);
  const activeEventMedia = initialEventItems.filter(item => item.eventId === activeEventId);
  const activeNote = studyNotes.find(n => n.slug === activeNoteSlug);

  return (
    <div className="space-y-12">
      {/* Top Level Tabs */}
      <div className="flex justify-center items-center">
        <div className="relative flex p-1.5 md:p-2 bg-white rounded-full shadow-lg border border-slate-100 max-w-2xl w-full mx-auto">
          <button
            onClick={() => setActiveTab("events")}
            className={`relative flex-1 py-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-full select-none z-10 ${
              activeTab === "events" ? "text-white" : "text-slate-500 hover:text-medical-blue"
            }`}
          >
            {activeTab === "events" && (
              <motion.div
                layoutId="academicsTabPill"
                className="absolute inset-0 bg-medical-blue rounded-full -z-10 shadow-lg shadow-medical-blue/20"
                transition={{ type: "spring", stiffness: 350, damping: 26 }}
              />
            )}
            Event Gallery
          </button>
          
          <button
            onClick={() => setActiveTab("clinical")}
            className={`relative flex-1 py-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-full select-none z-10 ${
              activeTab === "clinical" ? "text-white" : "text-slate-500 hover:text-medical-blue"
            }`}
          >
            {activeTab === "clinical" && (
              <motion.div
                layoutId="academicsTabPill"
                className="absolute inset-0 bg-medical-teal rounded-full -z-10 shadow-lg shadow-medical-teal/20"
                transition={{ type: "spring", stiffness: 350, damping: 26 }}
              />
            )}
            Clinical Gallery
          </button>

          <button
            onClick={() => setActiveTab("notes")}
            className={`relative flex-1 py-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-full select-none z-10 ${
              activeTab === "notes" ? "text-white" : "text-slate-500 hover:text-medical-blue"
            }`}
          >
            {activeTab === "notes" && (
              <motion.div
                layoutId="academicsTabPill"
                className="absolute inset-0 bg-cyan-600 rounded-full -z-10 shadow-lg shadow-cyan-600/20"
                transition={{ type: "spring", stiffness: 350, damping: 26 }}
              />
            )}
            Syllabus Notes
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "clinical" && (
          <motion.div
            key="clinical"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-8"
          >
            <GalleryClient initialItems={initialClinicalItems} disableFetch={true} />
          </motion.div>
        )}

        {activeTab === "events" && (
          <motion.div
            key="events"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 pt-8"
          >
            {/* LEFT SIDEBAR - EVENTS LIST */}
            <div className="w-full lg:w-1/4 shrink-0 space-y-4">
              <h3 className="text-xl font-bold text-medical-blue mb-6 px-2">Recent Events</h3>
              {initialEvents.length === 0 ? (
                <div className="text-sm text-slate-400 italic px-2">No events scheduled yet.</div>
              ) : (
                <div className="flex flex-col gap-3">
                  {initialEvents.map((event) => (
                    <button
                      key={event._id}
                      onClick={() => setActiveEventId(event._id)}
                      className={`text-left p-5 rounded-2xl transition-all duration-300 flex items-center justify-between group ${
                        activeEventId === event._id
                          ? "bg-medical-blue text-white shadow-xl shadow-medical-blue/10 scale-105"
                          : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100 hover:border-medical-teal hover:text-medical-blue hover:shadow-md"
                      }`}
                    >
                      <div className="flex flex-col gap-1 pr-4">
                        <span className="font-bold text-sm lg:text-base leading-tight">
                          {event.title}
                        </span>
                        <span className={`text-[0.65rem] uppercase tracking-wider font-bold ${
                          activeEventId === event._id ? "text-medical-teal" : "text-slate-400"
                        }`}>
                          <Calendar size={10} className="inline mr-1" />
                          {new Date(event.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <ChevronRight size={18} className={`transition-transform duration-300 ${
                        activeEventId === event._id ? "text-white translate-x-1" : "text-slate-300 group-hover:text-medical-teal"
                      }`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT MAIN AREA - SELECTED EVENT DETAILS */}
            <div className="flex-1 w-full flex flex-col gap-10 lg:pl-4">
              <AnimatePresence mode="wait">
                {activeEvent ? (
                  <motion.div
                    key={activeEvent._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    {/* Top: Cover Photo & Description */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col gap-10 items-center">
                      <div className="w-full h-[200px] md:h-auto aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg relative shrink-0">
                        <Image
                          src={`/api/media/${activeEvent.coverImageId}`}
                          alt={activeEvent.title}
                          fill
                          className="object-contain transition-transform duration-700"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h2 className="text-4xl lg:text-5xl font-bold text-medical-blue mb-6">
                          {activeEvent.title}
                        </h2>
                        <div className="w-20 h-2 bg-medical-teal rounded-full mb-8" />
                        <p className="text-slate-500 leading-relaxed text-lg lg:text-xl">
                          {activeEvent.description || "No description provided for this event."}
                        </p>
                      </div>
                    </div>

                    {/* Bottom: Event Specific Gallery */}
                    <div className="bg-slate-50/50 rounded-[3rem] p-8 md:p-12 border border-slate-100">
                      <div className="flex items-center gap-4 mb-10">
                        <h3 className="text-2xl font-bold text-medical-blue">Event Media</h3>
                        <span className="px-3 py-1 bg-white rounded-full text-[0.65rem] font-bold tracking-widest uppercase text-medical-teal shadow-sm border border-slate-100">
                          {activeEventMedia.length} Items
                        </span>
                      </div>

                      <GalleryClient
                        key={activeEvent._id}
                        initialItems={activeEventMedia}
                        disableFetch={true}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex-1 bg-white rounded-[3rem] border border-slate-100 flex items-center justify-center min-h-[400px] text-slate-400 flex-col gap-4 shadow-sm">
                    <Calendar size={48} className="text-slate-200" />
                    <p className="text-lg font-medium">Select an event to view details</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {activeTab === "notes" && (
          <motion.div
            key="notes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 pt-8"
          >
            {/* LEFT SIDEBAR - TOPICS LIST */}
            <div className="w-full lg:w-1/4 shrink-0 space-y-4">
              <h3 className="text-xl font-bold text-medical-blue mb-6 px-2 flex items-center gap-2">
                <BookOpen size={20} className="text-cyan-600" />
                Clinical Syllabus
              </h3>
              <div className="flex flex-col gap-3">
                {studyNotes.map((note) => (
                  <button
                    key={note.slug}
                    onClick={() => setActiveNoteSlug(note.slug)}
                    className={`text-left p-5 rounded-2xl transition-all duration-300 flex items-center justify-between group ${
                      activeNoteSlug === note.slug
                        ? "bg-cyan-600 text-white shadow-xl shadow-cyan-600/10 scale-105"
                        : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100 hover:border-cyan-600 hover:text-medical-blue hover:shadow-md"
                    }`}
                  >
                    <span className="font-bold text-sm lg:text-base leading-tight">
                      {note.title}
                    </span>
                    <ChevronRight size={18} className={`transition-transform duration-300 ${
                      activeNoteSlug === note.slug ? "text-white translate-x-1" : "text-slate-300 group-hover:text-cyan-600"
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT MAIN AREA - DETAILED NOTES VIEW */}
            <div className="flex-1 w-full flex flex-col gap-10 lg:pl-4">
              <AnimatePresence mode="wait">
                {activeNote ? (
                  <motion.div
                    key={activeNote.slug}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/40"
                  >
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-2 text-cyan-600 font-bold uppercase tracking-widest text-[0.65rem] mb-3">
                        <FileText size={12} />
                        Study Material
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-medical-blue mb-4">
                        {activeNote.title}
                      </h2>
                      <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">
                        {activeNote.description}
                      </p>
                    </div>

                    {/* Definition callout */}
                    <div className="p-6 rounded-2xl bg-cyan-50/50 border border-cyan-100 flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shrink-0">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-medical-blue text-sm uppercase tracking-wider mb-2">Disease Definition</h4>
                        <p className="text-sm text-slate-700 leading-relaxed font-medium">
                          {activeNote.definition}
                        </p>
                      </div>
                    </div>

                    {/* Pathophysiology splits */}
                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-medical-blue flex items-center gap-2">
                          <div className="w-1.5 h-3 bg-cyan-600 rounded-full" />
                          Mechanism & Etiology
                        </h3>
                        <ul className="space-y-3">
                          {activeNote.pathophysiology.causes.map((cause, i) => (
                            <li key={i} className="flex gap-2.5 text-sm text-slate-600 font-medium items-start">
                              <span className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>
                              {cause}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-medical-blue flex items-center gap-2">
                          <div className="w-1.5 h-3 bg-cyan-600 rounded-full" />
                          Pathological Effects
                        </h3>
                        <ul className="space-y-3">
                          {activeNote.pathophysiology.effects.map((effect, i) => (
                            <li key={i} className="flex gap-2.5 text-sm text-slate-600 font-medium items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 shrink-0 mt-2" />
                              {effect}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Triggers (specific to Asthma) */}
                    {activeNote.triggers && (
                      <div className="space-y-6 pt-4 border-t border-slate-100">
                        <h3 className="text-lg font-bold text-medical-blue flex items-center gap-2">
                          <AlertTriangle size={18} className="text-amber-500" />
                          Common Triggers of Asthma
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-3">
                          {activeNote.triggers.map((trigger, idx) => (
                            <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                              <h4 className="font-bold text-xs text-cyan-600 uppercase tracking-widest mb-3 pb-2 border-b border-slate-200/60">
                                {trigger.type}
                              </h4>
                              <ul className="space-y-2 text-xs text-slate-600 font-semibold">
                                {trigger.items.map((item, i) => (
                                  <li key={i} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-600 shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Components (COPD/Asthma specializations) */}
                    {activeNote.components && (
                      <div className="space-y-6 pt-4 border-t border-slate-100">
                        <h3 className="text-lg font-bold text-medical-blue">Clinical Components / Classifications</h3>
                        <div className="grid gap-6 sm:grid-cols-2">
                          {activeNote.components.map((comp, idx) => (
                            <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                              <h4 className="font-bold text-sm text-medical-blue">{comp.title}</h4>
                              <p className="text-xs text-slate-500 leading-relaxed font-semibold">{comp.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Signs and Symptoms */}
                    <div className="space-y-6 pt-4 border-t border-slate-100">
                      <h3 className="text-xl font-bold text-medical-blue flex items-center gap-2">
                        <Activity size={20} className="text-cyan-600" />
                        Clinical Signs & Symptoms
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {activeNote.symptoms.map((symptom, i) => (
                          <div key={i} className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-1">
                            <h4 className="font-bold text-medical-blue text-sm">
                              {symptom.name}
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                              {symptom.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Physiotherapy Goals */}
                    <div className="space-y-6 pt-4 border-t border-slate-100">
                      <h3 className="text-xl font-bold text-medical-blue flex items-center gap-2">
                        <CheckCircle2 size={20} className="text-cyan-600" />
                        Physiotherapy Goals
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {activeNote.physioGoals.map((goal, i) => (
                          <div key={i} className="flex gap-2.5 items-start">
                            <CheckCircle2 size={16} className="text-cyan-600 shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-700 font-bold uppercase tracking-tight leading-normal">
                              {goal}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Treatment Techniques & Exercises */}
                    {activeNote.techniques && (
                      <div className="space-y-8 pt-4 border-t border-slate-100">
                        <h3 className="text-xl font-bold text-medical-blue flex items-center gap-2">
                          <Activity size={20} className="text-cyan-600" />
                          Physiotherapy Treatment Protocols
                        </h3>
                        <div className="space-y-6">
                          {activeNote.techniques.map((techCat, idx) => (
                            <div key={idx} className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100 space-y-4">
                              <h4 className="text-sm font-bold text-cyan-600 uppercase tracking-widest flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                                {techCat.category}
                              </h4>
                              <div className="grid gap-4 sm:grid-cols-2">
                                {techCat.items.map((item, i) => (
                                  <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-3">
                                    <div>
                                      <h5 className="font-bold text-medical-blue text-sm mb-2">{item.name}</h5>
                                      {item.technique && (
                                        <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                                          <span className="text-slate-700 font-bold">Technique:</span> {item.technique}
                                        </p>
                                      )}
                                      {item.desc && (
                                        <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                                          {item.desc}
                                        </p>
                                      )}
                                    </div>
                                    {item.benefits && (
                                      <div className="pt-2 border-t border-slate-50 text-[0.7rem] text-cyan-600 font-bold tracking-wide">
                                        <span className="text-slate-500 font-medium">Benefits:</span> {item.benefits}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Exacerbation warning (for COPD) */}
                    {activeNote.exacerbation && (
                      <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/80 flex gap-4 items-start pt-4 border-t border-slate-100">
                        <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                          <AlertTriangle size={20} />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wider">COPD Exacerbation Alert</h4>
                          <p className="text-xs text-slate-700 font-medium">
                            <span className="font-bold text-amber-900">Definition:</span> {activeNote.exacerbation.definition}
                          </p>
                          <p className="text-xs text-slate-700 font-medium">
                            <span className="font-bold text-amber-900">Causes:</span> {activeNote.exacerbation.causes.join(", ")}
                          </p>
                          <p className="text-xs text-slate-700 font-medium">
                            <span className="font-bold text-amber-900">Preventive Advice:</span> {activeNote.exacerbation.prevention.join(", ")}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Prognosis */}
                    {activeNote.prognosis && (
                      <div className="p-6 rounded-2xl bg-cyan-900 text-cyan-100 flex gap-4 items-center">
                        <Heart size={24} className="text-cyan-300 shrink-0" />
                        <p className="text-xs font-semibold leading-relaxed">
                          <span className="font-bold text-white uppercase tracking-wider block mb-1">Clinical Prognosis</span>
                          {activeNote.prognosis}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="flex-1 bg-white rounded-[3rem] border border-slate-100 flex items-center justify-center min-h-[400px] text-slate-400 flex-col gap-4 shadow-sm">
                    <BookOpen size={48} className="text-slate-200" />
                    <p className="text-lg font-medium">Select a topic to read study notes</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
