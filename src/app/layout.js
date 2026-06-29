import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookingProvider } from "@/components/BookingContext";
import LaunchEvent from "@/components/LaunchEvent";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Myomotion | Healing Hands Physiotherapy | Advanced Rehabilitation Center",
  description: "Healing Hands Physiotherapy offers advanced, evidence-based physiotherapy and rehabilitation services in Jodhpur. Specializing in Neuro, Ortho, Pediatric & Women's Health rehab under Dr. Asad Solanki.",
  authors: [{ name: "mkdigitalnexus.in" }],
  keywords: "physiotherapy, Jodhpur, rehabilitation, orthopedic, neurological, pediatric, women's health, Dr. Asad Solanki",
  openGraph: {
    title: "Myomotion | Healing Hands Physiotherapy | Advanced Rehabilitation Center",
    description: "Healing Hands Physiotherapy offers advanced, evidence-based physiotherapy and rehabilitation services in Jodhpur. Specializing in Neuro, Ortho, Pediatric & Women's Health rehab under Dr. Asad Solanki.",
    url: "https://www.myomotion.co.in",
    siteName: "Myomotion By Healing Hands",
    images: [
      {
        url: "https://www.myomotion.co.in/Logo.png",
        width: 800,
        height: 600,
        alt: "Myomotion Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">
        {/* <LaunchEvent /> */}
        <BookingProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </BookingProvider>
      </body>
    </html>
  );
}
