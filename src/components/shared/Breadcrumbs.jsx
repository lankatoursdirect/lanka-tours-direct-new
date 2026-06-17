import { Link } from "react-router-dom";

export function Breadcrumbs({ items }) {
  return (
    <nav className="flex items-center gap-2 text-xs text-[#8a7455]">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-[#c9973a]/40">/</span>}
            {isLast || !item.href ? (
              <span className={isLast ? "text-[var(--jungle-deep)] font-medium" : ""}>{item.label}</span>
            ) : (
              <Link to={item.href} className="hover:text-[var(--ceylon-gold)] transition-colors duration-200">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
