import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import sigiriya from "@/assets/images/features/sigiriya.webp";
import ellaTrain from "@/assets/images/features/ella-train.webp";
import leopard from "@/assets/images/features/leopard.webp";
import mirissa from "@/assets/images/features/mirissa.webp";
import teaPlantation from "@/assets/images/features/tea-plntation.webp";
import galleFort from "@/assets/images/features/galle-fort.webp";
import trainRide from "@/assets/images/features/train-ride.webp";

const slides = [sigiriya, ellaTrain, leopard, mirissa, teaPlantation, galleFort, trainRide];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((src, idx) => (
        <div
          key={src}
          aria-hidden={idx !== i}
          className="absolute inset-0 transition-opacity duration-[1500ms]"
          style={{ opacity: idx === i ? 1 : 0 }}
        >
          <img
            src={src}
            alt=""
            role="presentation"
            className="h-full w-full object-cover object-center"
            loading={idx === 0 ? "eager" : "lazy"}
            fetchpriority={idx === 0 ? "high" : "low"}
            style={{
              filter: "brightness(1.05) contrast(1.05) saturate(1.1) hue-rotate(-5deg)",
              transform: "scale(1.05)",
            }}
          />
        </div>
      ))}

      {/* Cinematic Jungle Veil */}
      <div className="absolute inset-0 z-10 bg-[var(--jungle-deep)]/50" />

      {/* Smarter Multi-Zone Overlay */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background: `
          linear-gradient(to bottom, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0) 30%),
          radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%),
          linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 40%)
        `,
        }}
      />

      <div className="relative z-30 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <div className="flex flex-col items-center justify-center pt-10">
          <div className="animate-float-up">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-black/30 px-6 py-2.5 backdrop-blur-xl">
              <span 
                className="label-eyebrow text-[var(--ceylon-gold)]"
                style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.5)" }}
              >
                Sri Lanka Private Tours
              </span>
            </div>
          </div>
          <h1
            className="mt-5 max-w-5xl animate-float-up delay-100 text-5xl font-light leading-[1.05] md:text-7xl lg:text-[80px]"
            style={{
              color: "white",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.75), 0 4px 24px rgba(0, 0, 0, 0.5)",
            }}
          >
            Your Sri Lanka.
            <br />
            Perfectly Personal.
          </h1>
          <p
            className="mt-6 max-w-2xl animate-float-up delay-200 text-lg font-medium text-white/95 md:text-xl"
            style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.9), 0 2px 12px rgba(0, 0, 0, 0.7)" }}
          >
            Private guided experiences across the Pearl of the Indian Ocean — crafted just for you.
          </p>
          <div className="mt-10 flex animate-float-up delay-300 flex-col gap-4 sm:flex-row">
            <a
              href="#contact-cta"
              className="rounded-lg bg-[var(--ceylon-gold)] px-10 py-4 font-accent text-sm uppercase tracking-wider text-white shadow-gold transition-all hover:scale-105 hover:bg-[var(--ceylon-gold-deep)]"
            >
              Plan My Journey
            </a>
            <Link
              to="/tours"
              className="rounded-lg border-2 border-white/70 bg-black/25 backdrop-blur-md px-10 py-4 font-accent text-sm uppercase tracking-wider text-white transition-all hover:bg-white/15"
            >
              See Tour Packages
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
