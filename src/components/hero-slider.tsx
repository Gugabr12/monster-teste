"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";

export type HeroSlide = {
  image: StaticImageData;
  alt: string;
};

/**
 * Hero background slideshow: crossfades on a timer, and the dots jump straight
 * to a slide. Clicking a dot restarts the countdown (the effect below depends on
 * `index`), so a deliberate pick always gets the full interval on screen.
 */
export function HeroSlider({
  slides,
  interval = 6000,
}: {
  slides: HeroSlide[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % slides.length),
      interval,
    );
    return () => window.clearTimeout(id);
  }, [index, slides.length, interval]);

  return (
    <>
      {slides.map((slide, i) => (
        <Image
          key={slide.alt}
          src={slide.image}
          alt={i === index ? slide.alt : ""}
          fill
          priority={i === 0}
          sizes="100vw"
          aria-hidden={i !== index}
          className={
            "object-cover object-center transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none " +
            (i === index ? "opacity-100" : "opacity-0")
          }
        />
      ))}

      <div
        role="tablist"
        aria-label="Destaques"
        className="absolute bottom-[33px] left-1/2 z-20 flex -translate-x-1/2 gap-[10px]"
      >
        {slides.map((slide, i) => (
          <button
            key={slide.alt}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Ir para o destaque ${i + 1}`}
            onClick={() => setIndex(i)}
            className="group h-[10px] py-0 outline-offset-4"
          >
            <span
              className={
                "block size-[10px] rounded-full transition-colors duration-300 " +
                (i === index ? "bg-white" : "bg-white/40 group-hover:bg-white/70")
              }
            />
          </button>
        ))}
      </div>
    </>
  );
}
