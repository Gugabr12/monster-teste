"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  /** Reveal each direct child in turn instead of the block as a whole. */
  stagger?: boolean;
  /** How far the content rises, in px. Default 28. */
  y?: number;
  /** Applied to the wrapper, so this can *be* the grid it reveals. */
  className?: string;
};

/**
 * Fades and lifts content the first time it scrolls into view.
 *
 * Uses `gsap.from`, so the markup itself carries no hidden state: with no JS
 * the content just renders. Under `prefers-reduced-motion` it still fades —
 * only the movement is dropped.
 */
export function Reveal({ children, stagger, y = 28, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets: HTMLElement[] = stagger
        ? (Array.from(el.children) as HTMLElement[])
        : [el];
      if (!targets.length) return;

      const mm = gsap.matchMedia();

      mm.add(
        { reduce: "(prefers-reduced-motion: reduce)" },
        (ctx) => {
          const reduce = !!ctx.conditions?.reduce;

          const tween = gsap.from(targets, {
            autoAlpha: 0,
            y: reduce ? 0 : y,
            duration: reduce ? 0.35 : 0.85,
            ease: "power2.out",
            stagger: stagger ? (reduce ? 0.04 : 0.09) : 0,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        },
        ref,
      );

      return () => mm.revert();
    },
    { scope: ref, dependencies: [stagger, y] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
