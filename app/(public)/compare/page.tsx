"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpDown, RefreshCw, X, ArrowLeft, Plus } from "lucide-react";
import { ALL_MOCK_PROPERTIES } from "@/lib/mockData";
import { Property } from "@/store/propertyStore";

export default function ComparePage() {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  // Load comparison properties from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("aadana_compare");
    if (saved) {
      try {
        setCompareIds(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse compare list", e);
      }
    }
  }, []);

  const removeItem = (id: string) => {
    const updated = compareIds.filter(item => item !== id);
    setCompareIds(updated);
    localStorage.setItem("aadana_compare", JSON.stringify(updated));
  };

  const clearAll = () => {
    setCompareIds([]);
    localStorage.setItem("aadana_compare", JSON.stringify([]));
  };

  const propertiesToCompare = ALL_MOCK_PROPERTIES.filter(p => compareIds.includes(p.id));

  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div>
            <Link href="/properties" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 text-sm">
              <ArrowLeft size={14} /> Back to Listings
            </Link>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              Compare <span className="text-[#C9A84C]">Properties</span>
            </h1>
          </div>
          {propertiesToCompare.length > 0 && (
            <button
              onClick={clearAll}
              className="px-4 py-2 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors text-sm font-semibold"
            >
              Clear Comparison
            </button>
          )}
        </div>

        {propertiesToCompare.length === 0 ? (
          <div className="text-center py-20 bg-[#111827] border border-white/5 rounded-3xl max-w-2xl mx-auto px-6">
            <ArrowUpDown className="text-slate-600 mx-auto mb-4" size={48} />
            <h2 className="text-xl font-semibold mb-2">Comparison List is Empty</h2>
            <p className="text-slate-400 mb-8 max-w-sm mx-auto">
              Add properties from listing cards to compare their prices, amenities, and RERA approvals side-by-side.
            </p>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C9A84C] to-[#E5C87A] text-[#0A0F1E] font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Add Properties
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse bg-[#111827] border border-white/5 rounded-2xl overflow-hidden">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="p-5 text-left text-slate-500 font-medium w-1/4">Specification</th>
                  {propertiesToCompare.map(p => (
                    <th key={p.id} className="p-5 text-left relative min-w-[200px] w-1/4">
                      <button
                        onClick={() => removeItem(p.id)}
                        className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                        title="Remove"
                      >
                        <X size={16} />
                      </button>
                      <div className="font-semibold text-white mt-4">{p.title}</div>
                      <div className="text-[#C9A84C] text-sm font-semibold mt-1">
                        ₹{p.price >= 10000000 ? `${(p.price / 10000000).toFixed(2)} Cr` : `${(p.price / 100000).toFixed(0)} Lakh`}
                      </div>
                    </th>
                  ))}
                  {propertiesToCompare.length < 3 && (
                    <th className="p-5 bg-[#111827]/30 text-center w-1/4">
                      <Link href="/properties" className="inline-flex flex-col items-center gap-2 text-slate-500 hover:text-[#C9A84C] transition-colors py-8">
                        <Plus size={32} />
                        <span className="text-sm font-semibold">Add Property</span>
                      </Link>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                <tr>
                  <td className="p-5 font-medium text-slate-500">Location</td>
                  {propertiesToCompare.map(p => (
                    <td key={p.id} className="p-5">{p.locality}, {p.city}</td>
                  ))}
                  {propertiesToCompare.length < 3 && <td className="p-5 bg-[#111827]/30"></td>}
                </tr>
                <tr>
                  <td className="p-5 font-medium text-slate-500">Type</td>
                  {propertiesToCompare.map(p => (
                    <td key={p.id} className="p-5 capitalize">{p.type}</td>
                  ))}
                  {propertiesToCompare.length < 3 && <td className="p-5 bg-[#111827]/30"></td>}
                </tr>
                <tr>
                  <td className="p-5 font-medium text-slate-500">Area (SqFt)</td>
                  {propertiesToCompare.map(p => (
                    <td key={p.id} className="p-5">{p.areaSqFt} SqFt</td>
                  ))}
                  {propertiesToCompare.length < 3 && <td className="p-5 bg-[#111827]/30"></td>}
                </tr>
                <tr>
                  <td className="p-5 font-medium text-slate-500">Bedrooms / Bathrooms</td>
                  {propertiesToCompare.map(p => (
                    <td key={p.id} className="p-5">
                      {p.type === "Plot" ? "N/A" : `${p.bedrooms || 0} BHK / ${p.bathrooms || 0} Bath`}
                    </td>
                  ))}
                  {propertiesToCompare.length < 3 && <td className="p-5 bg-[#111827]/30"></td>}
                </tr>
                <tr>
                  <td className="p-5 font-medium text-slate-500">RERA Approved</td>
                  {propertiesToCompare.map(p => (
                    <td key={p.id} className="p-5">
                      {p.isRERAApproved ? (
                        <span className="text-green-400 font-semibold">Yes ({p.reraNumber || "Verified"})</span>
                      ) : (
                        <span className="text-red-400">No</span>
                      )}
                    </td>
                  ))}
                  {propertiesToCompare.length < 3 && <td className="p-5 bg-[#111827]/30"></td>}
                </tr>
                <tr>
                  <td className="p-5 font-medium text-slate-500">Amenities</td>
                  {propertiesToCompare.map(p => (
                    <td key={p.id} className="p-5">
                      <div className="flex flex-wrap gap-1">
                        {(p.amenities || []).map((a: string) => (
                          <span key={a} className="px-2 py-1 bg-[#0A0F1E] rounded-md text-xs">{a}</span>
                        ))}
                      </div>
                    </td>
                  ))}
                  {propertiesToCompare.length < 3 && <td className="p-5 bg-[#111827]/30"></td>}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
