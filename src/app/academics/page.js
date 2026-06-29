import dbConnect from "@/lib/mongodb";
import AcademicsEvent from "@/models/AcademicsEvent";
import GalleryItem from "@/models/GalleryItem";
import AcademicsClient from "@/components/AcademicsClient";
import Image from "next/image";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Academics & Events | MayoMotion Physiotherapy",
  description: "Browse our academic events, recovery photos, and clinical case study videos showcasing MayoMotion's advanced rehabilitation solutions in Jodhpur.",
  keywords: "physiotherapy academics, events, clinical gallery, rehabilitation videos, Jodhpur physical therapy",
};

async function getAcademicsData() {
  try {
    const conn = await dbConnect();
    if (!conn) {
      return { events: [], clinicalItems: [], eventItems: [] };
    }
    
    // Fetch Events
    const events = await AcademicsEvent.find({}).sort({ createdAt: -1 });
    const formattedEvents = events.map(doc => ({
      _id: doc._id.toString(),
      title: doc.title,
      description: doc.description || "",
      coverImageId: doc.coverImageId.toString(),
      createdAt: doc.createdAt.toISOString()
    }));

    // Fetch Clinical Items
    const clinicalItemsDocs = await GalleryItem.find({ category: "clinical" }).sort({ createdAt: -1 });
    const formattedClinicalItems = clinicalItemsDocs.map(doc => ({
      _id: doc._id.toString(),
      type: doc.type,
      title: doc.title || "",
      imageId: doc.imageId ? doc.imageId.toString() : null,
      videoUrl: doc.videoUrl || "",
      createdAt: doc.createdAt.toISOString()
    }));

    // Fetch Event Items
    const eventItemsDocs = await GalleryItem.find({ category: "event" }).sort({ createdAt: -1 });
    const formattedEventItems = eventItemsDocs.map(doc => ({
      _id: doc._id.toString(),
      eventId: doc.eventId.toString(),
      type: doc.type,
      title: doc.title || "",
      imageId: doc.imageId ? doc.imageId.toString() : null,
      videoUrl: doc.videoUrl || "",
      createdAt: doc.createdAt.toISOString()
    }));

    return {
      events: formattedEvents,
      clinicalItems: formattedClinicalItems,
      eventItems: formattedEventItems
    };
  } catch (error) {
    console.error("Failed to load academics data on server:", error);
    return { events: [], clinicalItems: [], eventItems: [] };
  }
}

export default async function AcademicsPage() {
  const { events, clinicalItems, eventItems } = await getAcademicsData();

  return (
    <main className="bg-medical-surface min-h-screen selection:bg-medical-teal selection:text-white">
      {/* ===== IMMERSIVE ACADEMICS HERO ===== */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-medical-blue">
        {/* Full-bleed background image with modern cinematic overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/gallery_hero_bg.png"
            alt="Advanced Rehabilitation Technology"
            fill
            priority
            className="object-cover object-center scale-105 pointer-events-none"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-blue/95 via-medical-blue/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/40 to-transparent z-10" />
        </div>

        {/* Cinematic Grid/Mesh Backdrop */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10"
          style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-medical-teal/15 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none z-10" />

        <div className="max-site relative z-20 pt-24 pb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-sm border border-white/10 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-medical-teal animate-pulse" />
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white">Academics & Gallery</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              Academics <br />
              <span className="text-medical-teal">Portfolio.</span>
            </h1>
            
            <p className="text-slate-200 text-lg md:text-xl leading-relaxed font-normal max-w-2xl">
              Explore our latest academic events, recovery snapshots, 
              advanced equipment displays, and expert clinical case study videos.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ACADEMICS CONTENT ===== */}
      <section className="section-padding relative z-10 bg-mesh">
        <div className="max-site">
          <AcademicsClient 
            initialEvents={events} 
            initialClinicalItems={clinicalItems}
            initialEventItems={eventItems} 
          />
        </div>
      </section>
    </main>
  );
}
