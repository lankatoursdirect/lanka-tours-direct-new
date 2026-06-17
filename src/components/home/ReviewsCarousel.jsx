import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { reviews } from "@/data/reviews";
import { ReviewCard } from "@/components/shared/ReviewCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Star, ChevronRight } from "lucide-react";

export function ReviewsCarousel() {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [cardWidthPx, setCardWidthPx] = useState(0);
  const carouselRef = useRef(null);

  const originalList = reviews;
  const total = originalList.length;
  const offset = total;

  // 3 copies of reviews to enable infinite seamless looping in both directions
  const list = useMemo(() => {
    return [...originalList, ...originalList, ...originalList];
  }, [originalList]);

  // Set initial displayIndex to show the second copy
  useEffect(() => {
    setDisplayIndex(offset);
  }, [offset]);

  // Use ResizeObserver for measuring card widths and layout responsiveness
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const obs = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const cw = entries[0].contentRect.width;
      if (cw === 0) return;

      // 4 cards on desktop, 2 cards on tablet/wider screens, 1 card on mobile
      const spv = cw >= 1024 ? 4 : cw >= 640 ? 2 : 1;
      setSlidesPerView(spv);
      setCardWidthPx((cw - 24 * (spv - 1)) / spv);
    });

    obs.observe(el);
    return () => obs.disconnect();
  }, [originalList]);

  // Seamless jump to enable infinite loops
  const handleInfiniteReset = useCallback(() => {
    if (displayIndex >= 2 * total) {
      setIsTransitioning(false);
      setDisplayIndex(displayIndex - total);
    } else if (displayIndex < total) {
      setIsTransitioning(false);
      setDisplayIndex(displayIndex + total);
    }
  }, [displayIndex, total]);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const next = useCallback(() => {
    if (!isTransitioning) return;
    setIsTransitioning(true);
    setDisplayIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const prev = useCallback(() => {
    if (!isTransitioning) return;
    setIsTransitioning(true);
    setDisplayIndex((prev) => prev - 1);
  }, [isTransitioning]);

  // Autoplay loop every 5 seconds
  useEffect(() => {
    const autoPlay = setInterval(next, 5000);
    return () => clearInterval(autoPlay);
  }, [next]);

  // Touch Swipe for mobile/tablet
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="bg-[var(--cream-parchment)] py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal relative">
          <SectionHeader eyebrow="Social Proof" title="What Travellers Say About Their Journey" />
          
          <div className="mb-10 md:mb-12 -mt-4 md:-mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-card border border-[var(--soft-sand)]">
              <Star className="fill-[var(--ceylon-gold)] text-[var(--ceylon-gold)]" size={18} />
              <span className="font-accent text-sm font-semibold">4.9 / 5 · 150+ travellers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Viewport Container */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-20 reveal">
        <div 
          ref={carouselRef}
          className="relative mt-8 md:mt-12 overflow-hidden"
        >
          <div 
            className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : "transition-none"}`}
            onTransitionEnd={handleInfiniteReset}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              gap: "24px",
              transform: cardWidthPx > 0
                ? `translateX(-${displayIndex * (cardWidthPx + 24)}px)`
                : "none",
            }}
          >
            {list.map((r, i) => (
              <div 
                key={`${r.name}-${i}`} 
                className="shrink-0 flex-shrink-0"
                style={{
                  width: cardWidthPx > 0
                    ? `${cardWidthPx}px`
                    : slidesPerView === 4
                    ? "calc(25% - 18px)"
                    : slidesPerView === 2
                    ? "calc(50% - 12px)"
                    : "100%",
                }}
              >
                <ReviewCard r={r} />
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="mt-10 md:mt-16 flex justify-center gap-3">
          {originalList.map((_, i) => {
            const active = (displayIndex - offset + total) % total === i;
            return (
              <button
                key={i}
                onClick={() => {
                  setIsTransitioning(true);
                  setDisplayIndex(i + offset);
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active ? "w-10 bg-[var(--ceylon-gold)]" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            );
          })}
        </div>

        <div className="mt-10 md:mt-16 text-center">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 font-accent text-sm uppercase tracking-widest text-[var(--spice-terracotta)] transition-colors hover:text-[var(--ceylon-gold)]"
          >
            Read All 150+ Reviews <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
