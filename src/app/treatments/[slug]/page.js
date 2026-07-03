import Link from "next/link";
import { treatments as staticTreatments, getTreatmentBySlug as getStaticTreatment } from "@/data/treatments";
import { notFound } from "next/navigation";
import TreatmentDetailClient from "./TreatmentDetailClient";
import dbConnect from "@/lib/mongodb";
import Treatment from "@/models/Treatment";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    await dbConnect();
    const dbTreatments = await Treatment.find({}).lean();
    const dbSlugs = dbTreatments.map((t) => ({ slug: t.slug }));
    
    // Combine with static slugs
    const staticSlugs = staticTreatments.map((t) => ({ slug: t.slug }));
    const allSlugs = [...dbSlugs];
    const seen = new Set(dbSlugs.map(s => s.slug));
    for (const s of staticSlugs) {
      if (!seen.has(s.slug)) {
        allSlugs.push(s);
      }
    }
    return allSlugs;
  } catch (err) {
    console.error("Failed to generate static params for treatments:", err);
    return staticTreatments.map((t) => ({ slug: t.slug }));
  }
}

async function getTreatment(slug) {
  try {
    await dbConnect();
    const dbTreatment = await Treatment.findOne({ slug }).lean();
    if (dbTreatment) {
      return JSON.parse(JSON.stringify(dbTreatment));
    }
  } catch (err) {
    console.error("DB error getting treatment detail:", err);
  }
  return getStaticTreatment(slug);
}

async function getRelatedTreatments(slug) {
  try {
    await dbConnect();
    const dbTreatments = await Treatment.find({}).lean();
    const dbSlugs = new Set(dbTreatments.map(t => t.slug));
    const merged = JSON.parse(JSON.stringify(dbTreatments));
    for (const t of staticTreatments) {
      if (!dbSlugs.has(t.slug)) {
        merged.push(t);
      }
    }
    return merged.filter((t) => t.slug !== slug).slice(0, 3);
  } catch (err) {
    console.error("DB error getting related treatments:", err);
    return staticTreatments.filter((t) => t.slug !== slug).slice(0, 3);
  }
}

const mapImagePath = (img) => {
  if (!img) return img;
  return (img.startsWith("/") || img.startsWith("http")) ? img : `/api/media/${img}`;
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const treatment = await getTreatment(slug);
  if (!treatment) return { title: "Treatment Not Found" };
  return {
    title: `${treatment.title} | MyoMotion Physiotherapy`,
    description: treatment.shortDesc,
  };
}

export default async function TreatmentDetailPage({ params }) {
  const { slug } = await params;
  const treatment = await getTreatment(slug);
  if (!treatment) notFound();

  const related = await getRelatedTreatments(slug);

  // Map image paths for both main image and protocol image
  const serializedTreatment = {
    ...treatment,
    image: mapImagePath(treatment.image),
    protocolImage: mapImagePath(treatment.protocolImage),
  };

  const serializedRelated = related.map(t => ({
    ...t,
    image: mapImagePath(t.image),
    protocolImage: mapImagePath(t.protocolImage),
  }));

  return <TreatmentDetailClient treatment={serializedTreatment} related={serializedRelated} />;
}
