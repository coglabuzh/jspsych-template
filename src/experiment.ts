/**
 * @title Serial position recall task
 * @description This is a demo experiment based on the position recall task.
 * @author Chenyu Li and Hannah (Dames) Tschannen
 * @version 0.2.0
 *
 *
 * @assets assets/
 */

// import stylesheets (.scss or .css).
import "../styles/main.scss";

// jsPsych official plugin
import preload from "@jspsych/plugin-preload";

// Basic Functions
import { random } from "./basic-fun/random";
import { chunkTrials } from "./basic-fun/chunkTrials";

// Functions for creating new trials
import { createNewTrial } from "./trials/trialProcess";

// Global variables
import { expInfo } from "./settings";
import { jsPsych } from "./jsp";

// screens
import { welcome_screen } from "./instructions/welcome";
import { consent_screen, notice_screen } from "./instructions/consent";
import { fullMode_screen } from "./instructions/fullScreen";
import { browser_screen } from "./instructions/browserCheck";
import { exp_start_screen, createBlockBreak } from "./instructions/InstrTrial";
import { createInstr } from "./instructions/InstrStart";

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

  // Instruction
  const instr_line = createInstr(4);

  /************************************** Experiment **************************************/

  /** Create trial list based on desired combination of conditions in experiment **/
  // Ideally, you would do this in a separate file and import it here

  /************************************** Procedure **************************************/

  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want

  timeline.push(preload_screen);
  timeline.push(welcome_screen);
  timeline.push(consent_screen);
  timeline.push(notice_screen);
  timeline.push(browser_screen);

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}
