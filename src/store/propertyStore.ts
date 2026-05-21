import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type PropertyFilters = {
  transaction: 'BUY' | 'RENT' | '';
  cities: string[];
  priceMin: number;
  priceMax: number;
  propertyTypes: string[];
  bedrooms: string[];
  furnished: '' | 'YES' | 'NO' | 'SEMI';
  vaastuCompliant: boolean;
  dtcpApproved: boolean;
  reraVerified: boolean;
  floodSafe: boolean;
};

export type ViewMode = 'grid' | 'list';

export type PropertyState = {
  filters: PropertyFilters;
  page: number;
  viewMode: ViewMode;
  setFilters: (filters: Partial<PropertyFilters>) => void;
  resetFilters: () => void;
  setPage: (page: number) => void;
  setViewMode: (mode: ViewMode) => void;
};

const initialFilters: PropertyFilters = {
  transaction: '',
  cities: [],
  priceMin: 500000,
  priceMax: 50000000,
  propertyTypes: [],
  bedrooms: [],
  furnished: '',
  vaastuCompliant: false,
  dtcpApproved: false,
  reraVerified: false,
  floodSafe: false,
};

export const usePropertyStore = create<PropertyState>()(
  devtools(set => ({
    filters: initialFilters,
    page: 1,
    viewMode: 'grid',
    setFilters: partial => set(state => ({ filters: { ...state.filters, ...partial } })),
    resetFilters: () => set({ filters: initialFilters, page: 1 }),
    setPage: page => set({ page }),
    setViewMode: mode => set({ viewMode: mode }),
  }))
);
