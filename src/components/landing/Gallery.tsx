"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

/* Replace these with your own photos in /public/landing/ if you'd like */
const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600", caption: "Our Office" },
  { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600", caption: "Team Meeting" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600", caption: "Our Team" },
  { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600", caption: "Job Placement" },
  { src: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600", caption: "Our Office Space" },
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600", caption: "Pre-Departure Orientation" },
  { src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600", caption: "Workers Abroad" },
  { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600", caption: "Success Stories" },
];

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const prev = useCallback(() => setActive((i) => ((i ?? 0) - 1 + PHOTOS.length) % PHOTOS.length), []);
  const next = useCallback(() => setActive((i) => ((i ?? 0) + 1) % PHOTOS.length), []);

  useEffect(() => {
    if (active === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, prev, next]);

  return (
    <>
      <section id="gallery" className="py-24 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 sr">
            <div className="text-primary text-sm font-semibold tracking-widest mb-3">GALLERY</div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Our <span className="text-gradient-gold">Story</span> in Pictures
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PHOTOS.map((p, i) => (
              <div
                key={i}
                className="sr sr-scale group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer card-base"
                onClick={() => setActive(i)}
              >
                <img
                  src={p.src}
                  alt={p.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex flex-col items-center justify-center gap-2">
                  <ZoomIn className="w-8 h-8 text-primary" />
                  <p className="text-xs text-white font-medium text-center px-3">{p.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.93)" }}
          onClick={() => setActive(null)}
        >
          <div className="relative flex flex-col items-center max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActive(null)}
              className="fixed top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center transition-smooth hover:bg-white/20 z-10"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={prev}
              className="fixed left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-smooth z-10"
              style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#fff", background: "rgba(255,255,255,0.08)" }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              key={active}
              src={PHOTOS[active].src}
              alt={PHOTOS[active].caption}
              className="max-w-[85vw] max-h-[75vh] object-contain rounded-lg animate-fade-up sr sr-scale"
              style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.7)" }}
            />

            <button
              onClick={next}
              className="fixed right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-smooth z-10"
              style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#fff", background: "rgba(255,255,255,0.08)" }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex items-center justify-between w-full mt-4 px-1">
              <p className="text-sm text-white/70">{PHOTOS[active].caption}</p>
              <span className="text-sm font-semibold" style={{ color: "hsl(var(--primary))" }}>
                {active + 1} / {PHOTOS.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
