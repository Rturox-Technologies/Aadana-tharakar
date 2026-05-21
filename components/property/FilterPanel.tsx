"use client";

import React from "react";
import { usePropertyStore } from "@/store/propertyStore";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Trash2, Compass, ShieldCheck, Waves, CheckSquare } from "lucide-react";

interface FilterPanelProps {
  hideCitySelect?: boolean;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ hideCitySelect = false }) => {
  const { filters, updateFilters, resetFilters } = usePropertyStore();

  const handlePurposeChange = (purpose: "buy" | "rent") => {
    updateFilters({ purpose });
  };

  const handleCityToggle = (city: string) => {
    const nextCities = filters.cities.includes(city)
      ? filters.cities.filter((c) => c !== city)
      : [...filters.cities, city];
    updateFilters({ cities: nextCities });
  };

  const handleTypeToggle = (type: string) => {
    const nextTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    updateFilters({ types: nextTypes });
  };

  const handleBedroomToggle = (bed: string) => {
    const nextBeds = filters.bedrooms.includes(bed)
      ? filters.bedrooms.filter((b) => b !== bed)
      : [...filters.bedrooms, bed];
    updateFilters({ bedrooms: nextBeds });
  };

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(0)} L`;
    return `₹${val}`;
  };

  const cities = ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy", "Tirunelveli", "Erode", "Vellore"];
  const types = ["Apartment", "Villa", "Plot", "Commercial", "Independent House"];
  const bedroomOptions = ["1", "2", "3", "4+"];

  return (
    <div className="space-y-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm w-full">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <h3 className="font-bold text-lg text-navy font-serif">Filters</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={resetFilters}
          className="text-slate-400 hover:text-gold gap-1 text-xs font-semibold px-2"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Clear All</span>
        </Button>
      </div>

      {/* Buy / Rent Toggle */}
      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Purpose</Label>
        <div className="flex bg-slate-100 p-1.5 rounded-lg border border-slate-200/50">
          <button
            type="button"
            onClick={() => handlePurposeChange("buy")}
            className={`flex-1 text-center py-2 rounded-md font-bold text-xs transition-all duration-300 ${
              filters.purpose === "buy"
                ? "bg-navy text-white shadow"
                : "text-slate-500 hover:text-navy"
            }`}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => handlePurposeChange("rent")}
            className={`flex-1 text-center py-2 rounded-md font-bold text-xs transition-all duration-300 ${
              filters.purpose === "rent"
                ? "bg-navy text-white shadow"
                : "text-slate-500 hover:text-navy"
            }`}
          >
            Rent
          </button>
        </div>
      </div>

      {/* City Multiselect */}
      {!hideCitySelect && (
        <div className="space-y-3">
          <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Cities</Label>
          <div className="grid grid-cols-2 gap-x-2 gap-y-2.5">
            {cities.map((city) => (
              <div key={city} className="flex items-center space-x-2">
                <Checkbox
                  id={`city-${city}`}
                  checked={filters.cities.includes(city)}
                  onCheckedChange={() => handleCityToggle(city)}
                  className="border-slate-300 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                />
                <label
                  htmlFor={`city-${city}`}
                  className="text-xs font-medium text-slate-600 cursor-pointer select-none"
                >
                  {city}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Price Range</Label>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">Min Price</span>
            <Input
              type="number"
              value={filters.priceMin}
              onChange={(e) => updateFilters({ priceMin: Number(e.target.value) })}
              className="h-9 text-xs border-slate-200"
            />
          </div>
          <div className="flex-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">Max Price</span>
            <Input
              type="number"
              value={filters.priceMax}
              onChange={(e) => updateFilters({ priceMax: Number(e.target.value) })}
              className="h-9 text-xs border-slate-200"
            />
          </div>
        </div>
        <div className="flex justify-between text-[10px] font-bold text-gold">
          <span>{formatCurrency(filters.priceMin)}</span>
          <span>{formatCurrency(filters.priceMax)}</span>
        </div>
      </div>

      {/* Property Type Checkboxes */}
      <div className="space-y-3">
        <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Property Type</Label>
        <div className="space-y-2.5">
          {types.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.types.includes(type)}
                onCheckedChange={() => handleTypeToggle(type)}
                className="border-slate-300 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
              />
              <label
                htmlFor={`type-${type}`}
                className="text-xs font-medium text-slate-600 cursor-pointer select-none"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Bedrooms Group */}
      <div className="space-y-3">
        <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Bedrooms</Label>
        <div className="flex gap-2">
          {bedroomOptions.map((bed) => {
            const isSelected = filters.bedrooms.includes(bed);
            return (
              <button
                key={bed}
                type="button"
                onClick={() => handleBedroomToggle(bed)}
                className={`flex-1 text-center py-2 border rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-gold border-gold text-navy shadow-sm"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {bed === "4+" ? "4+ BHK" : `${bed} BHK`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Furnishing */}
      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Furnished Status</Label>
        <Select 
          value={filters.furnished} 
          onValueChange={(val) => updateFilters({ furnished: val ?? "All" })}
        >
          <SelectTrigger className="w-full border-slate-200 text-xs h-9">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent className="bg-white border-slate-200 text-slate-700 text-xs">
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Yes">Furnished</SelectItem>
            <SelectItem value="Semi">Semi-Furnished</SelectItem>
            <SelectItem value="No">Unfurnished</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tamil Nadu Specifics */}
      <div className="space-y-3.5 border-t border-slate-100 pt-5">
        <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Local Specifications</Label>
        
        {/* RERA */}
        <div className="flex items-start space-x-2.5">
          <Checkbox
            id="filter-rera"
            checked={filters.isRERAApproved}
            onCheckedChange={(checked) => updateFilters({ isRERAApproved: !!checked })}
            className="border-slate-300 data-[state=checked]:bg-gold data-[state=checked]:border-gold mt-0.5"
          />
          <div className="grid gap-1 leading-none">
            <label
              htmlFor="filter-rera"
              className="text-xs font-bold text-navy flex items-center gap-1 cursor-pointer select-none"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              RERA Approved
            </label>
            <p className="text-[10px] text-slate-400">Registered under TN RERA.</p>
          </div>
        </div>

        {/* DTCP */}
        <div className="flex items-start space-x-2.5">
          <Checkbox
            id="filter-dtcp"
            checked={filters.isDTCPApproved}
            onCheckedChange={(checked) => updateFilters({ isDTCPApproved: !!checked })}
            className="border-slate-300 data-[state=checked]:bg-gold data-[state=checked]:border-gold mt-0.5"
          />
          <div className="grid gap-1 leading-none">
            <label
              htmlFor="filter-dtcp"
              className="text-xs font-bold text-navy flex items-center gap-1 cursor-pointer select-none"
            >
              <CheckSquare className="h-3.5 w-3.5 text-indigo-600" />
              DTCP Approved
            </label>
            <p className="text-[10px] text-slate-400">Approved by Town & Country Planning.</p>
          </div>
        </div>

        {/* Vaastu */}
        <div className="flex items-start space-x-2.5">
          <Checkbox
            id="filter-vaastu"
            checked={filters.isVaastuCompliant}
            onCheckedChange={(checked) => updateFilters({ isVaastuCompliant: !!checked })}
            className="border-slate-300 data-[state=checked]:bg-gold data-[state=checked]:border-gold mt-0.5"
          />
          <div className="grid gap-1 leading-none">
            <label
              htmlFor="filter-vaastu"
              className="text-xs font-bold text-navy flex items-center gap-1 cursor-pointer select-none"
            >
              <Compass className="h-3.5 w-3.5 text-amber-600" />
              Vaastu Compliant
            </label>
            <p className="text-[10px] text-slate-400">Built according to Vaastu Shastra.</p>
          </div>
        </div>

        {/* Flood Safe */}
        <div className="flex items-start space-x-2.5">
          <Checkbox
            id="filter-flood"
            checked={filters.isFloodSafe}
            onCheckedChange={(checked) => updateFilters({ isFloodSafe: !!checked })}
            className="border-slate-300 data-[state=checked]:bg-gold data-[state=checked]:border-gold mt-0.5"
          />
          <div className="grid gap-1 leading-none">
            <label
              htmlFor="filter-flood"
              className="text-xs font-bold text-navy flex items-center gap-1 cursor-pointer select-none"
            >
              <Waves className="h-3.5 w-3.5 text-blue-600" />
              Flood Safe Zone
            </label>
            <p className="text-[10px] text-slate-400">Not affected by seasonal monsoon floods.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
