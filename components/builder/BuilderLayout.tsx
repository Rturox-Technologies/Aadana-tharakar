"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Hammer,
  PlusCircle,
  BarChart3,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  Bell,
  Globe,
  LogOut,
  Sparkles
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
  { id: "dashboard", label: "Builder Overview", tamilLabel: "கட்டுமான மேலோட்டம்", icon: LayoutDashboard },
  { id: "projects", label: "My Projects", tamilLabel: "எனது திட்டங்கள்", icon: Hammer },
  { id: "add-project", label: "Add Project", tamilLabel: "புதிய திட்டம் சேர்", icon: PlusCircle },
  { id: "analytics", label: "Project Analytics", tamilLabel: "திட்ட புள்ளிவிவரம்", icon: BarChart3 },
  { id: "subscription", label: "Subscription Plans", tamilLabel: "சந்தா திட்டங்கள்", icon: CreditCard },
  { id: "settings", label: "Portal Settings", tamilLabel: "நுழைவாயில் அமைப்புகள்", icon: Settings },
];

interface BuilderLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

export default function BuilderLayout({ activeTab, setActiveTab, children }: BuilderLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [language, setLanguage] = useState<"en" | "ta">("en");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "DTCP verification approved for 'Kovai Royal Enclave'", unread: true },
    { id: 2, text: "Exclusive Elite subscription plan activated successfully", unread: false },
  ]);

  const activeItem = SIDEBAR_ITEMS.find((item) => item.id === activeTab) || SIDEBAR_ITEMS[0];

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="flex h-screen w-full bg-[#070A13] text-slate-100 overflow-hidden font-sans">
      {/* Collapsible Dark Luxury Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "h-full bg-[#0B0F19] border-r border-slate-800/80 flex flex-col justify-between select-none z-30 shrink-0 relative shadow-xl shadow-black/40"
        )}
      >
        <div>
          {/* Brand Logo Header */}
          <div className="h-20 flex items-center px-4 border-b border-slate-800/60 justify-between">
            <AnimatePresence mode="wait">
              {!collapsed ? (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col"
                >
                  <span className="font-semibold text-[10px] tracking-widest text-[#C9A84C] uppercase flex items-center gap-1">
                    <Sparkles className="size-3 text-[#C9A84C]" /> ஆதனத் தரகர் · Builder
                  </span>
                  <span className="text-base font-black tracking-tight text-white mt-0.5">
                    Aadana Tharakar Construct
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mx-auto text-lg font-extrabold text-[#C9A84C]"
                >
                  நி
                </motion.div>
              )}
            </AnimatePresence>

            {!collapsed && (
              <button
                onClick={() => setCollapsed(true)}
                className="text-slate-500 hover:text-slate-200 p-1.5 rounded-md hover:bg-[#111827] transition-colors"
                title="Collapse Sidebar"
              >
                <ChevronLeft className="size-4.5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-14rem)] custom-scrollbar">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center rounded-lg px-3 py-3 text-xs font-bold transition-all group relative overflow-hidden",
                    isActive
                      ? "bg-[#111827] text-white border border-[#C9A84C]/25 shadow-xs"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/30"
                  )}
                >
                  {/* Left indicator bar on active */}
                  {isActive && (
                    <motion.div
                      layoutId="builderActiveIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#C9A84C]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon
                    className={cn(
                      "size-4 shrink-0 transition-colors",
                      isActive ? "text-[#C9A84C]" : "text-slate-500 group-hover:text-slate-350"
                    )}
                  />
                  {!collapsed && (
                    <div className="ml-3 flex flex-col items-start leading-tight">
                      <span>{language === "en" ? item.label : item.tamilLabel}</span>
                      <span className={cn(
                        "text-[9px] font-normal transition-colors",
                        isActive ? "text-[#C9A84C]/60" : "text-slate-500"
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
        <div className="p-3 border-t border-slate-800/80 bg-[#090D17]">
          {collapsed ? (
            <button
              onClick={() => setCollapsed(false)}
              className="w-full flex justify-center p-2.5 text-slate-500 hover:text-slate-200 hover:bg-[#111827] rounded-lg transition-colors"
              title="Expand Sidebar"
            >
              <ChevronRight className="size-4.5" />
            </button>
          ) : (
            <div className="space-y-3">
              {/* Language toggler */}
              <div className="flex items-center justify-between px-1.5 py-1.5 bg-[#111827] rounded-lg border border-slate-800/60">
                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                  <Globe className="size-3" /> LANG
                </span>
                <div className="flex bg-[#070A13] rounded p-0.5 text-[9px] font-bold">
                  <button
                    onClick={() => setLanguage("en")}
                    className={cn(
                      "px-1.5 py-0.5 rounded transition-colors",
                      language === "en" ? "bg-[#C9A84C] text-[#070A13]" : "text-slate-400 hover:text-white"
                    )}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage("ta")}
                    className={cn(
                      "px-1.5 py-0.5 rounded transition-colors",
                      language === "ta" ? "bg-[#C9A84C] text-[#070A13]" : "text-slate-400 hover:text-white"
                    )}
                  >
                    தமிழ்
                  </button>
                </div>
              </div>

              {/* Builder Profile Card */}
              <div className="flex items-center gap-2 px-1.5 py-1">
                <div className="size-8 rounded bg-[#111827] border border-[#C9A84C]/30 text-white font-extrabold flex items-center justify-center text-xs">
                  C
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-black truncate text-slate-200">Chola Builders</h4>
                  <p className="text-[9px] text-[#C9A84C] tracking-wide font-extrabold uppercase">
                    Elite Developer
                  </p>
                </div>
                <button
                  onClick={() => alert("Simulated builder portal logout...")}
                  className="text-slate-500 hover:text-rose-500 p-1 transition-colors"
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
        <header className="h-20 bg-[#0B0F19] border-b border-slate-800/80 flex items-center justify-between px-6 z-20 shrink-0">
          <div className="flex items-center gap-4">
            {collapsed && (
              <button
                onClick={() => setCollapsed(false)}
                className="text-slate-500 hover:text-slate-200 p-1.5 rounded-md hover:bg-[#111827] transition-colors"
              >
                <Menu className="size-5" />
              </button>
            )}

            {/* Breadcrumb Navigation */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-400">
              <span>Developer Central</span>
              <span className="text-slate-650">/</span>
              <span className="text-white">{language === "en" ? activeItem.label : activeItem.tamilLabel}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification triggers */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-slate-400 hover:text-slate-200 p-2 rounded-full hover:bg-[#111827] transition-colors border border-slate-800/40"
              >
                <Bell className="size-4.5" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 size-1.5 bg-[#C9A84C] rounded-full" />
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
                      className="absolute right-0 mt-2 w-72 bg-[#0B0F19] border border-slate-800 rounded-lg shadow-2xl p-3.5 z-50 text-xs"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                        <span className="font-bold text-slate-200">Municipal Verification Alert</span>
                        {notifications.some(n => n.unread) && (
                          <button
                            onClick={handleMarkAllRead}
                            className="text-[9px] text-[#C9A84C] font-bold hover:underline"
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
                              n.unread ? "bg-slate-900 border-slate-800 text-slate-200 font-medium" : "text-slate-500 border-transparent"
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
            <div className="flex items-center gap-2 border-l border-slate-850 pl-4">
              <span className="hidden md:inline-block text-[10px] font-extrabold text-[#C9A84C] uppercase tracking-widest">
                Chola Builders
              </span>
              <div className="size-8 rounded bg-[#111827] border border-[#C9A84C]/25 flex items-center justify-center font-bold text-white text-xs shadow-xs">
                CB
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Main Body Content */}
        <main className="flex-1 bg-[#070A13] overflow-y-auto p-6 md:p-8 custom-scrollbar">
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
          background: rgba(201, 168, 76, 0.08);
          border-radius: 9px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(201, 168, 76, 0.2);
        }
      `}</style>
    </div>
  );
}
