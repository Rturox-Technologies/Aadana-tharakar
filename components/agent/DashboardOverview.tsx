"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Building,
  Users,
  Calendar,
  MessageSquare,
  ArrowRight,
  Eye,
  Send,
  MapPin,
  ExternalLink
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";

// Weekly mock views data for top property
const TOP_PROPERTY_WEEKLY_VIEWS = [
  { day: "Mon", views: 28 },
  { day: "Tue", views: 42 },
  { day: "Wed", views: 35 },
  { day: "Thu", views: 50 },
  { day: "Fri", views: 64 },
  { day: "Sat", views: 48 },
  { day: "Sun", views: 57 },
];

const RECENT_LEADS = [
  {
    id: "l1",
    name: "Ramesh Krishnan",
    phone: "+91 98400 55667",
    property: "Vasantham Premium Gold Villa",
    date: "2026-05-20",
    status: "Contacted",
  },
  {
    id: "l3",
    name: "Anand Kumar",
    phone: "+91 98840 99887",
    property: "Vasantham Premium Gold Villa",
    date: "2026-05-18",
    status: "New",
  },
  {
    id: "l4",
    name: "Subash Bose",
    phone: "+91 90030 11223",
    property: "Luxury Beachfront Villa ECR",
    date: "2026-05-15",
    status: "Closed",
  },
  {
    id: "l5",
    name: "Revathi Mani",
    phone: "+91 98940 44556",
    property: "Temple View Residency",
    date: "2026-05-14",
    status: "Negotiating",
  },
];

interface DashboardOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export default function DashboardOverview({ onNavigateTab }: DashboardOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Vanakkam, Suresh Kumar</h1>
          <p className="text-xs text-slate-500 font-medium">
            Here is the activity summary for your active Tamil Nadu luxury real estate listings.
          </p>
        </div>
        <Badge className="bg-slate-100 border border-slate-200 text-[#0F172A] hover:bg-slate-100 font-bold px-3 py-1 text-xs">
          Agent Profile: Chennai Division
        </Badge>
      </div>

      {/* Grid of 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Listings */}
        <Card className="bg-white border-slate-100 p-4 shadow-2xs flex items-center gap-4">
          <div className="size-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Building className="size-5.5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Listings</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">3 Listings</h3>
            <p className="text-[9px] text-slate-500 font-semibold flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="size-3 text-emerald-500" /> +1 this week
            </p>
          </div>
        </Card>

        {/* New Leads Today */}
        <Card className="bg-white border-slate-100 p-4 shadow-2xs flex items-center gap-4">
          <div className="size-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="size-5.5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">New Leads Today</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">4 Incoming</h3>
            <p className="text-[9px] text-slate-500 font-semibold flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="size-3 text-emerald-500" /> +30% vs yesterday
            </p>
          </div>
        </Card>

        {/* Scheduled Visits */}
        <Card className="bg-white border-slate-100 p-4 shadow-2xs flex items-center gap-4">
          <div className="size-11 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Calendar className="size-5.5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Visits Scheduled</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">8 Pending</h3>
            <p className="text-[9px] text-slate-500 font-semibold mt-0.5">
              Next scheduled on May 24
            </p>
          </div>
        </Card>

        {/* Total Inquiries */}
        <Card className="bg-white border-slate-100 p-4 shadow-2xs flex items-center gap-4">
          <div className="size-11 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <MessageSquare className="size-5.5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Inquiries</p>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">142 Inquiries</h3>
            <p className="text-[9px] text-slate-500 font-semibold flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="size-3 text-emerald-500" /> 84% from WhatsApp
            </p>
          </div>
        </Card>
      </div>

      {/* Main Grid: Spotlight on Left, Recent Leads on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* TOP PERFORMING SPOTLIGHT LISTING CARD */}
        <Card className="bg-white border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between lg:col-span-1">
          <div>
            {/* Header / Accent Bar */}
            <div className="bg-[#0F172A] text-white p-4 flex items-center justify-between">
              <div>
                <span className="text-[8px] font-black uppercase tracking-widest text-[#C9A84C]">Featured Performance</span>
                <h4 className="text-xs font-bold mt-0.5">My Top Listing</h4>
              </div>
              <Badge className="bg-[#C9A84C] text-[#0F172A] font-extrabold text-[9px] hover:bg-[#C9A84C]">
                4.9 Rating
              </Badge>
            </div>

            {/* Photo & Basics */}
            <div className="h-44 relative bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Vasantham Villa"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-emerald-600 text-white font-bold text-[9px] px-2 py-0.5 rounded shadow-sm">
                Active · Verified
              </div>
              <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white font-bold font-mono text-xs px-2 py-1 rounded">
                ₹1.85 Cr
              </div>
            </div>

            {/* Details Content */}
            <div className="p-4 space-y-3.5 text-xs">
              <div>
                <h4 className="font-extrabold text-slate-800 text-sm">Vasantham Premium Gold Villa</h4>
                <p className="text-[10px] text-slate-400 font-bold flex items-center gap-0.5 mt-0.5">
                  <MapPin className="size-3 text-slate-400 shrink-0" /> ECR Akkarai, Chennai
                </p>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-3 gap-2 text-center p-2 rounded bg-slate-50 border border-slate-100">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 flex items-center justify-center gap-0.5 uppercase">
                    <Eye className="size-3" /> Views
                  </span>
                  <p className="font-extrabold text-slate-800 text-sm mt-0.5 font-mono">324</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 flex items-center justify-center gap-0.5 uppercase">
                    <MessageSquare className="size-3" /> Chats
                  </span>
                  <p className="font-extrabold text-slate-800 text-sm mt-0.5 font-mono">82</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 flex items-center justify-center gap-0.5 uppercase">
                    <Send className="size-3" /> Booked
                  </span>
                  <p className="font-extrabold text-slate-800 text-sm mt-0.5 font-mono">6</p>
                </div>
              </div>

              {/* Line Chart of Views (7 days) */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Daily view counts (Past 7 days)</span>
                <div className="h-24 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={TOP_PROPERTY_WEEKLY_VIEWS} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ fontSize: 10, background: "#0F172A", border: "none", borderRadius: 4, color: "#fff" }} labelStyle={{ fontWeight: "bold" }} />
                      <Line type="monotone" dataKey="views" stroke="#0F172A" strokeWidth={2} dot={{ r: 3, fill: "#C9A84C", stroke: "#0F172A", strokeWidth: 1.5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-100">
            <button
              onClick={() => onNavigateTab("listings")}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              Auditing Portfolio <ExternalLink className="size-3.5" />
            </button>
          </div>
        </Card>

        {/* RECENT LEADS PIPELINE */}
        <Card className="bg-white border-slate-200 shadow-xs p-5 flex flex-col justify-between lg:col-span-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm">Recent Active Inquiries</h3>
                <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">Immediate buyers looking to book physical inspections.</p>
              </div>
              <button
                onClick={() => onNavigateTab("leads")}
                className="text-xs font-bold text-[#0F172A] hover:underline flex items-center gap-0.5"
              >
                View CRM <ArrowRight className="size-3.5" />
              </button>
            </div>

            {/* List Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold text-[10px] uppercase select-none">
                    <th className="py-2.5">Buyer Name</th>
                    <th className="py-2.5">Property of Interest</th>
                    <th className="py-2.5">Inquiry Date</th>
                    <th className="py-2.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {RECENT_LEADS.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => onNavigateTab("leads")}
                      className="hover:bg-slate-50/60 cursor-pointer transition-colors"
                    >
                      <td className="py-3">
                        <p className="font-extrabold text-slate-800">{lead.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium font-mono">{lead.phone}</p>
                      </td>
                      <td className="py-3 font-semibold text-slate-600 truncate max-w-[200px]" title={lead.property}>
                        {lead.property}
                      </td>
                      <td className="py-3 font-mono text-slate-500">{lead.date}</td>
                      <td className="py-3 text-center">
                        <Badge
                          className={`rounded px-2 py-0.5 text-[9px] font-bold border ${
                            lead.status === "New" && "bg-blue-50/10 border-blue-500/25 text-blue-600 hover:bg-blue-50/10" ||
                            lead.status === "Contacted" && "bg-amber-50/10 border-amber-500/25 text-amber-600 hover:bg-amber-50/10" ||
                            lead.status === "Closed" && "bg-emerald-50/10 border-emerald-500/25 text-emerald-600 hover:bg-emerald-50/10" ||
                            "bg-indigo-50/10 border-indigo-500/25 text-indigo-600 hover:bg-indigo-50/10"
                          }`}
                        >
                          {lead.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wide">
            <span>Last Updated: Live Syncing</span>
            <span className="text-[#0F172A]">TN Real Estate Council</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
