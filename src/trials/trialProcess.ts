// jsPsych official plugin
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";

// Third party plugins
import { random, generateArray } from "@coglabuzh/webpsy.js";
import psychophysics from "@kurokida/jspsych-psychophysics";

// Functions for generating stimuli and creating elements
import { stimArrange, cueColorScreen, cueLocationScreen } from "./elements";

// Global variables
import { jsPsych } from "../jsp";
import { expInfo } from "../settings";
let { KEYS, DESIGN, ANGLE, COLOR, TIMING, SIZE } = expInfo;
import { TEXT } from "../task-fun/text";

// screens
import { trial_start_screen } from "../instructions/InstrTrial";

type stimObj = {
  image: string;
  color: string;
  width: number;
  rotation: number;
};

/**
 * This function creates a main object that will be displayed on the screen.
 * @param {number} setsize The set-size.
 * @param {number} nBox The number of item boxes to generate.
 * @param {string} expPart The name of the experiment part (e.g. "practice" or "experiment").
 * @param {number} blockID The number of the current block
 * @param {number} trialID The number of the current trial
 * @param {logical} special A logical object. If true, a fixed alphabet-array would be used.
 */
class trialStim {
  // Trail information
  expPart: string; // Experiment part (e.g. "practice" or "experiment")
  block: number; // Block ID
  trial: number; // Trial ID
  // Manipulation variables
  setsize: number; // Number of stimulus
  nTarget: number; // Number of targets
  nDistractor: number; // Number of distractors
  condition: string; // Condition of the trial
  layout: string; // Layout of the stimuli
  colorCond: string; // Color condition of the stimuli
  radius: number; // Radius of the stimuli
  cueType: string; // Type of the cue
  // Canvas information
  canW: number; // Width of the canvas
  canH: number; // Height of the canvas
  center: number[]; // Center position of the stimuli object
  // Stimulus information
  stim: any[]; // Array of stimulus objects
  targetColor: string; // Color of the target
  distractorColor: string; // Color of the distractor
  targetLoc: string; // Location of the target

  targetRot: number; // Rotation of the target
  correctResp: string; // Correct response
  stimObject: stimObj[];

  constructor(
    nTarget: number,
    nDistractor: number,
    condition: string,
    colorCond: string = "random",
    layout: string = "separated",
    radius: number = 0.4,
    cueType: string = "color",
    expPart: string = "experiment",
    blockID: number = 0,
    trialID: number = 0
  ) {
    // These variables define parameters of the stimuli object.
    this.setsize = nTarget + nDistractor;
    this.nTarget = nTarget;
    this.nDistractor = nDistractor;
    this.condition = condition;
    this.colorCond = colorCond;
    this.layout = layout;
    this.radius = radius;
    this.cueType = cueType;
    this.expPart = expPart;
    this.block = blockID;
    this.trial = trialID;

    // assign a color to the target and distractor
    switch (this.colorCond) {
      case "random": {
        let color_list = random.sample(COLOR.COLOR_POOL, 2);
        this.targetColor = color_list[0];
        this.distractorColor = color_list[1];
        break;
      }
      case "fixed": {
        this.targetColor = random.sample(COLOR.RANDOM_POOL, 1)[0];
        this.distractorColor = COLOR.CONSISTENT;
        break;
      }
      case "switch": {
        let color_list = COLOR.SWITCH_POOL.splice(0);
        random.shuffle(color_list);
        this.targetColor = color_list[0];
        this.distractorColor = color_list[1];
        break;
      }
      default:
        console.error("Invalid condition");
    }

    // define the size and position of the stimuli object on the screen.
    this.canW = Math.min(screen.width, (screen.height / 9) * 16);
    this.canH = this.canW * 0.5;
    this.center = [this.canW / 2, this.canH / 2];
    this.radius = this.canH * radius;
    let imageWidth = Math.floor(this.canH * SIZE.image);

    // target rotation and correct response
    let targetRot = random.sample(ANGLE.RESPONSE, 1)[0];
    this.correctResp = targetRot === 90 ? "arrowdown" : "arrowup";

    // Generate the stimulus object.
    let targetObject: stimObj[] = Array.from(Array(nTarget)).map(() => {
      return {
        image: DESIGN.stimulus,
        color: this.targetColor,
        width: imageWidth,
        rotation: random.sample(ANGLE.POOL, 1)[0],
      };
    });

    // select a target item to adjust its rotation
    let targetItem = random.sample(generateArray.number(0, nTarget - 1), 1)[0];
    targetObject[targetItem].rotation = targetRot;

    let distractorObject: stimObj[] = Array.from(Array(nDistractor)).map(() => {
      return {
        image: DESIGN.stimulus,
        color: this.distractorColor,
        width: imageWidth,
        rotation: random.sample(ANGLE.POOL, 1)[0],
      };
    });

    // merge
    this.stimObject =
      random.random() > 0.5
        ? distractorObject.concat(targetObject)
        : targetObject.concat(distractorObject);

    // intermixed arrangement
    if (layout === "intermixed") random.shuffle(this.stimObject);

    // target location
    let targetLocIndex = this.stimObject.findIndex(
      (item) => item.rotation === targetRot
    );
    this.targetLoc = targetLocIndex < this.setsize / 2 ? "right" : "left";
  }

  // A function used to display cue screen.
  displayCueScreen() {}

  // Ask participants to recall the items.
  displayJudgeScreen() {}

  // return a feedback screen to participants.
  displayDebriefScreen() {}
}

trialStim.prototype.displayCueScreen = function () {
  let cueElements: any[] = [];

  // cue color
  let cueColor: string = "";

  // if the cue is color
  if (this.cueType === "color") {
    switch (this.condition) {
      case "positive":
        cueColor = this.targetColor;
        break;
      case "negative":
        cueColor = this.distractorColor;
        break;
      case "neutral":
        let cueColorPool = COLOR.COLOR_POOL.filter((color) => {
          if (![this.targetColor, this.distractorColor].includes(color))
            return color;
        });
        cueColor = random.sample(cueColorPool, 1)[0];
        break;
      default:
        console.error(this.condition);
        console.error("Invalid cue condition");
    }

    // elements
    cueElements = cueColorScreen(cueColor, this.condition, this.canH * 0.08);
  // if the cue is location
  } else {
    cueElements = cueLocationScreen(
      this.targetLoc,
      this.condition,
      this.canH * 0.15
    );
  }

  let cue_screen = {
    type: psychophysics,
    background_color: COLOR.BACKGROUND,
    canvas_width: this.canW,
    canvas_height: this.canH,
    stimuli: cueElements,
    response_type: "key",
    choices: "NO_KEYS",
    trial_duration: TIMING.CUE,
    post_trial_gap: TIMING.DELAY,
    data: {
      screenID: "cue",
      expPart: this.expPart,
      blockID: this.block,
      trialID: this.trial,
      setsize: this.setsize,
      nTarget: this.nTarget,
      nDistractor: this.nDistractor,
      condition: this.condition,
      layout: this.layout,
      colorCon: this.colorCond,
      radius: this.radius,
      cueType: this.cueType,
      cueColor: cueColor,
    },
  };

  return cue_screen;
};

trialStim.prototype.displayJudgeScreen = function () {
  // elements
  let judgeElements = stimArrange(this.stimObject, this.center, this.radius);

  let judge_screen = {
    type: psychophysics,
    background_color: COLOR.BACKGROUND,
    canvas_width: this.canW,
    canvas_height: this.canH,
    stimuli: judgeElements,
    pixi: true,
    response_type: "key",
    choices: KEYS.RESPONSE,
    trial_duration: TIMING.RESPONSE,
    post_trial_gap: TIMING.AFTER_RESPONSE,
    data: {
      screenID: "judge",
      expPart: this.expPart,
      blockID: this.block,
      trialID: this.trial,
      setsize: this.setsize,
      nTarget: this.nTarget,
      nDistractor: this.nDistractor,
      condition: this.condition,
      layout: this.layout,
      colorCon: this.colorCond,
      radius: this.radius,
      cueType: this.cueType,
      content: this.stimObject,
      correct: this.correctResp,
    },
    on_finish: function (data) {
      // check whether the response is correct or not.
      data.acc = data.response === data.correct ? true : false;
    },
  };

  return judge_screen;
};

trialStim.prototype.displayDebriefScreen = function () {
  let feedback_screen = {
    type: htmlKeyboardResponse,
    trial_duration: TIMING.FEEDBACK,
    stimulus: function () {
      var accuracy = jsPsych.data.getLastTrialData().select("acc").values[0];

      if (accuracy) {
        return `<div class='fb-text'>${
          TEXT.correctFeedback[expInfo.LANG]
        }</div>`;
      } else {
        return `<div class='fb-text' style="color:red">${
          TEXT.incorrectFeedback[expInfo.LANG]
        }</div>`;
      }
    },
    choices: "NO_KEYS",
    data: {
      screenID: "feedback",
      expPart: this.expPart,
      blockID: this.block,
      trialID: this.trial,
      setsize: this.setsize,
      nTarget: this.nTarget,
      nDistractor: this.nDistractor,
      condition: this.condition,
      layout: this.layout,
      colorCon: this.colorCond,
      radius: this.radius,
      cueType: this.cueType,
    },
  };

  return feedback_screen;
};

export function createNewTrial(
  setsize: number,
  condition: string,
  colorCond: string = "random",
  layout: string = "separated",
  radius: number = 0.3,
  cueType: string = "color",
  expPart: string = "experiment",
  blockID: number = 0,
  trialID: number = 0
) {
  var trial_line: any[] = [];
  // create a trial object
  var trial_body = new trialStim(
    setsize / 2,
    setsize / 2,
    condition,
    colorCond,
    layout,
    radius,
    cueType,
    expPart,
    blockID,
    trialID
  );
  // preparation screen
  trial_line.push(trial_start_screen);
  // cue screen
  var cue_screen = trial_body.displayCueScreen();
  trial_line.push(cue_screen);
  // judge screen
  var judge_screen = trial_body.displayJudgeScreen();
  trial_line.push(judge_screen);
  // feedback screen
  if (expPart !== "experiment") {
    var feedback_screen = trial_body.displayDebriefScreen();
    trial_line.push(feedback_screen);
  }

  return trial_line;
}
