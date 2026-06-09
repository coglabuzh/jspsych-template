/**
 * Consent and notice form validation.
 *
 * These helpers are specific to the external consent/notice HTML files used by
 * this template. They read form fields from the page and store participant
 * metadata in the shared jsPsych dataset.
 */
import { config } from "@settings";
import { jsPsych } from "@runtime";

/**
 * Validates consent form input and stores participant metadata in jsPsych data.
 *
 * Required checks:
 * - participant ID field is non-empty
 * - all consent checkboxes are ticked
 *
 * Side effects:
 * - reads consent form elements from the current document
 * - adds `participant`, `resultID`, and `comResultID` via `jsPsych.data.addProperties(...)`
 *
 * @returns `true` when the participant can continue, otherwise `false`.
 */
export const validateConsentForm = function () {
  if (config.PLATFORM.JATOS !== "off") {
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
  const idLabel = config.PLATFORM.PROLIFIC ? "Prolific-ID" : "Participant-ID";

  if (participantID === "") {
    alert(`Please input your ${idLabel}`);
    return false;
  } else if (
    //@ts-ignore
    document.getElementById("checkbox1").checked &&
    //@ts-ignore
    document.getElementById("checkbox2").checked &&
    //@ts-ignore
    document.getElementById("checkbox3").checked &&
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
 *
 * Side effects:
 * - reads the notice checkbox from the current document
 * - shows an alert when the required box is unchecked
 *
 * @returns `true` when checked, otherwise `false`.
 */
export const validateNoticeForm = function () {
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
