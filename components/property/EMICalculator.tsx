"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Calculator, Percent, CalendarDays, Coins } from "lucide-react";

interface EMICalculatorProps {
  propertyPrice: number;
}

export const EMICalculator: React.FC<EMICalculatorProps> = ({ propertyPrice }) => {
  // Assume a default downpayment of 20%
  const defaultLoanAmount = Math.round(propertyPrice * 0.8);
  
  const [loanAmount, setLoanAmount] = useState<number>(defaultLoanAmount);
  const [interestRate, setInterestRate] = useState<number>(8.5); // Default interest rate 8.5%
  const [tenureYears, setTenureYears] = useState<number>(20); // Default tenure 20 years
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  useEffect(() => {
    // EMI Calculation Formula
    // P * r * (1+r)^n / ((1+r)^n - 1)
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;

    if (P > 0 && interestRate > 0 && tenureYears > 0) {
      const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPay = emiValue * n;
      const totalInt = totalPay - P;

      setEmi(Math.round(emiValue));
      setTotalPayment(Math.round(totalPay));
      setTotalInterest(Math.round(totalInt));
    } else {
      setEmi(0);
      setTotalPayment(0);
      setTotalInterest(0);
    }
  }, [loanAmount, interestRate, tenureYears]);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    }
    return `₹${price.toLocaleString("en-IN")}`;
  };

  return (
    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden rounded-2xl">
      <CardContent className="p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
          <div className="bg-gold/15 p-2 rounded-lg text-gold">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-navy font-serif">EMI Calculator</h3>
            <p className="text-xs text-slate-400 font-medium">Standard reducing balance estimation</p>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Loan Amount */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Coins className="h-3.5 w-3.5" />
                  Loan Amount
                </Label>
                <span className="text-sm font-bold text-navy">{formatPrice(loanAmount)}</span>
              </div>
              <Input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="h-10 text-xs border-slate-200"
              />
              <Slider
                min={100000}
                max={propertyPrice}
                step={50000}
                value={[loanAmount]}
                onValueChange={(val) => {
                  if (Array.isArray(val)) setLoanAmount(val[0]);
                }}
                className="pt-2"
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Percent className="h-3.5 w-3.5" />
                  Interest Rate (Annual)
                </Label>
                <span className="text-sm font-bold text-navy">{interestRate}%</span>
              </div>
              <Input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="h-10 text-xs border-slate-200"
              />
              <Slider
                min={5}
                max={15}
                step={0.1}
                value={[interestRate]}
                onValueChange={(val) => {
                  if (Array.isArray(val)) setInterestRate(val[0]);
                }}
                className="pt-2"
              />
            </div>

            {/* Tenure in Years */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Loan Tenure (Years)
                </Label>
                <span className="text-sm font-bold text-navy">{tenureYears} Years</span>
              </div>
              <Input
                type="number"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="h-10 text-xs border-slate-200"
              />
              <Slider
                min={1}
                max={30}
                step={1}
                value={[tenureYears]}
                onValueChange={(val) => {
                  if (Array.isArray(val)) setTenureYears(val[0]);
                }}
                className="pt-2"
              />
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="bg-slate-50 rounded-2xl p-6 flex flex-col justify-between border border-slate-100">
            <div className="text-center py-4">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Estimated Monthly EMI</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-gold tracking-tight block mt-2">
                ₹{emi.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="space-y-3.5 border-t border-slate-200 pt-6 mt-4">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-500">Principal Loan Amount</span>
                <span className="font-bold text-navy">₹{loanAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-500">Total Interest Payable</span>
                <span className="font-bold text-navy">₹{totalInterest.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-xs font-medium border-t border-slate-200/60 pt-3">
                <span className="text-slate-600 font-bold">Total Amount Payable</span>
                <span className="font-bold text-gold">₹{totalPayment.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

        </div>

      </CardContent>
    </Card>
  );
};
