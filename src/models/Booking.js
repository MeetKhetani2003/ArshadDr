import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  treatment: { type: String, required: true },
  doctor: { type: String, required: true },
  consultType: { type: String, enum: ["Online", "Offline"], required: true },
  problem: { type: String },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
