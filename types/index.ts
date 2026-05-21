export type UserRole = "admin" | "agent" | "builder" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phoneNumber?: string;
  companyName?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  district: string; // e.g. Chennai, Coimbatore, Madurai, Trichy, Salem
  type: "apartment" | "villa" | "land" | "commercial";
  bedrooms?: number;
  bathrooms?: number;
  areaSqFt: number;
  images: string[];
  status: "ready-to-move" | "under-construction" | "plot-available";
  builderId?: string;
  agentId?: string;
  isRERAApproved: boolean;
  reraNumber?: string;
  amenities: string[];
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  propertyId: string;
  propertyName: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  status: "new" | "contacted" | "negotiation" | "converted" | "lost";
  assignedAgentId?: string;
  assignedBuilderId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  propertyId: string;
  property: Partial<Property>;
  createdAt: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}
