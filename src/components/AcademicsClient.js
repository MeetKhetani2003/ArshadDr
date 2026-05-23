"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GalleryClient from "./GalleryClient";
import Image from "next/image";
import { Calendar, ChevronRight } from "lucide-react";

export default function AcademicsClient({ initialEvents, initialClinicalItems, initialEventItems }) {
  const [activeTab, setActiveTab] = useState("events"); // "events" | "clinical"
  const [activeEventId, setActiveEventId] = useState(initialEvents?.[0]?._id || null);

  const activeEvent = initialEvents.find(e => e._id === activeEventId);
  const activeEventMedia = initialEventItems.filter(item => item.eventId === activeEventId);

  return (
    <div className="space-y-12">
      {/* Top Level Tabs */}
      <div className="flex justify-center items-center">
        <div className="relative flex p-2 bg-white rounded-full shadow-lg border border-slate-100 max-w-lg w-full">
          <button
            onClick={() => setActiveTab("events")}
            className={`relative flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-full select-none z-10 ${activeTab === "events" ? "text-white" : "text-slate-500 hover:text-medical-blue"
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
            className={`relative flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-full select-none z-10 ${activeTab === "clinical" ? "text-white" : "text-slate-500 hover:text-medical-blue"
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
                      className={`text-left p-5 rounded-2xl transition-all duration-300 flex items-center justify-between group ${activeEventId === event._id
                        ? "bg-medical-blue text-white shadow-xl shadow-medical-blue/10 scale-105"
                        : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100 hover:border-medical-teal hover:text-medical-blue hover:shadow-md"
                        }`}
                    >
                      <div className="flex flex-col gap-1 pr-4">
                        <span className="font-bold text-sm lg:text-base leading-tight">
                          {event.title}
                        </span>
                        <span className={`text-[0.65rem] uppercase tracking-wider font-bold ${activeEventId === event._id ? "text-medical-teal" : "text-slate-400"
                          }`}>
                          <Calendar size={10} className="inline mr-1" />
                          {new Date(event.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <ChevronRight size={18} className={`transition-transform duration-300 ${activeEventId === event._id ? "text-white translate-x-1" : "text-slate-300 group-hover:text-medical-teal"
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
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col  gap-10 items-center">
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
                        key={activeEvent._id} // force remount when event changes
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
      </AnimatePresence>
    </div>
  );
}
