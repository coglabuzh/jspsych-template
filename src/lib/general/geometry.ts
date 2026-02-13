export interface AngleFromPointResult {
  /** Euclidean distance from origin to current point (pixels) */
  distance: number;
  /** Angle in radians from origin to current point, from `Math.atan2(dy, dx)` */
  angleRad: number;
  /** Angle in degrees normalized to `[0, 360)` */
  angleDeg: number;
}

/**
 * Computes offsets, distance, and angle from an origin point to a current point.
 *
 * Coordinate note: this helper is agnostic to coordinate systems.
 * If you pass canvas/screen coordinates, positive `dy` points downward.
 *
 * @param currentX Current point x-coordinate
 * @param currentY Current point y-coordinate
 * @param originX Origin point x-coordinate
 * @param originY Origin point y-coordinate
 * @returns Distance, radians angle, and normalized degree angle
 */
export function getAngleFromPoint(
  currentX: number,
  currentY: number,
  originX: number,
  originY: number
): AngleFromPointResult {
  const dx = currentX - originX;
  const dy = currentY - originY;
  const angleRad = Math.atan2(dy, dx);
  const rawAngleDeg = (angleRad * 180) / Math.PI;

  return {
    distance: Math.hypot(dx, dy),
    angleRad,
    angleDeg: (rawAngleDeg + 360) % 360,
  };
}
