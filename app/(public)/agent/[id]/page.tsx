import { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle, Star, MapPin, Award, Building2, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

const mockAgents = [
  { id: "1", name: "Rajesh Kumar", nameTa: "ராஜேஷ் குமார்", city: "Chennai", specialization: "Apartments & Villas", listings: 34, rating: 4.8, reviews: 127, verified: true, whatsapp: "9876543210", experience: "8 years", avatar: "RK", bio: "Rajesh has been serving the Chennai real estate market since 2016, specialising in premium apartments in OMR, ECR, and Anna Nagar. Fluent in Tamil, Hindi, and English.", areas: ["OMR", "ECR", "Anna Nagar", "Velachery", "Adyar"] },
  { id: "2", name: "Priya Suresh", nameTa: "பிரியா சுரேஷ்", city: "Coimbatore", specialization: "Plots & Land", listings: 21, rating: 4.9, reviews: 89, verified: true, whatsapp: "9876543211", experience: "5 years", avatar: "PS", bio: "Priya is Coimbatore's top-rated plots agent with deep expertise in DTCP-approved layouts across RS Puram, Saravanampatti, and Ganapathy.", areas: ["RS Puram", "Saravanampatti", "Ganapathy", "Peelamedu"] },
  { id: "3", name: "Senthil Murugan", nameTa: "செந்தில் முருகன்", city: "Madurai", specialization: "Commercial & Retail", listings: 15, rating: 4.7, reviews: 56, verified: true, whatsapp: "9876543212", experience: "12 years", avatar: "SM", bio: "12 years of experience in Madurai commercial real estate. Senthil specialises in retail shops, warehouses, and showroom spaces near Mattuthavani and SS Colony.", areas: ["Mattuthavani", "SS Colony", "Anna Nagar", "Bypass Road"] },
  { id: "4", name: "Kavitha Rajan", nameTa: "கவிதா ராஜன்", city: "Salem", specialization: "Residential & Villas", listings: 28, rating: 4.6, reviews: 74, verified: true, whatsapp: "9876543213", experience: "6 years", avatar: "KR", bio: "Kavitha brings local Salem market expertise to every transaction, focusing on gated villa communities and RERA-approved residential layouts.", areas: ["Fairlands", "Shankar Nagar", "Gugai", "Suramangalam"] },
  { id: "5", name: "Arun Prakash", nameTa: "அருண் பிரகாஷ்", city: "Trichy", specialization: "Apartments & Plots", listings: 19, rating: 4.8, reviews: 43, verified: true, whatsapp: "9876543214", experience: "4 years", avatar: "AP", bio: "Arun is Trichy's emerging real estate talent, specialising in affordable apartments near Thillai Nagar and plots in Woraiyur.", areas: ["Thillai Nagar", "Woraiyur", "Srirangam", "K.K. Nagar"] },
  { id: "6", name: "Meena Chandran", nameTa: "மீனா சந்திரன்", city: "Tirunelveli", specialization: "Residential Properties", listings: 11, rating: 4.5, reviews: 29, verified: false, whatsapp: "9876543215", experience: "3 years", avatar: "MC", bio: "Meena serves the Tirunelveli and Palayamkottai residential market with a focus on family-friendly gated communities.", areas: ["Palayamkottai", "Vannarpet", "Melapalayam", "NGO Colony"] },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const agent = mockAgents.find((a) => a.id === id);
  if (!agent) return { title: "Agent Not Found | Aadana Tharakar" };
  return {
    title: `${agent.name} — Real Estate Agent in ${agent.city} | Aadana Tharakar`,
    description: agent.bio,
  };
}

export default async function AgentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = mockAgents.find((a) => a.id === id);
  if (!agent) notFound();

  return (
    <main className="min-h-screen bg-[#0A0F1E] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/agents" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Agents
        </Link>

        {/* Profile Card */}
        <div className="bg-[#111827] border border-white/5 rounded-2xl p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#E5C87A] flex items-center justify-center text-[#0A0F1E] font-bold text-2xl flex-shrink-0">
              {agent.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold text-white">{agent.name}</h1>
                {agent.verified && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] rounded-full text-xs font-semibold">
                    <Award size={12} /> Verified Agent
                  </span>
                )}
              </div>
              <p className="text-slate-500 text-sm mt-1">{agent.nameTa}</p>
              <div className="flex items-center gap-2 mt-2">
                <MapPin size={14} className="text-slate-500" />
                <span className="text-slate-400">{agent.city}, Tamil Nadu</span>
              </div>
              <p className="text-slate-400 mt-4 leading-relaxed">{agent.bio}</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/5">
            {[
              { label: "Active Listings", value: agent.listings },
              { label: "Rating", value: `${agent.rating} ⭐` },
              { label: "Client Reviews", value: agent.reviews },
              { label: "Experience", value: agent.experience },
            ].map((s) => (
              <div key={s.label} className="text-center p-4 bg-[#0A0F1E] rounded-xl">
                <p className="text-xl font-bold text-[#C9A84C]">{s.value}</p>
                <p className="text-slate-500 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Areas Covered */}
        <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <Building2 size={18} className="text-[#C9A84C]" /> Areas Covered
          </h2>
          <div className="flex flex-wrap gap-2">
            {agent.areas.map((area) => (
              <span key={area} className="px-3 py-1.5 bg-[#0A0F1E] border border-white/10 text-slate-300 rounded-lg text-sm">
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href={`https://wa.me/91${agent.whatsapp}`}
            className="flex items-center justify-center gap-3 py-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl hover:bg-green-500/20 transition-colors font-semibold"
          >
            <MessageCircle size={20} /> Chat on WhatsApp
          </a>
          <a
            href={`tel:+91${agent.whatsapp}`}
            className="flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#C9A84C] to-[#E5C87A] text-[#0A0F1E] rounded-xl hover:opacity-90 transition-opacity font-bold"
          >
            <Phone size={20} /> Call Agent
          </a>
        </div>
      </div>
    </main>
  );
}
