import { MessageCircle } from "lucide-react";

const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "94763300443";
const WA_MSG = encodeURIComponent("Hi Vishva! I'd love to plan a Sri Lanka trip with you.");

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
      target="_blank"
      rel="noreferrer noopener"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-deep animate-pulse-glow transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
}

export const whatsappLink = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;
