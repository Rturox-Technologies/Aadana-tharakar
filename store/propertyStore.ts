import { create } from "zustand";

export interface PropertyFilter {
  purpose: "buy" | "rent";
  cities: string[]; // Chennai, Coimbatore, Madurai, Salem, Trichy, Tirunelveli, Erode, Vellore
  priceMin: number;
  priceMax: number;
  types: string[]; // Apartment, Villa, Plot, Commercial, Independent House
  bedrooms: string[]; // 1, 2, 3, 4+
  furnished: string; // Yes, No, Semi, All
  isVaastuCompliant: boolean;
  isDTCPApproved: boolean;
  isRERAApproved: boolean;
  isFloodSafe: boolean;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  purpose: "buy" | "rent";
  city: string;
  locality: string;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  areaSqFt: number;
  images: string[];
  status: string; // ready-to-move, under-construction, plot
  isRERAApproved: boolean;
  isDTCPApproved: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  isVaastuCompliant: boolean;
  isFloodSafe: boolean;
  furnished: "Yes" | "No" | "Semi";
  postedDate: string;
  views: number;
  amenities?: string[];
  
  // TN local details
  waterAvailability: string;
  ebConnection: string;
  roadWidth: string;
  drainage: string;
  pattaNumber?: string;
  reraNumber?: string;
  cmdaStatus?: string;
  
  // Agent Details
  agent: {
    name: string;
    agency: string;
    rating: number;
    deals: number;
    avatar: string;
    phone: string;
    whatsapp: string;
  };
}

interface PropertyState {
  properties: Property[];
  selectedProperty: Property | null;
  filters: PropertyFilter;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setProperties: (properties: Property[]) => void;
  setSelectedProperty: (property: Property | null) => void;
  updateFilters: (filters: Partial<PropertyFilter>) => void;
  resetFilters: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

const initialFilters: PropertyFilter = {
  purpose: "buy",
  cities: [],
  priceMin: 500000, // 5 Lakhs
  priceMax: 50000000, // 5 Crores
  types: [],
  bedrooms: [],
  furnished: "All",
  isVaastuCompliant: false,
  isDTCPApproved: false,
  isRERAApproved: false,
  isFloodSafe: false,
};

export const usePropertyStore = create<PropertyState>((set) => ({
  properties: [],
  selectedProperty: null,
  filters: initialFilters,
  isLoading: false,
  error: null,

  setProperties: (properties) => set({ properties }),
  setSelectedProperty: (selectedProperty) => set({ selectedProperty }),
  updateFilters: (newFilters) => 
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  resetFilters: () => set({ filters: initialFilters }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
