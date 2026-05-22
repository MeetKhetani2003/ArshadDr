import mongoose from "mongoose";

const AcademicsEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  coverImageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "media.files",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.AcademicsEvent || mongoose.model("AcademicsEvent", AcademicsEventSchema);
