// jsPsych official plugin
import htmlButtonResponse from "@jspsych/plugin-html-button-response";
import { SCREEN_INFO, BUTTON_INFO, translateText } from "@text";
import { config } from "@settings";
const { CONSENT } = config;

export const welcome_screen = {
  type: htmlButtonResponse,
  stimulus: function () {
    return translateText(SCREEN_INFO.welcome, CONSENT.LANG);
  },
  choices: function () {
    return translateText(BUTTON_INFO.continueButton, CONSENT.LANG);
  },
  data: { screenID: "welcome" },
};
