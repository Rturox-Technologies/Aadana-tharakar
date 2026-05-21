"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Building,
  Users,
  Briefcase,
  Layers,
  CreditCard,
  FileText,
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight,
  Bell,
  Globe,
  User,
  LogOut,
  Sparkles,
  Search,
  MessageSquare
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
  { id: "dashboard", label: "Dashboard", tamilLabel: "கட்டுப்பாட்டகம்", icon: LayoutDashboard },
  { id: "properties", label: "Properties", tamilLabel: "சொத்துக்கள்", icon: Building },
  { id: "leads", label: "Leads CRM", tamilLabel: "வாடிக்கையாளர் CRM", icon: MessageSquare },
  { id: "users", label: "Users", tamilLabel: "பயனர்கள்", icon: Users },
  { id: "agents", label: "Agents", tamilLabel: "முகவர்கள்", icon: Briefcase },
  { id: "builders", label: "Builders", tamilLabel: "கட்டுமானர்கள்", icon: Layers },
  { id: "subscriptions", label: "Subscriptions", tamilLabel: "சந்தாக்கள்", icon: Sparkles },
  { id: "payments", label: "Payments", tamilLabel: "பணப்பரிமாற்றம்", icon: CreditCard },
  { id: "blog", label: "Blog", tamilLabel: "வலைப்பதிவு", icon: FileText },
  { id: "settings", label: "Settings", tamilLabel: "அமைப்புகள்", icon: Settings },
];

interface AdminLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

export default function AdminLayout({ activeTab, setActiveTab, children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [language, setLanguage] = useState<"en" | "ta">("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New high-value lead for Chennai Villa", unread: true },
    { id: 2, text: "Property #p7 pending DTCP review", unread: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const activeItem = SIDEBAR_ITEMS.find((item) => item.id === activeTab) || SIDEBAR_ITEMS[0];

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const getBreadcrumbs = () => {
    return [
      { label: "Admin", href: "#" },
      { label: language === "en" ? activeItem.label : activeItem.tamilLabel, href: "#" }
    ];
  };

  return (
    <div className="flex h-screen w-full bg-[#0A0F1E] text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "h-full bg-[#070B16] border-r border-[#C9A84C]/10 flex flex-col justify-between select-none z-30 shrink-0 relative"
        )}
      >
        <div>
          {/* Logo / Brand Header */}
          <div className="h-20 flex items-center px-4 border-b border-[#C9A84C]/10 overflow-hidden justify-between">
            <AnimatePresence mode="wait">
              {!collapsed ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col"
                >
                  <span className="font-semibold text-xs tracking-widest text-[#C9A84C] uppercase">
                    ஆதனத் தரகர்
                  </span>
                  <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-[#C9A84C] to-[#f4efc3] bg-clip-text text-transparent">
                    Aadana Tharakar
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mx-auto text-xl font-extrabold text-[#C9A84C]"
                >
                  ந
                </motion.div>
              )}
            </AnimatePresence>

            {!collapsed && (
              <button
                onClick={() => setCollapsed(true)}
                className="text-slate-400 hover:text-[#C9A84C] p-1.5 rounded-md hover:bg-slate-900/50 transition-colors"
                title="Collapse Sidebar"
              >
                <ChevronLeft className="size-5" />
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
                    "w-full flex items-center rounded-lg px-3.5 py-3 text-sm font-medium transition-all group relative overflow-hidden",
                    isActive
                      ? "bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/25"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/40 border border-transparent"
                  )}
                >
                  {/* Active highlight bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#C9A84C]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon
                    className={cn(
                      "size-5 shrink-0 transition-colors",
                      isActive ? "text-[#C9A84C]" : "text-slate-400 group-hover:text-slate-200"
                    )}
                  />
                  {!collapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-3.5 flex flex-col items-start leading-tight"
                    >
                      <span>{language === "en" ? item.label : item.tamilLabel}</span>
                      <span className="text-[10px] text-slate-500 font-normal">
                        {language === "en" ? item.tamilLabel : item.label}
                      </span>
                    </motion.div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-3 border-t border-[#C9A84C]/10 bg-[#050810]/80">
          {collapsed ? (
            <button
              onClick={() => setCollapsed(false)}
              className="w-full flex justify-center p-3 text-slate-400 hover:text-[#C9A84C] hover:bg-slate-900/50 rounded-lg transition-colors"
              title="Expand Sidebar"
            >
              <ChevronRight className="size-5" />
            </button>
          ) : (
            <div className="space-y-3">
              {/* Language Switcher */}
              <div className="flex items-center justify-between px-2 bg-slate-950/60 rounded-md p-1.5 border border-slate-800">
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <Globe className="size-3.5" /> Language
                </span>
                <div className="flex bg-slate-900 rounded p-0.5 text-xs">
                  <button
                    onClick={() => setLanguage("en")}
                    className={cn(
                      "px-2 py-0.5 rounded font-medium transition-colors",
                      language === "en" ? "bg-[#C9A84C] text-[#0A0F1E]" : "text-slate-400 hover:text-slate-200"
                    )}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage("ta")}
                    className={cn(
                      "px-2 py-0.5 rounded font-medium transition-colors",
                      language === "ta" ? "bg-[#C9A84C] text-[#0A0F1E]" : "text-slate-400 hover:text-slate-200"
                    )}
                  >
                    தமிழ்
                  </button>
                </div>
              </div>

              {/* Admin profile detail */}
              <div className="flex items-center gap-3 px-2 py-1.5">
                <div className="size-9 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/35 flex items-center justify-center font-bold text-[#C9A84C]">
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate text-slate-200">Arun Kumar</h4>
                  <p className="text-[10px] text-[#C9A84C] tracking-wide font-medium uppercase">
                    Super Admin
                  </p>
                </div>
                <button
                  onClick={() => alert("Logout action simulated. In production, this clears security context.")}
                  className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                  title="Logout"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-20 bg-[#070B16] border-b border-[#C9A84C]/10 flex items-center justify-between px-6 z-20 shrink-0">
          {/* Left: Breadcrumbs & Toggle button for mobile */}
          <div className="flex items-center gap-4">
            {collapsed && (
              <button
                onClick={() => setCollapsed(false)}
                className="text-slate-400 hover:text-[#C9A84C] p-1.5 rounded-md hover:bg-slate-900/50 transition-colors"
              >
                <Menu className="size-5" />
              </button>
            )}

            {/* Breadcrumbs */}
            <div className="hidden sm:flex items-center gap-1.5 text-sm">
              {getBreadcrumbs().map((b, idx, arr) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-slate-600">/</span>}
                  <span
                    className={cn(
                      idx === arr.length - 1
                        ? "font-semibold text-slate-100"
                        : "text-slate-500 hover:text-slate-300 transition-colors"
                    )}
                  >
                    {b.label}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right: Search, Notifications, Admin avatar */}
          <div className="flex items-center gap-4">
            {/* Simulation Search bar */}
            <div className="relative hidden md:block w-64">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Search className="size-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search CRM, Properties..."
                className="w-full bg-slate-950/80 border border-[#C9A84C]/10 focus:border-[#C9A84C]/45 rounded-full py-1.5 pl-10 pr-4 text-xs font-medium outline-none text-slate-200 placeholder-slate-500 focus:ring-1 focus:ring-[#C9A84C]/20 transition-all"
              />
            </div>

            {/* Notification Drawer Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-slate-400 hover:text-slate-100 p-2 rounded-full hover:bg-slate-900/50 transition-colors border border-transparent hover:border-[#C9A84C]/10"
              >
                <Bell className="size-5" />
                {notifications.some((n) => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 size-2 bg-rose-500 rounded-full ring-2 ring-[#070B16]" />
                )}
              </button>

              {/* Notification Popup Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowNotifications(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-80 bg-[#111827] border border-[#C9A84C]/20 rounded-xl shadow-2xl p-4 z-50 overflow-hidden"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                        <span className="font-semibold text-sm text-[#C9A84C]">Notifications</span>
                        {notifications.some(n => n.unread) && (
                          <button
                            onClick={handleMarkAllRead}
                            className="text-[10px] text-slate-400 hover:text-[#C9A84C] underline transition-colors"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                        {notifications.map((n) => (
                          <div
                            key={n.id}
                            className={cn(
                              "p-2.5 rounded-lg text-xs leading-relaxed transition-all",
                              n.unread ? "bg-[#C9A84C]/5 border border-[#C9A84C]/10 text-slate-100" : "bg-slate-900/40 text-slate-400"
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

            {/* Quick Profile Badge */}
            <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
              <span className="hidden md:inline-block text-xs font-semibold text-slate-400">
                Super Admin
              </span>
              <div className="size-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                <User className="size-4 text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 bg-[#0A0F1E] overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {children}
        </main>
      </div>

      {/* Embedded CSS styles for custom scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(201, 168, 76, 0.15);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(201, 168, 76, 0.35);
        }
      `}</style>
    </div>
  );
}
