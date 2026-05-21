"use client";

import React, { useState, useMemo, useEffect } from "react";
import { usePropertyStore, Property } from "@/store/propertyStore";
import { FilterPanel } from "@/components/property/FilterPanel";
import { PropertyCard, PropertySummary } from "@/components/property/PropertyCard";
import { ALL_MOCK_PROPERTIES } from "@/lib/mockData";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ArrowUpDown, RefreshCw, X, MapPin } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import JsonLd from "@/components/common/JsonLd";

interface LocationPageClientProps {
  city: string;
}

export function LocationPageClient({ city }: LocationPageClientProps) {
  const { filters, setProperties, updateFilters } = usePropertyStore();
  const [sortBy, setSortBy] = useState<string>("recent");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Sync our local mock database and set the city filter on mount
  useEffect(() => {
    setProperties(ALL_MOCK_PROPERTIES);
    updateFilters({ cities: [city] });
    
    // Cleanup to reset filters when leaving the page
    return () => {
      updateFilters({ cities: [] });
    };
  }, [city, setProperties, updateFilters]);

  // Compute active filtered properties list
  const filteredProperties = useMemo(() => {
    return ALL_MOCK_PROPERTIES.filter((prop) => {
      // Must match the URL city
      if (prop.city.toLowerCase() !== city.toLowerCase()) return false;

      // 1. Purpose filter
      if (prop.purpose !== filters.purpose) return false;

      // 2. Price filters
      if (prop.price < filters.priceMin || prop.price > filters.priceMax) return false;

      // 3. Type filter
      if (filters.types.length > 0 && !filters.types.includes(prop.type)) return false;

      // 4. Bedrooms filter
      if (filters.bedrooms.length > 0) {
        if (!prop.bedrooms) return false;
        
        const hasMatch = filters.bedrooms.some((bed) => {
          if (bed === "4+") return prop.bedrooms! >= 4;
          return prop.bedrooms === Number(bed);
        });

        if (!hasMatch) return false;
      }

      // 5. Furnished status
      if (filters.furnished !== "All" && prop.furnished !== filters.furnished) return false;

      // 6. Tamil Nadu specifics
      if (filters.isRERAApproved && !prop.isRERAApproved) return false;
      if (filters.isDTCPApproved && !prop.isDTCPApproved) return false;
      if (filters.isVaastuCompliant && !prop.isVaastuCompliant) return false;
      if (filters.isFloodSafe && !prop.isFloodSafe) return false;

      return true;
    }).sort((a, b) => {
      // Sorting
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    });
  }, [filters, sortBy, city]);

  // Map to PropertySummary models for PropertyCard component
  const propertyCards: PropertySummary[] = useMemo(() => {
    return filteredProperties.map((p) => ({
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
  }, [filteredProperties]);

  // Generate breadcrumb schema specifically for this city listing
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
        "name": "Locations",
        "item": "https://aadanatharakar.com/properties"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `Properties in ${city}`,
        "item": `https://aadanatharakar.com/location/${city.toLowerCase()}`
      }
    ]
  };

  return (
    <div className="bg-slate-50 min-h-screen text-navy py-12">
      <JsonLd schema={breadcrumbSchema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Listing Title / Breadcrumb Header */}
        <div className="mb-8 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-gold uppercase tracking-wider mb-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>Tamil Nadu Premium Hubs</span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-extrabold font-serif text-navy">
                Luxury Real Estate in {city}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Showing {propertyCards.length} verified listings in {city}, Tamil Nadu
              </p>
            </div>

            {/* Top Toolbar Controls */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Select value={sortBy} onValueChange={(val) => setSortBy(val ?? "recent")}>
                <SelectTrigger className="w-[180px] bg-white border-slate-200 text-xs h-10">
                  <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                    <ArrowUpDown className="h-3.5 w-3.5" />
                    Sort By
                  </span>
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 text-slate-700 text-xs">
                  <SelectItem value="recent">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <Sheet open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
                <SheetTrigger render={
                  <Button 
                    variant="outline" 
                    className="md:hidden flex-grow flex items-center gap-2 border-slate-200 bg-white"
                  />
                }>
                  <SlidersHorizontal className="h-4 w-4 text-slate-500" />
                  <span>Filter Listings</span>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 bg-white border-t border-slate-200">
                  <SheetHeader className="px-6 py-4 border-b border-slate-100 flex flex-row items-center justify-between">
                    <SheetTitle className="font-bold text-navy font-serif">Refine Search</SheetTitle>
                  </SheetHeader>
                  <div className="overflow-y-auto h-[calc(85vh-65px)] p-6">
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Filter Chips Bar */}
        {filters.types.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.types.map((type) => (
              <span 
                key={type} 
                className="inline-flex items-center gap-1 bg-navy/10 text-navy font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-navy/15"
              >
                <span>Type: {type}</span>
                <button 
                  onClick={() => updateFilters({ types: filters.types.filter((t) => t !== type) })}
                  className="hover:text-red-600 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        ) : null}

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden md:block md:col-span-3 sticky top-24 h-[85vh] overflow-y-auto pr-2">
            <FilterPanel hideCitySelect={true} />
          </aside>

          {/* Right Property Grid */}
          <main className="md:col-span-9 space-y-8">
            {propertyCards.length === 0 ? (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-16 text-center shadow-sm space-y-4">
                <div className="bg-slate-50 p-4 rounded-full max-w-[64px] mx-auto text-slate-400">
                  <RefreshCw className="h-8 w-8 animate-spin-slow" />
                </div>
                <h3 className="font-bold text-lg text-navy font-serif">No Matching Properties in {city}</h3>
                <p className="text-slate-500 max-w-md mx-auto text-sm">
                  Try adjusting or clearing your filters (price levels, bedrooms, or verification badges) to display verified listings in {city}.
                </p>
                <Button 
                  onClick={() => updateFilters({ types: [], bedrooms: [], isRERAApproved: false, isDTCPApproved: false, isVaastuCompliant: false, isFloodSafe: false, priceMin: 500000, priceMax: 50000000 })}
                  className="bg-gold text-navy font-bold px-6 py-2"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {propertyCards.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
