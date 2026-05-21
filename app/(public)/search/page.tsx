import { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Search Properties in Tamil Nadu | Aadana Tharakar",
  description: "Search and find your perfect property across all major Tamil Nadu cities. Filter by type, price, location, and Tamil Nadu-specific compliance.",
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; city?: string; type?: string }>;
}) {
  return (
    <main className="min-h-screen bg-[#0A0F1E]">
      <section className="py-20 px-4 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          Search <span className="text-[#C9A84C]">Properties</span>
        </h1>
        <p className="text-slate-400 text-lg mb-10">Find your perfect home across Tamil Nadu</p>

        {/* Search redirects to full listing page with filters */}
        <form action="/properties" method="GET" className="max-w-2xl mx-auto">
          <div className="flex gap-3 bg-[#111827] border border-white/10 rounded-2xl p-3">
            <Search className="text-slate-500 self-center ml-2 flex-shrink-0" size={20} />
            <input
              id="search-q"
              name="q"
              type="text"
              placeholder="Search by city, locality, or property type..."
              className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#C9A84C] to-[#E5C87A] text-[#0A0F1E] font-bold rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </form>
      </section>

      {/* Quick filters */}
      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Apartments", href: "/apartments", emoji: "🏢", desc: "RERA-verified flats" },
              { label: "Villas", href: "/villas", emoji: "🏡", desc: "Luxury independent houses" },
              { label: "Plots", href: "/plots", emoji: "🌿", desc: "DTCP-approved land" },
              { label: "Commercial", href: "/commercial", emoji: "🏪", desc: "Office & retail spaces" },
              { label: "Luxury", href: "/luxury", emoji: "💎", desc: "Premium ₹1Cr+ properties" },
              { label: "All Properties", href: "/properties", emoji: "🔍", desc: "Browse everything" },
            ].map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="bg-[#111827] border border-white/5 rounded-2xl p-6 hover:border-[#C9A84C]/30 transition-colors group text-center"
              >
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <h3 className="text-white font-semibold group-hover:text-[#C9A84C] transition-colors">{cat.label}</h3>
                <p className="text-slate-500 text-sm mt-1">{cat.desc}</p>
              </Link>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-6 gap-3">
            {["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy", "Tirunelveli"].map((city) => (
              <Link
                key={city}
                href={`/location/${city.toLowerCase()}`}
                className="text-center py-3 px-4 bg-[#111827] border border-white/5 rounded-xl text-slate-300 hover:text-[#C9A84C] hover:border-[#C9A84C]/20 transition-all text-sm font-medium"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
