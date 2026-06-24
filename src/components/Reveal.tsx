"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
}

/**
 * Reveal-on-scroll. The element fades + nudges up as it enters the viewport.
 * A safety timeout guarantees content is shown even if the observer never fires,
 * so nothing ever stays stuck hidden.
 */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      el.style.transitionDelay = `${delay}ms`;
      el.classList.add("in");
    };

    // Already in/near the viewport on mount → reveal immediately.
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < vh * 1.1) show();

    let io: IntersectionObserver | undefined;
    try {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              show();
              io?.unobserve(el);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
      );
      io.observe(el);
    } catch {
      show();
    }

    // Safety net: never leave content hidden if the observer never fires.
    const t = setTimeout(show, 1600);
    return () => {
      io?.disconnect();
      clearTimeout(t);
    };
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </div>
  );
}
