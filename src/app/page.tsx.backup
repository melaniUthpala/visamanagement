import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe2, Shield, Clock, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">VisaTrack</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" asChild><Link href="/login">Sign In</Link></Button>
            <Button asChild><Link href="/register">Get Started</Link></Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <Shield className="h-4 w-4" />
          Secure & Professional Visa Processing
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-6 max-w-3xl mx-auto">
          Your Visa Application, Managed Professionally
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Submit applications, upload documents, track status, and manage payments — all in one secure platform.
        </p>
        <div className="flex gap-4 justify-center mb-20">
          <Button size="lg" asChild><Link href="/register">Apply Now</Link></Button>
          <Button size="lg" variant="outline" asChild><Link href="/login">Existing Applicant</Link></Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            { icon: CheckCircle, title: "Easy Submission", desc: "Simple multi-step form to submit your visa application with all required details." },
            { icon: Clock, title: "Real-time Tracking", desc: "Track your application status at every stage from review to completion." },
            { icon: Shield, title: "Secure Documents", desc: "Safely upload and store all your documents with enterprise-grade security." },
          ].map((f) => (
            <div key={f.title} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border shadow-sm">
              <f.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
