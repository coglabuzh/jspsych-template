// jsPsych official plugin
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";

// Basic Functions
import { countDownTimer, convertMsToSeconds } from "@lib/general/timer";

// Global variables
import { config } from "@settings";
let { TIMING, CONSENT } = config;
import { SCREEN_INFO, translateText } from "@text";

// display a cue screen with a countdown timer.
export const trial_start_screen = {
  type: htmlKeyboardResponse,
  stimulus: function () {
    return `<div class="fb-text">
    ${translateText(SCREEN_INFO.startTrial, CONSENT.LANG)}
    <br>
    <br>
  </div>`;
  },
  choices: [" "], // The only valid key response is the space bar.
  trial_duration: TIMING.START, // Time to wait before automatically proceeding with the next trial.
  post_trial_gap: 1000, // forced inter-trial interval after participant's response.
  on_load: function () {
    const time = convertMsToSeconds(TIMING.START);
    countDownTimer(time, "clock");
  },
  on_finish: function () {},
};

/** display a break screen with a countdown timer.
 *
 */
export function create_break_screen(blockID, nBlock) {
  return {
    type: htmlKeyboardResponse,
    stimulus: SCREEN_INFO.blockBreak(blockID, nBlock, CONSENT.LANG),
    choices: [" "],
    trial_duration: config.TIMING.BREAK * 1000,
    post_trial_gap: 1000,
    on_load: function () {
      countDownTimer(config.TIMING.BREAK, "break");
    },
    on_finish: function () {},
  };
}
