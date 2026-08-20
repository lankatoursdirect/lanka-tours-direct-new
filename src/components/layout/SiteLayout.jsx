import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "@/components/shared/WhatsAppButton";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

export function SiteLayout({ children }) {
  useScrollReveal();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[999] focus:rounded-lg focus:bg-[var(--jungle-deep)] focus:px-4 focus:py-2 focus:text-white focus:outline-none"
      >
        Skip to content
      </a>
      <main id="main-content" className="flex-1" aria-label="Main content">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppFloat />
    </div>
  );
}
