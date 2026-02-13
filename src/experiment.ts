/**
 * @title The name of the task
 * @description A short description of the task
 * @author Chenyu Li
 * @version 0.3.1
 *
 *
 * @assets assets/
 */

//@ts-ignore import stylesheets (.scss or .css).
import "@styles/main.scss";

// jsPsych official plugin
import preload from "@jspsych/plugin-preload";

// Global variables
import { jsPsych } from "@jsp";

// screens
import { welcome_screen } from "@instructions/welcome";
import { createConsentScreen, notice_screen } from "@instructions/consent";
import { browser_screen } from "@instructions/browserCheck";
import { fullMode_screen } from "@instructions/fullScreen";
import { trial_start_screen } from "@instructions/trialInstr";

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
}: {
  assetPaths: { images: string[]; audio?: string[]; video?: string[] };
  input?: Record<string, unknown>;
  environment?: string;
  title?: string;
  version?: string;
}) {
  // Initialize a timeline to hold the trials
  var timeline: any[] = [];
  const consent_screen = await createConsentScreen();

  // Preload assets
  const preload_screen = {
    type: preload,
    images: assetPaths.images,
    // audio: assetPaths.audio,
    // video: assetPaths.video,
  };

  /************************************** Instruction **************************************/


  /************************************** Practice **************************************/

  /************************************** Experiment **************************************/

  /************************************** Procedure **************************************/


  // Push all the screen slides into timeline
  // When you want to test the experiment, you can easily comment out the screens you don't want
  timeline.push(preload_screen);
  timeline.push(welcome_screen);
  timeline.push(consent_screen);
  timeline.push(notice_screen);
  timeline.push(browser_screen);
  timeline.push(fullMode_screen);
  timeline.push(trial_start_screen);
  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  // return jsPsych;
}
