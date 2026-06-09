# `src/utils/` Guide

Utilities were moved to `src/lib/general/`.

Use:
- `src/lib/general/globalCss.ts`
- `src/lib/general/timer.ts`
- `src/lib/general/geometry.ts`

Form-specific helpers live in `src/lib/forms/`.

Runtime-specific behavior, such as browser-interaction tracking and finish
handling, now lives in `src/runtime/`.
