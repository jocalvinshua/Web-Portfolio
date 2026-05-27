"use client";

import Image from "next/image";

export default function SkillIcon({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={24}
      height={24}
      className="object-contain"
      onError={(e) => {
        e.target.style.display = "none";
      }}
    />
  );
}