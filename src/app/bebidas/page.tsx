import type { Metadata } from "next";

import { BebidasView } from "./bebidas-view";

export const metadata: Metadata = {
  title: "Bebidas — Monster Energy",
  description:
    "Conheça toda a linha Monster Energy: escolha uma categoria e veja os sabores e as informações de cada lata.",
};

export default function BebidasPage() {
  return <BebidasView />;
}
