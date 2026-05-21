import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    imageId: {
      type: String, // GridFS file ID
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    journey: {
      type: [String], // Array of strings representing journey milestones
      default: [],
    },
    rating: {
      type: String,
      default: "4.9/5.0",
    },
    patients: {
      type: String,
      default: "2,500+",
    },
    successRate: {
      type: String,
      default: "99%",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);
