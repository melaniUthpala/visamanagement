import { ChevronRight } from "lucide-react";
import { PROCESS } from "@/data/landing-site";

export default function Process() {
  return (
    <section id="process" className="py-24">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 sr">
          <div className="text-primary text-sm font-semibold tracking-widest mb-3">HOW IT WORKS</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your Journey in <span className="text-gradient-gold">5 Simple Steps</span>
          </h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {PROCESS.map((p, i) => (
              <div key={p.n} className="relative text-center sr sr-scale">
                <div className="relative inline-flex w-24 h-24 rounded-full bg-gradient-gold items-center justify-center mb-5 shadow-gold mx-auto">
                  <span className="text-2xl font-bold text-primary-foreground">{p.n}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{p.t}</h3>
                <p className="text-sm text-muted-foreground">{p.d}</p>
                {i < PROCESS.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute top-10 -right-3 w-6 h-6 text-primary/60" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
