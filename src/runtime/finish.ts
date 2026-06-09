/**
 * End-of-experiment runtime flow for local, JATOS, and Prolific runs.
 *
 * Most template users should configure platform behavior in `settings.ts`
 * instead of editing this file directly.
 */
import type { JsPsych } from "jspsych";

import { config } from "@settings";
import { END_INFO, translateText } from "@text";
import type { RuntimeState } from "@runtime/state";

/**
 * Validates platform settings and configures JATOS upload retry behavior.
 *
 * Assumes `settings.ts` is the source of researcher-facing platform choices.
 */
export function setupJatosRuntime() {
  checkJatosSettings();

  if (config.PLATFORM.JATOS !== "off") {
    //@ts-ignore
    jatos.httpRetry = 10; // attempts 10 retries of failed requests
    //@ts-ignore
    jatos.httpRetryWait = 5000; // sets retry waiting time to 5 seconds
  }
}

/**
 * Completes the experiment after jsPsych finishes running the timeline.
 *
 * @param jsPsych Active jsPsych instance that contains the collected data.
 * @param runtimeState Mutable status and interaction state for this run.
 */
export function finishExperiment(jsPsych: JsPsych, runtimeState: RuntimeState) {
  stopTracking(runtimeState);

  const resultJson = jsPsych.data.get().json();
  const finishInfo = getFinishInfo(runtimeState);

  showFinishScreen(finishInfo);

  if (canUseJatos()) {
    finishJatosRun(resultJson, finishInfo);
  } else {
    saveDataLocally(jsPsych, runtimeState);
  }
}

/**
 * Stops browser-interaction tracking before final upload or local save.
 *
 * @param runtimeState Mutable state used by runtime interaction checks.
 */
function stopTracking(runtimeState: RuntimeState) {
  runtimeState.TRACK = false;
}

/**
 * Checks that editable JATOS settings use supported modes.
 */
function checkJatosSettings() {
  const validJatosModes = ["off", "finish", "continue"];
  const validFailedModes = ["finish", "continue"];
  const platform = config.PLATFORM;

  if (!validJatosModes.includes(platform.JATOS)) {
    throw new Error(
      `Invalid JATOS setting: "${platform.JATOS}". Use "off", "finish", or "continue".`,
    );
  }

  if (!validFailedModes.includes(platform.IF_FAILED)) {
    throw new Error(
      `Invalid IF_FAILED setting: "${platform.IF_FAILED}". Use "finish" or "continue".`,
    );
  }
}

/**
 * Describes the screen, JATOS status, and redirect link for the final state.
 *
 * @param runtimeState Mutable status state for the current experiment run.
 * @returns End-of-task information used for the participant screen, JATOS, and Prolific.
 */
function getFinishInfo(runtimeState: RuntimeState) {
  let screen: string = "@settings";
  let message: string = "FINISHED";
  let success = true;
  let redirectLink = `https://app.prolific.com/submissions/complete?cc=${config.CODES.SUCCESS}`;

  switch (runtimeState.STATUS) {
    case "failed_resize":
      screen = translateText(END_INFO.failedResize, config.CONSENT.LANG);
      message = "FAILED_RESIZE";
      success = false;
      redirectLink = `https://app.prolific.com/submissions/complete?cc=${config.CODES.FAILED_OTHERS}`;
      break;
    case "failed_attention_check":
      screen = translateText(END_INFO.failed, config.CONSENT.LANG);
      message = "FAILED_ATTENTION_CHECK";
      success = false;
      redirectLink = `https://app.prolific.com/submissions/complete?cc=${config.CODES.FAILED_ATTENTION}`;
      break;
    case "success":
      if (canUseJatos()) {
        screen = translateText(END_INFO.completedOnline, config.CONSENT.LANG);
      } else {
        screen = translateText(END_INFO.completedOffline, config.CONSENT.LANG);
        redirectLink = `https://app.prolific.com/submissions/complete?cc=${config.CODES.OFFLINE}`;
      }
      break;
  }

  return {
    screen,
    message,
    success,
    redirectLink,
  };
}

/**
 * Shows the final participant-facing message.
 *
 * @param finishInfo Screen/status information returned by `getFinishInfo`.
 */
function showFinishScreen(finishInfo: ReturnType<typeof getFinishInfo>) {
  document.body.innerHTML = finishInfo.screen;
}

/**
 * Checks whether this run should use JATOS upload/finish APIs.
 *
 * @returns `true` when JATOS is enabled and the browser is online.
 */
function canUseJatos() {
  return config.PLATFORM.JATOS !== "off" && navigator.onLine === true;
}

/**
 * Downloads the jsPsych data file when the task cannot upload to JATOS.
 *
 * Assumes local saving is only useful after successful completion; failed runs
 * should be handled by the platform when possible.
 */
function saveDataLocally(jsPsych: JsPsych, runtimeState: RuntimeState) {
  if (runtimeState.STATUS !== "success") {
    return;
  }

  const participant_id = jsPsych.data
    .getLastTrialData()
    .values()[0].participant;
  const file_name = config.CONSENT.TITLE + "_" + participant_id + ".json";
  jsPsych.data.get().localSave("json", file_name);
}

/**
 * Sends the result to JATOS and either continues to the next component or finishes the study.
 *
 * @param resultJson Full jsPsych dataset as a JSON string.
 * @param finishInfo Screen/status information returned by `getFinishInfo`.
 */
function finishJatosRun(
  resultJson: string,
  finishInfo: ReturnType<typeof getFinishInfo>,
) {
  const platform = config.PLATFORM;
  const shouldContinue =
    (finishInfo.success && platform.JATOS === "continue") ||
    (!finishInfo.success && platform.IF_FAILED === "continue");

  if (shouldContinue) {
    //@ts-ignore save this component's data and open the next active JATOS component.
    jatos.startNextComponent(resultJson, finishInfo.message);
    return;
  }

  //@ts-ignore upload the data to JATOS
  jatos.submitResultData(resultJson);
  // Give participants time to read the final message before leaving this page.
  setTimeout(function () {
    if (config.PLATFORM.PROLIFIC) {
      //@ts-ignore
      jatos.endStudyAndRedirect(
        finishInfo.redirectLink,
        finishInfo.success,
        finishInfo.message,
      );
    } else {
      //@ts-ignore
      jatos.endStudy(finishInfo.success, finishInfo.message);
    }
  }, 10000);
}
