"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { LOCALES, useLocale } from "@/lib/i18n";
import logo from "../../public/assets/logo.png";

type NavLink = { label: string; href: string; active?: boolean };

export function SiteNav({ links }: { links?: NavLink[] }) {
  const { locale, setLocale, t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks: NavLink[] = links ?? [
    { label: t.nav.bebidas, href: "/bebidas" },
    { label: t.nav.atletas, href: "#" },
    { label: t.nav.eventos, href: "#" },
    { label: t.nav.novidades, href: "#" },
  ];

  return (
    <nav className="absolute inset-x-0 top-6 z-30 flex justify-center">
      <div className="flex w-full max-w-[1180px] items-center justify-between gap-8 px-6 lg:justify-center lg:gap-[80px]">
        <Link
          href="/"
          aria-label={t.nav.home}
          className="block h-[42px] w-[32px] shrink-0 overflow-hidden"
        >
          {/* nav shows only the Monster claw, matching the Figma header */}
          <Image
            src={logo}
            alt="Monster Energy"
            priority
            className="h-full w-auto max-w-none object-left"
          />
        </Link>

        <ul className="hidden items-center gap-8 text-[16px] uppercase tracking-wide lg:flex xl:gap-12">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`relative py-1 transition-colors hover:text-[#b1e15a] ${
                  link.active ? "text-white" : ""
                }`}
              >
                {link.label}
                {link.active && (
                  <span className="absolute inset-x-0 -bottom-1 h-[3px] bg-white" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {/* language / region switcher */}
          <div className="relative">
            <button
              type="button"
              aria-label={t.nav.changeLanguage}
              aria-expanded={langOpen}
              onClick={() => {
                setLangOpen((v) => !v);
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 transition-opacity hover:opacity-70"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- small static decorative SVG */}
              <img src="/assets/world.svg" alt="" className="size-[30px]" />
              <span className="text-[13px] font-medium uppercase tracking-wide">
                {locale.label}
              </span>
            </button>

            {langOpen && (
              <>
                <button
                  type="button"
                  aria-hidden
                  tabIndex={-1}
                  onClick={() => setLangOpen(false)}
                  className="fixed inset-0 z-10 cursor-default"
                />
                <ul className="absolute right-0 top-[42px] z-20 flex w-[180px] flex-col gap-0.5 rounded-xl border border-white/10 bg-[#0c1003]/95 p-2 text-[13px] uppercase tracking-wide backdrop-blur">
                  {LOCALES.map((option) => (
                    <li key={option.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setLocale(option.id);
                          setLangOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-white/10 ${
                          option.id === locale.id
                            ? "text-[#b1e15a]"
                            : "text-white"
                        }`}
                      >
                        {option.label}
                        {option.id === locale.id && <span aria-hidden>•</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <button
            type="button"
            aria-label={t.nav.openMenu}
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen((v) => !v);
              setLangOpen(false);
            }}
            className="flex size-[30px] flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`h-[2px] w-5 bg-white transition-transform ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-5 bg-white transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[2px] w-5 bg-white transition-transform ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <ul className="absolute inset-x-0 top-[64px] mx-4 flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#0c1003]/95 p-4 text-[16px] uppercase tracking-wide backdrop-blur lg:hidden">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="block rounded-lg px-3 py-2 transition-colors hover:bg-white/10 hover:text-[#b1e15a]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
