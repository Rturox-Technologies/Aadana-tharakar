"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Kanban,
  Table as TableIcon,
  Download,
  Calendar,
  Plus,
  X,
  Phone,
  Mail,
  Building,
  User,
  MessageSquare,
  Clock,
  ArrowRight,
  TrendingUp,
  ChevronRight,
  ArrowLeftRight,
  Search
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface LeadNote {
  timestamp: string;
  text: string;
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  property: string;
  budget: number;
  stage: "New" | "Contacted" | "Visited" | "Negotiating" | "Closed" | "Lost";
  date: string;
  followUpDate?: string;
  notes: LeadNote[];
}

const INITIAL_MOCK_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Ramesh Krishnan",
    phone: "+91 98400 55667",
    email: "ramesh.k@gmail.com",
    property: "Vasantham Premium Gold Villa",
    budget: 18500000,
    stage: "Contacted",
    date: "2026-05-20",
    followUpDate: "2026-05-25",
    notes: [
      { timestamp: "2026-05-20 10:15 AM", text: "Interested in immediate site visit. Wants to check nearby groundwater viability." },
      { timestamp: "2026-05-20 03:30 PM", text: "Phone interview completed. Requested layout copy." }
    ]
  },
  {
    id: "lead-2",
    name: "Priya Dharshini",
    phone: "+91 94441 22334",
    email: "priya.d@yahoo.com",
    property: "Marutham Royal Heights",
    budget: 12000000,
    stage: "Visited",
    date: "2026-05-19",
    followUpDate: "2026-05-24",
    notes: [
      { timestamp: "2026-05-19 11:00 AM", text: "Visited site on Sunday. Loved Siruvani water connection availability." }
    ]
  },
  {
    id: "lead-3",
    name: "Anand Kumar",
    phone: "+91 98840 99887",
    email: "anand.nellai@gmail.com",
    property: "Nellai Majestic Meadows",
    budget: 4500000,
    stage: "New",
    date: "2026-05-18",
    notes: [
      { timestamp: "2026-05-18 09:00 AM", text: "Inquired on WhatsApp about road width and DTCP approval number." }
    ]
  },
  {
    id: "lead-4",
    name: "Subash Bose",
    phone: "+91 90030 11223",
    email: "subash.bose@omrrealty.com",
    property: "Luxury Beachfront Villa ECR",
    budget: 49000000,
    stage: "Closed",
    date: "2026-05-15",
    notes: [
      { timestamp: "2026-05-15 04:00 PM", text: "Booking advance of 5 Lakhs received." },
      { timestamp: "2026-05-15 06:15 PM", text: "Agreement of Sale executed successfully." }
    ]
  },
  {
    id: "lead-5",
    name: "Revathi Mani",
    phone: "+91 98940 44556",
    email: "revathi.m@outlook.com",
    property: "Temple View Residency",
    budget: 6800000,
    stage: "Negotiating",
    date: "2026-05-14",
    followUpDate: "2026-05-22",
    notes: [
      { timestamp: "2026-05-14 02:00 PM", text: "Wants 5% discount on final quote. Vastu compliance reports shared." }
    ]
  },
  {
    id: "lead-6",
    name: "Karthik Raja",
    phone: "+91 97760 12345",
    email: "karthik.raja@live.com",
    property: "Vasantham Premium Gold Villa",
    budget: 22000000,
    stage: "Lost",
    date: "2026-05-01",
    notes: [
      { timestamp: "2026-05-01 11:30 AM", text: "Bought another plot in OMR instead. Closing file." }
    ]
  }
];

const PIPELINE_COLUMNS: { id: Lead["stage"]; label: string; color: string }[] = [
  { id: "New", label: "New Leads", color: "bg-blue-500" },
  { id: "Contacted", label: "Contacted", color: "bg-amber-500" },
  { id: "Visited", label: "Visited Sites", color: "bg-purple-500" },
  { id: "Negotiating", label: "Negotiating", color: "bg-indigo-500" },
  { id: "Closed", label: "Closed Won", color: "bg-emerald-500" },
  { id: "Lost", label: "Lost", color: "bg-rose-500" }
];

export default function LeadsView() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_MOCK_LEADS);
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Selected lead for detail slide-over
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  // Note logger input
  const [newNoteText, setNewNoteText] = useState("");
  // Follow up calendar input
  const [followUpInput, setFollowUpInput] = useState("");

  // Filter leads based on query
  const filteredLeads = useMemo(() => {
    if (!searchTerm) return leads;
    const q = searchTerm.toLowerCase();
    return leads.filter(
      l =>
        l.name.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        l.property.toLowerCase().includes(q)
    );
  }, [leads, searchTerm]);

  // Update pipeline status
  const handleMoveStage = (id: string, newStage: Lead["stage"]) => {
    setLeads(prev =>
      prev.map(l => (l.id === id ? { ...l, stage: newStage } : l))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(prev => prev ? { ...prev, stage: newStage } : null);
    }
  };

  // Add notes logs
  const handleAddNote = () => {
    if (!newNoteText.trim() || !selectedLead) return;
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timestamp = `${dateStr} ${timeStr}`;
    
    const updatedNote = { timestamp, text: newNoteText.trim() };
    
    setLeads(prev =>
      prev.map(l =>
        l.id === selectedLead.id
          ? { ...l, notes: [updatedNote, ...l.notes] }
          : l
      )
    );

    setSelectedLead(prev =>
      prev
        ? { ...prev, notes: [updatedNote, ...prev.notes] }
        : null
    );
    setNewNoteText("");
  };

  // Update schedule follow up date
  const handleScheduleFollowUp = () => {
    if (!followUpInput || !selectedLead) return;
    
    setLeads(prev =>
      prev.map(l => (l.id === selectedLead.id ? { ...l, followUpDate: followUpInput } : l))
    );

    setSelectedLead(prev => (prev ? { ...prev, followUpDate: followUpInput } : null));
    alert(`Success: Next follow-up call scheduled on ${followUpInput}`);
  };

  // Format Currency Utility
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    }
    return `₹${price.toLocaleString("en-IN")}`;
  };

  // RFC 4180 compliant CSV Export Engine
  const handleExportCSV = () => {
    const headers = ["ID", "Client Name", "Phone", "Email", "Inquiry Property", "Budget (INR)", "CRM Stage", "Date Added", "Next Follow Up"];
    const rows = leads.map(l => [
      l.id,
      l.name,
      l.phone,
      l.email,
      l.property,
      l.budget,
      l.stage,
      l.date,
      l.followUpDate || "N/A"
    ]);

    const csvContent = 
      headers.join(",") + "\n" + 
      rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Aadana Tharakar_CRM_Leads_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn relative">
      {/* Header bar controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Leads CRM Pipeline</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Monitor incoming leads, schedule physical site visits, log communications, and export reports.
          </p>
        </div>
        
        {/* CRM control utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* View Toggler Pills */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${viewMode === "kanban" ? "bg-[#C9A84C] text-[#0A0F1E]" : "text-slate-400 hover:text-slate-200"}`}
              title="Kanban Board"
            >
              <Kanban className="size-3.5" /> <span className="hidden sm:inline">Kanban</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${viewMode === "table" ? "bg-[#C9A84C] text-[#0A0F1E]" : "text-slate-400 hover:text-slate-200"}`}
              title="Table Grid"
            >
              <TableIcon className="size-3.5" /> <span className="hidden sm:inline">List Table</span>
            </button>
          </div>

          {/* Export Report */}
          <Button
            onClick={handleExportCSV}
            variant="outline"
            className="border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900/50 rounded-lg px-3 flex items-center gap-1.5 text-xs h-9"
          >
            <Download className="size-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Quick Search Panel */}
      <Card className="bg-[#111827] border-slate-800 p-4 rounded-xl flex items-center gap-3">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search className="size-4" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter leads by client name, phone number, property details..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pl-9 pr-3 text-xs text-slate-200 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
          />
        </div>
        {searchTerm && (
          <Button
            onClick={() => setSearchTerm("")}
            variant="ghost"
            className="text-slate-400 hover:text-white text-xs"
          >
            Reset
          </Button>
        )}
      </Card>

      {/* Main pipeline renders */}
      <AnimatePresence mode="wait">
        {viewMode === "kanban" ? (
          /* KANBAN BOARD SYSTEM */
          <motion.div
            key="kanban-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4 custom-scrollbar select-none"
          >
            {PIPELINE_COLUMNS.map((column) => {
              const columnLeads = filteredLeads.filter(l => l.stage === column.id);

              return (
                <div 
                  key={column.id} 
                  className="bg-[#070B16] border border-slate-800 rounded-xl p-3.5 flex flex-col min-w-[220px] max-h-[75vh]"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${column.color}`} />
                      <span className="font-bold text-xs text-slate-200">{column.label}</span>
                    </div>
                    <Badge className="bg-slate-900 text-slate-400 border border-slate-800 font-semibold px-2 py-0.5 rounded text-[10px]">
                      {columnLeads.length}
                    </Badge>
                  </div>

                  {/* Cards stack */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar min-h-[200px]">
                    {columnLeads.map((lead) => (
                      <motion.div
                        key={lead.id}
                        layoutId={`lead-${lead.id}`}
                        onClick={() => setSelectedLead(lead)}
                        className="bg-[#111827] border border-slate-800/80 rounded-lg p-3 hover:border-[#C9A84C]/30 hover:shadow-lg cursor-pointer transition-all flex flex-col justify-between"
                      >
                        <div>
                          <h4 className="font-bold text-xs text-slate-100">{lead.name}</h4>
                          <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 font-mono">
                            <Phone className="size-3" /> {lead.phone}
                          </p>
                          <div className="mt-2.5 p-1.5 rounded bg-slate-900 border border-slate-800/50">
                            <p className="text-[9px] text-slate-400 font-semibold truncate leading-tight flex items-center gap-1">
                              <Building className="size-2.5 text-[#C9A84C]" /> {lead.property}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-800/50 text-[10px]">
                          <span className="font-bold text-[#C9A84C] font-mono">{formatPrice(lead.budget)}</span>
                          <span className="text-slate-500 font-mono text-[9px]">{lead.date}</span>
                        </div>

                        {/* Status movers */}
                        <div className="flex justify-end gap-1.5 mt-3 pt-2.5 border-t border-slate-800/30">
                          {PIPELINE_COLUMNS.map((stageItem) => {
                            if (stageItem.id === lead.stage) return null;
                            // only show closely next / prev stages for simplicity
                            const currentIdx = PIPELINE_COLUMNS.findIndex(s => s.id === lead.stage);
                            const itemIdx = PIPELINE_COLUMNS.findIndex(s => s.id === stageItem.id);
                            if (Math.abs(currentIdx - itemIdx) > 1) return null;

                            return (
                              <button
                                key={stageItem.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveStage(lead.id, stageItem.id);
                                }}
                                className="px-2 py-0.5 rounded text-[8px] bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                              >
                                Move {itemIdx > currentIdx ? "→" : "←"}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    ))}
                    {columnLeads.length === 0 && (
                      <div className="h-full border border-dashed border-slate-900 rounded-lg flex items-center justify-center p-6 text-center text-[10px] text-slate-600 font-medium">
                        Empty Stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          /* CRM LIST TABLE VIEW */
          <motion.div
            key="table-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
          >
            <Card className="bg-[#111827] border-slate-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-[#070B16] text-slate-400 font-semibold">
                      <th className="p-4">Client Contact</th>
                      <th className="p-4">Desired Property</th>
                      <th className="p-4">Budget / Value</th>
                      <th className="p-4">Current Pipeline Stage</th>
                      <th className="p-4">Follow-Up Pending</th>
                      <th className="p-4 text-right">Inquiry Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-500">
                          No CRM leads matching current keywords.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="hover:bg-slate-900/20 cursor-pointer transition-colors"
                          onClick={() => setSelectedLead(lead)}
                        >
                          <td className="p-4">
                            <p className="font-bold text-slate-200">{lead.name}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1 font-mono">
                              <Phone className="size-3 text-slate-600" /> {lead.phone}
                            </p>
                          </td>
                          <td className="p-4 font-semibold text-slate-300">
                            {lead.property}
                          </td>
                          <td className="p-4 font-bold text-[#C9A84C] font-mono">
                            {formatPrice(lead.budget)}
                          </td>
                          <td className="p-4">
                            <Badge
                              className={`rounded text-[10px] px-2 py-0.5 font-bold border ${
                                lead.stage === "New" && "bg-blue-500/10 border-blue-500/20 text-blue-400" ||
                                lead.stage === "Contacted" && "bg-amber-500/10 border-amber-500/20 text-amber-400" ||
                                lead.stage === "Visited" && "bg-purple-500/10 border-purple-500/20 text-purple-400" ||
                                lead.stage === "Negotiating" && "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" ||
                                lead.stage === "Closed" && "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" ||
                                "bg-rose-500/10 border-rose-500/20 text-rose-400"
                              }`}
                            >
                              {lead.stage}
                            </Badge>
                          </td>
                          <td className="p-4">
                            {lead.followUpDate ? (
                              <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-bold font-mono">
                                <Clock className="size-3 text-amber-500" /> {lead.followUpDate}
                              </div>
                            ) : (
                              <span className="text-[10px] text-slate-600">None Scheduled</span>
                            )}
                          </td>
                          <td className="p-4 text-right text-slate-500 font-mono">
                            {lead.date}
                          </td>
                          <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-2 text-[10px]">
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[#C9A84C] font-semibold hover:bg-[#C9A84C]/10 transition-colors"
                              >
                                Slide Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEAD DETAILED BACKDROP SLIDE-OVER */}
      <AnimatePresence>
        {selectedLead && (
          <>
            {/* Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 bg-black z-40 backdrop-blur-xs cursor-pointer"
            />

            {/* Slide-over panel container */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-[#111827] border-l border-[#C9A84C]/25 shadow-2xl z-50 overflow-hidden flex flex-col justify-between"
            >
              {/* Drawer Top Header */}
              <div className="p-5 border-b border-slate-800 bg-[#070B16] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="size-4.5 text-[#C9A84C]" />
                  <span className="font-bold text-sm text-white">Lead Verification Profile</span>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-md bg-slate-900 border border-slate-850 hover:bg-slate-800/80 transition-all"
                  title="Close Slide Panel"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar text-xs leading-relaxed">
                
                {/* 1. Profile Section */}
                <div className="space-y-3.5 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      {selectedLead.name}
                    </h3>
                    <Badge className="bg-[#C9A84C] text-[#0A0F1E] font-extrabold uppercase">
                      {selectedLead.stage}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-slate-300 font-medium">
                    <div className="flex items-center gap-2">
                      <Phone className="size-3.5 text-slate-500" />
                      <span>{selectedLead.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="size-3.5 text-slate-500" />
                      <span>{selectedLead.email}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Inquiry Property */}
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                    Property Inquiry Details
                  </h4>
                  <div className="p-3 bg-slate-900/40 border border-slate-800/60 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-slate-200 font-bold">
                      <span className="flex items-center gap-1.5">
                        <Building className="size-3.5 text-[#C9A84C]" /> {selectedLead.property}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Assigned Budget:</span>
                      <span className="font-bold text-white font-mono">{formatPrice(selectedLead.budget)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Logged Date:</span>
                      <span className="font-mono">{selectedLead.date}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Follow Up Scheduler */}
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                    Next Follow-up Planner
                  </h4>
                  <div className="p-3.5 bg-slate-900/40 border border-slate-800/60 rounded-xl space-y-3">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Scheduled Follow Up:</span>
                      <span className="font-bold text-amber-400 font-mono">
                        {selectedLead.followUpDate || "None Scheduled"}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={followUpInput}
                        onChange={(e) => setFollowUpInput(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-[#C9A84C]/50 flex-1 font-mono"
                      />
                      <Button
                        onClick={handleScheduleFollowUp}
                        className="bg-[#C9A84C] hover:bg-[#b7943b] text-[#0A0F1E] font-bold py-1.5 px-3 rounded text-[11px]"
                      >
                        Set Date
                      </Button>
                    </div>
                  </div>
                </div>

                {/* 4. Action Stage Changer */}
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                    Update Lead Status
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {PIPELINE_COLUMNS.map((col) => (
                      <button
                        key={col.id}
                        onClick={() => handleMoveStage(selectedLead.id, col.id)}
                        className={`px-2.5 py-1.5 rounded-lg border font-semibold text-[10px] transition-all ${
                          selectedLead.stage === col.id
                            ? "bg-[#C9A84C] border-[#C9A84C] text-[#0A0F1E]"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {col.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Notes Timeline Logs */}
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <MessageSquare className="size-3.5 text-[#C9A84C]" /> Discussion Logs & Notes ({selectedLead.notes.length})
                  </h4>

                  {/* Add note input form */}
                  <div className="space-y-2">
                    <textarea
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Type brief follow-up annotation notes..."
                      rows={2}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-[#C9A84C]/50 resize-none leading-relaxed"
                    />
                    <div className="flex justify-end">
                      <Button
                        onClick={handleAddNote}
                        disabled={!newNoteText.trim()}
                        className="bg-[#C9A84C]/10 border border-[#C9A84C]/25 text-[#C9A84C] hover:bg-[#C9A84C]/25 font-bold py-1 px-3 text-[10px] rounded-lg disabled:opacity-40 disabled:pointer-events-none"
                      >
                        Add Entry
                      </Button>
                    </div>
                  </div>

                  {/* Notes stack */}
                  <div className="space-y-3 pt-2">
                    {selectedLead.notes.map((note, nIdx) => (
                      <div 
                        key={nIdx}
                        className="p-3 bg-[#0A0F1E] border border-slate-850 rounded-lg relative overflow-hidden"
                      >
                        <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-mono mb-1">
                          <Clock className="size-3 text-slate-600" /> {note.timestamp}
                        </div>
                        <p className="text-slate-300 leading-relaxed font-medium">
                          {note.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Drawer Bottom controls */}
              <div className="p-4 border-t border-slate-850 bg-[#070B16] flex items-center justify-between">
                <Button
                  onClick={() => alert(`Simulating outbound dialer to: ${selectedLead.phone}`)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 flex items-center gap-1 text-[11px] rounded-lg flex-1"
                >
                  <Phone className="size-3.5" /> Call Customer
                </Button>
                <div className="w-4 shrink-0" />
                <Button
                  onClick={() => window.open(`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=Vanakkam%20${encodeURIComponent(selectedLead.name)},%20Aadana Tharakar%20Team%20here...`, '_blank')}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 flex items-center gap-1 text-[11px] rounded-lg flex-1"
                >
                  <MessageSquare className="size-3.5" /> WhatsApp Tamil
                </Button>
              </div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
