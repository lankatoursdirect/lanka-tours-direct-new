import { SectionHeader } from "@/components/shared/SectionHeader";
import { Mail, MapPin, CheckCircle2, PalmtreeIcon } from "lucide-react";

const steps = [
  { icon: Mail, title: "Tell Me Your Dream", body: "Fill in the enquiry form or WhatsApp your travel dates and interests" },
  { icon: MapPin, title: "Get Your Custom Plan", body: "I'll design a personalised itinerary within 24 hours" },
  { icon: CheckCircle2, title: "Confirm & Prepare", body: "We fine-tune every detail — I handle all logistics" },
  { icon: PalmtreeIcon, title: "Arrive & Explore", body: "I meet you at the airport. Your Sri Lanka story begins." },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[var(--jungle-deep)] py-24">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0 1px, transparent 1px 40px)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="reveal">
          <SectionHeader title="Booking Your Sri Lanka Adventure is Simple" light />
        </div>
        <div className="reveal relative grid gap-10 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-[var(--ceylon-gold)]/40 md:block" />
          {steps.map((s, i) => (
            <div key={s.title} className="relative text-center">
              <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ceylon-gold)] text-white shadow-gold">
                <span className="font-accent text-sm font-semibold">{i + 1}</span>
              </div>
              <s.icon className="mx-auto mt-5 text-[var(--ceylon-gold)]" size={28} />
              <h4 className="mt-3 text-xl font-semibold text-white" style={{ color: "white" }}>
                {s.title}
              </h4>
              <p className="mt-2 text-sm text-white/70">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

