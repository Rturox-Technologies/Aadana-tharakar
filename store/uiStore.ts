import { create } from "zustand";

interface UIState {
  sidebarOpen: boolean;
  theme: "light" | "dark" | "system";
  activeModals: {
    login: boolean;
    contactAgent: boolean;
    addProperty: boolean;
    leadDetails: boolean;
    shareListing: boolean;
  };
  notificationCount: number;
  
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
  openModal: (modalName: keyof UIState["activeModals"]) => void;
  closeModal: (modalName: keyof UIState["activeModals"]) => void;
  closeAllModals: () => void;
  setNotificationCount: (count: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  theme: "system",
  activeModals: {
    login: false,
    contactAgent: false,
    addProperty: false,
    leadDetails: false,
    shareListing: false,
  },
  notificationCount: 0,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  
  setTheme: (theme) => set({ theme }),
  
  openModal: (modalName) => 
    set((state) => ({
      activeModals: { ...state.activeModals, [modalName]: true },
    })),
    
  closeModal: (modalName) => 
    set((state) => ({
      activeModals: { ...state.activeModals, [modalName]: false },
    })),
    
  closeAllModals: () => 
    set({
      activeModals: {
        login: false,
        contactAgent: false,
        addProperty: false,
        leadDetails: false,
        shareListing: false,
      },
    }),
    
  setNotificationCount: (notificationCount) => set({ notificationCount }),
}));
