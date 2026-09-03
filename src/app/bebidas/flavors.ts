import type { StaticImageData } from "next/image";

import canGreen from "../../../public/assets/image30.png";
import canBlue from "../../../public/assets/bebidas/can-blue.png";
import tileEnergy from "../../../public/assets/bebidas/tile-energy.png";
import tileUltra from "../../../public/assets/bebidas/tile-ultra.png";
import tileTea from "../../../public/assets/bebidas/tile-tea.png";
import ultraWordmark from "../../../public/assets/bebidas/ultra/logo-ultra.png";
import canUltraWhite from "../../../public/assets/bebidas/ultra/can-white.png";
import canUltraViolet from "../../../public/assets/bebidas/ultra/can-violet.png";
import canUltraWatermelon from "../../../public/assets/bebidas/ultra/can-watermelon.png";
import canUltraPeachy from "../../../public/assets/bebidas/ultra/can-peachy.png";
import canUltraMango from "../../../public/assets/bebidas/ultra/can-mango.png";
import canUltraMango2 from "../../../public/assets/bebidas/ultra/can-mango-2.png";

export type Flavor = {
  /** Product name — brand, so it is not translated. */
  title: string;
  /** Looks up taste + description in content/dictionary.ts. */
  key: string;
  can: StaticImageData;
  /**
   * Torn-paper backdrop. Two separate artboards, not one file resized:
   * `wide` is the landscape desktop card, `tall` the full-bleed mobile panel.
   */
  torn: { wide: string; tall: string };
  /**
   * Body copy against the panel colour. Default "dark" — near-black type, which
   * is what every Monster Energy panel uses. Saturated Ultra panels set "light".
   */
  ink?: "dark" | "light";
  /**
   * The outlined "tabela nutricional" button. Default "light" (white rule and
   * label), the Monster Energy treatment. The Ultra panels match it to `ink`.
   * Separate from `ink` because the artboards genuinely vary the two apart:
   * Monster Energy pairs dark copy with a white button.
   */
  outlineInk?: "dark" | "light";
};

export type Category = {
  id: string;
  name: string;
  /** Tile shown in the category picker. */
  logo: StaticImageData;
  /** Wordmark inside each flavour panel; falls back to `logo`. */
  panelLogo?: StaticImageData;
  flavors: Flavor[];
};

export const CATEGORIES: Category[] = [
  {
    id: "monster-energy",
    name: "Monster Energy",
    logo: tileEnergy,
    flavors: [
      {
        title: "Monster Energy Original Green",
        key: "energy-original",
        can: canGreen,
        torn: {
          wide: "/assets/bebidas/torn-green.svg",
          tall: "/assets/bebidas/torn-green-m.svg",
        },
      },
      {
        title: "Monster Energy Absolutely Zero",
        key: "energy-zero",
        can: canBlue,
        torn: {
          wide: "/assets/bebidas/torn-blue.svg",
          tall: "/assets/bebidas/torn-blue-m.svg",
        },
      },
      {
        title: "Monster Energy Ultra Paradise",
        key: "energy-paradise",
        can: canGreen,
        torn: {
          wide: "/assets/bebidas/torn-lime.svg",
          tall: "/assets/bebidas/torn-lime-m.svg",
        },
      },
    ],
  },
  {
    id: "monster-ultra",
    name: "Monster Ultra",
    logo: tileUltra,
    panelLogo: ultraWordmark,
    flavors: [
      {
        title: "Monster Energy Ultra White",
        key: "ultra-white",
        can: canUltraWhite,
        torn: {
          wide: "/assets/bebidas/ultra/torn-white.svg",
          tall: "/assets/bebidas/ultra/torn-white-m.svg",
        },
        ink: "dark",
        outlineInk: "dark",
      },
      {
        title: "Monster Energy Ultra Violet",
        key: "ultra-violet",
        can: canUltraViolet,
        torn: {
          wide: "/assets/bebidas/ultra/torn-violet.svg",
          tall: "/assets/bebidas/ultra/torn-violet-m.svg",
        },
        ink: "light",
        outlineInk: "light",
      },
      {
        title: "Monster Energy Ultra Watermelon",
        key: "ultra-watermelon",
        can: canUltraWatermelon,
        torn: {
          wide: "/assets/bebidas/ultra/torn-watermelon.svg",
          tall: "/assets/bebidas/ultra/torn-watermelon-m.svg",
        },
        ink: "light",
        outlineInk: "light",
      },
      {
        title: "Monster Energy Ultra Peachy Keen",
        key: "ultra-peachy",
        // TODO: the artboard still carries the Watermelon copy here.
        can: canUltraPeachy,
        torn: {
          wide: "/assets/bebidas/ultra/torn-peachy.svg",
          tall: "/assets/bebidas/ultra/torn-peachy-m.svg",
        },
        ink: "dark",
        outlineInk: "dark",
      },
      {
        title: "Monster Ultra Fiesta Mango",
        key: "ultra-mango",
        // TODO: the artboard still carries the Watermelon copy here.
        can: canUltraMango,
        torn: {
          wide: "/assets/bebidas/ultra/torn-mango.svg",
          tall: "/assets/bebidas/ultra/torn-mango-m.svg",
        },
        ink: "light",
        outlineInk: "light",
      },
      {
        // The artboard repeats the Fiesta Mango name on this sixth panel even
        // though its colour and can are their own — it just wasn't renamed.
        title: "Monster Ultra Fiesta Mango",
        key: "ultra-mango-2",
        // TODO: the artboard still carries the Watermelon copy here.
        can: canUltraMango2,
        torn: {
          wide: "/assets/bebidas/ultra/torn-mango-2.svg",
          tall: "/assets/bebidas/ultra/torn-mango-2-m.svg",
        },
        ink: "dark",
        outlineInk: "dark",
      },
    ],
  },
  {
    id: "monster-dragon-ice-tea",
    name: "Monster Dragon Ice Tea",
    logo: tileTea,
    flavors: [],
  },
];

export const getCategory = (id: string) =>
  CATEGORIES.find((c) => c.id === id) ?? null;
