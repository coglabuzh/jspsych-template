// jsPsych official plugin
import htmlButtonResponse from "@jspsych/plugin-html-button-response";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";

// Global variables
import { TEXT } from "../task-fun/text";

// Global variables
import { expInfo } from "../settings";
import { jsPsych } from "../jsp";


export const exp_start_screen = {
  type: htmlButtonResponse,
  stimulus: function () {
    return TEXT.startExperiment[expInfo.LANG];
  },
  choices: function () {
    return TEXT.continueButton[expInfo.LANG];
  },
};

export const pra_instr_screen = {
  type: htmlButtonResponse,
  stimulus: function () {
    return TEXT.startPractice[expInfo.LANG];
  },
  choices: function () {
    return TEXT.continueButton[expInfo.LANG];
  },
};
