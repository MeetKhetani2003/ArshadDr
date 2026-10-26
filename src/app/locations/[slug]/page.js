import { locations as staticLocations } from "@/data/team";
import { notFound } from "next/navigation";
import LocationDetailClient from "./LocationDetailClient";
import dbConnect from "@/lib/mongodb";
import Location from "@/models/Location";

export const dynamicParams = true;
export const revalidate = 0;

async function getLocation(slug) {
  try {
    await dbConnect();
    const dbLoc = await Location.findOne({ slug }).lean();
    if (dbLoc) {
      return JSON.parse(JSON.stringify(dbLoc));
    }
  } catch (err) {
    console.error("DB error fetching location:", err);
  }
  return staticLocations.find((l) => l.slug === slug);
}

export async function generateStaticParams() {
  try {
    await dbConnect();
    const dbLocations = await Location.find({}).lean();
    const dbSlugs = dbLocations.map((l) => ({ slug: l.slug }));
    const staticSlugs = staticLocations.map((l) => ({ slug: l.slug }));
    const allSlugs = [...dbSlugs];
    const seen = new Set(dbSlugs.map((s) => s.slug));
    for (const s of staticSlugs) {
      if (!seen.has(s.slug)) {
        allSlugs.push(s);
      }
    }
    return allSlugs;
  } catch (err) {
    console.error("Error generating static params for locations:", err);
    return staticLocations.map((l) => ({ slug: l.slug }));
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const location = await getLocation(slug);

  if (!location) {
    return {
      title: "Location Not Found | Healing Hands Physiotherapy",
      description: "Healing Hands Physiotherapy centers in Jodhpur, Rajasthan.",
    };
  }

  const title = `Physiotherapy in ${location.name}, Jodhpur | Healing Hands Physiotherapy`;
  const description = `${location.description || `Visit Healing Hands Physiotherapy in ${location.name}, Jodhpur. Specialized orthopedic, neurological, pediatric and sports physiotherapy rehabilitation under Dr. Asad Solanki.`} Call ${location.phone || "+91 63780 62237"}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ["/Logo.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/Logo.png"],
    },
  };
}

export default async function LocationPage({ params }) {
  const { slug } = await params;
  const location = await getLocation(slug);

  if (!location) {
    notFound();
  }

  return <LocationDetailClient location={location} />;
}
