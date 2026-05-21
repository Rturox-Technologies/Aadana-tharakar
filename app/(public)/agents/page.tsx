import { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle, Star, MapPin, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Find Real Estate Agents in Tamil Nadu | Aadana Tharakar",
  description: "Browse verified real estate agents across Chennai, Coimbatore, Madurai, Salem, Trichy, and all major Tamil Nadu cities.",
};

const mockAgents = [
  { id: "1", name: "Rajesh Kumar", nameTa: "ராஜேஷ் குமார்", city: "Chennai", specialization: "Apartments & Villas", listings: 34, rating: 4.8, reviews: 127, verified: true, whatsapp: "9876543210", experience: "8 years", avatar: "RK" },
  { id: "2", name: "Priya Suresh", nameTa: "பிரியா சுரேஷ்", city: "Coimbatore", specialization: "Plots & Land", listings: 21, rating: 4.9, reviews: 89, verified: true, whatsapp: "9876543211", experience: "5 years", avatar: "PS" },
  { id: "3", name: "Senthil Murugan", nameTa: "செந்தில் முருகன்", city: "Madurai", specialization: "Commercial & Retail", listings: 15, rating: 4.7, reviews: 56, verified: true, whatsapp: "9876543212", experience: "12 years", avatar: "SM" },
  { id: "4", name: "Kavitha Rajan", nameTa: "கவிதா ராஜன்", city: "Salem", specialization: "Residential & Villas", listings: 28, rating: 4.6, reviews: 74, verified: true, whatsapp: "9876543213", experience: "6 years", avatar: "KR" },
  { id: "5", name: "Arun Prakash", nameTa: "அருண் பிரகாஷ்", city: "Trichy", specialization: "Apartments & Plots", listings: 19, rating: 4.8, reviews: 43, verified: true, whatsapp: "9876543214", experience: "4 years", avatar: "AP" },
  { id: "6", name: "Meena Chandran", nameTa: "மீனா சந்திரன்", city: "Tirunelveli", specialization: "Residential Properties", listings: 11, rating: 4.5, reviews: 29, verified: false, whatsapp: "9876543215", experience: "3 years", avatar: "MC" },
];

export default function AgentsPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E]">
      <section className="py-20 px-4 text-center">
        <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-4">Our Network</p>
        <h1 className="text-5xl font-bold text-white mb-4">
          Verified <span className="text-[#C9A84C]">Agents</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Connect directly with trusted, RERA-licensed real estate agents across Tamil Nadu.
        </p>
      </section>

      {/* City filter chips */}
      <section className="px-4 pb-10">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
          {["All", "Chennai", "Coimbatore", "Madurai", "Salem", "Trichy", "Tirunelveli"].map((city) => (
            <span key={city} className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-all ${city === "All" ? "bg-[#C9A84C] text-[#0A0F1E]" : "bg-[#111827] text-slate-300 border border-white/10 hover:border-[#C9A84C]/30"}`}>
              {city}
            </span>
          ))}
        </div>
      </section>

      {/* Agent grid */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAgents.map((agent) => (
            <div key={agent.id} className="bg-[#111827] border border-white/5 rounded-2xl p-6 hover:border-[#C9A84C]/20 transition-colors">
              {/* Avatar */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#E5C87A] flex items-center justify-center text-[#0A0F1E] font-bold text-lg flex-shrink-0">
                  {agent.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-semibold">{agent.name}</h3>
                    {agent.verified && (
                      <Award size={14} className="text-[#C9A84C] flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-slate-500 text-xs">{agent.nameTa}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={12} className="text-slate-500" />
                    <span className="text-slate-400 text-sm">{agent.city}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { label: "Listings", value: agent.listings },
                  { label: "Rating", value: agent.rating },
                  { label: "Reviews", value: agent.reviews },
                ].map((s) => (
                  <div key={s.label} className="bg-[#0A0F1E] rounded-lg p-2 text-center">
                    <p className="text-white font-bold text-sm">{s.value}</p>
                    <p className="text-slate-500 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(agent.rating) ? "text-[#C9A84C] fill-[#C9A84C]" : "text-slate-600"} />
                ))}
                <span className="text-slate-400 text-xs ml-1">{agent.experience} experience</span>
              </div>

              <p className="text-slate-400 text-sm mb-5">{agent.specialization}</p>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/91${agent.whatsapp}`}
                  className="flex items-center justify-center gap-2 py-2.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors text-sm font-medium"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
                <Link
                  href={`/agent/${agent.id}`}
                  className="flex items-center justify-center gap-2 py-2.5 border border-[#C9A84C]/30 text-[#C9A84C] rounded-lg hover:bg-[#C9A84C]/10 transition-colors text-sm font-medium"
                >
                  <Phone size={14} /> View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
