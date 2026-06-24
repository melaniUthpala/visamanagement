import { CheckCircle2 } from "lucide-react";
import { WHY } from "@/data/landing-site";

export default function About() {
  return (
    <section id="about" className="py-24 sr">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="sr sr-left">
          <div className="text-primary text-sm font-semibold tracking-widest mb-3">ABOUT US</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to <span className="text-gradient-gold">RO94 Holdings</span>
          </h2>
          <p className="text-muted-foreground mb-4 text-lg">
            We specialize in connecting skilled professionals with foreign employers — from the
            Middle East and Asia to Europe.
          </p>
          <p className="text-muted-foreground mb-8">
            With deep employer networks and a fully transparent placement process, we make
            overseas careers achievable, safe, and rewarding for every Sri Lankan worker we serve.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {["Verified Employers", "Transparent Fees", "Full Visa Support", "Ethical Recruitment"].map((x) => (
              <div key={x} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">{x}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative sr sr-scale">
          <div className="absolute -inset-4 bg-gradient-gold opacity-20 blur-3xl rounded-full" />
          <div className="card-base relative p-8 border-primary/20">
            <div className="grid grid-cols-2 gap-6">
              {WHY.map((w) => {
                const Icon = w.icon;
                return (
                  <div key={w.t} className="sr sr-scale">
                    <div className="w-12 h-12 rounded-lg bg-gradient-gold flex items-center justify-center mb-3 shadow-gold">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-bold mb-1">{w.t}</h3>
                    <p className="text-xs text-muted-foreground">{w.d}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
