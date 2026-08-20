import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const observeElements = (io) => {
      const els = document.querySelectorAll(".reveal:not(.is-visible)");
      els.forEach((el) => io.observe(el));
    };

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

    observeElements(io);

    // Only watch for direct child additions under #root (new route content),
    // NOT attribute/subtree changes (carousel animations, hover states, etc.)
    const root = document.getElementById("root") ?? document.body;
    let debounceTimer = null;
    const mo = new MutationObserver((mutations) => {
      const hasNewNodes = mutations.some(
        (m) => m.type === "childList" && m.addedNodes.length > 0,
      );
      if (hasNewNodes) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => observeElements(io), 150);
      }
    });

    mo.observe(root, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(debounceTimer);
    };
  }, [pathname]);
}
