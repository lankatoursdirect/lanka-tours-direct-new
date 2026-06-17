import { useEffect, useState } from "react";
import logo from "@/assets/images/shared/logo-last.png";

const TRAVEL_TAGLINES = [
  "Preparing your paradise escape...",
  "Designing bespoke private routes...",
  "Gathering Sri Lanka tour guides...",
  "Crafting your perfect itinerary...",
];

export function Preloader({ onComplete }) {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Cycle through engaging travel taglines
  useEffect(() => {
    const taglineInterval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TRAVEL_TAGLINES.length);
    }, 1500);
    return () => clearInterval(taglineInterval);
  }, []);

  // Simulate premium asset load progress
  useEffect(() => {
    let exitTimer1 = null;
    let exitTimer2 = null;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Start the exiting fade transition
          exitTimer1 = setTimeout(() => {
            setIsExiting(true);
            // Notify parent to unmount after animation completes
            exitTimer2 = setTimeout(() => {
              onComplete?.();
            }, 800);
          }, 400);
          return 100;
        }
        // Smooth random progression steps
        const step = Math.floor(Math.random() * 15) + 10;
        return Math.min(prev + step, 100);
      });
    }, 180);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer1);
      clearTimeout(exitTimer2);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[hsl(20_30%_5%)] transition-all duration-700 cubic-bezier(0.85, 0, 0.15, 1) ${
        isExiting ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      {/* Radial jungle-glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--jungle-deep)_0%,hsl(20_30%_4%)_70%)] opacity-85" />

      {/* Decorative Golden Arcs / Constellations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full border border-[var(--ceylon-gold)]/10 animate-spin" style={{ animationDuration: '30s' }} />
        <div className="absolute -bottom-[20%] -right-[20%] w-[60%] h-[60%] rounded-full border border-[var(--ceylon-gold)]/5 animate-spin" style={{ animationDuration: '65s', animationDirection: 'reverse' }} />
      </div>

      <div className="relative flex flex-col items-center max-w-md px-6 text-center">
        {/* Breathing logo container */}
        <div className="relative mb-12 flex h-32 w-32 items-center justify-center">
          {/* Glimmer/Glow backdrop */}
          <div className="absolute inset-0 rounded-full bg-[var(--ceylon-gold)]/10 blur-xl animate-pulse" />

          {/* Golden animated loading spinner ring */}
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              className="stroke-[var(--ceylon-gold)]/10 fill-none"
              strokeWidth="2.5"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              className="stroke-[var(--ceylon-gold)] fill-none transition-all duration-300 ease-out"
              strokeWidth="2.5"
              strokeDasharray={289}
              strokeDashoffset={289 - (289 * progress) / 100}
              strokeLinecap="round"
            />
          </svg>

          {/* Logo brand photo/vector */}
          <img
            src={logo}
            alt="Lanka Tours Direct Logo"
            className="relative z-10 max-h-[85px] max-w-[85px] object-contain animate-float"
            style={{ animationDuration: '4s' }}
          />
        </div>

        {/* Elegant Ceylon Gold brand identifier */}
        <h2 className="font-display text-2xl tracking-widest text-[var(--ceylon-gold)] uppercase animate-pulse">
          Lanka Tours Direct
        </h2>

        <div className="mt-3 h-[1px] w-12 bg-gradient-to-r from-transparent via-[var(--ceylon-gold)]/60 to-transparent" />

        {/* Taglines that cycle dynamically */}
        <div className="mt-6 h-8 overflow-hidden">
          <p className="font-accent text-xs uppercase tracking-[0.2em] text-white/50 animate-fade-in transition-all duration-500">
            {TRAVEL_TAGLINES[taglineIndex]}
          </p>
        </div>

        {/* Minimal percentage progress indicator */}
        <div className="mt-8 flex items-center gap-3">
          <div className="h-1 w-32 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-[var(--ceylon-gold)] to-[var(--ceylon-gold)]/80 transition-all duration-300 ease-out shadow-[0_0_8px_rgba(200,150,62,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-mono text-xs font-bold text-[var(--ceylon-gold)] w-8 text-right">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
