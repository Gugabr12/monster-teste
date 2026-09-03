import type { Activity } from "@/components/activity-carousel";
import type { Athlete } from "@/components/athlete-carousel";
import type { HeroSlide } from "@/components/hero-slider";

import hero from "../../public/assets/hero.png";
import athlete1 from "../../public/assets/atletas/athlete-1.png";
import image30 from "../../public/assets/image30.png";
import image31 from "../../public/assets/image31.png";
import image32 from "../../public/assets/image32.png";
import image33 from "../../public/assets/image33.png";
import rectangle10 from "../../public/assets/rectangle10.png";
import rectangle11 from "../../public/assets/rectangle11.png";
import rectangle12 from "../../public/assets/rectangle12.png";
import rectangle13 from "../../public/assets/rectangle13.png";

/**
 * Everything on the homepage that is copy or artwork rather than layout.
 * Edit here; the components in app/page.tsx stay put.
 */

/** Hero slideshow. Only the first photo is a real hero shot — the rest are
 *  stand-ins so the rotation runs. Drop new files in /public/assets. */
export const HERO_SLIDES: HeroSlide[] = [
  { image: hero, alt: "Lata Monster Energy cercada de esportes de ação" },
  { image: rectangle11, alt: "Atletas Monster Energy" },
  { image: rectangle13, alt: "Surfista Monster Energy numa onda" },
  { image: rectangle10, alt: "Skatista Monster Energy num evento" },
  { image: rectangle12, alt: "Ação Monster Energy" },
];

/** `href` points at /bebidas/<id de flavors.ts>; Juice has no category yet, so
 *  it falls back to the picker. */
export const PRODUCTS = [
  {
    name: "Monster Energy",
    image: image30,
    href: "/bebidas/monster-energy",
  },
  { name: "Monster Ultra", image: image31, href: "/bebidas/monster-ultra" },
  {
    name: "Monster Tea",
    image: image32,
    href: "/bebidas/monster-dragon-ice-tea",
  },
  { name: "Monster Juice", image: image33, href: "/bebidas" },
];

/** The artboard repeats one athlete as placeholder art; swap in real photos
 *  and names as they land. */
export const ATHLETES: Athlete[] = [
  { image: athlete1, name: "Enea Bastianini", sport: "MotoGP" },
  { image: athlete1, name: "Enea Bastianini", sport: "MotoGP" },
  { image: athlete1, name: "Enea Bastianini", sport: "MotoGP" },
  { image: athlete1, name: "Enea Bastianini", sport: "MotoGP" },
  { image: athlete1, name: "Enea Bastianini", sport: "MotoGP" },
  { image: athlete1, name: "Enea Bastianini", sport: "MotoGP" },
];

export const ACTIVITIES: Activity[] = [
  {
    image: rectangle11,
    category: "Ação / Atletas",
    headline: "O elenco Monster Energy que domina cada modalidade",
    alt: "Atletas Monster Energy",
  },
  {
    image: rectangle13,
    category: "Ação / Surfe",
    headline: "Monster Energy nas ondas: os drops mais insanos do ano",
    alt: "Surfista Monster Energy numa onda",
  },
  {
    image: rectangle10,
    category: "Ação / Skateboard",
    headline: "Atletas da Monster Energy conquistam medalhas de ouro",
    alt: "Skatista Monster Energy num evento",
  },
  {
    image: rectangle13,
    category: "Ação / Big Wave",
    headline: "Sessão histórica em Nazaré com o time Monster",
    alt: "Surfista numa onda gigante",
  },
  {
    image: rectangle10,
    category: "Ação / Street",
    headline: "Os melhores lines do campeonato mundial de street",
    alt: "Skatista numa manobra de rua",
  },
  {
    image: rectangle11,
    category: "Ação / Bastidores",
    headline: "Um dia na estrada com os atletas Monster Energy",
    alt: "Bastidores dos atletas Monster",
  },
];

export const SOCIALS = [
  { label: "Instagram", src: "/assets/icon-instagram.svg" },
  { label: "X", src: "/assets/icon-x.svg" },
  { label: "TikTok", src: "/assets/icon-tiktok.svg" },
  { label: "YouTube", src: "/assets/icon-youtube.svg" },
  { label: "Threads", src: "/assets/icon-threads.svg" },
];

export const FOOTER_COLUMNS = [
  { title: "A empresa", links: ["Carreiras", "Sobre nós", "Monster Army"] },
  { title: "Suporte", links: ["Perguntas Frequentes", "Entre em contato"] },
];

export const LEGAL_LINKS = [
  "© Monster Energy Company",
  "Todos os direitos reservados",
  "Termos de uso",
  "Política de privacidade",
  "Política de cookies",
  "Não venda minhas informações",
];
