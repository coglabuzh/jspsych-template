import type { LocalizedText } from "@text/types";

const description: LocalizedText = {
  en: `The description of your experiment. You can specify the description in different languages and use the CONSENT.LANG variable to switch between them.`,
  de: `Die Beschreibung Ihres Experiments. Sie koennen die Beschreibung in verschiedenen Sprachen hinterlegen und ueber CONSENT.LANG wechseln.`,
  cn: `这里是实验描述。您可以提供多语言版本，并使用 CONSENT.LANG 切换显示语言。`,
};

export const CONSENT_INFO = {
  description,
};
