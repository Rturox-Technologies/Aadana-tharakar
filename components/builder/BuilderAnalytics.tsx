"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  Legend
} from "recharts";
import {
  TrendingUp,
  BarChart3,
  Eye,
  MessageSquare,
  Sparkles,
  Layers,
  CheckCircle2
} from "lucide-react";

// Mock datasets for Chola Builders
const PROJECTS_INQUIRIES_DATA = [
  { name: "Chola Royal Enclave", inquiries: 142, views: 482, city: "Coimbatore" },
  { name: "Kovai Royal Meadows", inquiries: 82, views: 248, city: "Coimbatore" },
  { name: "Trichy Chola Gardens", inquiries: 24, views: 112, city: "Trichy" }
];

const MONTHLY_LEADS_DATA = [
  { month: "Jan", direct: 18, whatsapp: 14 },
  { month: "Feb", direct: 22, whatsapp: 26 },
  { month: "Mar", direct: 35, whatsapp: 27 },
  { month: "Apr", direct: 24, whatsapp: 30 },
  { month: "May", direct: 42, whatsapp: 46 }
];

export default function BuilderAnalytics() {
  return (
    <div className="space-y-6 text-slate-100 animate-in fade-in-50 duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="size-5.5 text-[#C9A84C]" /> Developer Analytics Dashboard
          </h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            Audit customer clicks, track layout performance ratios, and monitor lead channels.
          </p>
        </div>
        <Badge className="bg-[#111827] border border-slate-800 text-[#C9A84C] font-extrabold px-3 py-1 text-xs">
          Developer ID: CHOLA_DEV
        </Badge>
      </div>

      {/* Grid of Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#0B0F19] border-slate-800 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded bg-[#111827] border border-slate-800 text-[#C9A84C] flex items-center justify-center shrink-0">
              <Eye className="size-4.5" />
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Aggregate Views</span>
              <h4 className="text-base font-black text-white">842 Unique Hits</h4>
            </div>
          </div>
          <div className="mt-3 text-[9px] text-slate-400 font-semibold flex items-center gap-0.5">
            <TrendingUp className="size-3 text-emerald-500" /> +24% click rate on new plots
          </div>
        </Card>

        <Card className="bg-[#0B0F19] border-slate-800 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded bg-[#111827] border border-slate-800 text-[#C9A84C] flex items-center justify-center shrink-0">
              <MessageSquare className="size-4.5" />
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Inquiry Volume</span>
              <h4 className="text-base font-black text-white">248 Customer Leads</h4>
            </div>
          </div>
          <div className="mt-3 text-[9px] text-slate-400 font-semibold flex items-center gap-0.5">
            <CheckCircle2 className="size-3 text-emerald-550" /> 68% WhatsApp click-throughs
          </div>
        </Card>

        <Card className="bg-[#0B0F19] border-slate-800 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded bg-[#111827] border border-slate-800 text-[#C9A84C] flex items-center justify-center shrink-0">
              <Layers className="size-4.5" />
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Units Registered</span>
              <h4 className="text-base font-black text-white">345 Gated Units</h4>
            </div>
          </div>
          <div className="mt-3 text-[9px] text-[#C9A84C] font-semibold flex items-center gap-0.5">
            <Sparkles className="size-3" /> Fully CMDA & DTCP verified
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BAR CHART: PROJECTS INQUIRIES */}
        <Card className="bg-[#0B0F19] border-slate-800 p-5 shadow-md space-y-4">
          <div>
            <h3 className="font-extrabold text-white text-sm">Gated Community Click Ratios</h3>
            <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">Total views versus direct inquiries per residential project.</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PROJECTS_INQUIRIES_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6, background: "#0B0F19", border: "1px solid #1e293b", color: "#fff" }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="views" name="Project Page Views" fill="#111827" stroke="#C9A84C" strokeWidth={1} radius={[4, 4, 0, 0]} />
                <Bar dataKey="inquiries" name="Leads Generated" fill="#C9A84C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* LINE CHART: MONTHLY LEAD CHANNELS */}
        <Card className="bg-[#0B0F19] border-slate-800 p-5 shadow-md space-y-4">
          <div>
            <h3 className="font-extrabold text-white text-sm">Inquiry Channel Trends</h3>
            <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">Track WhatsApp bilingual inquiries versus direct web logs monthly.</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_LEADS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6, background: "#0B0F19", border: "1px solid #1e293b", color: "#fff" }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Line type="monotone" dataKey="whatsapp" name="WhatsApp Greetings Fired" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3, fill: "#10b981" }} />
                <Line type="monotone" dataKey="direct" name="Direct Inquiries Filed" stroke="#C9A84C" strokeWidth={2.5} dot={{ r: 3, fill: "#C9A84C" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
