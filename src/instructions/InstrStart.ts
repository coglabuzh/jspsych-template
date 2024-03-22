import htmlButtonResponse from "@jspsych/plugin-html-button-response";
import Instructions from "@jspsych/plugin-instructions";

// Global variables
import { expInfo } from "../settings";
import { TEXT } from "../task-fun/text";


export const instruction_screen = {
  type: Instructions,
  pages: function () {
    let page_nums = [1];
    let page_list = page_nums.map((i) => {
      return `<div class='main'>
      <img src=assets/images/Instruction-${expInfo.LANG}/Instruction${i}.jpeg class='image'>
      </div>`;
    });
    return page_list;
  },
  show_clickable_nav: true,
  button_label_previous: function () {
    return TEXT.prevButton[expInfo.LANG];
  },
  button_label_next: function () {
    return TEXT.nextButton[expInfo.LANG];
  },
};

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


export const gen_cond_instr = function (cond: string,) {

  let instr_screen = {
  type: htmlButtonResponse,
  stimulus: function(){
    return `<div class='main'>
  <img src=assets/images/Instruction-${expInfo.LANG}/Instr-${cond}.jpeg class='image'>
  </div>`;
  },
  choices: function () {
    return TEXT.continueButton[expInfo.LANG];
  },
  data:{
    screenID: "instruction",
    condition: cond,
  }
};

return instr_screen;

};