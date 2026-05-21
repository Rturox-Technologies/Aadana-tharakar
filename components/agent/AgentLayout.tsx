"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Building,
  PlusCircle,
  MessageSquare,
  Calendar,
  BarChart3,
  PhoneCall,
  User,
  ChevronLeft,
  ChevronRight,
  Menu,
  Bell,
  Globe,
  LogOut,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarItem {
  id: string;
  label: string;
  tamilLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: "dashboard", label: "My Dashboard", tamilLabel: "எனது கட்டுப்பாட்டகம்", icon: LayoutDashboard },
  { id: "listings", label: "My Listings", tamilLabel: "எனது சொத்துக்கள்", icon: Building },
  { id: "add-property", label: "Add Property", tamilLabel: "சொத்து சேர்", icon: PlusCircle },
  { id: "leads", label: "My Leads", tamilLabel: "எனது தொடர்புகள்", icon: MessageSquare },
  { id: "schedule-visits", label: "Schedule Visits", tamilLabel: "சந்திப்பு திட்டமிடல்", icon: Calendar },
  { id: "analytics", label: "Analytics", tamilLabel: "புள்ளிவிவரங்கள்", icon: BarChart3 },
  { id: "whatsapp-logs", label: "WhatsApp Logs", tamilLabel: "வாட்ஸ்அப் பதிவுகள்", icon: PhoneCall },
  { id: "profile", label: "Profile", tamilLabel: "சுயவிவரம்", icon: User },
];

interface AgentLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

export default function AgentLayout({ activeTab, setActiveTab, children }: AgentLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [language, setLanguage] = useState<"en" | "ta">("en");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Karthik scheduled a visit for ECR Villa on May 24", unread: true },
    { id: 2, text: "New lead Suresh Kumar inquired via WhatsApp", unread: true },
  ]);

  const activeItem = SIDEBAR_ITEMS.find((item) => item.id === activeTab) || SIDEBAR_ITEMS[0];

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-800 overflow-hidden font-sans">
      {/* Collapsible Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "h-full bg-white border-r border-slate-200 flex flex-col justify-between select-none z-30 shrink-0 relative shadow-sm"
        )}
      >
        <div>
          {/* Brand Logo Header */}
          <div className="h-20 flex items-center px-4 border-b border-slate-100 justify-between">
            <AnimatePresence mode="wait">
              {!collapsed ? (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col"
                >
                  <span className="font-semibold text-[10px] tracking-widest text-[#0F172A] uppercase">
                    ஆதனத் தரகர் · Agent
                  </span>
                  <span className="text-lg font-extrabold tracking-tight text-[#0F172A]">
                    Aadana Tharakar Portal
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mx-auto text-lg font-extrabold text-[#0F172A]"
                >
                  நி
                </motion.div>
              )}
            </AnimatePresence>

            {!collapsed && (
              <button
                onClick={() => setCollapsed(true)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-50 transition-colors"
                title="Collapse Sidebar"
              >
                <ChevronLeft className="size-4.5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-14rem)] custom-scrollbar">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center rounded-lg px-3 py-2.5 text-xs font-semibold transition-all group relative overflow-hidden",
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/60"
                  )}
                >
                  {/* Left indicator bar on active */}
                  {isActive && (
                    <motion.div
                      layoutId="agentActiveIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#C9A84C]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon
                    className={cn(
                      "size-4 shrink-0 transition-colors",
                      isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"
                    )}
                  />
                  {!collapsed && (
                    <div className="ml-3 flex flex-col items-start leading-tight">
                      <span>{language === "en" ? item.label : item.tamilLabel}</span>
                      <span className={cn(
                        "text-[9px] font-normal transition-colors",
                        isActive ? "text-slate-400" : "text-slate-400"
                      )}>
                        {language === "en" ? item.tamilLabel : item.label}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Details */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/60">
          {collapsed ? (
            <button
              onClick={() => setCollapsed(false)}
              className="w-full flex justify-center p-2.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg transition-colors shadow-2xs"
              title="Expand Sidebar"
            >
              <ChevronRight className="size-4.5" />
            </button>
          ) : (
            <div className="space-y-3">
              {/* Language toggler */}
              <div className="flex items-center justify-between px-1.5 py-1 bg-white rounded-md border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                  <Globe className="size-3" /> LANG
                </span>
                <div className="flex bg-slate-100 rounded p-0.5 text-[9px] font-bold">
                  <button
                    onClick={() => setLanguage("en")}
                    className={cn(
                      "px-1.5 py-0.5 rounded transition-colors",
                      language === "en" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"
                    )}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage("ta")}
                    className={cn(
                      "px-1.5 py-0.5 rounded transition-colors",
                      language === "ta" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"
                    )}
                  >
                    தமிழ்
                  </button>
                </div>
              </div>

              {/* Agent Profile Details Card */}
              <div className="flex items-center gap-2 px-1.5 py-1">
                <div className="size-8 rounded-full bg-slate-900 text-white font-extrabold flex items-center justify-center text-xs">
                  S
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold truncate text-slate-800">Suresh Kumar</h4>
                  <p className="text-[9px] text-slate-400 tracking-wide font-semibold uppercase">
                    Luxury Agent
                  </p>
                </div>
                <button
                  onClick={() => alert("Simulated logout...")}
                  className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                  title="Logout"
                >
                  <LogOut className="size-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Panel Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-20 shrink-0">
          <div className="flex items-center gap-4">
            {collapsed && (
              <button
                onClick={() => setCollapsed(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-50 transition-colors"
              >
                <Menu className="size-5" />
              </button>
            )}

            {/* Breadcrumb Navigation */}
            <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-slate-500">
              <span>Agent Portal</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-800">{language === "en" ? activeItem.label : activeItem.tamilLabel}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification triggers */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-50 transition-colors border border-slate-100"
              >
                <Bell className="size-4.5" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 size-1.5 bg-rose-500 rounded-full" />
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-lg shadow-xl p-3.5 z-50 text-xs"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                        <span className="font-bold text-slate-800">Recent Alerts</span>
                        {notifications.some(n => n.unread) && (
                          <button
                            onClick={handleMarkAllRead}
                            className="text-[9px] text-[#0F172A] font-bold hover:underline"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="space-y-1.5 max-h-52 overflow-y-auto custom-scrollbar">
                        {notifications.map(n => (
                          <div
                            key={n.id}
                            className={cn(
                              "p-2 rounded-md leading-relaxed border transition-colors",
                              n.unread ? "bg-slate-50 border-slate-100 text-slate-800 font-medium" : "text-slate-400 border-transparent"
                            )}
                          >
                            <p>{n.text}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Profile Summary */}
            <div className="flex items-center gap-2 border-l border-slate-100 pl-4">
              <span className="hidden md:inline-block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Suresh Kumar
              </span>
              <div className="size-8 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center font-bold text-white text-xs">
                SK
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Main Body Content */}
        <main className="flex-1 bg-slate-50 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {children}
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(15, 23, 42, 0.08);
          border-radius: 9px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(15, 23, 42, 0.2);
        }
      `}</style>
    </div>
  );
}
