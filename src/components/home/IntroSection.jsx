import { Link } from "react-router-dom";
import { Target, Car, MessageCircle, ArrowRight } from "lucide-react";

export function IntroSection() {
  return (
    <section className="bg-[var(--ivory-white)] py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <div className="reveal relative">
          <div className="absolute -bottom-3 -right-3 h-full w-full rounded-xl border-4 border-[var(--ceylon-gold)]" />
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
            alt="Your guide Vishwa"
            className="relative h-[540px] w-full rounded-xl object-cover shadow-card"
          />
        </div>

        <div className="reveal">
          <div className="label-eyebrow">Your Guide</div>
          <h2 className="mt-4 text-4xl font-semibold md:text-5xl">A Local Voice. A Personal Journey.</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            I'm Vishwa, born and raised in Sri Lanka. For over 7 years I've been showing travellers the Sri Lanka that
            guidebooks miss — hidden waterfalls, family-run restaurants, secret sunrise viewpoints, and
            once-in-a-lifetime wildlife moments.
          </p>

          <div className="mt-8 space-y-5">
            {[
              { icon: Target, title: "Fully Personalised", body: "Your pace, your interests, your itinerary" },
              { icon: Car, title: "Comfortable AC Vehicle", body: "Door-to-door service, flexible stops anytime" },
              { icon: MessageCircle, title: "Always Reachable", body: "WhatsApp, email, phone — I respond within the hour" },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--cream-parchment)]">
                  <Icon className="text-[var(--ceylon-gold)]" size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{title}</h4>
                  <p className="text-sm text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 font-accent text-sm uppercase tracking-wider text-[var(--spice-terracotta)] hover:text-[var(--ceylon-gold)]"
          >
            Read My Full Story <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

