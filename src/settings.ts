/**
 * This file contains the settings for the experiment.
 */

import { random } from "@coglabuzh/webpsy.js";

export const expInfo = {
  // settings for the experiment
  TITLE: "NTF-DEMO",

  // language
  LANG: "cn", // the default language

  // design of the experiment
  DESIGN: {
    stimulus: "assets/images/stimuli/letterC_grey.png",
    CONDITIONS: ["positive", "negative", "neutral"],
    CON_DESIGN: ["mixed"], // the design of the conditions
    // number of experiment trials for each condition
    nTRIALS: {
      negative: 2,
      positive: 2,
      neutral: 2,
    },
    // number of practice trials for each condition
    nPractice: {
      positive: 1,
      negative: 1,
      neutral: 1,
    },
    SETSIZE: [4, 8, 12],
    LAYOUT: ["intermixed"], // the layout of the display
    COLOR_CON: ["random"],
    RADIUS: [0.4], // the radius of the display
    CUE: ["location"], // the type of the cue
  },

  // ROTATION
  ANGLE: {
    RESPONSE: [90, 270],
    POOL: [0, 30, 60, 120, 150, 180, 210, 240, 300, 330],
  },

  COLOR: {
    BACKGROUND: "#bababa",
    COLOR_POOL: [
      "#ff0000", // red
      "#191970", // midnight blue
      "#006400", // dark green
      "#ffd700", // gold
      "pink",
      "purple",
      "orange",
    ],
    CONSISTENT: "#bababa", // the color for the consistent condition
    SWITCH_POOL: ["#bababa", "#bababa"], // the pool of colors for the switch conditions
    RANDOM_POOL: ["#bababa", "#bababa", "#bababa"], // the pool of colors for the Neutral cue condition
  },

  // settings for each trial
  TIMING: {
    CUE: 1000, // duration of the cue in milliseconds
    DELAY: 500, // delay after the cue in milliseconds
    RESPONSE: 10 * 1000, // time for the participant to respond in milliseconds
    AFTER_RESPONSE: 1 * 1000, // delay after the response
    FEEDBACK: 2 * 1000, // time for presenting the feedback
    START: 10 * 1000, // time for the countdown before a new trial starts
    BREAK: 30, // break duration in seconds
  },

  // when using Prolific, you can set customized completion codes for different situations
  // e.g., when participants complete the experiment, or when they fail the attention check
  // you can set them here and use them in the end of the experiment (jsp.ts)
  CODES: {
    SUCCESS: "EXPRACOMPLETEONLINE", // the code for a successfully completion of the experiment
    OFFLINE: "EXPRACOMPLETEOFFLINE", // the code for the completion of the experiment when the participants are offline
    FAIL: "EXPRAFAILED", // the code for the failed experiment
    // You can specify the codes for different situations here.
  },

  SIZE: {
    image: 0.08, // the size of the font (in percentage of the window height)
    WINDOW_RATIO: 16 / 9,
  },

  /** The key is case-sensitive and position-sensitive.
   * It is recommended to allow both upper and lower case keys.
   * You can use the `convertCase` function to prevent the issue.
   * Be cautious, the names of the number keys on the top of the keyboard
   * are different from those on the right side of the keyboard.
   */
  KEYS: {
    CONTINUE: ["enter"],
    START_TRIAL: [" "],
    RESPONSE: ["ArrowUp", "ArrowDown"],
  },

  // If you want to use the keyCode rather than key name,
  // you can go to the following link to get the key code:
  // https://www.toptal.com/developers/keycode/

  // Running environment variables
  RUN_JATOS: false, // a switch to run the experiment on JATOS
};

let maxWidth = Math.min(
  screen.width,
  screen.height * expInfo.SIZE.WINDOW_RATIO
);

// Global variables for the system. Normally, you don't need to change them.
export const varSystem = {
  TRACK: false, // a switch to track participants' interactions with the browser
  nBLUR: 0, // use to count how many times participants left the browser
  MAX_BLUR: 3, // the maximum number of times participants can leave the browser
  FAILED_ATTENTION_CHECK: false,
  CANVAS_WIDTH: maxWidth * 0.95,
  CANVAS_HEIGHT: (maxWidth * 0.95) / expInfo.SIZE.WINDOW_RATIO,
  PAGE_WIDTH: Math.min(maxWidth, 1300) * 0.95,
};

// set the color pool
switch (expInfo.DESIGN.COLOR_CON[0]) {
  case "fixed": {
    expInfo.COLOR.CONSISTENT = random.sample(
      expInfo.COLOR.COLOR_POOL,
      1
    )[0];
    expInfo.COLOR.RANDOM_POOL = expInfo.COLOR.COLOR_POOL.filter(
      (color) => color !== expInfo.COLOR.CONSISTENT
    );
    break;
  }
  case "switch": {
    expInfo.COLOR.SWITCH_POOL = random.sample(expInfo.COLOR.COLOR_POOL, 2);
    expInfo.COLOR.RANDOM_POOL = expInfo.COLOR.COLOR_POOL.filter((color) =>
      expInfo.COLOR.SWITCH_POOL.includes(color)
    );
    break;
  }
}

