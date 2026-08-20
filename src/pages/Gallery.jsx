import { useState, useEffect, useCallback, useRef } from "react";
import { SEO } from "@/components/shared/SEO";
import { PageHero } from "@/components/shared/PageHero";
import { galleryImages } from "@/data/gallery";

const cats = ["all", "nature", "wildlife", "temples", "coast", "people", "food", "adventure"];

export default function Gallery() {
  const [cat, setCat] = useState("all");
  const [lightbox, setLightbox] = useState(null);
  const triggerRef = useRef(null);
  const lightboxRef = useRef(null);
  const list = cat === "all" ? galleryImages : galleryImages.filter((g) => g.category === cat);

  useEffect(() => {
    setLightbox(null);
  }, [cat]);

  const goNext = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((prev) => (prev + 1) % list.length);
  }, [lightbox, list.length]);

  const goPrev = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((prev) => (prev - 1 + list.length) % list.length);
  }, [lightbox, list.length]);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    lightboxRef.current?.focus();
    const handler = (e) => {
      if (e.key === "Escape") {
        closeLightbox();
        return;
      }
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Tab") {
        const focusable = lightboxRef.current?.querySelectorAll("button");
        if (!focusable?.length) return;
        const first = focusable[0],
          last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, goNext, goPrev, closeLightbox]);

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
                ref={i === lightbox ? triggerRef : null}
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
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          tabIndex={-1}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
        >
          <img
            src={list[lightbox].url}
            alt={list[lightbox].caption}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            &#8592;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            &#8594;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close lightbox"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            &#10005;
          </button>
          <div className="absolute bottom-6 left-0 right-0 text-center text-white">
            <p className="font-display text-xl">{list[lightbox].caption}</p>
            <p className="text-sm text-[var(--ceylon-gold)]">{list[lightbox].location}</p>
          </div>
        </div>
      )}
    </>
  );
}
