import mongoose from "mongoose";

const GalleryItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "media.files",
    required: false,
  },
  videoUrl: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    enum: ["clinical", "event"],
    default: "clinical",
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicsEvent",
    required: function() {
      return this.category === "event";
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.GalleryItem || mongoose.model("GalleryItem", GalleryItemSchema);
