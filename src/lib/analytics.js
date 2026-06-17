export function trackWhatsAppClick(tourName, source) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "whatsapp_click", {
    tour_name: tourName || "general",
    source: source || "",
    page_path: window.location.pathname,
  });
}

export function trackTourView(tourSlug, tourTitle, duration) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "tour_detail_view", {
    tour_slug: tourSlug,
    tour_title: tourTitle,
    tour_duration: duration,
  });
}

export function trackDestinationView(destSlug, destName) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "destination_view", {
    destination_slug: destSlug,
    destination_name: destName,
  });
}

export function trackContactFormSubmit(formType) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "contact_form_submit", {
    form_type: formType || "general",
  });
}

export function trackEnquiryStart(tourName) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "enquiry_start", {
    tour_name: tourName || "",
  });
}
