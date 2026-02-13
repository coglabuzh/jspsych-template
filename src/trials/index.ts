/**
 * Trials folder entry point.
 *
 * Template intent:
 * - Keep trials modular by responsibility:
 *   - `stimuli.ts`: generate stimulus data
 *   - `layout.ts`: build psychophysics object arrays
 *   - `trial.ts`: combine data + layout for one trial
 *   - `builders/*`: define trial-type-specific recipes
 */
export * from "@trials/builders";
export * from "@trials/layout";
export * from "@trials/stimuli";
export * from "@trials/trial";
export * from "@trials/types";
