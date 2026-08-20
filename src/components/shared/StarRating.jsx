import { memo } from "react";
import { Star } from "lucide-react";

export const StarRating = memo(function StarRating({ value, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          aria-hidden="true"
          className={
            i < value
              ? "fill-[var(--ceylon-gold)] text-[var(--ceylon-gold)]"
              : "text-[var(--soft-sand)]"
          }
        />
      ))}
    </div>
  );
});
