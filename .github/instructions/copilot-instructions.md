You are working in an existing React + Vite + TypeScript project.
Follow STRICTLY the rules from `.github/instructions/copilot-instructions.md` (semicolons, single quotes, module structure, TanStack Query usage, no new deps, minimal diffs, theme light/dark/system, and GitHub PR workflow).

Goal:
Implement/align the current app UI to match the Figma design as close to pixel-perfect as possible.

Figma:
https://www.figma.com/design/K23ARCuIms0MmiljLxB3l6/Burro-bot?node-id=4-1954&m=dev

Non-negotiable Git workflow (DO THIS FOR EVERY TASK):
1) `git checkout main`
2) `git pull --rebase origin main`
3) Create a fresh branch:
   - feature: `git checkout -b xamidullo/feature/<short-kebab-name>`
   - fix: `git checkout -b xamidullo/fix/<short-kebab-name>`
4) Make changes with minimal diffs.
5) `git add -A`
6) `git commit -m 'feat: <short>'` or `fix: <short>'`
7) `git push -u origin HEAD`
8) Create PR:
   - `gh pr create --base main --head HEAD --fill`

Task scope (do NOT expand scope):
- Only implement the UI for the Figma screen(s) related to node 4:1954 first.
- Use existing layouts/routes/components. Only create new components if absolutely necessary and place them under the correct module structure.
- Respect existing theme provider + toggle.

Work approach (YOU MUST follow this order):
A) Discovery (no code yet):
   1) Identify the current route/page that corresponds to this Figma screen (or propose the best mapping).
   2) List EXACT files that will be modified/created (keep this list small).
   3) Extract design tokens needed (colors, typography, spacing, radius) and map them to the existing Tailwind/CSS variables approach already in the repo.

B) Implementation (minimal diffs):
   1) Implement page layout and reusable UI components to match Figma:
      - spacing, font sizes/weights, border radius, shadows
      - button/input states (hover/focus/disabled)
      - responsive behavior at 375, 768, 1440 widths
   2) No direct axios calls inside components; if data is needed use module api + services + TanStack Query hooks (mock is ok if backend not ready).

C) Verification:
   1) Ensure `npm run lint` and `npm run build` succeed.
   2) If Playwright already exists, add/adjust a basic test + screenshot for this screen at the 3 viewports.
      If Playwright does not exist, DO NOT add it unless explicitly asked.

Output format in your response:
1) A short plan (5–8 steps).
2) The file list (modified/created).
3) Then provide minimal patch-style diffs per file.
4) Then list the exact commands to run locally.
5) Finally, execute the Git workflow commands (branch name suggestion + commit message suggestion), ending with `gh pr create --fill`.

Important constraints:
- No new dependencies.
- No refactors outside the requested screen.
- Keep code consistent with existing patterns and exports.
