"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet";
import {
  Users,
  Search,
  MessageSquare,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  Send,
  MapPin,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Tag,
  BookOpen
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  property: string;
  locality: string;
  date: string;
  status: "New" | "Contacted" | "Negotiating" | "Closed" | "Visited";
  budget: string;
  preferredTime: string;
  notes: string[];
}

const INITIAL_LEADS: Lead[] = [
  {
    id: "l1",
    name: "Ramesh Krishnan",
    phone: "+91 98400 55667",
    email: "ramesh.k@gmail.com",
    property: "Vasantham Premium Gold Villa",
    locality: "Akkarai ECR, Chennai",
    date: "2026-05-20",
    status: "Contacted",
    budget: "₹1.8 - 2.0 Cr",
    preferredTime: "Evening 5 PM - 7 PM",
    notes: [
      "Looking for East-facing entrance strictly.",
      "Asked about ground water quality in Akkarai.",
      "Scheduled site visit for coming Saturday."
    ]
  },
  {
    id: "l2",
    name: "Anand Kumar",
    phone: "+91 98840 99887",
    email: "anand.k@yahoo.com",
    property: "Vasantham Premium Gold Villa",
    locality: "Akkarai ECR, Chennai",
    date: "2026-05-18",
    status: "New",
    budget: "₹1.7 - 1.9 Cr",
    preferredTime: "Morning 10 AM - 12 PM",
    notes: [
      "First-time buyer.",
      "Requires DTCP verification documents PDF copy."
    ]
  },
  {
    id: "l3",
    name: "Senthil Balaji",
    phone: "+91 94440 12345",
    email: "senthil.balaji@coimbatore.in",
    property: "Marutham Royal Heights",
    locality: "Ramanathapuram, Coimbatore",
    date: "2026-05-17",
    status: "Negotiating",
    budget: "₹95 L - 1.1 Cr",
    preferredTime: "Anytime Weekend",
    notes: [
      "Offered ₹92 Lakhs final price.",
      "Waiting for builder confirmation."
    ]
  },
  {
    id: "l4",
    name: "Subash Bose",
    phone: "+91 90030 11223",
    email: "subash.bose@outlook.com",
    property: "Luxury Beachfront Villa ECR",
    locality: "Injambakkam, Chennai",
    date: "2026-05-15",
    status: "Closed",
    budget: "₹4.5 Cr",
    preferredTime: "Completed",
    notes: [
      "Registration done successfully.",
      "Commission received."
    ]
  },
  {
    id: "l5",
    name: "Revathi Mani",
    phone: "+91 98940 44556",
    email: "revathi.m@gmail.com",
    property: "Temple View Residency",
    locality: "Srirangam, Trichy",
    date: "2026-05-14",
    status: "Visited",
    budget: "₹65 - 75 L",
    preferredTime: "Afternoon 2 PM - 4 PM",
    notes: [
      "Very happy with CMDA approval ticks.",
      "Discussing home loan interest rates with SBI."
    ]
  }
];

export default function MyLeadsView() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNoteText, setNewNoteText] = useState("");

  // Filters logic
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.property.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Toggle status inside view
  const handleUpdateStatus = (id: string, newStatus: Lead["status"]) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Add notes locally
  const handleAddNote = () => {
    if (!newNoteText.trim() || !selectedLead) return;
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === selectedLead.id
          ? { ...lead, notes: [newNoteText.trim(), ...lead.notes] }
          : lead
      )
    );
    setSelectedLead((prev) =>
      prev
        ? { ...prev, notes: [newNoteText.trim(), ...prev.notes] }
        : null
    );
    setNewNoteText("");
  };

  // Direct WhatsApp Dialer constructs
  const getWhatsAppLink = (lead: Lead, lang: "en" | "ta") => {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, ""); // Keep numeric values
    let message = "";

    if (lang === "en") {
      message = `Hello ${lead.name}, this is Suresh Kumar, Aadana Tharakar Agent. Regarding your interest in the property "${lead.property}" at ${lead.locality}, I would love to share the registration details and schedule a walkthrough. Let me know when you are free.`;
    } else {
      message = `வணக்கம் ${lead.name}, நான் ஆதனத் தரகர் முகவர் சுரேஷ் குமார் பேசுகிறேன். நீங்கள் பார்த்த "${lead.property}" (${lead.locality}) சொத்து தொடர்பாக பேசலாமா? DTCP / RERA ஆவணங்களை உங்களுக்கு வாட்ஸ்அப்பில் அனுப்பியுள்ளேன்.`;
    }

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="space-y-6">
      {/* Overview stats bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Leads & CRM Panel</h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage buyer inquiries, coordinate physical visits, and contact verified users in Tamil or English.
          </p>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-100 p-4 shadow-2xs flex items-center gap-3">
          <div className="size-9 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="size-5" />
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total Leads</span>
            <h4 className="text-base font-black text-slate-800">{leads.length} Active</h4>
          </div>
        </Card>

        <Card className="bg-white border-slate-100 p-4 shadow-2xs flex items-center gap-3">
          <div className="size-9 rounded bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="size-5" />
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">New Today</span>
            <h4 className="text-base font-black text-slate-800">1 New</h4>
          </div>
        </Card>

        <Card className="bg-white border-slate-100 p-4 shadow-2xs flex items-center gap-3">
          <div className="size-9 rounded bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Calendar className="size-5" />
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Site Visits</span>
            <h4 className="text-base font-black text-slate-800">2 Planned</h4>
          </div>
        </Card>

        <Card className="bg-white border-slate-100 p-4 shadow-2xs flex items-center gap-3">
          <div className="size-9 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle className="size-5" />
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Closed Deals</span>
            <h4 className="text-base font-black text-slate-800">1 Closed</h4>
          </div>
        </Card>
      </div>

      {/* CRM Toolbar Filters */}
      <Card className="bg-white border-slate-200 p-4 shadow-2xs flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="size-4" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads by name or property..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-3 text-xs text-slate-700 focus:outline-none focus:border-slate-400 transition-colors"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {["All", "New", "Contacted", "Visited", "Negotiating", "Closed"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors select-none ${
                statusFilter === status
                  ? "bg-slate-900 border-slate-900 text-white shadow-2xs"
                  : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </Card>

      {/* Leads List Grid */}
      <Card className="bg-white border-slate-200 shadow-2xs rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-400 font-bold text-[10px] uppercase">
                <th className="p-4">Buyer Name</th>
                <th className="p-4">Property Interest</th>
                <th className="p-4">Estimated Budget</th>
                <th className="p-4">Inquiry Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Quick Connect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                  onClick={() => setSelectedLead(lead)}
                >
                  <td className="p-4">
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm group-hover:text-[#0F172A] transition-colors flex items-center gap-1.5">
                        {lead.name} <ChevronRight className="size-3 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
                      </h4>
                      <p className="text-[10px] text-slate-400 font-semibold font-mono mt-0.5">{lead.phone}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <span className="font-bold text-slate-700">{lead.property}</span>
                      <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-0.5 mt-0.5">
                        <MapPin className="size-3 shrink-0" /> {lead.locality}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 font-extrabold text-slate-800 font-mono">
                    {lead.budget}
                  </td>
                  <td className="p-4 font-mono text-slate-500">{lead.date}</td>
                  <td className="p-4">
                    <Badge
                      className={`rounded px-2.5 py-0.5 text-[9px] font-bold border uppercase tracking-wider ${
                        lead.status === "New" && "bg-blue-50/20 border-blue-500/30 text-blue-600 hover:bg-blue-50/20" ||
                        lead.status === "Contacted" && "bg-amber-50/20 border-amber-500/30 text-amber-600 hover:bg-amber-50/20" ||
                        lead.status === "Visited" && "bg-purple-50/20 border-purple-500/30 text-purple-600 hover:bg-purple-50/20" ||
                        lead.status === "Closed" && "bg-emerald-50/20 border-emerald-500/30 text-emerald-600 hover:bg-emerald-50/20" ||
                        "bg-indigo-50/20 border-indigo-500/30 text-indigo-600 hover:bg-indigo-50/20"
                      }`}
                    >
                      {lead.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={getWhatsAppLink(lead, "en")}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[9px] flex items-center gap-1 transition-colors border border-emerald-200/50"
                        title="Chat in English"
                      >
                        <MessageSquare className="size-3" /> EN
                      </a>
                      <a
                        href={getWhatsAppLink(lead, "ta")}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-900 text-white hover:bg-emerald-800 font-bold text-[9px] flex items-center gap-1 transition-colors border border-emerald-950"
                        title="தமிழ் மொழியில் பேசுக"
                      >
                        <MessageSquare className="size-3 text-[#C9A84C]" /> தமிழ்
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* High-End Detail Slideover Drawer */}
      <Sheet open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <SheetContent side="right" className="w-full sm:max-w-md bg-white border-l border-slate-200 p-0 flex flex-col justify-between h-full">
          {selectedLead && (
            <>
              {/* Header section with brand accent */}
              <div className="p-6 border-b border-slate-100 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[9px] font-black text-[#C9A84C] uppercase tracking-widest">
                      Aadana Tharakar CRM Matrix
                    </span>
                    <SheetTitle className="text-base font-black text-slate-900 mt-0.5">
                      {selectedLead.name}
                    </SheetTitle>
                    <SheetDescription className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Buyer Reference: {selectedLead.id}
                    </SheetDescription>
                  </div>
                </div>

                {/* Status Toggle buttons inside slider */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    Update pipeline status
                  </span>
                  <div className="grid grid-cols-5 gap-1.5 text-center">
                    {(["New", "Contacted", "Visited", "Negotiating", "Closed"] as Lead["status"][]).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleUpdateStatus(selectedLead.id, status)}
                        className={`py-1 rounded border text-[9px] font-bold transition-all ${
                          selectedLead.status === status
                            ? "bg-slate-900 border-slate-900 text-white shadow-2xs"
                            : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Body Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {/* Details list */}
                <div className="space-y-4 text-xs">
                  <div className="border-b border-slate-50 pb-3 flex items-start gap-3">
                    <Sparkles className="size-4 text-[#C9A84C] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                        Interested Property
                      </span>
                      <span className="font-extrabold text-slate-800">{selectedLead.property}</span>
                      <p className="text-[10px] text-slate-400 font-semibold">{selectedLead.locality}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                        Estimated Budget
                      </span>
                      <span className="font-mono font-extrabold text-slate-800">{selectedLead.budget}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                        Preferred Walkthrough Time
                      </span>
                      <span className="font-semibold text-slate-700">{selectedLead.preferredTime}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                        Phone Number
                      </span>
                      <span className="font-mono text-slate-700">{selectedLead.phone}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                        Email Address
                      </span>
                      <span className="font-mono text-slate-700 truncate block">{selectedLead.email}</span>
                    </div>
                  </div>
                </div>

                {/* Notes History */}
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-1">
                    <BookOpen className="size-3.5" /> Activity Notes History
                  </span>

                  {/* Add note input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add buyer requirement details, call notes..."
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      className="bg-slate-50/50 text-xs"
                    />
                    <Button
                      onClick={handleAddNote}
                      className="bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold shrink-0"
                    >
                      Add
                    </Button>
                  </div>

                  {/* Notes List */}
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {selectedLead.notes.length === 0 ? (
                      <p className="text-[10px] text-slate-400 font-bold py-2">No activity notes recorded.</p>
                    ) : (
                      selectedLead.notes.map((note, index) => (
                        <div
                          key={index}
                          className="p-2.5 rounded bg-slate-50 border border-slate-100 text-xs leading-relaxed text-slate-650"
                        >
                          <p>{note}</p>
                          <span className="text-[8px] text-slate-400 font-mono mt-1 block">Recorded Just Now</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Sticky footer WhatsApp Dialer buttons */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/80 grid grid-cols-2 gap-3 shrink-0">
                <a
                  href={getWhatsAppLink(selectedLead, "en")}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 rounded-lg bg-white border border-emerald-500/30 text-emerald-700 hover:bg-emerald-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <MessageSquare className="size-4" /> WhatsApp English
                </a>
                <a
                  href={getWhatsAppLink(selectedLead, "ta")}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 rounded-lg bg-emerald-900 border border-emerald-950 text-white hover:bg-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <MessageSquare className="size-4 text-[#C9A84C]" /> வாட்ஸ்அப் தமிழ்
                </a>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
