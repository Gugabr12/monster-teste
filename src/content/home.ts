import type { Activity } from "@/components/activity-carousel";
import type { Athlete } from "@/components/athlete-carousel";
import type { HeroSlide } from "@/components/hero-slider";

import heroCan from "../../public/assets/hero/hero-can.png";
import heroRiders from "../../public/assets/hero/hero-riders.png";
import heroXgames from "../../public/assets/hero/hero-xgames.png";
import athlete1 from "../../public/assets/atletas/athlete-1.png";
import image30 from "../../public/assets/image30.png";
import image31 from "../../public/assets/image31.png";
import image32 from "../../public/assets/image32.png";
import image33 from "../../public/assets/image33.png";
import actRiders from "../../public/assets/atividades/riders.png";
import actXgames from "../../public/assets/atividades/x-games.png";
import actSurf from "../../public/assets/atividades/surf.png";

/**
 * Everything on the homepage that is copy or artwork rather than layout.
 * Edit here; the components in app/page.tsx stay put.
 */

/** Hero slideshow — three 1920x700 artboards. */
export const HERO_SLIDES: HeroSlide[] = [
  {
    image: heroCan,
    alt: "Lata Monster Energy cercada de skates, tênis e caixas de som",
  },
  {
    image: heroRiders,
    alt: "Dois pilotos Monster Energy de costas um para o outro segurando seus capacetes",
  },
  {
    image: heroXgames,
    alt: "Skatista Monster Energy voando na rampa vertical do X Games",
  },
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

/** Three photos from the artboard, cycled so the loop always fills the row. */
export const ACTIVITIES: Activity[] = [
  {
    image: actRiders,
    category: "Ação / Atletas",
    headline: "O elenco Monster Energy que domina cada modalidade",
    alt: "Dois pilotos Monster Energy de costas segurando seus capacetes",
  },
  {
    image: actXgames,
    category: "Ação / Skateboard",
    headline: "Atletas da Monster Energy conquistam medalhas de ouro",
    alt: "Skatista na rampa vertical do X Games",
  },
  {
    image: actSurf,
    category: "Ação / Surfe",
    headline: "Monster Energy nas ondas: os drops mais insanos do ano",
    alt: "Surfista Monster Energy num aéreo sobre a onda",
  },
  {
    image: actRiders,
    category: "Ação / Bastidores",
    headline: "Um dia na estrada com os atletas Monster Energy",
    alt: "Dois pilotos Monster Energy de costas segurando seus capacetes",
  },
  {
    image: actXgames,
    category: "Ação / X Games",
    headline: "A noite em que o vert virou show no Caesars Superdome",
    alt: "Skatista na rampa vertical do X Games",
  },
  {
    image: actSurf,
    category: "Ação / Surfe",
    headline: "O aéreo perfeito que fechou a etapa do campeonato",
    alt: "Surfista Monster Energy num aéreo sobre a onda",
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
