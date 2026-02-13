# `src/text/` Guide

This folder stores participant-facing text and localization helpers.

## Files

- `helpers.ts`
  - `translateText(...)` helper with language fallback.
- `types.ts`
  - language/text type definitions.
- `screens.ts`
  - screen text (welcome, fullscreen, trial-related messages).
- `buttons.ts`
  - button labels.
- `end.ts`
  - end-of-study messages.
- `consent.ts`
  - consent description text by language.
- `survey.ts`
  - survey text content.
- `index.ts`
  - barrel exports for easy imports.

## How to Use

1. Add or edit language strings in the relevant file.
2. Keep keys consistent across languages (`en`, `de`, `cn`).
3. Use `translateText(dict, lang)` in UI/trial/instruction files instead of direct indexing.

## Adding a New Language (Example: Japanese `ja`)

1. Add `ja` entries to text dictionaries in this folder (`screens.ts`, `buttons.ts`, `end.ts`, `consent.ts`, `survey.ts`).
2. Set active language in `src/settings.ts`:
   - `CONSENT.LANG = "ja"`
3. Add matching external HTML files:
   - `assets/external-html/consent-ja.html`
   - `assets/external-html/notice-ja.html`
4. Recommended for type safety:
   - add `"ja"` to `LANGS` in `src/text/types.ts`
