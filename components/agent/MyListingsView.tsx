"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Grid,
  List,
  Eye,
  MessageSquare,
  Search,
  SlidersHorizontal,
  MapPin,
  Trash2,
  Play,
  Pause,
  Edit2,
  Camera,
  X
} from "lucide-react";
import { ALL_MOCK_PROPERTIES } from "@/lib/mockData";
import { Property } from "@/store/propertyStore";

export default function MyListingsView() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [listings, setListings] = useState<Property[]>(
    ALL_MOCK_PROPERTIES.filter(p => p.agent?.name === "Suresh Kumar")
  );

  // Filter listings based on search term
  const filteredListings = listings.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.locality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle listing status (Active <-> Sold/Rented etc., represented locally by status string)
  const handleTogglePause = (id: string) => {
    setListings(prev =>
      prev.map(p => {
        if (p.id === id) {
          // If status is active, pause it. Else, resume it
          const nextStatus = p.status === "paused" ? "ready-to-move" : "paused";
          alert(`Success: Property status updated to ${nextStatus === "paused" ? "Paused" : "Active"}`);
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const handleDeleteListing = (id: string) => {
    if (confirm("Are you sure you want to permanently delete this listing from your agent portfolio?")) {
      setListings(prev => prev.filter(p => p.id !== id));
      alert("Listing deleted successfully.");
    }
  };

  // Format Currency
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    }
    return `₹${price.toLocaleString("en-IN")}`;
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">My Listings Portfolio</h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage your exclusive properties, toggle marketing states, or adjust detailed layouts.
          </p>
        </div>

        {/* List Toolbar actions */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-700"}`}
              title="Grid View"
            >
              <Grid className="size-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-md transition-colors ${viewMode === "table" ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-700"}`}
              title="Table View"
            >
              <List className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Search */}
      <Card className="bg-white border-slate-200 p-4 shadow-2xs flex items-center gap-3">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="size-4" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search within my listings by title, locality..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-3 text-xs text-slate-700 focus:outline-none focus:border-slate-400 transition-colors"
          />
        </div>
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="text-xs text-slate-400 hover:text-slate-800">
            Clear
          </button>
        )}
      </Card>

      {/* Grid or Table render */}
      {filteredListings.length === 0 ? (
        <Card className="bg-white border-slate-200 py-16 text-center shadow-2xs">
          <p className="text-slate-400 font-bold text-xs">No active listings found in your agent profile.</p>
        </Card>
      ) : viewMode === "grid" ? (
        /* GRID VIEW LAYOUT */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((p) => {
            const isPaused = p.status === "paused";
            
            return (
              <Card key={p.id} className="bg-white border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between group">
                <div>
                  {/* Photo with Overlay status */}
                  <div className="h-48 relative bg-slate-100 overflow-hidden">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white font-extrabold text-[9px] px-2.5 py-0.5 rounded tracking-wide uppercase">
                      {p.type}
                    </div>
                    
                    {/* Status Badge */}
                    <div className="absolute bottom-3 left-3">
                      <Badge className={`font-extrabold text-[8px] uppercase border px-2 py-0.5 ${
                        isPaused 
                          ? "bg-amber-500 border-amber-600 text-white" 
                          : "bg-emerald-600 border-emerald-700 text-white"
                      }`}>
                        {isPaused ? "Paused" : "Active"}
                      </Badge>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-slate-900 text-white font-extrabold font-mono text-xs px-2.5 py-1 rounded shadow-sm">
                      {formatPrice(p.price)}
                    </div>
                  </div>

                  {/* Details Card body */}
                  <div className="p-4 space-y-3 text-xs">
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm truncate" title={p.title}>{p.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold flex items-center gap-0.5 mt-0.5">
                        <MapPin className="size-3 shrink-0" /> {p.locality}, {p.city}
                      </p>
                    </div>

                    {/* Meta numbers */}
                    <div className="grid grid-cols-2 gap-2 text-center py-2 bg-slate-50 border border-slate-100 rounded">
                      <div className="border-r border-slate-200">
                        <span className="text-[9px] font-bold text-slate-400 flex items-center justify-center gap-0.5">
                          <Eye className="size-3" /> VIEWS
                        </span>
                        <p className="font-extrabold text-slate-700 font-mono mt-0.5">{p.views}</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 flex items-center justify-center gap-0.5">
                          <MessageSquare className="size-3" /> CHATS
                        </span>
                        <p className="font-extrabold text-slate-700 font-mono mt-0.5">
                          {p.id === "p1" ? 82 : p.id === "p5" ? 104 : 112}
                        </p>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="flex flex-wrap gap-1.5 text-[9px] font-bold text-slate-500">
                      {p.isRERAApproved && <span className="bg-slate-100 px-2 py-0.5 rounded">RERA</span>}
                      {p.isDTCPApproved && <span className="bg-slate-100 px-2 py-0.5 rounded">DTCP</span>}
                      {p.isVaastuCompliant && <span className="bg-slate-100 px-2 py-0.5 rounded">VAASTU</span>}
                    </div>
                  </div>
                </div>

                {/* Grid quick controls */}
                <div className="p-4 border-t border-slate-100 grid grid-cols-4 gap-2 text-center text-[10px]">
                  <button
                    onClick={() => handleTogglePause(p.id)}
                    className={`py-1.5 rounded border font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                      isPaused 
                        ? "bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-100" 
                        : "bg-amber-50 border-amber-100 text-amber-700 hover:bg-amber-100"
                    }`}
                    title={isPaused ? "Activate Listing" : "Pause Listing"}
                  >
                    {isPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
                    <span>{isPaused ? "Resume" : "Pause"}</span>
                  </button>

                  <button
                    onClick={() => alert("Simulation: Redirecting to edit property details...")}
                    className="py-1.5 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold flex flex-col items-center justify-center gap-1"
                    title="Edit Details"
                  >
                    <Edit2 className="size-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => alert("Simulation: Launching drag-and-drop media manager...")}
                    className="py-1.5 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold flex flex-col items-center justify-center gap-1"
                    title="Add Media"
                  >
                    <Camera className="size-3.5" />
                    <span>Photos</span>
                  </button>

                  <button
                    onClick={() => handleDeleteListing(p.id)}
                    className="py-1.5 rounded border border-rose-100 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold flex flex-col items-center justify-center gap-1"
                    title="Delete Listing"
                  >
                    <Trash2 className="size-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* TABLE GRID LAYOUT */
        <Card className="bg-white border-slate-200 shadow-2xs rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-400 font-bold text-[10px] uppercase">
                  <th className="p-4">Property</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Views</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredListings.map((p) => {
                  const isPaused = p.status === "paused";
                  
                  return (
                    <tr key={p.id} className="hover:bg-slate-55/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="size-11 rounded object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <h4 className="font-extrabold text-slate-800">{p.title}</h4>
                            <p className="text-[10px] text-slate-400 font-semibold">{p.locality}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-extrabold text-slate-800 font-mono">
                        {formatPrice(p.price)}
                      </td>
                      <td className="p-4 font-semibold text-slate-500">{p.type}</td>
                      <td className="p-4 font-mono font-extrabold text-slate-800">{p.views}</td>
                      <td className="p-4">
                        <Badge className={`font-extrabold text-[8px] uppercase border px-2 py-0.5 ${
                          isPaused 
                            ? "bg-amber-500 border-amber-600 text-white" 
                            : "bg-emerald-600 border-emerald-700 text-white"
                        }`}>
                          {isPaused ? "Paused" : "Active"}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleTogglePause(p.id)}
                            className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                            title={isPaused ? "Resume listing" : "Pause listing"}
                          >
                            {isPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
                          </button>
                          <button
                            onClick={() => alert("Simulation: Edit details...")}
                            className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="size-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteListing(p.id)}
                            className="p-1.5 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
