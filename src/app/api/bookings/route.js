import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    // 1. Save to Database
    const booking = await Booking.create(data);

    // 2. Setup Email Transporter & Send (Optional/Graceful)
    if (process.env.EMAIL_SERVER_HOST && process.env.EMAIL_SERVER_USER) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_SERVER_HOST,
          port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
          secure: process.env.EMAIL_SERVER_PORT == "465",
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        });

        const mailOptions = {
          from: `"Healing Hands Physiotherapy" <${process.env.EMAIL_SERVER_USER}>`,
          to: data.email,
          subject: `Appointment Confirmation - Ref: ${booking._id.toString().slice(-6).toUpperCase()}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
              <div style="background-color: #0f172a; padding: 40px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Healing Hands</h1>
                <p style="color: #38bdf8; margin: 10px 0 0; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; font-weight: bold;">Physotherapy & Rehabilitation</p>
              </div>
              
              <div style="padding: 40px; background-color: #ffffff;">
                <h2 style="color: #0f172a; margin-top: 0;">Appointment Receipt</h2>
                <p style="color: #64748b; line-height: 1.6;">Dear <strong>${data.name}</strong>,</p>
                <p style="color: #64748b; line-height: 1.6;">Your appointment has been successfully scheduled. Please find the details of your booking below:</p>
                
                <div style="background-color: #f8fafc; border-radius: 8px; padding: 25px; margin: 30px 0;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase;">Reference ID</td>
                      <td style="padding: 8px 0; color: #0f172a; font-weight: bold; text-align: right;">#${booking._id.toString().slice(-6).toUpperCase()}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase;">Consultant</td>
                      <td style="padding: 8px 0; color: #0f172a; font-weight: bold; text-align: right;">${data.doctor}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase;">Treatment</td>
                      <td style="padding: 8px 0; color: #0f172a; font-weight: bold; text-align: right;">${data.treatment}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase;">Date & Time</td>
                      <td style="padding: 8px 0; color: #0f172a; font-weight: bold; text-align: right;">${data.date} at ${data.time}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase;">Mode</td>
                      <td style="padding: 8px 0; color: #0ea5e9; font-weight: bold; text-align: right;">${data.consultType} Consultation</td>
                    </tr>
                  </table>
                </div>
                
                <p style="color: #64748b; font-size: 14px;"><strong>Location:</strong> Jodhpur, Rajasthan (Multiple Hubs)</p>
                <p style="color: #64748b; font-size: 14px;"><strong>Contact:</strong> +91 95710 52222</p>
                
                <div style="margin-top: 40px; padding-top: 20px; border-t: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
                  This is a computer-generated receipt and does not require a physical signature.
                </div>
              </div>
              
              <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
                © ${new Date().getFullYear()} Healing Hands Physiotherapy. All Rights Reserved.
              </div>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error("Email Sending Failed:", emailError);
      }
    } else {
      console.warn("SMTP credentials not found. Skipping confirmation email.");
    }

    return NextResponse.json({ success: true, bookingId: booking._id }, { status: 201 });
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
