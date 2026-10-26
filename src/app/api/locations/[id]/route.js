import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Location from "@/models/Location";
import { locations as staticLocations } from "@/data/team";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    let location = null;

    if (isObjectId) {
      location = await Location.findById(id);
    }
    if (!location) {
      location = await Location.findOne({ slug: id });
    }
    if (!location) {
      const staticLoc = staticLocations.find((l) => l.slug === id);
      if (staticLoc) {
        return NextResponse.json({ ...staticLoc, isStatic: true });
      }
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    return NextResponse.json(location);
  } catch (error) {
    console.error("Location GET [id] Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    let data;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      data = await req.json();
    } else {
      const formData = await req.formData();
      data = Object.fromEntries(formData.entries());

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

    const cleanAreas = Array.isArray(areas)
      ? areas.map((a) => a.trim()).filter(Boolean)
      : [];

    const cleanServices = Array.isArray(services)
      ? services.map((s) => s.trim()).filter(Boolean)
      : [];

    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    let location = null;

    if (isObjectId) {
      location = await Location.findById(id);
    }
    if (!location) {
      location = await Location.findOne({ slug: id });
    }
    if (!location && slug) {
      location = await Location.findOne({ slug });
    }

    const targetSlug = slug || id;

    if (!location) {
      // Create new location in DB (e.g. converting initial static location to DB record)
      location = await Location.create({
        name: name || id,
        slug: targetSlug,
        brand: brand || "Healing Hands Physiotherapy",
        subtitle: subtitle || "",
        isPartner: Boolean(isPartner),
        description: description || "",
        address: address || "",
        pincode: pincode || "",
        hours: hours || "Mon–Sat: 8:00 AM – 2:00 PM & 4:00 PM – 8:30 PM",
        phone: phone || "+91 63780 62237",
        landmarks: cleanLandmarks,
        areas: cleanAreas,
        services: cleanServices,
        mapEmbedUrl: mapEmbedUrl || "",
      });

      return NextResponse.json(location);
    }

    // Update existing document
    if (name) location.name = name;
    if (slug) location.slug = slug;
    if (brand !== undefined) location.brand = brand;
    if (subtitle !== undefined) location.subtitle = subtitle;
    if (isPartner !== undefined) location.isPartner = Boolean(isPartner);
    if (description !== undefined) location.description = description;
    if (address) location.address = address;
    if (pincode !== undefined) location.pincode = pincode;
    if (hours !== undefined) location.hours = hours;
    if (phone !== undefined) location.phone = phone;
    if (landmarks !== undefined) location.landmarks = cleanLandmarks;
    if (areas !== undefined) location.areas = cleanAreas;
    if (services !== undefined) location.services = cleanServices;
    if (mapEmbedUrl !== undefined) location.mapEmbedUrl = mapEmbedUrl;

    await location.save();
    return NextResponse.json(location);
  } catch (error) {
    console.error("Location PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    if (isObjectId) {
      await Location.findByIdAndDelete(id);
    } else {
      await Location.findOneAndDelete({ slug: id });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Location DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
