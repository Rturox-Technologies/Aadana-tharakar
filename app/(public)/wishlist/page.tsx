"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Trash2, Search, ArrowRight } from "lucide-react";
import { ALL_MOCK_PROPERTIES } from "@/lib/mockData";
import { PropertyCard } from "@/components/property/PropertyCard";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Load wishlist from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("nilamnai_wishlist");
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse wishlist", e);
      }
    }
  }, []);

  const removeItem = (id: string) => {
    const updated = wishlist.filter(item => item !== id);
    setWishlist(updated);
    localStorage.setItem("nilamnai_wishlist", JSON.stringify(updated));
  };

  const favoriteProperties = ALL_MOCK_PROPERTIES.filter(p => wishlist.includes(p.id));

  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Heart className="text-[#C9A84C] mx-auto mb-4 fill-[#C9A84C]" size={40} />
          <h1 className="text-4xl font-bold mb-3">
            My <span className="text-[#C9A84C]">Wishlist</span>
          </h1>
          <p className="text-slate-400">Your curated collection of premium properties in Tamil Nadu.</p>
        </div>

        {favoriteProperties.length === 0 ? (
          <div className="text-center py-20 bg-[#111827] border border-white/5 rounded-3xl max-w-2xl mx-auto px-6">
            <Search className="text-slate-600 mx-auto mb-4" size={48} />
            <h2 className="text-xl font-semibold mb-2">No Saved Properties</h2>
            <p className="text-slate-400 mb-8 max-w-sm mx-auto">
              Start exploring flats, plots, and villas across Tamil Nadu and click the heart icon to save them here.
            </p>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C9A84C] to-[#E5C87A] text-[#0A0F1E] font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Explore Listings <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProperties.map((property) => (
              <div key={property.id} className="relative group">
                <PropertyCard property={property} />
                <button
                  onClick={() => removeItem(property.id)}
                  className="absolute top-4 right-14 p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all z-10"
                  title="Remove from Wishlist"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
