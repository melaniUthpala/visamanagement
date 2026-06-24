"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/data/landing-site";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 sr">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12 sr sr-scale">
          <div className="text-primary text-sm font-semibold tracking-widest mb-3">FAQ</div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="card-base px-6 sr sr-left">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left font-medium"
                >
                  <span>{f.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && <div className="pb-4 text-muted-foreground text-sm">{f.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
