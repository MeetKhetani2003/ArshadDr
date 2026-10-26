import { locations } from "@/data/team";
import { notFound } from "next/navigation";
import LocationDetailClient from "./LocationDetailClient";

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) {
    return {
      title: "Location Not Found | Healing Hands Physiotherapy",
      description: "Healing Hands Physiotherapy centers in Jodhpur, Rajasthan.",
    };
  }

  const title = `Physiotherapy in ${location.name}, Jodhpur | Healing Hands Physiotherapy`;
  const description = `Visit Healing Hands Physiotherapy in ${location.name}, Jodhpur. Specialized orthopedic, neurological, pediatric and sports physiotherapy rehabilitation under Dr. Asad Solanki. Call +91 63780 62237.`;

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
  const location = locations.find((l) => l.slug === slug);

  if (!location) {
    notFound();
  }

  return <LocationDetailClient location={location} />;
}
