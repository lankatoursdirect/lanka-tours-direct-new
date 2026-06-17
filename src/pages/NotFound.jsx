import { Link } from "react-router-dom";
import { SEO } from "@/components/shared/SEO";
import { Compass, ArrowLeft, MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found — Lanka Tours Direct"
        description="The page you are looking for does not exist. Explore Sri Lanka tours, destinations, and experiences with Lanka Tours Direct."
        canonical="https://lankatoursdirect.com/404"
        noindex
      />
      <section className="flex min-h-[80vh] items-center justify-center bg-[var(--cream-parchment)] px-6">
        <div className="max-w-xl text-center">
          <Compass size={64} className="mx-auto mb-6 text-[var(--ceylon-gold)]/60" />
          <h1 className="font-display text-6xl font-light text-[var(--jungle-deep)]">404</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            This page seems to have wandered off the beaten path.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--jungle-deep)] px-8 py-3 font-accent text-xs uppercase tracking-wider text-white transition-colors hover:bg-[var(--jungle-deep)]/90"
            >
              <ArrowLeft size={14} />
              Return Home
            </Link>
            <Link
              to="/tours"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--jungle-deep)] px-8 py-3 font-accent text-xs uppercase tracking-wider text-[var(--jungle-deep)] transition-colors hover:bg-[var(--jungle-deep)] hover:text-white"
            >
              <MapPin size={14} />
              Browse Tours
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            <Link to="/" className="underline underline-offset-4 hover:text-[var(--ceylon-gold)]">Home</Link>
            <Link to="/about" className="underline underline-offset-4 hover:text-[var(--ceylon-gold)]">About</Link>
            <Link to="/destinations" className="underline underline-offset-4 hover:text-[var(--ceylon-gold)]">Destinations</Link>
            <Link to="/experiences" className="underline underline-offset-4 hover:text-[var(--ceylon-gold)]">Experiences</Link>
            <Link to="/faq" className="underline underline-offset-4 hover:text-[var(--ceylon-gold)]">FAQ</Link>
            <Link to="/contact" className="underline underline-offset-4 hover:text-[var(--ceylon-gold)]">Contact</Link>
          </div>
        </div>
      </section>
    </>
  );
}
