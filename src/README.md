# `src/` Guide

This folder contains all experiment source code.

## Start Here

- `experiment.ts`: timeline assembly and experiment run entrypoint.
- `settings.ts`: global config values users are expected to edit.
- `jsp.ts`: jsPsych initialization and end-of-study behavior.

## Subfolders

- `instructions/`: experiment-level and trial-level instructions.
- `text/`: localized text dictionaries + translation helper.
- `trials/`: trial template architecture (stimuli/layout/trial/builders).
- `lib/general/`: reusable general logic used across modules.
- `lib/color/`: reusable color-generation/conversion modules.
- `lib/response/`: reusable response/scoring/validation modules.
- `survey/`: survey-related resources.

## Recommended Editing Order (Template Users)

1. `settings.ts`
2. `text/*`
3. `instructions/*`
4. `trials/*`
5. `experiment.ts`
