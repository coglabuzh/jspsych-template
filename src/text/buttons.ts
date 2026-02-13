import type { LocalizedTextArray, LocalizedText } from "@text/types";

const continueButton: LocalizedTextArray = {
  en: ["Continue"],
  de: ["Weiter"],
  cn: ["继续"],
};

const prevButton: LocalizedTextArray = {
  en: ["Previous"],
  de: ["Zurück"],
  cn: ["上一页"],
};

const nextButton: LocalizedTextArray = {
  en: ["Next"],
  de: ["Weiter"],
  cn: ["下一页"],
};

const submitButton: LocalizedTextArray = {
  en: ["Submit"],
  de: ["Bestätigen"],
  cn: ["提交"],
};

export const BUTTON_INFO = {
  continueButton,
  prevButton,
  nextButton,
  submitButton,
};
