"use client";

import { useEffect } from "react";

/**
 * useScrollReveal
 * Adds "sr-visible" class to elements with "sr" class when they enter viewport.
 * Call once at the top of the landing page.
 */
export default function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const siblings = entry.target.parentElement?.querySelectorAll(".sr") || [];
            const idx = Array.from(siblings).indexOf(entry.target);
            const delay = Math.min(idx * 80, 400);

            setTimeout(() => {
              entry.target.classList.add("sr-visible");
            }, delay);

            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const observe = () => {
      document.querySelectorAll(".sr:not(.sr-visible)").forEach((el) => obs.observe(el));
    };

    observe();

    const mut = new MutationObserver(observe);
    mut.observe(document.body, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
      mut.disconnect();
    };
  }, []);
}
