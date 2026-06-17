import { Link } from "react-router-dom";
import { tours } from "@/data/tours";
import { TourCard } from "@/components/shared/TourCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function FeaturedTours() {
  const featured = tours.filter((t) => t.featured).slice(0, 3);
  return (
    <section className="bg-[var(--cream-parchment)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal">
          <SectionHeader eyebrow="Explore" title="Where Will Your Sri Lanka Story Begin?" />
        </div>
        <div className="reveal grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
        <div className="reveal mt-12 text-center">
          <Link
            to="/tours"
            className="inline-block rounded-full border-2 border-[var(--jungle-deep)] px-8 py-3 font-accent text-xs uppercase tracking-wider text-[var(--jungle-deep)] transition-colors hover:bg-[var(--jungle-deep)] hover:text-white"
          >
            View All Tours →
          </Link>
        </div>
      </div>
    </section>
  );
}
