/**
 * @title Visual search task
 * @description Whether the target faces up or down.
 * @author Chenyu Li
 * @version 1.1.3
 *
 *
 * @assets assets/
 */

// import stylesheets (.scss or .css).
import "../styles/main.scss";

// jsPsych official plugin
import preload from "@jspsych/plugin-preload";

// Global variables
import { jsPsych } from "./jsp";
import { expInfo } from "./settings";
let { DESIGN } = expInfo;

// Functions for creating new trials
import { createNewTrial } from "./trials/trialProcess";

// screens
import { language_screen } from "./instructions/language";
import { consent_screen, notice_screen } from "./instructions/consent";
import { browser_screen } from "./instructions/browserCheck";
import { fullMode_screen } from "./instructions/fullScreen";
import { instruction_screen, pra_instr_screen } from "./instructions/InstrStart";
import { chunkTrials } from "@coglabuzh/webpsy.js";
import {
  exp_start_screen,
  gen_cond_instr,
} from "./instructions/InstrStart";
// import { createBlockBreak } from "./instructions/InstrTrial";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({
  assetPaths,
  input = {},
  environment,
  title,
  version,
}) {
  // Initialize a timeline to hold the trials
  var timeline: any[] = [];

  // Preload assets
  const preload_screen = {
    type: preload,
    images: assetPaths.images,
    // audio: assetPaths.audio,
    // video: assetPaths.video,
  };

  // condition
  let mixed_factors = {
    setsize: DESIGN.SETSIZE,
    conDesign: DESIGN.CON_DESIGN,
    layout: DESIGN.LAYOUT,
    colorCond: DESIGN.COLOR_CON,
    radius: DESIGN.RADIUS,
    cueType: DESIGN.CUE,
  };

  /********************** Practice & Experiment (block design) **********************/

  let block_trials = jsPsych.randomization.factorial(mixed_factors, 1);

  // shuffle the conditions
  let block_conditions = jsPsych.randomization.shuffle(DESIGN.CONDITIONS);
  
  // declare the list that will hold the instructions and trials
  let exp_line: any[] = [];

  // run the experiment for each condition
  block_conditions.forEach((condition, blockID) => {

    // add condition to the trial
    let block_trials_condition = jsPsych.randomization.repeat(block_trials, 1);
    block_trials_condition.forEach((trial) => {
      trial.condition = condition;
    });

    // declare the list that will hold the instructions and trials
    let block_line: any[] = [];

    // ************** Instruction **************

    let cond_instr_screen = gen_cond_instr(condition);
    block_line.push(cond_instr_screen);
    block_line.push(pra_instr_screen);

    // ************** Practice **************

    // generate practice trials
    let prac_trials = jsPsych.randomization.repeat(
      block_trials_condition,
      DESIGN.nPractice[condition]
    );
    prac_trials.forEach((trial, trialID) => {
      let trial_line = createNewTrial(
        trial.setsize,
        trial.condition,
        trial.colorCond,
        trial.layout,
        trial.radius,
        trial.cueType,
        "practice",
        blockID,
        trialID
      );

      block_line = block_line.concat(trial_line);
    });

    // ************** Experiment **************

    // Instruction
    block_line.push(exp_start_screen);

    // generate experiment trials
    let exp_trials = jsPsych.randomization.repeat(
      block_trials_condition,
      DESIGN.nTRIALS[condition]
    );

    exp_trials.forEach((trial, trialID) => {
      let trial_line = createNewTrial(
        trial.setsize,
        trial.condition,
        trial.colorCond,
        trial.layout,
        trial.radius,
        trial.cueType,
        "experiment",
        blockID,
        trialID
      );

      block_line = block_line.concat(trial_line);
    });

    // add a break screen
    // if (blockID < DESIGN.nBLOCKS - 1) {
    //   let break_screen = createBlockBreak(
    //     blockID,
    //     DESIGN.nBLOCKS,
    //     TIMING.BREAK
    //   )

    //   exp_line.push(break_screen);
    // }

    exp_line = exp_line.concat(block_line);

  });


  /************************************** Procedure **************************************/

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(language_screen);
  // timeline.push(consent_screen);
  // timeline.push(notice_screen);
  // timeline.push(browser_screen);
  // timeline.push(fullMode_screen);
  // timeline.push(instruction_screen);
  timeline = timeline.concat(exp_line);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}
