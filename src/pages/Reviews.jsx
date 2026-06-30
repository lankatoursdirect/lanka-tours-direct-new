import { SEO } from "@/components/shared/SEO";
import { PageHero } from "@/components/shared/PageHero";
import { ReviewCard } from "@/components/shared/ReviewCard";
import { reviews } from "@/data/reviews";
import { Star } from "lucide-react";

const reviewsSchema = {
  "@context": "https://schema.org",
  "@type": ["TourOperator", "LocalBusiness"],
  "name": "Lanka Tours Direct",
  "url": "https://lankatoursdirect.com",
  "image": "https://lankatoursdirect.com/logo.png",
  "telephone": "+94763300443",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "349/11 Nisal Uyana, S. Mahindahimi Road, Perera Road, Alubomulla",
    "addressLocality": "Panadura",
    "addressCountry": "LK"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": reviews.length,
    "bestRating": "5",
    "worstRating": "1",
  },
  "review": reviews.slice(0, 3).map((r) => ({
    "@type": "Review",
    "author": { "@type": "Person", "name": r.name },
    "reviewRating": { "@type": "Rating", "ratingValue": r.rating || "5" },
    "reviewBody": r.body,
  })),
};

export default function Reviews() {
  return (
    <>
      <SEO
        title="Sri Lanka Tour Reviews & Testimonials | Lanka Tours Direct"
        description="Read verified reviews from Lanka Tours Direct guests. 5-star private Sri Lanka tours with expert guide Vishva. See why travellers love their bespoke Sri Lanka experience."
        canonical="https://lankatoursdirect.com/reviews"
        schema={reviewsSchema}
        preloadImage="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920"
      />
      <PageHero
        eyebrow="Reviews"
        title="150+ Travellers. One Unforgettable Island."
        image="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920"
      />
      <section className="bg-[var(--cream-parchment)] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3 shadow-card">
              <Star className="fill-[var(--ceylon-gold)] text-[var(--ceylon-gold)]" size={22} />
              <span className="font-display text-3xl font-semibold">4.9 / 5.0</span>
              <span className="text-sm text-muted-foreground">· 150+ reviews</span>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <ReviewCard key={r.name + r.date} r={r} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}




