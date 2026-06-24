"use client";

import { useState, useEffect, useRef } from "react";

const STATS = [
  { num: 5000, suffix: "+", label: "Workers Placed", decimals: 0 },
  { num: 15, suffix: "+", label: "Countries", decimals: 0 },
  { num: 98, suffix: "%", label: "Visa Success", decimals: 0 },
  { num: 10, suffix: "+", label: "Years Experience", decimals: 0 },
];

function Counter({ num, suffix, decimals = 0 }: { num: number; suffix: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;

          const duration = 2000;
          const steps = 60;
          const interval = duration / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += 1;
            const progress = current / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(parseFloat((eased * num).toFixed(decimals)));

            if (current >= steps) {
              setCount(num);
              clearInterval(timer);
            }
          }, interval);

          if (ref.current) obs.unobserve(ref.current);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [num, decimals]);

  const formatted = count >= 1000 ? count.toLocaleString("en-US", { maximumFractionDigits: decimals }) : count.toFixed(decimals);

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-16 border-y border-border bg-secondary/30">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s) => (
          <div key={s.label} className="text-center sr sr-scale">
            <div className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
              <Counter num={s.num} suffix={s.suffix} decimals={s.decimals} />
            </div>
            <div className="text-sm text-muted-foreground tracking-wide uppercase">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
