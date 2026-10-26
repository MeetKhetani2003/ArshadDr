import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Location from "@/models/Location";
import { locations as staticLocations } from "@/data/team";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const dbLocations = await Location.find({}).sort({ createdAt: 1 });

    const merged = JSON.parse(JSON.stringify(dbLocations));
    const dbSlugs = new Set(dbLocations.map((l) => l.slug));

    for (const loc of staticLocations) {
      if (!dbSlugs.has(loc.slug)) {
        merged.push({ ...loc, isStatic: true });
      }
    }

    return NextResponse.json(merged);
  } catch (error) {
    console.error("Locations GET Error:", error);
    // If DB fails, fallback to static locations
    return NextResponse.json(staticLocations);
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    let data;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      data = await req.json();
    } else {
      const formData = await req.formData();
      data = Object.fromEntries(formData.entries());

      // Parse JSON fields if they were submitted as strings
      if (typeof data.landmarks === "string") {
        try {
          data.landmarks = JSON.parse(data.landmarks);
        } catch {
          data.landmarks = [];
        }
      }
      if (typeof data.areas === "string") {
        try {
          data.areas = JSON.parse(data.areas);
        } catch {
          data.areas = data.areas.split(",").map((s) => s.trim()).filter(Boolean);
        }
      }
      if (typeof data.services === "string") {
        try {
          data.services = JSON.parse(data.services);
        } catch {
          data.services = data.services.split("\n").map((s) => s.trim()).filter(Boolean);
        }
      }
      if (typeof data.isPartner === "string") {
        data.isPartner = data.isPartner === "true";
      }
    }

    const {
      name,
      slug,
      brand,
      subtitle,
      isPartner,
      description,
      address,
      pincode,
      hours,
      phone,
      landmarks,
      areas,
      services,
      mapEmbedUrl,
    } = data;

    if (!name || !slug || !address) {
      return NextResponse.json(
        { error: "Name, slug, and address are required fields." },
        { status: 400 }
      );
    }

    // Clean landmarks
    const cleanLandmarks = Array.isArray(landmarks)
      ? landmarks
          .map((lm) => {
            if (typeof lm === "string") return { name: lm.trim(), tag: "LANDMARK" };
            return {
              name: (lm.name || "").trim(),
              tag: (lm.tag || "LANDMARK").trim(),
            };
          })
          .filter((lm) => lm.name.length > 0)
      : [];

    // Clean areas
    const cleanAreas = Array.isArray(areas)
      ? areas.map((a) => a.trim()).filter(Boolean)
      : [];

    // Clean services
    const cleanServices = Array.isArray(services)
      ? services.map((s) => s.trim()).filter(Boolean)
      : [];

    // Check if location with this slug exists; update if so, otherwise create
    const existing = await Location.findOne({ slug });

    if (existing) {
      existing.name = name;
      existing.brand = brand || existing.brand;
      existing.subtitle = subtitle !== undefined ? subtitle : existing.subtitle;
      existing.isPartner = isPartner !== undefined ? isPartner : existing.isPartner;
      existing.description = description !== undefined ? description : existing.description;
      existing.address = address;
      existing.pincode = pincode !== undefined ? pincode : existing.pincode;
      existing.hours = hours || existing.hours;
      existing.phone = phone || existing.phone;
      existing.landmarks = cleanLandmarks;
      existing.areas = cleanAreas;
      if (cleanServices.length > 0) existing.services = cleanServices;
      if (mapEmbedUrl !== undefined) existing.mapEmbedUrl = mapEmbedUrl;

      await existing.save();
      return NextResponse.json(existing, { status: 200 });
    }

    const newLocation = await Location.create({
      name,
      slug,
      brand: brand || "Healing Hands Physiotherapy",
      subtitle: subtitle || "",
      isPartner: Boolean(isPartner),
      description: description || "",
      address,
      pincode: pincode || "",
      hours: hours || "Mon–Sat: 8:00 AM – 2:00 PM & 4:00 PM – 8:30 PM",
      phone: phone || "+91 63780 62237",
      landmarks: cleanLandmarks,
      areas: cleanAreas,
      services: cleanServices,
      mapEmbedUrl: mapEmbedUrl || "",
    });

    return NextResponse.json(newLocation, { status: 201 });
  } catch (error) {
    console.error("Location POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
