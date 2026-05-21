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
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import {
  TrendingUp,
  BarChart3,
  Eye,
  MessageSquare,
  Users,
  Calendar,
  Sparkles
} from "lucide-react";

// Mock datasets matching சுரேஷ் குமார் listings
const PROPERTY_VIEWS_DATA = [
  { name: "Vasantham Villa", views: 324, inquiries: 82, city: "Chennai" },
  { name: "ECR Beach Mansion", views: 184, inquiries: 42, city: "Chennai" },
  { name: "Srirangam Temple Res", views: 142, inquiries: 28, city: "Trichy" }
];

const INQUIRY_CHANNELS_DATA = [
  { name: "WhatsApp Bilingual", value: 84, color: "#10b981" },
  { name: "Direct Portal Leads", value: 38, color: "#0F172A" },
  { name: "Physical Office Walks", value: 12, color: "#C9A84C" },
  { name: "Broker Referrals", value: 8, color: "#6366f1" }
];

export default function AnalyticsView() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="size-5.5 text-[#0F172A]" /> Performance Analytics
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time tracking of buyer search metrics, click-through inquiries, and channels performance.
          </p>
        </div>
        <Badge className="bg-[#0F172A] text-white border-none font-bold px-3 py-1 text-xs">
          Live Tracker Sync
        </Badge>
      </div>

      {/* Grid of Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border-slate-100 p-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Eye className="size-4.5" />
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Portfolio Views</span>
              <h4 className="text-base font-black text-slate-800">650 Unique Views</h4>
            </div>
          </div>
          <div className="mt-3 text-[9px] text-slate-500 font-semibold flex items-center gap-0.5">
            <TrendingUp className="size-3 text-emerald-500" /> +18.4% compared to last month
          </div>
        </Card>

        <Card className="bg-white border-slate-100 p-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <MessageSquare className="size-4.5" />
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Inquiry Conversion</span>
              <h4 className="text-base font-black text-slate-800">23.3% Chat Rate</h4>
            </div>
          </div>
          <div className="mt-3 text-[9px] text-slate-500 font-semibold flex items-center gap-0.5">
            <TrendingUp className="size-3 text-emerald-500" /> High-volume WhatsApp greets active
          </div>
        </Card>

        <Card className="bg-white border-slate-100 p-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Users className="size-4.5" />
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Closed Deal Volume</span>
              <h4 className="text-base font-black text-slate-800">₹4.50 Cr Volume</h4>
            </div>
          </div>
          <div className="mt-3 text-[9px] text-slate-500 font-semibold flex items-center gap-0.5">
            <Sparkles className="size-3 text-amber-500" /> ECR Luxury Villa Closed successfully
          </div>
        </Card>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* BAR CHART: PORTFOLIO PERFORMANCE */}
        <Card className="bg-white border-slate-200 p-5 shadow-2xs space-y-4">
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm">Portfolio Performance Comparison</h3>
            <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">Total views versus direct lead queries per listing.</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PROPERTY_VIEWS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6, background: "#0F172A", border: "none", color: "#fff" }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="views" name="Page Views" fill="#0F172A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inquiries" name="Inquiries Filed" fill="#C9A84C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* PIE CHART: INQUIRY CHANNELS */}
        <Card className="bg-white border-slate-200 p-5 shadow-2xs space-y-4">
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm">Lead Generation Channels</h3>
            <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">Percentage distribution of buyer contact channels.</p>
          </div>

          <div className="h-64 w-full flex flex-col justify-center items-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={INQUIRY_CHANNELS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {INQUIRY_CHANNELS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} leads`} contentStyle={{ fontSize: 10, borderRadius: 6 }} />
              </PieChart>
            </ResponsiveContainer>

            {/* Customized Legend Grid */}
            <div className="grid grid-cols-2 gap-4 text-left w-full max-w-sm text-[10px] font-bold text-slate-500 pt-2 border-t border-slate-50">
              {INQUIRY_CHANNELS_DATA.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="truncate">{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
