"use client";

import Image from "next/image";
import Link from "next/link";

import { SiteNav } from "@/components/site-nav";
import { useLocale } from "@/lib/i18n";
import { getCategory } from "../flavors";
import { FlavorStack } from "../flavor-stack";

/** The visible half of the category route, split out so it can read the locale. */
export function CategoryView({ categoryId }: { categoryId: string }) {
  const { t } = useLocale();
  const category = getCategory(categoryId);
  if (!category) return null;

  return (
    <main className="flex flex-col bg-[#0c1003] text-white">
      <section className="relative w-full px-6 pb-10 pt-[132px]">
        <SiteNav />
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-5">
          <Link
            href="/bebidas"
            className="text-[13px] uppercase tracking-[0.2em] text-[#b6b6b6] transition-colors hover:text-white"
          >
            {t.drinks.allCategories}
          </Link>
          <Image
            src={category.logo}
            alt={category.name}
            className="h-[64px] w-auto max-w-[220px] object-contain object-left"
            priority
          />
        </div>
      </section>

      {category.flavors.length > 0 ? (
        <FlavorStack
          flavors={category.flavors}
          brand={category.panelLogo ?? category.logo}
          brandAlt={category.name}
        />
      ) : (
        <div className="mx-auto w-full max-w-[1180px] px-6 pb-24">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-16 text-center">
            <p className="text-[20px] font-bold uppercase">{category.name}</p>
            <p className="mt-2 text-[15px] text-[#808080]">
              {t.drinks.comingSoon}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
