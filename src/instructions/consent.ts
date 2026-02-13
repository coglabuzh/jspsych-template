// jsPsych official plugin
import externalHtml from "@jspsych/plugin-external-html";

// Task Functions
import { checkConsent, checkNotice } from "@lib/general/checkFun";
import { CONSENT_INFO, translateText } from "@text";

// Global variables
import { config } from "@settings";
const { CONSENT, RUN_PROLIFIC } = config;

function fillConsentTemplate(template: string): string {
  const values: Record<string, string | number> = {
    DESCRIPTION: translateText(CONSENT_INFO.description, CONSENT.LANG),
    DURATION: CONSENT.DURATION,
    PARTICIPANT_ID_LABEL: RUN_PROLIFIC ? "Prolific-ID" : "Participant-ID",
    CONTACT_PERSON: CONSENT.CONTACT_PERSON,
    CONTACT_EMAIL: CONSENT.CONTACT_EMAIL,
    INSTITUTION: CONSENT.INSTITUTION,
  };

  return Object.entries(values).reduce((result, [key, value]) => {
    return result.replaceAll(`{{${key}}}`, String(value));
  }, template);
}

async function getTemplatedConsentUrl(): Promise<string> {
  const url = `assets/external-html/consent-${CONSENT.LANG}.html`;
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
    check_fn: checkConsent,
  };
}

/**
 *  A notice screen, including several items that participants need to be noticed if they do the experiment online.
 */
export const notice_screen = {
  type: externalHtml,
  url: function () {
    return `assets/external-html/notice-${CONSENT.LANG}.html`;
  },
  cont_btn: "ready",
  check_fn: checkNotice,
};
