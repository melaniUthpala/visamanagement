import { RegisterForm } from "@/components/forms/RegisterForm";
import { Globe2 } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:opacity-80">
            <Globe2 className="h-8 w-8" />
            <span className="font-bold text-2xl">VisaTrack</span>
          </Link>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
