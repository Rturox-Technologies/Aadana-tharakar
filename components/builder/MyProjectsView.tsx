"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Hammer,
  Search,
  MapPin,
  Trash2,
  Edit2,
  Camera,
  Layers,
  ShieldCheck,
  TrendingUp,
  FileCheck2,
  ExternalLink
} from "lucide-react";

interface BuilderProject {
  id: string;
  name: string;
  type: string;
  city: string;
  locality: string;
  reraId: string;
  totalUnits: number;
  soldUnits: number;
  priceRange: string;
  views: number;
  status: "Upcoming" | "Under Construction" | "Completed";
  image: string;
}

const INITIAL_PROJECTS: BuilderProject[] = [
  {
    id: "bp1",
    name: "Chola Royal Enclave Townships",
    type: "Apartment / Penthouse",
    city: "Coimbatore",
    locality: "Ramanathapuram",
    reraId: "TN/30/Building/0144/2025",
    totalUnits: 180,
    soldUnits: 112,
    priceRange: "₹85 L - 1.60 Cr",
    views: 482,
    status: "Under Construction",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "bp2",
    name: "Kovai Royal Meadows",
    type: "Premium Villa Enclave",
    city: "Coimbatore",
    locality: "Saravanampatti",
    reraId: "TN/30/Building/0255/2026",
    totalUnits: 45,
    soldUnits: 38,
    priceRange: "₹2.2 - 3.8 Cr",
    views: 248,
    status: "Completed",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "bp3",
    name: "Trichy Chola Gardens",
    type: "DTCP Residential Plots",
    city: "Trichy",
    locality: "Kondayampettai",
    reraId: "TN/16/Plots/0088/2026",
    totalUnits: 120,
    soldUnits: 15,
    priceRange: "₹25 - 45 L",
    views: 112,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
  }
];

export default function MyProjectsView() {
  const [projects, setProjects] = useState<BuilderProject[]>(INITIAL_PROJECTS);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.locality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to permanently delete this project? This will remove all associated residential listings.")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      alert("Project deleted successfully from the registry.");
    }
  };

  const handleToggleStatus = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const statuses: BuilderProject["status"][] = ["Upcoming", "Under Construction", "Completed"];
          const nextIdx = (statuses.indexOf(p.status) + 1) % statuses.length;
          const nextStatus = statuses[nextIdx];
          alert(`Success: Project status updated to ${nextStatus}`);
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  return (
    <div className="space-y-6 text-slate-100 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <Hammer className="size-5.5 text-[#C9A84C]" /> Gated Community Catalog
          </h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            Audit under-construction enclaves, track units sold matrixes, and register verification files.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <Card className="bg-[#0B0F19] border-slate-800 p-4 shadow-sm flex items-center gap-3">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search className="size-4" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search within projects registry by name, city, locality..."
            className="w-full bg-[#070A13] border border-slate-850 rounded-lg py-2 pl-9 pr-3 text-xs text-slate-350 focus:outline-none focus:border-slate-700 transition-colors placeholder:text-slate-600"
          />
        </div>
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="text-xs text-slate-400 hover:text-white">
            Clear
          </button>
        )}
      </Card>

      {/* Projects Matrix Grid */}
      {filteredProjects.length === 0 ? (
        <Card className="bg-[#0B0F19] border-slate-800 py-16 text-center shadow-xs">
          <p className="text-slate-500 font-bold text-xs">No project registries found matching search query.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => {
            const pctSold = Math.round((p.soldUnits / p.totalUnits) * 100);

            return (
              <Card key={p.id} className="bg-[#0B0F19] border-slate-800 shadow-md overflow-hidden flex flex-col justify-between group">
                <div>
                  {/* Photo Gallery */}
                  <div className="h-44 relative bg-slate-900 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 opacity-80"
                    />
                    <div className="absolute top-3 left-3 bg-[#111827] text-white border border-[#C9A84C]/30 font-extrabold text-[8px] px-2.5 py-0.5 rounded tracking-widest uppercase">
                      {p.type}
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <Badge className={`font-extrabold text-[8px] uppercase border px-2 py-0.5 ${
                        p.status === "Completed" && "bg-emerald-600 border-emerald-700 text-white" ||
                        p.status === "Under Construction" && "bg-[#C9A84C] border-[#C9A84C] text-[#070A13]" ||
                        "bg-[#111827] border-slate-700 text-slate-350"
                      }`}>
                        {p.status}
                      </Badge>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-[#111827] text-[#C9A84C] border border-[#C9A84C]/25 font-extrabold font-mono text-xs px-2.5 py-1 rounded shadow-sm">
                      {p.priceRange}
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="p-4 space-y-4 text-xs">
                    <div>
                      <h4 className="font-extrabold text-white text-sm truncate" title={p.name}>{p.name}</h4>
                      <p className="text-[10px] text-slate-500 font-bold flex items-center gap-0.5 mt-0.5">
                        <MapPin className="size-3 shrink-0" /> {p.locality}, {p.city}
                      </p>
                    </div>

                    {/* Legal Badge verification */}
                    <div className="p-2.5 bg-[#070A13] border border-slate-850 rounded space-y-1.5">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-500 font-bold flex items-center gap-1">
                          <ShieldCheck className="size-3.5 text-[#C9A84C] shrink-0" /> CMDA/DTCP Approved
                        </span>
                        <span className="text-emerald-500 font-bold">Cleared</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] border-t border-slate-800/40 pt-1.5">
                        <span className="text-slate-500 font-bold flex items-center gap-1">
                          <FileCheck2 className="size-3.5 text-[#C9A84C] shrink-0" /> RERA File
                        </span>
                        <span className="font-mono font-bold text-slate-300">{p.reraId.split("/")[3] || "Approved"}</span>
                      </div>
                    </div>

                    {/* Units Sold Matrix */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400">
                        <span>Units Matrix: {p.soldUnits} / {p.totalUnits} Sold</span>
                        <span className="text-[#C9A84C] font-mono">{pctSold}%</span>
                      </div>
                      <div className="w-full bg-[#070A13] rounded-full h-1.5 border border-slate-850">
                        <div
                          className="bg-[#C9A84C] h-1.5 rounded-full transition-all"
                          style={{ width: `${pctSold}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grid controls */}
                <div className="p-4 border-t border-slate-850 grid grid-cols-4 gap-2 text-center text-[10px] bg-[#090D17]">
                  <button
                    onClick={() => handleToggleStatus(p.id)}
                    className="py-1.5 rounded border border-slate-800 bg-[#111827] text-slate-300 font-bold hover:bg-slate-800 flex flex-col items-center justify-center gap-1 transition-colors"
                    title="Change Construction Status"
                  >
                    <Layers className="size-3.5 text-[#C9A84C]" />
                    <span>State</span>
                  </button>

                  <button
                    onClick={() => alert("Simulation: Launch project edit wizard...")}
                    className="py-1.5 rounded border border-slate-800 bg-[#111827] text-slate-300 font-bold hover:bg-slate-800 flex flex-col items-center justify-center gap-1 transition-colors"
                    title="Edit Details"
                  >
                    <Edit2 className="size-3.5 text-[#C9A84C]" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => alert("Simulation: Launch bulk files/render uploader...")}
                    className="py-1.5 rounded border border-slate-800 bg-[#111827] text-slate-300 font-bold hover:bg-slate-800 flex flex-col items-center justify-center gap-1 transition-colors"
                    title="Add Media renders"
                  >
                    <Camera className="size-3.5 text-[#C9A84C]" />
                    <span>Photos</span>
                  </button>

                  <button
                    onClick={() => handleDeleteProject(p.id)}
                    className="py-1.5 rounded border border-rose-950 bg-rose-950/10 text-rose-500 font-bold hover:bg-rose-950/30 flex flex-col items-center justify-center gap-1 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="size-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
