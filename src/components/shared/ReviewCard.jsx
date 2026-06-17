import { StarRating } from "./StarRating";

function emojiToCountryCode(emoji) {
  if (!emoji) return "";
  try {
    return Array.from(emoji)
      .map((char) => String.fromCodePoint(char.codePointAt(0) - 127397))
      .join("")
      .toLowerCase();
  } catch (e) {
    return "";
  }
}

export function ReviewCard({ r }) {
  const initials = r.name.split(" ").map((n) => n[0]).slice(0, 2).join("");
  return (
    <article className="relative h-full overflow-hidden rounded-xl bg-card p-7 shadow-card">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-6 font-display text-[160px] leading-none text-[var(--jungle-deep)] opacity-[0.05]"
      >
        “
      </span>
      <StarRating value={r.rating} />
      {r.title && <h4 className="mt-3 text-xl font-semibold">{r.title}</h4>}
      <p className="mt-3 text-[15px] italic text-muted-foreground line-clamp-5">"{r.body}"</p>
      <div className="mt-6 flex items-center gap-3 border-t border-[var(--soft-sand)] pt-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-gold font-accent text-sm font-semibold text-white">
          {initials}
        </div>
        <div>
          <div className="flex items-center font-semibold text-[var(--jungle-deep)]">
            <span>{r.name}</span>
            {r.flag && (
              <img
                src={`https://flagcdn.com/w40/${emojiToCountryCode(r.flag)}.png`}
                srcSet={`https://flagcdn.com/w80/${emojiToCountryCode(r.flag)}.png 2x`}
                width="20"
                alt={r.country}
                className="ml-2 inline-block rounded-[2px] border border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.15)] align-middle"
              />
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {r.tour} · {r.date}
          </div>
        </div>
      </div>
    </article>
  );
}






