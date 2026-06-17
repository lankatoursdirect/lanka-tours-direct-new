import { Link } from "react-router-dom";
import { SEO } from "@/components/shared/SEO";
import { PageHero } from "@/components/shared/PageHero";
import guidePhoto from "@/assets/images/shared/guide-img.webp";
import frontImg from "@/assets/images/vehicle/front.jpg";
import sideImg from "@/assets/images/vehicle/side.jpg";
import fronSeatsImg from "@/assets/images/vehicle/fron-seats.jpg";
import backSeatsImg from "@/assets/images/vehicle/back-seats.jpg";
import dashboardImg from "@/assets/images/vehicle/dashboard.jpg";
import bootspaceImg from "@/assets/images/vehicle/bootspace.jpg";
import vanImg from "@/assets/images/vehicle/van.webp";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
// Importing cohesive, high-end Lucide icons
import {
  Compass,
  Handshake,
  Heart,
  Check,
  Sunrise,
  UtensilsCrossed,
  Trees,
  Train,
  Users,
  Backpack,
} from "lucide-react";

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Vishva",
  "description": "Expert Sri Lanka chauffeur guide leading private tours across Sigiriya, Ella, Yala, Mirissa and beyond.",
  "jobTitle": "Tour Guide",
  "worksFor": {
    "@type": "TourOperator",
    "name": "Lanka Tours Direct",
    "url": "https://lankatoursdirect.com"
  },
  "url": "https://lankatoursdirect.com/about",
  "sameAs": ["https://www.facebook.com/profile.php?id=61591028990530"],
};

export default function About() {
  // Premium CDN SVG flag references that map perfectly to your countries.js dataset schema
  const flagUK = "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GB.svg";
  const flagLK = "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LK.svg";

  const vehicleImages = [
    { src: frontImg, alt: "Toyota KDH van — front view" },
    { src: sideImg, alt: "Toyota KDH van — side view" },
    { src: fronSeatsImg, alt: "Toyota KDH van — front seats" },
    { src: backSeatsImg, alt: "Toyota KDH van — rear seats" },
    { src: dashboardImg, alt: "Toyota KDH van — dashboard" },
    { src: bootspaceImg, alt: "Toyota KDH van — boot space" },
  ];

  const vanImages = [
    { src: vanImg, alt: "Toyota HiAce High Roof Van — full view" },
  ];

  return (
    <>
      <SEO
        title="Meet Vishva — Expert Private Sri Lanka Guide"
        description="Lanka Tours Direct is led by Vishva, an expert Sri Lanka chauffeur guide. Hundreds of private tours across Sigiriya, Ella, Yala, Mirissa and beyond. Book your bespoke itinerary."
        canonical="https://lankatoursdirect.com/about"
        schema={aboutSchema}
        preloadImage="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920"
      />
      <PageHero
        eyebrow="Your Expert Guide"
        title="A Local Voice for Sri Lanka"
        subtitle="Professional, friendly, and deeply passionate about showing you the authentic side of the island."
        image="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920"
      />

      {/* Guide Story Section */}
      <section className="bg-[var(--ivory-white)] py-20 overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-5 items-center">

          {/* Interactive Image Container with Hover Scaling & Offset Shifts */}
          <div className="reveal lg:col-span-2 group">
            <div className="relative transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border-4 border-[var(--ceylon-gold)] transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:translate-y-2" />
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src={guidePhoto}
                  alt="Professional Guide"
                  className="h-[480px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Core Biography / Experience Details */}
          <div className="reveal lg:col-span-3 space-y-6 text-lg text-muted-foreground animate-fade-in">
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-semibold text-foreground tracking-tight">My Story</h2>
              <img
                src={flagLK}
                alt="Sri Lanka"
                className="h-6 w-auto rounded shadow-md border border-neutral-200 transition-transform duration-300 hover:scale-110"
              />
            </div>

            <p className="leading-relaxed">
              With over <strong>6 years of professional guiding experience</strong> across Sri Lanka, I specialize in crafting seamless, deeply enriching travel experiences. My approach blends absolute structural professionalism with a warm, friendly hospitality to ensure you feel secure, informed, and completely immersed in our island's rich heritage.
            </p>
            <p className="leading-relaxed">
              Since establishing my career in hospitality and tourism, I have had the privilege of managing custom itineraries and transport operations for over 150 international travelers from all corners of the globe.
            </p>
            <p className="leading-relaxed">
              I know Sri Lanka's rhythms intimately — when the elephants gather at Minneriya, the exact morning light that hits Sigiriya rock fortress, and which authentic local kitchens serve the most refined traditional culinary plates.
            </p>
            <p className="leading-relaxed">
              Every journey is handled with meticulous care, focusing on flexible scheduling, premier safety standards, and providing you with an unforgettable insider perspective of the country.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars / Values Section with Dynamic Floating Card Effects */}
      <section className="bg-[var(--cream-parchment)] py-20 border-y border-neutral-200/40">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Compass className="h-7 w-7 text-[var(--ceylon-gold)] transition-transform duration-500 group-hover:rotate-45" />,
                title: "Authenticity",
                body: "I show you the real Sri Lanka, not the tourist Sri Lanka"
              },
              {
                icon: <Handshake className="h-7 w-7 text-[var(--ceylon-gold)] transition-transform duration-300 group-hover:scale-110" />,
                title: "Flexibility",
                body: "Your itinerary bends to your energy and curiosity, always"
              },
              {
                icon: <Heart className="h-7 w-7 text-[var(--ceylon-gold)] transition-transform duration-300 group-hover:scale-120" />,
                title: "Genuine Care",
                body: "Your safety, comfort, and joy are my responsibility"
              },
            ].map((p) => (
              <div
                key={p.title}
                className="group rounded-2xl bg-card p-8 text-center border border-neutral-100 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--ceylon-gold)]/10 transition-colors duration-300 group-hover:bg-[var(--ceylon-gold)]/20">
                  {p.icon}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-foreground tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Vehicle & Languages Logistics Section */}
      <section className="bg-[var(--ivory-white)] py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">

          {/* Vehicle Image Carousel */}
          <div className="reveal overflow-hidden rounded-2xl shadow-lg border border-neutral-200/60">
            <Carousel
              className="w-full"
              opts={{ loop: true }}
              plugins={[
                Autoplay({ delay: 4000, stopOnInteraction: true }),
              ]}
            >
              <CarouselContent>
                {vehicleImages.map((img, i) => (
                  <CarouselItem key={i}>
                    <div className="h-[420px] w-full overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3 bg-white/80 hover:bg-white text-foreground border-none shadow-md" />
              <CarouselNext className="right-3 bg-white/80 hover:bg-white text-foreground border-none shadow-md" />
            </Carousel>
          </div>

          {/* Fleet Specifications & Language Capabilities */}
          <div className="reveal space-y-6">
            <div>
              <span className="label-eyebrow text-xs font-bold uppercase tracking-widest text-[var(--ceylon-gold)]">Amenities & Fleet</span>
              <h2 className="mt-2 text-4xl font-semibold text-foreground tracking-tight">Spotless, Comfortable, Always Ready</h2>
            </div>

            {/* Key Specs Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-xl bg-card border border-neutral-200/60 px-4 py-3.5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--ceylon-gold)]/10">
                  <Users className="h-5 w-5 text-[var(--ceylon-gold)]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Seating</p>
                  <p className="text-sm font-semibold text-foreground leading-tight">2 Adults + Child under 12</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-card border border-neutral-200/60 px-4 py-3.5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--ceylon-gold)]/10">
                  <Backpack className="h-5 w-5 text-[var(--ceylon-gold)]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Boot Space</p>
                  <p className="text-sm font-semibold text-foreground leading-tight">470–570L <span className="text-muted-foreground font-normal">/</span> 1,100L+ folded</p>
                </div>
              </div>
            </div>

            {/* Interactive List Grid with Bullet Grow Animation */}
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-sm text-muted-foreground">
              {[
                "Full Air conditioning",
                "USB charging",
                "Cooler box",
                "First aid kit",
                "Child seats on request",
                "Wifi hotspot",
                "Daily cleaning",
                "Rear A/C & charging",
              ].map((s) => (
                <li key={s} className="flex items-center gap-3 group/item cursor-default">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[var(--ceylon-gold)]/10 transition-transform duration-200 group-hover/item:scale-110">
                    <Check className="h-3.5 w-3.5 text-[var(--ceylon-gold)] stroke-[3.5]" />
                  </div>
                  <span className="transition-colors duration-200 group-hover/item:text-foreground">{s}</span>
                </li>
              ))}
            </ul>

            {/* Premium Language Pill Badges with Clean Interaction States */}
            <div className="mt-8 pt-6 border-t border-neutral-200/60">
              <h4 className="font-accent text-xs font-bold uppercase tracking-wider text-foreground">Languages Spoken</h4>
              <div className="mt-3 flex flex-wrap gap-3">
                <div className="flex items-center gap-2.5 rounded-full bg-card border border-neutral-200/80 px-4 py-2 text-xs font-medium text-foreground shadow-sm transition-all duration-200 hover:border-[var(--ceylon-gold)] hover:shadow-md">
                  <img src={flagUK} alt="English" className="h-3.5 w-auto rounded-sm" />
                  <span>English (Fluent)</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-full bg-card border border-neutral-200/80 px-4 py-2 text-xs font-medium text-foreground shadow-sm transition-all duration-200 hover:border-[var(--ceylon-gold)] hover:shadow-md">
                  <img src={flagLK} alt="Sinhala" className="h-3.5 w-auto rounded-sm" />
                  <span>Sinhala (Native)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Optional Large Van — Ideal for Groups */}
      <section className="bg-[var(--cream-parchment)] py-20 border-t border-neutral-200/40">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">

          {/* Van Specs */}
          <div className="reveal space-y-6">
            <div>
              <span className="label-eyebrow text-xs font-bold uppercase tracking-widest text-[var(--ceylon-gold)]">Optional Upgrade</span>
              <h2 className="mt-2 text-4xl font-semibold text-foreground tracking-tight">Toyota HiAce High Roof Van</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Need more space for your group or extra luggage? Our HiAce High Roof Van seats <strong>8–10 passengers</strong> in comfort with generous headroom and a massive cargo bay.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-xl bg-card border border-neutral-200/60 px-4 py-3.5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--ceylon-gold)]/10">
                  <Users className="h-5 w-5 text-[var(--ceylon-gold)]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Seating</p>
                  <p className="text-sm font-semibold text-foreground leading-tight">8–10 Passengers</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-card border border-neutral-200/60 px-4 py-3.5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--ceylon-gold)]/10">
                  <Backpack className="h-5 w-5 text-[var(--ceylon-gold)]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Cargo Capacity</p>
                  <p className="text-sm font-semibold text-foreground leading-tight">9.8 m³ <span className="text-muted-foreground font-normal">/</span> 1.6 m height</p>
                </div>
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-sm text-muted-foreground">
              {[
                "Full Air conditioning",
                "USB charging ports",
                "Cooler box",
                "First aid kit",
                "Rear seatbelts for all",
                "Wifi hotspot",
                "Daily cleaning",
                "Ample luggage space",
              ].map((s) => (
                <li key={s} className="flex items-center gap-3 group/item cursor-default">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[var(--ceylon-gold)]/10 transition-transform duration-200 group-hover/item:scale-110">
                    <Check className="h-3.5 w-3.5 text-[var(--ceylon-gold)] stroke-[3.5]" />
                  </div>
                  <span className="transition-colors duration-200 group-hover/item:text-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Van Image */}
          <div className="reveal overflow-hidden rounded-2xl shadow-lg border border-neutral-200/60">
            <div className="h-[420px] w-full overflow-hidden">
              <img
                src={vanImg}
                alt="Toyota HiAce High Roof Van"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Personal Picks Highlight Section with Icon Card Interactivity */}
      <section className="bg-[var(--cream-parchment)] py-20 border-t border-neutral-200/40">
        <div className="mx-auto max-w-6xl px-6">
          <div className="reveal mb-12 text-center">
            <span className="label-eyebrow text-xs font-bold uppercase tracking-widest text-[var(--ceylon-gold)]">Insider Guides</span>
            <h2 className="mt-2 text-4xl font-semibold text-foreground tracking-tight">My Sri Lanka Favourites</h2>
          </div>

          <div className="reveal grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Sunrise className="h-6 w-6 text-[var(--ceylon-gold)] transition-transform duration-300 group-hover:scale-110" />,
                title: "Favourite sunrise",
                body: "Pidurangala Rock — the secret Sigiriya viewpoint"
              },
              {
                icon: <UtensilsCrossed className="h-6 w-6 text-[var(--ceylon-gold)] transition-transform duration-300 group-hover:scale-110" />,
                title: "Best meal",
                body: "A family rice and curry spot in Ella"
              },
              {
                icon: <Trees className="h-6 w-6 text-[var(--ceylon-gold)] transition-transform duration-300 group-hover:scale-110" />,
                title: "Most memorable moment",
                body: "Watching a leopard cub at Yala"
              },
              {
                icon: <Train className="h-6 w-6 text-[var(--ceylon-gold)] transition-transform duration-300 group-hover:scale-110" />,
                title: "Magical journey",
                body: "The train through Ella Gap at dawn"
              },
            ].map((p) => (
              <div
                key={p.title}
                className="group rounded-2xl bg-card p-6 border border-neutral-100/60 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--ceylon-gold)]/10 transition-colors duration-200 group-hover:bg-[var(--ceylon-gold)]/20">
                  {p.icon}
                </div>
                <h4 className="mt-4 font-semibold text-foreground tracking-tight">{p.title}</h4>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern High-Impact Call to Action Banner */}
      <section className="bg-gradient-jungle py-24 text-center text-white relative overflow-hidden group">
        <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 space-y-6">
          <h2 className="text-4xl font-light md:text-5xl leading-tight text-white drop-shadow-sm">
            Let's Plan Your Journey Together
          </h2>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-block rounded-full bg-[var(--ceylon-gold)] px-10 py-3.5 font-accent text-xs font-semibold uppercase tracking-widest text-white shadow-lg transition-all duration-300 ease-out hover:bg-[var(--ceylon-gold)]/90 hover:scale-105 hover:shadow-xl active:scale-98"
            >
              Start Planning →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}