"use client";

import React, { useState } from "react";
import BuilderLayout from "@/components/builder/BuilderLayout";
import BuilderOverview from "@/components/builder/BuilderOverview";
import MyProjectsView from "@/components/builder/MyProjectsView";
import AddProjectForm from "@/components/builder/AddProjectForm";
import BuilderAnalytics from "@/components/builder/BuilderAnalytics";
import SubscriptionView from "@/components/builder/SubscriptionView";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Settings,
  Sparkles,
  ShieldCheck,
  Building,
  KeyRound,
  FileCheck2,
  Lock,
  Eye,
  Mail,
  PhoneCall,
  MapPin,
  TrendingUp
} from "lucide-react";

export default function BuilderDashboardPage() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Portal Settings states mock
  const [devName, setDevName] = useState("Chola Builders Private Limited");
  const [licenseId, setLicenseId] = useState("TN/Builders/00349/2024");
  const [reraNum, setReraNum] = useState("TN/RERA/Developer/0012/2025");
  const [primaryEmail, setPrimaryEmail] = useState("relations@cholabuilders.in");

  return (
    <BuilderLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "dashboard" && (
        <BuilderOverview onNavigateTab={setActiveTab} />
      )}

      {activeTab === "projects" && (
        <MyProjectsView />
      )}

      {activeTab === "add-project" && (
        <AddProjectForm />
      )}

      {activeTab === "analytics" && (
        <BuilderAnalytics />
      )}

      {activeTab === "subscription" && (
        <SubscriptionView />
      )}

      {/* PORTAL SETTINGS VIEW */}
      {activeTab === "settings" && (
        <div className="space-y-6 text-slate-100 animate-in fade-in-50 duration-300">
          <div>
            <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <Settings className="size-5.5 text-[#C9A84C]" /> Portal Settings & Credentials
            </h1>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">
              Manage developer licenses, secure API keys, and primary contacts registry.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Core credentials settings */}
            <Card className="bg-[#0B0F19] border-slate-800 p-6 shadow-md lg:col-span-2 space-y-5">
              <h3 className="font-extrabold text-white text-sm border-b border-slate-850 pb-2 mb-2">Developer Verification Registry</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase">Developer Entity Name</Label>
                  <Input
                    value={devName}
                    onChange={(e) => setDevName(e.target.value)}
                    className="bg-[#070A13] border-slate-850 text-white text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase">Corporate Email</Label>
                  <Input
                    value={primaryEmail}
                    onChange={(e) => setPrimaryEmail(e.target.value)}
                    className="bg-[#070A13] border-slate-850 text-white text-xs font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase">Municipal License Index</Label>
                  <Input
                    value={licenseId}
                    onChange={(e) => setLicenseId(e.target.value)}
                    className="bg-[#070A13] border-slate-850 text-slate-300 text-xs font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase">State RERA License ID</Label>
                  <Input
                    value={reraNum}
                    onChange={(e) => setReraNum(e.target.value)}
                    className="bg-[#070A13] border-slate-850 text-slate-300 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-850 flex justify-end">
                <Button
                  onClick={() => alert("Simulation: Developer settings saved successfully.")}
                  className="bg-[#C9A84C] text-[#070A13] hover:bg-[#b0903c] text-xs font-black shadow-sm"
                >
                  Save Settings Credentials
                </Button>
              </div>
            </Card>

            {/* Secure API Key Manager */}
            <Card className="bg-[#0B0F19] border-slate-800 p-6 shadow-md flex flex-col justify-between lg:col-span-1">
              <div className="space-y-4">
                <div className="flex items-center gap-1.5">
                  <Lock className="size-4.5 text-[#C9A84C]" />
                  <h3 className="font-extrabold text-white text-sm">Security API Access</h3>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
                  Secure API keys utilized to feed new leads from external property databases into Aadana Tharakar Construct CRM.
                </p>

                <div className="p-3 bg-[#070A13] border border-slate-850 rounded space-y-1">
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">Primary secret API Key</span>
                  <div className="flex items-center justify-between font-mono text-[10px] text-slate-350">
                    <span>nm_sec_live_9843a8df...</span>
                    <button
                      onClick={() => alert("Simulation: nm_sec_live_9843a8df4923fde18837 copied to clipboard.")}
                      className="text-[#C9A84C] hover:underline"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-850 text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center justify-between">
                <span>API Status: Connected</span>
                <span className="text-[#C9A84C]">v2.4 Live</span>
              </div>
            </Card>
          </div>
        </div>
      )}
    </BuilderLayout>
  );
}
