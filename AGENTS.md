# AGENTS.md

## Overview
- Static site split across three files: `pax-and-bea.html` (markup), `styles.css` (all styling), and `script.js` (puzzle and letter behavior). There is no `package.json`, build step, test suite, linter, or dependency install.
- Keep changes in those three files unless asked otherwise. Do not add frameworks, bundlers, or external JS/CSS; the plain static setup is intentional.
- The stylesheet, script, and photo paths are relative to the HTML file. If the HTML moves, update all of them together.

## Preview and verification
- No dev server is required: open `pax-and-bea.html` directly in a browser, or serve the repo root with any static server.
- There are no automated tests. Verify manually: scroll all three sections, complete the puzzle by dragging all 9 pieces onto the dotted frame, click "skip, show me the letter", and check a narrow viewport and `prefers-reduced-motion`.
- Puzzle piece placement is randomized on each load, so exact-position testing is not reproducible.

## Assets and content
- Photos are loaded relative to the HTML, e.g. `photos/puzzle.jpg` and the suggested `photos/1.jpg`–`5.jpg` in the gallery comments. Create a `photos/` directory alongside the HTML when adding them.
- `photos/puzzle.jpg` is center-cropped to a square by the JS. If it is missing, the puzzle silently falls back to an inline SVG heart placeholder.
- Text like "caption here" and "Your letter goes here" is intentional template copy for the owner to fill in. Keep the Pax & Bea personalization unless asked to change it.

## Implementation notes
- The 3×3 puzzle is built by `build()` in `script.js`: pieces are CSS `clip-path` shapes sharing one background image, tab directions come from the random `H`/`V` arrays, and a drop succeeds when within `s * .35` of the target. Changing the grid or tab geometry means updating `path()` and the `S`/`U`/`N` lookup tables together.
- The letter starts with the `locked` class and is revealed by `show()`, either after all 9 pieces are placed or via the skip button.
- All styling lives in `styles.css` and uses CSS variables (`--c` per section, plus `--ink`, `--cream`, `--grain`). Reuse them rather than adding new one-off colors. Dragging relies on pointer events and `touch-action`; preserve mobile touch behavior.
