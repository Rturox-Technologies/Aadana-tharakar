import React from "react";
import { Metadata } from "next";
import CitySeoLanding from "@/components/property/CitySeoLanding";

const CITY = "Chennai";
const TYPE = "Apartment";
const TAMIL_TITLE = "சென்னை அடுக்குமாடி குடியிருப்புகள்";
const HERO_IMAGE = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80";
const META_DESC = "Explore premium RERA & CMDA approved luxury flats and apartments for sale in Chennai. Discover the best residential communities in Nungambakkam, ECR, and OMR. சென்னை அடுக்குமாடி குடியிருப்புகள்.";

export const metadata: Metadata = {
  title: `Verified Flats & Apartments in Chennai for Sale — ₹45L to ₹5Cr | Aadana Tharakar`,
  description: META_DESC,
  alternates: {
    canonical: "/flats-in-chennai",
  },
  openGraph: {
    title: `Verified Flats & Apartments in Chennai for Sale | Aadana Tharakar`,
    description: META_DESC,
    url: "https://aadanatharakar.com/flats-in-chennai",
    siteName: "Aadana Tharakar",
    images: [
      {
        url: HERO_IMAGE,
        width: 1200,
        height: 630,
        alt: `Flats and Apartments in Chennai, Tamil Nadu`,
      }
    ],
    locale: "en_IN",
    type: "website",
  }
};

export default function FlatsInChennaiPage() {
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
