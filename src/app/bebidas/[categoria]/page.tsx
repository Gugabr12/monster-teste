import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { SiteNav } from "@/components/site-nav";
import { CATEGORIES, getCategory } from "../flavors";
import { FlavorStack } from "../flavor-stack";

type Params = { params: Promise<{ categoria: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ categoria: category.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { categoria } = await params;
  const category = getCategory(categoria);
  if (!category) return {};

  return {
    title: `${category.name} — Bebidas`,
    description: category.flavors.length
      ? `Sabores e informações das latas ${category.name}.`
      : `Os sabores ${category.name} chegam em breve.`,
  };
}

export default async function CategoriaPage({ params }: Params) {
  const { categoria } = await params;
  const category = getCategory(categoria);
  if (!category) notFound();

  return (
    <main className="flex flex-col bg-[#0c1003] text-white">
      <section className="relative w-full px-6 pb-10 pt-[132px]">
        <SiteNav />
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-5">
          <Link
            href="/bebidas"
            className="text-[13px] uppercase tracking-[0.2em] text-[#b6b6b6] transition-colors hover:text-white"
          >
            [ Todas as categorias ]
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
              Sabores desta categoria em breve.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
