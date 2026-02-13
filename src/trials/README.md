# `src/trials/` Guide

This folder defines the trial architecture template.

## Structure

- `stimuli.ts`
  - generate trial data/stimulus specs.
- `layout.ts`
  - create psychophysics object arrays for a trial screen.
- `trial.ts`
  - combine stimulus data + layout output for one trial.
- `types.ts`
  - shared types for trial modules.
- `builders/`
  - trial-type-specific builders (for example `practiceTrial.ts`, `mainTrial.ts`).
- `index.ts`
  - folder export entrypoint.

## Recommended Pattern

1. Implement data generation in `stimuli.ts`.
2. Implement psychophysics object creation in `layout.ts`.
3. Build one-trial composition logic in `trial.ts`.
4. Implement per-trial-type recipes in `builders/*`.
5. Use `experiment.ts` to push generated trial timelines into the main timeline.
