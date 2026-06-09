# `src/` Guide

This folder contains the experiment source code.

The root of `src/` is reserved for researcher-facing files that template users
are expected to edit directly.

## Start Here

- `experiment.ts`: timeline assembly and experiment run entrypoint.
- `settings.ts`: global config values users are expected to edit.

## Subfolders

- `instructions/`: experiment-level and trial-level instructions.
- `text/`: localized text dictionaries + translation helper.
- `trials/`: trial template architecture (stimuli/layout/trial/builders).
- `runtime/`: internal jsPsych setup, mutable runtime state, browser-interaction tracking, and finish/upload flow.
- `lib/general/`: reusable general helpers that are not tied to runtime lifecycle.
- `lib/color/`: reusable color-generation/conversion modules.
- `lib/forms/`: form validation and form-related data collection helpers.
- `lib/response/`: reusable response/scoring/validation modules.
- `survey/`: survey-related resources.

## Recommended Editing Order (Template Users)

1. `settings.ts`
2. `text/*`
3. `instructions/*`
4. `trials/*`
5. `experiment.ts`

Most users should not need to edit `runtime/` unless they are changing how the
experiment starts, tracks browser interactions, saves data, or finishes on
JATOS/Prolific.
