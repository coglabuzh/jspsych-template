// jsPsych official plugin
import fullscreen from "@jspsych/plugin-fullscreen";

// Global variables
import { config } from "@settings";
import { runtimeState } from "@runtimeState";
import { SCREEN_INFO, BUTTON_INFO, translateText } from "@text";
const { CONSENT } = config;

// Switch to fullscreen
export const fullMode_screen = {
  type: fullscreen,
  fullscreen_mode: true,
  message: function () {
    return `<div class="main">
      <p class = 'fb-text'>${translateText(SCREEN_INFO.fullScreen, CONSENT.LANG)}</p>
    </div>`;
  },
  button_label: function () {
    return translateText(BUTTON_INFO.continueButton, CONSENT.LANG);
  },
  on_finish: function () {
    // start to count that how many times participants has left the browser.
    runtimeState.TRACK = true;
    runtimeState.nBLUR = 0;
  },
};
