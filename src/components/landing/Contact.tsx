import { CONTACTS } from "@/data/landing-site";
import { RegisterForm } from "@/components/forms/RegisterForm";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-secondary/30 sr">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="sr sr-left">
          <div className="text-primary text-sm font-semibold tracking-widest mb-3">GET IN TOUCH</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Your <span className="text-gradient-gold">Journey</span> Today
          </h2>
          <p className="text-muted-foreground mb-8">
            Apply now or contact our team — we&apos;ll guide you to the right opportunity overseas.
          </p>
          <div className="space-y-5">
            {CONTACTS.map((c) => {
              const Icon = c.i;
              return (
                <div key={c.l} className="flex items-start gap-4 sr sr-right">
                  <div className="w-12 h-12 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold shrink-0">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.l}</div>
                    <div className="font-semibold">{c.v}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/*
          This renders the REAL /register form & Firebase logic
          (src/components/forms/RegisterForm.tsx) — same validation,
          same registerUser() call, same redirect to /dashboard on
          success. No duplicate auth logic, zero risk of drift from
          the real registration flow.
        */}
        <div className="sr sr-scale ro94-auth-embed">
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}