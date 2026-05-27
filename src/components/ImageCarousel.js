"use client";

import { useState, useCallback, useEffect } from "react";

export default function ImageCarousel({ images = [], title = "" }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(null); // "left" | "right"
  const [animating, setAnimating] = useState(false);

  const total = images.length;

  const go = useCallback(
    (next) => {
      if (animating || next === current) return;
      setDirection(next > current ? "right" : "left");
      setAnimating(true);
      setTimeout(() => {
        setCurrent(next);
        setAnimating(false);
        setDirection(null);
      }, 320);
    },
    [animating, current]
  );

  const prev = useCallback(() => go((current - 1 + total) % total), [current, total, go]);
  const next = useCallback(() => go((current + 1) % total), [current, total, go]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // No images — skeleton placeholder
  if (total === 0) {
    return (
      <div
        className="w-full aspect-[21/9] rounded-2xl border relative overflow-hidden flex flex-col items-center justify-center gap-4 shadow-2xl"
        style={{
          backgroundColor: "#2A3439",
          borderColor: "rgba(248,250,252,0.07)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(248,250,252,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(248,250,252,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="relative w-14 h-14 rounded-2xl border flex items-center justify-center"
          style={{
            borderColor: "rgba(225,29,72,0.3)",
            backgroundColor: "rgba(225,29,72,0.08)",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e11d48"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </svg>
        </div>
        <p className="relative text-[11px] font-mono text-[#94a3b8]/30 tracking-widest">
          // NO PREVIEW AVAILABLE
        </p>
      </div>
    );
  }

  // Single image — no controls needed
  if (total === 1) {
    return (
      <div
        className="w-full aspect-[21/9] rounded-2xl border overflow-hidden relative shadow-2xl"
        style={{ borderColor: "rgba(248,250,252,0.07)" }}
      >
        <img
          src={images[0]}
          alt={`${title} preview`}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(10,10,11,0.5), transparent)",
          }}
        />
      </div>
    );
  }

  // Multi-image carousel
  const slideStyle = {
    transform: animating
      ? `translateX(${direction === "right" ? "-6%" : "6%"})`
      : "translateX(0%)",
    opacity: animating ? 0 : 1,
    transition: "transform 320ms cubic-bezier(0.4,0,0.2,1), opacity 320ms ease",
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Main slide */}
      <div
        className="w-full aspect-[21/9] rounded-2xl border overflow-hidden relative shadow-2xl group"
        style={{
          borderColor: "rgba(248,250,252,0.07)",
          backgroundColor: "#2A3439",
        }}
      >
        {/* Image */}
        <img
          src={images[current]}
          alt={`${title} — image ${current + 1} of ${total}`}
          className="w-full h-full object-cover"
          style={slideStyle}
        />

        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10"
          style={{
            background: "linear-gradient(to top, rgba(10,10,11,0.6), transparent)",
          }}
        />

        {/* Counter badge */}
        <div
          className="absolute bottom-4 left-5 z-20 text-[11px] font-mono tracking-widest"
          style={{ color: "rgba(248,250,252,0.5)" }}
        >
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>

        {/* Arrow buttons */}
        <div className="absolute inset-0 flex items-center justify-between px-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <CarouselButton onClick={prev} direction="left" />
          <CarouselButton onClick={next} direction="right" />
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="flex-shrink-0 rounded-xl overflow-hidden border transition-all duration-200 focus:outline-none"
            style={{
              width: "72px",
              height: "48px",
              borderColor:
                i === current
                  ? "#e11d48"
                  : "rgba(248,250,252,0.07)",
              opacity: i === current ? 1 : 0.5,
              transform: i === current ? "scale(1.04)" : "scale(1)",
            }}
            aria-label={`Go to image ${i + 1}`}
          >
            <img
              src={src}
              alt={`${title} thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-1">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="rounded-full transition-all duration-300 focus:outline-none"
            style={{
              width: i === current ? "20px" : "6px",
              height: "6px",
              backgroundColor:
                i === current
                  ? "#e11d48"
                  : "rgba(148,163,184,0.25)",
            }}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function CarouselButton({ onClick, direction }) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none"
      style={{
        backgroundColor: "rgba(10,10,11,0.7)",
        borderColor: "rgba(248,250,252,0.12)",
        backdropFilter: "blur(8px)",
        color: "#f8fafc",
      }}
      aria-label={direction === "left" ? "Previous image" : "Next image"}
    >
      {direction === "left" ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </button>
  );
}