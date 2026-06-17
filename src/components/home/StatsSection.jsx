import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { Globe2, Star, MapPin, Calendar } from "lucide-react";

const stats = [
  { icon: Globe2, value: 150, suffix: "+", label: "Happy Travellers" },
  { icon: Star, value: 4.9, decimals: 1, suffix: "/5", label: "Average Rating" },
  { icon: MapPin, value: 50, suffix: "+", label: "Destinations Covered" },
  { icon: Calendar, value: 7, suffix: "+", label: "Years Experience" },
];

export function StatsSection() {
  return (
    <section className="bg-[var(--cream-parchment)] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-2">
              <s.icon className="mx-auto text-[var(--ceylon-gold)] mb-4" size={32} />
              <div className="font-display text-4xl font-semibold text-[var(--ceylon-gold)] sm:text-5xl md:text-6xl lg:text-7xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </div>
              <div className="mt-3 font-accent text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs md:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
