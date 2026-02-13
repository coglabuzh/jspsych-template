import type { Lang, LocalizedText, LocalizedTextArray } from "@text/types";

export function translateText(
  dict: LocalizedText,
  lang: string,
  fallback?: Lang
): string;
export function translateText(
  dict: LocalizedTextArray,
  lang: string,
  fallback?: Lang
): string[];
export function translateText(
  dict: LocalizedText | LocalizedTextArray,
  lang: string,
  fallback: Lang = "en"
) {
  const key = (lang in dict ? lang : fallback) as Lang;
  const value = dict[key] ?? dict[fallback];
  if (value !== undefined) return value;
  const hasArrayValues = Object.values(dict).some(Array.isArray);
  return hasArrayValues ? [] : "@settings";
}
