"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { dictionaries, type Dict, type Lang } from "@/content/dictionary";

/**
 * The switcher lists countries, but several share a language — Mexico,
 * Argentina and Spain all read Spanish. `lang` is what picks the dictionary;
 * `label` is only what the menu shows.
 */
export const LOCALES = [
  { id: "pt-BR", label: "PT/BR", lang: "pt", htmlLang: "pt-BR" },
  { id: "en-US", label: "EUA", lang: "en", htmlLang: "en-US" },
  { id: "es-MX", label: "MÉXICO", lang: "es", htmlLang: "es-MX" },
  { id: "es-AR", label: "ARGENTINA", lang: "es", htmlLang: "es-AR" },
  { id: "es-ES", label: "ESPANHA", lang: "es", htmlLang: "es-ES" },
  { id: "fr-FR", label: "FRANÇA", lang: "fr", htmlLang: "fr-FR" },
  { id: "de-DE", label: "ALEMANHA", lang: "de", htmlLang: "de-DE" },
] as const satisfies readonly {
  id: string;
  label: string;
  lang: Lang;
  htmlLang: string;
}[];

export type Locale = (typeof LOCALES)[number];
export type LocaleId = Locale["id"];

const DEFAULT: LocaleId = "pt-BR";
const STORAGE_KEY = "monster.locale";

const isLocaleId = (v: unknown): v is LocaleId =>
  typeof v === "string" && LOCALES.some((l) => l.id === v);

/* ------------------------------------------------------------------ *
 * The choice is a browser-level value, not React state: it outlives any
 * component and is read back from localStorage. Keeping it in a tiny store
 * behind useSyncExternalStore means the server renders the default, the
 * client hydrates against that same default, and the saved choice is applied
 * on subscribe — after mount, so the two never disagree.
 * ------------------------------------------------------------------ */
let current: LocaleId = DEFAULT;
let restored = false;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

function subscribe(onChange: () => void) {
  listeners.add(onChange);

  if (!restored) {
    restored = true;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (isLocaleId(saved) && saved !== current) {
        current = saved;
        queueMicrotask(emit);
      }
    } catch {
      // private mode or blocked storage: the default stands
    }
  }

  return () => {
    listeners.delete(onChange);
  };
}

const getSnapshot = () => current;
const getServerSnapshot = () => DEFAULT;

function write(next: LocaleId) {
  if (next === current) return;
  current = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // the choice just will not survive a reload
  }
  emit();
}

type LocaleValue = {
  /** The country the visitor picked. */
  locale: Locale;
  setLocale: (id: LocaleId) => void;
  /** Copy for the active language. */
  t: Dict;
};

const LocaleContext = createContext<LocaleValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const id = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const locale = LOCALES.find((l) => l.id === id) ?? LOCALES[0];

  useEffect(() => {
    document.documentElement.lang = locale.htmlLang;
  }, [locale.htmlLang]);

  const setLocale = useCallback((next: LocaleId) => write(next), []);

  return (
    <LocaleContext.Provider
      value={{ locale, setLocale, t: dictionaries[locale.lang] }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}
