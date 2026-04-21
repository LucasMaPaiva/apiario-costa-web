import React from 'react';
import Navbar from "../common/components/ui/Navbar";
import Footer from "../common/components/ui/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-brand-white min-h-screen selection:bg-brand-mel/30 selection:text-brand-wine">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
