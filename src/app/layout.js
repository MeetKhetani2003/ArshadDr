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
  metadataBase: new URL("https://arshad-dr.vercel.app"),
  title: "Physiotherapy in Jodhpur | Healing Hands Physiotherapy – Dr. Asad Solanki",
  description: "Healing Hands Physiotherapy offers evidence-based physiotherapy in Jodhpur: orthopedic, neuro, pediatric, sports and women's health rehab, plus home visits. Call 6378-062237.",
  authors: [{ name: "paleradesign.com", url: "https://paleradesign.com" }],
  keywords: "physiotherapy, Jodhpur, rehabilitation, orthopedic, neurological, pediatric, women's health, Dr. Asad Solanki, जोधपुर में फिजियोथेरेपी",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/logo-emblem.png",
  },
  openGraph: {
    title: "Physiotherapy in Jodhpur | Healing Hands Physiotherapy – Dr. Asad Solanki",
    description: "Healing Hands Physiotherapy offers evidence-based physiotherapy in Jodhpur: orthopedic, neuro, pediatric, sports and women's health rehab, plus home visits. Call 6378-062237.",
    url: "https://arshad-dr.vercel.app",
    siteName: "Healing Hands Physiotherapy",
    images: [
      {
        url: "/Logo.png",
        width: 1952,
        height: 665,
        alt: "Healing Hands Physiotherapy Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Physiotherapy in Jodhpur | Healing Hands Physiotherapy – Dr. Asad Solanki",
    description: "Healing Hands Physiotherapy offers evidence-based physiotherapy in Jodhpur: orthopedic, neuro, pediatric, sports and women's health rehab, plus home visits. Call 6378-062237.",
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
        <link rel="preload" href="/logo-header.png" as="image" />
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
