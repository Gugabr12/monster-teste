"use client";

import Image, { type StaticImageData } from "next/image";

import { useDragLoop } from "@/lib/use-drag-loop";

export type Athlete = {
  image: StaticImageData;
  name: string;
  sport: string;
};

/**
 * Same drag-and-drift carousel as the activities; the card is the difference.
 * Its hover is louder — see `.athlete-card` in globals.css.
 */
export function AthleteCarousel({ items }: { items: Athlete[] }) {
  const { rootProps, trackRef } = useDragLoop({
    slide: ".athlete-slide",
    speed: 0.6,
    gap: 24,
    deps: [items.length],
  });

  return (
    <div
      {...rootProps}
      className="relative -mx-6 -my-8 select-none overflow-hidden px-6 py-8"
    >
      <div
        ref={trackRef}
        className="flex cursor-grab gap-6 active:cursor-grabbing"
      >
        {items.map((athlete, i) => (
          <article
            key={`${athlete.name}-${i}`}
            className="athlete-slide w-[218px] shrink-0 sm:w-[248px] lg:w-[276px]"
          >
            <a
              href="#"
              draggable={false}
              className="athlete-card card-hover group relative block aspect-[276/391] overflow-hidden bg-[linear-gradient(11.14deg,#0c1003_2%,#b1e15a_115%)] will-change-transform"
            >
              {/* claw watermark */}
              {/* eslint-disable-next-line @next/next/no-img-element -- decorative shape */}
              <img
                src="/assets/atletas/claw.svg"
                alt=""
                aria-hidden
                draggable={false}
                className="pointer-events-none absolute left-[35.8%] top-[53.7%] h-[120%] w-[123.7%] max-w-none -translate-x-1/2 -translate-y-1/2 rotate-[19.93deg]"
              />

              {/* accent glow behind the athlete */}
              <div className="athlete-glow pointer-events-none absolute left-[17.9%] top-[27.7%] aspect-square w-[56.6%] mix-blend-screen">
                {/* eslint-disable-next-line @next/next/no-img-element -- decorative glow */}
                <img
                  src="/assets/atletas/glow-outer.svg"
                  alt=""
                  aria-hidden
                  draggable={false}
                  className="absolute inset-[-74.31%] max-w-none"
                />
              </div>
              <div className="athlete-glow pointer-events-none absolute left-[25.2%] top-[33%] aspect-square w-[41.9%] mix-blend-screen">
                {/* eslint-disable-next-line @next/next/no-img-element -- decorative glow */}
                <img
                  src="/assets/atletas/glow-inner.svg"
                  alt=""
                  aria-hidden
                  draggable={false}
                  className="absolute inset-[-100.4%] max-w-none"
                />
              </div>

              {/* athlete cutout — the artboard lets it run past the name bar */}
              <div className="absolute inset-x-0 top-0 h-[104.9%] overflow-hidden">
                <Image
                  src={athlete.image}
                  alt={athlete.name}
                  fill
                  draggable={false}
                  sizes="276px"
                  className="athlete-photo object-cover object-top"
                />
              </div>

              {/* name bar */}
              <div className="absolute inset-x-0 bottom-0 flex h-[23.3%] items-center justify-center border-t border-white bg-[#0c1003] px-3">
                <span className="card-name text-center text-[16px] font-bold uppercase leading-[1.3] text-white sm:text-[18px] lg:text-[20px]">
                  {athlete.name}
                </span>
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
