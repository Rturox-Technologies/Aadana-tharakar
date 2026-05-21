"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, CheckCircle, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface PropertySummary {
  id: string;
  title: string;
  slug: string;
  price: number;
  city: string;
  locality: string;
  bedrooms?: number;
  bathrooms?: number;
  areaSqFt: number;
  type: string; // Apartment, Villa, Plot, Commercial, House
  images: string[];
  isRERAApproved: boolean;
  isDTCPApproved: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  postedDate: string;
}

interface PropertyCardProps {
  property: PropertySummary;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(price / 100000).toFixed(1)} L`;
  };

  const displayImage = property.images && property.images.length > 0 
    ? property.images[0] 
    : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200/80 hover:border-gold/45 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative">
      {/* Aspect ratio frame for image */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <Image
          src={displayImage}
          alt={property.title}
          fill
          sizes="(max-w-768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {property.isFeatured && (
            <Badge className="bg-gold text-navy font-bold uppercase tracking-wider text-[9px] flex items-center gap-0.5 border-none shadow-sm">
              <Flame className="h-3 w-3 fill-navy" />
              <span>Premium</span>
            </Badge>
          )}
          {property.isRERAApproved && (
            <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider text-[9px] border-none shadow-sm">
              RERA
            </Badge>
          )}
          {property.isDTCPApproved && (
            <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-wider text-[9px] border-none shadow-sm">
              DTCP
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md text-slate-600 hover:text-red-500 hover:scale-105 active:scale-95 transition-all z-10"
          aria-label="Add to wishlist"
        >
          <Heart 
            className={`h-4.5 w-4.5 transition-colors ${
              isWishlisted ? "text-red-500 fill-red-500" : "text-slate-600"
            }`} 
          />
        </button>

        {/* Gradient shadow on bottom of image for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
      </div>

      {/* Details Box */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          {/* Tag & City line */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gold uppercase tracking-wider">
              {property.type}
            </span>
            {property.isVerified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <CheckCircle className="h-3.5 w-3.5 fill-emerald-500 text-white" />
                <span>Verified</span>
              </span>
            )}
          </div>

          {/* Title with link */}
          <Link href={`/property/${property.slug}`} className="block group-hover:text-gold transition-colors">
            <h3 className="text-base sm:text-lg font-bold text-navy font-serif line-clamp-1 leading-snug">
              {property.title}
            </h3>
          </Link>

          {/* Locality */}
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1.5">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <span className="line-clamp-1">{property.locality}, {property.city}</span>
          </p>

          {/* Core Specs */}
          <div className="grid grid-cols-3 gap-2 py-3 mt-4 border-t border-b border-slate-100 text-slate-600 text-xs">
            <div className="text-center border-r border-slate-100">
              <span className="text-slate-400 block uppercase tracking-wider text-[9px]">Bedrooms</span>
              <span className="font-bold text-navy text-sm">
                {property.bedrooms && property.bedrooms > 0 ? `${property.bedrooms} BHK` : "N/A"}
              </span>
            </div>
            <div className="text-center border-r border-slate-100">
              <span className="text-slate-400 block uppercase tracking-wider text-[9px]">Bathrooms</span>
              <span className="font-bold text-navy text-sm">
                {property.bathrooms && property.bathrooms > 0 ? property.bathrooms : "N/A"}
              </span>
            </div>
            <div className="text-center">
              <span className="text-slate-400 block uppercase tracking-wider text-[9px]">Area</span>
              <span className="font-bold text-navy text-sm">{property.areaSqFt} <span className="text-[10px] font-normal text-slate-400">sqft</span></span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA Line */}
        <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-50">
          <div>
            <span className="text-slate-400 block uppercase tracking-wider text-[9px]">Price</span>
            <span className="text-xl font-extrabold text-gold tracking-tight">{formatPrice(property.price)}</span>
          </div>

          <Link href={`/property/${property.slug}`}>
            <span className="inline-flex items-center gap-1 bg-navy hover:bg-gold text-white hover:text-navy font-bold text-xs px-3.5 py-2 rounded-md transition-all">
              <span>View Details</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
