import { Link } from "react-router-dom";
import { MessageCircle, Mail } from "lucide-react";
import { whatsappLink } from "@/components/shared/WhatsAppButton";

export function FinalCTA() {
  return (
    <section id="contact-cta" className="bg-gradient-jungle py-24 text-center text-white">
      <div className="mx-auto max-w-3xl px-6 reveal">
        <h2 className="text-4xl font-light md:text-5xl" style={{ color: "white" }}>
          Ready To Discover Sri Lanka Your Way?
        </h2>
        <p className="mt-4 text-lg text-white/75">
          Reach me on WhatsApp for an instant reply — I respond within the hour.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-accent text-sm uppercase tracking-wider text-white shadow-deep transition-transform hover:scale-105"
          >
            <MessageCircle size={18} /> Message on WhatsApp
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--ceylon-gold)] px-7 py-3.5 font-accent text-sm uppercase tracking-wider text-[var(--ceylon-gold)] transition-colors hover:bg-[var(--ceylon-gold)] hover:text-white"
          >
            <Mail size={18} /> Send an Enquiry
          </Link>
        </div>
      </div>
    </section>
  );
}

