import { Link } from "react-router-dom";
import { whatsappLink } from "@/components/shared/WhatsAppButton";
import { Facebook, Instagram, MessageCircle, Mail, MapPin, Phone, Star } from "lucide-react";

// ─── Logo asset from /public ────────────────────────────────────────────────
const LOGO_SRC = "/logo.png";

export function Footer() {
  return (
    <footer className="bg-[hsl(20_30%_8%)] text-white/60">

      {/* ── Mobile-only WhatsApp CTA Strip ──────────────────────────────── */}
      <div className="bg-[var(--ceylon-gold)] px-6 py-4 lg:hidden">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center justify-center gap-3 font-accent text-[12px] font-bold uppercase tracking-[0.2em] text-white"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageCircle size={18} />
          Chat on WhatsApp Now →
        </a>
      </div>

      {/* ── Main Footer Body ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 · Brand & Socials */}
          <div className="flex flex-col gap-6">
            <div>
              {/* Real logo from /public — falls back gracefully if missing */}
              <Link to="/" className="inline-block" aria-label="Lanka Tours Direct — Home">
                <img
                  src={LOGO_SRC}
                  alt="Lanka Tours Direct"
                  className="h-14 w-auto object-contain"
                  loading="lazy"
                />
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed">
                Premium private tours across Sri Lanka. Experience the island
                exactly how you imagined it.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                {
                  href: "https://www.facebook.com/profile.php?id=61591028990530",
                  label: "Facebook",
                  icon: <Facebook size={17} />,
                },
                {
                  href: "https://www.instagram.com/lankatoursdirect/",
                  label: "Instagram",
                  icon: <Instagram size={17} />,
                },
                {
                  href: whatsappLink,
                  label: "WhatsApp",
                  icon: <MessageCircle size={17} />,
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all duration-200 hover:border-[var(--ceylon-gold)] hover:bg-[var(--ceylon-gold)] hover:text-white"
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Desktop WhatsApp button */}
            <div className="hidden lg:block">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Chat on WhatsApp"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-md transition-all duration-200 hover:bg-[#20bc5a] hover:shadow-lg hover:scale-[1.03] active:scale-[0.98]"
              >
                <MessageCircle size={15} />
                WhatsApp · Quick Response
              </a>
            </div>
          </div>

          {/* Col 2 · Explore */}
          <div>
            <h4 className="mb-6 font-accent text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              Explore
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                ["Our Story", "/about"],
                ["All Tours", "/tours"],
                ["Destinations", "/destinations"],
                ["Experiences", "/experiences"],
                ["Gallery", "/gallery"],
                ["Reviews", "/reviews"],
                ["FAQ", "/faq"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="transition-colors duration-150 hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 · Top Tours */}
          <div>
            <h4 className="mb-6 font-accent text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              Top Tours
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                ["Sri Lanka in 5 Days", "/tours"],
                ["Cultural Triangle", "/tours"],
                ["Hill Country Scenic", "/tours"],
                ["Wildlife Safaris", "/tours"],
                ["Coastal Escape", "/tours"],
                ["Adventure &amp; Hiking", "/tours"],
                ["Custom Itinerary", "/contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="transition-colors duration-150 hover:text-white"
                    dangerouslySetInnerHTML={{ __html: label }}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 · Contact & Trust */}
          <div className="flex flex-col gap-8">
            {/* Contact details */}
            <div>
              <h4 className="mb-6 font-accent text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                Contact
              </h4>
              <ul className="flex flex-col gap-4 text-sm">
                <li className="flex items-center gap-3">
                  <Phone size={15} className="shrink-0 text-[var(--ceylon-gold)]" />
                  <a
                    href="tel:+94763300443"
                    className="transition-colors hover:text-white"
                  >
                    +94 76 330 0443
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={15} className="shrink-0 text-[var(--ceylon-gold)]" />
                  <a
                    href="mailto:info@lankatoursdirect.com"
                    className="break-all transition-colors hover:text-white"
                  >
                    info@lankatoursdirect.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-[var(--ceylon-gold)]" />
                  <a href="https://www.google.com/maps/place/Lanka+Tours+Direct.com/@6.7081178,79.9617389,17z/data=!4m6!3m5!1s0x3ae2495fddc92a29:0xf0801d880454465e!8m2!3d6.7081178!4d79.9617389!16s%2Fg%2F11zcjhck66?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="hover:text-[var(--ceylon-gold)] transition-colors">Panadura, Sri Lanka</a>
                </li>
              </ul>
            </div>

            {/* TripAdvisor trust block — elevated */}
            <a
              href="https://www.tripadvisor.com/Attraction_Review-g293962-d34438192-Reviews-Lanka_Tours_Direct-Colombo_Western_Province.html"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Review us on TripAdvisor"
              className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-200 hover:border-[var(--ceylon-gold)]/40 hover:bg-white/8"
            >
              {/* TripAdvisor owl icon approximated with star cluster */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className="fill-[var(--ceylon-gold)] text-[var(--ceylon-gold)]"
                    />
                  ))}
                </div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-white/50">
                  300+ Reviews
                </div>
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                  Review us on
                </div>
                <div className="font-display text-sm font-semibold text-white group-hover:text-[var(--ceylon-gold)] transition-colors">
                  TripAdvisor
                </div>
              </div>
            </a>

            {/* Book CTA */}
            <Link
              to="/contact"
              className="inline-block rounded-lg bg-[var(--ceylon-gold)] px-6 py-3 text-center font-accent text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.99]"
            >
              Book Your Tour Now
            </Link>
          </div>
        </div>

        {/* ── Bottom Bar ──────────────────────────────────────────────────── */}
        <div className="mt-16 border-t border-white/10 pt-10 lg:mt-24">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between">
            <p className="text-[10px] uppercase tracking-widest text-white/50">
              © {new Date().getFullYear()} Lanka Tours Direct · Expert Sri Lanka Private Tours
            </p>
            <div className="flex gap-6 text-[10px] uppercase tracking-widest text-white/40">
              <Link to="/faq" className="hover:text-white/70 transition-colors">FAQ</Link>
              <Link to="/contact" className="hover:text-white/70 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}