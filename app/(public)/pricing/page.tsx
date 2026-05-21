import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plans — Aadana Tharakar for Agents & Builders",
  description: "Choose the right Aadana Tharakar plan. Free, Basic, and Premium plans for real estate agents and builders in Tamil Nadu.",
};

const plans = [
  {
    name: "Free",
    nameTa: "இலவசம்",
    price: "₹0",
    period: "forever",
    color: "border-white/10",
    badge: null,
    features: [
      "3 active listings",
      "Basic property profile",
      "WhatsApp lead notifications",
      "Public listing visibility",
      "Standard support",
    ],
    cta: "Get Started Free",
    ctaStyle: "border border-white/20 text-white hover:border-[#C9A84C]/50",
  },
  {
    name: "Basic",
    nameTa: "அடிப்படை",
    price: "₹2,499",
    period: "per month",
    color: "border-[#C9A84C]/30",
    badge: "Most Popular",
    features: [
      "25 active listings",
      "HD photo uploads (50 images)",
      "Video walkthrough support",
      "Priority WhatsApp leads",
      "Analytics dashboard",
      "RERA verification badge",
      "Email + WhatsApp support",
    ],
    cta: "Start Basic Plan",
    ctaStyle: "bg-[#C9A84C]/20 border border-[#C9A84C]/50 text-[#C9A84C] hover:bg-[#C9A84C]/30",
  },
  {
    name: "Premium",
    nameTa: "பிரீமியம்",
    price: "₹6,999",
    period: "per month",
    color: "border-[#C9A84C]",
    badge: "Best Value",
    features: [
      "Unlimited active listings",
      "Featured listing slots (5)",
      "Homepage showcase slot",
      "Priority placement in search",
      "Advanced analytics + CRM",
      "Dedicated account manager",
      "WhatsApp broadcast templates",
      "Custom branded profile page",
      "24/7 priority support",
    ],
    cta: "Go Premium",
    ctaStyle: "bg-gradient-to-r from-[#C9A84C] to-[#E5C87A] text-[#0A0F1E] font-bold hover:opacity-90",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E]">
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-4">Pricing</p>
        <h1 className="text-5xl font-bold text-white mb-4">
          Simple, Transparent <span className="text-[#C9A84C]">Pricing</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Choose the plan that fits your business. No hidden fees. Cancel anytime.
        </p>
      </section>

      {/* Plans */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-[#111827] border ${plan.color} rounded-2xl p-8 flex flex-col`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#C9A84C] text-[#0A0F1E] text-xs font-bold rounded-full">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                <p className="text-[#C9A84C] text-sm">{plan.nameTa}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-500 ml-2">/ {plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-[#C9A84C] mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`w-full py-3.5 rounded-xl transition-all ${plan.ctaStyle}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Enterprise */}
        <div className="max-w-6xl mx-auto mt-8">
          <div className="bg-gradient-to-r from-[#C9A84C]/10 to-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white">Enterprise / Builder Plans</h3>
              <p className="text-slate-400 mt-1">Custom pricing for large builders with 50+ projects. Includes dedicated support, custom integrations, and bulk listing management.</p>
            </div>
            <a
              href="/contact"
              className="px-8 py-3.5 border border-[#C9A84C]/50 text-[#C9A84C] rounded-xl hover:bg-[#C9A84C]/10 transition-colors whitespace-nowrap font-semibold"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
