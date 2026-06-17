export function SectionHeader({ eyebrow, title, subtitle, light = false, align = "center" }) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} mb-12`}>
      {eyebrow && <div className="label-eyebrow mb-4">{eyebrow}</div>}
      <h2
        className="text-4xl md:text-5xl font-semibold mb-4"
        style={{ color: light ? "var(--ivory-white)" : "var(--jungle-deep)" }}
      >
        {title}
      </h2>
      {subtitle && <p className={`text-lg ${light ? "text-white/75" : "text-muted-foreground"}`}>{subtitle}</p>}
    </div>
  );
}

