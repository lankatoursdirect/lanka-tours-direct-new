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
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
      <WhatsAppFloat />
    </div>
  );
}




