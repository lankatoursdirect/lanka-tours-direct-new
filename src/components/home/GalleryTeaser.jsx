import { Link } from "react-router-dom";
import { galleryImages } from "@/data/gallery";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function GalleryTeaser() {
  const images = galleryImages.slice(0, 12);
  return (
    <section className="bg-[var(--ivory-white)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal">
          <SectionHeader title="Captured Moments. Real Journeys." />
        </div>
        <div className="reveal columns-2 gap-3 md:columns-3 lg:columns-4 [column-fill:balance]">
          {images.map((img, i) => (
            <Link
              key={img.url + i}
              to="/gallery"
              className="group relative mb-3 block overflow-hidden rounded-lg"
              style={{ breakInside: "avoid" }}
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full object-cover transition-transform duration-[1200ms] ease-in-out group-hover:scale-110"
                style={{ height: i % 3 === 0 ? "320px" : i % 3 === 1 ? "220px" : "280px" }}
                loading="lazy"
              />
            </Link>
          ))}
        </div>
        <div className="reveal mt-10 text-center">
          <Link
            to="/gallery"
            className="font-accent text-sm uppercase tracking-wider text-[var(--spice-terracotta)] hover:text-[var(--ceylon-gold)]"
          >
            See Full Gallery →
          </Link>
        </div>
      </div>
    </section>
  );
}

