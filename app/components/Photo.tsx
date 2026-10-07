"use client";
import { useEffect, useState } from "react";

type PhotoProps = {
  src: string;
  alt: string;
  className?: string;
  // Where the crop sits when the frame's shape differs from the photo, e.g. "50% 20%".
  position?: string;
  // "cover" fills the frame and crops; "contain" shows the whole photo inside it.
  fit?: "cover" | "contain";
};

// Red gradient frame with the grayscale photo on top. The photo is only shown once it
// loads, so a missing file leaves the initials visible instead of a broken-image icon.
const Photo = ({ src, alt, className = "", position = "50% 50%", fit = "cover" }: PhotoProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const probe = new window.Image();
    probe.onload = () => setLoaded(true);
    probe.src = src;
  }, [src]);

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-gradient-to-br from-[#e10000] via-[#5a0000] to-[#0b0b0b] ${className}`}
    >
      <span className="absolute inset-0 flex items-center justify-center text-6xl font-extrabold tracking-widest text-white/25">
        AD
      </span>
      {loaded && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          style={{ objectPosition: position }}
          className={`absolute inset-0 h-full w-full ${
            fit === "contain" ? "object-contain" : "object-cover"
          } grayscale mix-blend-luminosity`}
        />
      )}
    </div>
  );
};

export default Photo;
