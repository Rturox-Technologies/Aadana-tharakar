"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  TrendingUp,
  TrendingDown,
  Building,
  Users,
  IndianRupee,
  Activity,
  ArrowRight,
  Eye,
  CheckCircle2,
  Calendar,
  Phone
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from "recharts";
import { api } from "@/lib/api";
import { ALL_MOCK_PROPERTIES } from "@/lib/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Hardcoded analytical mock data for fallbacks
const MOCK_REVENUE_TRENDS = [
  { month: "Jun 2025", revenue: 840000 },
  { month: "Jul 2025", revenue: 950000 },
  { month: "Aug 2025", revenue: 1120000 },
  { month: "Sep 2025", revenue: 1050000 },
  { month: "Oct 2025", revenue: 1350000 },
  { month: "Nov 2025", revenue: 1480000 },
  { month: "Dec 2025", revenue: 1650000 },
  { month: "Jan 2026", revenue: 1820000 },
  { month: "Feb 2026", revenue: 1710000 },
  { month: "Mar 2026", revenue: 2100000 },
  { month: "Apr 2026", revenue: 2450000 },
  { month: "May 2026", revenue: 2890000 },
];

const MOCK_PROPERTIES_BY_CITY = [
  { city: "Chennai", listings: 34, val: 340000000 },
  { city: "Coimbatore", listings: 26, val: 195000000 },
  { city: "Madurai", listings: 18, val: 110000000 },
  { city: "Tirunelveli", listings: 12, val: 48000000 },
  { city: "Trichy", listings: 9, val: 35000000 },
  { city: "Salem", listings: 7, val: 28000000 },
];

const MOCK_RECENT_LEADS = [
  { id: "lead-1", name: "Ramesh Krishnan", phone: "+91 98400 55667", property: "Vasantham Premium Gold Villa", status: "Contacted", date: "2026-05-20" },
  { id: "lead-2", name: "Priya Dharshini", phone: "+91 94441 22334", property: "Marutham Royal Heights", status: "Visited", date: "2026-05-19" },
  { id: "lead-3", name: "Anand Kumar", phone: "+91 98840 99887", property: "Nellai Majestic Meadows", status: "New", date: "2026-05-18" },
  { id: "lead-4", name: "Subash Bose", phone: "+91 90030 11223", property: "Luxury Beachfront Villa ECR", status: "Closed", date: "2026-05-15" },
  { id: "lead-5", name: "Revathi Mani", phone: "+91 98940 44556", property: "Temple View Residency", status: "Negotiating", date: "2026-05-14" },
];

// Helper formatter
const formatCurrency = (value: number) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  }
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)} L`;
  }
  return `₹${value.toLocaleString("en-IN")}`;
};

export default function OverviewView() {
  // Setup React Query with mock fallback mechanism
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin", "dashboard-stats"],
    queryFn: async () => {
      try {
        const response = await api.get<any>("/admin/stats");
        return response;
      } catch (err) {
        console.warn("Backend admin stats offline. Serving high-end luxury mockup context.", err);
        return {
          totalProperties: 106,
          activeProperties: 74,
          totalUsers: 1420,
          monthlyRevenue: 2890000,
          growth: {
            properties: 12.4,
            active: 8.2,
            users: 18.5,
            revenue: 22.8,
          }
        };
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const dashboardStats = stats || {
    totalProperties: 106,
    activeProperties: 74,
    totalUsers: 1420,
    monthlyRevenue: 2890000,
    growth: {
      properties: 12.4,
      active: 8.2,
      users: 18.5,
      revenue: 22.8,
    }
  };

  const funnelStages = [
    { name: "New Leads", count: 120, pct: "100%", desc: "Direct inquiries logged" },
    { name: "Contacted", count: 94, pct: "78.3%", desc: "Phone call or WhatsApp active" },
    { name: "Visited", count: 54, pct: "45.0%", desc: "Physical property inspections" },
    { name: "Closed Won", count: 24, pct: "20.0%", desc: "Advance advance payments signed" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Introduction Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            வணக்கம், அருண் குமார் <span className="text-wave">👋</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Here's an overview of Aadana Tharakar's activity and performance index across Tamil Nadu today.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-[#C9A84C] font-semibold">
          <Calendar className="size-3.5" />
          <span>Sync Cycle Active: Live</span>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Properties */}
        <Card className="bg-[#111827] border-[#C9A84C]/10 rounded-xl p-5 hover:border-[#C9A84C]/30 hover:shadow-lg hover:shadow-[#C9A84C]/5 transition-all group flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
                Total Properties
              </span>
              <h3 className="text-3xl font-extrabold text-white mt-2 tracking-tight">
                {dashboardStats.totalProperties}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Building className="size-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-emerald-400">
            <TrendingUp className="size-3.5" />
            <span>+{dashboardStats.growth.properties}%</span>
            <span className="text-slate-500 font-medium">from last month</span>
          </div>
        </Card>

        {/* Card 2: Active Listings */}
        <Card className="bg-[#111827] border-[#C9A84C]/10 rounded-xl p-5 hover:border-[#C9A84C]/30 hover:shadow-lg hover:shadow-[#C9A84C]/5 transition-all group flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
                Active Listings
              </span>
              <h3 className="text-3xl font-extrabold text-white mt-2 tracking-tight">
                {dashboardStats.activeProperties}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Activity className="size-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-emerald-400">
            <TrendingUp className="size-3.5" />
            <span>+{dashboardStats.growth.active}%</span>
            <span className="text-slate-500 font-medium">listings verified</span>
          </div>
        </Card>

        {/* Card 3: Total Users */}
        <Card className="bg-[#111827] border-[#C9A84C]/10 rounded-xl p-5 hover:border-[#C9A84C]/30 hover:shadow-lg hover:shadow-[#C9A84C]/5 transition-all group flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
                Total Registrations
              </span>
              <h3 className="text-3xl font-extrabold text-white mt-2 tracking-tight">
                {dashboardStats.totalUsers.toLocaleString("en-IN")}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Users className="size-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-emerald-400">
            <TrendingUp className="size-3.5" />
            <span>+{dashboardStats.growth.users}%</span>
            <span className="text-slate-500 font-medium">verified buyers</span>
          </div>
        </Card>

        {/* Card 4: Monthly Revenue */}
        <Card className="bg-[#111827] border-[#C9A84C]/10 rounded-xl p-5 hover:border-[#C9A84C]/30 hover:shadow-lg hover:shadow-[#C9A84C]/5 transition-all group flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
                Monthly Ads Revenue
              </span>
              <h3 className="text-3xl font-extrabold text-[#C9A84C] mt-2 tracking-tight">
                {formatCurrency(dashboardStats.monthlyRevenue)}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/25 text-[#C9A84C]">
              <IndianRupee className="size-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-[#C9A84C]">
            <TrendingUp className="size-3.5" />
            <span>+{dashboardStats.growth.revenue}%</span>
            <span className="text-slate-500 font-medium">campaign revenue</span>
          </div>
        </Card>
      </div>

      {/* Analytics Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Area Chart */}
        <Card className="lg:col-span-2 bg-[#111827] border-slate-800 p-6 rounded-xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Revenue Trends</h3>
              <p className="text-xs text-slate-400 mt-0.5">Recurring ad subscriptions & features promotion campaigns</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Total 12 Months</span>
              <span className="text-sm font-semibold text-[#C9A84C]">{formatCurrency(19000000)}</span>
            </div>
          </div>

          <div className="h-72 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_REVENUE_TRENDS} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#C9A84C" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `₹${val / 100000}L`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#0A0F1E] border border-[#C9A84C]/35 rounded-lg p-3 shadow-xl">
                          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{payload[0].payload.month}</p>
                          <p className="text-sm font-bold text-[#C9A84C] mt-1">{formatCurrency(payload[0].value as number)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#C9A84C"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#goldGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Right Column: Bar Chart */}
        <Card className="bg-[#111827] border-slate-800 p-6 rounded-xl flex flex-col justify-between">
          <div className="flex flex-col pb-4 mb-4 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white tracking-tight">Regional Strength</h3>
            <p className="text-xs text-slate-400 mt-0.5">Top cities by listings count</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_PROPERTIES_BY_CITY} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis
                  dataKey="city"
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#0A0F1E] border border-[#C9A84C]/30 rounded-lg p-2.5 shadow-xl text-xs">
                          <p className="font-bold text-white">{payload[0].payload.city}</p>
                          <p className="text-slate-400 mt-1">Properties: <span className="text-white font-semibold">{payload[0].value}</span></p>
                          <p className="text-slate-400">Total Value: <span className="text-[#C9A84C] font-semibold">{formatCurrency(payload[0].payload.val)}</span></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="listings" fill="#1f2937" radius={[4, 4, 0, 0]}>
                  {MOCK_PROPERTIES_BY_CITY.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#C9A84C" : index === 1 ? "#9b813b" : "#1e293b"}
                      stroke={index < 2 ? "#C9A84C" : "#334155"}
                      strokeWidth={1}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Conversion Funnel Row */}
      <div className="bg-[#111827] border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white tracking-tight mb-1">Lead Conversion Funnel</h3>
        <p className="text-xs text-slate-400 mb-6">CRM process stages pipeline performance metric</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {funnelStages.map((stage, idx) => (
            <div key={idx} className="bg-[#0A0F1E] border border-slate-800 rounded-lg p-4 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-xs font-semibold text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                Stage {idx + 1}
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stage.name}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-extrabold text-white">{stage.count}</span>
                <span className="text-xs text-[#C9A84C] font-semibold">({stage.pct})</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{stage.desc}</p>
              
              {/* Process Bar Visualizer */}
              <div className="w-full bg-slate-900 h-1.5 rounded-full mt-3 overflow-hidden">
                <div 
                  className="bg-[#C9A84C] h-full rounded-full"
                  style={{ width: stage.pct }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity and Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left 3 Columns: Recent Leads */}
        <Card className="lg:col-span-3 bg-[#111827] border-slate-800 p-6 rounded-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Recent Customer Leads</h3>
              <p className="text-xs text-slate-400 mt-0.5">Fresh acquisitions waiting for follow-ups</p>
            </div>
            <button className="text-xs font-semibold text-[#C9A84C] hover:underline flex items-center gap-1 group">
              Manage CRM <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 text-slate-500 font-semibold">
                  <th className="pb-3 pt-1">Client Name</th>
                  <th className="pb-3 pt-1">Property Inquiry</th>
                  <th className="pb-3 pt-1">Status</th>
                  <th className="pb-3 pt-1 text-right">Inquiry Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-slate-300">
                {MOCK_RECENT_LEADS.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-900/30 transition-colors">
                    <td className="py-3">
                      <p className="font-semibold text-slate-200">{lead.name}</p>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone className="size-2.5" /> {lead.phone}
                      </p>
                    </td>
                    <td className="py-3 font-medium max-w-[150px] truncate">{lead.property}</td>
                    <td className="py-3">
                      <Badge
                        className={cn(
                          "rounded text-[10px] px-2 py-0.5 font-bold border",
                          lead.status === "New" && "bg-blue-500/10 border-blue-500/25 text-blue-400",
                          lead.status === "Contacted" && "bg-amber-500/10 border-amber-500/25 text-amber-400",
                          lead.status === "Visited" && "bg-purple-500/10 border-purple-500/25 text-purple-400",
                          lead.status === "Closed" && "bg-emerald-500/10 border-emerald-500/25 text-emerald-400",
                          lead.status === "Negotiating" && "bg-indigo-500/10 border-indigo-500/25 text-indigo-400"
                        )}
                      >
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-right text-slate-500 font-mono">{lead.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Right 2 Columns: Top Performing Properties */}
        <Card className="lg:col-span-2 bg-[#111827] border-slate-800 p-6 rounded-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Top Properties</h3>
              <p className="text-xs text-slate-400 mt-0.5">By platform view-count metrics</p>
            </div>
            <span className="p-1 rounded bg-slate-900 border border-slate-800 text-[#C9A84C]">
              <Eye className="size-3.5" />
            </span>
          </div>

          <div className="space-y-4">
            {ALL_MOCK_PROPERTIES.slice(0, 4).map((p, idx) => (
              <div 
                key={p.id}
                className="flex items-center gap-3.5 p-2 rounded-lg bg-[#0A0F1E]/40 border border-slate-800/40 hover:border-slate-800 transition-colors"
              >
                <div className="size-11 rounded-md overflow-hidden bg-slate-950 shrink-0 relative border border-slate-800">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="object-cover size-full"
                  />
                  <div className="absolute top-0.5 left-0.5 bg-slate-900/90 text-[8px] font-bold text-[#C9A84C] px-1 rounded-sm">
                    #{idx + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-200 truncate">{p.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{p.locality}, {p.city}</p>
                  <p className="text-[10px] font-bold text-[#C9A84C] mt-0.5">{formatCurrency(p.price)}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-slate-300 font-mono">{p.views}</span>
                  <span className="text-[9px] text-slate-500 block uppercase tracking-wider mt-0.5">views</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
