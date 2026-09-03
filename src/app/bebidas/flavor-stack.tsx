"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import type { Flavor } from "./flavors";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * "Deck" stacking scroll effect (inspired by sohub.digital): a single wrapper is
 * pinned while you scroll; the flavor panels are absolutely stacked inside it and
 * each one slides up from below to cover the previous, which scales back a touch.
 * The last panel ends resting on top of the whole stack.
 *
 * Runs on mobile + desktop. `prefers-reduced-motion` (or no JS) falls back to a
 * plain scrolling column.
 */
export function FlavorStack({
  flavors,
  brand,
  brandAlt,
}: {
  flavors: Flavor[];
  brand: StaticImageData;
  brandAlt: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (flavors.length < 2) return;

      const wrapper = wrapRef.current;
      if (!wrapper) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const isDesktop = !!ctx.conditions?.isDesktop;
          const reduce = !!ctx.conditions?.reduce;

          const cards = gsap.utils.toArray<HTMLElement>(
            ".flavor-stack-card",
            wrapper,
          );
          const n = cards.length;

          // switch the column into a single pinned viewport with the panels
          // stacked on top of each other (mobile + desktop)
          wrapper.classList.add("is-pinned");

          gsap.set(cards, {
            yPercent: (i: number) => (i === 0 ? 0 : 100),
            scale: 1,
            filter: "brightness(1)",
          });

          const tl = gsap.timeline({
            defaults: { duration: 1, ease: "none" },
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end: () =>
                "+=" + Math.round(window.innerHeight * (n - 1 + 0.35)),
              pin: true,
              scrub: reduce ? true : 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // On desktop the panel is a card floating on the dark page, so it can
          // scale and drift as it goes out. On mobile it is full-bleed: any
          // transform peels it off the screen edges and the page background
          // shows through the incoming panel's torn cut as a black wedge
          // instead of the panel underneath. There it only dims.
          const outgoing = isDesktop
            ? { scale: 0.9, yPercent: -8, filter: "brightness(0.5)" }
            : { filter: "brightness(0.45)" };

          cards.forEach((card, i) => {
            if (i === 0) return;
            tl.to(card, { yPercent: 0 }, i - 1);
            tl.to(cards[i - 1], outgoing, "<");
          });

          const refresh = () => ScrollTrigger.refresh();
          window.addEventListener("load", refresh);
          const t = window.setTimeout(refresh, 400);

          return () => {
            window.removeEventListener("load", refresh);
            window.clearTimeout(t);
            tl.scrollTrigger?.kill();
            tl.kill();
            wrapper.classList.remove("is-pinned");
          };
        },
        rootRef,
      );

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [flavors.length], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef} className="scroll-mt-24">
      <div ref={wrapRef} className="flavor-stack-wrap flex w-full flex-col">
        {flavors.map((flavor, index) => (
          <FlavorPanel
            key={flavor.title}
            flavor={flavor}
            brand={brand}
            brandAlt={brandAlt}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

function FlavorPanel({
  flavor,
  brand,
  brandAlt,
  index,
}: {
  flavor: Flavor;
  brand: StaticImageData;
  brandAlt: string;
  index: number;
}) {
  const light = flavor.ink === "light";
  const body = light ? "text-white" : "text-[#0c1003]";
  const bodyMuted = light ? "text-white/95" : "text-[#0c1003]/95";
  const outline =
    flavor.outlineInk === "dark"
      ? "border-[#0c1003] text-[#0c1003] hover:bg-[#0c1003] hover:text-white"
      : "border-white text-white hover:bg-white hover:text-[#0c1003]";

  return (
    <div
      className="flavor-stack-card will-change-transform lg:flex lg:items-start lg:justify-center lg:pt-6"
      style={{ zIndex: index + 1 }}
    >
      <div className="relative isolate flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#0c1003] px-4 lg:block lg:min-h-0 lg:aspect-[1180/600] lg:max-w-[1180px] lg:overflow-visible lg:bg-transparent lg:px-6">
        {/* ---- torn paper: mobile (portrait; claw already cut out of the
             colored shape, same technique as desktop).
             Stretched rather than object-cover: cover crops the top on
             viewports wider than the artboard and eats the torn corner. ---- */}
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative torn-paper shape */}
        <img
          src={flavor.torn.tall}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-fill lg:hidden"
        />

        {/* ---- torn paper: desktop (landscape, 2 layers) ---- */}
        <div className="absolute inset-0 hidden overflow-hidden lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative torn-paper shape */}
          <img
            src="/assets/bebidas/torn-back.svg"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-left"
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative torn-paper shape */}
          <img
            src={flavor.torn.wide}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-left"
          />
        </div>

        {/* ---- content ---- */}
        <div
          className={`relative z-10 flex w-full max-w-[360px] flex-col items-center gap-[30px] text-center ${body} lg:mx-auto lg:h-full lg:max-w-[940px] lg:flex-row lg:items-center lg:justify-center lg:gap-[139px] lg:text-left`}
        >
          <div className="flex shrink-0 flex-col items-center gap-[11px] lg:w-[450px] lg:shrink-0 lg:items-start lg:gap-5">
            <Image
              src={brand}
              alt={brandAlt}
              className="h-[56px] w-auto max-w-[114px] object-contain lg:h-[64px] lg:max-w-[180px] lg:object-left"
            />
            <h2 className="text-[28px] font-extrabold uppercase leading-[1.3] lg:text-[36px] lg:leading-[1.15]">
              {flavor.title}
            </h2>
            <p className="max-w-[268px] text-[14px] leading-[1.5] lg:max-w-[402px] lg:text-[22px]">
              <span className="font-bold">Sobre o sabor:</span> {flavor.taste}
            </p>

            <div className="flex flex-nowrap justify-center gap-[9px] lg:justify-start lg:gap-4">
              <button
                type="button"
                className={`h-[30px] w-[130px] shrink-0 -skew-x-12 border-2 transition-colors ${outline} lg:h-[43px] lg:w-[187px]`}
              >
                <span className="flex skew-x-12 items-center justify-center text-[8px] font-bold uppercase tracking-wide lg:text-[12px]">
                  Tabela nutricional
                </span>
              </button>
              <button
                type="button"
                className="h-[30px] w-[130px] shrink-0 -skew-x-12 bg-white text-[#0c1003] shadow-[0_-8px_51px_rgba(255,255,255,0.32),0_3px_2px_rgba(255,255,255,0.25)] transition-transform hover:-translate-y-0.5 lg:h-[43px] lg:w-[187px]"
              >
                <span className="flex skew-x-12 items-center justify-center text-[8px] font-bold uppercase tracking-wide lg:text-[12px]">
                  Compra Online
                </span>
              </button>
            </div>

            <p
              className={`max-w-[286px] text-[8px] leading-[1.5] ${bodyMuted} lg:max-w-[412px] lg:text-[12px]`}
            >
              {flavor.description}
            </p>
          </div>

          <Image
            src={flavor.can}
            alt={flavor.title}
            className="h-[clamp(250px,48svh,460px)] w-auto shrink-0 self-center object-contain drop-shadow-[0_24px_44px_rgba(0,0,0,0.4)] lg:h-[79%]"
          />
        </div>
      </div>
    </div>
  );
}
