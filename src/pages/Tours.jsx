import { Link } from "react-router-dom";
import { SEO } from "@/components/shared/SEO";
import { PageHero } from "@/components/shared/PageHero";
import { TourCard } from "@/components/shared/TourCard";
import { tours } from "@/data/tours";

const toursSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "url": "https://lankatoursdirect.com/tours",
  "name": "Private Sri Lanka Tour Packages",
  "itemListElement": tours.map((t, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "url": `https://lankatoursdirect.com/tours/${t.slug}`,
    "name": t.title,
  })),
};

export default function Tours() {
  return (
    <>
      <SEO
        title="Private Sri Lanka Tour Packages"
        description="Browse private Sri Lanka tour packages by duration and theme. 3-day to 14-day custom itineraries covering Sigiriya, Ella, Yala safari, Mirissa whale watching. Expert local guide Vishva."
        canonical="https://lankatoursdirect.com/tours"
        schema={toursSchema}
        preloadImage="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920"
      />
      <PageHero
        eyebrow="Tours"
        title="Private Sri Lanka Tours"
        subtitle="Hand-crafted itineraries — your pace, your interests, your story."
        image="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920"
      />
      <section className="bg-[var(--cream-parchment)] pb-16 pt-10">
        <div className="mx-auto max-w-7xl px-6">

          <h2 className="sr-only">All Sri Lanka Private Tour Packages</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tours.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}




