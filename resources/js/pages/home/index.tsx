import React from 'react';
import Hero from "../../modules/home/components/Hero";
import About from "../../modules/home/components/About";
import Products from "../../modules/home/components/Products";
import Features from "../../modules/home/components/Features";
import VisualShowcase from "../../modules/home/components/VisualShowcase";
import ContactCTA from "../../modules/home/components/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Products />
      <Features />
      <VisualShowcase />
      <ContactCTA />
    </>
  );
}
