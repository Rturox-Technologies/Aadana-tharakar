"use client";

import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Search,
  SlidersHorizontal,
  Plus,
  Trash2,
  Check,
  Star,
  X,
  Building,
  MapPin,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowUpDown,
  Filter
} from "lucide-react";
import { api } from "@/lib/api";
import { ALL_MOCK_PROPERTIES } from "@/lib/mockData";
import { Property } from "@/store/propertyStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function PropertiesView() {
  const queryClient = useQueryClient();
  
  // Local list state for backend offline fallbacks (updates react immediately)
  const [localProperties, setLocalProperties] = useState<Property[]>(ALL_MOCK_PROPERTIES);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState<"all" | "buy" | "rent">("all");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [filterRera, setFilterRera] = useState<boolean | null>(null);
  const [filterDtcp, setFilterDtcp] = useState<boolean | null>(null);

  // Pagination & Sorting state
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Property>("postedDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const itemsPerPage = 5;

  // Selected row state for bulk actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Fetch properties from spring backend
  const { data: properties, isLoading } = useQuery({
    queryKey: ["admin", "properties"],
    queryFn: async () => {
      try {
        const response = await api.get<Property[]>("/admin/properties");
        if (response && response.length > 0) {
          setLocalProperties(response);
          return response;
        }
        return localProperties;
      } catch (err) {
        console.warn("Backend API offline or unauthorized. Utilizing pre-loaded luxury properties database.", err);
        return localProperties; // fallback to local mock database state
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Verify mutation
  const verifyMutation = useMutation({
    mutationFn: async ({ id, verified }: { id: string; verified: boolean }) => {
      try {
        return await api.patch<Property>(`/admin/properties/${id}/verify`, { verified });
      } catch (err) {
        console.warn("Spring endpoint offline. Simulating DTCP/RERA validation toggle locally.", err);
        return { id, isVerified: verified };
      }
    },
    onSuccess: (_data: { id: string; isVerified: boolean }, variables) => {
      // Mock Fallback Update
      setLocalProperties(prev =>
        prev.map(p => p.id === variables.id ? { ...p, isVerified: variables.verified } : p)
      );
      queryClient.invalidateQueries({ queryKey: ["admin", "properties"] });
    }
  });

  // Feature mutation
  const featureMutation = useMutation({
    mutationFn: async ({ id, featured }: { id: string; featured: boolean }) => {
      try {
        return await api.patch<Property>(`/admin/properties/${id}/feature`, { featured });
      } catch (err) {
        console.warn("Spring endpoint offline. Simulating feature activation locally.", err);
        return { id, isFeatured: featured };
      }
    },
    onSuccess: (_data: { id: string; isFeatured: boolean }, variables) => {
      // Mock Fallback Update
      setLocalProperties(prev =>
        prev.map(p => p.id === variables.id ? { ...p, isFeatured: variables.featured } : p)
      );
      queryClient.invalidateQueries({ queryKey: ["admin", "properties"] });
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        await api.delete(`/admin/properties/${id}`);
        return id;
      } catch (err) {
        console.warn("Spring server offline. Simulating deletion locally.", err);
        return id;
      }
    },
    onSuccess: (deletedId) => {
      setLocalProperties(prev => prev.filter(p => p.id !== deletedId));
      setSelectedIds(prev => prev.filter(id => id !== deletedId));
      queryClient.invalidateQueries({ queryKey: ["admin", "properties"] });
    }
  });

  // Bulk actions handlers
  const handleBulkFeature = () => {
    if (selectedIds.length === 0) return;
    setLocalProperties(prev =>
      prev.map(p => selectedIds.includes(p.id) ? { ...p, isFeatured: true } : p)
    );
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    setLocalProperties(prev =>
      prev.filter(p => !selectedIds.includes(p.id))
    );
    setSelectedIds([]);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredSortedProperties.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(item => item !== id));
    }
  };

  const handleSort = (field: keyof Property) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  // Helper formatter
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    }
    return `₹${price.toLocaleString("en-IN")}`;
  };

  // Extract filters dynamic lists
  const citiesList = ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy", "Tirunelveli", "Erode", "Vellore"];
  const typesList = ["Apartment", "Villa", "Plot", "Commercial", "Independent House"];

  // Filter and Sort properties
  const filteredSortedProperties = useMemo(() => {
    let result = [...localProperties];

    // Search query
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
      );
    }

    // Purpose filter
    if (selectedPurpose !== "all") {
      result = result.filter(p => p.purpose === selectedPurpose);
    }

    // City filter
    if (selectedCity !== "All") {
      result = result.filter(p => p.city === selectedCity);
    }

    // Type filter
    if (selectedType !== "All") {
      result = result.filter(p => p.type === selectedType);
    }

    // Status filter
    if (selectedStatus !== "All") {
      result = result.filter(p => p.status === selectedStatus);
    }

    // RERA status filter
    if (filterRera !== null) {
      result = result.filter(p => p.isRERAApproved === filterRera);
    }

    // DTCP status filter
    if (filterDtcp !== null) {
      result = result.filter(p => p.isDTCPApproved === filterDtcp);
    }

    // Sorting logic
    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      // Undefined safety
      if (valA === undefined) return 1;
      if (valB === undefined) return -1;

      if (typeof valA === "string" && typeof valB === "string") {
        return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      
      // Numbers or booleans
      return sortOrder === "asc"
        ? (valA as number) - (valB as number)
        : (valB as number) - (valA as number);
    });

    return result;
  }, [localProperties, searchTerm, selectedPurpose, selectedCity, selectedType, selectedStatus, filterRera, filterDtcp, sortField, sortOrder]);

  // Paginated chunk
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSortedProperties.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSortedProperties, currentPage]);

  const totalPages = Math.ceil(filteredSortedProperties.length / itemsPerPage);

  const resetAllFilters = () => {
    setSearchTerm("");
    setSelectedPurpose("all");
    setSelectedCity("All");
    setSelectedType("All");
    setSelectedStatus("All");
    setFilterRera(null);
    setFilterDtcp(null);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* View Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Properties Inventory</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Audit, verify, highlight, or delete listings on the Aadana Tharakar engine.
          </p>
        </div>
        <Button 
          onClick={() => alert("Simulation: Redirecting to add property form...")}
          className="bg-[#C9A84C] hover:bg-[#b7943b] text-[#0A0F1E] font-bold px-4 py-2 flex items-center gap-1.5 shadow-lg shadow-[#C9A84C]/10 rounded-lg shrink-0"
        >
          <Plus className="size-4" /> Add Listing
        </Button>
      </div>

      {/* Advanced Filter Panel Card */}
      <Card className="bg-[#111827] border-slate-800 p-5 rounded-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800/80">
          <SlidersHorizontal className="size-4.5 text-[#C9A84C]" />
          <span className="font-semibold text-sm text-slate-200">Advanced Inventory Filters</span>
        </div>

        {/* Filter Toolbar grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search className="size-4" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ID, title, locality..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pl-9 pr-3 text-xs text-slate-200 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
            />
          </div>

          {/* Purpose Pill Selector */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setSelectedPurpose("all")}
              className={`flex-1 py-1.5 rounded-md font-semibold transition-colors ${selectedPurpose === "all" ? "bg-[#C9A84C] text-[#0A0F1E]" : "text-slate-400 hover:text-slate-200"}`}
            >
              All Types
            </button>
            <button
              onClick={() => setSelectedPurpose("buy")}
              className={`flex-1 py-1.5 rounded-md font-semibold transition-colors ${selectedPurpose === "buy" ? "bg-[#C9A84C] text-[#0A0F1E]" : "text-slate-400 hover:text-slate-200"}`}
            >
              Buy
            </button>
            <button
              onClick={() => setSelectedPurpose("rent")}
              className={`flex-1 py-1.5 rounded-md font-semibold transition-colors ${selectedPurpose === "rent" ? "bg-[#C9A84C] text-[#0A0F1E]" : "text-slate-400 hover:text-slate-200"}`}
            >
              Rent
            </button>
          </div>

          {/* City Selection */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-[#C9A84C]/50"
          >
            <option value="All">All Cities (TAMIL NADU)</option>
            {citiesList.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          {/* Property Type Selection */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-[#C9A84C]/50"
          >
            <option value="All">All Property Types</option>
            {typesList.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Verification Status & Clear buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Sub toggles */}
          <div className="flex flex-wrap gap-4 text-xs">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={filterRera === true}
                onChange={(e) => setFilterRera(e.target.checked ? true : null)}
                className="size-4 accent-[#C9A84C] rounded border-slate-800 bg-slate-900"
              />
              <span>RERA Approved</span>
            </label>

            <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={filterDtcp === true}
                onChange={(e) => setFilterDtcp(e.target.checked ? true : null)}
                className="size-4 accent-[#C9A84C] rounded border-slate-800 bg-slate-900"
              />
              <span>DTCP Approved</span>
            </label>
          </div>

          {/* Clear Filters Button */}
          <Button
            onClick={resetAllFilters}
            variant="outline"
            size="sm"
            className="border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900/50 rounded-lg px-3 flex items-center gap-1.5"
          >
            <X className="size-3.5" /> Clear Filters
          </Button>
        </div>
      </Card>

      {/* Selected Action Panel for Bulk modifications */}
      {selectedIds.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#C9A84C]/10 border border-[#C9A84C]/35 rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap"
        >
          <div className="flex items-center gap-2">
            <Badge className="bg-[#C9A84C] text-[#0A0F1E] font-bold">
              {selectedIds.length}
            </Badge>
            <span className="text-xs font-semibold text-slate-200">
              listings selected for batch processing
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleBulkFeature}
              size="sm"
              className="bg-amber-600/20 border border-amber-500/30 text-amber-300 hover:bg-amber-500/30 text-xs rounded-lg px-3 py-1.5 flex items-center gap-1"
            >
              <Star className="size-3.5 fill-amber-300" /> Feature Selected
            </Button>
            <Button
              onClick={handleBulkDelete}
              size="sm"
              variant="destructive"
              className="bg-rose-500/10 border border-rose-500/25 text-rose-400 hover:bg-rose-500/20 text-xs rounded-lg px-3 py-1.5 flex items-center gap-1"
            >
              <Trash2 className="size-3.5" /> Delete Selected
            </Button>
            <button
              onClick={() => setSelectedIds([])}
              className="text-slate-500 hover:text-slate-300 text-xs ml-1"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Main Grid Inventory Table */}
      <Card className="bg-[#111827] border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-[#070B16] text-slate-400 font-semibold select-none">
                <th className="p-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={filteredSortedProperties.length > 0 && selectedIds.length === filteredSortedProperties.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="size-4 accent-[#C9A84C] rounded border-slate-800 bg-slate-900 cursor-pointer"
                  />
                </th>
                <th className="p-4 min-w-[200px]">Property Details</th>
                <th className="p-4 cursor-pointer hover:bg-slate-900/50 transition-colors" onClick={() => handleSort("price")}>
                  <div className="flex items-center gap-1">
                    Price <ArrowUpDown className="size-3.5" />
                  </div>
                </th>
                <th className="p-4 cursor-pointer hover:bg-slate-900/50 transition-colors" onClick={() => handleSort("type")}>
                  <div className="flex items-center gap-1">
                    Category <ArrowUpDown className="size-3.5" />
                  </div>
                </th>
                <th className="p-4 cursor-pointer hover:bg-slate-900/50 transition-colors" onClick={() => handleSort("city")}>
                  <div className="flex items-center gap-1">
                    City <ArrowUpDown className="size-3.5" />
                  </div>
                </th>
                <th className="p-4">Regulatory Clearances</th>
                <th className="p-4 text-center">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">
                    Loading property index catalog...
                  </td>
                </tr>
              ) : paginatedProperties.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">
                    No properties match your filter parameters.
                  </td>
                </tr>
              ) : (
                paginatedProperties.map((p) => {
                  const isChecked = selectedIds.includes(p.id);

                  return (
                    <tr
                      key={p.id}
                      className={`hover:bg-slate-900/20 transition-all ${isChecked ? "bg-[#C9A84C]/5" : ""}`}
                    >
                      {/* Checkbox */}
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => handleSelectRow(p.id, e.target.checked)}
                          className="size-4 accent-[#C9A84C] rounded border-slate-800 bg-slate-900 cursor-pointer"
                        />
                      </td>

                      {/* Details */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="size-12 rounded-lg bg-slate-950 overflow-hidden relative shrink-0 border border-slate-800">
                            <img
                              src={p.images[0]}
                              alt={p.title}
                              className="object-cover size-full"
                            />
                            <div className="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] font-bold text-center py-0.5 uppercase tracking-wider text-slate-200">
                              {p.purpose}
                            </div>
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-200 truncate max-w-[200px]" title={p.title}>
                              {p.title}
                            </h4>
                            <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="size-3 text-slate-600" /> {p.locality}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="p-4 font-bold text-white font-mono">
                        {formatPrice(p.price)}
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <Badge className="bg-slate-900/60 border border-slate-800 font-semibold rounded text-slate-400">
                          {p.type}
                        </Badge>
                      </td>

                      {/* City */}
                      <td className="p-4">
                        <span className="font-semibold text-slate-200">{p.city}</span>
                      </td>

                      {/* Regulatory */}
                      <td className="p-4">
                        <div className="flex flex-col gap-1 text-[10px]">
                          <div className="flex items-center gap-1.5">
                            <span className={`size-1.5 rounded-full ${p.isRERAApproved ? "bg-emerald-500" : "bg-amber-500"}`} />
                            <span className="text-slate-400">RERA: </span>
                            <span className={p.isRERAApproved ? "text-emerald-400 font-bold" : "text-amber-400 font-medium"}>
                              {p.isRERAApproved ? "Approved" : "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={`size-1.5 rounded-full ${p.isDTCPApproved ? "bg-emerald-500" : "bg-amber-500"}`} />
                            <span className="text-slate-400">DTCP: </span>
                            <span className={p.isDTCPApproved ? "text-emerald-400 font-bold" : "text-amber-400 font-medium"}>
                              {p.isDTCPApproved ? "Approved" : "Pending"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Featured */}
                      <td className="p-4 text-center">
                        <button
                          onClick={() => featureMutation.mutate({ id: p.id, featured: !p.isFeatured })}
                          className={`p-1.5 rounded-md border transition-all ${
                            p.isFeatured
                              ? "bg-[#C9A84C]/10 border-[#C9A84C]/35 text-[#C9A84C]"
                              : "bg-slate-900 border-slate-800 text-slate-600 hover:text-slate-400"
                          }`}
                          title={p.isFeatured ? "Un-feature Property" : "Feature Property"}
                        >
                          <Star className={`size-3.5 ${p.isFeatured ? "fill-[#C9A84C]" : ""}`} />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Verification toggle button */}
                          <button
                            onClick={() => verifyMutation.mutate({ id: p.id, verified: !p.isVerified })}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-colors ${
                              p.isVerified
                                ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                                : "bg-amber-500/10 border-amber-500/25 text-amber-400"
                            }`}
                          >
                            {p.isVerified ? "Verified" : "Pending Verify"}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this luxury property listing?")) {
                                deleteMutation.mutate(p.id);
                              }
                            }}
                            className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-500 hover:text-rose-400 hover:border-rose-500/20 transition-all"
                            title="Delete Listing"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer and pagination */}
        {filteredSortedProperties.length > 0 && (
          <div className="p-4 bg-[#070B16] border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 select-none">
            <div>
              Showing <span className="font-semibold text-slate-300">{Math.min(filteredSortedProperties.length, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(filteredSortedProperties.length, currentPage * itemsPerPage)}</span> of <span className="font-semibold text-slate-300">{filteredSortedProperties.length}</span> properties
            </div>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:pointer-events-none disabled:opacity-40 transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`size-6 rounded font-semibold transition-colors ${
                    currentPage === idx + 1
                      ? "bg-[#C9A84C] text-[#0A0F1E]"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:pointer-events-none disabled:opacity-40 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
