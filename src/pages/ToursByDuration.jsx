import { useParams } from "react-router-dom";
import { SEO } from "@/components/shared/SEO";
import { PageHero } from "@/components/shared/PageHero";
import { TourCard } from "@/components/shared/TourCard";
import { tours } from "@/data/tours";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

const DURATION_MAP = {
  3: { title: "3 Day Sri Lanka Tour Packages", description: "Perfect 3-day Sri Lanka tours for short breaks. Visit Sigiriya, Dambulla and Kandy with a private guide. Ideal for stopovers or add-ons to a longer journey." },
  5: { title: "5 Day Sri Lanka Tour Packages", description: "5-day private Sri Lanka tours covering the cultural triangle and hill country. Sigiriya, Polonnaruwa, Kandy and Ella with expert guide Vishva." },
  7: { title: "7 Day Sri Lanka Tour Packages", description: "The perfect 7-day Sri Lanka itinerary. Cover culture, wildlife and beach — Sigiriya, Yala safari, Mirissa whale watching and Galle Fort." },
  10: { title: "10 Day Sri Lanka Itinerary — Private Tour Package", description: "Our 10-day Sri Lanka itineraries give you time to breathe. Cultural triangle, hill country train, southern safari and Indian Ocean beaches." },
  14: { title: "14 Day Sri Lanka Tour — 2 Week Private Package", description: "The ultimate 14-day Sri Lanka tour. Two weeks to explore every region — north, south, east, hill country and coast — with a dedicated private guide." },
};

const DURATION_INTROS = {
  3: "Short on time but still want a taste of Sri Lanka? A 3-day private tour is perfect for stopovers or as an add-on to a longer itinerary. You can experience the cultural highlights around the Cultural Triangle with your expert guide Vishva.",
  5: "Five days is the perfect introduction to Sri Lanka. You'll experience the cultural triangle, hill country scenery, wildlife safari, and southern coast beaches — all at a comfortable pace. These tours cover the essential Sri Lankan experience without feeling rushed.",
  7: "A week in Sri Lanka gives you time to go deeper. You'll explore the ancient cities, ride the scenic hill country train, safari for leopards, and relax on the beach. Perfect for first-time visitors who want to see the best of the island.",
  10: "Ten days is the sweet spot for a comprehensive Sri Lanka experience. You'll have time to explore the cultural triangle in depth, trek through hill country, visit national parks, and spend quality time on the coast. A well-paced itinerary that covers all the highlights.",
  14: "Two weeks allows you to experience the true breadth of Sri Lanka. From the ancient cities of the north to the surf beaches of the east coast, the cool hill country to the wildlife-rich national parks — this is the definitive Sri Lanka experience.",
};

export default function ToursByDuration() {
  const { duration: durationSlug } = useParams();
  const days = parseInt(durationSlug?.split("-")[0], 10);
  const info = DURATION_MAP[days];
  const intro = DURATION_INTROS[days] || `Browse our ${days}-day Sri Lanka tour packages.`;

  const filtered = tours.filter((t) => t.duration === days);

  if (!info) {
    return (
      <>
        <SEO title="Sri Lanka Tour Packages" description="Browse our range of Sri Lanka tour packages." canonical={`https://lankatoursdirect.com/tours/${durationSlug}`} />
        <div className="flex min-h-[60vh] items-center justify-center bg-[var(--cream-parchment)]">
          <p className="text-lg text-muted-foreground">No tours found for this duration.</p>
        </div>
      </>
    );
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lankatoursdirect.com/" },
      { "@type": "ListItem", "position": 2, "name": "Tours", "item": "https://lankatoursdirect.com/tours" },
      { "@type": "ListItem", "position": 3, "name": `${days}-Day Tours`, "item": `https://lankatoursdirect.com/tours/${durationSlug}` },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": info.title,
    "description": info.description,
    "url": `https://lankatoursdirect.com/tours/${durationSlug}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": filtered.map((t, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `https://lankatoursdirect.com/tours/${t.slug}`,
        "name": t.title,
      })),
    },
  };

  return (
    <>
      <SEO
        title={info.title}
        description={info.description}
        canonical={`https://lankatoursdirect.com/tours/${durationSlug}`}
        schema={{ "@graph": [breadcrumbSchema, collectionSchema] }}
        preloadImage="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920"
      />
      <div className="mx-auto mt-4 max-w-5xl px-4 sm:px-6 md:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tours", href: "/tours" },
            { label: `${days}-Day Tours`, href: null },
          ]}
        />
      </div>
      <PageHero
        eyebrow={`${days}-Day Tours`}
        title={info.title}
        subtitle={intro}
        image="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920"
      />
      <section className="bg-[var(--cream-parchment)] py-16">
        <div className="mx-auto max-w-7xl px-6">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No tours match this duration. <a href="/tours" className="text-[var(--ceylon-gold)] underline">Browse all tours</a>
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((t) => (
                <TourCard key={t.slug} tour={t} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
