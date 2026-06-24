import { SERVICES } from "@/data/landing-site";

export default function Services() {
  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 sr">
          <div className="text-primary text-sm font-semibold tracking-widest mb-3">WHAT WE OFFER</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient-gold">Services</span>
          </h2>
          <p className="text-muted-foreground">
            Reliable, hassle-free foreign employment solutions — from job placement to
            post-arrival support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.t}
                className="group card-base p-6 hover:border-primary/40 transition-smooth hover:-translate-y-1 sr sr-scale"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-gradient-gold transition-smooth">
                  <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-smooth" />
                </div>
                <h3 className="font-bold text-lg mb-2">{s.t}</h3>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
