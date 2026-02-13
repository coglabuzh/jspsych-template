/**
 * Converts milliseconds to rounded-up whole seconds.
 * @param ms Duration in milliseconds
 * @returns Duration in seconds (minimum 0)
 */
export function convertMsToSeconds(ms: number): number {
  return Math.max(0, Math.ceil(ms / 1000));
}

/**
 * Runs a DOM countdown and updates the target element once per second.
 *
 * @param durationSeconds Countdown start value (seconds)
 * @param elementId DOM id of the element that should display remaining seconds
 */
export function countDownTimer(
  durationSeconds: number,
  elementId: string
): void {
  const element = document.getElementById(elementId);
  if (!element) return;

  let remaining = Math.max(0, Math.floor(durationSeconds));
  element.textContent = String(remaining);

  if (remaining <= 0) return;

  const intervalId = window.setInterval(() => {
    remaining -= 1;
    element.textContent = String(Math.max(0, remaining));
    if (remaining <= 0) {
      window.clearInterval(intervalId);
    }
  }, 1000);
}
