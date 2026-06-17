import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";

export function TourCard({ tour }) {
  return (
    <Link to={`/tours/${tour.slug}`}
      className="group block overflow-hidden rounded-xl bg-card shadow-card transition-all hover:-translate-y-1"
    >
      <div className="relative h-[280px] image-zoom">
        <img src={tour.coverImage} alt={tour.title} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute right-4 top-4 rounded-full bg-[var(--ceylon-gold)] px-3 py-1 font-accent text-[11px] uppercase tracking-wider text-white shadow">
          <Clock size={12} className="mr-1 inline" />
          {tour.duration} Days
        </div>
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-2xl font-semibold">{tour.title}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{tour.description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {tour.highlights.slice(0, 3).map((h) => (
            <span
              key={h}
              className="rounded-full bg-[var(--cream-parchment)] px-3 py-1 text-xs text-[var(--jungle-deep)]"
            >
              {h}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1.5 font-accent text-xs uppercase tracking-wider text-[var(--spice-terracotta)] transition-colors group-hover:text-[var(--ceylon-gold)]">
          Explore This Tour
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
