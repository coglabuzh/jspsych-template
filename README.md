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

The root of `src/` is intentionally small. Files here are the main files
template users are expected to inspect and edit.

## Folder Guide

- `src/instructions/`
  - Welcome/consent/fullscreen/browser-check and instruction-related screen definitions.
- `src/text/`
  - Localized text dictionaries and translation helpers.
- `src/trials/`
  - Trial template structure (`stimuli`, `layout`, `trial`, `builders`).
- `src/runtime/`
  - Internal jsPsych setup, mutable runtime state, interaction tracking, and
    local/JATOS/Prolific finish flow. Most users should not need to edit this.
- `src/lib/general/`
  - Shared general functions (CSS helpers, timers, geometry, button layouts,
    and other task-agnostic utilities).
- `src/lib/color/`
  - Reusable color-generation/conversion functions.
- `src/lib/forms/`
  - Form validation and form-related data collection helpers.
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

Form validation helpers live in `src/lib/forms/`. Most studies can reuse the
template defaults unless the consent or notice HTML fields change.

Runtime lifecycle code lives in `src/runtime/` so task scripts stay focused on
experiment content rather than platform upload and finish mechanics.

## Notes

- `PLATFORM` controls where and how the task runs:
  - `JATOS: "off"`: local testing; no JATOS upload or finish calls.
  - `JATOS: "continue"`: successful participants open the next JATOS component.
  - `JATOS: "finish"`: successful participants finish the JATOS study here.
  - `IF_FAILED: "finish"`: failed participants finish the JATOS study here.
  - `IF_FAILED: "continue"`: failed participants open the next JATOS component.
  - `PROLIFIC: true`: redirect to Prolific when the JATOS study finishes.
- Consent participant ID label switches automatically:
  - `Prolific-ID` when `PLATFORM.PROLIFIC = true`
  - `Participant-ID` when `PLATFORM.PROLIFIC = false`
- Common platform setups:
  - Local testing: `JATOS: "off"`, `IF_FAILED: "finish"`, `PROLIFIC: false`.
  - Earlier component: `JATOS: "continue"`, `IF_FAILED: "finish"`, `PROLIFIC: false`.
  - Earlier component with failure debrief: `JATOS: "continue"`, `IF_FAILED: "continue"`.
  - Final Prolific component: `JATOS: "finish"`, `IF_FAILED: "finish"`, `PROLIFIC: true`.
