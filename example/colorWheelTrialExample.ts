import { createColorWheel, getLabCol } from "@lib/color";
import { getAngleFromPoint } from "@lib/general";
import jsPsychPsychophysics from "@kurokida/jspsych-psychophysics";
import { initJsPsych } from "jspsych";

const jsPsych = initJsPsych({
  on_finish: function () {
    jsPsych.data.displayData();
  }
})

/**
 * Color-wheel-only trial example:
 * - Draws the wheel
 * - Lets the user drag to pick an angle/color
 * - Updates a line indicator
 */
export function createColorWheelTrialExample() {
  const canvasWidth = 800;
  const canvasHeight = 800;
  const backgroundColor = "#ffffff";
  const trialDuration = 5000;

  const wheelRadius = 120;
  const wheelWidth = 40;
  const lab = { l: 70, a: 20, b: 38, radius: 60 };

  const placeholderColor = "#999999";
  const indicatorColor = "#000000";
  const wheelCenter: [number, number] = [0, 0];
  const indicatorRadius = wheelRadius + wheelWidth / 2;
  const { l, a, b, radius } = lab;

  // Generate once and reuse in stimuli.
  const colorWheelStim = createColorWheel(wheelCenter, wheelRadius, wheelWidth, lab);
  const indicatorStim = {
    obj_type: "line",
    startX: wheelCenter[0],
    startY: wheelCenter[1],
    line_length: wheelWidth * 2,
    angle: 0,
    line_width: 4,
    line_color: placeholderColor,
  };

  let mouseDown = false;

  return {
    type: jsPsychPsychophysics,
    canvas_width: canvasWidth,
    canvas_height: canvasHeight,
    background_color: backgroundColor,
    stimuli: [colorWheelStim, indicatorStim],
    response_type: "mouse",
    trial_duration: trialDuration,
    mouse_down_func: function () {
      mouseDown = true;
    },
    mouse_up_func: function () {
      mouseDown = false;
    },
    mouse_move_func: function (event: MouseEvent) {
      if (!mouseDown) return;

      const canvas = event.currentTarget as HTMLCanvasElement | null;
      if (!canvas) return;

      const { angleRad, angleDeg } = getAngleFromPoint(
        event.offsetX,
        event.offsetY,
        canvas.width / 2,
        canvas.height / 2
      );

      const targetColor = getLabCol(angleDeg, l, a, b, radius);

      const trial = jsPsych.getCurrentTrial();
      if (!trial || !trial.stim_array[1]) return;

      const indicator = trial.stim_array[1];
      indicator.startX = indicatorRadius * Math.cos(angleRad);
      indicator.startY = indicatorRadius * Math.sin(angleRad);
      indicator.angle = angleDeg;
      indicator.line_color = indicatorColor;

      trial.data.respColor = targetColor;
      trial.data.respAngle = angleDeg;
    },
    data: {
      screenID: "color-wheel-example",
    },
  };
}
