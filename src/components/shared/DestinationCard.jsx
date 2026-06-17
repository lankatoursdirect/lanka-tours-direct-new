import { Link } from "react-router-dom";

export function DestinationCard({ d, className = "" }) {
  return (
    <Link
      to={`/destinations/${d.slug}`}
      className={`group relative block h-full overflow-hidden rounded-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${className}`}
    >
      <img 
        src={d.image} 
        alt={d.name} 
        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110" 
        style={{ 
          objectPosition: "center",
        }}
        loading="lazy" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
      

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 transition-transform duration-500">
        <div className="mb-2 h-0.5 w-0 bg-[var(--ceylon-gold)] transition-all duration-500 group-hover:w-12" />
        <h3 className="font-display text-2xl text-white md:text-3xl" style={{ color: "white" }}>
          {d.name}
        </h3>
        <p className="mt-1 text-xs text-white/70 uppercase tracking-widest opacity-0 transition-all duration-500 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          View Destination →
        </p>
      </div>
    </Link>
  );
}
