import React from "react";
import { Navbar } from "@/components/common/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-navy font-sans antialiased selection:bg-gold/30">
      <Navbar />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
