"use client";

import { useState } from "react";
import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#0A0F1E]">
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-4">Get in Touch</p>
        <h1 className="text-5xl font-bold text-white mb-4">Contact <span className="text-[#C9A84C]">Aadana Tharakar</span></h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Have a question about a property or our services? Our team is here to help — in Tamil or English.
        </p>
      </section>

      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-8">We&apos;re Here to Help</h2>
            {[
              { icon: Phone, label: "Phone / WhatsApp", value: "+91 98765 43210", sub: "Mon – Sat, 9am – 7pm IST" },
              { icon: Mail, label: "Email", value: "support@nilaamnai.com", sub: "We reply within 4 hours" },
              { icon: MapPin, label: "Office", value: "Anna Salai, Chennai – 600002", sub: "Tamil Nadu, India" },
              { icon: Clock, label: "Working Hours", value: "9:00 AM – 7:00 PM", sub: "Monday to Saturday" },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="flex gap-4 p-5 bg-[#111827] border border-white/5 rounded-xl hover:border-[#C9A84C]/20 transition-colors">
                <div className="w-12 h-12 bg-[#C9A84C]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="text-[#C9A84C]" size={20} />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">{label}</p>
                  <p className="text-white font-semibold">{value}</p>
                  <p className="text-slate-400 text-sm">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-[#111827] border border-white/5 rounded-2xl p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <CheckCircle className="text-green-400 mb-4" size={60} />
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400">Our team will get back to you within 4 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare size={20} className="text-[#C9A84C]" /> Send a Message
                </h3>
                {[
                  { id: "name", label: "Your Name", type: "text", placeholder: "Arjun Kumar" },
                  { id: "email", label: "Email Address", type: "email", placeholder: "arjun@gmail.com" },
                  { id: "phone", label: "Phone Number", type: "tel", placeholder: "9876543210" },
                  { id: "subject", label: "Subject", type: "text", placeholder: "Property inquiry — 3BHK in Chennai" },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label className="text-slate-400 text-sm block mb-1.5">{label}</label>
                    <input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      value={form[id as keyof typeof form]}
                      onChange={(e) => setForm(f => ({ ...f, [id]: e.target.value }))}
                      required
                      className="w-full bg-[#0A0F1E] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-slate-400 text-sm block mb-1.5">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                    required
                    className="w-full bg-[#0A0F1E] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#C9A84C]/50 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#C9A84C] to-[#E5C87A] text-[#0A0F1E] font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
