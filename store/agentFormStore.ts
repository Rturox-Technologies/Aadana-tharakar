import { create } from "zustand";

export interface AgentFormState {
  currentStep: number;
  formData: {
    // Step 1: Basic Info
    title: string;
    type: string;
    price: number;
    city: string;
    locality: string;
    areaSqFt: number;
    bedrooms: number;
    bathrooms: number;
    purpose: "buy" | "rent";

    // Step 2: Tamil Nadu Details
    isDTCPApproved: boolean;
    isCMDAApproved: boolean;
    cmdaStatus: string;
    reraNumber: string;
    isRERAApproved: boolean;
    pattaNumber: string;
    waterAvailability: string;
    ebConnection: string;
    isFloodSafe: boolean;
    isVaastuCompliant: boolean;
    roadWidth: string;
    drainage: string;

    // Step 3: Description + Amenities
    description: string;
    amenities: string[];
    furnished: "Yes" | "No" | "Semi";
    status: "ready-to-move" | "under-construction" | "plot";

    // Step 4: Images
    images: string[];
  };
  setStep: (step: number) => void;
  updateFormData: (data: Partial<AgentFormState["formData"]>) => void;
  resetForm: () => void;
}

const initialFormData: AgentFormState["formData"] = {
  title: "",
  type: "Apartment",
  price: 0,
  city: "Chennai",
  locality: "",
  areaSqFt: 0,
  bedrooms: 2,
  bathrooms: 2,
  purpose: "buy",

  isDTCPApproved: false,
  isCMDAApproved: false,
  cmdaStatus: "",
  reraNumber: "",
  isRERAApproved: false,
  pattaNumber: "",
  waterAvailability: "24 Hours Borewell",
  ebConnection: "3 Phase Connection",
  isFloodSafe: true,
  isVaastuCompliant: true,
  roadWidth: "30 Feet",
  drainage: "Corporation Drainage",

  description: "",
  amenities: [],
  furnished: "Semi",
  status: "ready-to-move",

  images: [],
};

export const useAgentFormStore = create<AgentFormState>((set) => ({
  currentStep: 1,
  formData: initialFormData,
  setStep: (currentStep) => set({ currentStep }),
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetForm: () => set({ currentStep: 1, formData: initialFormData }),
}));
