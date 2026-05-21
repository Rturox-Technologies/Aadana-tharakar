import { Metadata } from "next";
import Link from "next/link";
import { Trees, Compass, FileText, Droplet } from "lucide-react";

export const metadata: Metadata = {
  title: "DTCP Approved Plots for Sale in Tamil Nadu | Aadana Tharakar",
  description: "Find residential and commercial plots for sale in Chennai, Coimbatore, Madurai, Trichy. Verified DTCP/CMDA layout approvals with Patta & clear titles.",
};

const checks = [
  { icon: FileText, title: "DTCP & CMDA Approvals", desc: "We ensure layout designs have active government stamps." },
  { icon: Compass, title: "Vaastu Compliant plots", desc: "East & North facing plots optimized for residential builds." },
  { icon: Trees, title: "Road Width & Access", desc: "Listing details explicitly report approach road widths (24ft, 30ft, 40ft)." },
  { icon: Droplet, title: "Water & EB Ready", desc: "Assessments for sweet drinking groundwater and active power lines." },
];

export default function PlotsPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-4">Categories</p>
        <h1 className="text-5xl font-bold mb-4">
          DTCP Approved <span className="text-[#C9A84C]">Plots</span> & Land
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
          Secure your investment in Tamil Nadu. Highly verified land listings with transparent Patta checks.
        </p>
        <Link
          href="/properties?type=Plot"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#C9A84C] to-[#E5C87A] text-[#0A0F1E] font-bold rounded-xl hover:opacity-90 transition-opacity"
        >
          View All Plots
        </Link>
      </section>

      {/* Checklist */}
      <section className="py-12 px-4 max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {checks.map((c, i) => (
          <div key={i} className="bg-[#111827] border border-white/5 rounded-2xl p-6">
            <c.icon className="text-[#C9A84C] mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
            <p className="text-slate-400 text-sm">{c.desc}</p>
          </div>
        ))}
      </section>

      {/* Why Invest */}
      <section className="py-16 px-4 bg-[#111827]/50 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Why Invest in Tamil Nadu Land?</h2>
          <p className="text-slate-300 leading-relaxed mb-6">
            Land values in secondary Tamil Nadu hubs like Coimbatore, Salem, and Trichy are appreciating at
            unprecedented rates. Aadana Tharakar assists buyers by presenting cross-checked records of ownership,
            eliminating double-registration risks, and ensuring the property is outside active flood zones.
          </p>
          <div className="p-6 bg-[#0A0F1E] border border-[#C9A84C]/20 rounded-xl inline-block">
            <span className="text-[#C9A84C] font-semibold">Pro Tip:</span> Always ask for the latest Encumbrance Certificate (EC) and Patta book copy.
          </div>
        </div>
      </section>
    </main>
  );
}
