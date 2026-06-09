/**
 * jsPsych runtime setup.
 *
 * This module creates the shared jsPsych instance, applies runtime setup, and
 * connects jsPsych lifecycle events to focused runtime helper functions.
 */
import { initJsPsych } from "jspsych";

import { applyGlobalCss } from "@lib/general/globalCss";
import { finishExperiment, setupJatosRuntime } from "@runtime/finish";
import { trackInteractions } from "@runtime/interaction";
import { runtimeState } from "@runtime/state";

export { runtimeState } from "@runtime/state";
export type { RuntimeState } from "@runtime/state";

// Apply global experiment styles and platform setup before the task starts.
applyGlobalCss();
setupJatosRuntime();

export const jsPsych = initJsPsych({
  // Check whether participants leave the window during the experiment.
  on_interaction_data_update: function () {
    trackInteractions(runtimeState, true, jsPsych);
  },

  // Finish data saving/upload after the whole experiment.
  on_finish: function () {
    finishExperiment(jsPsych, runtimeState);
  },
});
