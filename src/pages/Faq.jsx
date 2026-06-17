import { useMemo } from "react";
import { SEO } from "@/components/shared/SEO";
import { PageHero } from "@/components/shared/PageHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const sections = [
  {
    title: "About The Tours",
    qa: [
      ["Can I fully customise my itinerary?", "Yes, everything is built around your interests, travel dates, and pace."],
      [
        "What is included in the tour price?",
        "Air-conditioned private vehicle, professional guide, all fuel and toll charges, airport transfers.",
      ],
      [
        "What is NOT included?",
        "Hotel accommodation, restaurant meals, national park entry fees, train tickets, flight costs.",
      ],
      ["How many people travel per tour?", "Completely private — just you and your group (1–7 people)."],
      ["Can you accommodate children or elderly travellers?", "Absolutely. Child seats available, slow-paced options always available."],
    ],
  },
  {
    title: "About Sri Lanka",
    qa: [
      [
        "What is the best time to visit Sri Lanka?",
        "Sri Lanka has two monsoon systems — somewhere is always sunny. I'll design your itinerary around the best weather for your dates.",
      ],
      ["Is Sri Lanka safe for tourists?", "Very safe. Sri Lanka is consistently ranked among Asia's safest destinations."],
      [
        "Do I need a visa?",
        "Yes — an Electronic Travel Authorization (ETA) is required. $35 USD, 10 minutes online at eta.gov.lk",
      ],
      ["What currency is used?", "Sri Lankan Rupee (LKR). ATMs widely available. Cards accepted at most hotels."],
      [
        "What should I pack?",
        "Light cottons, sun protection, insect repellent, comfortable walking shoes, layers for hill country.",
      ],
    ],
  },
  {
    title: "About Booking",
    qa: [
      [
        "How do I book a tour?",
        "Send an enquiry via the form or WhatsApp. I'll design a custom itinerary and quote within 24 hours.",
      ],
      ["How far in advance should I book?", "4–8 weeks ideal. Peak season (Dec–Mar) — 3 months ahead recommended."],
      [
        "What payment methods do you accept?",
        "Bank transfer and cash on arrival currently. Secure online payment coming soon.",
      ],
      [
        "What is the cancellation policy?",
        "Free cancellation up to 14 days before. 50% refund 7–14 days. Rescheduling always accommodated.",
      ],
      [
        "Can I modify my itinerary after booking?",
        "Yes — right up to the day before departure. Flexibility is the joy of private tours.",
      ],
    ],
  },
  {
    title: "About Your Guide",
    qa: [
      ["Do you speak English?", "Yes — fluently. English is my primary communication language."],
      [
        "What vehicle do you use?",
        "A well-maintained Toyota KDH van with full A/C, seating for up to 7, USB charging, and a cooler box.",
      ],
      ["Can you pick me up from the airport?", "Yes — airport pickup is included in all tours. I'll be waiting with your name card."],
      ["Do you provide hotel recommendations?", "Yes — trusted recommendations for every budget at every destination."],
    ],
  },
  {
    title: "Planning Your Trip",
    qa: [
      [
        "What is the best time to visit Sri Lanka?",
        "Sri Lanka has two monsoon systems — the southwest monsoon (May–September) affects the west and south coasts, while the northeast monsoon (October–January) affects the east and north. The best time to visit the south and west coasts (Mirissa, Galle, Colombo) is November to April. The best time for the east coast (Trincomalee, Arugam Bay) is April to September. Hill country (Ella, Nuwara Eliya) is pleasant year-round, with the clearest views in January to March. The beauty of Sri Lanka is that somewhere is always sunny — your itinerary can be designed around the best weather for your travel dates.",
      ],
      [
        "Do I need a visa to visit Sri Lanka?",
        "Yes — most nationalities need an Electronic Travel Authorization (ETA) to enter Sri Lanka. The ETA costs $35 USD and takes about 10 minutes to apply online at eta.gov.lk. It grants 30 days of stay with double entry. We recommend applying at least a week before travel. Some nationalities can also get a visa on arrival, but the ETA in advance is the smoothest option. Visa extensions are possible through the Department of Immigration in Colombo for up to six months.",
      ],
      [
        "Is Sri Lanka safe for tourists?",
        "Very safe. Sri Lanka is consistently ranked among Asia's safest destinations for travellers. The local people are warm, hospitable, and helpful to visitors. Violent crime against tourists is extremely rare. Normal travel precautions apply — keep valuables secure, avoid walking alone late at night in unfamiliar areas, and follow local advice. Your private guide will be with you throughout your tour, ensuring your safety and comfort at every stop.",
      ],
      [
        "How much does a private tour in Sri Lanka cost?",
        "Private tour pricing in Sri Lanka varies based on duration, group size, and inclusions. As a general guide, a private guided tour with vehicle, driver-guide, and airport transfers ranges from $100–$180 per person per day depending on group size — larger groups get lower per-person rates. Accommodation, meals, and park entry fees are additional. A 7-day private tour for a couple typically costs $1,400–$2,500 excluding accommodation. Get in touch with a few details about your group and interests for a precise quote.",
      ],
      [
        "How many days do I need in Sri Lanka?",
        "For a well-rounded Sri Lanka experience, 7–14 days is the sweet spot. In 5–7 days you can cover the Cultural Triangle (Sigiriya, Kandy, Dambulla) plus a safari. In 10 days you can add the hill country (Ella, Nuwara Eliya, train ride) and the south coast (Mirissa whale watching, Galle Fort). With 14 days or more you can explore the east coast or the deep north (Jaffna, Mannar) as well. Every itinerary is private and customisable — the perfect duration depends on your interests and travel style.",
      ],
      [
        "What language do people speak in Sri Lanka?",
        "Sinhala and Tamil are the official languages of Sri Lanka. English is widely spoken in tourist areas, hotels, and restaurants — especially by those working in the tourism industry. Your private guide speaks fluent English and can assist with translation whenever needed. Road signs are typically in all three languages: Sinhala, Tamil, and English.",
      ],
    ],
  },
];

const faqItems = sections.flatMap((s) => s.qa).map(([q, a]) => ({ question: q, answer: a }));

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer,
    },
  })),
};

export default function Faq() {
  return (
    <>
      <SEO
        title="Sri Lanka Tour FAQ — Everything You Need to Know"
        description="Frequently asked questions about private Sri Lanka tours. Custom itineraries, pricing, safety, visas, packing tips, booking process, and more with Lanka Tours Direct."
        canonical="https://lankatoursdirect.com/faq"
        schema={faqSchema}
        preloadImage="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920"
      />
      <PageHero eyebrow="FAQ" title="Frequently Asked Questions" image="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920" height={340} />
      <section className="bg-[var(--cream-parchment)] py-16">
        <div className="mx-auto max-w-3xl space-y-12 px-6">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="mb-4 text-2xl font-semibold">{s.title}</h2>
              <Accordion type="single" collapsible className="rounded-xl bg-card px-4 shadow-card">
                {s.qa.map(([q, a]) => (
                  <AccordionItem key={q} value={q} className="border-b border-[var(--soft-sand)] last:border-0">
                    <AccordionTrigger className="text-left text-base font-semibold">{q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}




