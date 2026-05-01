import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Healing Hands Physiotherapy | Advanced Rehabilitation Center in Jodhpur",
  description: "Healing Hands Physiotherapy offers advanced, evidence-based physiotherapy and rehabilitation services in Jodhpur. Specializing in Neuro, Ortho, Pediatric & Women's Health rehab under Dr. Asad Solanki.",
  keywords: "physiotherapy, Jodhpur, rehabilitation, orthopedic, neurological, pediatric, women's health, Dr. Asad Solanki",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
