# Instructions Guide

This folder contains all instruction-related screens for the template.

## What to edit

- `src/instructions/experimentInstr.ts`
  - Use this for **whole-experiment instruction flow** (global guidance shown once).
  - Typical content: overview, task rules, examples, reminders before practice.

- `src/instructions/trialInstr.ts`
  - Use this for **per-trial or per-block instruction screens**.
  - Typical content: trial start countdown, block break text, trial-level reminders.

- `src/instructions/consent.ts`
  - Loads consent/notice HTML and injects placeholders.
  - Update if you want to change consent template behavior.

- `src/instructions/welcome.ts`
  - Welcome screen shown at the start.

- `src/instructions/browserCheck.ts`
  - Browser/window-size checks.

- `src/instructions/fullScreen.ts`
  - Fullscreen transition screen and tracking start.

## Timeline wiring

- `src/experiment.ts` controls which instruction screens are added to the timeline and in what order.
- If you add/remove instruction screens, update `src/experiment.ts` accordingly.
