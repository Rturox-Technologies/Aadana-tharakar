"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Building, 
  Home, 
  CheckCircle, 
  MessageCircle, 
  Users, 
  Award, 
  ShieldCheck, 
  Star, 
  ArrowRight,
  ShieldAlert,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import JsonLd from "@/components/common/JsonLd";

// Mock featured properties for the homepage
const FEATURED_PROPERTIES = [
  {
    id: "prop-1",
    title: "Vasantham Premium Gold Villa",
    price: 18500000, // 1.85 Cr
    city: "Chennai",
    locality: "ECR, Akkarai",
    bedrooms: 4,
    bathrooms: 4,
    areaSqFt: 3600,
    type: "Villa",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    isRERAApproved: true,
    isDTCPApproved: true,
    isFeatured: true,
  },
  {
    id: "prop-2",
    title: "Marutham Royal Heights",
    price: 12000000, // 1.2 Cr
    city: "Coimbatore",
    locality: "Race Course",
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 2200,
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    isRERAApproved: true,
    isDTCPApproved: false,
    isFeatured: true,
  },
  {
    id: "prop-3",
    title: "Nellai Majestic Meadows",
    price: 4500000, // 45 Lakhs
    city: "Tirunelveli",
    locality: "KTC Nagar",
    bedrooms: 0, // Plot
    bathrooms: 0,
    areaSqFt: 2400,
    type: "Plot",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    isRERAApproved: false,
    isDTCPApproved: true,
    isFeatured: true,
  }
];

const TRENDING_LOCATIONS = [
  { name: "Chennai", subtitle: "Capital City", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80" },
  { name: "Coimbatore", subtitle: "Manchester of South", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80" },
  { name: "Madurai", subtitle: "Temple City", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80" },
  { name: "Trichy", subtitle: "Rockfort City", image: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=600&q=80" },
  { name: "Salem", subtitle: "Mango City", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" },
  { name: "Tirunelveli", subtitle: "Halwa City", image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=600&q=80" },
];

export default function Homepage() {
  const router = useRouter();
  const [purpose, setPurpose] = useState<"buy" | "rent">("buy");
  const [city, setCity] = useState<string>("Chennai");
  const [type, setType] = useState<string>("all");

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(price / 100000).toFixed(1)} L`;
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      purpose,
      city,
      type: type !== "all" ? type : "",
    });
    router.push(`/properties?${queryParams.toString()}`);
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aadana Tharakar",
    "url": "https://aadanatharakar.com",
    "logo": "https://aadanatharakar.com/logo.png",
    "sameAs": [
      "https://facebook.com/nilamnai",
      "https://twitter.com/nilamnai",
      "https://instagram.com/nilamnai"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-98400-12345",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["Tamil", "English"]
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-navy overflow-hidden">
      <JsonLd schema={organizationSchema} />
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-navy text-white pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero_landscape.png"
            alt="Tamil Nadu Western Ghats Landscape"
            fill
            priority
            className="object-cover opacity-35 filter brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-semibold tracking-wider uppercase mb-2">
                  <Award className="h-3.5 w-3.5" />
                  <span>Tamil Nadu's Most Trusted Luxury Portal</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-serif">
                  உங்கள் கனவு வீடு <br />
                  <span className="text-gold">Your Dream Home in Tamil Nadu</span>
                </h1>
                <p className="text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
                  Discover premium RERA and DTCP verified luxury apartments, villas, and premium plots across Chennai, Coimbatore, Madurai, and more. Transparent pricing and local expertise.
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Link href="/properties">
                  <Button className="bg-gold hover:bg-gold-hover text-navy font-bold px-8 py-6 rounded-md shadow-lg shadow-gold/25 transition-all gap-2 text-base">
                    <span>Explore Properties</span>
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                
                <a 
                  href="https://wa.me/919876543210?text=Hello%20Aadana Tharakar,%20I%20am%20interested%20in%20properties!" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 font-semibold px-6 py-6 rounded-md transition-all gap-2 text-base bg-navy/60 backdrop-blur-sm">
                    <MessageCircle className="h-5 w-5 text-emerald-500 fill-emerald-500" />
                    <span>Chat with us in Tamil</span>
                  </Button>
                </a>
              </motion.div>
            </div>

            {/* Right Search Bar Column */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-navy/80 backdrop-blur-lg border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl relative"
              >
                {/* Purpose Toggle */}
                <div className="flex bg-slate-800/80 p-1.5 rounded-lg mb-6 border border-white/5">
                  <button
                    onClick={() => setPurpose("buy")}
                    className={`flex-1 text-center py-2.5 rounded-md font-semibold text-sm transition-all duration-300 ${
                      purpose === "buy" 
                        ? "bg-gold text-navy shadow-md shadow-gold/20" 
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Buy Property
                  </button>
                  <button
                    onClick={() => setPurpose("rent")}
                    className={`flex-1 text-center py-2.5 rounded-md font-semibold text-sm transition-all duration-300 ${
                      purpose === "rent" 
                        ? "bg-gold text-navy shadow-md shadow-gold/20" 
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Rent Property
                  </button>
                </div>

                <div className="space-y-5">
                  {/* City Select */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 tracking-wider uppercase block">
                      Select Location
                    </label>
                    <Select value={city} onValueChange={(val) => setCity(val ?? "")}>
                      <SelectTrigger className="w-full bg-slate-900/60 border-slate-700 text-white rounded-lg py-6 focus:ring-gold focus:border-gold">
                        <SelectValue placeholder="Choose a City" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-800 text-white">
                        <SelectItem value="Chennai">Chennai (சென்னை)</SelectItem>
                        <SelectItem value="Coimbatore">Coimbatore (கோயம்புத்தூர்)</SelectItem>
                        <SelectItem value="Madurai">Madurai (மதுரை)</SelectItem>
                        <SelectItem value="Salem">Salem (சேலம்)</SelectItem>
                        <SelectItem value="Trichy">Trichy (திருச்சி)</SelectItem>
                        <SelectItem value="Tirunelveli">Tirunelveli (திருநெல்வேலி)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Property Type Select */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 tracking-wider uppercase block">
                      Property Type
                    </label>
                    <Select value={type} onValueChange={(val) => setType(val ?? "")}>
                      <SelectTrigger className="w-full bg-slate-900/60 border-slate-700 text-white rounded-lg py-6 focus:ring-gold focus:border-gold">
                        <SelectValue placeholder="Choose Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-800 text-white">
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="villa">Independent Villa</SelectItem>
                        <SelectItem value="plot">Premium Plot</SelectItem>
                        <SelectItem value="house">Independent House</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search Button */}
                  <Button 
                    onClick={handleSearch}
                    className="w-full bg-gold hover:bg-gold-hover text-navy font-bold py-6 rounded-lg shadow-lg shadow-gold/15 mt-2 transition-all gap-2 text-base"
                  >
                    <Search className="h-5 w-5" />
                    <span>Search Verified Listings</span>
                  </Button>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Stats Bar Section */}
      <section className="bg-navy border-t border-slate-800/80 text-white py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1 border-r border-slate-800 last:border-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-gold tracking-tight">4,500+</p>
              <p className="text-xs sm:text-sm text-slate-400 font-medium uppercase tracking-wider">Properties Listed</p>
            </div>
            <div className="space-y-1 border-r border-slate-800 last:border-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-gold tracking-tight">2,200+</p>
              <p className="text-xs sm:text-sm text-slate-400 font-medium uppercase tracking-wider">Happy Families</p>
            </div>
            <div className="space-y-1 border-r border-slate-800 last:border-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-gold tracking-tight">8+</p>
              <p className="text-xs sm:text-sm text-slate-400 font-medium uppercase tracking-wider">Major Cities Covered</p>
            </div>
            <div className="space-y-1 last:border-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-gold tracking-tight">95%</p>
              <p className="text-xs sm:text-sm text-slate-400 font-medium uppercase tracking-wider">RERA Verified Builders</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Properties Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-xs font-semibold text-gold tracking-wider uppercase mb-2">Exclusive Handpicked Homes</h2>
            <h3 className="text-3xl sm:text-4xl font-bold font-serif text-navy">Featured Listings in Tamil Nadu</h3>
          </div>
          <Link href="/properties" className="mt-4 md:mt-0 inline-flex items-center gap-1 text-gold hover:text-gold-hover font-semibold transition-colors">
            <span>View all properties</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_PROPERTIES.map((prop) => (
            <Card key={prop.id} className="overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col h-full bg-white">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={prop.image}
                  alt={prop.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* RERA and DTCP badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {prop.isRERAApproved && (
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wider">
                      RERA Approved
                    </span>
                  )}
                  {prop.isDTCPApproved && (
                    <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wider">
                      DTCP Approved
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3">
                  <button className="bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-md text-slate-600 hover:text-red-500 hover:bg-white transition-all">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <CardContent className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                      {prop.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {prop.city}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-navy hover:text-gold transition-colors font-serif mb-2 line-clamp-1">
                    {prop.title}
                  </h4>
                  <p className="text-xs text-slate-500 mb-4">{prop.locality}</p>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-auto">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">Price</p>
                      <p className="text-xl font-bold text-gold">{formatPrice(prop.price)}</p>
                    </div>
                    
                    {prop.bedrooms > 0 ? (
                      <div className="text-right text-xs text-slate-500">
                        <span className="font-semibold text-navy block">{prop.bedrooms} BHK</span>
                        <span>{prop.areaSqFt} Sq.Ft</span>
                      </div>
                    ) : (
                      <div className="text-right text-xs text-slate-500">
                        <span className="font-semibold text-navy block">Premium Plot</span>
                        <span>{prop.areaSqFt} Sq.Ft</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Trending Locations Section */}
      <section className="bg-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs font-semibold text-gold tracking-wider uppercase mb-2">Find your perfect locale</h2>
            <h3 className="text-3xl sm:text-4xl font-bold font-serif text-navy">Trending Locations in Tamil Nadu</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {TRENDING_LOCATIONS.map((loc, idx) => (
              <motion.div
                key={loc.name}
                whileHover={{ y: -5 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg group cursor-pointer border border-slate-200"
                onClick={() => {
                  router.push(`/properties?city=${loc.name}`);
                }}
              >
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-[0.8]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent opacity-90" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs text-gold/90 font-medium tracking-wide uppercase">{loc.subtitle}</p>
                  <h4 className="text-lg font-bold tracking-wide mt-0.5">{loc.name}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Trust & Quality Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-xs font-semibold text-gold tracking-wider uppercase mb-2">Unparalleled Transparency</h2>
              <h3 className="text-3xl sm:text-4xl font-bold font-serif text-navy leading-tight">Why Smart Buyers Choose Aadana Tharakar</h3>
            </div>
            
            <p className="text-slate-600 leading-relaxed">
              We specialize in bridging the gap between developers and property seekers with premium localization. Each listing undergoes a rigorous local verification process.
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-gold/15 p-3 rounded-lg text-gold h-12 w-12 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-navy">DTCP & CMDA Verification</h4>
                  <p className="text-sm text-slate-500 mt-1">Direct integration checking of Directorate of Town and Country Planning (DTCP) approvals and Chennai Metropolitan Development Authority (CMDA) layouts.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-gold/15 p-3 rounded-lg text-gold h-12 w-12 flex items-center justify-center">
                  <Home className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-navy">Vaastu Compliant Design Filters</h4>
                  <p className="text-sm text-slate-500 mt-1">Specially curated properties conforming strictly to standard ancient Vaastu Shastra guidelines for peace and prosperity.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 bg-gold/15 p-3 rounded-lg text-gold h-12 w-12 flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-navy">Dedicated Local Advisors</h4>
                  <p className="text-sm text-slate-500 mt-1">Get custom site visits arranged by experienced agents speaking fluent Tamil, ensuring comfortable local transactions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100">
            <Image
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
              alt="Premium office deal negotiation"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-navy/90 backdrop-blur-md p-6 rounded-xl border border-white/10 text-white flex items-center gap-4">
              <div className="bg-gold p-3 rounded-lg text-navy">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-gold font-semibold uppercase tracking-wider">Flood & Storm Safety</p>
                <p className="text-sm text-slate-300 mt-1">We index terrain flood-history mapping to ensure safety tags are completely accurate.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="bg-navy text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs font-semibold text-gold tracking-wider uppercase mb-2">Hear from our patrons</h2>
            <h3 className="text-3xl sm:text-4xl font-bold font-serif text-white">Client Success Stories</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Finding an independent villa in Akkarai, ECR with genuine DTCP approval was seamless with Aadana Tharakar. Their local expertise is matchless.",
                name: "Anand Raghavan",
                role: "IT Director, Chennai",
                stars: 5,
              },
              {
                quote: "The Vaastu compliance verification features gave my family immense confidence. Outstanding service and perfect transparent communication.",
                name: "Dr. Meenakshi Sundaram",
                role: "Consultant Cardiologist, Madurai",
                stars: 5,
              },
              {
                quote: "Excellent portal! The team translated everything, arranged premium plot registration at Tirunelveli smoothly. Truly dynamic and professional.",
                name: "V. Karuppasamy",
                role: "Agronomist, Kovilpatti",
                stars: 5,
              }
            ].map((t, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800/80 p-8 rounded-2xl flex flex-col justify-between hover:border-gold/30 transition-colors">
                <div className="space-y-4">
                  <div className="flex gap-1 text-gold">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold" />
                    ))}
                  </div>
                  <p className="text-slate-300 italic leading-relaxed text-sm">"{t.quote}"</p>
                </div>
                <div className="border-t border-slate-800 pt-6 mt-6">
                  <p className="font-bold text-gold">{t.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer Section */}
      <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white tracking-wider font-serif">
              ஆதனத் தரகர் · Aadana Tharakar
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Premium Luxury Real Estate Portal in Tamil Nadu. Fully verified properties satisfying modern standards.
            </p>
            <div className="flex space-x-3 text-gold">
              {/* social media icons could go here */}
            </div>
          </div>

          <div>
            <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Cities</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/properties?city=Chennai" className="hover:text-gold transition-colors">Chennai</Link></li>
              <li><Link href="/properties?city=Coimbatore" className="hover:text-gold transition-colors">Coimbatore</Link></li>
              <li><Link href="/properties?city=Madurai" className="hover:text-gold transition-colors">Madurai</Link></li>
              <li><Link href="/properties?city=Trichy" className="hover:text-gold transition-colors">Trichy</Link></li>
              <li><Link href="/properties?city=Tirunelveli" className="hover:text-gold transition-colors">Tirunelveli</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/properties" className="hover:text-gold transition-colors">Search Listings</Link></li>
              <li><Link href="/agents" className="hover:text-gold transition-colors">Our Agents</Link></li>
              <li><Link href="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-gold transition-colors">Market Blog</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Corporate Office</h5>
            <p className="text-sm text-slate-500 leading-relaxed">
              Suite 402, Luxury Towers,<br />
              Khadar Nawaz Khan Road, Nungambakkam,<br />
              Chennai - 600006
            </p>
            <p className="text-sm text-gold mt-4 font-semibold">
              support@aadana.in
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Aadana Tharakar. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Use</a>
            <a href="#" className="hover:text-slate-400">RERA Disclaimers</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
