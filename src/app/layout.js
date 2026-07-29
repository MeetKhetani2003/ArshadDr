import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookingProvider } from "@/components/BookingContext";
// import LaunchEvent from "@/components/LaunchEvent";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.myomotion.co.in"),
  title: "MyoMotion | MyoMotion Physiotherapy | Advanced Rehabilitation Center",
  description: "MyoMotion Physiotherapy offers advanced, evidence-based physiotherapy and rehabilitation services in Jodhpur. Specializing in Neuro, Ortho, Pediatric & Women's Health rehab under Dr. Asad Solanki.",
  authors: [{ name: "mkdigitalnexus.in" }],
  keywords: "physiotherapy, Jodhpur, rehabilitation, orthopedic, neurological, pediatric, women's health, Dr. Asad Solanki",
  openGraph: {
    title: "MyoMotion | MyoMotion Physiotherapy | Advanced Rehabilitation Center",
    description: "MyoMotion Physiotherapy offers advanced, evidence-based physiotherapy and rehabilitation services in Jodhpur. Specializing in Neuro, Ortho, Pediatric & Women's Health rehab under Dr. Asad Solanki.",
    url: "https://www.myomotion.co.in",
    siteName: "MyoMotion",
    images: [
      {
        url: "/Logo.png",
        width: 800,
        height: 600,
        alt: "MyoMotion Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyoMotion | MyoMotion Physiotherapy | Advanced Rehabilitation Center",
    description: "MyoMotion Physiotherapy offers advanced, evidence-based physiotherapy and rehabilitation services in Jodhpur. Specializing in Neuro, Ortho, Pediatric & Women's Health rehab under Dr. Asad Solanki.",
    images: ["/Logo.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
    >
      <head>
        <link rel="preload" href="/logonav.png" as="image" />
        <link rel="preload" href="/healingheading.png" as="image" />
        <link rel="preload" href="/logofooter.png" as="image" />
        <link rel="preload" href="/Logo.png" as="image" />
      </head>
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
