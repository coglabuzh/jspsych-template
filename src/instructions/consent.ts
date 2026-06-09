// jsPsych official plugin
import externalHtml from "@jspsych/plugin-external-html";

// Task Functions
import {
  validateConsentForm,
  validateNoticeForm,
} from "@lib/forms/consent";
import { CONSENT_INFO, translateText } from "@text";

// Global variables
import { config } from "@settings";

function fillConsentTemplate(template: string): string {
  const values: Record<string, string | number> = {
    DESCRIPTION: translateText(CONSENT_INFO.description, config.CONSENT.LANG),
    DURATION: config.CONSENT.DURATION,
    PARTICIPANT_ID_LABEL: config.PLATFORM.PROLIFIC
      ? "Prolific-ID"
      : "Participant-ID",
    CONTACT_PERSON: config.CONSENT.CONTACT_PERSON,
    CONTACT_EMAIL: config.CONSENT.CONTACT_EMAIL,
    INSTITUTION: config.CONSENT.INSTITUTION,
  };

  return Object.entries(values).reduce((result, [key, value]) => {
    return result.replaceAll(`{{${key}}}`, String(value));
  }, template);
}

async function getTemplatedConsentUrl(): Promise<string> {
  const url = `assets/external-html/consent-${config.CONSENT.LANG}.html`;
  const response = await fetch(url);
  const template = await response.text();
  const html = fillConsentTemplate(template);
  return `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;
}

/* informed consent */
export async function createConsentScreen() {
  return {
    type: externalHtml,
    url: await getTemplatedConsentUrl(),
    cont_btn: "agree",
    check_fn: validateConsentForm,
  };
}

/**
 *  A notice screen, including several items that participants need to be noticed if they do the experiment online.
 */
export const notice_screen = {
  type: externalHtml,
  url: function () {
    return `assets/external-html/notice-${config.CONSENT.LANG}.html`;
  },
  cont_btn: "ready",
  check_fn: validateNoticeForm,
};
