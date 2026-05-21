import { create } from "zustand";

export interface BuilderFormState {
  currentStep: number;
  formData: {
    // Step 1: Basic Info
    projectName: string;
    reraId: string;
    totalUnits: number;
    possessionDate: string;
    projectType: string; // Apartment, Villa, Plot, etc.
    priceMin: number;
    priceMax: number;
    city: string;
    locality: string;
    areaRange: string; // e.g. "1200 - 3500 sqft"

    // Step 2: Tamil Nadu Details
    isDTCPApproved: boolean;
    isCMDAApproved: boolean;
    cmdaStatus: string;
    pattaNumber: string;
    waterAvailability: string;
    ebConnection: string;
    isFloodSafe: boolean;
    isVaastuCompliant: boolean;
    roadWidth: string;
    drainage: string;

    // Step 3: Description + Amenities Checklist
    description: string;
    amenities: string[]; // checklist items
    status: "Upcoming" | "Under Construction" | "Completed";

    // Step 4: Media & Layouts
    images: string[]; // bulk upload gallery
    floorPlanUrl: string; // Floor plan (PDF or image path)
    floorPlanName: string;
  };
  setStep: (step: number) => void;
  updateFormData: (data: Partial<BuilderFormState["formData"]>) => void;
  resetForm: () => void;
}

const initialFormData: BuilderFormState["formData"] = {
  projectName: "",
  reraId: "",
  totalUnits: 50,
  possessionDate: "2027-12-31",
  projectType: "Apartment",
  priceMin: 0,
  priceMax: 0,
  city: "Chennai",
  locality: "",
  areaRange: "",

  isDTCPApproved: false,
  isCMDAApproved: false,
  cmdaStatus: "",
  pattaNumber: "",
  waterAvailability: "Siruvani & Borewell",
  ebConnection: "3 Phase Connection",
  isFloodSafe: true,
  isVaastuCompliant: true,
  roadWidth: "40 Feet",
  drainage: "Underground Drainage System",

  description: "",
  amenities: [],
  status: "Under Construction",

  images: [],
  floorPlanUrl: "",
  floorPlanName: "",
};

export const useBuilderFormStore = create<BuilderFormState>((set) => ({
  currentStep: 1,
  formData: initialFormData,
  setStep: (currentStep) => set({ currentStep }),
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetForm: () => set({ currentStep: 1, formData: initialFormData }),
}));
