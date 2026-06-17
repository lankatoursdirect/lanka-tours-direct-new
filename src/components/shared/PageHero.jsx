export function PageHero({
  eyebrow,
  title,
  subtitle,
  image = "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1920",
  height = 460,
}) {
  return (
    <section className="relative w-full overflow-hidden" style={{ height }}>
      <img src={image} alt="" role="presentation" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[var(--jungle-deep)]/65" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-16 text-center text-white">
        {eyebrow && <div className="label-eyebrow text-[var(--ceylon-gold)]">{eyebrow}</div>}
        <h1 className="mt-3 max-w-4xl text-4xl font-light md:text-6xl" style={{ color: "white" }}>
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-white/85">{subtitle}</p>}
      </div>
    </section>
  );
}

