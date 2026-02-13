import { getLabCol } from "@lib/color/CIElab";

export interface CIElabWheelOptions {
  l: number;
  a: number;
  b: number;
  radius: number;
}

/**
 * Creates a `manual` psychophysics stimulus object that draws a continuous
 * CIELAB color wheel on a canvas.
 *
 * Intended for use with `@kurokida/jspsych-psychophysics`.
 *
 * @param center Wheel center `[x, y]` in psychophysics coordinates
 * @param innerRadius Inner radius of the wheel ring (pixels)
 * @param width Ring thickness (pixels)
 * @param options CIELAB wheel parameters (`l`, `a`, `b`, `radius`)
 * @returns Psychophysics manual object with `drawFunc`
 */
export function createColorWheel(
  center: [number, number],
  innerRadius: number,
  width: number,
  options: CIElabWheelOptions = { l: 70, a: 20, b: 38, radius: 60 }
) {
  return {
    obj_type: "manual",
    startX: center[0], // Coordinates used by the plugin for positioning.
    startY: center[1],

    /**
     * Called by jspsych-psychophysics on each draw cycle.
     */
    drawFunc: function (
      stimulus: { startX: number; startY: number },
      _canvas: HTMLCanvasElement,
      context: CanvasRenderingContext2D
    ) {
      const outerRadius = innerRadius + width;

      context.save();
      context.translate(stimulus.startX, stimulus.startY);

      for (let i = 0; i < 360; i++) {
        const angleRad = i * (Math.PI / 180);

        const color = getLabCol(
          i,
          options.l,
          options.a,
          options.b,
          options.radius,
          "rgb"
        );

        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = 2; // Slight overlap avoids visual gaps between segments.
        context.moveTo(
          innerRadius * Math.cos(angleRad),
          innerRadius * Math.sin(angleRad)
        );
        context.lineTo(
          outerRadius * Math.cos(angleRad),
          outerRadius * Math.sin(angleRad)
        );
        context.stroke();
      }

      context.restore();
    },
  };
}
