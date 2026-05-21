import { Metadata } from "next";
import Link from "next/link";
import { Building, MapPin, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Apartments for Sale & Rent in Tamil Nadu | Aadana Tharakar",
  description: "Browse premium apartments and flats for sale or rent across major cities in Tamil Nadu. Verified CMDA/DTCP listings with RERA approvals.",
};

const cities = [
  { name: "Chennai", count: 1420, img: "🏢" },
  { name: "Coimbatore", count: 850, img: "🏢" },
  { name: "Madurai", count: 420, img: "🏢" },
  { name: "Salem", count: 210, img: "🏢" },
  { name: "Trichy", count: 190, img: "🏢" },
  { name: "Tirunelveli", count: 110, img: "🏢" },
];

export default function ApartmentsPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-4">Categories</p>
        <h1 className="text-5xl font-bold mb-4">
          Premium <span className="text-[#C9A84C]">Apartments</span> in Tamil Nadu
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
          Find CMDA & RERA-approved flats and gated communities in prime locations.
        </p>
        <Link
          href="/properties?type=Apartment"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#C9A84C] to-[#E5C87A] text-[#0A0F1E] font-bold rounded-xl hover:opacity-90 transition-opacity"
        >
          View All Apartments
        </Link>
      </section>

      {/* Features */}
      <section className="py-12 px-4 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {[
          { icon: ShieldCheck, title: "100% RERA Verified", desc: "No legal hassles. All listed projects are cross-checked with TNRERA." },
          { icon: Building, title: "Gated Communities", desc: "Premium facilities, secure environments, and top-tier construction." },
          { icon: Zap, title: "Modern Amenities", desc: "Power backup, RO water, lift accessibility, and reserved parking slots." },
        ].map((f, i) => (
          <div key={i} className="bg-[#111827] border border-white/5 rounded-2xl p-6">
            <f.icon className="text-[#C9A84C] mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-slate-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Browse by City */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Browse by City</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cities.map((city) => (
            <Link
              key={city.name}
              href={`/properties?type=Apartment&city=${city.name}`}
              className="bg-[#111827] border border-white/5 hover:border-[#C9A84C]/30 rounded-xl p-5 text-center transition-colors group"
            >
              <div className="text-3xl mb-3">{city.img}</div>
              <h3 className="font-semibold text-white group-hover:text-[#C9A84C] transition-colors">{city.name}</h3>
              <p className="text-slate-500 text-xs mt-1">{city.count} Properties</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
