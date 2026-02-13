export const LANGS = ["en", "de", "cn"] as const;

export type Lang = (typeof LANGS)[number];

export type LocalizedText = Partial<Record<Lang, string>>;
export type LocalizedTextArray = Partial<Record<Lang, string[]>>;
