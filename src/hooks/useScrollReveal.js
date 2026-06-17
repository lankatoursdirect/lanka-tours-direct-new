import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const observeElements = () => {
      const els = document.querySelectorAll(".reveal:not(.is-visible)");
      els.forEach((el) => io.observe(el));
    };

    // Initial observe
    observeElements();

    // Use MutationObserver only on the #root element (not document.body)
    // to avoid firing on carousel animation style changes
    const root = document.getElementById("root") ?? document.body;
    let debounceTimer = null;
    const mo = new MutationObserver(() => {
      // Debounce to avoid firing hundreds of times during carousel animations
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(observeElements, 100);
    });

    mo.observe(root, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(debounceTimer);
    };
  }, [pathname]);
}
