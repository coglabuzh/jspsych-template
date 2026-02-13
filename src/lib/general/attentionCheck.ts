// Third party plugins
import Swal from "sweetalert2";

// JsPsych type
import { JsPsych } from "jspsych";

interface BlurState {
  TRACK: boolean;
  MAX_BLUR: number;
  nBLUR: number;
  STATUS: string;
}

/**
 * Monitors blur interactions and enforces attention-check termination rules.
 *
 * Behavior:
 * - increments blur count on each `"blur"` interaction event
 * - shows warning dialogs before the maximum is reached
 * - aborts experiment once the blur limit is exceeded
 *
 * @param blur Mutable runtime blur-tracking state
 * @param alert Whether to show warning/error dialogs
 * @param jsPsych Active jsPsych instance
 */
export function trackInteractions(
  blur: BlurState,
  alert = true,
  jsPsych: JsPsych
) {
  // get the last interaction event
  let interactionData = JSON.parse(jsPsych.data.getInteractionData().json());
  let lastEvent = interactionData[interactionData.length - 1];

  if (blur.TRACK) {
    if (lastEvent["event"] === "blur") {
      // plus one
      blur.nBLUR++;

      if (blur.nBLUR < blur.MAX_BLUR && blur.nBLUR > 0) {
        jsPsych.pauseExperiment();

        // show warning information
        if (alert)
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: `You have left the window tab ${blur.nBLUR} time(s).
                     When you leave it more than two times, you will be kicked out of the study.`,
            showConfirmButton: true,
          }).then(() => {
            jsPsych.resumeExperiment();
          });
      } else {
        blur.STATUS = "failed_attention_check";
        Swal.fire({
          icon: "error",
          title: "End",
          text: `
                Unfortunately, you have left the tab/ browser windows more than two times.
                As we told you in the beginning of the experiment,
                we therefore have to end this experiment prematurely and we cannot grant you any credit.
                `,
          showConfirmButton: true,
        }).then(() => {
          jsPsych.abortExperiment();
        });
      }
    }
  }
}
