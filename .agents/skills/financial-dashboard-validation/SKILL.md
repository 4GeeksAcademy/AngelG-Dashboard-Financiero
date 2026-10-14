---
name: financial-dashboard-validation
description: Validate changes to this repository's financial dashboard, frontend/API data flow, financial calculations, and chart presentation before integration.
---

# Financial dashboard validation

## Objective
Validate a proposed or implemented dashboard change against this repository's real data flow, financial calculations, component behavior, tests, and available build checks. Surface unsupported assumptions and unverified runtime behavior instead of silently changing financial semantics.

## When to use
Use for changes to `frontend/src/App.tsx`, `frontend/src/lib/financial-*`, `frontend/src/components/dashboard/`, dashboard-related API contracts/routes, or tests that exercise those flows. For unrelated work, use the relevant repository rules/skills without expanding scope to the whole dashboard.

## Inputs
- `git status --short --branch` and the requested scope/diff; preserve pre-existing user changes.
- Relevant rules in `.agents/rules/` and the applicable `memory-bank/` entries.
- Frontend flow: `frontend/src/main.tsx` → `frontend/src/App.tsx` → `frontend/src/lib/financial-types.ts` / `financial-utils.ts` → `frontend/src/components/dashboard/`.
- For API changes, verified route parameters and Pydantic response models in `backend/app/routes.py`; do not infer wire fields from UI labels.
- `frontend/package.json`, frontend tests, backend tests and README run instructions for available validation commands.

## Procedure
1. Record the existing working-tree state. Identify changed files and classify each as UI/presentation, financial calculation, API contract, or documentation. Do not include unrelated modifications in your conclusions.
2. Trace affected data end to end. The current UI fetches `/api/metrics` in `App.tsx`; KPI and monthly-series calculations are in `frontend/src/lib/financial-utils.ts`; chart rendering is in the two dashboard chart components. Confirm any changed endpoint against its route/model in `backend/app/routes.py`.
3. For calculation changes, state the exact input/output semantics from code and tests; check zero-income and date/month aggregation cases where relevant. Never invent a financial definition, currency, rounding policy, or period rule. Keep reusable calculations in `frontend/src/lib/` per `.agents/rules/03-logica-metricas-frontend-en-lib.md`.
4. For chart changes, check loading/empty/data states and the chart's tabular alternative. Preserve Recharts `accessibilityLayer` unless a verified installed-version reason and equivalent accessible behavior are provided. Do not claim rendered accessibility without a browser/manual check.
5. Add or update focused positive and negative/boundary tests for functional behavior, as required by `.agents/rules/05-testing-casos-positivos-y-negativos.md`. Keep frontend and backend responsibilities separate; for API changes apply `.agents/rules/01-contratos-api-tipados.md` and `.agents/rules/02-separacion-frontend-backend.md`.
6. Run the checks appropriate to changed layers (commands below). Report exact commands, outcomes, warnings, and any checks not run. Inspect `git diff --check`, final diff, and status; do not reset or commit.
7. If the request is review-only or implementation requires a product/financial decision, stop at findings and ask for approval rather than making a speculative change.
8. Record actual skill use and evidence in `memory-bank/skills-usage.md` following `.agents/rules/11-evidencia-de-skills.md` when this skill guided work. Distinguish audit from implementation; do not attribute earlier changes retroactively.

## Outputs
- Scope and affected files, with the data path and API contract references relevant to the change.
- Tests/build/lint commands actually run and pass/fail results, plus warnings and runtime/manual checks not performed.
- Findings categorized as verified issue, risk/assumption, or unverified behavior; concrete next step or approval question where needed.
- Evidence entry in `memory-bank/skills-usage.md` when the skill was applied to repository work.

## Acceptance criteria
- Every changed financial/API value is traced to an existing implementation or verified contract; no business rule is inferred from labels.
- Functional changes have focused tests covering an expected case and a relevant invalid/edge case.
- Applicable tests and checks are reported truthfully; no build/lint/test failure is hidden or described as passing.
- Chart loading/empty/data behavior and accessible alternative are considered when charts are affected.
- Scope, warnings, unverified checks, and evidence are explicit; unrelated worktree changes remain untouched.

## Constraints
- Do not alter financial calculations, mock data, API contracts, dependencies, or deployment configuration merely to make validation pass; require explicit scope/approval for such changes.
- Do not use synthetic assertions that encode an undocumented business policy. If expected behavior is unclear, record the decision as open.
- Do not run destructive operations, reset/discard changes, or create commits unless explicitly requested.
- Do not claim browser performance, visual, screen-reader, or deployed-runtime results from static checks.

## Verification commands
Run from the repository root, selecting checks for the affected layer:

```sh
npm --prefix frontend test
npm --prefix frontend run lint
npm --prefix frontend run build
python -m pytest backend/tests
```

`frontend/package.json` defines the three npm scripts. Backend test dependencies are listed in `backend/requirements.txt`; if pytest/FastAPI are unavailable, report the blocker rather than installing or changing dependencies without authorization. `docker compose up --build` is the documented local runtime command in `README.md`/`README.es.md`; use it only for an explicitly requested or approved runtime check, then report what was actually observed. Finish with:

```sh
git diff --check
git status --short --branch
```
