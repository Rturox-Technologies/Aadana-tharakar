import React from "react";
import { Metadata } from "next";
import CitySeoLanding from "@/components/property/CitySeoLanding";

const CITY = "Madurai";
const TYPE = "Plot";
const TAMIL_TITLE = "மதுரை பிரீமியம் பிளாட்டுகள்";
const HERO_IMAGE = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80";
const META_DESC = "Discover DTCP approved premium residential plots and layout sites for sale in Madurai. Build your dream house near KK Nagar and major transit corridors. மதுரை பிரீமியம் பிளாட்டுகள்.";

export const metadata: Metadata = {
  title: `DTCP Approved Residential Plots & Land in Madurai for Sale | Aadana Tharakar`,
  description: META_DESC,
  alternates: {
    canonical: "/plots-in-madurai",
  },
  openGraph: {
    title: `DTCP Approved Residential Plots & Land in Madurai for Sale | Aadana Tharakar`,
    description: META_DESC,
    url: "https://aadanatharakar.com/plots-in-madurai",
    siteName: "Aadana Tharakar",
    images: [
      {
        url: HERO_IMAGE,
        width: 1200,
        height: 630,
        alt: `Residential Plots in Madurai, Tamil Nadu`,
      }
    ],
    locale: "en_IN",
    type: "website",
  }
};

export default function PlotsInMaduraiPage() {
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
