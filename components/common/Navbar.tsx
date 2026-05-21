"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-navy/80 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="text-2xl font-semibold text-[#C9A84C] tracking-wider flex items-center gap-2">
          <span>ஆதனத் தரகர்</span>
          <span className="text-white/55 text-sm font-normal">·</span>
          <span>Aadana Tharakar</span>
        </Link>
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/properties" className="hover:text-gold transition-colors font-medium">Properties</Link>
          <Link href="/agents" className="hover:text-gold transition-colors font-medium">Agents</Link>
          <Link href="/blog" className="hover:text-gold transition-colors font-medium">Blog</Link>
          <Link href="/about" className="hover:text-gold transition-colors font-medium">About</Link>
          <div className="flex items-center space-x-2 ml-4">
            <Button variant="ghost" className="hover:text-gold">EN</Button>
            <span className="text-white/30">|</span>
            <Button variant="ghost" className="hover:text-gold">தமிழ்</Button>
          </div>
          <Link href="/login">
            <Button variant="outline" className="ml-4 border-[#C9A84C]/50 text-[#C9A84C] hover:bg-[#C9A84C]/10 hover:text-[#C9A84C]">Login</Button>
          </Link>
          <Link href="/login?register=true">
            <Button variant="default" className="ml-2 bg-[#C9A84C] hover:bg-[#C9A84C]/90 text-[#0A0F1E] font-semibold">Register</Button>
          </Link>
        </div>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-white/10"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy/95 backdrop-blur-md border-t border-white/10 px-4 py-4 space-y-4">
          <Link href="/properties" className="block hover:text-gold py-1" onClick={() => setMobileOpen(false)}>
            Properties
          </Link>
          <Link href="/agents" className="block hover:text-gold py-1" onClick={() => setMobileOpen(false)}>
            Agents
          </Link>
          <Link href="/blog" className="block hover:text-gold py-1" onClick={() => setMobileOpen(false)}>
            Blog
          </Link>
          <Link href="/about" className="block hover:text-gold py-1" onClick={() => setMobileOpen(false)}>
            About
          </Link>
          <div className="flex space-x-2 border-t border-white/5 pt-3">
            <Button variant="ghost" className="text-sm px-3 hover:text-gold">EN</Button>
            <Button variant="ghost" className="text-sm px-3 hover:text-gold">தமிழ்</Button>
          </div>
          <div className="flex space-x-2 pt-2">
            <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full border-[#C9A84C]/50 text-[#C9A84C]">Login</Button>
            </Link>
            <Link href="/login?register=true" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button variant="default" className="w-full bg-[#C9A84C] hover:bg-[#C9A84C]/90 text-[#0A0F1E] font-semibold">Register</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
