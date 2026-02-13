import { getLabCol, convertMsToSeconds } from "@lib";

/**
 * Example function showing how to use helpers from `src/lib`.
 * This file is for reference only and is not used automatically by the timeline.
 */
export function demoLibUsage() {
  const hexColor = getLabCol(120, 70, 20, 38, 60, "hex");
  const rgbColor = getLabCol(240, 70, 20, 38, 60, "rgb");
  const seconds = convertMsToSeconds(4500);

  return {
    hexColor,
    rgbColor,
    seconds,
  };
}
