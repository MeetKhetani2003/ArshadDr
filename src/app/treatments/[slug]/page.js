import Link from "next/link";
import { treatments, getTreatmentBySlug } from "@/data/treatments";
import { notFound } from "next/navigation";
import TreatmentDetailClient from "./TreatmentDetailClient";

export async function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug);
  if (!treatment) return { title: "Treatment Not Found" };
  return {
    title: `${treatment.title} | Healing Hands Physiotherapy`,
    description: treatment.shortDesc,
  };
}

export default async function TreatmentDetailPage({ params }) {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug);
  if (!treatment) notFound();

  const related = treatments.filter((t) => t.slug !== slug).slice(0, 3);

  return <TreatmentDetailClient treatment={treatment} related={related} />;
}
