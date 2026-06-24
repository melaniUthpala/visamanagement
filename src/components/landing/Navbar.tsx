"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import { NAV } from "@/data/landing-site";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("ro94-theme");
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  useEffect(() => {
    const root = document.querySelector(".ro94-landing");
    if (!root) return;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("ro94-theme", theme);
  }, [theme]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
      const offset = 100;
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((sec) => {
        const el = sec as HTMLElement;
        const top = el.offsetTop - offset;
        const bottom = top + el.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bottom) {
          setActive(el.id);
        }
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-smooth ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-card" : "bg-background/60 backdrop-blur-sm"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between py-4">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-gold opacity-30 blur-md group-hover:opacity-60 transition-smooth" />
            <img
              src="/landing/ro94-logo.png"
              alt="RO94 Holdings"
              className="relative w-16 h-16 object-contain drop-shadow-[0_2px_8px_hsl(45_90%_55%/0.45)]"
            />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-lg tracking-[0.2em] text-gradient-gold">RO94</div>
            <div className="text-[10px] text-muted-foreground tracking-[0.3em]">HOLDINGS PVT LTD</div>
          </div>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => {
            const id = n.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={n.href}>
                <a
                  href={n.href}
                  className={`text-sm font-medium transition-smooth relative pb-1 ${
                    isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {n.label}
                  <span
                    className="absolute bottom-0 left-0 h-0.5 rounded-full transition-smooth"
                    style={{
                      background: "var(--gradient-gold)",
                      width: isActive ? "100%" : "0%",
                    }}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-smooth hover:bg-primary/10"
            style={{ border: "1px solid hsl(var(--border))", color: "hsl(var(--primary))" }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link href="/login" className="hidden sm:inline-flex btn-outline h-10 px-4 text-sm">
            Client Login
          </Link>

          <a href="#contact" className="hidden sm:inline-flex btn-gold h-10 px-4 text-sm">
            Apply Now <ArrowRight className="w-4 h-4" />
          </a>

          <button onClick={() => setNavOpen(!navOpen)} className="lg:hidden p-2" aria-label="Menu">
            {navOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {navOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <ul className="container mx-auto py-4 space-y-3">
            {NAV.map((n) => {
              const id = n.href.replace("#", "");
              return (
                <li key={n.href}>
                  <a
                    onClick={() => setNavOpen(false)}
                    href={n.href}
                    className={`block py-2 transition-smooth ${
                      active === id ? "text-primary font-semibold" : "text-foreground/80 hover:text-primary"
                    }`}
                  >
                    {n.label}
                  </a>
                </li>
              );
            })}
            <li>
              <Link href="/login" onClick={() => setNavOpen(false)} className="block py-2 text-primary font-semibold">
                Client Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
