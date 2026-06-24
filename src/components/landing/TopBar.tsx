import { Phone, Mail, Shield } from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden md:block bg-secondary/80 border-b border-border text-xs">
      <div className="container mx-auto flex justify-between items-center py-2">
        <div className="flex items-center gap-4 text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-primary" /> +94 77 917 9000
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-primary" /> info@ro94.lk
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Shield className="w-3 h-3 text-primary" /> SLBFE Licensed Agency
        </div>
      </div>
    </div>
  );
}
