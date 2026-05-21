import React from "react";
import { Metadata } from "next";
import CitySeoLanding from "@/components/property/CitySeoLanding";

const CITY = "Coimbatore";
const TYPE = "Villa";
const TAMIL_TITLE = "கோயம்புத்தூர் சொகுசு வில்லாக்கள்";
const HERO_IMAGE = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80";
const META_DESC = "Explore verified luxury villas and independent houses for sale in Coimbatore. Discover premium residential communities in Race Course and Saravanampatti with 24/7 Siruvani water supply. கோயம்புத்தூர் சொகுசு வில்லாக்கள்.";

export const metadata: Metadata = {
  title: `Luxury Villas & Independent Houses in Coimbatore for Sale | Aadana Tharakar`,
  description: META_DESC,
  alternates: {
    canonical: "/villas-in-coimbatore",
  },
  openGraph: {
    title: `Luxury Villas & Independent Houses in Coimbatore for Sale | Aadana Tharakar`,
    description: META_DESC,
    url: "https://aadanatharakar.com/villas-in-coimbatore",
    siteName: "Aadana Tharakar",
    images: [
      {
        url: HERO_IMAGE,
        width: 1200,
        height: 630,
        alt: `Luxury Villas in Coimbatore, Tamil Nadu`,
      }
    ],
    locale: "en_IN",
    type: "website",
  }
};

export default function VillasInCoimbatorePage() {
  return (
    <CitySeoLanding
      city={CITY}
      type={TYPE}
      tamilTitle={TAMIL_TITLE}
      heroImage={HERO_IMAGE}
      metaDesc={META_DESC}
    />
  );
}
