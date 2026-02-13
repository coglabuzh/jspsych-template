/**
 * Central experiment configuration.
 *
 * Template users should primarily edit values in `config`.
 * Other modules import either `config` or the named exports at the bottom.
 */
import { setCSS } from "@lib/general/setCSS";

// Apply global experiment styles at startup.
setCSS();

/**
 * Main configuration object.
 *
 * Sections:
 * - CONSENT: values injected into consent HTML and language selection
 * - DESIGN: trial/block counts and condition IDs
 * - TIMING: durations used by instruction/trial timers
 * - CODES: completion/error codes (typically for Prolific/JATOS workflows)
 * - KEYS: key mappings used in task logic
 * - RUN_* flags: environment/platform behavior toggles
 */
export const config = {
  // Values injected into `assets/external-html/consent-*.html` placeholders.
  CONSENT: {
    TITLE: "experiment_name", // Used for exported data file names.
    LANG: "en", // Active language key used across text modules.
    DURATION: 45, // Study duration in minutes (number only).
    CONTACT_PERSON: "YOUR FULL NAME", // Shown in consent page.
    CONTACT_EMAIL: "YOUR UNIVERSITY EMAIL", // Shown in consent page.
    INSTITUTION: "YOUR INSTITUTION", // Shown in consent page.
  },

  // Experimental design parameters.
  DESIGN: {
    nTRIALS: 1, // Number of trials per condition.
    nBLOCKS: 1, // Number of blocks in the main task.
    CONDITIONS: [5, 6, 7, 8], // Condition IDs used by trial builders.
  },

  // Timing values used by instruction/trial screens.
  TIMING: {
    START: 10 * 1000, // Countdown before a trial starts (milliseconds).
    BREAK: 30, // Break duration between blocks (seconds).
  },

  // Completion codes used at end-of-study redirects/messages.
  CODES: {
    SUCCESS: "success", // Completed successfully.
    OFFLINE: "offline", // Completed but offline upload fallback.
    FAILED_ATTENTION: "failedAttention", // Failed attention/browser interaction check.
    FAILED_OTHERS: "failedOthers", // Other failure conditions (e.g., resize failure).
  },

  /**
   * Key mappings for task actions.
   *
   * Notes:
   * - Key names are case-sensitive and keyboard-layout-sensitive.
   * - If needed, normalize key input in response handlers.
   */
  KEYS: {
    CONTINUE: ["enter"],
    START_TRIAL: [" "],
  },

  // Platform/environment toggles.
  RUN_JATOS: false, // Run with JATOS integration and upload behavior.
  RUN_PROLIFIC: false, // When false, do not redirect to Prolific at the end.
};

// Convenience named exports for cleaner imports in other modules.
export const { CONSENT, DESIGN, TIMING, CODES, KEYS, RUN_JATOS, RUN_PROLIFIC } =
  config;

// Frequently used design shortcuts.
export const { nTRIALS, nBLOCKS, CONDITIONS } = DESIGN;
