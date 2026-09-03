"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { SiteNav } from "@/components/site-nav";
import { useLocale } from "@/lib/i18n";
import { CATEGORIES, getCategory } from "./flavors";
import { FlavorStack } from "./flavor-stack";

export function BebidasView() {
  const { t } = useLocale();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const flavorsRef = useRef<HTMLDivElement>(null);

  const selected = selectedId ? getCategory(selectedId) : null;

  function handleSelect(id: string) {
    setSelectedId(id);
    requestAnimationFrame(() => {
      flavorsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <main className="flex flex-col bg-[#0c1003] text-white">
      <section className="relative w-full overflow-hidden pb-14 pt-[140px]">
        <SiteNav />

        <div className="mx-auto w-full max-w-[1180px] px-6">
          <p className="mb-8 text-[13px] uppercase tracking-[0.2em] text-[#b6b6b6]">
            {t.drinks.chooseCategory}
          </p>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category) => {
              const active = category.id === selectedId;
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => handleSelect(category.id)}
                  className={`group flex items-center justify-center rounded-xl border px-6 py-9 transition-colors ${
                    active
                      ? "border-[#b1e15a] bg-[#b1e15a]/10"
                      : "border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                >
                  <Image
                    src={category.logo}
                    alt={category.name}
                    className="h-[64px] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div ref={flavorsRef} className="scroll-mt-24">
        {selected === null && (
          <p className="mx-auto w-full max-w-[1180px] px-6 pb-24 text-center text-[15px] text-[#808080]">
            {t.drinks.prompt}
          </p>
        )}

        {selected !== null && selected.flavors.length === 0 && (
          <div className="mx-auto w-full max-w-[1180px] px-6 pb-24">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-16 text-center">
              <p className="text-[20px] font-bold uppercase">{selected.name}</p>
              <p className="mt-2 text-[15px] text-[#808080]">
                {t.drinks.comingSoon}
              </p>
            </div>
          </div>
        )}

        {selected !== null && selected.flavors.length > 0 && (
          <FlavorStack
            // remount on category change so the pinned timeline is rebuilt
            key={selected.id}
            flavors={selected.flavors}
            brand={selected.panelLogo ?? selected.logo}
            brandAlt={selected.name}
          />
        )}
      </div>
    </main>
  );
}
