// jsPsych official plugin
import browserCheck from "@jspsych/plugin-browser-check";
import { runtimeState } from "@runtimeState";

// checking the size of window
export const browser_screen = {
  type: browserCheck,
  minimum_width: Math.max(screen.width * 0.9, 1200), // minimum width of the window,
  minimum_height: Math.max(screen.height * 0.75, 550), // minimum height of the window
  on_finish: function (data) {
    if (data.width < Math.max(screen.width * 0.9, 1200))
      runtimeState.STATUS = "failed_resize";
  },
};
