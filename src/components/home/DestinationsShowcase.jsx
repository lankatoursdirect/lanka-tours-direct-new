import { Link } from "react-router-dom";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "@/components/shared/DestinationCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function DestinationsShowcase() {
  const list = destinations.slice(0, 5);
  return (
    <section className="bg-[var(--jungle-deep)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <SectionHeader eyebrow="Destinations" title="A Tiny Island. An Entire World." light />
        </div>
        <div className="reveal grid grid-cols-2 gap-4 md:auto-rows-[240px] md:grid-cols-4">
          {list.map((d, i) => {
            // High-End 5-Card Bento Logic
            // Sigiriya (0) is the large feature card
            const isLarge = i === 0;
            const mobileFull = i === 0; // Sigiriya is full width on mobile

            return (
              <DestinationCard 
                key={d.slug} 
                d={d} 
                className={`
                  ${mobileFull ? "col-span-2 h-[280px]" : "col-span-1 h-[200px]"}
                  ${isLarge ? "md:col-span-2 md:row-span-2 md:h-full" : "md:col-span-1 md:row-span-1 md:h-full"}
                `}
              />
            );
          })}
        </div>

        {/* Explore All Button with Glow */}
        <div className="reveal mt-16 text-center">
          <Link
            to="/destinations"
            className="group inline-flex items-center gap-3 rounded-full bg-[var(--ceylon-gold)] px-10 py-4 font-accent text-xs uppercase tracking-widest text-white shadow-md transition-all duration-300 hover:bg-[var(--ceylon-gold-deep)] hover:shadow-[0_0_15px_rgba(200,150,62,0.3)]"
          >
            Explore All Destinations
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
