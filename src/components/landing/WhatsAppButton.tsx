import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/94779179000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-smooth animate-float sr sr-scale"
      style={{ backgroundColor: "#25D366" }}
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
}
