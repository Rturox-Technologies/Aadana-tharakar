import { Metadata } from "next";
import Link from "next/link";
import { Home, Compass, MapPin, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Luxury Villas & Independent Houses in Tamil Nadu | Aadana Tharakar",
  description: "Explore luxury villas, duplex homes, and independent houses for sale in Chennai, Coimbatore, Madurai, and other prime TN locations.",
};

const villaTypes = [
  { name: "Duplex Villas", desc: "Spacious dual-level homes with private terrace.", img: "🏡" },
  { name: "Independent Houses", desc: "Stand-alone residential builds with own plot ownership.", img: "🏠" },
  { name: "Gated Villas", desc: "Fully secure luxury villa townships with premium amenities.", img: "🏰" },
  { name: "Farm Houses", desc: "Quiet weekend retreats away from city hubbub.", img: "🌳" },
];

export default function VillasPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-4">Categories</p>
        <h1 className="text-5xl font-bold mb-4">
          Exclusive <span className="text-[#C9A84C]">Villas</span> & Independent Houses
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
          Find your dream villa in Tamil Nadu. Fully customisable, high-end independent spaces.
        </p>
        <Link
          href="/properties?type=Villa"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#C9A84C] to-[#E5C87A] text-[#0A0F1E] font-bold rounded-xl hover:opacity-90 transition-opacity"
        >
          View All Villas
        </Link>
      </section>

      {/* Villa Types */}
      <section className="py-12 px-4 max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {villaTypes.map((v, i) => (
          <div key={i} className="bg-[#111827] border border-white/5 rounded-2xl p-6 hover:border-[#C9A84C]/20 transition-colors">
            <div className="text-4xl mb-4">{v.img}</div>
            <h3 className="text-lg font-semibold mb-2">{v.name}</h3>
            <p className="text-slate-400 text-sm mb-4">{v.desc}</p>
            <Link
              href={`/properties?type=Villa&q=${v.name}`}
              className="text-[#C9A84C] text-sm font-medium hover:underline"
            >
              Explore Listings →
            </Link>
          </div>
        ))}
      </section>

      {/* Highlights */}
      <section className="py-16 px-4 bg-[#111827]/50 border-y border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <Compass className="text-[#C9A84C] mx-auto mb-3" size={32} />
            <h3 className="font-semibold text-white mb-2">Vaastu Compliant</h3>
            <p className="text-slate-400 text-sm">Most villas are built adhering to traditional Vaastu Shastra principles.</p>
          </div>
          <div className="text-center">
            <Shield className="text-[#C9A84C] mx-auto mb-3" size={32} />
            <h3 className="font-semibold text-white mb-2">Clear Legal Titles</h3>
            <p className="text-slate-400 text-sm">We strictly audit parent documents, Patta registration, and RERA compliance status.</p>
          </div>
          <div className="text-center">
            <MapPin className="text-[#C9A84C] mx-auto mb-3" size={32} />
            <h3 className="font-semibold text-white mb-2">Prime Localities</h3>
            <p className="text-slate-400 text-sm">Properties situated in emerging luxury belts of major Tamil Nadu hubs.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
