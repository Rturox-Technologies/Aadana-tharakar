import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ALL_MOCK_PROPERTIES } from "@/lib/mockData";
import { PropertyDetailView } from "@/components/property/PropertyDetailView";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import JsonLd from "@/components/common/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const formatPrice = (price: number) => {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(2)} Cr`;
  }
  return `${(price / 100000).toFixed(2)} L`;
};

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const property = ALL_MOCK_PROPERTIES.find((p) => p.slug === resolvedParams.slug);

  if (!property) {
    return {
      title: "Property Not Found | Aadana Tharakar Real Estate",
      description: "The requested premium real estate property could not be found on Aadana Tharakar.",
    };
  }

  const formattedPrice = formatPrice(property.price);
  const pageTitle = `${property.title} in ${property.city} — ₹${formattedPrice} | Aadana Tharakar`;
  const pageDesc = property.description.substring(0, 160);
  const imageUrl = property.images && property.images.length > 0 ? property.images[0] : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=630&q=80";

  return {
    title: pageTitle,
    description: pageDesc,
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: `https://aadanatharakar.com/property/${property.slug}`,
      siteName: "Aadana Tharakar",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${property.title} in ${property.city}`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDesc,
      images: [imageUrl],
    },
    alternates: {
      canonical: `/property/${property.slug}`,
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const property = ALL_MOCK_PROPERTIES.find((p) => p.slug === resolvedParams.slug);

  if (!property) {
    return (
      <div className="min-h-[70vh] bg-navy flex flex-col items-center justify-center text-center p-6 text-white">
        <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold via-amber-500 to-gold" />
          
          <Home className="h-16 w-16 text-gold/80 mx-auto mb-6 animate-pulse" />
          
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight mb-3">
            சொத்து கிடைக்கவில்லை
          </h2>
          <h3 className="text-lg font-bold text-gold/90 font-serif tracking-wide mb-4">
            Property Not Found
          </h3>
          
          <p className="text-sm text-slate-400 leading-relaxed mb-8">
            The premium property you are looking for does not exist, has been sold, or is currently undergoing verified legal audits.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/properties" className="w-full sm:w-auto">
              <Button className="w-full bg-gold hover:bg-gold-hover text-navy font-bold h-11 px-6 rounded-lg gap-2 text-xs transition-all shadow-lg shadow-gold/15">
                <ArrowLeft className="h-4 w-4" />
                <span>All Properties</span>
              </Button>
            </Link>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full border-slate-700 hover:bg-white/10 text-white font-bold h-11 px-6 rounded-lg text-xs transition-all">
                <span>Go to Homepage</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Define JSON-LD structures
  const realEstateListingSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": property.description,
    "url": `https://aadanatharakar.com/property/${property.slug}`,
    "image": property.images,
    "datePosted": property.postedDate,
    "numberOfItems": 1,
    "itemListElement": [
      {
        "@type": "SingleFamilyResidence",
        "name": property.title,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": property.locality,
          "addressRegion": property.city,
          "addressCountry": "IN"
        },
        "numberOfBedrooms": property.bedrooms,
        "numberOfBathrooms": property.bathrooms,
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": property.areaSqFt,
          "unitCode": "FTK"
        },
        "offers": {
          "@type": "Offer",
          "price": property.price,
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "validFrom": property.postedDate
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://aadanatharakar.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Properties",
        "item": "https://aadanatharakar.com/properties"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": property.title,
        "item": `https://aadanatharakar.com/property/${property.slug}`
      }
    ]
  };

  const agentSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": property.agent.agency,
    "image": property.agent.avatar,
    "telephone": property.agent.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.city,
      "addressCountry": "IN"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": property.agent.rating,
      "reviewCount": property.agent.deals
    }
  };

  return (
    <>
      <JsonLd schema={realEstateListingSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={agentSchema} />
      <PropertyDetailView property={property} />
    </>
  );
}
