import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

/**
 * GSAP's official "seamless horizontal loop" helper.
 * https://gsap.com/docs/v3/HelperFunctions/#loop
 *
 * Returns a timeline (repeat: -1 friendly) with extra methods:
 *   .next() / .previous() / .toIndex(i, vars) / .current() / .closestIndex()
 *
 * config: { speed, repeat, paused, paddingRight, snap, draggable, center, onChange }
 */
type LoopConfig = {
  speed?: number;
  repeat?: number;
  paused?: boolean;
  paddingRight?: number | string;
  snap?: number | false;
  draggable?: boolean;
  center?: boolean | string | Element;
  reversed?: boolean;
  onChange?: (item: Element, index: number) => void;
};

type LoopTimeline = gsap.core.Timeline & {
  next: (vars?: gsap.TweenVars) => gsap.core.Tween | gsap.core.Timeline;
  previous: (vars?: gsap.TweenVars) => gsap.core.Tween | gsap.core.Timeline;
  toIndex: (
    index: number,
    vars?: gsap.TweenVars,
  ) => gsap.core.Tween | gsap.core.Timeline;
  current: () => number;
  closestIndex: (setCurrent?: boolean) => number;
  times: number[];
  draggable?: Draggable;
};

export function horizontalLoop(
  targets: gsap.DOMTarget,
  config: LoopConfig = {},
): LoopTimeline {
  let timeline!: LoopTimeline;
  const items = gsap.utils.toArray<HTMLElement>(targets);

  gsap.context(() => {
    const onChange = config.onChange;
    let lastIndex = 0;
    const tl = gsap.timeline({
      repeat: config.repeat,
      onUpdate:
        onChange &&
        (() => {
          const i = tl.closestIndex(true);
          if (lastIndex !== i) {
            lastIndex = i;
            onChange(items[i], i);
          }
        }),
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () =>
        tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }) as LoopTimeline;

    const length = items.length;
    const startX = items[0].offsetLeft;
    const times: number[] = [];
    const widths: number[] = [];
    const spaceBefore: number[] = [];
    const xPercents: number[] = [];
    let curIndex = 0;
    let indexIsDirty = false;
    const center = config.center;
    const pixelsPerSecond = (config.speed || 1) * 100;
    const snap =
      config.snap === false
        ? (v: number) => v
        : gsap.utils.snap(config.snap || 1);
    let timeOffset = 0;
    const container =
      center === true
        ? (items[0].parentNode as HTMLElement)
        : (gsap.utils.toArray<HTMLElement>(center as gsap.DOMTarget)[0] ||
          (items[0].parentNode as HTMLElement));
    let totalWidth = 0;

    const getTotalWidth = () =>
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      spaceBefore[0] +
      items[length - 1].offsetWidth *
        Number(gsap.getProperty(items[length - 1], "scaleX")) +
      (parseFloat(String(config.paddingRight)) || 0);

    const populateWidths = () => {
      let b1 = container.getBoundingClientRect();
      let b2: DOMRect;
      items.forEach((el, i) => {
        widths[i] = parseFloat(String(gsap.getProperty(el, "width", "px")));
        xPercents[i] = snap(
          (parseFloat(String(gsap.getProperty(el, "x", "px"))) / widths[i]) *
            100 +
            Number(gsap.getProperty(el, "xPercent")),
        );
        b2 = el.getBoundingClientRect();
        spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
        b1 = b2;
      });
      gsap.set(items, { xPercent: (i: number) => xPercents[i] });
      totalWidth = getTotalWidth();
    };

    let timeWrap: (v: number) => number;

    const populateOffsets = () => {
      timeOffset = center
        ? (tl.duration() * (container.offsetWidth / 2)) / totalWidth
        : 0;
      if (center) {
        times.forEach((t, i) => {
          times[i] = timeWrap(
            (tl.labels["label" + i] as number) +
              (tl.duration() * widths[i]) / 2 / totalWidth -
              timeOffset,
          );
        });
      }
    };

    const getClosest = (values: number[], value: number, wrap: number) => {
      let i = values.length;
      let closest = 1e10;
      let index = 0;
      let d: number;
      while (i--) {
        d = Math.abs(values[i] - value);
        if (d > wrap / 2) d = wrap - d;
        if (d < closest) {
          closest = d;
          index = i;
        }
      }
      return index;
    };

    const populateTimeline = () => {
      let i: number;
      let item: HTMLElement;
      let curX: number;
      let distanceToStart: number;
      let distanceToLoop: number;
      tl.clear();
      for (i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
        distanceToLoop =
          distanceToStart + widths[i] * Number(gsap.getProperty(item, "scaleX"));
        tl.to(
          item,
          {
            xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0,
        )
          .fromTo(
            item,
            {
              xPercent: snap(
                ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
              ),
            },
            {
              xPercent: xPercents[i],
              duration:
                (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond,
          )
          .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }
      timeWrap = gsap.utils.wrap(0, tl.duration());
    };

    const refresh = (deep?: boolean) => {
      const progress = tl.progress();
      tl.progress(0, true);
      populateWidths();
      if (deep) populateTimeline();
      populateOffsets();
      if (deep && tl.draggable && tl.paused()) {
        tl.time(times[curIndex], true);
      } else {
        tl.progress(progress, true);
      }
    };

    const onResize = () => refresh(true);

    let proxy: HTMLDivElement | undefined;

    gsap.set(items, { x: 0 });
    populateWidths();
    populateTimeline();
    populateOffsets();
    window.addEventListener("resize", onResize);

    function toIndex(index: number, vars?: gsap.TweenVars) {
      vars = vars || {};
      if (Math.abs(index - curIndex) > length / 2) {
        index += index > curIndex ? -length : length;
      }
      const newIndex = gsap.utils.wrap(0, length, index);
      let time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) {
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) {
        vars.modifiers = { time: timeWrap };
      }
      curIndex = newIndex;
      vars.overwrite = true;
      if (proxy) gsap.killTweensOf(proxy);
      return vars.duration === 0
        ? tl.time(timeWrap(time))
        : tl.tweenTo(time, vars);
    }

    tl.toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars);
    tl.closestIndex = (setCurrent?: boolean) => {
      const index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
    tl.next = (vars?: gsap.TweenVars) => toIndex(tl.current() + 1, vars);
    tl.previous = (vars?: gsap.TweenVars) => toIndex(tl.current() - 1, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true);

    if (config.reversed) {
      tl.vars.onReverseComplete?.();
      tl.reverse();
    }

    if (config.draggable && typeof Draggable === "function") {
      proxy = document.createElement("div");
      const wrap = gsap.utils.wrap(0, 1);
      let ratio: number;
      let startProgress: number;
      // eslint-disable-next-line prefer-const -- referenced by callbacks defined above the assignment
      let draggable: Draggable;
      let lastSnap: number;
      let initChangeX: number;
      let wasPlaying: boolean;
      const align = () =>
        tl.progress(
          wrap(startProgress + (draggable.startX - draggable.x) * ratio),
        );
      const syncIndex = () => tl.closestIndex(true);

      draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode as HTMLElement,
        type: "x",
        onPressInit() {
          const x = this.x;
          gsap.killTweensOf(tl);
          wasPlaying = !tl.paused();
          tl.pause();
          startProgress = tl.progress();
          refresh();
          ratio = 1 / totalWidth;
          initChangeX = startProgress / -ratio - x;
          gsap.set(proxy!, { x: startProgress / -ratio });
        },
        onDrag: align,
        onThrowUpdate: align,
        overshootTolerance: 0,
        inertia: true,
        snap(value: number) {
          if (Math.abs(startProgress / -ratio - this.x) < 10) {
            return lastSnap + initChangeX;
          }
          const time = -(value * ratio) * tl.duration();
          const wrappedTime = timeWrap(time);
          const snapTime =
            times[getClosest(times, wrappedTime, tl.duration())];
          let dif = snapTime - wrappedTime;
          if (Math.abs(dif) > tl.duration() / 2) {
            dif += dif < 0 ? tl.duration() : -tl.duration();
          }
          lastSnap = (time + dif) / tl.duration() / -ratio;
          return lastSnap;
        },
        onRelease() {
          syncIndex();
          if (draggable.isThrowing) indexIsDirty = true;
        },
        onThrowComplete: () => {
          syncIndex();
          if (wasPlaying) tl.play();
        },
      })[0];
      tl.draggable = draggable;
    }

    tl.closestIndex(true);
    lastIndex = curIndex;
    if (onChange) onChange(items[curIndex], curIndex);
    timeline = tl;
    return () => window.removeEventListener("resize", onResize);
  });

  return timeline;
}
