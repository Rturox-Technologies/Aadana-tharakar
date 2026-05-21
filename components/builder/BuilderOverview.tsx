"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Hammer,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  Milestone,
  ArrowRight,
  Sparkles,
  Layers,
  MapPin,
  ExternalLink
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";

const MONTHLY_LEADS_TREND = [
  { month: "Jan", leads: 32 },
  { month: "Feb", leads: 48 },
  { month: "Mar", leads: 62 },
  { month: "Apr", leads: 54 },
  { month: "May", leads: 88 },
];

interface BuilderOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export default function BuilderOverview({ onNavigateTab }: BuilderOverviewProps) {
  return (
    <div className="space-y-6 text-slate-100">
      {/* Welcome Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
            <Sparkles className="size-5.5 text-[#C9A84C]" /> Chola Builders Dashboard
          </h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            Constructing luxury gated townships, premium high-rises, and DTCP layout enclaves across Tamil Nadu.
          </p>
        </div>
        <Badge className="bg-[#111827] border border-slate-800 text-[#C9A84C] font-extrabold px-3 py-1.5 text-xs shadow-xs">
          Exclusive Elite Tier Developer
        </Badge>
      </div>

      {/* Grid of Key Construction Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Residential Units */}
        <Card className="bg-[#0B0F19] border-slate-800 p-4 shadow-sm flex items-center gap-4">
          <div className="size-11 rounded-lg bg-amber-500/10 text-[#C9A84C] flex items-center justify-center shrink-0 border border-[#C9A84C]/20">
            <Layers className="size-5.5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Project Units</p>
            <h3 className="text-lg font-black text-white mt-0.5">380 Units</h3>
            <p className="text-[9px] text-emerald-500 font-bold flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="size-3 text-emerald-500" /> 165 Units Sold Out
            </p>
          </div>
        </Card>

        {/* DTCP/RERA Compliance Ratios */}
        <Card className="bg-[#0B0F19] border-slate-800 p-4 shadow-sm flex items-center gap-4">
          <div className="size-11 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <ShieldCheck className="size-5.5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Legal Compliance</p>
            <h3 className="text-lg font-black text-white mt-0.5">100% RERA</h3>
            <p className="text-[9px] text-emerald-500 font-bold mt-0.5">
              DTCP / CMDA Cleared
            </p>
          </div>
        </Card>

        {/* Upcoming Projects */}
        <Card className="bg-[#0B0F19] border-slate-800 p-4 shadow-sm flex items-center gap-4">
          <div className="size-11 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
            <Hammer className="size-5.5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Upcoming Townships</p>
            <h3 className="text-lg font-black text-white mt-0.5">2 Pipelines</h3>
            <p className="text-[9px] text-slate-400 font-semibold mt-0.5">
              Kovai / Trichy launches
            </p>
          </div>
        </Card>

        {/* Active Inquiry Count */}
        <Card className="bg-[#0B0F19] border-slate-800 p-4 shadow-sm flex items-center gap-4">
          <div className="size-11 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
            <MessageSquare className="size-5.5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Inquiries</p>
            <h3 className="text-lg font-black text-white mt-0.5">248 Chats</h3>
            <p className="text-[9px] text-[#C9A84C] font-bold flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="size-3" /> +44% this month
            </p>
          </div>
        </Card>
      </div>

      {/* Main Row Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Spotlighting under-construction township */}
        <Card className="bg-[#0B0F19] border-slate-800/80 shadow-md overflow-hidden flex flex-col justify-between lg:col-span-1">
          <div>
            <div className="bg-[#111827] border-b border-slate-800 p-4 flex items-center justify-between">
              <div>
                <span className="text-[8px] font-black uppercase tracking-widest text-[#C9A84C]">Active Landmark Project</span>
                <h4 className="text-xs font-bold text-white mt-0.5">Grand Township</h4>
              </div>
              <Badge className="bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] font-extrabold text-[9px]">
                Under Construction
              </Badge>
            </div>

            <div className="h-44 relative bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
                alt="Chola Royal enclave"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute top-2 left-2 bg-emerald-600/90 text-white font-bold text-[9px] px-2 py-0.5 rounded shadow-sm">
                RERA Registered
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-[#C9A84C] font-bold font-mono text-xs px-2 py-1 rounded border border-[#C9A84C]/25">
                ₹85 L - 1.60 Cr
              </div>
            </div>

            <div className="p-4 space-y-3.5 text-xs text-slate-300">
              <div>
                <h4 className="font-extrabold text-white text-sm">Chola Royal Enclave Townships</h4>
                <p className="text-[10px] text-slate-400 font-bold flex items-center gap-0.5 mt-0.5">
                  <MapPin className="size-3 text-slate-500 shrink-0" /> Ramanathapuram, Coimbatore
                </p>
              </div>

              {/* Ratios stats */}
              <div className="grid grid-cols-2 gap-2 text-center p-2 rounded bg-[#070A13] border border-slate-800/80">
                <div>
                  <span className="text-[9px] font-bold text-slate-500 block uppercase">Total Units</span>
                  <p className="font-extrabold text-white text-sm mt-0.5 font-mono">180</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-500 block uppercase">Available</span>
                  <p className="font-extrabold text-[#C9A84C] text-sm mt-0.5 font-mono">68</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-800">
            <button
              onClick={() => onNavigateTab("projects")}
              className="w-full py-2 bg-[#111827] hover:bg-[#1f2937] text-white font-bold border border-[#C9A84C]/30 hover:border-[#C9A84C]/60 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              Auditing Projects Catalog <ExternalLink className="size-3.5" />
            </button>
          </div>
        </Card>

        {/* Lead Analytics Chart */}
        <Card className="bg-[#0B0F19] border-slate-800/80 shadow-md p-5 flex flex-col justify-between lg:col-span-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-extrabold text-white text-sm">Gated Community Inquiry Streams</h3>
                <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">Track monthly lead generation performance across portal listings.</p>
              </div>
              <button
                onClick={() => onNavigateTab("analytics")}
                className="text-xs font-bold text-[#C9A84C] hover:underline flex items-center gap-0.5"
              >
                Detailed Analytics <ArrowRight className="size-3.5" />
              </button>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_LEADS_TREND} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 10, background: "#0B0F19", border: "1px solid #1e293b", borderRadius: 4, color: "#fff" }} />
                  <defs>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="leads" name="Incoming Leads" stroke="#C9A84C" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            <span>Last Updated: Live Syncing</span>
            <span className="text-[#C9A84C]">CHOLA BUILDERS PVT LTD</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
