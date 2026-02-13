# jsPsych Template

A template for building browser experiments with:
- `jsPsych 8` + official plugins
- `jspsych-builder`
- optional `@kurokida/jspsych-psychophysics`

## Quick Start

1. Install dependencies:
   - `npm install`
2. Start development server:
   - `npm start`
3. Build for non-JATOS platforms:
   - `npm run build`
4. Export for JATOS platform:
   - `npm run jatos`

## Main Files

- `src/experiment.ts`
  - Main entry point that builds the timeline and runs `jsPsych`.
- `src/settings.ts`
  - Central configuration (`CONSENT`, timings, keys, condition settings, run flags).
- `src/jsp.ts`
  - `initJsPsych(...)` setup, finish behavior, data handling, redirect logic.

## Folder Guide

- `src/instructions/`
  - Welcome/consent/fullscreen/browser-check and instruction-related timeline pieces.
- `src/text/`
  - Localized text dictionaries and translation helpers.
- `src/trials/`
  - Trial template structure (`stimuli`, `layout`, `trial`, `builders`).
- `src/lib/general/`
  - Shared general functions (CSS, consent checks, timers, interaction checks).
- `src/lib/color/`
  - Reusable color-generation/conversion functions.
- `src/lib/response/`
  - Reusable response/scoring/validation functions.
- `assets/`
  - Static files (images, external consent/notice HTML).

## Typical Customization Workflow

1. Update study-level settings in `src/settings.ts`.
2. Edit consent/notice text in:
   - `src/text/consent.ts`
   - `assets/external-html/consent-*.html`
3. Edit participant-facing UI strings in `src/text/*`.
4. Add/modify instruction screens in `src/instructions/*`.
5. Implement your trial logic in `src/trials/*` (template stubs are provided).
6. Wire timeline order in `src/experiment.ts`.

## Notes

- `RUN_PROLIFIC` controls whether completion flow redirects to Prolific.
- Consent participant ID label switches automatically:
  - `Prolific-ID` when `RUN_PROLIFIC = true`
  - `Participant-ID` when `RUN_PROLIFIC = false`
