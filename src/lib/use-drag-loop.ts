"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";

import { horizontalLoop } from "./horizontal-loop";

gsap.registerPlugin(Draggable, InertiaPlugin, useGSAP);

type DragLoopOptions = {
  /** CSS selector matching the slides inside the track. */
  slide: string;
  /** Drift speed. Default 0.7; reduced-motion parks it at 0. */
  speed?: number;
  /** Gap between slides in px — must match the track's CSS gap. */
  gap?: number;
  /** Rebuild the loop when these change (usually the item count). */
  deps?: unknown[];
};

type DragLoop = {
  /** Spread on the clipping element that wraps the track. */
  rootProps: {
    ref: RefObject<HTMLDivElement | null>;
    onPointerEnter: () => void;
    onPointerLeave: () => void;
  };
  /** Put on the flex row holding the slides. */
  trackRef: RefObject<HTMLDivElement | null>;
};

/**
 * Seamless drag-and-drift carousel behaviour, with no markup of its own.
 *
 * Hides from callers: plugin registration, the reduced-motion opt-out,
 * horizontalLoop's config, the press/release bookkeeping that stops a drag from
 * being resumed by the pointer leaving mid-throw, and teardown. A caller only
 * has to spread `rootProps` and place `trackRef`.
 */
export function useDragLoop({
  slide,
  speed = 0.7,
  gap = 20,
  deps = [],
}: DragLoopOptions): DragLoop {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<ReturnType<typeof horizontalLoop> | null>(null);
  const draggingRef = useRef(false);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const slides = gsap.utils.toArray<HTMLElement>(slide, track);
      if (slides.length < 2) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const loop = horizontalLoop(slides, {
        repeat: -1,
        speed: reduce ? 0 : speed,
        paddingRight: gap,
        draggable: true,
        snap: false,
      });
      loopRef.current = loop;

      if (!reduce) loop.play();

      loop.draggable?.addEventListener?.("press", () => {
        draggingRef.current = true;
      });
      loop.draggable?.addEventListener?.("release", () => {
        draggingRef.current = false;
      });

      return () => {
        loop.draggable?.kill();
        loop.kill();
        loopRef.current = null;
      };
    },
    { scope: rootRef, dependencies: [slide, speed, gap, ...deps] },
  );

  return {
    rootProps: {
      ref: rootRef,
      onPointerEnter: () => loopRef.current?.pause(),
      onPointerLeave: () => {
        // a throw in flight owns the loop until it settles
        if (!draggingRef.current) loopRef.current?.play();
      },
    },
    trackRef,
  };
}
