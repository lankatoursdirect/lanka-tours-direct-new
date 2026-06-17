/**
 * Contact.jsx  —  src/pages/Contact.jsx
 *
 * CHANGES vs original:
 *  • WhatsApp field replaced with <PhoneInput> (libphonenumber validation + self-verify)
 *  • whatsapp is now REQUIRED — gated on handleNext so Step 2 never loads without it
 *  • whatsappLocal  = what the user types  (local format, e.g. "076 330 0443")
 *  • whatsappE164   = validated digits     (e.g. "94763300443" — fed to EmailJS hidden input)
 *  • All other fields and form logic unchanged
 */

import { useState, useRef, useMemo, useEffect } from "react";
import { SEO } from "@/components/shared/SEO";
import {
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  Check,
  ChevronsUpDown,
  Star,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { whatsappLink } from "@/components/shared/WhatsAppButton";
import { PhoneInput } from "@/components/shared/PhoneInput";
import { COUNTRIES } from "@/data/countries";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import guidePhoto from "@/assets/images/shared/guide-img.webp";

// Pre-sort countries A-Z once at module level
const SORTED_COUNTRIES = [...COUNTRIES].sort((a, b) => a.name.localeCompare(b.name));

// ─────────────────────────────────────────────────────────────────────────────
export default function Contact() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [step, setStep] = useState(1);

  // Country selector state
  const [selectedCountry, setSelectedCountry] = useState("");

  // WhatsApp state — split into local (what user types) and E.164 (validated result)
  const [whatsappLocal, setWhatsappLocal] = useState(""); // e.g. "076 330 0443"
  const [whatsappE164, setWhatsappE164] = useState(""); // e.g. "94763300443"

  // Whether the parent forced a whatsapp error (on Next click without valid number)
  const [whatsappForceError, setWhatsappForceError] = useState(false);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    arrival: "",
    departure: "",
    adults: "2",
    children: "0",
    message: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    whatsapp: "", // kept for legacy — now driven by whatsappE164
    arrival: "",
    departure: "",
    adults: "",
    children: "",
  });

  const emailRegex =
    /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[A-Za-z]{2,}$/;

  const todayString = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  // Derived: full country data object for the selected country name
  const selectedCountryData = useMemo(() => {
    if (!selectedCountry) return null;
    return SORTED_COUNTRIES.find((c) => c.name === selectedCountry) ?? null;
  }, [selectedCountry]);

  // Clear country error as soon as user picks one
  useEffect(() => {
    if (selectedCountry) {
      setErrors((prev) => ({ ...prev, country: "" }));
    }
  }, [selectedCountry]);

  // Clear whatsapp force-error as soon as the number becomes valid
  useEffect(() => {
    if (whatsappE164) {
      setWhatsappForceError(false);
      setErrors((prev) => ({ ...prev, whatsapp: "" }));
    }
  }, [whatsappE164]);

  // ── Field validation ────────────────────────────────────────────────────────
  const validateField = (name, value) => {
    let msg = "";
    switch (name) {
      case "firstName":
        if (!value.trim()) msg = "First name is required.";
        else if (value.trim().length < 2) msg = "First name must be at least 2 characters.";
        else if (!/^[a-zA-Z\s\-]+$/.test(value))
          msg = "First name can only contain letters, spaces, or hyphens.";
        break;
      case "lastName":
        if (!value.trim()) msg = "Last name is required.";
        else if (value.trim().length < 2) msg = "Last name must be at least 2 characters.";
        else if (!/^[a-zA-Z\s\-]+$/.test(value))
          msg = "Last name can only contain letters, spaces, or hyphens.";
        break;
      case "email":
        if (!value.trim()) msg = "Email address is required.";
        else if (!emailRegex.test(value)) msg = "Please enter a valid email address.";
        break;
      case "arrival":
        if (!value) {
          msg = "Arrival date is required.";
        } else {
          const sel = new Date(value);
          sel.setHours(0, 0, 0, 0);
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          if (sel < now) msg = "Arrival date cannot be in the past.";
        }
        break;
      case "departure":
        if (!value) {
          msg = "Departure date is required.";
        } else {
          const sel = new Date(value);
          sel.setHours(0, 0, 0, 0);
          if (formValues.arrival) {
            const arr = new Date(formValues.arrival);
            arr.setHours(0, 0, 0, 0);
            if (sel < arr) msg = "Departure date must be on or after the arrival date.";
          } else {
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            if (sel < now) msg = "Departure date cannot be in the past.";
          }
        }
        break;
      case "adults":
        if (!value) msg = "Number of adults is required.";
        else if (isNaN(parseInt(value, 10)) || parseInt(value, 10) < 1)
          msg = "Must have at least 1 adult.";
        break;
      case "children":
        if (value !== "" && (isNaN(parseInt(value, 10)) || parseInt(value, 10) < 0))
          msg = "Children count cannot be negative.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => {
      const next = { ...prev, [name]: value };
      // When arrival changes, also re-validate departure against the new arrival
      if (name === "arrival" && next.departure) {
        const depDate = new Date(next.departure);
        depDate.setHours(0, 0, 0, 0);
        const arrDate = new Date(value);
        arrDate.setHours(0, 0, 0, 0);
        const depError = depDate < arrDate ? "Departure date must be on or after the arrival date." : "";
        setErrors((prev) => ({ ...prev, [name]: "", departure: depError }));
      } else {
        validateField(name, value);
      }
      return next;
    });
  };

  const handleNumericKeyDown = (e) => {
    if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
  };

  // ── Step 1 → Step 2 ────────────────────────────────────────────────────────
  const handleNext = () => {
    const newErrors = {};

    if (!formValues.firstName.trim()) newErrors.firstName = "First name is required.";
    else if (formValues.firstName.trim().length < 2)
      newErrors.firstName = "First name must be at least 2 characters.";
    else if (!/^[a-zA-Z\s\-]+$/.test(formValues.firstName))
      newErrors.firstName = "First name can only contain letters, spaces, or hyphens.";

    if (!formValues.lastName.trim()) newErrors.lastName = "Last name is required.";
    else if (formValues.lastName.trim().length < 2)
      newErrors.lastName = "Last name must be at least 2 characters.";
    else if (!/^[a-zA-Z\s\-]+$/.test(formValues.lastName))
      newErrors.lastName = "Last name can only contain letters, spaces, or hyphens.";

    if (!formValues.email.trim()) newErrors.email = "Email address is required.";
    else if (!emailRegex.test(formValues.email))
      newErrors.email = "Please enter a valid email address.";

    if (!selectedCountry) newErrors.country = "Please select your country.";

    // WhatsApp is NOW REQUIRED — must be a fully valid number
    if (!whatsappE164) {
      newErrors.whatsapp = "A valid WhatsApp number is required.";
      setWhatsappForceError(true);
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));

    const hasError = Object.values(newErrors).some((e) => e !== "");
    if (!hasError) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ── Final submit ────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formValues.arrival) {
      newErrors.arrival = "Arrival date is required.";
    } else {
      const sel = new Date(formValues.arrival);
      sel.setHours(0, 0, 0, 0);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      if (sel < now) newErrors.arrival = "Arrival date cannot be in the past.";
    }

    if (!formValues.departure) {
      newErrors.departure = "Departure date is required.";
    } else {
      const sel = new Date(formValues.departure);
      sel.setHours(0, 0, 0, 0);
      if (formValues.arrival) {
        const arr = new Date(formValues.arrival);
        arr.setHours(0, 0, 0, 0);
        if (sel < arr) newErrors.departure = "Departure date must be on or after the arrival date.";
      }
    }

    if (!formValues.adults) {
      newErrors.adults = "Number of adults is required.";
    } else if (isNaN(parseInt(formValues.adults, 10)) || parseInt(formValues.adults, 10) < 1) {
      newErrors.adults = "Must have at least 1 adult.";
    }

    if (formValues.children !== "") {
      const p = parseInt(formValues.children, 10);
      if (isNaN(p) || p < 0) newErrors.children = "Children count cannot be negative.";
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));

    const hasError = Object.values(newErrors).some((e) => e !== "");
    if (hasError) return;

    setIsSending(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      toast.error("Something went wrong. Please try again or contact us via WhatsApp.");
    } finally {
      setIsSending(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <SEO
        title="Contact Lanka Tours Direct — Book Your Sri Lanka Tour"
        description="Get in touch with Lanka Tours Direct to plan your private Sri Lanka tour. Contact expert guide Vishva via WhatsApp, email or our inquiry form."
        canonical="https://lankatoursdirect.com/contact"
        preloadImage="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPoint",
          "telephone": "+94763300443",
          "contactType": "customer service",
          "email": "info@lankatoursdirect.com",
          "availableLanguage": ["English"],
          "areaServed": "LK",
        }}
      />
      <section className="grid lg:grid-cols-5 min-h-[100vh]">
        {/* ── LEFT SIDEBAR (unchanged) ── */}
        <aside className="bg-[var(--jungle-deep)] px-10 pb-10 pt-28 text-white lg:col-span-2 lg:px-14 lg:pb-14 lg:pt-36 flex flex-col gap-0">
          {/* Guide Profile */}
          <div className="flex items-center gap-4">
            <img
              src={guidePhoto}
              alt="Vishva"
              className="h-16 w-16 rounded-full border-2 border-[var(--ceylon-gold)] object-cover"
            />
            <div>
              <h3 className="text-2xl text-white" style={{ color: "white" }}>
                Vishva
              </h3>
              <p className="text-sm text-white/70">Your Sri Lanka private guide</p>
              <div className="mt-1 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={12}
                    className="fill-[var(--ceylon-gold)] text-[var(--ceylon-gold)]"
                  />
                ))}
                <span className="ml-1 text-xs text-white/60">· 150+ journeys</span>
              </div>
            </div>
          </div>

          {/* Guide Quote */}
          <blockquote className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm italic text-white/80">
            "Tell me your dream — I'll design the exact journey to make it real. No two trips are
            the same."
            <footer className="mt-2 text-xs text-white/50 not-italic">
              — Vishva, Private Guide · 6 years experience
            </footer>
          </blockquote>

          {/* WhatsApp CTA */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-accent text-[10px] sm:text-xs uppercase tracking-wider text-white whitespace-nowrap transition-all hover:bg-[#1ebe5c] hover:shadow-[0_0_16px_rgba(37,211,102,0.4)]"
          >
            <MessageCircle size={14} /> WhatsApp · Reply in 1 hour
          </a>

          {/* Contact Details */}
          <ul className="mt-8 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-[var(--ceylon-gold)]" />
              <a
                href="tel:+94763300443"
                className="hover:text-[var(--ceylon-gold)] transition-colors"
              >
                +94 76 330 0443
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-[var(--ceylon-gold)]" />
              <a
                href="mailto:info@lankatoursdirect.com"
                className="hover:text-[var(--ceylon-gold)] transition-colors"
              >
                info@lankatoursdirect.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="shrink-0 mt-0.5 text-[var(--ceylon-gold)]" />
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5">
                  Panadura, Sri Lanka
                  <img
                    src="https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LK.svg"
                    alt="Sri Lanka"
                    className="w-5 h-3.5 object-cover rounded-sm shadow-sm inline-block"
                  />
                </span>
                <p className="text-xs text-white/60 leading-relaxed">
                  349/11 Nisal Uyana,
                  <br />
                  S. Mahindahimi Road, Perera Road,
                  <br />
                  Alubomulla, Panadura.
                </p>
              </div>
            </li>
          </ul>

          {/* Google Maps */}
          <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
            <iframe
              title="Lanka Tours Direct – Panadura, Sri Lanka"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.2473!2d79.9617389!3d6.7081178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2495fddc92a29%3A0xf0801d880454465e!2sLanka%20Tours%20Direct.com!5e0!3m2!1sen!2slk!4v1715770000000"
              width="100%"
              height="180"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Latest Review */}
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={12}
                  className="fill-[var(--ceylon-gold)] text-[var(--ceylon-gold)]"
                />
              ))}
              <span className="text-xs text-[var(--ceylon-gold)] font-accent uppercase tracking-wider ml-1">
                recent review
              </span>
            </div>
            <p className="text-sm italic text-white/85">
              "Vishva made our Sri Lanka trip truly unforgettable. Flexible, knowledgeable, and
              genuinely kind."
            </p>
            <p className="mt-2 text-xs text-white/50">— Emma R., Netherlands · Hill Country Tour</p>
          </div>

          {/* Social Links */}
          <div className="mt-6 flex items-center gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=61591028990530"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-all hover:scale-110 hover:bg-white hover:border-white"
            >
              <img
                src="https://cdn.simpleicons.org/facebook/1877F2"
                alt="Facebook"
                className="h-5 w-5"
              />
            </a>
            <a
              href="https://www.tripadvisor.com/Attraction_Review-g293962-d34438192-Reviews-Lanka_Tours_Direct-Colombo_Western_Province.html"
              target="_blank"
              rel="noreferrer"
              aria-label="TripAdvisor"
              className="transition-all hover:opacity-90 hover:scale-105"
            >
              <div className="flex items-center justify-center bg-white px-3 py-1.5 rounded-xl shadow-sm w-[160px] h-[44px]">
                <img
                  src="https://static.cdnlogo.com/logos/t/43/tripadvisor.svg"
                  alt="TripAdvisor"
                  className="w-full h-auto object-contain"
                />
              </div>
            </a>
          </div>
        </aside>

        {/* ── RIGHT: FORM PANEL ── */}
        <div className="bg-[var(--cream-parchment)] px-8 pb-8 pt-28 lg:col-span-3 lg:px-14 lg:pb-14 lg:pt-36">
          <h2 className="text-4xl font-semibold">Plan Your Sri Lanka Journey</h2>
          <p className="mt-2 text-muted-foreground">
            Tell me about your dream trip — I'll design the perfect itinerary.
          </p>

          {submitted ? (
            /* ── Success state ── */
            <div className="mt-10 animate-float-up rounded-xl bg-card p-12 text-center shadow-card border border-[var(--soft-sand)]">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ceylon-gold)]/10 text-[var(--ceylon-gold)]">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-4xl font-display">Thank you! 🌴</h3>
              <p className="mt-4 text-muted-foreground max-w-sm mx-auto">
                Your enquiry has been received. Vishva will get back to you within 24 hours.
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground/80 font-accent uppercase tracking-wider">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[var(--ceylon-gold)]" />
                <span>Redirecting to home page...</span>
              </div>
            </div>
          ) : (
            <div className="mt-10">
              {/* ── Progress bar ── */}
              <div className="mb-10 flex items-center gap-6">
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span
                      className={`text-[10px] font-accent uppercase tracking-[0.15em] transition-colors ${step === 1 ? "text-[var(--ceylon-gold)] font-bold" : "text-muted-foreground"}`}
                    >
                      Contact Details
                    </span>
                    <span
                      className={`text-[10px] font-accent uppercase tracking-[0.15em] transition-colors ${step === 2 ? "text-[var(--ceylon-gold)] font-bold" : "text-muted-foreground"}`}
                    >
                      Trip Preferences
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-[var(--soft-sand)] overflow-hidden">
                    <div
                      className="h-full bg-[var(--ceylon-gold)] transition-all duration-700 ease-in-out shadow-[0_0_8px_rgba(200,150,62,0.4)]"
                      style={{ width: step === 1 ? "50%" : "100%" }}
                    />
                  </div>
                </div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                {/* ════════════════════════════════════════════════════════════
                    STEP 1: Contact Details
                    ════════════════════════════════════════════════════════════ */}
                <div data-step="1" className={step === 1 ? "animate-fade-in space-y-6" : "hidden"}>
                  <div className="grid gap-5 md:grid-cols-2">
                    <FormInput
                      name="firstName"
                      label="First Name *"
                      placeholder="John"
                      value={formValues.firstName}
                      onChange={handleChange}
                      error={errors.firstName}
                      required
                    />
                    <FormInput
                      name="lastName"
                      label="Last Name *"
                      placeholder="Doe"
                      value={formValues.lastName}
                      onChange={handleChange}
                      error={errors.lastName}
                      required
                    />
                  </div>

                  <FormInput
                    name="email"
                    label="Email Address *"
                    type="email"
                    placeholder="john@example.com"
                    value={formValues.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />

                  {/* Country + WhatsApp side by side */}
                  <div className="grid gap-5 md:grid-cols-2">
                    <CountrySelect
                      countries={SORTED_COUNTRIES}
                      value={selectedCountry}
                      selectedData={selectedCountryData}
                      onChange={setSelectedCountry}
                      error={errors.country}
                      required
                    />

                    {/* ── NEW: Smart phone input ── */}
                    {/*
                      isoCode         → drives dial code + libphonenumber country rules
                      value           → local number the user types
                      onChange        → updates whatsappLocal state
                      onValidChange   → parent receives e164Digits when valid, "" when not
                      externalError   → forces error display if user clicked Next without valid number
                    */}
                    <PhoneInput
                      isoCode={selectedCountryData?.code}
                      value={whatsappLocal}
                      onChange={setWhatsappLocal}
                      onValidChange={setWhatsappE164}
                      externalError={whatsappForceError ? errors.whatsapp : ""}
                      required
                    />
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <FieldLabel>Preferred Contact Method</FieldLabel>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {["WhatsApp", "Email", "Either"].map((p) => (
                        <label
                          key={p}
                          className="flex cursor-pointer items-center gap-3 rounded-full border border-[var(--soft-sand)] bg-white px-6 py-2.5 text-sm transition-all hover:border-[var(--ceylon-gold)] has-[input:checked]:border-[var(--ceylon-gold)] has-[input:checked]:bg-[var(--ceylon-gold)]/5 has-[input:checked]:ring-1 has-[input:checked]:ring-[var(--ceylon-gold)]"
                        >
                          <input
                            type="radio"
                            name="preferred"
                            value={p}
                            className="accent-[var(--ceylon-gold)]"
                            defaultChecked={p === "WhatsApp"}
                          />
                          <span className="font-medium">{p}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="group flex w-full items-center justify-center gap-2 rounded-full bg-[var(--jungle-deep)] py-4 font-accent text-xs uppercase tracking-widest text-white transition-all hover:bg-[var(--jungle-darker)] hover:shadow-xl active:scale-[0.98]"
                    >
                      Next Step: Trip Details
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </div>

                {/* ════════════════════════════════════════════════════════════
                    STEP 2: Trip Preferences
                    ════════════════════════════════════════════════════════════ */}
                <div data-step="2" className={step === 2 ? "animate-fade-in space-y-6" : "hidden"}>
                  <div className="grid gap-5 md:grid-cols-2">
                    <FormInput
                      name="arrival"
                      label="Arrival Date *"
                      type="date"
                      value={formValues.arrival}
                      onChange={handleChange}
                      error={errors.arrival}
                      min={todayString}
                      required
                    />
                    <FormInput
                      name="departure"
                      label="Departure Date *"
                      type="date"
                      value={formValues.departure}
                      onChange={handleChange}
                      error={errors.departure}
                      min={formValues.arrival || todayString}
                      required
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <FormInput
                      name="adults"
                      label="Adults *"
                      type="number"
                      min={1}
                      value={formValues.adults}
                      onChange={handleChange}
                      onKeyDown={handleNumericKeyDown}
                      error={errors.adults}
                      required
                    />
                    <FormInput
                      name="children"
                      label="Children"
                      type="number"
                      min={0}
                      value={formValues.children}
                      onChange={handleChange}
                      onKeyDown={handleNumericKeyDown}
                      error={errors.children}
                    />
                  </div>

                  <div>
                    <FieldLabel>Special Requests / Message</FieldLabel>
                    <textarea
                      name="message"
                      value={formValues.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Share any specific requirements or destinations you'd love to visit..."
                      className="mt-2 w-full rounded-xl border border-[var(--soft-sand)] bg-white px-5 py-4 text-sm transition-all focus:border-[var(--ceylon-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--ceylon-gold)]/20"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="col-span-1 rounded-full border border-[var(--soft-sand)] py-4 font-accent text-xs uppercase tracking-widest text-muted-foreground transition-all hover:bg-white hover:text-foreground active:scale-[0.98]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSending}
                      className="col-span-2 flex items-center justify-center gap-2 rounded-full bg-[var(--ceylon-gold)] py-4 font-accent text-xs uppercase tracking-widest text-white shadow-gold transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                        </>
                      ) : (
                        "Send My Enquiry →"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOCAL HELPER COMPONENTS  (same API as originals — zero JSX changes above)
// ─────────────────────────────────────────────────────────────────────────────

function FieldLabel({ children, required }) {
  return (
    <label className="block font-accent text-[11px] uppercase tracking-wider text-muted-foreground">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

function FormInput({ label, error, ...props }) {
  return (
    <div className="space-y-2">
      <FieldLabel>{label}</FieldLabel>
      <input
        {...props}
        className={cn(
          "flex h-[46px] w-full rounded-lg border bg-white px-4 text-sm focus:outline-none transition-all duration-300",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
            : "border-[var(--soft-sand)] focus:border-[var(--ceylon-gold)] focus:ring-1 focus:ring-[var(--ceylon-gold)]/20",
        )}
      />
      {error && (
        <span className="mt-1.5 block text-[11px] font-medium text-red-500 animate-fade-in">
          {error}
        </span>
      )}
    </div>
  );
}

function CountrySelect({ countries, value, selectedData, onChange, required, error }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <FieldLabel required={required}>Country</FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "flex h-[46px] w-full justify-between bg-white px-4 font-normal focus:ring-1 focus:ring-[var(--ceylon-gold)]/20 transition-all duration-300",
              error
                ? "border-red-500 hover:border-red-500 focus:border-red-500"
                : "border-[var(--soft-sand)] hover:bg-white hover:border-[var(--ceylon-gold)] focus:border-[var(--ceylon-gold)]",
            )}
          >
            {value && selectedData ? (
              <div className="flex items-center gap-2 text-foreground">
                <img
                  src={selectedData.image}
                  alt=""
                  className="w-5 h-3.5 object-cover rounded-sm shadow-sm"
                />
                {value}
              </div>
            ) : (
              <span className="text-muted-foreground">Select country…</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-[--radix-popover-trigger-width] min-w-[240px]"
          align="start"
        >
          <Command
            filter={(value, search) => {
              const v = value.toLowerCase();
              const s = search.toLowerCase();
              if (v.startsWith(s)) return 2;
              if (v.includes(s)) return 1;
              return 0;
            }}
          >
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={country.name}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 cursor-pointer py-3"
                  >
                    <img
                      src={country.image}
                      alt=""
                      className="w-5 h-3.5 object-cover rounded-sm shadow-sm"
                    />
                    <span className="flex-1">{country.name}</span>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4 text-[var(--ceylon-gold)]",
                        value === country.name ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <input type="hidden" name="country" value={value} required={required} />
      {error && (
        <span className="mt-1.5 block text-[11px] font-medium text-red-500 animate-fade-in">
          {error}
        </span>
      )}
    </div>
  );
}

