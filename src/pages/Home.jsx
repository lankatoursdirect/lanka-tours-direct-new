import { SEO } from "@/components/shared/SEO";
import { Hero } from "@/components/home/Hero";
import { IntroSection } from "@/components/home/IntroSection";
import { FeaturedTours } from "@/components/home/FeaturedTours";
import { DestinationsShowcase } from "@/components/home/DestinationsShowcase";
import { ExperienceCategoriesSection } from "@/components/home/ExperienceCategories";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { HowItWorks } from "@/components/home/HowItWorks";
import { GalleryTeaser } from "@/components/home/GalleryTeaser";
import { StatsSection } from "@/components/home/StatsSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { reviews } from "@/data/reviews";

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["TourOperator", "LocalBusiness"],
      "name": "Lanka Tours Direct",
      "description": "Premium private tours across Sri Lanka led by expert local guide Vishva. Custom itineraries covering Sigiriya, Ella, Yala, Mirissa, Galle and beyond.",
      "url": "https://lankatoursdirect.com",
      "image": "https://lankatoursdirect.com/logo.png",
      "logo": "https://lankatoursdirect.com/logo.png",
      "telephone": "+94763300443",
      "email": "info@lankatoursdirect.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "349/11 Nisal Uyana, S. Mahindahimi Road, Perera Road, Alubomulla",
        "addressLocality": "Panadura",
        "addressCountry": "LK",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "6.707667",
        "longitude": "79.9588421",
      },
      "areaServed": "Sri Lanka",
      "priceRange": "$$",
      "sameAs": ["https://www.facebook.com/profile.php?id=61591028990530"],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": reviews.length,
        "bestRating": "5",
      },
    },
    {
      "@type": "WebSite",
      "url": "https://lankatoursdirect.com",
      "name": "Lanka Tours Direct",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://lankatoursdirect.com/tours?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <SEO
        title="Premium Private Sri Lanka Tours"
        description="Experience Sri Lanka your way with Lanka Tours Direct. Private guided tours to Sigiriya, Ella, Yala, Mirissa & beyond. Bespoke itineraries crafted by expert local guide Vishva. Book your dream journey today."
        canonical="https://lankatoursdirect.com/"
        schema={homeSchema}
      />
      <Hero />
      {/* <IntroSection /> */}
      <FeaturedTours />
      <DestinationsShowcase />
      <ExperienceCategoriesSection />
      <ReviewsCarousel />
      <HowItWorks />
      <GalleryTeaser />
      <StatsSection />
      <FinalCTA />
    </>
  );
}




