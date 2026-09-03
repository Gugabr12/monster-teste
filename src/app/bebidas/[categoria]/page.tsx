import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CATEGORIES, getCategory } from "../flavors";
import { CategoryView } from "./category-view";

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
  if (!getCategory(categoria)) notFound();

  return <CategoryView categoryId={categoria} />;
}
