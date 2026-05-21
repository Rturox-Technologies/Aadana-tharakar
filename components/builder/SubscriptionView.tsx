"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  CreditCard,
  Check,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Lock,
  Sparkles,
  RefreshCw,
  PhoneCall
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Plan {
  id: string;
  name: string;
  price: string;
  numericPrice: number;
  period: string;
  color: string;
  badge: string;
  features: string[];
}

const PLANS: Plan[] = [
  {
    id: "silver",
    name: "Silver Developer",
    price: "₹9,999",
    numericPrice: 9999,
    period: "monthly",
    color: "#64748b",
    badge: "Basic Plan",
    features: [
      "Upload up to 3 gated projects",
      "Standard portal search visibility",
      "50 direct leads/month",
      "Bilingual WhatsApp greetings",
      "Patta & RERA basic compliance check"
    ]
  },
  {
    id: "gold",
    name: "Gold Enterprise",
    price: "₹24,999",
    numericPrice: 24999,
    period: "monthly",
    color: "#C9A84C",
    badge: "Most Popular",
    features: [
      "Upload up to 10 gated projects",
      "Featured placement in city search results",
      "250 direct leads/month",
      "Direct agent portfolio mapping",
      "Dedicated developer badge on listings",
      "Priority DTCP verification clearance"
    ]
  },
  {
    id: "elite",
    name: "Exclusive Elite Developer",
    price: "₹49,999",
    numericPrice: 49999,
    period: "monthly",
    color: "#a855f7",
    badge: "Maximum Value",
    features: [
      "Unlimited gated project uploads",
      "Top-tier pinned search visibility statewide",
      "Unlimited leads with automatic direct dialing",
      "Dedicated account manager",
      "Direct API access to lead CRM exports",
      "24-Hour CMDA/DTCP legal auditing",
      "Exclusive featured newsletter blasts"
    ]
  }
];

export default function SubscriptionView() {
  const [activePlan, setActivePlan] = useState<string>("gold"); // User's simulated active plan
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<Plan | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Razorpay payment inputs mock
  const [cardNumber, setCardNumber] = useState("4111 2222 3333 4444");
  const [expiry, setExpiry] = useState("12/28");
  const [cvv, setCvv] = useState("123");
  const [holderName, setHolderName] = useState("CHOLA BUILDERS PVT LTD");

  const triggerRazorpayCheckout = (plan: Plan) => {
    setSelectedPlanForPayment(plan);
    setPaymentSuccess(false);
    setIsPaying(false);
  };

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaying(true);
    // Simulate Razorpay secure 3DS OTP validation
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setActivePlan(selectedPlanForPayment?.id || "gold");
        setSelectedPlanForPayment(null);
        alert(`Success: Plan updated to ${selectedPlanForPayment?.name}! Razorpay Payment ID: pay_LnkX984372`);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="space-y-6 text-slate-100 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <CreditCard className="size-5.5 text-[#C9A84C]" /> Subscription Package Manager
          </h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            Select a developer package to boost gated community visibility, unlock direct buyer CRM leads, and expedite DTCP approvals.
          </p>
        </div>
      </div>

      {/* Subscription Active Badge summary */}
      <Card className="bg-[#0B0F19] border-slate-800 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] flex items-center justify-center shrink-0">
            <Zap className="size-5" />
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Current Gated Subscription Tier</span>
            <h4 className="text-base font-black text-white flex items-center gap-2">
              {PLANS.find(p => p.id === activePlan)?.name}{" "}
              <Badge className="bg-[#C9A84C] text-[#070A13] font-extrabold text-[8px] uppercase tracking-wider border-none">
                Active Tier
              </Badge>
            </h4>
          </div>
        </div>
        <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
          <RefreshCw className="size-3 text-[#C9A84C] shrink-0 animate-spin" /> Next Renewal Date: 20-Jun-2026
        </div>
      </Card>

      {/* Pricing Plan Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {PLANS.map((plan) => {
          const isActive = activePlan === plan.id;

          return (
            <Card
              key={plan.id}
              className={`bg-[#0B0F19] border-slate-800 shadow-md p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-slate-700/80 ${
                isActive ? "border-[#C9A84C]/60 shadow-lg shadow-[#C9A84C]/5 scale-101" : ""
              }`}
            >
              {/* Highlight ribbon for active */}
              {isActive && (
                <div className="absolute top-0 right-0 bg-[#C9A84C] text-[#070A13] font-black text-[8px] uppercase tracking-widest px-3 py-1 rounded-bl">
                  Active
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">{plan.badge}</span>
                  <h3 className="text-base font-black text-white mt-1">{plan.name}</h3>
                </div>

                <div className="flex items-baseline gap-1 py-2">
                  <span className="text-3xl font-black text-white font-mono">{plan.price}</span>
                  <span className="text-[10px] font-semibold text-slate-500">/ {plan.period}</span>
                </div>

                {/* Features list */}
                <div className="space-y-2.5 pt-2 border-t border-slate-850">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-350 leading-relaxed font-semibold">
                      <Check className="size-4 text-[#C9A84C] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                {isActive ? (
                  <Button
                    disabled
                    className="w-full bg-[#111827] text-slate-500 border border-slate-800 text-xs font-bold py-2.5 cursor-not-allowed"
                  >
                    Current Tier Active
                  </Button>
                ) : (
                  <Button
                    onClick={() => triggerRazorpayCheckout(plan)}
                    className="w-full bg-slate-100 hover:bg-white text-slate-900 text-xs font-black py-2.5 flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    Upgrade Tier now <Zap className="size-3.5 fill-current" />
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* RAZORPAY CHECKOUT OVERLAY MODAL */}
      <AnimatePresence>
        {selectedPlanForPayment && (
          <>
            {/* Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlanForPayment(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            >
              {/* Razorpay Premium Modal Card */}
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-[#0F172A] border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between text-slate-100 font-sans"
              >
                {/* Razorpay Banner Header */}
                <div className="bg-[#1A253C] p-4 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded bg-[#2B6CB0] flex items-center justify-center font-black text-[10px] text-white">
                      R
                    </div>
                    <div>
                      <h4 className="text-xs font-black tracking-wide text-white">Razorpay Secure</h4>
                      <p className="text-[8px] text-slate-400 font-mono">Order: ord_Lnk{selectedPlanForPayment.id.slice(0, 3)}{Math.floor(Math.random() * 10000)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Amount</span>
                    <span className="font-mono text-sm font-black text-white">{selectedPlanForPayment.price}</span>
                  </div>
                </div>

                {/* Body details form */}
                <div className="p-6">
                  {paymentSuccess ? (
                    <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
                      <div className="size-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                        <ShieldCheck className="size-8" />
                      </div>
                      <div>
                        <h4 className="font-black text-base text-white">Payment Authorized Successfully</h4>
                        <p className="text-[10px] text-slate-400 mt-1">
                          Securely synced with the Aadana Tharakar Verification Board. Loading...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handlePayNow} className="space-y-4">
                      {/* Secure warning info */}
                      <div className="p-3 bg-[#1A253C]/40 border border-blue-500/20 rounded-lg flex items-center gap-2">
                        <Lock className="size-4 text-blue-400 shrink-0" />
                        <p className="text-[9px] text-slate-350 leading-relaxed font-semibold">
                          Secured by 256-bit bank-grade encryption. Test environment simulation.
                        </p>
                      </div>

                      {/* Card Details Input */}
                      <div className="space-y-3.5 text-xs">
                        <div className="space-y-1">
                          <Label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Cardholder Name</Label>
                          <Input
                            value={holderName}
                            onChange={(e) => setHolderName(e.target.value)}
                            required
                            className="bg-[#070A13] border-slate-800 text-xs text-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <Label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Card Number</Label>
                          <div className="relative">
                            <Input
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              required
                              className="bg-[#070A13] border-slate-800 text-xs text-white font-mono"
                            />
                            <CreditCard className="size-4 text-slate-500 absolute top-2.5 right-3" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Card Expiry</Label>
                            <Input
                              value={expiry}
                              onChange={(e) => setExpiry(e.target.value)}
                              required
                              placeholder="MM/YY"
                              className="bg-[#070A13] border-slate-800 text-xs text-white font-mono"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Secure CVV</Label>
                            <Input
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              required
                              type="password"
                              maxLength={3}
                              className="bg-[#070A13] border-slate-800 text-xs text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          disabled={isPaying}
                          className="w-full bg-[#3399FF] hover:bg-[#2288EE] text-white text-xs font-black py-2.5 flex items-center justify-center gap-1.5 transition-all shadow-sm"
                        >
                          {isPaying ? (
                            <>
                              <RefreshCw className="size-4 animate-spin" /> Verifying Credentials...
                            </>
                          ) : (
                            <>
                              Authorize Payment of {selectedPlanForPayment.price} <Lock className="size-3.5" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Footer brand secure */}
                <div className="p-4 border-t border-slate-800 text-center text-[8px] text-slate-500 font-bold uppercase tracking-widest bg-[#1A253C]/20 flex items-center justify-center gap-1">
                  <ShieldCheck className="size-3 text-[#3399FF]" /> Secured by Razorpay API v2
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
