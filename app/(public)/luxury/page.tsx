import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Shield, User, Gem } from "lucide-react";

export const metadata: Metadata = {
  title: "Luxury Properties for Sale in Tamil Nadu | Aadana Tharakar",
  description: "Browse premium, high-value apartments, villas, and penthouses in Tamil Nadu. Curated premium listings priced above ₹1 Crore.",
};

const perks = [
  { icon: Sparkles, title: "Architectural Excellence", desc: "Design masterclasses, built with top tier imports and premium materials." },
  { icon: Shield, title: "Uncompromising Privacy", desc: "Highly secure gated communities with multi-tier access control protocols." },
  { icon: User, title: "Personalised Showings", desc: "Schedule highly private visits with our specialized regional luxury agents." },
];

export default function LuxuryPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <Gem className="text-[#C9A84C] mx-auto mb-4 animate-pulse" size={48} />
        <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-4">The Aadana Tharakar Collection</p>
        <h1 className="text-5xl font-bold mb-4">
          Ultra-Luxury <span className="text-[#C9A84C]">Residences</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
          Curated premium spaces for discerning clients. Curated listings above ₹1 Crore across prime locations.
        </p>
        <Link
          href="/properties?minPrice=10000000"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#C9A84C] to-[#E5C87A] text-[#0A0F1E] font-bold rounded-xl hover:opacity-90 transition-opacity"
        >
          Explore Luxury Collection
        </Link>
      </section>

      {/* Perks */}
      <section className="py-12 px-4 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {perks.map((p, i) => (
          <div key={i} className="bg-[#111827] border border-white/5 rounded-2xl p-6 text-center">
            <p.icon className="text-[#C9A84C] mx-auto mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
            <p className="text-slate-400 text-sm">{p.desc}</p>
          </div>
        ))}
      </section>

      {/* Localities */}
      <section className="py-16 px-4 bg-[#111827]/50 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Prime Luxury Hubs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Adyar, Chennai", "Boat Club, Chennai", "Race Course, Coimbatore", "Saravanampatti, Coimbatore"].map((l) => (
              <div key={l} className="bg-[#0A0F1E] border border-white/5 rounded-xl p-4">
                <p className="text-slate-300 font-medium text-sm">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
