import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/landing-site";

export default function Testimonials() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 sr">
          <div className="text-primary text-sm font-semibold tracking-widest mb-3">TESTIMONIALS</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Voices of Our <span className="text-gradient-gold">Workers</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.n} className="card-base p-8 hover:border-primary/40 transition-smooth sr sr-scale">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-foreground/90 mb-6 italic">&quot;{t.q}&quot;</p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center font-bold text-primary-foreground">
                  {t.n[0]}
                </div>
                <div>
                  <div className="font-semibold">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
