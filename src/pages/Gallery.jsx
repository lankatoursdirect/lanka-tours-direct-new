import { useState, useEffect } from "react";
import { SEO } from "@/components/shared/SEO";
import { PageHero } from "@/components/shared/PageHero";
import { galleryImages } from "@/data/gallery";

const cats = ["all", "nature", "wildlife", "temples", "coast", "people", "food", "adventure"];

export default function Gallery() {
  const [cat, setCat] = useState("all");
  const [lightbox, setLightbox] = useState(null);
  const list = cat === "all" ? galleryImages : galleryImages.filter((g) => g.category === cat);

  // Reset lightbox when category changes to avoid out-of-bounds index crash
  useEffect(() => {
    setLightbox(null);
  }, [cat]);

  return (
    <>
      <SEO
        title="Sri Lanka Tour Photo Gallery"
        description="Explore our Sri Lanka photo gallery. Stunning images of Sigiriya, Ella, Yala wildlife, Mirissa beach, Galle Fort, tea plantations and more from Lanka Tours Direct."
        canonical="https://lankatoursdirect.com/gallery"
        preloadImage="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920"
      />
      <PageHero
        eyebrow="Gallery"
        title="Captured Moments"
        subtitle="Real photos from real journeys across Sri Lanka."
        image="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920"
        height={360}
      />
      <section className="bg-[var(--cream-parchment)] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 font-accent text-xs uppercase tracking-wider capitalize transition-smooth ${
                  cat === c
                    ? "bg-[var(--jungle-deep)] text-white"
                    : "border border-[var(--soft-sand)] hover:border-[var(--ceylon-gold)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="columns-2 gap-3 md:columns-3 lg:columns-4">
            {list.map((img, i) => (
              <button
                key={img.url + i}
                onClick={() => setLightbox(i)}
                className="group relative mb-3 block w-full overflow-hidden rounded-lg"
                style={{ breakInside: "avoid" }}
              >
                <img 
                  src={img.url} 
                  alt={img.caption} 
                  className="w-full object-cover transition-transform duration-[1200ms] ease-in-out group-hover:scale-110" 
                  loading="lazy" 
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={list[lightbox].url}
            alt={list[lightbox].caption}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
          />
          <div className="absolute bottom-6 left-0 right-0 text-center text-white">
            <p className="font-display text-xl">{list[lightbox].caption}</p>
            <p className="text-sm text-[var(--ceylon-gold)]">{list[lightbox].location}</p>
          </div>
        </div>
      )}
    </>
  );
}




