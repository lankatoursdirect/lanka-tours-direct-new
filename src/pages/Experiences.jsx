import { SEO } from "@/components/shared/SEO";
import { PageHero } from "@/components/shared/PageHero";
import { experienceCategories, featuredExperiences } from "@/data/experiences";
import { Clock, Sun } from "lucide-react";
import * as Icons from "lucide-react";
import experiencesHero from "@/assets/images/destinations/sigiriya-with-lake.webp";

export default function Experiences() {
  return (
    <>
      <SEO
        title="Sri Lanka Travel Experiences — Safari, Whale Watching & More"
        description="Discover the best experiences in Sri Lanka. Yala leopard safari, Mirissa whale watching, scenic train journeys, tea plantation visits, Ayurveda and more."
        canonical="https://lankatoursdirect.com/experiences"
        preloadImage="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920"
      />
      <PageHero
        eyebrow="Experiences"
        title="Not Just Tours. Experiences."
        subtitle="The moments you'll remember decades from now."
        image="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920"
      />

      <section className="bg-[var(--ivory-white)] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {experienceCategories.map((c) => (
              <div
                key={c.title}
                className="group rounded-xl border border-[var(--soft-sand)] bg-card p-6 text-center shadow-card transition-smooth hover:-translate-y-1"
              >
                <div className="flex h-12 items-center justify-center">
                  {(() => {
                    const IconComponent = Icons[c.icon] || Icons.Compass;
                    return (
                      <IconComponent className="h-8 w-8 text-[var(--ceylon-gold)] transition-transform duration-300 group-hover:scale-110" />
                    );
                  })()}
                </div>
                <h4 className="mt-3 text-sm font-semibold">{c.title}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{c.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="bg-[var(--cream-parchment)] py-16">
        <div className="mx-auto max-w-6xl space-y-20 px-6">
          {featuredExperiences.map((exp, i) => (
            <div
              key={exp.title}
              className={`group grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="overflow-hidden rounded-xl shadow-card reveal h-[420px] w-full border border-[var(--soft-sand)]">
                <img
                  src={exp.image}
                  alt={`${exp.title} — Sri Lanka experience`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  width="600"
                  height="420"
                />
              </div>
              <div className="reveal">
                <div className="label-eyebrow">{exp.subtitle}</div>
                <h3 className="mt-3 text-3xl font-semibold md:text-4xl">{exp.title}</h3>
                <p className="mt-4 text-muted-foreground">{exp.description}</p>
                <div className="mt-5 rounded-xl bg-card p-4 text-sm shadow-card">
                  <strong className="text-[var(--ceylon-gold)]">Insider tip: </strong>
                  {exp.tip}
                </div>
                <div className="mt-5 flex gap-4 text-sm">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} className="text-[var(--ceylon-gold)]" />
                    {exp.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Sun size={14} className="text-[var(--ceylon-gold)]" />
                    {exp.season}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}




