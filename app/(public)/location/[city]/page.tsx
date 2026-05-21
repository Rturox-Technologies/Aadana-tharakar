import React from "react";
import { Metadata } from "next";
import { LocationPageClient } from "@/components/property/LocationPageClient";

interface PageProps {
  params: Promise<{ city: string }>;
}

const capitalizeCity = (city: string) => {
  return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const rawCity = resolvedParams.city;
  const capitalizedCity = capitalizeCity(rawCity);

  const localDescriptions: Record<string, string> = {
    Chennai: "Discover premium beachside villas along ECR, high-end apartments in Nungambakkam, and commercial spaces on OMR, Chennai. சென்னை ரியல் எஸ்டேட்.",
    Coimbatore: "Explore standard residential villas, high-rise apartments, and plots in Race Course and Saravanampatti, Coimbatore. கோயம்புத்தூர் மனைகள்.",
    Madurai: "Buy verified houses, flats, and plots near Meenakshi Amman Temple and KK Nagar, Madurai. Fully Vaastu compliant properties. மதுரை வீடுகள்.",
    Salem: "Browse verified residential plots, independent houses, and flats for sale and rent in Salem, Tamil Nadu. சேலம் சொத்துக்கள்.",
    Trichy: "Find premium properties, apartments, and DTCP approved layouts in Rockfort city Trichy, Tamil Nadu. திருச்சி ரியல் எஸ்டேட்.",
    Tirunelveli: "Explore premium DTCP approved housing plots and properties in KTC Nagar, Tirunelveli, Tamil Nadu. திருநெல்வேலி மனைகள்."
  };

  const desc = localDescriptions[capitalizedCity] || `Explore premium properties, plots, apartments, and independent villas for buy and rent in ${capitalizedCity}, Tamil Nadu. DTCP & RERA verified.`;

  return {
    title: `Properties in ${capitalizedCity}, Tamil Nadu — Buy & Rent | Aadana Tharakar`,
    description: desc,
    alternates: {
      canonical: `/location/${rawCity.toLowerCase()}`,
    },
    openGraph: {
      title: `Properties in ${capitalizedCity}, Tamil Nadu — Buy & Rent | Aadana Tharakar`,
      description: desc,
      url: `https://aadanatharakar.com/location/${rawCity.toLowerCase()}`,
      siteName: "Aadana Tharakar",
      images: [
        {
          url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&h=630&q=80",
          width: 1200,
          height: 630,
          alt: `Properties in ${capitalizedCity}, Tamil Nadu`,
        }
      ],
      locale: "en_IN",
      type: "website",
    }
  };
}

export default async function LocationPage({ params }: PageProps) {
  const resolvedParams = await params;
  const capitalizedCity = capitalizeCity(resolvedParams.city);

  return <LocationPageClient city={capitalizedCity} />;
}
