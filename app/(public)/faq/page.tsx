import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Aadana Tharakar Real Estate",
  description: "Frequently asked questions about buying, renting, and selling property in Tamil Nadu through Aadana Tharakar.",
};

const faqs: { q: string; a: string; category: string }[] = [
  { category: "Buying", q: "How do I verify a property's RERA registration?", a: "Every verified listing on Aadana Tharakar shows the RERA registration number. You can click it to verify directly on the Tamil Nadu RERA portal (rera.tn.gov.in). We also run automated daily sync checks." },
  { category: "Buying", q: "What does DTCP Approved mean?", a: "DTCP (Directorate of Town and Country Planning) approval means the property layout has been sanctioned by the TN government. Only DTCP-approved plots are legally permissible for residential construction outside CMDA zones." },
  { category: "Buying", q: "What is a Patta number and why is it important?", a: "A Patta (also called Chitta) is a land revenue document issued by the Tamil Nadu government. It proves ownership of a piece of land. Always insist on a Patta before purchasing a plot in Tamil Nadu." },
  { category: "Buying", q: "How is the property price formatted on Aadana Tharakar?", a: "We display prices in standard Indian format — Lakhs (L) and Crores (Cr). For example, ₹45 L means ₹45,00,000 and ₹1.2 Cr means ₹1,20,00,000." },
  { category: "Renting", q: "How do I contact an agent about a rental?", a: "Click the 'Call Agent' or 'WhatsApp' button on any property listing. Our agents are available Mon–Sat 9am–7pm. For premium listings, you can schedule a visit directly from the property page." },
  { category: "Renting", q: "Are rental prices negotiable?", a: "Rental prices listed are typically starting prices. Most agents are open to negotiation, especially for longer lease terms (11 months or more). Use our WhatsApp integration to discuss terms directly." },
  { category: "Listing", q: "How do I list my property on Aadana Tharakar?", a: "Register as an Agent or Builder, complete the verification process, and use the 'Add Property' form in your dashboard. Listings go live after our team verifies the DTCP/RERA details (usually within 24 hours)." },
  { category: "Listing", q: "What documents do I need to list a property?", a: "For plots: Patta, DTCP approval, and EC (Encumbrance Certificate). For apartments: RERA certificate, occupancy certificate, and approved building plan. Our system validates these automatically." },
  { category: "Account", q: "How do I reset my password?", a: "Click 'Forgot Password' on the login page and enter your registered email. You'll receive a reset link valid for 30 minutes." },
  { category: "Account", q: "Is my data secure on Aadana Tharakar?", a: "Yes. We use BCrypt for password hashing, 15-minute JWT access tokens with Redis-backed blacklisting, and TLS encryption for all data in transit. We never sell your personal data to third parties." },
];

export default function FAQPage() {
  const categories = [...new Set(faqs.map((f) => f.category))];

  return (
    <main className="min-h-screen bg-[#0A0F1E] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-4">Support</p>
          <h1 className="text-5xl font-bold text-white">Frequently Asked Questions</h1>
          <p className="text-slate-400 mt-4 text-lg">Everything you need to know about Tamil Nadu real estate.</p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-10">
            <h2 className="text-[#C9A84C] font-semibold text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="h-px w-8 bg-[#C9A84C]/40 block" />
              {category}
            </h2>
            <div className="space-y-3">
              {faqs
                .filter((f) => f.category === category)
                .map((faq) => (
                  <details
                    key={faq.q}
                    className="group bg-[#111827] border border-white/5 rounded-xl overflow-hidden hover:border-[#C9A84C]/20 transition-colors"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none list-none">
                      <span className="text-white font-medium pr-4">{faq.q}</span>
                      <span className="text-[#C9A84C] text-xl flex-shrink-0 transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <div className="px-5 pb-5 text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </details>
                ))}
            </div>
          </div>
        ))}

        <div className="mt-12 text-center p-8 bg-[#111827] border border-[#C9A84C]/20 rounded-2xl">
          <p className="text-white font-semibold text-lg mb-2">Still have questions?</p>
          <p className="text-slate-400 mb-4">Our support team replies in Tamil and English within 4 hours.</p>
          <a
            href="https://wa.me/919876543210"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
          >
            💬 WhatsApp Support
          </a>
        </div>
      </div>
    </main>
  );
}
