import { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Building2, TrendingUp, Key } from "lucide-react";

export const metadata: Metadata = {
  title: "Commercial Properties in Tamil Nadu | Aadana Tharakar",
  description: "Find office spaces, retail shops, showrooms, and warehouses for sale or lease in Chennai, Coimbatore, Madurai, Trichy, Salem.",
};

const types = [
  { name: "Office Spaces", desc: "Co-working friendly premium corporate offices in Chennai (OMR, Guindy).", icon: Briefcase },
  { name: "Retail Shops", desc: "High footfall shops in busy markets like T. Nagar, RS Puram, and Town Hall.", icon: Building2 },
  { name: "Warehouses", desc: "Spacious logistics spaces along major state highways and bypass routes.", icon: Key },
  { name: "Showrooms", desc: "Spacious multi-floor retail fronts optimized for brands.", icon: TrendingUp },
];

export default function CommercialPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-4">Categories</p>
        <h1 className="text-5xl font-bold mb-4">
          Commercial <span className="text-[#C9A84C]">Spaces</span> & Offices
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
          Accelerate your business with prime office configurations and high-traffic retail locations.
        </p>
        <Link
          href="/properties?type=Commercial"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#C9A84C] to-[#E5C87A] text-[#0A0F1E] font-bold rounded-xl hover:opacity-90 transition-opacity"
        >
          View All Commercial Properties
        </Link>
      </section>

      {/* Grid */}
      <section className="py-12 px-4 max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {types.map((t, i) => (
          <div key={i} className="bg-[#111827] border border-white/5 rounded-2xl p-6 hover:border-[#C9A84C]/20 transition-colors">
            <t.icon className="text-[#C9A84C] mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-2">{t.name}</h3>
            <p className="text-slate-400 text-sm mb-4">{t.desc}</p>
            <Link
              href={`/properties?type=Commercial&q=${t.name}`}
              className="text-[#C9A84C] text-sm font-medium hover:underline"
            >
              Explore Listings →
            </Link>
          </div>
        ))}
      </section>

      {/* Analytics info */}
      <section className="py-16 px-4 bg-[#111827]/50 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Invest in High-Yield Properties</h2>
          <p className="text-slate-300 leading-relaxed">
            Commercial real estate in Tamil Nadu yields average rental ROIs of 8-11%, compared to 2-3% in
            residential listings. Aadana Tharakar assists investors by presenting fully vetted, tenant-ready properties,
            offering pre-calculated yield assessments and long-term lease terms validation.
          </p>
        </div>
      </section>
    </main>
  );
}
