import mongoose from "mongoose";

const LandmarkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tag: { type: String, default: "LANDMARK" },
  },
  { _id: false }
);

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
  { _id: false }
);

const LocationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    brand: {
      type: String,
      default: "Healing Hands Physiotherapy",
    },
    subtitle: {
      type: String,
      default: "",
    },
    isPartner: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      default: "",
    },
    hours: {
      type: String,
      default: "Mon–Sat: 8:00 AM – 2:00 PM & 4:00 PM – 8:30 PM",
    },
    phone: {
      type: String,
      default: "+91 63780 62237",
    },
    landmarks: {
      type: [LandmarkSchema],
      default: [],
    },
    areas: {
      type: [String],
      default: [],
    },
    services: {
      type: [String],
      default: [],
    },
    contacts: {
      type: [ContactSchema],
      default: [],
    },
    mapEmbedUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Location || mongoose.model("Location", LocationSchema);
