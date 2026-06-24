"use client";

import "@/styles/ro94-landing.css";

import useScrollReveal from "@/hooks/useScrollReveal";

import LoadingScreen from "@/components/landing/LoadingScreen";
import TopBar from "@/components/landing/TopBar";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";
import Countries from "@/components/landing/Countries";
import Jobs from "@/components/landing/Jobs";
import Gallery from "@/components/landing/Gallery";
import Process from "@/components/landing/Process";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import ScrollToTop from "@/components/landing/ScrollToTop";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import CookieBanner from "@/components/landing/CookieBanner";

export default function Home() {
  useScrollReveal();

  return (
    <div className="ro94-landing">
      <LoadingScreen />
      <TopBar />
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Countries />
      <Jobs />
      <Gallery />
      <Process />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />

      <ScrollToTop />
      <WhatsAppButton />
      <CookieBanner />
    </div>
  );
}