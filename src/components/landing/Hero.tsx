"use client";

import { useEffect, useRef } from "react";
import { Star, ArrowRight } from "lucide-react";
import { COUNTRIES } from "@/data/landing-site";

export default function Hero() {
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    function onScroll() {
      if (!bgRef.current) return;
      const y = window.scrollY * 0.4;
      bgRef.current.style.transform = `translateY(${y}px)`;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      <img
        ref={bgRef}
        src="/landing/hero-overseas.jpg"
        alt="Sri Lankan professional ready for overseas career"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{ top: "-10%", height: "120%" }}
        width={1920}
        height={1280}
      />

      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

      <div className="container mx-auto relative z-10 py-20">
        <div className="max-w-3xl sr">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold mb-6 sr sr-scale">
            <Star className="w-3 h-3 fill-primary" />
            SLBFE LICENSED · TRUSTED SINCE 2014
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 sr">
            Your Gateway to <span className="text-gradient-gold">Global Careers</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl sr">
            Connecting skilled Sri Lankan professionals with verified overseas employers
            across Romania, the Middle East, Europe & Asia.
          </p>

          <div className="flex flex-wrap gap-4 sr sr-left">
            <a href="#jobs" className="btn-gold h-11 px-8">
              Browse Jobs <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="btn-outline h-11 px-8">
              Get Started
            </a>
          </div>
        </div>

        <div className="mt-16 max-w-4xl sr sr-scale">
          <div className="glass-card p-4 md:p-6">
            <div className="grid md:grid-cols-4 gap-3">
              <input className="input-base bg-background/50" placeholder="Job title or keyword" />

              <select className="input-base bg-background/50">
                <option>All Countries</option>
                {COUNTRIES.map((c) => (
                  <option key={c.n}>{c.n}</option>
                ))}
              </select>

              <select className="input-base bg-background/50">
                <option>All Categories</option>
                <option>Construction</option>
                <option>Hospitality</option>
                <option>Healthcare</option>
                <option>Driving</option>
              </select>

              <button className="btn-gold h-10 px-4">Search Jobs</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
