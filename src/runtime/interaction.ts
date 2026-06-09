/**
 * Browser-interaction tracking for the running experiment.
 *
 * This module is runtime code because it mutates shared task state and can
 * abort the active jsPsych experiment.
 */
import type { JsPsych } from "jspsych";
import Swal from "sweetalert2";

import type { RuntimeState } from "@runtime/state";

/**
 * Monitors blur interactions and enforces attention-check termination rules.
 *
 * Behavior:
 * - increments blur count on each `"blur"` interaction event
 * - shows warning dialogs before the maximum is reached
 * - aborts experiment once the blur limit is exceeded
 *
 * @param runtimeState Mutable runtime state for browser-interaction tracking.
 * @param alert Whether to show warning/error dialogs.
 * @param jsPsych Active jsPsych instance.
 */
export function trackInteractions(
  runtimeState: RuntimeState,
  alert = true,
  jsPsych: JsPsych,
) {
  const interactionData = JSON.parse(jsPsych.data.getInteractionData().json());
  const lastEvent = interactionData[interactionData.length - 1];

  if (!runtimeState.TRACK) {
    return;
  }

  if (lastEvent["event"] !== "blur") {
    return;
  }

  runtimeState.nBLUR++;

  if (runtimeState.nBLUR < runtimeState.MAX_BLUR) {
    jsPsych.pauseExperiment();

    if (alert) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: `You have left the window tab ${runtimeState.nBLUR} time(s).
                 When you leave it more than two times, you will be kicked out of the study.`,
        showConfirmButton: true,
      }).then(function () {
        jsPsych.resumeExperiment();
      });
    }
    return;
  }

  runtimeState.STATUS = "failed_attention_check";
  Swal.fire({
    icon: "error",
    title: "End",
    text: `
          Unfortunately, you have left the tab/ browser windows more than two times.
          As we told you in the beginning of the experiment,
          we therefore have to end this experiment prematurely and we cannot grant you any credit.
          `,
    showConfirmButton: true,
  }).then(function () {
    jsPsych.abortExperiment();
  });
}
