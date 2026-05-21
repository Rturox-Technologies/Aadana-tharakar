import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Aadana Tharakar — Tamil Nadu's #1 Real Estate Platform",
  description:
    "Learn about Aadana Tharakar (ஆதனத் தரகர்) — our mission to bring transparency, RERA compliance, and digital innovation to Tamil Nadu's real estate market.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E]">
      {/* Hero */}
      <section className="relative py-28 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1E] via-[#0F172A] to-[#0A0F1E]" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 50% 30%, #C9A84C33 0%, transparent 60%)" }} />
        <div className="relative max-w-4xl mx-auto">
          <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-4">Our Story</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            About <span className="text-[#C9A84C]">Aadana Tharakar</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            ஆதனத் தரகர் — Where Tamil Nadu&apos;s real estate meets transparency, trust, and technology.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              Aadana Tharakar was founded with a single purpose: to make buying, selling, and renting
              property in Tamil Nadu as transparent, safe, and simple as possible.
            </p>
            <p className="text-slate-400 leading-relaxed">
              We verify every listing against DTCP, CMDA, and RERA databases so you never have
              to worry about fraudulent properties. From Chennai to Tirunelveli, we cover all
              major Tamil Nadu cities with hyper-local data.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: "50,000+", label: "Verified Listings" },
              { value: "8", label: "Major TN Cities" },
              { value: "₹2,500 Cr+", label: "Properties Facilitated" },
              { value: "98%", label: "RERA Compliance Rate" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#111827] border border-[#C9A84C]/20 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-[#C9A84C]">{stat.value}</p>
                <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-[#111827]/50">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Our Values</h2>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "🛡️",
              title: "Trust & Transparency",
              desc: "Every property verified against government databases. No hidden fees. No fake listings.",
            },
            {
              icon: "🌍",
              title: "Tamil Nadu First",
              desc: "Hyper-local expertise across Chennai, Coimbatore, Madurai, Salem, Trichy, and beyond.",
            },
            {
              icon: "⚡",
              title: "Technology Driven",
              desc: "AI-powered recommendations, WhatsApp-native leads, and real-time RERA verification.",
            },
          ].map((v) => (
            <div key={v.title} className="bg-[#111827] border border-white/5 rounded-2xl p-8 text-center hover:border-[#C9A84C]/30 transition-colors">
              <div className="text-5xl mb-4">{v.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
              <p className="text-slate-400">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Built for Tamil Nadu</h2>
          <p className="text-slate-400 text-lg">
            Our team of real estate experts, legal specialists, and engineers is deeply embedded
            in the Tamil Nadu market — understanding local regulations, Vaastu traditions,
            Patta documentation, and the cultural nuances that matter to Tamil families.
          </p>
          <div className="mt-12 p-8 bg-gradient-to-r from-[#C9A84C]/10 to-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-2xl">
            <p className="text-2xl text-white font-semibold italic">
              &ldquo;நம்ம ஊர் நிலம் — நம்ம கையில் பாதுகாப்பாக&rdquo;
            </p>
            <p className="text-slate-400 mt-2">Our land, safely in our hands.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
