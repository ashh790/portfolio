"use client";
import { useEffect, useState } from "react";

type ProjectImageProps = {
  src: string;
  alt: string;
};

// Shows the project screenshot once it loads. Until then (or if the file is missing),
// a quiet dark panel shows the project name instead.
const ProjectImage = ({ src, alt }: ProjectImageProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const probe = new window.Image();
    probe.onload = () => setLoaded(true);
    probe.src = src;
  }, [src]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#171717]">
      <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-[#d92525]">
        {alt}
      </span>
      {loaded && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      )}
    </div>
  );
};

export default ProjectImage;
