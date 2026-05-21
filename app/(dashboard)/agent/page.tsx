"use client";

import React, { useState } from "react";
import AgentLayout from "@/components/agent/AgentLayout";
import DashboardOverview from "@/components/agent/DashboardOverview";
import MyListingsView from "@/components/agent/MyListingsView";
import AddPropertyForm from "@/components/agent/AddPropertyForm";
import MyLeadsView from "@/components/agent/MyLeadsView";
import AnalyticsView from "@/components/agent/AnalyticsView";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  CalendarCheck2,
  MessageCircle,
  Smartphone,
  PhoneCall,
  User,
  ShieldCheck,
  Building,
  KeyRound,
  FileCheck
} from "lucide-react";

// Mock Scheduling visits data
const VISITS_SCHEDULE = [
  {
    id: "v1",
    buyerName: "Karthik Raja",
    phone: "+91 98400 55667",
    property: "Vasantham Premium Gold Villa",
    locality: "Akkarai ECR",
    date: "24-May-2026",
    time: "4:00 PM",
    status: "Confirmed"
  },
  {
    id: "v2",
    buyerName: "Sudhakar Raman",
    phone: "+91 90040 12345",
    property: "Marutham Royal Heights",
    locality: "Ramanathapuram, Coimbatore",
    date: "27-May-2026",
    time: "11:00 AM",
    status: "Pending Builder"
  }
];

// Mock WhatsApp greetings logs
const WHATSAPP_LOGS = [
  {
    id: "w1",
    buyerName: "Anand Kumar",
    phone: "+91 98840 99887",
    time: "2026-05-18 10:45 AM",
    lang: "tamil",
    text: "வணக்கம் Anand Kumar, நான் ஆதனத் தரகர் முகவர் சுரேஷ் குமார் பேசுகிறேன். நீங்கள் பார்த்த 'Vasantham Premium Gold Villa' சொத்து தொடர்பாக பேசலாமா?"
  },
  {
    id: "w2",
    buyerName: "Ramesh Krishnan",
    phone: "+91 98400 55667",
    time: "2026-05-15 05:30 PM",
    lang: "english",
    text: "Hello Ramesh Krishnan, this is Suresh Kumar, Aadana Tharakar Agent. Regarding your interest in the property 'ECR Beach Mansion'..."
  }
];

export default function AgentDashboardPage() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  return (
    <AgentLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "dashboard" && (
        <DashboardOverview onNavigateTab={setActiveTab} />
      )}

      {activeTab === "listings" && (
        <MyListingsView />
      )}

      {activeTab === "add-property" && (
        <AddPropertyForm />
      )}

      {activeTab === "leads" && (
        <MyLeadsView />
      )}

      {activeTab === "analytics" && (
        <AnalyticsView />
      )}

      {/* SCHEDULE VISITS VIEW */}
      {activeTab === "schedule-visits" && (
        <div className="space-y-6 animate-in fade-in-50 duration-300">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Calendar className="size-5.5 text-[#0F172A]" /> Scheduled Walkthroughs
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Coordinate physical site visits, register builder clearances, or adjust time frames.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visit Cards */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-800 text-sm">Upcoming Site Walks</h3>
              {VISITS_SCHEDULE.map((visit) => (
                <Card key={visit.id} className="bg-white border-slate-200 p-5 shadow-2xs space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-slate-800 text-sm">{visit.buyerName}</h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{visit.phone}</p>
                    </div>
                    <Badge className={`rounded px-2.5 py-0.5 text-[9px] font-bold border uppercase ${
                      visit.status === "Confirmed" 
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-50" 
                        : "bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-50"
                    }`}>
                      {visit.status}
                    </Badge>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1.5 border-t border-b border-slate-50 py-3">
                    <p className="flex items-center gap-1.5 font-semibold">
                      <Building className="size-3.5 text-slate-400 shrink-0" /> {visit.property}
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-400">
                      <MapPin className="size-3.5 shrink-0" /> {visit.locality}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="flex items-center gap-1 font-bold text-slate-700">
                      <Calendar className="size-3.5 text-slate-400" /> {visit.date}
                    </span>
                    <span className="flex items-center gap-1 font-bold font-mono text-slate-700">
                      <Clock className="size-3.5 text-slate-400" /> {visit.time}
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Visit Instructions Panel */}
            <Card className="bg-[#0F172A] text-white p-6 shadow-md flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CalendarCheck2 className="size-5.5 text-[#C9A84C]" />
                  <h3 className="font-black text-sm text-[#C9A84C] tracking-wide uppercase">Agent Code of Conduct</h3>
                </div>

                <div className="space-y-3.5 text-xs text-slate-350 leading-relaxed font-semibold">
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="size-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Always verify RERA registration copy is ready in print or soft PDF form before meeting.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="size-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Check Patta land records with the buyer's lawyer if requested during inspection.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="size-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Ensure bilingual coordination (English/Tamil) based on buyer fluency preferences.</span>
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                TN Real Estate Association Certified
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* WHATSAPP LOGS VIEW */}
      {activeTab === "whatsapp-logs" && (
        <div className="space-y-6 animate-in fade-in-50 duration-300">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <PhoneCall className="size-5.5 text-[#0F172A]" /> WhatsApp CRM Dispatch Log
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Historical archive of bilingual template greetings fired via the portal direct dialers.
            </p>
          </div>

          <div className="space-y-4">
            {WHATSAPP_LOGS.map((log) => (
              <Card key={log.id} className="bg-white border-slate-200 p-5 shadow-2xs space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xs shrink-0">
                      <MessageCircle className="size-4.5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-xs">{log.buyerName}</h4>
                      <p className="text-[9px] text-slate-400 font-semibold font-mono">{log.phone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`rounded text-[8px] font-bold uppercase ${
                      log.lang === "tamil" 
                        ? "bg-emerald-900 text-white border-emerald-950" 
                        : "bg-slate-100 border-slate-200 text-slate-800"
                    }`}>
                      {log.lang === "tamil" ? "தமிழ்" : "English"}
                    </Badge>
                    <p className="text-[9px] text-slate-400 font-mono mt-0.5">{log.time}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-100/50 text-xs italic font-medium leading-relaxed text-slate-600">
                  "{log.text}"
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* PROFILE VIEW */}
      {activeTab === "profile" && (
        <div className="space-y-6 animate-in fade-in-50 duration-300">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <User className="size-5.5 text-[#0F172A]" /> Agent Verification Profile
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Secure identification tags, registration ID, and luxury portal credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main avatar details card */}
            <Card className="bg-white border-slate-200 p-6 shadow-2xs text-center space-y-4 md:col-span-1">
              <div className="size-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-extrabold text-white text-3xl mx-auto">
                SK
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-sm">Suresh Kumar</h3>
                <p className="text-[10px] text-[#C9A84C] font-extrabold uppercase tracking-wider mt-0.5">
                  Exclusive Luxury Agent
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-slate-50 rounded border border-slate-100">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Port Listings</span>
                  <span className="font-black text-slate-700">3 Verified</span>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-100">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Closed Value</span>
                  <span className="font-black text-slate-700">₹4.50 Cr</span>
                </div>
              </div>
            </Card>

            {/* Registration credentials matrix */}
            <Card className="bg-white border-slate-200 p-6 shadow-2xs space-y-4 md:col-span-2">
              <h3 className="font-extrabold text-slate-800 text-sm border-b pb-2 mb-2">Municipal Verification Registry</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Agent License Index</span>
                  <span className="font-mono font-extrabold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-emerald-600" /> TNAA/A-00349/2025
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">RERA License ID</span>
                  <span className="font-mono font-extrabold text-slate-800 flex items-center gap-1.5">
                    <FileCheck className="size-4 text-emerald-600" /> TN/Agent/0109/2025
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Division Assignment</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <MapPin className="size-4 text-slate-400" /> Chennai & ECR Akkarai Hub
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Primary Secure Line</span>
                  <span className="font-mono font-bold text-slate-800 flex items-center gap-1.5">
                    <Smartphone className="size-4 text-slate-400" /> +91 94440 98765
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                <span>Account Tier: Super Agent</span>
                <span className="text-[#C9A84C]">Renewal Due: Dec 2026</span>
              </div>
            </Card>
          </div>
        </div>
      )}
    </AgentLayout>
  );
}
