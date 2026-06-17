import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { experienceCategories } from "@/data/experiences";
import { SectionHeader } from "@/components/shared/SectionHeader";
import * as Icons from "lucide-react";

export function ExperienceCategoriesSection() {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(6);
  const [cardWidthPx, setCardWidthPx] = useState(0);
  const carouselRef = useRef(null);

  const originalList = experienceCategories;
  const total = originalList.length;
  const offset = total;

  const isCarousel = slidesPerView < 6;

  // 3 copies of categories for infinite loop slider
  const list = useMemo(() => {
    return [...originalList, ...originalList, ...originalList];
  }, [originalList]);

  // Set initial displayIndex to show the second copy
  useEffect(() => {
    setDisplayIndex(offset);
  }, [offset]);

  // Measure container and update responsiveness via ResizeObserver
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const obs = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const cw = entries[0].contentRect.width;
      if (cw === 0) return;

      // 6 columns static on desktop (>=1024), 2 cards sliding on tablet (640-1023), 1 card sliding on mobile (<640)
      const spv = cw >= 1024 ? 6 : cw >= 640 ? 2 : 1;
      setSlidesPerView(spv);
      setCardWidthPx((cw - 24 * (spv - 1)) / spv);
    });

    obs.observe(el);
    return () => obs.disconnect();
  }, [originalList]);

  // Seamless jump to enable infinite loops
  const handleInfiniteReset = useCallback(() => {
    if (!isCarousel) return;
    if (displayIndex >= 2 * total) {
      setIsTransitioning(false);
      setDisplayIndex(displayIndex - total);
    } else if (displayIndex < total) {
      setIsTransitioning(false);
      setDisplayIndex(displayIndex + total);
    }
  }, [displayIndex, total, isCarousel]);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const next = useCallback(() => {
    if (!isTransitioning || !isCarousel) return;
    setIsTransitioning(true);
    setDisplayIndex((prev) => prev + 1);
  }, [isTransitioning, isCarousel]);

  const prev = useCallback(() => {
    if (!isTransitioning || !isCarousel) return;
    setIsTransitioning(true);
    setDisplayIndex((prev) => prev - 1);
  }, [isTransitioning, isCarousel]);

  // Autoplay loop every 4.5 seconds on mobile/tablet carousel
  useEffect(() => {
    if (!isCarousel) return;
    const interval = setInterval(next, 4500);
    return () => clearInterval(interval);
  }, [next, isCarousel]);

  // Touch Swipe for mobile/tablet
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => {
    if (!isCarousel) return;
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (!isCarousel || touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="bg-[var(--ivory-white)] py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal">
          <SectionHeader title="Not Just Tours. Experiences." />
        </div>
        
        {/* Container: Carousel viewport on mobile/tablet, Grid layout on desktop */}
        <div 
          ref={carouselRef}
          className="reveal relative mt-10 overflow-hidden"
        >
          <div 
            className={
              isCarousel
                ? `flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : "transition-none"}`
                : "grid grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4"
            }
            onTransitionEnd={handleInfiniteReset}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={
              isCarousel && cardWidthPx > 0
                ? {
                    gap: "24px",
                    transform: `translateX(-${displayIndex * (cardWidthPx + 24)}px)`,
                  }
                : {}
            }
          >
            {(isCarousel ? list : originalList).map((c, i) => (
              <Link
                key={`${c.title}-${i}`}
                to="/experiences"
                className="group relative h-[280px] shrink-0 overflow-hidden rounded-2xl transition-all duration-500 md:h-[320px] flex-shrink-0"
                style={
                  isCarousel && cardWidthPx > 0
                    ? { width: `${cardWidthPx}px` }
                    : {}
                }
              >
                {/* Background Image */}
                <img
                  src={c.image}
                  alt={c.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                
                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 transition-all duration-500 group-hover:bg-black/20">
                  <div className="flex flex-col">
                    {/* Title always visible, moves up on hover */}
                    <h4 className="font-display text-xl leading-tight text-white transition-transform duration-500 group-hover:-translate-y-4" style={{ color: "white" }}>
                      {c.title}
                    </h4>
                    
                    {/* Revealable content */}
                    <div className="max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-32">
                      <div className="pt-2 opacity-0 transition-all duration-500 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                        <p className="text-xs font-light tracking-wide text-white/90">
                          {c.tagline}
                        </p>
                        
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-accent uppercase tracking-widest text-[var(--ceylon-gold)]">
                          Explore Experience <Icons.ArrowRight size={12} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Scroll Indicator (Dots) */}
        {isCarousel && (
          <div className="mt-8 flex justify-center gap-2">
            {originalList.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsTransitioning(true);
                  setDisplayIndex(i + offset);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  ((displayIndex - offset + total) % total) === i ? "w-8 bg-[var(--ceylon-gold)]" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
