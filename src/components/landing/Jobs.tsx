"use client";

import { useState } from "react";
import { Briefcase, Clock, GraduationCap } from "lucide-react";
import { JOBS, type Job } from "@/data/landing-site";

const FILTERS = ["All", "Romania", "UAE", "Qatar", "Saudi Arabia", "Malaysia", "Japan"];

export default function Jobs() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? JOBS : JOBS.filter((j) => j.c === filter);

  /* Send them straight to the real Apply / Create Account form in
     the Contact section instead of a separate WhatsApp-only modal. */
  function handleApply(job: Job) {
    try {
      sessionStorage.setItem("ro94_intended_job", `${job.t} — ${job.c}`);
    } catch {
      /* ignore */
    }
    document.getElementById("contact")?.scrollIntoView({ behavior: "auto", block: "start" });
  }

  return (
    <section id="jobs" className="py-24 bg-secondary/30">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8 sr">
          <div>
            <div className="text-primary text-sm font-semibold tracking-widest mb-3">CURRENT OPENINGS</div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Recent <span className="text-gradient-gold">Job Openings</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">{filtered.length}</span> jobs available
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 sr sr-scale">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-smooth ${
                filter === f
                  ? "bg-gradient-gold text-primary-foreground shadow-gold"
                  : "border border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.length === 0 ? (
            <div className="col-span-4 text-center py-16 text-muted-foreground sr">
              No jobs found for <strong>{filter}</strong> yet. Check back soon!
            </div>
          ) : (
            filtered.map((j) => (
              <div
                key={j.t}
                className="group card-base overflow-hidden hover:border-primary/40 transition-smooth hover:-translate-y-1 sr sr-scale"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src="/landing/romania.jpg"
                    alt={j.c}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                    width={1280}
                    height={800}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold">
                    {j.c}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-smooth">{j.t}</h3>

                  <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-primary" />
                      Salary: {j.s}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      2 Year Contract
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-primary" />
                      {j.exp}
                    </div>
                  </div>

                  <button onClick={() => handleApply(j)} className="btn-gold h-9 px-3 text-sm w-full">
                    Apply Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}