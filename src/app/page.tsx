"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { SiteNav } from "@/components/site-nav";
import { ActivityCarousel } from "@/components/activity-carousel";
import { AthleteCarousel } from "@/components/athlete-carousel";
import { HeroSlider } from "@/components/hero-slider";
import { Reveal } from "@/components/reveal";
import {
  ACTIVITY_IMAGES,
  ATHLETES,
  HERO_SLIDES,
  PRODUCTS,
  SOCIALS,
} from "@/content/home";
import { useLocale } from "@/lib/i18n";
import logo from "../../public/assets/logo.png";

export default function Home() {
  return (
    <main className="flex flex-col bg-[#0c1003] text-white">
      <Hero />
      <ProductsSection />
      <AthletesSection />
      <ActivitiesSection />
      <Footer />
    </main>
  );
}

function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative isolate min-h-[700px] w-full overflow-hidden">
      <HeroSlider slides={HERO_SLIDES} />
      {/* The artboard has no overlay at all — its hero photo is already dark at
          the edges. Keep only a soft left scrim and a short bottom fade, enough
          to hold the copy on the brighter slides that aren't in the artboard
          and to blend into the page below. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0c1003] to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#0c1003]/85 via-[#0c1003]/35 via-45% to-transparent"
      />

      <SiteNav />

      <div className="relative z-10 mx-auto flex min-h-[600px] w-full max-w-[1180px] flex-col justify-end px-6 pb-[110px] sm:min-h-[700px] sm:pb-[88px]">
        <div className="flex max-w-[450px] flex-col items-start gap-4">
          <h1 className="text-[40px] font-extrabold uppercase leading-[1.1] tracking-tight sm:text-[52px] lg:w-[462px] lg:text-[64px] lg:leading-[1.3]">
            <span className="font-black italic text-[#b1e15a]">
              {t.hero.titleAccent}
            </span>{" "}
            {t.hero.titleRest}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <p className="w-[186px] text-[16px] leading-[1.5] text-[#b6b6b6]">
              {t.hero.tagline}
            </p>
            {/* The glow is a filter on the wrapper, not a box-shadow on the
                clipped shape — clip-path would discard the shadow along with
                everything else it cuts.
                Two layers, not the artboard's six: chained drop-shadows
                compound (each one casts a shadow of the previous result), so
                stacking six turned a soft glow into a halo. */}
            <a
              href="#produtos"
              className="relative inline-flex h-[53px] w-[230px] shrink-0 transition-transform hover:-translate-y-0.5"
              style={{
                filter: [
                  "drop-shadow(0 -6px 26px rgba(177,225,90,0.28))",
                  "drop-shadow(0 3px 4px rgba(0,0,0,0.25))",
                ].join(" "),
              }}
            >
              <span
                className="flex size-full items-center justify-center bg-[#b1e15a] text-[13.333px] font-bold uppercase tracking-wide text-[#0c1003]"
                style={{ clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0% 100%)" }}
              >
                {t.hero.cta}
              </span>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}

function SectionHeading({
  title,
  action,
  actionHref = "#",
}: {
  title: ReactNode;
  action: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <h2 className="max-w-[420px] text-[32px] font-bold uppercase leading-[1.3] sm:text-[40px] lg:text-[48px]">
        {title}
      </h2>
      <Link
        href={actionHref}
        className="text-[16px] uppercase text-[#b6b6b6] transition-colors hover:text-white"
      >
        {action}
      </Link>
    </div>
  );
}

function ProductsSection() {
  const { t } = useLocale();

  return (
    <section id="produtos" className="mx-auto w-full max-w-[1180px] px-6 py-20">
      <Reveal>
        <SectionHeading
          title={
            <>
              {t.products.line1}
              <br />
              <span className="font-black italic text-[#b1e15a]">
                {t.products.line2}
              </span>
            </>
          }
          action={t.products.action}
          actionHref="/bebidas"
        />
      </Reveal>

      {/* the cards come in one after another, left to right */}
      <Reveal
        stagger
        y={40}
        className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
      >
        {PRODUCTS.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </Reveal>
    </section>
  );
}

function ProductCard({
  name,
  image,
  href,
}: {
  name: string;
  image: (typeof PRODUCTS)[number]["image"];
  href: string;
}) {
  return (
    <Link
      href={href}
      // gradient holds #0c1003 to 31.8%, then ramps to the accent green
      className="product-card card-hover group relative flex flex-col overflow-hidden bg-[linear-gradient(180deg,#0c1003_31.844%,#b1e15a_111.3%)] will-change-transform"
    >
      <div className="relative flex h-[360px] items-end justify-center px-6 pt-10 lg:h-[398px]">
        <Image
          src={image}
          alt={name}
          className="h-full w-auto max-w-full object-contain object-bottom drop-shadow-[0_24px_44px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:-translate-y-2"
        />
      </div>
      <div className="flex h-[87px] shrink-0 items-center justify-center bg-[#0c1003] px-2">
        <span className="card-name text-center text-[18px] font-bold uppercase leading-[1.3]">
          {name}
        </span>
      </div>
    </Link>
  );
}

function AthletesSection() {
  const { t } = useLocale();

  return (
    <section className="mx-auto w-full max-w-[1180px] px-6 py-20">
      <SectionHeading
        title={
          <span className="font-black italic text-[#b1e15a]">
            {t.athletes.title}
          </span>
        }
        action={t.athletes.action}
      />

      <div className="mt-12">
        <AthleteCarousel items={ATHLETES} />
      </div>
    </section>
  );
}

function ActivitiesSection() {
  const { t } = useLocale();
  // photo comes from content, caption from the dictionary
  const items = ACTIVITY_IMAGES.map((image, i) => ({
    image,
    ...t.activities.items[i],
  }));

  return (
    <section className="mx-auto w-full max-w-[1180px] px-6 py-20">
      <SectionHeading
        title={
          <>
            {t.activities.line1}
            <br />
            <span className="font-black italic text-[#b1e15a]">
              {t.activities.line2}
            </span>
          </>
        }
        action={t.activities.action}
      />

      <div className="mt-16">
        <ActivityCarousel items={items} />
      </div>
      <p className="mt-5 text-[13px] text-[#808080]">
        {t.activities.dragHint}
      </p>
    </section>
  );
}

function Footer() {
  const { t } = useLocale();

  return (
    <footer className="mx-auto w-full max-w-[1180px] px-6 py-16">
      <div className="flex flex-col gap-12 border-t border-white/10 pt-12 md:flex-row md:justify-between">
        <div className="flex flex-col gap-6">
          <Image
            src={logo}
            alt="Monster Energy"
            className="h-auto w-[187px] max-w-full"
          />
          <ul className="flex gap-3">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href="#"
                  aria-label={social.label}
                  className="flex size-[38px] items-center justify-center rounded-full border border-white transition-colors hover:bg-white/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- small static decorative SVG */}
                  <img src={social.src} alt="" className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-16">
          {t.footer.columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <p className="text-[19px] font-medium">{column.title}</p>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[16px] text-[#b6b6b6] transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <ul className="mt-12 flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-[#808080]">
        {t.footer.legal.map((link) => (
          <li key={link}>
            <a href="#" className="transition-colors hover:text-white">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
