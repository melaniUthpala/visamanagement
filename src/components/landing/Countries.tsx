import { COUNTRIES } from "@/data/landing-site";

export default function Countries() {
  return (
    <section className="py-24 sr">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 sr sr-scale">
          <div className="text-primary text-sm font-semibold tracking-widest mb-3">DESTINATIONS</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work in <span className="text-gradient-gold">15+ Countries</span>
          </h2>
          <p className="text-muted-foreground">Choose from verified opportunities across the globe.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {COUNTRIES.map((c) => (
            <div
              key={c.n}
              className="group card-base p-6 text-center hover:border-primary/40 hover:shadow-gold transition-smooth cursor-pointer sr sr-scale"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-smooth">{c.flag}</div>
              <h3 className="font-bold mb-1">{c.n}</h3>
              <div className="text-xs text-primary">{c.j}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
