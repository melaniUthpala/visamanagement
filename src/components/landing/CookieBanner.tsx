"use client";

import { useState, useEffect } from "react";
import { Cookie, X, Shield } from "lucide-react";

const STORAGE_KEY = "ro94_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[90] animate-fade-up"
      style={{ borderTop: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--navy-deep))" }}
    >
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <div className="flex items-start gap-3 flex-1">
          <Cookie className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
          <div>
            <p className="text-sm font-semibold mb-0.5" style={{ color: "hsl(var(--foreground))" }}>
              We use cookies 🍪
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
              We use cookies to improve your experience on our site, analyze traffic, and personalize
              content. By continuing, you agree to our{" "}
              <a href="/privacy" className="underline transition-smooth hover:opacity-80" style={{ color: "hsl(var(--primary))" }}>
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-1.5 text-xs mr-2" style={{ color: "hsl(var(--muted-foreground))" }}>
            <Shield className="w-3.5 h-3.5" style={{ color: "hsl(var(--primary))" }} />
            SLBFE Licensed
          </div>

          <button onClick={decline} className="btn-outline text-sm px-4 h-9">
            Decline
          </button>

          <button onClick={accept} className="btn-gold text-sm px-5 h-9">
            Accept All
          </button>

          <button
            onClick={decline}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-smooth hover:bg-white/10"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
