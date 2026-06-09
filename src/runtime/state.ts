/**
 * Mutable runtime state for the running experiment.
 *
 * Most template users should change experiment settings in `src/settings.ts`
 * instead of editing these flags directly.
 */

export interface RuntimeState {
  TRACK: boolean;
  nBLUR: number;
  MAX_BLUR: number;
  LOOP: boolean;
  RUN_TIMER: boolean;
  STATUS: string;
}

/**
 * Stores run-level flags that need to be shared across screens and lifecycle hooks.
 *
 * Side effects:
 * - this object is intentionally mutable during the experiment
 * - instruction and runtime modules update it when participants resize windows,
 *   leave the browser tab, or complete/fail the task
 */
export const runtimeState: RuntimeState = {
  TRACK: false, // track whether participants' browser interactions should be monitored
  nBLUR: 0, // count how many times participants have left the browser
  MAX_BLUR: 3, // maximum number of times participants can leave the browser
  LOOP: true, // control whether participants need to repeat instructions/practice
  RUN_TIMER: false, // control the countdown timer
  STATUS: "success", // current final status of the experiment
};
