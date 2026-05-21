import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import nodemailer from "nodemailer";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const data = await req.json(); // { date, time, status }

    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const previousStatus = booking.status;

    booking.date = data.date || booking.date;
    booking.time = data.time || booking.time;
    booking.status = data.status || booking.status;

    await booking.save();

    // Trigger Email if status changed to Scheduled
    if (booking.status === "Scheduled" && previousStatus !== "Scheduled") {
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
            to: booking.email,
            subject: `Appointment Scheduled - Ref: ${booking._id.toString().slice(-6).toUpperCase()}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                <div style="background-color: #0f172a; padding: 40px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Healing Hands</h1>
                  <p style="color: #38bdf8; margin: 10px 0 0; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; font-weight: bold;">Physotherapy & Rehabilitation</p>
                </div>
                
                <div style="padding: 40px; background-color: #ffffff;">
                  <h2 style="color: #0f172a; margin-top: 0;">Appointment Confirmed</h2>
                  <p style="color: #64748b; line-height: 1.6;">Dear <strong>${booking.name}</strong>,</p>
                  <p style="color: #64748b; line-height: 1.6;">Great news! Your appointment has been officially scheduled. Please find your finalized booking details below:</p>
                  
                  <div style="background-color: #f8fafc; border-radius: 8px; padding: 25px; margin: 30px 0;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase;">Reference ID</td>
                        <td style="padding: 8px 0; color: #0f172a; font-weight: bold; text-align: right;">#${booking._id.toString().slice(-6).toUpperCase()}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase;">Consultant</td>
                        <td style="padding: 8px 0; color: #0f172a; font-weight: bold; text-align: right;">${booking.doctor}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase;">Treatment</td>
                        <td style="padding: 8px 0; color: #0f172a; font-weight: bold; text-align: right;">${booking.treatment}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase;">Date & Time</td>
                        <td style="padding: 8px 0; color: #0f172a; font-weight: bold; text-align: right; background: #e0f2fe; padding: 4px 8px; border-radius: 4px;">${booking.date} at ${booking.time}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase;">Mode</td>
                        <td style="padding: 8px 0; color: #0ea5e9; font-weight: bold; text-align: right;">${booking.consultType} Consultation</td>
                      </tr>
                    </table>
                  </div>
                  
                  <p style="color: #64748b; font-size: 14px;"><strong>Location:</strong> Jodhpur, Rajasthan (Multiple Hubs)</p>
                  <p style="color: #64748b; font-size: 14px;"><strong>Contact:</strong> +91 95710 52222</p>
                  
                  <div style="margin-top: 40px; padding-top: 20px; border-t: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
                    Please arrive 10 minutes prior to your scheduled time.
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
      }
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Booking PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
