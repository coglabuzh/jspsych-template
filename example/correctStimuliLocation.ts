import jsPsychPsychophysics from "@kurokida/jspsych-psychophysics";
import jsPsychHtmlButtonResponse from "@jspsych/plugin-html-button-response";
import { initJsPsych } from "jspsych";

const jsPsych = initJsPsych({
  on_finish: function () {
    jsPsych.data.displayData();
  }
})

const instruction = {
  type: jsPsychHtmlButtonResponse,
  stimulus: 'Click on the Start button.',
  choices: ['Start'],
  prompt: "This is sample code for checking the button position. ",
}

const circle_object = {
  obj_type: 'circle',
  startX: 0, // location in the canvas
  startY: 0,
  origin_center: true,
  radius: 10,
  line_color: 'black', // You can use the HTML color name instead of the HEX color.
  fill_color: 'black',
}

const text_object1 = {
  obj_type: 'text',
  startX: 0, // location in the canvas
  startY: 100,
  origin_center: true,
  content: 'Press the Y or N key.',
  font: "22px 'Arial'",
  text_color: 'black',
}

const text_object2 = {
  obj_type: 'text',
  startX: 0, // location in the canvas
  startY: 100,
  origin_center: true,
  content: 'Click the Y or N button.',
  font: "22px 'Arial'",
  text_color: 'black',
}

const trial_without_button = {
  type: jsPsychPsychophysics,
  stimuli: [circle_object, text_object1],
  choices: ['y', 'n'], // The participant can respond to the stimuli using the 'y' or 'n' key.
  canvas_width: 1000,
  canvas_height: 800,
}

const trial_with_button = {
  type: jsPsychPsychophysics,
  stimuli: [circle_object, text_object2],
  response_type: "button",
  button_choices: ['y', 'n'], // The participant can respond to the stimuli using the 'y' or 'n' key.
  canvas_width: 1000,
  canvas_height: 800,
  on_load: function () {
    const btnGroup = document.getElementById(
      "jspsych-html-button-response-btngroup"
    );

    if (btnGroup) {
      btnGroup.style.position = "absolute";
      btnGroup.style.zIndex = "10";
      btnGroup.style.top = "0px";   // The coordinates where you want to display the button
      btnGroup.style.left = "0px";  // The coordinates where you want to display the button
    }
  }
}

const briefing = {
  type: jsPsychHtmlButtonResponse,
  stimulus: 'Thank you!',
  choices: ['Finish'],
}


jsPsych.run([instruction, trial_without_button, trial_with_button, briefing])
