import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { SiteLayout } from "./components/layout/SiteLayout";
import { Preloader } from "./components/shared/Preloader";

// Lazy load pages for better performance
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Destinations = React.lazy(() => import("./pages/Destinations"));
const DestinationDetail = React.lazy(() => import("./pages/DestinationDetail"));
const Tours = React.lazy(() => import("./pages/Tours"));
const ToursByDuration = React.lazy(() => import("./pages/ToursByDuration"));
const TourDetail = React.lazy(() => import("./pages/TourDetail"));
const Experiences = React.lazy(() => import("./pages/Experiences"));
const Gallery = React.lazy(() => import("./pages/Gallery"));
const Faq = React.lazy(() => import("./pages/Faq"));
const Reviews = React.lazy(() => import("./pages/Reviews"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Resets scroll position to top on every route change (different from the shared ScrollToTop "back to top" button)
function RouteScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <React.Suspense
        fallback={
          <div className="flex h-[80vh] items-center justify-center bg-[var(--cream-parchment)]">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--ceylon-gold)]/20 border-t-[var(--ceylon-gold)]" />
              <span className="font-accent text-[10px] uppercase tracking-[0.15em] text-muted-foreground animate-pulse">
                Loading Journey...
              </span>
            </div>
          </div>
        }
      >
        <RouteScrollReset />
        <SiteLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:slug" element={<DestinationDetail />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/3-day" element={<ToursByDuration />} />
            <Route path="/tours/5-day" element={<ToursByDuration />} />
            <Route path="/tours/7-day" element={<ToursByDuration />} />
            <Route path="/tours/10-day" element={<ToursByDuration />} />
            <Route path="/tours/14-day" element={<ToursByDuration />} />
            <Route path="/tours/:slug" element={<TourDetail />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SiteLayout>
      </React.Suspense>
    </>
  );
}

export default App;




