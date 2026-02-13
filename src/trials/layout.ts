/**
 * Trial layout template file.
 *
 * Purpose:
 * - Define reusable psychophysics layout objects for one screen/trial.
 * - For jspsych-psychophysics, this usually means returning an array of
 *   psychophysics object definitions.
 *
 * Suggested usage:
 * 1. Create one function per layout type, for example:
 *    - fixation layout
 *    - memory array layout
 *    - probe layout
 * 2. Return arrays of psychophysics objects from those functions.
 * 3. Keep this file focused on layout only (no randomization/business logic).
 *
 * Example shape to return (commented):
 *
 * const objects = [
 *   { obj_type: "text", content: "+", startX: "center", startY: "center" },
 *   { obj_type: "rect", width: 100, height: 100, line_color: "black" },
 * ];
 */
