import mongoose from "mongoose";

const TreatmentSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "🩺",
    },
    shortDesc: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Can be GridFS image ID or static path
    },
    protocolImage: {
      type: String, // Can be GridFS image ID or static path
    },
    color: {
      type: String,
      default: "#0d9488",
    },
    conditions: {
      type: [String],
      default: [],
    },
    techniques: {
      type: [String],
      default: [],
    },
    fullDescription: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Treatment || mongoose.model("Treatment", TreatmentSchema);
