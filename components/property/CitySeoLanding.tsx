import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ALL_MOCK_PROPERTIES } from "@/lib/mockData";
import { PropertyCard, PropertySummary } from "@/components/property/PropertyCard";
import { 
  ShieldCheck, 
  MapPin, 
  Droplet, 
  Zap, 
  Navigation, 
  GraduationCap, 
  Heart, 
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Building2
} from "lucide-react";
import JsonLd from "@/components/common/JsonLd";

interface CitySeoLandingProps {
  city: string;
  type: "Apartment" | "Villa" | "Plot";
  tamilTitle: string;
  heroImage: string;
  metaDesc: string;
}

export default function CitySeoLanding({
  city,
  type,
  tamilTitle,
  heroImage,
  metaDesc
}: CitySeoLandingProps) {
  
  // Filter properties matching city and type
  const localProperties = ALL_MOCK_PROPERTIES.filter(
    (p) => p.city.toLowerCase() === city.toLowerCase() && p.type === type
  );

  // Fallback to city-wide properties if specific type is empty
  const displayProperties = localProperties.length > 0 
    ? localProperties 
    : ALL_MOCK_PROPERTIES.filter((p) => p.city.toLowerCase() === city.toLowerCase());

  const propertyCards: PropertySummary[] = displayProperties.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    price: p.price,
    city: p.city,
    locality: p.locality,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    areaSqFt: p.areaSqFt,
    type: p.type,
    images: p.images,
    isRERAApproved: p.isRERAApproved,
    isDTCPApproved: p.isDTCPApproved,
    isVerified: p.isVerified,
    isFeatured: p.isFeatured,
    postedDate: p.postedDate
  }));

  // Average property rate calculations (simulated luxury figures)
  const stats = {
    Chennai: { avgRate: "₹9,500/sq.ft", appreciation: "+12.4% YoY", safety: "98% Flood Safe Zone", activeCount: "450+" },
    Coimbatore: { avgRate: "₹6,800/sq.ft", appreciation: "+10.8% YoY", safety: "100% High Ground Zone", activeCount: "280+" },
    Madurai: { avgRate: "₹4,200/sq.ft", appreciation: "+8.5% YoY", safety: "99% High Ground Zone", activeCount: "190+" }
  }[city] || { avgRate: "₹5,500/sq.ft", appreciation: "+9.2% YoY", safety: "99% Certified", activeCount: "150+" };

  // City-specific guidelines and regional planning names
  const localAuthority = city === "Chennai" ? "CMDA (Chennai Metropolitan Development Authority)" : "DTCP (Directorate of Town and Country Planning)";

  // Breadcrumb schema
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
        "name": `Properties in ${city}`,
        "item": `https://aadanatharakar.com/location/${city.toLowerCase()}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${type}s in ${city}`,
        "item": `https://aadanatharakar.com/${type.toLowerCase()}s-in-${city.toLowerCase()}`
      }
    ]
  };

  return (
    <div className="bg-slate-50 min-h-screen text-navy overflow-hidden">
      <JsonLd schema={breadcrumbSchema} />
      
      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-navy text-white pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={`${type}s in ${city}, Tamil Nadu`}
            fill
            priority
            className="object-cover opacity-30 filter brightness-[0.7] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/55" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-semibold tracking-wider uppercase">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Premium Localized Search Engine Lander</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-serif">
              {tamilTitle} <br />
              <span className="text-gold font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl block mt-2">
                Luxury {type}s for Sale in {city}
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {metaDesc} Fully compliance-audited assets featuring premium infrastructure parameters, direct water supply connections, and RERA registration values.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href={`/properties?city=${city}&type=${type.toLowerCase()}`}>
                <button className="bg-gold hover:bg-gold-hover text-navy font-bold px-6 py-3.5 rounded-lg shadow-lg shadow-gold/20 transition-all gap-2 text-sm inline-flex items-center">
                  <span>View All Local Listings</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Premium Hub Performance Stats */}
      <section className="bg-navy border-t border-slate-800/80 text-white py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1.5 border-r border-slate-800 last:border-0">
              <TrendingUp className="h-5 w-5 text-gold mx-auto mb-1" />
              <p className="text-2xl font-bold tracking-tight text-white">{stats.avgRate}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Average Price Index</p>
            </div>
            <div className="space-y-1.5 border-r border-slate-800 last:border-0">
              <TrendingUp className="h-5 w-5 text-gold mx-auto mb-1" />
              <p className="text-2xl font-bold tracking-tight text-white">{stats.appreciation}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Annual Growth Rate</p>
            </div>
            <div className="space-y-1.5 border-r border-slate-800 last:border-0">
              <ShieldCheck className="h-5 w-5 text-gold mx-auto mb-1" />
              <p className="text-2xl font-bold tracking-tight text-white">{stats.safety}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Terrain Flooding Audit</p>
            </div>
            <div className="space-y-1.5 last:border-0">
              <Building2 className="h-5 w-5 text-gold mx-auto mb-1" />
              <p className="text-2xl font-bold tracking-tight text-white">{stats.activeCount}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Verified Units</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pre-filtered Local Properties Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
          <div>
            <h2 className="text-xs font-semibold text-gold tracking-wider uppercase mb-2">
              Audited Properties in {city}
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-navy">
              Premium Featured {type}s
            </h3>
          </div>
          <Link href={`/properties?city=${city}`} className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-gold hover:text-gold-hover font-bold text-sm transition-colors">
            <span>Explore all {city} properties</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {propertyCards.length === 0 ? (
          <div className="bg-white border border-slate-200/60 rounded-2xl p-12 text-center shadow-sm">
            <p className="text-slate-500 text-sm">
              Currently compiling premium RERA verified {type} developments in {city}. Explore all properties instead.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {propertyCards.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Tamil Nadu Legal & Planning Regulatory Guide (Trust Critical) */}
      <section className="bg-slate-900 text-white py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-gold uppercase tracking-wider">Compliance Assurance</h2>
            <h3 className="text-3xl font-bold font-serif">Tamil Nadu Real Estate Legal Framework</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every home indexing on Aadana Tharakar undergoes rigorous legal audit parameters. Ensure peace of mind by examining the regional regulatory checkpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Box 1: DTCP / CMDA */}
            <div className="bg-slate-950 border border-slate-800/80 p-8 rounded-2xl space-y-4 hover:border-gold/30 transition-all group">
              <div className="bg-gold/15 p-3 rounded-lg text-gold h-12 w-12 flex items-center justify-center">
                <FileCheck2 className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-white font-serif">{localAuthority}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Layout approvals assure compliance with layout boundaries, road-width provisions, and communal reservations (Ouvrage spaces). Certified directly through regional planning maps.
              </p>
            </div>

            {/* Box 2: RERA TN */}
            <div className="bg-slate-950 border border-slate-800/80 p-8 rounded-2xl space-y-4 hover:border-gold/30 transition-all group">
              <div className="bg-gold/15 p-3 rounded-lg text-gold h-12 w-12 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-white font-serif">TNRERA Registration Rules</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Registration with the Tamil Nadu Real Estate Regulatory Authority protects consumers against structural delivery delays and ensures developers use designated escrow accounts for construction.
              </p>
            </div>

            {/* Box 3: Patta and Title Audits */}
            <div className="bg-slate-950 border border-slate-800/80 p-8 rounded-2xl space-y-4 hover:border-gold/30 transition-all group">
              <div className="bg-gold/15 p-3 rounded-lg text-gold h-12 w-12 flex items-center justify-center">
                <Building2 className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-white font-serif">Patta Land Registry Check</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Verification of the Computerised Patta (Land Registry Record) issued by the Tahsildar validates clear ownership titles, matching survey numbers, and absolute freedom from legal disputes.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Local Infrastructure & Neighbourhood Insights */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-semibold text-gold uppercase tracking-wider">Locality Intelligence</h2>
          <h3 className="text-3xl font-bold font-serif text-navy">Neighbourhood & Infrastructure Audit</h3>
          <p className="text-sm text-slate-500">
            A comprehensive overview of high-end physical infrastructure parameters for premium residential comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="bg-white border border-slate-200/80 p-6 rounded-xl shadow-sm space-y-3">
            <div className="text-gold"><Droplet className="h-5 w-5" /></div>
            <h4 className="font-bold text-navy text-sm font-serif">Water Infrastructure</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dual-piped metro connectivity (e.g. Cauvery, Siruvani) alongside high-yield borewell systems ensuring 24/7 sustainable water.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 p-6 rounded-xl shadow-sm space-y-3">
            <div className="text-gold"><Zap className="h-5 w-5" /></div>
            <h4 className="font-bold text-navy text-sm font-serif">Power & EB Connectivity</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Standard 3-phase TNEB connections equipped with underground cabling setups to bypass seasonal tropical disruption.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 p-6 rounded-xl shadow-sm space-y-3">
            <div className="text-gold"><Navigation className="h-5 w-5" /></div>
            <h4 className="font-bold text-navy text-sm font-serif">Transit Corridors</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Immediate access routes to expressways (ECR, Avinashi road, bypass avenues), wide 40ft internal lanes, and public transit nodes.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 p-6 rounded-xl shadow-sm space-y-3">
            <div className="text-gold"><GraduationCap className="h-5 w-5" /></div>
            <h4 className="font-bold text-navy text-sm font-serif">Civic Institutions</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Prime coordinates located within 10-15 minute access to leading international schools, tertiary care hospitals, and tech corridors.
            </p>
          </div>

        </div>
      </section>

      {/* 6. Premium Footer CTA */}
      <section className="bg-navy text-white py-16 relative">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            Ready to Discover Premium Properties?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Connect with our localized luxury real estate guides for transparent, secure, and Vaastu-compliant transactions.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link href="/properties">
              <button className="bg-gold hover:bg-gold-hover text-navy font-bold px-8 py-3.5 rounded-lg shadow-lg shadow-gold/25 transition-all text-xs uppercase tracking-wider">
                Explore Listings
              </button>
            </Link>
            <a 
              href="https://wa.me/919876543210?text=I%20am%20interested%20in%20properties!" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <button className="border border-white/20 hover:bg-white/10 text-white font-bold px-6 py-3.5 rounded-lg transition-all text-xs uppercase tracking-wider">
                Consult Advisor
              </button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
