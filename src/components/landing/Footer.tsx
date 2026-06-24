import { NAV, SERVICES } from "@/data/landing-site";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 sr" style={{ backgroundColor: "hsl(var(--navy-deep))" }}>
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="sr sr-left">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/landing/ro94-logo.png"
                alt="RO94 Holdings"
                className="w-12 h-12 object-contain drop-shadow-[0_2px_10px_hsl(45_90%_55%/0.5)]"
              />
              <div>
                <div className="font-bold tracking-[0.2em] text-gradient-gold">RO94</div>
                <div className="text-[10px] text-muted-foreground tracking-[0.25em]">HOLDINGS</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Trusted gateway to global careers. Connecting Sri Lankan talent with the world since 2014.
            </p>
          </div>

          <div className="sr sr-scale">
            <h4 className="font-bold mb-4 text-sm tracking-widest">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-primary transition-smooth">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sr sr-scale">
            <h4 className="font-bold mb-4 text-sm tracking-widest">SERVICES</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {SERVICES.map((s) => (
                <li key={s.t}>{s.t}</li>
              ))}
            </ul>
          </div>

          <div className="sr sr-right">
            <h4 className="font-bold mb-4 text-sm tracking-widest">CONTACT</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>+94 77 917 9000</li>
              <li>info@ro94.lk</li>
              <li>Colombo, Sri Lanka</li>
              <li className="text-primary">SLBFE Licensed</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-wrap justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} RO94 Holdings Pvt Ltd. All rights reserved.</div>
          <div>Crafted with care for Sri Lankan workers.</div>
        </div>
      </div>
    </footer>
  );
}
