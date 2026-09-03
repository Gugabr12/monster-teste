"use client";

import Image, { type StaticImageData } from "next/image";

import { useDragLoop } from "@/lib/use-drag-loop";

export type Activity = {
  image: StaticImageData;
  category: string;
  headline: string;
  alt: string;
};

export function ActivityCarousel({ items }: { items: Activity[] }) {
  const { rootProps, trackRef } = useDragLoop({
    slide: ".activity-slide",
    speed: 0.7,
    gap: 20,
    deps: [items.length],
  });

  return (
    <div
      {...rootProps}
      className="relative -mx-6 -my-6 select-none overflow-hidden px-6 py-6"
    >
      <div
        ref={trackRef}
        className="flex cursor-grab gap-5 active:cursor-grabbing"
      >
        {items.map((activity, i) => (
          <article
            key={`${activity.headline}-${i}`}
            className="activity-slide w-[268px] shrink-0 sm:w-[320px] lg:w-[360px]"
          >
            <a
              href="#"
              draggable={false}
              className="card-hover group relative block aspect-[380/538] overflow-hidden will-change-transform"
            >
              <Image
                src={activity.image}
                alt={activity.alt}
                fill
                draggable={false}
                sizes="360px"
                className="object-cover"
              />
              <div className="activity-overlay absolute inset-0 bg-gradient-to-b from-transparent from-[42%] via-black/75 via-[74%] to-black" />
              <div className="activity-caption absolute inset-x-0 bottom-0 flex flex-col gap-2 px-6 pb-8 font-bold text-white">
                <span className="text-[12px] leading-[1.5]">
                  {activity.category}
                </span>
                <span className="text-[16px] leading-[1.5]">
                  {activity.headline}
                </span>
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
