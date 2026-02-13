/**
 * Generates a color based on an angular position within a CIELAB color circle.
 * @param angle - The hue angle in degrees (0-360).
 * @param L - Lightness value (0-100). Default is 70.
 * @param a - The a* coordinate of the circle's center. Default is 20.
 * @param b - The b* coordinate of the circle's center. Default is 38.
 * @param radius - The radius of the color circle. Default is 60.
 * @param output - Format of the return value: 'hex' (e.g., "#ff0000") or 'rgb' (e.g., "rgb(255, 0, 0)"). Default is 'hex'.
 * @returns A string representing the color in the requested format.
 */
export function getLabCol(
    angle: number,
    L: number = 70,
    a: number = 20,
    b: number = 38,
    radius: number = 60,
    output: 'hex' | 'rgb' = 'hex'
): string {
    // --- 1. Geometry: Find coordinates on the color circle ---
    const rad: number = angle * (Math.PI / 180);
    const targetA: number = a + (radius * Math.cos(rad));
    const targetB: number = b + (radius * Math.sin(rad));

    // --- 2. CIELAB to XYZ Conversion ---
    const fY: number = (L + 16) / 116;
    const fX: number = (targetA / 500) + fY;
    const fZ: number = fY - (targetB / 200);

    const decodeLAB = (t: number): number =>
        (t > 0.20689 ? Math.pow(t, 3) : (t - 16 / 116) / 7.787);

    // Reference white points for D65
    const X: number = decodeLAB(fX) * 95.047;
    const Y: number = decodeLAB(fY) * 100.000;
    const Z: number = decodeLAB(fZ) * 108.883;

    // --- 3. XYZ to Linear RGB Conversion ---
    const xN: number = X / 100;
    const yN: number = Y / 100;
    const zN: number = Z / 100;

    const rLin: number = xN * 3.2406 + yN * -1.5372 + zN * -0.4986;
    const gLin: number = xN * -0.9689 + yN * 1.8758 + zN * 0.0415;
    const bLin: number = xN * 0.0557 + yN * -0.2040 + zN * 1.0570;

    // --- 4. Gamma Correction (Linear RGB to sRGB) ---
    const applyGamma = (c: number): number => {
        const value: number = (c > 0.0031308)
            ? (1.055 * Math.pow(c, 1 / 2.4) - 0.055)
            : (12.92 * c);

        // Clamp to 0.0-1.0 and scale to 0-255 range
        return Math.round(Math.max(0, Math.min(1, value)) * 255);
    };

    const r_val: number = applyGamma(rLin);
    const g_val: number = applyGamma(gLin);
    const b_val: number = applyGamma(bLin);

    // --- 5. Formatting Output ---
    if (output === 'rgb') {
        return `rgb(${r_val}, ${g_val}, ${b_val})`;
    } else {
        const toHex = (val: number): string => val.toString(16).padStart(2, '0');
        return `#${toHex(r_val)}${toHex(g_val)}${toHex(b_val)}`;
    }
}
