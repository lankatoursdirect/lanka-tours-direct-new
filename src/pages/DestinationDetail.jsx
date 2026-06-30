import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import { destinations } from "@/data/destinations";
import { tours } from "@/data/tours";
import { SEO } from "@/components/shared/SEO";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { trackDestinationView, trackWhatsAppClick } from "@/lib/analytics";
import {
  Calendar, MapPin, Award, Compass, Star,
  Sparkles, ChevronRight, Activity,
  CheckCircle2, Binoculars,
} from "lucide-react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  gold: "var(--ceylon-gold)",
  jungle: "var(--jungle-deep)",
  textDark: "#0f1e14",
  textMid: "#2e4a38",
  textMuted: "#4a6b55",
  onDark: "#ffffff",
  onDarkSub: "#d4e8db",
  onDarkMuted: "#9dbfaa",
  goldBg: "rgba(212,174,97,0.12)",
  goldBorder: "rgba(212,174,97,0.45)",
};

function GlobalAnimStyles() {
  useEffect(() => {
    const id = "dest-detail-anim";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = `
      @keyframes heroImgZoom {
        from { transform: scale(1.06); }
        to   { transform: scale(1); }
      }
      @keyframes goldLineDraw {
        from { width: 0; }
        to   { width: 3rem; }
      }
      @keyframes floatGlow {
        0%, 100% { opacity: 0.06; transform: scale(1); }
        50%       { opacity: 0.11; transform: scale(1.15); }
      }
      .dd-hero-img {
        animation: heroImgZoom 1.8s cubic-bezier(0.22,1,0.36,1) both;
      }
      .dd-card-hover {
        transition: transform 0.28s cubic-bezier(0.22,1,0.36,1),
                    box-shadow 0.28s ease;
      }
      .dd-card-hover:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 28px rgba(15,30,20,0.12);
      }
      .dd-pill-hover {
        transition: background 0.22s ease, color 0.22s ease,
                    border-color 0.22s ease, transform 0.22s ease;
      }
      .dd-pill-hover:hover {
        background: var(--ceylon-gold) !important;
        color: #fff !important;
        border-color: var(--ceylon-gold) !important;
        transform: translateY(-2px);
      }
      .dd-btn-primary {
        transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
      }
      .dd-btn-primary:hover {
        opacity: 0.88;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(212,174,97,0.35);
      }
      .dd-btn-ghost {
        transition: background 0.2s ease, transform 0.2s ease;
      }
      .dd-btn-ghost:hover {
        background: rgba(255,255,255,0.12) !important;
        transform: translateY(-2px);
      }
      .dd-place-card {
        transition: transform 0.28s cubic-bezier(0.22,1,0.36,1),
                    box-shadow 0.28s ease, border-color 0.2s ease;
      }
      .dd-place-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 24px rgba(15,30,20,0.10);
        border-color: var(--ceylon-gold) !important;
      }
      .dd-reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                    transform 0.7s cubic-bezier(0.22,1,0.36,1);
      }
      .dd-reveal.dd-revealed {
        opacity: 1;
        transform: translateY(0);
      }
      .dd-reveal-left {
        opacity: 0;
        transform: translateX(-30px);
        transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                    transform 0.7s cubic-bezier(0.22,1,0.36,1);
      }
      .dd-reveal-left.dd-revealed {
        opacity: 1;
        transform: translateX(0);
      }
      .dd-reveal-scale {
        opacity: 0;
        transform: scale(0.94);
        transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1);
      }
      .dd-reveal-scale.dd-revealed {
        opacity: 1;
        transform: scale(1);
      }
      .dd-gold-line {
        display: block;
        height: 2px;
        background: var(--ceylon-gold);
        width: 0;
        transition: width 0.7s cubic-bezier(0.22,1,0.36,1);
        margin-top: 10px;
        border-radius: 1px;
      }
      .dd-gold-line.dd-revealed { width: 3rem; }
      .stat-pill-border { border-right: 1px solid rgba(255,255,255,0.08); }
    `;
    document.head.appendChild(el);
    return () => { }; // keep style for page lifetime
  }, []);
  return null;
}

// ─── SCROLL REVEAL HOOK ───────────────────────────────────────────────────────
function useReveal(delay = 0, variant = "dd-reveal") {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (delay) el.style.transitionDelay = `${delay}ms`;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("dd-revealed");
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    el.classList.add(variant);
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, variant]);
  return ref;
}

// Reveal wrapper component — wraps any block
function Reveal({ children, delay = 0, variant = "dd-reveal", as: Tag = "div", className = "", style = {} }) {
  const ref = useReveal(delay, variant);
  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ d }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 320),
      setTimeout(() => setPhase(3), 520),
      setTimeout(() => setPhase(4), 700),
      setTimeout(() => setPhase(5), 850),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const fadeUp = (active, extra = {}) => ({
    opacity: active ? 1 : 0,
    transform: active ? "translateY(0)" : "translateY(22px)",
    transition: "opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)",
    ...extra,
  });

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(420px, 60vw, 620px)" }}
    >
      <img
        src={d.image}
        alt={`${d.name} Sri Lanka — ${d.tagline || "destination travel guide"}`}
        fetchpriority="high"
        width="1920"
        height="620"
        className="absolute inset-0 h-full w-full object-cover dd-hero-img"
        style={{ objectPosition: "center 30%", transformOrigin: "center center" }}
      />

      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,22,14,0.72) 0%, rgba(10,22,14,0.38) 40%, rgba(10,22,14,0.92) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end text-center">
        <div className="w-full px-4 pb-0 sm:px-6">
          <div className="mx-auto mb-6 flex max-w-3xl flex-col items-center gap-3 sm:mb-8">

            {d.unesco && (
              <span
                style={{
                  ...fadeUp(phase >= 1),
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  borderRadius: "9999px",
                  padding: "0.375rem 1rem",
                  fontSize: "0.7rem",
                  fontFamily: "var(--font-accent, sans-serif)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  background: "rgba(212,174,97,0.22)",
                  border: `1px solid ${C.goldBorder}`,
                  color: C.gold,
                  backdropFilter: "blur(6px)",
                }}
              >
                <Award size={12} aria-hidden="true" />
                UNESCO World Heritage
              </span>
            )}

            <h1
              className="font-display font-light"
              style={{
                ...fadeUp(phase >= 2),
                color: C.onDark,
                fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
                lineHeight: 1.08,
                textShadow: "0 2px 16px rgba(0,0,0,0.40)",
              }}
            >
              {d.name}
            </h1>

            <p
              className="font-display italic"
              style={{
                ...fadeUp(phase >= 3),
                color: C.onDarkSub,
                fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                textShadow: "0 1px 6px rgba(0,0,0,0.3)",
              }}
            >
              {d.tagline}
            </p>

            <span
              className="rounded-full px-3 py-1 font-accent text-xs uppercase tracking-widest"
              style={{
                ...fadeUp(phase >= 4),
                background: "rgba(255,255,255,0.16)",
                color: C.onDarkSub,
              }}
            >
              {d.region}
            </span>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="w-full"
          style={{
            ...fadeUp(phase >= 5, { transform: phase >= 5 ? "translateY(0)" : "translateY(100%)" }),
            background: "rgba(10,22,15,0.92)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div className="mx-auto grid max-w-4xl grid-cols-2 sm:grid-cols-4">
            <StatPill icon={<MapPin size={15} />} label="Region" value={d.region} border />
            <StatPill icon={<Calendar size={15} />} label="Best Time" value={d.bestTime} border />
            <StatPill icon={<Award size={15} />} label="UNESCO" value={d.unesco ? "Heritage Site" : "Not Listed"} border />
            <StatPill icon={<Activity size={15} />} label="Activities" value={`${(d.activities || []).length} Experiences`} />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatPill({ icon, label, value, border }) {
  return (
    <div
      className={`flex flex-col items-center gap-1 px-3 py-4 text-center sm:px-4${border ? " stat-pill-border" : ""}`}
    >
      <span className="flex items-center gap-1.5 font-accent text-[10px] uppercase tracking-widest" style={{ color: C.onDarkMuted }}>
        <span style={{ color: C.gold }}>{icon}</span>
        {label}
      </span>
      <span className="text-sm font-semibold leading-tight" style={{ color: C.onDark }}>
        {value}
      </span>
    </div>
  );
}

// ─── OVERVIEW ─────────────────────────────────────────────────────────────────
function Overview({ d }) {
  return (
    <section className="bg-[var(--ivory-white)] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-14">

          <Reveal>
            <div>
              <span className="mb-2 block font-accent text-xs uppercase tracking-widest" style={{ color: C.gold }}>
                About {d.name}
              </span>
              <span className="dd-gold-line dd-revealed" style={{ width: "3rem" }} />
              <p
                className="mt-5 font-display font-light leading-relaxed"
                style={{ color: C.textDark, fontSize: "clamp(1.05rem, 2vw, 1.2rem)" }}
              >
                {d.description}
              </p>
            </div>
          </Reveal>

          {d.highlights && d.highlights.length > 0 && (
            <Reveal delay={120} variant="dd-reveal-left">
              <aside className="rounded-2xl p-5 sm:p-6" style={{ background: "#f0ebe2", border: "1px solid rgba(0,0,0,0.08)" }}>
                <h3 className="mb-4 font-accent text-xs uppercase tracking-widest" style={{ color: C.gold }}>
                  Key Highlights
                </h3>
                <ul className="space-y-3">
                  {d.highlights.map((h, i) => (
                    <Reveal key={i} delay={i * 80} as="li" className="flex items-start gap-3">
                      <CheckCircle2 size={17} aria-hidden="true" className="mt-0.5 flex-shrink-0" style={{ color: C.gold }} />
                      <span className="text-sm leading-snug" style={{ color: C.textDark }}>{h}</span>
                    </Reveal>
                  ))}
                </ul>
              </aside>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── UNMISSABLE MOMENT ────────────────────────────────────────────────────────
function BestMoment({ d }) {
  if (!d.bestMoment) return null;

  // Animate the floating glow orbs
  const glowStyle = (x, y, delay) => ({
    position: "absolute",
    width: "40%",
    paddingBottom: "40%",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(212,174,97,0.10) 0%, transparent 70%)",
    left: x,
    top: y,
    transform: "translate(-50%, -50%)",
    animation: `floatGlow 6s ease-in-out ${delay}s infinite`,
    pointerEvents: "none",
  });

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{ background: C.jungle }}
    >
      <div style={glowStyle("15%", "85%", 0)} />
      <div style={glowStyle("85%", "20%", 3)} />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">

        {/* Label row */}
        <Reveal>
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px flex-1" style={{ background: C.goldBorder }} />
            <Sparkles size={15} aria-hidden="true" style={{ color: C.gold }} />
            <span className="font-accent text-[10px] uppercase tracking-[0.22em]" style={{ color: C.gold }}>
              The Unmissable Moment
            </span>
            <Sparkles size={15} aria-hidden="true" style={{ color: C.gold }} />
            <div className="h-px flex-1" style={{ background: C.goldBorder }} />
          </div>
        </Reveal>

        {/* Quote mark — scale-in */}
        <Reveal variant="dd-reveal-scale" delay={150}>
          <div
            aria-hidden="true"
            className="font-display select-none leading-none"
            style={{ fontSize: "clamp(5rem, 10vw, 8rem)", lineHeight: 0.65, color: "rgba(212,174,97,0.14)" }}
          >
            "
          </div>
        </Reveal>

        {/* Quote text */}
        <Reveal delay={250}>
          <p
            className="font-display relative z-10 mt-2 font-light italic leading-relaxed"
            style={{ color: C.onDark, fontSize: "clamp(1rem, 2.2vw, 1.2rem)" }}
          >
            {d.bestMoment}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── DESTINATION GALLERY CAROUSEL ────────────────────────────────────────────
function DestinationGallery({ d }) {
  const gallery = d.gallery;
  if (!gallery || gallery.length === 0) return null;

  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const posRef = useRef(0);
  const snapTimerRef = useRef(null);
  const touchRef = useRef({ startX: 0, deltaX: 0, dragging: false });
  const [position, setPosition] = useState(0);
  const [perView, setPerView] = useState(3);
  const [swipeOff, setSwipeOff] = useState(0);
  const [noTrans, setNoTrans] = useState(false);
  const [cw, setCw] = useState(0);
  const total = gallery.length;
  const gap = 12;

  useEffect(() => {
    const f = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);

  const measure = useCallback(() => {
    if (!trackRef.current) return;
    const cs = getComputedStyle(trackRef.current);
    setCw(trackRef.current.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight));
  }, []);

  useLayoutEffect(() => { measure(); }, [measure]);

  useEffect(() => {
    if (!trackRef.current) return;
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const items = [...gallery.slice(-perView), ...gallery, ...gallery.slice(0, perView)];
  const offset = perView;
  const totalGap = (perView - 1) * gap;
  const itemW = cw > 0 ? ((cw - totalGap) / perView) : 0;
  const itemStep = cw > 0 ? ((cw + gap) / perView) : 0;

  const go = (dir) => {
    const next = posRef.current + dir;
    posRef.current = next;
    setPosition(next);
  };

  const goNext = () => go(1);
  const goPrev = () => go(-1);

  const goNextRef = useRef(goNext);
  const goPrevRef = useRef(goPrev);
  goNextRef.current = goNext;
  goPrevRef.current = goPrev;

  const doSnap = () => {
    const p = posRef.current;
    if (p >= total) {
      posRef.current = p - total;
      setNoTrans(true);
      setPosition(p - total);
    } else if (p < 0) {
      posRef.current = p + total;
      setNoTrans(true);
      setPosition(p + total);
    }
  };

  useEffect(() => {
    if (noTrans) {
      requestAnimationFrame(() => requestAnimationFrame(() => setNoTrans(false)));
    }
  }, [noTrans]);

  const pause = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (snapTimerRef.current) { clearTimeout(snapTimerRef.current); snapTimerRef.current = null; }
  };

  const resume = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => { goNextRef.current(); }, 4000);
  };

  useEffect(() => {
    resume();
    return () => { pause(); };
  }, [perView]);

  useEffect(() => {
    snapTimerRef.current = setTimeout(doSnap, 500);
    return () => { if (snapTimerRef.current) clearTimeout(snapTimerRef.current); };
  }, [position]);

  const onTouchStart = (e) => {
    pause();
    touchRef.current = { startX: e.touches[0].clientX, deltaX: 0, dragging: true };
  };

  const onTouchMove = (e) => {
    if (!touchRef.current.dragging) return;
    const d = e.touches[0].clientX - touchRef.current.startX;
    touchRef.current.deltaX = d;
    setSwipeOff(d);
  };

  const onTouchEnd = () => {
    const d = touchRef.current.deltaX;
    touchRef.current.dragging = false;
    setSwipeOff(0);
    if (Math.abs(d) > 50) {
      d > 0 ? goPrevRef.current() : goNextRef.current();
    }
    resume();
  };

  const visIdx = position + offset;
  const txPx = -(visIdx * itemStep) + (swipeOff || 0);

  return (
    <section style={{ background: "#fff", overflow: "hidden", paddingBottom: "3.5rem" }}>

      <Reveal>
        <div
          className="mx-auto max-w-5xl px-4 sm:px-6"
          style={{ paddingTop: "3rem", paddingBottom: "1.25rem",
                   display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}
        >
          <SectionHeader label="Photo Gallery" title={`${d.name} in`} accent="Pictures" />
        </div>
      </Reveal>

      <div
        ref={trackRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseEnter={pause}
        onMouseLeave={resume}
        style={{
          display: "flex",
          overflow: "hidden",
          padding: "0 clamp(16px, 4vw, 64px)",
          cursor: "grab",
          userSelect: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            transform: `translateX(${txPx}px)`,
            transition: noTrans || swipeOff
              ? "none"
              : "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
            willChange: "transform",
          }}
        >
          {items.map((img, i) => (
            <div
              key={i}
              style={{
                flex: cw ? `0 0 ${itemW}px` : `0 0 ${100/perView}%`,
                borderRadius: 12,
                overflow: "hidden",
                position: "relative",
                height: "clamp(190px, 26vw, 270px)",
                background: "#e8ede9",
                flexShrink: 0,
              }}
            >
              <img
                src={img.src}
                alt={img.caption || `${d.name} photo`}
                loading="lazy"
                draggable={false}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  transition: "transform .5s cubic-bezier(0.22,1,0.36,1)",
                  display: "block",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              />
              {img.caption && (
                <div
                  style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "20px 14px 12px",
                    background: "linear-gradient(to top, rgba(10,22,14,0.78) 0%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-accent, sans-serif)",
                      fontSize: "0.68rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.82)",
                    }}
                  >
                    {img.caption}
                  </span>
                </div>
              )}
              <div
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  height: 2,
                  background: `linear-gradient(to right, ${C.gold}, transparent)`,
                  opacity: 0.7,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          marginTop: "1rem",
        }}
      >
        {gallery.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              pause();
              const diff = i - ((posRef.current % total) + total) % total;
              go(diff);
              setTimeout(resume, 500);
            }}
            aria-label={`Go to image ${i + 1}`}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              border: "none",
              padding: 0,
              cursor: "pointer",
              background: ((position % total) + total) % total === i ? C.gold : "#ddd8ce",
              transition: "background 0.3s ease",
              flexShrink: 0,
            }}
          />
        ))}
      </div>

    </section>
  );
}

// ─── MUST-DO ──────────────────────────────────────────────────────────────────
function MustDo({ d }) {
  if (!d.mustDo || d.mustDo.length === 0) return null;
  return (
    <section className="bg-[var(--ivory-white)] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader label="Experiences" title="Must-Do in" accent={d.name} />
        </Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
          {d.mustDo.map((item, i) => (
            <Reveal key={i} delay={i * 70}>
              <div
                className="dd-card-hover flex items-start gap-4 rounded-xl p-4 sm:p-5 h-full"
                style={{ background: "white", border: "1px solid #ddd8ce", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
              >
                <span
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-accent text-xs font-bold text-white"
                  style={{ background: C.gold, minWidth: "2rem" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: C.textDark }}>{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PLACES TO VISIT ──────────────────────────────────────────────────────────
function PlacesToVisit({ d }) {
  if (!d.placesToVisit || d.placesToVisit.length === 0) return null;
  return (
    <section className="py-12 sm:py-16 lg:py-20" style={{ background: "#ede8df" }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader label="Explore" title="Places to Visit" />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {d.placesToVisit.map((place, i) => (
            <Reveal key={i} delay={i * 60}>
              <div
                className="dd-place-card rounded-xl p-5 h-full"
                style={{ background: "white", border: "1px solid #ccc8bf" }}
              >
                <div className="mb-3 flex items-start gap-2.5">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full" style={{ background: C.gold }} />
                  <h3 className="font-semibold leading-tight" style={{ color: C.textDark, fontSize: "0.95rem" }}>
                    {place.name}
                  </h3>
                </div>
                <p className="pl-4 text-sm leading-relaxed" style={{ color: C.textMid }}>
                  {place.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ACTIVITIES ───────────────────────────────────────────────────────────────
function Activities({ d }) {
  if (!d.activities || d.activities.length === 0) return null;
  return (
    <section className="bg-[var(--ivory-white)] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader label="What You'll Do" title="Activities & Experiences" />
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 flex flex-wrap gap-2.5 sm:gap-3">
            {d.activities.map((act, i) => (
              <span
                key={i}
                className="dd-pill-hover inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium"
                style={{
                  background: "white",
                  border: "1px solid #c8c3ba",
                  color: C.textDark,
                  cursor: "default",
                  animationDelay: `${i * 40}ms`,
                }}
              >
                <Star size={11} aria-hidden="true" style={{ color: C.gold, flexShrink: 0 }} />
                {act}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── LOCAL TIP ────────────────────────────────────────────────────────────────
function LocalTip({ d }) {
  if (!d.localTip) return null;
  return (
    <section className="bg-[var(--ivory-white)] pb-12 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal variant="dd-reveal-left">
          <div
            className="flex flex-col gap-5 rounded-2xl p-5 sm:flex-row sm:gap-6 sm:p-8"
            style={{
              background: "white",
              borderLeft: `4px solid ${C.gold}`,
              boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
              transition: "box-shadow 0.3s ease",
            }}
          >
            <div className="flex-shrink-0">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: C.goldBg, border: `1px solid ${C.goldBorder}` }}
              >
                <Compass size={22} aria-hidden="true" style={{ color: C.gold }} />
              </div>
            </div>
            <div>
              <span className="mb-2 block font-accent text-[10px] uppercase tracking-widest" style={{ color: C.gold }}>
                Local Insider Tip
              </span>
              <p
                className="font-display font-light italic leading-relaxed"
                style={{ color: C.textDark, fontSize: "clamp(1rem, 2vw, 1.08rem)" }}
              >
                {d.localTip}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── DEST TOUR CARD ───────────────────────────────────────────────────────────
// Self-contained card used only inside DestinationDetail so we can guarantee
// h-full flex-col propagation without touching the shared TourCard component.
function DestTourCard({ tour }) {
  const nights = tour.nights ?? tour.duration - 1;
  return (
    <Link
      to={`/tours/${tour.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white"
      style={{
        border: "1px solid #ddd8ce",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        transition: "transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 28px rgba(15,30,20,0.12)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)";
      }}
    >
      {/* Fixed-height image — identical across every card */}
      <div className="relative h-44 flex-shrink-0 overflow-hidden">
        <img
          src={tour.coverImage}
          alt={`${tour.title} — Sri Lanka tour`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          width="400"
          height="176"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(8,22,14,0.55) 0%, transparent 60%)" }}
        />
        <span
          className="absolute right-3 top-3 rounded-full px-2.5 py-1 font-accent text-[9px] font-semibold uppercase tracking-wider text-white"
          style={{ background: C.gold }}
        >
          {tour.duration} Days · {nights} Nights
        </span>
        {tour.categoryDisplay && (
          <span
            className="absolute bottom-3 left-3 font-accent text-[9px] uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.80)" }}
          >
            {tour.categoryDisplay}
          </span>
        )}
      </div>

      {/* Body — flex-1 + flex-col so spacer can push CTA to bottom */}
      <div className="flex flex-1 flex-col p-5">
        <h3
          className="font-display font-light leading-snug"
          style={{ color: C.textDark, fontSize: "1.05rem" }}
        >
          {tour.titleMain || tour.title}
          {tour.titleAccent && (
            <em className="not-italic" style={{ color: C.gold }}> {tour.titleAccent}</em>
          )}
        </h3>

        {/* Max 2 pills keeps row height uniform */}
        {tour.highlights && tour.highlights.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tour.highlights.slice(0, 2).map((h) => (
              <span
                key={h}
                className="rounded-full px-2.5 py-0.5 font-accent text-[9px] uppercase tracking-wider"
                style={{ background: "#f0ebe2", border: "1px solid #ddd8ce", color: C.textMid }}
              >
                {h}
              </span>
            ))}
          </div>
        )}

        {/* Spacer — pushes CTA to bottom regardless of content length */}
        <div className="flex-1" />

        {/* CTA always pinned to card bottom */}
        <div
          className="mt-4 flex items-center gap-1.5 border-t pt-4 font-accent text-xs uppercase tracking-wider"
          style={{ borderColor: "#ede8df", color: C.gold }}
        >
          Explore This Tour
          <ChevronRight size={13} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

// ─── MATCHING TOURS ───────────────────────────────────────────────────────────
function MatchingTours({ tours: matchingTours, destName }) {
  if (!matchingTours || matchingTours.length === 0) return null;
  return (
    <section className="py-12 sm:py-16 lg:py-20" style={{ background: "#ede8df" }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-0">
            <SectionHeader label="Curated Itineraries" title={`Tours including ${destName}`} />
            <Link
              to="/tours"
              className="inline-flex items-center gap-1.5 self-start font-accent text-xs uppercase tracking-wider sm:self-auto"
              style={{ color: C.gold, transition: "opacity 0.2s ease" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.65")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              View All Tours <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        {/*
          Equal-height chain:
          grid (align-items:stretch) → Reveal (flex flex-col) →
          DestTourCard Link (h-full flex flex-col) → body (flex-1 flex-col) →
          spacer (flex-1) → CTA pinned at bottom
        */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {matchingTours.slice(0, 4).map((tour, i) => (
            <Reveal key={tour.slug} delay={i * 80} className="flex flex-col">
              <DestTourCard tour={tour} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA BLOCK ────────────────────────────────────────────────────────────────
function CTABlock({ d }) {
  return (
    <section className="bg-[var(--ivory-white)] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">

        {/* CTA banner */}
        <Reveal variant="dd-reveal-scale">
          <div
            className="relative overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12"
            style={{ background: C.jungle }}
          >
            {/* Animated gold glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 55% 70% at 75% 50%, rgba(212,174,97,0.13), transparent 65%)",
              }}
            />
            {/* Subtle top border accent */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(212,174,97,0.5), transparent)" }}
            />

            <div className="relative z-10">
              <span className="mb-3 block font-accent text-[10px] uppercase tracking-[0.22em]" style={{ color: C.gold }}>
                Ready to go?
              </span>
              <h3
                className="mb-3 font-display font-light"
                style={{ color: C.onDark, fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
              >
                Add {d.name} to Your Itinerary
              </h3>
              <p
                className="mx-auto mb-8 max-w-md text-sm leading-relaxed"
                style={{ color: C.onDarkSub }}
              >
                Our private guides craft every journey around your pace, interests, and travel style.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  to="/contact"
                  className="dd-btn-primary w-full rounded-full px-8 py-3.5 font-accent text-xs uppercase tracking-wider text-white sm:w-auto"
                  style={{ background: C.gold }}
                >
                  Plan My Trip →
                </Link>
                <a
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "94763300443"}?text=${encodeURIComponent(`Hi Vishva! I'm interested in ${d.name} — can you tell me more about tours here?`)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => trackWhatsAppClick(d.name, "destination_cta")}
                  className="w-full rounded-full px-8 py-3.5 font-accent text-xs uppercase tracking-wider sm:w-auto inline-flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "#25D366",
                    color: "#fff",
                    border: "none",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#20ba56"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#25D366"; }}
                >
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionHeader({ label, title, accent }) {
  return (
    <div>
      {label && (
        <span className="mb-2 block font-accent text-xs uppercase tracking-widest" style={{ color: C.gold }}>
          {label}
        </span>
      )}
      <h2
        className="font-display font-light"
        style={{ color: C.textDark, fontSize: "clamp(1.75rem, 4vw, 2.4rem)", lineHeight: 1.2 }}
      >
        {title}
        {accent && (
          <em className="not-italic" style={{ color: C.gold }}> {accent}</em>
        )}
      </h2>
    </div>
  );
}

// ─── NOT FOUND ────────────────────────────────────────────────────────────────
function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
      <div>
        <h1 className="font-display font-light" style={{ color: C.textDark, fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>
          Destination not found
        </h1>
        <p className="mt-3 text-sm" style={{ color: C.textMuted }}>
          The destination you're looking for doesn't exist.
        </p>
        <Link
          to="/destinations"
          className="mt-6 inline-flex items-center gap-2 font-accent text-xs uppercase tracking-wider"
          style={{ color: C.gold }}
        >
          ← Back to Destinations
        </Link>
      </div>
    </div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function DestinationDetail() {
  const { slug } = useParams();
  const d = destinations.find((x) => x.slug === slug);

  const matchingTours = d
    ? tours.filter((t) =>
      t.route?.some((stop) => {
        const sl = stop.toLowerCase(), nl = d.name.toLowerCase();
        return sl.includes(nl) || nl.includes(sl);
      })
    )
    : [];

  if (!d) return <NotFound />;

  useEffect(() => {
    trackDestinationView(d.slug, d.name);
  }, [d.slug, d.name]);

  const destDescription = d.intro || d.description || "";
  const truncDest = (text, maxLen) => {
    if (!text || text.length <= maxLen) return text;
    const truncated = text.slice(0, maxLen);
    const lastSpace = truncated.lastIndexOf(" ");
    return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + "...";
  };

  const destBreadcrumb = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lankatoursdirect.com" },
      { "@type": "ListItem", "position": 2, "name": "Destinations", "item": "https://lankatoursdirect.com/destinations" },
      { "@type": "ListItem", "position": 3, "name": d.name, "item": `https://lankatoursdirect.com/destinations/${d.slug}` },
    ],
  };

  const touristDestSchema = {
    "@type": "TouristDestination",
    "name": `${d.name}, Sri Lanka`,
    "description": destDescription,
    "url": `https://lankatoursdirect.com/destinations/${d.slug}`,
    "touristType": ["leisure", "cultural", "adventure"],
    "containedInPlace": {
      "@type": "Country",
      "name": "Sri Lanka",
      "url": "https://en.wikipedia.org/wiki/Sri_Lanka",
    },
    ...(d.unesco ? { "award": "UNESCO World Heritage Site" } : {}),
  };

  const destSchema = {
    "@context": "https://schema.org",
    "@graph": [touristDestSchema, destBreadcrumb],
  };

  return (
    <>
      <SEO
        title={`${d.name} Travel Guide — Sri Lanka Tours & Things to Do`}
        description={`Discover ${d.name}, Sri Lanka. ${truncDest(destDescription, 100)} Private guided tours from Lanka Tours Direct.`}
        canonical={`https://lankatoursdirect.com/destinations/${d.slug}`}
        ogImage={d.image}
        ogType="article"
        schema={destSchema}
        preloadImage={d.image}
      />
      <GlobalAnimStyles />
      <Hero d={d} />
      <div className="mx-auto mt-4 max-w-5xl px-4 sm:px-6 md:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Destinations", href: "/destinations" },
            { label: d.name, href: null },
          ]}
        />
      </div>
      <Overview d={d} />
      <BestMoment d={d} />
      <DestinationGallery d={d} />
      <MustDo d={d} />
      <PlacesToVisit d={d} />
      <Activities d={d} />
      <LocalTip d={d} />
      <MatchingTours tours={matchingTours} destName={d.name} />
      <CTABlock d={d} />
    </>
  );
}