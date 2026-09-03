import type { Metadata } from "next";

import { SiteNav } from "@/components/site-nav";
import { getCategory } from "../flavors";
import { FlavorStack } from "../flavor-stack";

export const metadata: Metadata = {
  title: "Bebidas — teste do efeito de scroll",
  description:
    "Página de teste: os sabores da Monster Energy empilhados com o efeito de scroll (GSAP ScrollTrigger).",
  robots: { index: false, follow: false },
};

const monsterEnergy = getCategory("monster-energy");

export default function BebidasTestePage() {
  if (!monsterEnergy) return null;

  return (
    <main className="flex flex-col bg-[#0c1003] text-white">
      <section className="relative w-full pt-[112px]">
        <SiteNav />
      </section>

      <FlavorStack
        flavors={monsterEnergy.flavors}
        brand={monsterEnergy.logo}
        brandAlt={monsterEnergy.name}
      />

      <section className="mx-auto flex min-h-[60vh] w-full max-w-[1180px] items-start justify-center px-6 pt-20 text-[15px] text-[#808080]">
        Fim da lista — a última lata fica fixa por cima de todas até aqui.
      </section>
    </main>
  );
}
