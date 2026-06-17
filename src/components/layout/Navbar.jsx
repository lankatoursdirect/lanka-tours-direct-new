import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/components/shared/WhatsAppButton";
import logo from "@/assets/images/shared/logo-last.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/tours", label: "Tours" },
  { to: "/destinations", label: "Destinations" },
  { to: "/experiences", label: "Experiences" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open || !isHome
          ? "bg-[var(--jungle-deep)]/90 shadow-deep backdrop-blur-lg py-3 lg:py-5 border-b border-white/5"
          : "bg-transparent py-5 lg:py-10 border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className={`relative flex items-center transition-all duration-500 ${
            scrolled || open || !isHome ? "h-10 md:h-[88px] lg:h-14 w-32 md:w-[265px] lg:w-80" : "h-12 md:h-[112px] lg:h-20 w-40 md:w-[325px] lg:w-96"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            navigate("/");
          }}
        >
          <img
            src={logo}
            alt="Lanka Tours Direct"
            className={`absolute left-1 top-1/2 -translate-y-1/2 transition-all duration-500 brightness-110 drop-shadow-2xl max-w-none ${
              scrolled || open || !isHome
                ? "h-[45px] md:h-[95px] lg:h-[75px] md:left-2 lg:left-6"
                : "h-[60px] md:h-[118px] lg:h-[100px] md:left-2 lg:left-8"
            }`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-x-7 lg:ml-20 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `group relative font-accent text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:text-[var(--ceylon-gold)] hover:font-semibold ${
                  isActive ? "text-[var(--ceylon-gold)] font-bold" : "text-white/80"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1.5px] bg-[var(--ceylon-gold)] transition-all duration-300 group-hover:w-full ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="rounded-lg bg-[var(--ceylon-gold)] px-7 py-3 font-accent text-[11px] uppercase tracking-widest text-white shadow-gold transition-all duration-300 hover:scale-105 hover:bg-[var(--ceylon-gold-deep)] whitespace-nowrap"
          >
            Plan Your Trip
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 p-2 text-white transition-colors hover:text-[var(--ceylon-gold)] lg:hidden"
        >
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Full-Screen Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 flex h-screen w-full flex-col items-center justify-center bg-[var(--jungle-deep)] transition-all duration-700 ease-in-out lg:hidden ${
          open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex w-full flex-col items-center gap-8 px-10">
          <nav className="flex flex-col items-center gap-6">
            {links.map((l, idx) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`font-display text-4xl text-white transition-all duration-300 hover:text-[var(--ceylon-gold)] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div
            className={`mt-10 flex w-full flex-col gap-4 transition-all duration-700 ${
              open ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="w-full rounded-lg bg-[var(--ceylon-gold)] py-5 text-center font-accent text-xs uppercase tracking-[0.2em] text-white shadow-gold"
            >
              Start Planning →
            </Link>

            <div className="mt-8 flex items-center justify-center gap-8 text-white/60">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 text-sm transition-colors hover:text-white"
              >
                <MessageCircle size={20} className="text-[#25D366]" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
