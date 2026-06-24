"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1800);
    const hideTimer = setTimeout(() => setVisible(false), 2400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500"
      style={{
        background: "hsl(var(--navy-deep))",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "all",
      }}
    >
      <div className="mb-6 sr sr-scale" style={{ animation: "ls-pulse 1.2s ease-in-out infinite" }}>
        <img
          src="/landing/ro94-logo.png"
          alt="RO94 Holdings"
          className="w-40 h-40 object-contain drop-shadow-[0_0_30px_hsl(45_90%_55%/0.6)]"
        />
      </div>

      <div className="text-2xl font-bold tracking-widest mb-1 sr" style={{ color: "hsl(var(--foreground))" }}>
        RO94 HOLDINGS
      </div>

      <div className="text-xs tracking-[0.3em] mb-8 sr" style={{ color: "hsl(var(--muted-foreground))" }}>
        TRUSTED SINCE 2014
      </div>

      <div className="w-48 h-0.5 rounded-full overflow-hidden sr sr-scale" style={{ background: "hsl(var(--border))" }}>
        <div
          className="h-full rounded-full"
          style={{ background: "var(--gradient-gold)", animation: "ls-bar 1.8s ease-out forwards" }}
        />
      </div>

      <style>{`
        @keyframes ls-pulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 12px hsl(45 90% 55% / 0.4)); }
          50% { transform: scale(1.06); filter: drop-shadow(0 0 30px hsl(45 90% 55% / 0.8)); }
        }
        @keyframes ls-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
