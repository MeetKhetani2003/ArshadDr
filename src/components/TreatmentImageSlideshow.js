"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

// General pool of beautiful therapist and treatment session photos
const therapistPool = [
  "/doctor/doc1.jpg",
  "/doctor/doc3.jpg",
  "/doctor/doc4.jpg",
  "/doctor/doc5.jpg",
  "/doctor/doc6.jpg",
  "/doctor/doc7.jpg",
  "/patient_therapy.png",
  "/home_physiotherapy.png",
  "/movement_analysis.png",
  "/clinic_interior.png",
  "/team.png",
  "/treatment_process_v2.png",
];

// Helper to shuffle array
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function TreatmentImageSlideshow({ defaultImage, slug, alt }) {
  const [images, setImages] = useState([defaultImage]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const list = [defaultImage];
    
    // Fetch doctor profiles from API to show actual doctor images in slideshow
    fetch("/api/doctors", { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const drImages = data.map(doc => {
            const img = doc.imageId;
            if (!img) return null;
            return (img.startsWith("/") || img.startsWith("http")) ? img : `/api/media/${img}`;
          }).filter(Boolean);
          
          if (drImages.length > 0) {
            const shuffledDr = shuffle(drImages);
            let added = 0;
            for (const img of shuffledDr) {
              if (img !== defaultImage && added < 3) {
                list.push(img);
                added++;
              }
            }
            setImages(shuffle(list));
            return;
          }
        }
        fallbackToTherapistPool();
      })
      .catch(err => {
        console.error("Failed to fetch doctors for slideshow, using fallback:", err);
        fallbackToTherapistPool();
      });

    function fallbackToTherapistPool() {
      const shuffledPool = shuffle(therapistPool);
      let added = 0;
      for (const img of shuffledPool) {
        if (img !== defaultImage && added < 3) {
          list.push(img);
          added++;
        }
      }
      setImages(shuffle(list));
    }
  }, [defaultImage]);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500); // Cross-fade every 4.5 seconds
    
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="absolute inset-0 w-full h-full">
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={img}
            alt={alt}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-1000"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
