"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ScrollEffect — wraps any child and animates it into view on scroll.
 *
 * Props:
 *  - variant: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "fadeIn" | "scaleUp"
 *    Default: "fadeUp"
 *  - delay: number (ms) — stagger delay, e.g. delay={100}
 *  - duration: number (ms) — animation duration, default 600
 *  - threshold: number 0–1 — how much of the element must be visible, default 0.15
 *  - once: boolean — animate only once (default true)
 *  - className: string — extra classes on the wrapper div
 */
export default function ScrollEffect({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 600,
  threshold = 0.15,
  once = true,
  className = "",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const variants = {
    fadeUp: {
      hidden: "opacity-0 translate-y-8",
      visible: "opacity-100 translate-y-0",
    },
    fadeDown: {
      hidden: "opacity-0 -translate-y-8",
      visible: "opacity-100 translate-y-0",
    },
    fadeLeft: {
      hidden: "opacity-0 translate-x-8",
      visible: "opacity-100 translate-x-0",
    },
    fadeRight: {
      hidden: "opacity-0 -translate-x-8",
      visible: "opacity-100 translate-x-0",
    },
    fadeIn: { hidden: "opacity-0", visible: "opacity-100" },
    scaleUp: { hidden: "opacity-0 scale-95", visible: "opacity-100 scale-100" },
  };

  const { hidden, visible: visibleClass } =
    variants[variant] ?? variants.fadeUp;

  return (
    <div
      ref={ref}
      className={`transition-all ease-out will-change-transform ${
        visible ? visibleClass : hidden
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
