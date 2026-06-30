import { useState } from "react";
import { SEO } from "@/components/shared/SEO";
import { PageHero } from "@/components/shared/PageHero";
import { DestinationCard } from "@/components/shared/DestinationCard";
import { destinations, destinationRegions } from "@/data/destinations";

export default function Destinations() {
  const [region, setRegion] = useState("all");
  const list = region === "all" ? destinations : destinations.filter((d) => d.region === region);
  return (
    <>
      <SEO
        title="Sri Lanka Destinations — Places to Visit"
        description="Explore Sri Lanka's most beautiful destinations. Sigiriya, Ella, Yala, Mirissa, Galle, Kandy and more — private guided tours to every corner of the island."
        canonical="https://lankatoursdirect.com/destinations"
        preloadImage="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920"
      />
      <PageHero
        eyebrow="Destinations"
        title="Discover Sri Lanka"
        subtitle="A small island with extraordinary diversity. 8 UNESCO sites. Endless wonder."
        image="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920"
      />
      <section className="bg-[var(--cream-parchment)] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {destinationRegions.map((r) => (
              <button
                key={r.id}
                onClick={() => setRegion(r.id)}
                className={`rounded-full px-5 py-2 font-accent text-xs uppercase tracking-wider transition-smooth ${
                  region === r.id
                    ? "bg-[var(--jungle-deep)] text-white"
                    : "border border-[var(--soft-sand)] text-[var(--jungle-deep)] hover:border-[var(--ceylon-gold)]"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <h2 className="sr-only">{region === "all" ? "All Sri Lanka Destinations" : `Sri Lanka ${region} Destinations`}</h2>
          <div className="grid auto-rows-[260px] gap-4 md:grid-cols-3 lg:grid-cols-4">
            {list.map((d) => (
              <DestinationCard key={d.slug} d={d} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}




