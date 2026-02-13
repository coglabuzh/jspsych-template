# `src/lib/` Guide

This folder is for reusable functions.

## Structure

- `src/lib/general/`
  - task-agnostic utilities that can be reused in many experiments.
- `src/lib/color/`
  - reusable color-related helpers (for example CIELAB conversion).
- `src/lib/response/`
  - reusable response/scoring/validation helpers.

## Rule of thumb

- Put code in `general/` if it is broadly reusable and task-agnostic.
- Put code in `color/` for color generation/conversion helpers.
- Put code in `response/` if it mainly processes participant responses.
