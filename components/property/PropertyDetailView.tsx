"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Property } from "@/store/propertyStore";
import { EMICalculator } from "./EMICalculator";
import { ScheduleVisitForm } from "./ScheduleVisitForm";
import { PropertyCard } from "./PropertyCard";
import { ALL_MOCK_PROPERTIES } from "@/lib/mockData";
import { 
  Badge 
} from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  Share2, 
  Eye, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Compass, 
  Waves, 
  ShieldCheck, 
  Activity,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  FileCheck,
  Video,
  X,
  Star,
  Users
} from "lucide-react";

interface PropertyDetailViewProps {
  property: Property;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({ property }) => {
  const [activeTab, setActiveTab] = useState<"photos" | "video">("photos");
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [visitFormOpen, setVisitFormOpen] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  // Formatting helper
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(price / 100000).toFixed(2)} L`;
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Compute related properties (max 3, same city or type, excluding current)
  const relatedProperties = ALL_MOCK_PROPERTIES
    .filter((p) => p.id !== property.id && (p.city === property.city || p.type === property.type))
    .slice(0, 3);

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"];

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-navy">
      {/* 1. Gallery Frame */}
      <section className="relative bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-8 pt-6 pb-2">
          
          {/* Main Display Window */}
          <div className="relative aspect-video sm:aspect-[21/9] w-full bg-slate-950 sm:rounded-2xl overflow-hidden shadow-2xl border border-white/5">
            {activeTab === "photos" ? (
              <>
                <Image
                  src={images[activeImgIdx]}
                  alt={`${property.title} - View ${activeImgIdx + 1}`}
                  fill
                  priority
                  className="object-cover cursor-zoom-in transition-transform duration-500 hover:scale-102"
                  onClick={() => setLightboxOpen(true)}
                />
                
                {/* Navigation Chevrons */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white transition-all z-10"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => setActiveImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white transition-all z-10"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-white p-6 text-center">
                <Video className="h-16 w-16 text-gold/80 animate-pulse mb-4" />
                <h4 className="font-bold text-lg font-serif">Luxury Video Walkthrough</h4>
                <p className="text-sm text-slate-400 max-w-sm mt-1 mb-4">A complete video walkthrough is prepared for premium buyers. Schedule site tour to see the layout live.</p>
                <Button onClick={() => setVisitFormOpen(true)} className="bg-gold hover:bg-gold-hover text-navy font-bold">
                  Book Free Site Tour
                </Button>
              </div>
            )}

            {/* Media Toggles */}
            <div className="absolute bottom-4 left-4 flex gap-2 z-10">
              <Button
                variant={activeTab === "photos" ? "default" : "secondary"}
                onClick={() => setActiveTab("photos")}
                className={`text-xs h-8 font-bold ${activeTab === "photos" ? "bg-gold text-navy hover:bg-gold" : "bg-black/50 hover:bg-black/75 text-white border-none"}`}
              >
                Photos ({images.length})
              </Button>
              <Button
                variant={activeTab === "video" ? "default" : "secondary"}
                onClick={() => setActiveTab("video")}
                className={`text-xs h-8 font-bold ${activeTab === "video" ? "bg-gold text-navy hover:bg-gold" : "bg-black/50 hover:bg-black/75 text-white border-none"}`}
              >
                Video Tour
              </Button>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {activeTab === "photos" && images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto py-4 px-4 sm:px-0 scrollbar-none scroll-smooth">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`relative h-16 w-24 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImgIdx === idx ? "border-gold scale-102 shadow-md shadow-gold/15" : "border-slate-800 hover:border-slate-600"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 2. Main Page Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Block (Details & Trust Panels) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header Content Box */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {property.isFeatured && (
                  <Badge className="bg-gold text-navy font-bold uppercase tracking-wider text-[10px]">
                    Featured Premium
                  </Badge>
                )}
                {property.isVerified && (
                  <Badge className="bg-emerald-600 text-white font-bold uppercase tracking-wider text-[10px] flex items-center gap-0.5">
                    <CheckCircle2 className="h-3 w-3 fill-emerald-500 text-white border-none" />
                    <span>Verified Listing</span>
                  </Badge>
                )}
                <span className="text-xs text-slate-500 font-medium bg-slate-200/50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {property.type}
                </span>
              </div>

              {/* Title & Actions */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/60 pb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-navy font-serif leading-tight">
                    {property.title}
                  </h1>
                  <p className="text-sm text-slate-500 flex items-center gap-1 mt-1.5 font-medium">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>{property.locality}, {property.city}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  {/* Share Trigger */}
                  <Button 
                    variant="outline" 
                    onClick={handleShare}
                    className="border-slate-200 bg-white hover:bg-slate-50 hover:text-gold gap-1.5 h-10 px-4 text-xs font-bold"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>{isCopied ? "Copied!" : "Share"}</span>
                  </Button>

                  {/* Wishlist Trigger */}
                  <Button 
                    variant="outline"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="border-slate-200 bg-white hover:bg-slate-50 h-10 px-4 text-xs font-bold gap-1.5"
                  >
                    <Heart className={`h-4.5 w-4.5 ${isWishlisted ? "text-red-500 fill-red-500" : "text-slate-600"}`} />
                    <span>{isWishlisted ? "Wishlisted" : "Save"}</span>
                  </Button>
                </div>
              </div>

              {/* Quick stats and Price info */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-navy text-white p-6 rounded-2xl border border-white/5 shadow-lg">
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Asking Price</span>
                  <span className="text-3xl font-extrabold text-gold tracking-tight mt-1 block">
                    {formatPrice(property.price)}
                  </span>
                </div>
                
                <div className="flex items-center gap-6 text-xs text-slate-300 font-medium">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gold" />
                    <span>Posted {property.postedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4 text-gold" />
                    <span>{property.views} Views</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Specifications Icon Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Bedrooms", val: property.bedrooms && property.bedrooms > 0 ? `${property.bedrooms} BHK` : "N/A" },
                { label: "Bathrooms", val: property.bathrooms && property.bathrooms > 0 ? `${property.bathrooms} Baths` : "N/A" },
                { label: "Super Area", val: `${property.areaSqFt} Sqft` },
                { label: "Property Type", val: property.type }
              ].map((spec, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{spec.label}</span>
                  <span className="text-base font-extrabold text-navy mt-1 block font-serif">{spec.val}</span>
                </div>
              ))}
            </div>

            {/* Tamil Nadu Verification Details (trust-critical) */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 border-b border-slate-100 p-5 flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-gold" />
                <h3 className="font-bold text-base font-serif text-navy">Tamil Nadu Legal Verifications</h3>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* DTCP */}
                <div className="flex gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    property.isDTCPApproved ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  }`}>
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">DTCP Approval</h4>
                    <p className="text-sm font-bold text-navy mt-0.5">
                      {property.isDTCPApproved ? "Approved by DTCP Offices" : "Verification Pending / N/A"}
                    </p>
                  </div>
                </div>

                {/* CMDA */}
                <div className="flex gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    property.cmdaStatus && property.cmdaStatus.includes("Approved") ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  }`}>
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">CMDA Clearance</h4>
                    <p className="text-sm font-bold text-navy mt-0.5">
                      {property.cmdaStatus || "Approval Pending"}
                    </p>
                  </div>
                </div>

                {/* RERA */}
                <div className="flex gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    property.isRERAApproved ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  }`}>
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">RERA Registration</h4>
                    <p className="text-sm font-bold text-navy mt-0.5">
                      {property.isRERAApproved && property.reraNumber ? (
                        <a 
                          href="https://www.rera.tn.gov.in" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gold hover:underline font-bold"
                        >
                          {property.reraNumber}
                        </a>
                      ) : (
                        "Pending / Exempted"
                      )}
                    </p>
                  </div>
                </div>

                {/* Patta */}
                <div className="flex gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    property.pattaNumber ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  }`}>
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Patta Number</h4>
                    <p className="text-sm font-bold text-navy mt-0.5">
                      {property.pattaNumber || "Checking Registry / Pending"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tamil Nadu Local Details Panel */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-base font-serif text-navy mb-5 border-b border-slate-100 pb-3">Local Utilities & Specs</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs font-medium">
                <div>
                  <span className="text-slate-400 block uppercase tracking-wider text-[9px] mb-1">Water Supply</span>
                  <span className="font-bold text-navy text-sm">{property.waterAvailability}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase tracking-wider text-[9px] mb-1">EB Connection</span>
                  <span className="font-bold text-navy text-sm">{property.ebConnection}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase tracking-wider text-[9px] mb-1">Vaastu Compliance</span>
                  <span className="font-bold text-navy text-sm flex items-center gap-1">
                    <Compass className="h-3.5 w-3.5 text-amber-500" />
                    {property.isVaastuCompliant ? "Vaastu Compliant" : "Not Compliant"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase tracking-wider text-[9px] mb-1">Flood Safety</span>
                  <span className="font-bold text-navy text-sm flex items-center gap-1">
                    <Waves className="h-3.5 w-3.5 text-blue-500" />
                    {property.isFloodSafe ? "Flood-Safe Zone" : "Standard Zone"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase tracking-wider text-[9px] mb-1">Road Width</span>
                  <span className="font-bold text-navy text-sm">{property.roadWidth}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase tracking-wider text-[9px] mb-1">Drainage</span>
                  <span className="font-bold text-navy text-sm">{property.drainage}</span>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
              <h3 className="font-bold text-base font-serif text-navy">Description</h3>
              <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-2">
                <p className={showFullDesc ? "" : "line-clamp-3"}>{property.description}</p>
                <button
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="text-gold hover:text-gold-hover font-semibold text-xs transition-colors mt-2"
                >
                  {showFullDesc ? "Read less" : "Read more"}
                </button>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-base font-serif text-navy mb-5">Premium Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-700">
                {[
                  "Power Backup",
                  "24/7 Security Patrol",
                  "Lush Gardens",
                  "Water Treatment Plant",
                  "Private Covered Parking",
                  "Modular Kitchen",
                  "Clubhouse / Gym",
                  "Children's Play Area"
                ].map((am, i) => (
                  <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-3 rounded-lg">
                    <CheckCircle2 className="h-4 w-4 text-gold flex-shrink-0" />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* EMI Calculator */}
            <EMICalculator propertyPrice={property.price} />

            {/* Nearby Places */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-base font-serif text-navy">Nearby Destinations</h3>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "International School (Walkable)",
                  "Multi-Speciality Hospital (2.5 km)",
                  "Ancient Temple (1.2 km)",
                  "Metro Station (3.8 km)",
                  "Beach / Seafront Promenade (1.5 km)",
                  "Domestic IT Corridor (5.0 km)"
                ].map((place, idx) => (
                  <span 
                    key={idx}
                    className="bg-slate-100 text-navy/80 text-[11px] font-semibold px-3 py-1.5 rounded-full border border-slate-200/50"
                  >
                    {place}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Agent Panel & Site booking) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Agent Details Card */}
            <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden rounded-2xl">
              <CardContent className="p-6 space-y-6">
                
                {/* Header Profile */}
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden border border-slate-150 flex-shrink-0 bg-slate-100">
                    <Image
                      src={property.agent.avatar}
                      alt={property.agent.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy font-serif text-base leading-snug">{property.agent.name}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{property.agent.agency}</p>
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-600 font-semibold">
                      <div className="flex items-center text-amber-500">
                        <Star className="h-3.5 w-3.5 fill-amber-500" />
                        <span className="ml-1 text-navy font-bold">{property.agent.rating}</span>
                      </div>
                      <span className="text-slate-300">|</span>
                      <span className="text-slate-500 flex items-center gap-1 font-medium">
                        <Users className="h-3.5 w-3.5" />
                        {property.agent.deals} Deals Done
                      </span>
                    </div>
                  </div>
                </div>

                {/* Instant Actions */}
                <div className="space-y-3">
                  <a href={`tel:${property.agent.phone}`} className="block">
                    <Button className="w-full bg-navy hover:bg-navy/90 text-white font-bold h-11 rounded-lg gap-2 text-xs">
                      <Phone className="h-4 w-4" />
                      <span>Instant Phone Call</span>
                    </Button>
                  </a>
                  
                  <a 
                    href={`https://wa.me/${property.agent.whatsapp}?text=Hi%20${property.agent.name},%20I%2527m%20interested%20in%20${encodeURIComponent(property.title)}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block"
                  >
                    <Button variant="outline" className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-500/10 font-bold h-11 rounded-lg gap-2 text-xs">
                      <MessageCircle className="h-4 w-4 text-emerald-500 fill-emerald-500" />
                      <span>WhatsApp Discussion</span>
                    </Button>
                  </a>

                  <Button 
                    onClick={() => setVisitFormOpen(true)}
                    className="w-full bg-gold hover:bg-gold-hover text-navy font-extrabold h-11 rounded-lg mt-2 text-xs shadow-md shadow-gold/15"
                  >
                    Schedule Free Visit
                  </Button>
                </div>

              </CardContent>
            </Card>

            {/* Static Google Map Placeholder */}
            <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden rounded-2xl">
              <CardContent className="p-0">
                <div className="relative aspect-video w-full bg-slate-100 flex items-center justify-center">
                  {/* Mock google map image */}
                  <Image
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80"
                    alt="Property Map Location Placeholder"
                    fill
                    className="object-cover brightness-95 opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <div className="bg-navy/90 backdrop-blur-md px-3.5 py-2.5 rounded-lg border border-white/10 text-white text-xs font-bold text-center space-y-1">
                      <MapPin className="h-5 w-5 text-gold mx-auto" />
                      <span>View Map Location</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

        </div>

        {/* 3. Related Properties Section */}
        {relatedProperties.length > 0 && (
          <section className="mt-20 border-t border-slate-200 pt-16">
            <h3 className="text-2xl font-bold font-serif text-navy mb-8">Related Premium Listings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {relatedProperties.map((prop) => (
                <PropertyCard 
                  key={prop.id} 
                  property={{
                    id: prop.id,
                    title: prop.title,
                    slug: prop.slug,
                    price: prop.price,
                    city: prop.city,
                    locality: prop.locality,
                    bedrooms: prop.bedrooms,
                    bathrooms: prop.bathrooms,
                    areaSqFt: prop.areaSqFt,
                    type: prop.type,
                    images: prop.images,
                    isRERAApproved: prop.isRERAApproved,
                    isDTCPApproved: prop.isDTCPApproved,
                    isVerified: prop.isVerified,
                    isFeatured: prop.isFeatured,
                    postedDate: prop.postedDate
                  }} 
                />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Visit booking Form Modal */}
      <ScheduleVisitForm
        isOpen={visitFormOpen}
        onClose={() => setVisitFormOpen(false)}
        propertyId={property.id}
        propertyTitle={property.title}
        agentName={property.agent.name}
      />

      {/* Lightbox photo modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-6">
          <div className="flex justify-between items-center text-white pb-4">
            <span className="text-xs font-bold uppercase tracking-wider">
              {property.title} ({activeImgIdx + 1} of {images.length})
            </span>
            <button 
              onClick={() => setLightboxOpen(false)}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-all"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="relative flex-grow w-full max-h-[80vh] aspect-video sm:rounded-xl overflow-hidden self-center">
            <Image
              src={images[activeImgIdx]}
              alt="Lightbox View"
              fill
              className="object-contain"
            />
          </div>

          <div className="flex justify-center gap-4 text-white pt-4">
            <button
              onClick={() => setActiveImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-lg text-xs font-bold"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              className="bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-lg text-xs font-bold"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sticky CTA Sheet bar for easy access */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-xl flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Asking Price</span>
          <span className="text-lg font-extrabold text-gold leading-none">{formatPrice(property.price)}</span>
        </div>
        <div className="flex items-center gap-2">
          <a href={`tel:${property.agent.phone}`} className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-navy">
            <Phone className="h-5 w-5" />
          </a>
          <Button 
            onClick={() => setVisitFormOpen(true)}
            className="bg-gold hover:bg-gold-hover text-navy font-bold px-6 h-10 rounded-lg text-xs"
          >
            Book Free Site Visit
          </Button>
        </div>
      </div>

    </div>
  );
};
