// Global variables
import { config } from "@settings";
import { jsPsych } from "@jsp";
const { RUN_JATOS, RUN_PROLIFIC } = config;

/**
 * Validates consent form input and stores participant metadata in jsPsych data.
 *
 * Required checks:
 * - participant ID field is non-empty
 * - all consent checkboxes are ticked
 *
 * Side effects:
 * - adds `participant`, `resultID`, and `comResultID` via `jsPsych.data.addProperties(...)`
 *
 * @returns `true` when the participant can continue, otherwise `false`
 */
export const checkConsent = function () {
  if (RUN_JATOS) {
    //@ts-ignore
    var resultID = jatos.studyResultId;
    //@ts-ignore
    var comResultID = jatos.componentResultId;
  } else {
    var resultID = 9999;
    var comResultID = 9999;
  }

  // @ts-ignore get the value of the participant ID field
  const participantID = document.getElementById("participant_id").value;
  const idLabel = RUN_PROLIFIC ? "Prolific-ID" : "Participant-ID";

  if (participantID === "") {
    alert(`Please input your ${idLabel}`);
    return false;
  } else if (
    //@ts-ignore
    document.getElementById("checkbox1").checked &
    //@ts-ignore
    document.getElementById("checkbox2").checked &
    //@ts-ignore
    document.getElementById("checkbox3").checked &
    //@ts-ignore
    document.getElementById("checkbox4").checked
  ) {
    jsPsych.data.addProperties({
      participant: participantID,
      resultID: resultID,
      comResultID: comResultID,
    });
    return true;
  } else {
    alert("If you wish to participate, you must check all the boxes above");
    return false;
  }
};

/**
 * Validates the notice agreement checkbox.
 * @returns `true` when checked, otherwise `false`
 */
export const checkNotice = function () {
  if (
    //@ts-ignore
    document.getElementById("checkbox5").checked
  ) {
    return true;
  } else {
    alert("If you wish to participate, you have to agree with the item.");
    return false;
  }
};
