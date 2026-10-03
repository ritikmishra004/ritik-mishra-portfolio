# Portfolio contribution guide

## Source of truth

- Keep project facts, actions, and availability in `data/projects.ts`.
- Keep skills, experience, and social links in their respective `data/` modules.
- Never replace unknown data with plausible-looking URLs, metrics, company names, credentials, or claims.
- Use `null` for an unavailable resource and let the UI hide its action.

## Design principles

- Preserve the dark-first, restrained visual language.
- Prefer semantic HTML, keyboard-accessible controls, and visible focus states.
- Respect `prefers-reduced-motion` for animated UI.
- Keep new UI responsive from small mobile widths upward.

## Verification

Before handing off changes, run `npm run lint` and `npm run build` when dependencies are installed.
