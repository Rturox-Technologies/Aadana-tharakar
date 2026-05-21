"use client";

import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import AdminLayout from "@/components/admin/AdminLayout";
import OverviewView from "@/components/admin/OverviewView";
import PropertiesView from "@/components/admin/PropertiesView";
import LeadsView from "@/components/admin/LeadsView";
import { Sparkles, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Dedicated premium placeholder for other management views
function PlaceholderView({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-[#111827] border border-slate-800 rounded-xl space-y-4 animate-fadeIn">
      <div className="p-4 bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] rounded-full">
        <Sparkles className="size-8 animate-pulse" />
      </div>
      <h2 className="text-xl font-bold text-white tracking-tight">{title} Manager</h2>
      <p className="text-slate-400 text-sm max-w-md leading-relaxed">{description}</p>
      <Badge className="bg-[#C9A84C] text-[#0A0F1E] font-extrabold uppercase py-1 px-3 mt-2">
        Operational Sync Ready
      </Badge>
    </div>
  );
}

// Inner view switcher component
function AdminDashboardSwitcher() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, login } = useAuthStore();

  // Simulated auto login super admin profile if session is blank (dev experience)
  useEffect(() => {
    if (!user) {
      login(
        {
          id: "admin-arun",
          name: "Arun Kumar",
          email: "arun@aadana.in",
          role: "admin",
          phoneNumber: "+91 98400 12345",
        },
        "simulated-dev-jwt-token"
      );
    }
  }, [user, login]);

  // View routing switcher
  const renderActiveView = () => {
    switch (activeTab) {
      case "dashboard":
        return <OverviewView />;
      case "properties":
        return <PropertiesView />;
      case "leads":
        return <LeadsView />;
      case "users":
        return (
          <PlaceholderView
            title="Users Registry"
            description="Audit registered buyers, verified builders, agent licenses, and manage general user security credentials."
          />
        );
      case "agents":
        return (
          <PlaceholderView
            title="Luxury Real Estate Agents"
            description="Manage luxury agency profiles, broker ratings, commission rates, and review closed deal counters."
          />
        );
      case "builders":
        return (
          <PlaceholderView
            title="Verified Developers & Builders"
            description="Approve new real estate builders in Tamil Nadu, track upcoming housing projects, and audit catalog submissions."
          />
        );
      case "subscriptions":
        return (
          <PlaceholderView
            title="Pro & Enterprise Subscriptions"
            description="Monitor monthly packages, agent lead-allocation credits, featuring plans, and adjust platform tier pricing."
          />
        );
      case "payments":
        return (
          <PlaceholderView
            title="Invoicing & Payments CRM"
            description="Reconcile billing lists, track GST invoices, refund logs, and monitor direct gateway payouts."
          />
        );
      case "blog":
        return (
          <PlaceholderView
            title="Tamil Nadu Real Estate Blog"
            description="Create rich SEO articles, patta guideline logs, DTCP clearance walkthroughs, and news updates."
          />
        );
      case "settings":
        return (
          <PlaceholderView
            title="System Parameters Settings"
            description="Configure global platform commission structures, Redis caching parameters, SMTP mailers, and backend API routes."
          />
        );
      default:
        return <OverviewView />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderActiveView()}
    </AdminLayout>
  );
}

// Global React Query provider shell inside the entry point
export default function AdminDashboardPage() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AdminDashboardSwitcher />
    </QueryClientProvider>
  );
}
