import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { tours } from "@/data/tours";
import { destinations } from "@/data/destinations";
import { SEO } from "@/components/shared/SEO";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { trackTourView, trackWhatsAppClick } from "@/lib/analytics";
import {
  Check,
  X,
  Calendar,
  Users,
  MapPin,
  Settings2,
  ArrowRight,
  Bed,
  ChevronDown,
  Car,
  ShieldCheck,
  Plane,
  SlidersHorizontal,
  Send,
  MessageCircle,
} from "lucide-react";
// ─── HELPERS ──────────────────────────────────────────────────────────────────

function Divider() {
  return (
    <div
      className="w-full my-6 opacity-40"
      style={{ height: "1px", background: "linear-gradient(to right, transparent, var(--soft-sand) 15%, var(--soft-sand) 85%, transparent)" }}
    />
  );
}

function Eyebrow({ children }) {
  return (
    <p className="font-sans text-[10px] font-bold tracking-[.28em] uppercase text-[var(--ceylon-gold)] mb-4">
      ✦ {children}
    </p>
  );
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function TourDetail() {
  const { slug } = useParams();
  const tour = tours.find((t) => t.slug === slug);
  const [openDay, setOpenDay] = useState(1);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [cardWidthPx, setCardWidthPx] = useState(0);
  const carouselRef = useRef(null);
  const touchStartX = useRef(null);

  const relatedTours = useMemo(() => {
    const others = tours.filter((t) => t.slug !== slug);
    return [...others].sort(() => Math.random() - 0.5).slice(0, 3);
  }, [slug]);

  const isCarousel = slidesPerView < 3;
  const total = relatedTours.length;
  const offset = total;

  const list = useMemo(() => {
    return [...relatedTours, ...relatedTours, ...relatedTours];
  }, [relatedTours]);

  // Set initial carouselIdx to offset when carousel mode starts
  useEffect(() => {
    setCarouselIdx(isCarousel ? offset : 0);
  }, [isCarousel, offset]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const obs = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const cw = entries[0].contentRect.width;
      if (cw === 0) return;
      const spv = cw >= 900 ? 3 : cw >= 540 ? 2 : 1;
      setSlidesPerView(spv);
      setCardWidthPx((cw - 24 * (spv - 1)) / spv);
    });

    obs.observe(el);
    return () => obs.disconnect();
  }, [relatedTours]);

  const handleInfiniteReset = useCallback(() => {
    if (!isCarousel) return;
    if (carouselIdx >= 2 * total) {
      setIsTransitioning(false);
      setCarouselIdx(carouselIdx - total);
    } else if (carouselIdx < total) {
      setIsTransitioning(false);
      setCarouselIdx(carouselIdx + total);
    }
  }, [carouselIdx, total, isCarousel]);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const next = useCallback(() => {
    if (!isTransitioning || !isCarousel) return;
    setIsTransitioning(true);
    setCarouselIdx((prev) => prev + 1);
  }, [isTransitioning, isCarousel]);

  const prev = useCallback(() => {
    if (!isTransitioning || !isCarousel) return;
    setIsTransitioning(true);
    setCarouselIdx((prev) => prev - 1);
  }, [isTransitioning, isCarousel]);

  useEffect(() => {
    if (!isCarousel) return;
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [next, isCarousel]);

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

  if (!tour) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 bg-[#FAF9F5]">
        <div className="text-center">
          <h1 className="font-display text-4xl md:text-5xl font-light text-[var(--jungle-deep)]">Tour not found</h1>
          <Link
            to="/tours"
            className="mt-4 inline-block text-sm text-[var(--ceylon-gold)] transition-colors hover:text-[#b5832d]"
          >
            ← Back to tours
          </Link>
        </div>
      </div>
    );
  }

  const nights = tour.nights ?? tour.duration - 1;

  useEffect(() => {
    trackTourView(tour.slug, tour.title, tour.duration);
  }, [tour.slug, tour.title, tour.duration]);

  const truncate = (text, maxLen) => {
    if (!text || text.length <= maxLen) return text;
    const truncated = text.slice(0, maxLen);
    const lastSpace = truncated.lastIndexOf(" ");
    return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + "...";
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lankatoursdirect.com" },
      { "@type": "ListItem", "position": 2, "name": "Tours", "item": "https://lankatoursdirect.com/tours" },
      { "@type": "ListItem", "position": 3, "name": tour.title, "item": `https://lankatoursdirect.com/tours/${tour.slug}` },
    ],
  };

  const touristTripSchema = {
    "@type": "TouristTrip",
    "name": tour.title,
    "description": tour.description,
    "provider": {
      "@type": "TourOperator",
      "name": "Lanka Tours Direct",
      "url": "https://lankatoursdirect.com",
    },
    "touristType": ["leisure", "cultural"],
    "duration": `P${tour.duration}D`,
    "itinerary": (tour.route || []).map((stop, i) => ({
      "@type": "TouristAttraction",
      "name": stop,
      "position": i + 1,
    })),
  };

  const tourSchema = {
    "@context": "https://schema.org",
    "@graph": [touristTripSchema, breadcrumbSchema],
  };

  const defaultCustomise = [
    "Adjust pacing",
    "Swap destinations",
    "Add extra days",
    "Family-friendly options",
    "Honeymoon upgrades",
    "Adventure add-ons",
  ];

  // Split description dynamically for the editorial typography layout
  const firstSentenceIndex = tour.description.indexOf(". ");
  let firstSentence = tour.description;
  let remainingText = "";
  if (firstSentenceIndex !== -1) {
    firstSentence = tour.description.substring(0, firstSentenceIndex + 1);
    remainingText = tour.description.substring(firstSentenceIndex + 2);
  }

  return (
    <>
      <SEO
        title={`${tour.title} — ${tour.duration}-Day Private Sri Lanka Tour`}
        description={truncate(tour.description, 155)}
        canonical={`https://lankatoursdirect.com/tours/${tour.slug}`}
        ogImage={tour.coverImage}
        ogType="article"
        schema={tourSchema}
        preloadImage={tour.coverImage}
      />
      {/* ════════════════════════════════════════════════════════════════════
          HERO — cinematic full-screen hero
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden w-full"
        style={{
          height: "clamp(480px, 65vh, 680px)",
          marginTop: 64,
        }}
      >
        {/* Cover image */}
        <img
          src={tour.coverImage}
          alt={`${tour.title} — Private Sri Lanka Tour`}
          fetchpriority="high"
          width="1920"
          height="680"
          className="absolute inset-0 h-full w-full object-cover scale-[1.01] transition-all duration-1000"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(8,22,14,1) 0%, rgba(8,22,14,0.8) 35%, rgba(8,22,14,0.1) 100%)",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 flex h-full flex-col justify-end w-full max-w-6xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 pb-28 md:pb-32">

          {/* Eyebrow badge */}
          <div className="flex items-center gap-2.5 mb-4 animate-fade-in">
            <span className="px-3 py-1.5 rounded-full border border-[#c9973a]/65 bg-[#08160e]/80 backdrop-blur-2xl text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] uppercase text-[#c9973a] shadow-lg">
              ✦ {tour.duration} Days · {nights} Nights
              {tour.categoryDisplay && ` · ${tour.categoryDisplay}`}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display font-light text-white animate-fade-in"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
              lineHeight: 1.05,
              marginBottom: "1rem",
              textShadow: "0 2px 16px rgba(0,0,0,0.5)",
            }}
          >
            {tour.titleMain || tour.title}
            {tour.titleAccent && (
              <>
                {" "}
                <em className="font-display italic font-normal text-[#c9973a]">
                  {tour.titleAccent}
                </em>
              </>
            )}
          </h1>

          {/* Tagline */}
          <p
            className="font-light text-white/85 max-w-xl text-sm sm:text-base leading-relaxed mb-6 animate-fade-in"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
          >
            {tour.tagline}
          </p>

          {/* Badge pills */}
          <div className="flex flex-wrap gap-2.5 mb-6 animate-fade-in">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#c9973a]/40 bg-white/5 backdrop-blur-md text-[#ddb36a] text-[9px] font-semibold uppercase tracking-widest transition-all hover:bg-white/10">
              <ShieldCheck size={12} className="stroke-[2.2px]" />
              <span>Private Tour</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#c9973a]/40 bg-white/5 backdrop-blur-md text-[#ddb36a] text-[9px] font-semibold uppercase tracking-widest transition-all hover:bg-white/10">
              <Plane size={12} className="stroke-[2.2px] rotate-[15deg]" />
              <span>Airport to Airport</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#c9973a]/40 bg-white/5 backdrop-blur-md text-[#ddb36a] text-[9px] font-semibold uppercase tracking-widest transition-all hover:bg-white/10">
              <SlidersHorizontal size={12} className="stroke-[2.2px]" />
              <span>Fully Customisable</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 items-center animate-fade-in">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#c9973a] hover:bg-[#b5832d] text-[#1c1c16] font-accent text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <Send size={13} className="stroke-[2.2px]" />
              <span>Send Enquiry</span>
            </Link>
            <a
                    href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "94763300443"}?text=${encodeURIComponent(`Hi Vishva! I'm interested in the ${tour.title} — could you share more details and pricing?`)}`}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => trackWhatsAppClick(tour.title, "tour_hero")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba56] text-white font-accent text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <MessageCircle size={13} className="stroke-[2.2px]" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="mx-auto mt-4 max-w-5xl px-4 sm:px-6 md:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tours", href: "/tours" },
            { label: tour.title, href: null },
          ]}
        />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          AT A GLANCE STRIP — Floating Dark Emerald Glassmorphism
      ════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-20 -mt-16 md:-mt-20 mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <div className="bg-[#0b1f14]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              {
                Icon: Calendar,
                label: "Duration",
                value: `${tour.duration} Days`,
                sub: `${nights} Nights`,
              },
              {
                Icon: Users,
                label: "Group Type",
                value: tour.groupType || "Private",
                sub: "Any size",
              },
              {
                Icon: MapPin,
                label: "Regions",
                value: tour.regions?.[0] || tour.category || "Island-wide",
                sub: tour.regions?.[1],
              },
              {
                Icon: Settings2,
                label: "Flexibility",
                value: "Fully",
                sub: "Customisable",
              },
            ].map(({ Icon, label, value, sub }, idx) => (
              <div
                key={label}
                className={`group flex items-start gap-4 p-5 md:p-7 transition-all duration-300 hover:bg-white/[0.03] ${idx % 2 === 0 ? "border-r border-white/10" : ""
                  } ${idx < 2 ? "border-b border-white/10" : ""
                  } md:border-b-0 md:border-r border-white/10 ${idx === 3 ? "md:border-r-0" : ""
                  }`}
              >
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full border border-[#c9973a]/40 bg-[#08160e] text-[#c9973a] shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:border-[#c9973a] group-hover:shadow-[0_0_15px_rgba(201,151,58,0.3)]">
                  <Icon size={16} strokeWidth={1.8} />
                </div>
                <div className="min-w-0 pt-0.5">
                  <div className="text-[9px] font-semibold tracking-[0.15em] uppercase text-white/50 mb-1.5">
                    {label}
                  </div>
                  <div className="font-display text-white text-base md:text-lg font-light leading-none truncate">
                    {value}
                  </div>
                  {sub && (
                    <div className="font-sans text-[#ddb36a] text-[11px] font-medium tracking-wide mt-1 truncate">
                      {sub}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          MAIN CONTENT AREA
      ════════════════════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-6xl px-4 sm:px-8 md:px-12 lg:px-16 mt-10 md:mt-12 relative">

        {/* ── OVERVIEW — Editorial Asymmetrical Layout ──────────────────────── */}
        <section className="pb-10 md:pb-14 relative">
          {/* Faint Background Decorative Watermark to Break Monotony */}
          <div className="absolute right-[-5%] top-[10%] text-[9rem] font-display font-light select-none tracking-widest text-[var(--jungle-deep)] opacity-[0.02] pointer-events-none hidden lg:block uppercase">
            CEYLON
          </div>

          <Eyebrow>About This Journey</Eyebrow>

          <div className="flex flex-col lg:grid lg:gap-16 lg:[grid-template-columns:1fr_340px] items-start gap-12">
            {/* Editorial Lead-in Text Container */}
            <div className="flex-1">
              <span className="font-display font-light text-[var(--jungle-deep)] text-xl sm:text-2xl md:text-[27px] mb-6 block border-l-4 border-[#c9973a] pl-5 md:pl-6 leading-[1.55] tracking-wide max-w-4xl">
                {firstSentence}
              </span>
              {remainingText && (
                <p className="font-sans text-sm md:text-[15px] text-[#1A241F] leading-[1.85] font-light tracking-wide">
                  {remainingText}
                </p>
              )}
            </div>

            {/* Premium Structural Highlights Block */}
            <div className="w-full bg-[#FAF9F5] border-t-4 border-[var(--jungle-deep)] border-x border-b border-[#e5e1d5] rounded-xl p-6 md:p-7 shadow-[0_12px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(8,22,14,0.04)] transition-all duration-300 flex-shrink-0">
              <div className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--jungle-deep)] mb-5 pb-3 border-b border-[#e8e4db] flex items-center gap-2">
                <span className="text-[var(--ceylon-gold)] text-xs">✦</span>
                Tour Highlights
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {tour.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-sm text-[#2c3631] leading-relaxed font-light"
                  >
                    <span className="text-[var(--ceylon-gold)] font-bold text-xs shrink-0 mt-0.5 select-none">✦</span>
                    <span className="tracking-wide">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── ITINERARY: Living Interactive Map Timeline ────────────────────────────────────────── */}
        {tour.itinerary?.length > 0 && (
          <section className="py-10 md:py-14 relative">
            <Eyebrow>Day by Day Plan</Eyebrow>
            <h2 className="font-display font-light text-3xl md:text-4xl lg:text-[44px] tracking-wide mb-2 text-[var(--jungle-deep)]">
              Your Itinerary
            </h2>
            <p className="text-xs sm:text-sm font-light text-[var(--muted-foreground)] tracking-wide mb-8">
              Select any timeline marker day to unfold curated destination experiences.
            </p>

            {/* Visually Linked Active Map Timeline Track */}
            <div className="relative border-l-2 border-[#c9973a]/30 ml-5 md:ml-9 pb-4">

              <div className="flex flex-col gap-10">
                {tour.itinerary.map((day) => {
                  const isOpen = openDay === day.day;
                  const dayItems = day.activities ?? (day.description ? [day.description] : []);

                  return (
                    <div key={day.day} className="relative pl-8 md:pl-12 group/item">

                      {/* Timeline Node Node Node */}
                      <div
                        className={`absolute -left-[21px] md:-left-[25px] top-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border shadow-sm transition-all duration-300 cursor-pointer select-none ${isOpen
                          ? "bg-[var(--jungle-deep)] border-[var(--ceylon-gold)] scale-105 shadow-[0_0_15px_rgba(201,151,58,0.25)]"
                          : "bg-[#FDFCFB] border-[#c9973a]/40 hover:border-[var(--jungle-deep)]"
                          }`}
                        onClick={() => setOpenDay(isOpen ? null : day.day)}
                      >
                        <span className={`font-display text-base md:text-lg transition-colors duration-300 ${isOpen ? "text-[var(--ceylon-gold)] font-medium" : "text-[#c9973a]"}`}>
                          {String(day.day).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Container Card Frame */}
                      <div
                        className="bg-white border rounded-xl overflow-hidden transition-all duration-500 shadow-[0_4px_15px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.03)]"
                        style={{ borderColor: isOpen ? 'var(--ceylon-gold)' : '#e8e4db' }}
                      >
                        {/* ── Card Accordion Header ── */}
                        <div
                          className="flex items-center justify-between gap-4 px-5 py-5 cursor-pointer select-none"
                          onClick={() => setOpenDay(isOpen ? null : day.day)}
                        >
                          <div className="min-w-0">
                            <h3 className="font-display text-lg md:text-[21px] font-normal text-[var(--jungle-deep)] leading-snug tracking-wide group-hover/item:text-[#c9973a] transition-colors duration-300">
                              {day.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                              {day.departure ? (
                                <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-[var(--ceylon-gold)] border border-amber-100">
                                  Departure Day
                                </span>
                              ) : day.overnight ? (
                                <div className="flex items-center gap-1.5 opacity-90">
                                  <Bed size={12} className="text-[#c9973a]" />
                                  <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--shadow-brown)]/75">
                                    Overnight · <strong className="font-semibold text-[var(--jungle-deep)]">{day.overnight}</strong>
                                  </span>
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <button
                            className="flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-full border transition-all duration-300 shadow-sm"
                            style={{
                              borderColor: isOpen ? 'transparent' : '#e8e4db',
                              background: isOpen ? 'var(--jungle-deep)' : '#fdfcfb',
                            }}
                          >
                            <ChevronDown
                              size={16}
                              style={{
                                color: isOpen ? 'var(--ceylon-gold)' : 'var(--jungle-deep)',
                                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform .4s ease-in-out",
                              }}
                            />
                          </button>
                        </div>

                        {/* ── Smooth Grid Expansion Frame ── */}
                        <div
                          className="grid transition-all duration-500 ease-in-out border-t border-[#e8e4db]"
                          style={{
                            gridTemplateRows: isOpen ? "1fr" : "0fr",
                            borderColor: isOpen ? "#e8e4db" : "transparent"
                          }}
                        >
                          <div className="overflow-hidden">
                            <div className={`flex flex-col md:grid md:grid-cols-[1fr_270px] bg-[#FAF9F5]/40 transition-all duration-500 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-[0.99]"}`}>

                              {/* Left Content List */}
                              <div className="p-6 md:p-8">
                                <ul className="flex flex-col gap-4.5">
                                  {dayItems.map((act, i) => (
                                    <li key={i} className="flex items-start gap-3.5 text-[14px] text-[#0c1410] leading-relaxed font-normal tracking-wide">
                                      <ArrowRight size={14} className="text-[#c9973a] shrink-0 mt-1 stroke-[2.5px]" />
                                      <span>{act}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Right Structural Info Grid */}
                              <div className="p-6 bg-[#fdfcfb] border-t md:border-t-0 md:border-l border-[#e8e4db] flex flex-col gap-5.5">
                                {(day.overnight || day.departure) && (
                                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#FAF9F5] border border-[#e8e4db] w-fit shadow-sm">
                                    {day.departure ? (
                                      <Car size={13} className="text-[#c9973a]" />
                                    ) : (
                                      <Bed size={13} className="text-[#c9973a]" />
                                    )}
                                    <span className="text-[9px] font-bold tracking-wider uppercase text-[var(--jungle-deep)]">
                                      {day.departure ? "Departure Block" : `${day.overnight}`}
                                    </span>
                                  </div>
                                )}

                                {day.driveTime && (
                                  <div>
                                    <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#c9973a]/80 mb-1">
                                      Drive Duration
                                    </p>
                                    <p className="text-sm font-normal text-[#0c1410]">
                                      {day.driveTime}
                                    </p>
                                  </div>
                                )}

                                {day.bestMoment && (
                                  <div>
                                    <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#c9973a]/80 mb-1">
                                      Best Moment Hook
                                    </p>
                                    <p className="text-[13px] font-normal text-[#0c1410] italic bg-[#FAF9F5] p-2.5 rounded border border-dashed border-[#e8e4db] leading-relaxed">
                                      "{day.bestMoment}"
                                    </p>
                                  </div>
                                )}

                                {day.note && (
                                  <div className="p-3.5 bg-[#FFFBF2] border-l-2 border-[#c9973a] rounded-r-md shadow-sm">
                                    <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#b5832d] mb-1">
                                      Advisory Note
                                    </p>
                                    <p className="text-[12px] font-normal text-[#2a1e12] leading-relaxed">
                                      {day.note}
                                    </p>
                                  </div>
                                )}
                              </div>

                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <Divider />

        {/* ── INCLUDED / EXCLUDED — High Contrast Editorial Boards ───────────────────────────────────────── */}
        {(tour.includes?.length > 0 || tour.excludes?.length > 0) && (
          <section className="py-10 md:py-14">
            <Eyebrow>Fine Print Summary</Eyebrow>
            <h2 className="font-display font-light text-3xl md:text-4xl lg:text-[44px] tracking-wide mb-6 text-[var(--jungle-deep)]">
              Included <em className="italic text-[#c9973a] font-normal">&amp; Excluded</em>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

              {/* Included Panel Card */}
              {tour.includes?.length > 0 && (
                <div className="bg-[#FAF9F5] border-t-4 border-[var(--jungle-deep)] border-x border-b border-[#e1dcd0] hover:border-t-[#0f3a22] hover:border-x-[#c3d9cc] hover:border-b-[#c3d9cc] rounded-xl p-6 md:p-8 shadow-[0_12px_24px_rgba(8,22,14,0.02)] transition-all duration-300 hover:translate-y-[-2px]">
                  <div className="flex items-center gap-3 mb-6 border-b border-[#e8e4db] pb-4.5">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--jungle-deep)] text-white shadow-sm">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--jungle-deep)]">
                      WHAT IS INCLUDED
                    </span>
                  </div>
                  <ul className="flex flex-col gap-4">
                    {tour.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3.5 text-sm font-normal text-[#0c1410] leading-relaxed tracking-wide">
                        <Check size={16} className="text-[#c9973a] shrink-0 mt-0.5 stroke-[2.5px]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Excluded Panel Card */}
              {tour.excludes?.length > 0 && (
                <div className="bg-[#FAF9F5] border-t-4 border-[#9c4a4a] border-x border-b border-[#e1dcd0] hover:border-t-[#d32f2f] hover:border-x-[#e9c5c5] hover:border-b-[#e9c5c5] rounded-xl p-6 md:p-8 shadow-[0_12px_24px_rgba(156,74,74,0.015)] transition-all duration-300 hover:translate-y-[-2px]">
                  <div className="flex items-center gap-3 mb-6 border-b border-[#e8e4db] pb-4.5">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#9c4a4a] text-white shadow-sm">
                      <X size={12} strokeWidth={3} />
                    </div>
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#9c4a4a]">
                      NOT COVERED
                    </span>
                  </div>
                  <ul className="flex flex-col gap-4">
                    {tour.excludes.map((item) => (
                      <li key={item} className="flex items-start gap-3.5 text-sm font-normal text-[#2a2424] leading-relaxed tracking-wide">
                        <X size={16} className="text-red-300 shrink-0 mt-1 stroke-[2px]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </section>
        )}

        <Divider />

        {/* ── CUSTOMISE CTA — Premium Boarding Pass Voucher ─────────────────────────────────────────────── */}
        <section className="py-10 md:py-14">
          <div className="relative bg-[var(--jungle-deep)] rounded-2xl shadow-[0_30px_60px_-15px_rgba(8,22,14,0.4)] p-1.5 md:p-2 overflow-hidden">

            {/* Frame Line Contour Layout */}
            <div className="relative border border-[#c9973a]/30 rounded-xl px-6 py-14 md:px-12 md:py-[74px] text-center z-10 overflow-hidden">
              <div className="absolute -top-[120px] -left-[120px] w-[320px] h-[320px] rounded-full bg-[#c9973a]/5 pointer-events-none blur-3xl" />
              <div className="absolute -bottom-[120px] -right-[120px] w-[320px] h-[320px] rounded-full bg-[#c9973a]/5 pointer-events-none blur-3xl" />

              <div className="relative z-10 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9973a]/40 text-[#c9973a] text-[9px] font-semibold tracking-[0.22em] uppercase mb-6 bg-[var(--jungle-deep)]/60 backdrop-blur-sm shadow-md">
                  ✦ Tailor-Made Adaptation
                </div>

                <h2 className="font-display font-light text-white text-3xl md:text-[46px] leading-tight tracking-wide mb-5">
                  Make it <em className="italic text-[#c9973a] font-normal">yours</em>
                </h2>

                <p className="text-sm md:text-base font-light text-white/75 leading-relaxed mb-9 max-w-xl mx-auto tracking-wide">
                  This blueprint is just a narrative foundation. Swap locations, expand pacing, or handpick luxury hotel changes — our experts sculpt it explicitly for you.
                </p>

                {/* Tags Grid pills */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-2.5 mb-11 pointer-events-none select-none">
                  {(tour.customiseOptions || defaultCustomise).map((opt) => (
                    <span
                      key={opt}
                      className="px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-xs text-white/60 font-light tracking-wide transition-colors"
                    >
                      {opt}
                    </span>
                  ))}
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                  <Link
                    to="/contact"
                    className="w-full sm:w-auto px-8 py-4 bg-[#c9973a] hover:bg-[#b5832d] text-[#1c1c16] text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase rounded-full shadow-2xl transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
                  >
                    <span>Send Custom Request</span>
                    <span>→</span>
                  </Link>
                  <a
              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "94763300443"}?text=${encodeURIComponent(`Hi Vishva! I'm interested in the ${tour.title} — could you share more details and pricing?`)}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => trackWhatsAppClick(tour.title, "tour_customise")}
                    className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20ba56] text-white text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase rounded-full shadow-2xl transition-all duration-300 hover:-translate-y-0.5 animate-pulse-glow inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={15} className="stroke-[2.2px]" />
                    <span>WhatsApp Tailoring</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── DESTINATIONS ON THIS TOUR ──────────────────────────────────── */}
        {tour.route && tour.route.length > 0 && (
          <section className="py-10 md:py-14">
            <div className="mb-6">
              <p className="font-sans text-[10px] font-bold tracking-[.28em] uppercase text-[var(--ceylon-gold)] mb-4">✦ Destinations on This Tour</p>
              <h2 className="font-display font-light text-3xl md:text-[40px] tracking-wide text-[var(--jungle-deep)]">
                Places You'll{" "}
                <em className="italic text-[var(--ceylon-gold)] font-normal">Visit</em>
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {tour.route.map((stop) => {
                const lower = stop.toLowerCase();
                const routeSlugMap = {
                  "airport": "negombo",
                  "airport / negombo": "negombo",
                  "yala": "kataragama",
                  "mirissa": "mirissa",
                  "mirissa / weligama": "mirissa",
                  "galle": "galle",
                  "tangalle": "tangalle-hiriketiya",
                  "hikkaduwa": "hikkaduwa-bentota",
                  "bentota": "hikkaduwa-bentota",
                  "kataragama": "kataragama",
                  "mannar": "mannar",
                  "knuckles": "knuckles-riverston",
                  "hiriketiya": "tangalle-hiriketiya",
                  "rekawa": null,
                  "wilpattu": null,
                  "habarana": null,
                };
                const matched = destinations.find(
                  (d) => d.name.toLowerCase() === lower
                ) || (routeSlugMap[lower] ? destinations.find(
                  (d) => d.slug === routeSlugMap[lower]
                ) : null);
                return matched ? (
                  <Link
                    key={stop}
                    to={`/destinations/${matched.slug}`}
                    className="group rounded-xl border border-[#e8e4db] bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--ceylon-gold)] hover:shadow-md"
                  >
                    <span className="font-accent text-sm font-medium text-[var(--jungle-deep)] group-hover:text-[var(--ceylon-gold)] transition-colors">
                      {stop}
                    </span>
                    <p className="mt-0.5 max-w-[200px] text-[10px] text-[#8a7455] line-clamp-1">
                      {truncate(matched.description, 80)}
                    </p>
                  </Link>
                ) : (
                  <span
                    key={stop}
                    className="rounded-xl border border-[#e8e4db] bg-[#faf9f5] px-4 py-3"
                  >
                    <span className="font-accent text-sm font-medium text-[var(--jungle-deep)]">
                      {stop}
                    </span>
                  </span>
                );
              })}
            </div>
          </section>
        )}

        <Divider />

        {/* ── YOU MAY ALSO LIKE — Related Tours Carousel ──────────────────── */}
        {relatedTours.length > 0 && (
          <section className="py-10 md:py-14">
            {/* Header */}
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <Eyebrow>Explore More</Eyebrow>
                <h2 className="font-display font-light text-3xl md:text-[40px] tracking-wide text-[var(--jungle-deep)]">
                  You May Also{" "}
                  <em className="italic text-[var(--ceylon-gold)] font-normal">Like</em>
                </h2>
              </div>
              <Link
                to="/tours"
                className="hidden sm:inline-flex items-center gap-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ceylon-gold)] hover:text-[#b5832d] transition-colors duration-300 whitespace-nowrap"
              >
                View All Tours →
              </Link>
            </div>

            {/* Carousel Viewport */}
            <div
              ref={carouselRef}
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex"
                onTransitionEnd={handleInfiniteReset}
                style={{
                  gap: "24px",
                  transform: cardWidthPx > 0
                    ? `translateX(-${carouselIdx * (cardWidthPx + 24)}px)`
                    : "none",
                  transition: isTransitioning ? "transform 0.55s cubic-bezier(0.4,0,0.2,1)" : "none",
                }}
              >
                {(isCarousel ? list : relatedTours).map((t, i) => (
                  <Link
                    key={`${t.slug}-${i}`}
                    to={`/tours/${t.slug}`}
                    className="group block overflow-hidden rounded-xl bg-white border border-[#e8e4db] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 flex-shrink-0"
                    style={{
                      width: cardWidthPx > 0
                        ? `${cardWidthPx}px`
                        : slidesPerView === 3
                          ? "calc(33.333% - 16px)"
                          : slidesPerView === 2
                            ? "calc(50% - 12px)"
                            : "100%",
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-[200px] overflow-hidden">
                      <img
                        src={t.coverImage}
                        alt={`${t.title} — Sri Lanka tour`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        width="400"
                        height="200"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a12]/55 via-transparent to-transparent" />
                      <div className="absolute top-3 right-3 bg-[var(--ceylon-gold)] rounded-full px-2.5 py-0.5 font-sans text-[9px] font-bold uppercase tracking-wider text-white shadow-lg">
                        {t.duration} Days
                      </div>
                      {t.nights && (
                        <p className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-wider text-white/80 select-none">
                          {t.duration} Days · {t.nights} Nights
                        </p>
                      )}
                    </div>

                    {/* Body */}
                    <div className="p-5">
                      <h3 className="font-display text-xl font-normal text-[var(--jungle-deep)] leading-snug mb-0.5">
                        {t.titleMain || t.title}
                        {t.titleAccent && (
                          <em className="italic text-[var(--ceylon-gold)] font-normal"> {t.titleAccent}</em>
                        )}
                      </h3>
                      {t.regions?.length > 0 && (
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-[#8a7455] mb-3">
                          {t.regions.slice(0, 3).join(" · ")}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {(t.highlights || []).slice(0, 3).map((h) => (
                          <span
                            key={h}
                            className="rounded-full bg-[#FAF9F5] border border-[#e8e4db] px-2.5 py-0.5 text-[9px] text-[var(--jungle-deep)] font-normal tracking-wide"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1.5 font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--ceylon-gold)] group-hover:text-[#b5832d] transition-colors duration-300">
                        View Itinerary
                        <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Dot navigation — visible only when carousel is active */}
            {isCarousel && (
              <div className="flex justify-center items-center gap-2 mt-6">
                {relatedTours.map((_, i) => {
                  const active = ((carouselIdx - offset + total) % total) === i;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setIsTransitioning(true);
                        setCarouselIdx(i + offset);
                      }}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${active
                        ? "w-6 h-2 bg-[var(--ceylon-gold)]"
                        : "w-2 h-2 bg-[#c9973a]/30 hover:bg-[#c9973a]/60"
                        }`}
                    />
                  );
                })}
              </div>
            )}

            {/* View All on mobile */}
            <div className="flex sm:hidden justify-center mt-8">
              <Link
                to="/tours"
                className="inline-flex items-center gap-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ceylon-gold)] hover:text-[#b5832d] transition-colors duration-300"
              >
                View All Tours →
              </Link>
            </div>
          </section>
        )}

      </div>
    </>
  );
}