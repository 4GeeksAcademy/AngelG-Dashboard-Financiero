# Skills usage evidence

## Purpose
Registro de skills que influyeron efectivamente en el trabajo de este repositorio. Una skill creada o disponible no se considera automáticamente usada. Se conservan separadas la consulta, la aplicación y el resultado.

## Evidence records

### Current exercise — static performance audit with `web-perf`

- **Skill consulted:** `web-perf` — [`.agents/skills/web-perf/SKILL.md`](../.agents/skills/web-perf/SKILL.md), installed from `cloudflare/skills` after discovery with `npx skills find` (searches included performance, testing, TypeScript, and forms).
- **Skill applied to audit:** Yes. Its evidence-led workflow was used for static source/build review and to distinguish bundle evidence from browser performance measurements.
- **Skill applied to verified modification:** No. No product/runtime change was made from this skill.
- **Measurement pending:** Browser trace, network inspection, Lighthouse/Core Web Vitals, and a controlled before/after comparison for any proposed bundle change.
- **Community discovery evidence:** The original exercise ran `npx skills find performance`, `testing`, `typescript`, and `forms` individually. `cloudflare/skills@web-perf` was selected from the performance search because the Vite dashboard had a >500 kB bundle advisory. The recorded evaluation was Gen: Safe, Socket: 0 alerts, Snyk: medium risk. The repository record does not retain names/details for candidates rejected from the other three searches; those results should not be reconstructed from memory.
- **Purpose / problem addressed:** Review loading/performance risks in the financial dashboard and separate source/build evidence from browser measurements.
- **Task/phase:** Static performance audit and recommendations, 2026-10-14.
- **Guidance applied:** Inspected the Vite/React build setup, bundle output, and codebase opportunities; followed the skill's evidence-led approach and did not infer Core Web Vitals from static inspection. The audit did not implement the proposed optimizations.
- **Files affected:** No product/runtime files were changed by the audit. The skill is present at `.agents/skills/web-perf/SKILL.md`; its installation metadata is in the untracked `skills-lock.json` in the current working tree.
- **Evidence and limits:** The production build reported a JavaScript chunk of approximately 587.8 kB (175.9 kB gzip) and a Vite advisory for chunks over 500 kB; CSS was 19,167 bytes. Sourcemap mappings attributed approximately 258 kB of generated JS to Recharts sources, not a guaranteed removable amount. No browser trace, network inspection, Lighthouse run, or LCP/INP/CLS measurement was performed. The audit supports a bundle-size observation only, not a claim about user-perceived performance.
- **Result:** Skill applied to static source/build audit, not to a performance code modification. No sufficiently evidenced optimization was approved; lazy-loading the main charts and changing Vite configuration were not recommended. Further bundle optimization remains pending a browser trace and controlled before/after bundle/network comparison. No commit was created.

### Final delivery checks — 2026-10-14

- **Current verification:** `npm --prefix frontend test` passed (2 files, 9 tests); `npm --prefix frontend run lint` passed; `npm --prefix frontend run build` passed and retained Vite's >500 kB warning (JS 587.76 kB, gzip 175.89 kB).
- **Backend verification:** The global host interpreter still lacks `pytest`. A temporary venv outside the repo was populated from `backend/requirements.txt`; Python 3.14 passed all 15 tests. Docker also passed all 15 tests with Python 3.13.16/pytest 9.1.1. Both runs emitted one `StarletteDeprecationWarning` about `httpx` with `starlette.testclient`, recommending `httpx2`. No repository dependency files changed.
- **Manual accessibility:** The user reports that the manual checklist passed; it was not independently repeated in this session. Lighthouse, network trace, and Core Web Vitals remain unmeasured.
- **Scope:** These checks validate the current frontend build; they do not convert the `web-perf` audit into a code modification or prove a performance improvement.

### Authorized code change and delivery commits — 2026-10-14

- **Vercel modification:** `frontend/src/App.tsx` now stores fetched movements and derives KPI/monthly values during render under `rerender-derived-state-no-effect`. Frontend tests (2 files, 9 tests), lint, and build passed afterward. The bundle size/warning did not improve; no performance claim is made.
- **Backend:** The temporary venv and Docker runs each passed 15 tests. Both reported the same `StarletteDeprecationWarning` concerning `httpx` and `starlette.testclient`; project dependency files were unchanged.
- **Manual accessibility:** The user reports the manual checks passed; the agent did not repeat them independently. Browser performance metrics remain unmeasured.
- **Commit traceability:** `54269f5` contains the Vercel state-derivation hunk; `b79ce24` contains accessibility/localization and tests; `1a022c6` contains community skill files plus `skills-lock.json`; `23cd8a6` adds the internal validation skill. Memory bank is handled in a separate commit.

### Current exercise — `vercel-react-best-practices` static audit

- **Skill consulted:** `vercel-react-best-practices` — [`.agents/skills/vercel-react-best-practices/SKILL.md`](../.agents/skills/vercel-react-best-practices/SKILL.md) and its complete compiled guide, [`.agents/skills/vercel-react-best-practices/AGENTS.md`](../.agents/skills/vercel-react-best-practices/AGENTS.md) (3,810 lines).
- **Skill applied to audit:** Yes. The rules listed below were checked against the actual React/Vite/Rolldown app and package metadata; Next.js-only guidance was not transferred to this Vite SPA.
- **Skill applied to verified modification:** Yes. `frontend/src/App.tsx` now stores the API movements and derives KPI/monthly data during render, following `rerender-derived-state-no-effect`. This simplifies the source of truth; no performance improvement is claimed or measured. The `computeKPIs` algorithm was not changed.
- **Measurement pending:** Controlled before/after bundle analysis and browser measurements before recommending a bundle or render optimization.
- **Task/phase:** Frontend static performance audit and final compliance review, 2026-10-14.
- **Guidance applied to audit:** Evaluated rule 2.1 (`bundle-barrel-imports`) against the Vite/Rolldown build and Recharts 3.8.1 package metadata (`module: es6/index.js`, `sideEffects: false`); evaluated 2.4 (`bundle-dynamic-imports`) against the initially visible charts and the explicit scope not to defer them; evaluated 5.1 (`rerender-derived-state-no-effect`) against `frontend/src/App.tsx`; and considered 7.6 (`js-combine-iterations`) for `computeKPIs` but did not recommend or implement it because the proposal was explicitly not approved and no material benefit was demonstrated. No Next.js APIs were proposed for this Vite SPA.
- **Evidence and decision:** Named Recharts imports are tree-shaken by the production build, so the barrel import alone does not establish a defect. The app does not demonstrate duplicate requests that would justify SWR deduplication. The state refactor is a maintainability change, not a measured optimization. The primary charts remain eager by design.
- **Files affected/result:** `frontend/src/App.tsx` contains this refactor alongside earlier accessibility/localization changes. Separate commits will require staging the specific refactor hunk independently. After the change, frontend tests passed (2 files, 9 tests), lint passed, and build passed with Vite's >500 kB advisory unchanged. No stage or commit was made.

### Current exercise — create and exercise `financial-dashboard-validation`

- **Skill actually used:** `financial-dashboard-validation` — [`.agents/skills/financial-dashboard-validation/SKILL.md`](../.agents/skills/financial-dashboard-validation/SKILL.md).
- **Purpose / problem addressed:** Prevent inconsistent or speculative validation of dashboard changes by giving agents the repository's real data path, financial calculation/chart touchpoints, contract sources, actual commands, evidence expectations, and approval boundaries in one reusable procedure. Evidence includes the UI fetch in `frontend/src/App.tsx`, calculation helpers in `frontend/src/lib/financial-utils.ts`, Recharts components and accessible tables, and differing frontend/backend test availability.
- **Task/phase:** Internal skill design and simulated validation exercise, 2026-10-14.
- **Guidance applied:** Read repository memory/rules and the existing dashboard/community skills; inspected npm scripts, frontend/backend tests, Vite proxy, data types, calculation and chart components, backend Pydantic routes, README runtime instructions, git state/history. Simulated validation against the existing dashboard without changing runtime code or financial data.
- **Files affected:** New `.agents/skills/financial-dashboard-validation/SKILL.md` and this evidence entry. No product/runtime, API, dependency, financial-data, or test files were changed by this exercise.
- **Recognition evidence:** `cd /workspaces/AngelG-Dashboard-Financiero && npx skills list --json` listed `financial-dashboard-validation` at `.agents/skills/financial-dashboard-validation` with project scope and GitHub Copilot agent. Running the same command from `frontend/` returned an empty list, so CLI discovery is root-relative; the repository README independently specifies `.agents/skills/<name>/SKILL.md`.
- **Verification evidence:** `npm --prefix frontend test` passed (2 files, 9 tests); `npm --prefix frontend run lint` passed; `npm --prefix frontend run build` passed, with Vite's >500 kB JS chunk advisory (587.76 kB, 175.89 kB gzip). `python -m pytest backend/tests` could not run because `pytest` is not installed (`No module named pytest`); dependencies were not installed. The dry validation also confirmed the source path `/api/metrics` → `computeKPIs`/`computeMonthlyData` → KPI cards and two Recharts charts, with chart data tables and an explicit no-data state. Browser/runtime checks were not performed. CLI `list`, build, and diff/status checks verify structural/use guidance only, not automatic agent invocation.
- **Result:** Skill created, recognized by the project CLI from repository root, loaded and applied to a safe validation simulation. Frontend tests/lint/build passed; backend test execution remains blocked by missing environment dependency. No commit was created.

### Current exercise — accessibility and Spanish localization of the financial dashboard

- **Skills actually used:** `accessibility` — [`.agents/skills/accessibility/SKILL.md`](../.agents/skills/accessibility/SKILL.md); `financial-dashboard` — [`.agents/skills/financial-dashboard/SKILL.md`](../.agents/skills/financial-dashboard/SKILL.md).
- **Guidance applied:** The accessibility skill informed native semantic headings/tables, text alternatives for charts, keyboard-visible focus, skip navigation, loading announcements, Spanish document language, and reduced-motion support. The dashboard skill informed preservation of financial calculations and chart behavior, explicit USD formatting, scoped frontend changes, and honest reporting of validation limits.
- **Task/phase:** Approved implementation of dashboard accessibility and Spanish UI localization, 2026-10-14.
- **Files affected:** `frontend/index.html`, `frontend/src/App.tsx`, dashboard header/KPI/chart components, `frontend/src/components/ui/card.tsx`, `frontend/src/index.css`, `frontend/src/lib/financial-utils.ts`, its tests, and new `frontend/src/components/dashboard/dashboard-accessibility.test.tsx`. No backend or financial calculation logic was changed.
- **Verification evidence:** `npm ci --prefix frontend` succeeded. `npm test --prefix frontend` passed (2 files, 9 tests); `npm run lint --prefix frontend` passed; `npm run build --prefix frontend` passed. Vite reported its existing >500 kB chunk advisory. npm install reported 13 dependency vulnerabilities (1 low, 5 moderate, 7 high). The formatter expectations were checked against actual Node `Intl` output (`USD 1,235`; `15.6`). No browser-based keyboard, zoom, screen-reader, or rendered contrast test was performed.
- **Result:** Dashboard UI copy and document language are Spanish; both charts have expandable native data tables; semantic structure, loading/status communication, skip link, visible focus, and reduced motion support were added. This is not a claim of full WCAG conformance; manual/browser accessibility validation remains pending.

### Current exercise — compliance audit against specification-driven dashboard brief

- **Skill:** `financial-dashboard` — [`.agents/skills/financial-dashboard/SKILL.md`](../.agents/skills/financial-dashboard/SKILL.md)
- **Guidance applied:** Reviewed repository rules/memory, preserved existing user changes, traced API fields to backend handlers, kept scope in `frontend/specs/`, and validated types without changing runtime or backend.
- **Task/phase:** Audit and correction of the three-functionality specification exercise, 2026-10-09.
- **Files affected:** `frontend/specs/api-types.ts`, new `frontend/specs/param-types.ts`, `frontend/specs/components.md`, `frontend/specs/README.md`, and this evidence record. No React/runtime, backend, dependency, configuration, or commit changes.
- **Evidence:** Existing `/api/metrics` accepts optional date bounds and feeds the current dashboard; `/api/metrics/summary` provides grouped `income`/`outcome`; `/api/metrics/alerts` uses an accumulated baseline rather than the PM's three-period moving average; `/api/metrics/facets` returns global categories, not categories filtered by group. These were verified against `backend/app/routes.py`. The server at `localhost:8000` was stopped during this turn; an attempted live OpenAPI request failed, and importing FastAPI locally failed because the dependency is not installed. The earlier exercise had a successful live OpenAPI inspection on the same date.
- **Corrections:** Added exact response aliases (`FacetsResponse`, `AlertEntry`, `AlertsResponse`, `CategoryEntry`, `TopCategoriesResponse`) and query interfaces (`DateRangeFilter`, `AlertsParams`, `TopCategoriesParams`) with JSDoc for every property. Specified the existing-dashboard date filter, a summary-based three-calendar-month alert derivation, a new `/comparison` page, group-income percentages, and a two-total B2B/B2C chart. Documented that facets cannot return per-group category lists.
- **Verification:** `npx --no-install tsc --noEmit` passed (exit 0); strict targeted TypeScript compile of `specs/api-types.ts` and `specs/param-types.ts` passed (exit 0); `git diff --check` passed; editor diagnostics reported no errors; static checks passed for required names, no `any`/`object`, 12 README sections, edge cases and relative links. Build/lint/tests were not run because this task only changed specification/type files. No commit was created.
- **Result:** Deliverables match the requested documentation scope, with the two API mismatches called out and implementation-ready resolutions documented. Live `/docs` could not be rechecked in this turn.

### Current exercise — tech-lead audit of dashboard specifications

- **Skill:** `financial-dashboard` — [`.agents/skills/financial-dashboard/SKILL.md`](../.agents/skills/financial-dashboard/SKILL.md)
- **Purpose / guidance applied:** Se aplicó trazabilidad de requisitos al OpenAPI/backend, separación entre contrato wire y propuestas UI, preservar alcance documental, distinguir errores de arrays vacíos y validar antes de aprobar.
- **Task/phase:** Auditoría de aprobación previa a implementación, 2026-10-09.
- **Files affected:** `frontend/specs/api-types.ts`, `frontend/specs/components.md`, `frontend/specs/README.md`, y este registro. No se modificaron runtime, backend, configuración ni se creó commit; se preservaron cambios preexistentes.
- **Evidence:** OpenAPI vivo `http://localhost:8000/openapi.json` inspeccionado para rutas, parámetros, nulabilidad, required, defaults y response models. Se verificó sum(summary income) frente a Top income en mock vivo: B2B 615540.72/615540.72 y B2C 642606.15/642606.15; esto sustenta factibilidad de una derivación, no aprobación PM ni garantía de datos futuros.
- **Verification:** `cd frontend && npx --no-install tsc --noEmit` terminó con código 0. El `tsconfig.app.json` solo incluye `src`, por eso se ejecutó también `npx --no-install tsc --ignoreConfig --noEmit --strict --skipLibCheck --target ES2023 --module ESNext --moduleResolution bundler specs/api-types.ts` (código 0). `git diff --check` pasó. Se verificaron 12 secciones numeradas, 5/7/4 casos de borde en fechas/alertas/B2B-B2C y 16 enlaces relativos presentes. No se ejecutaron build/lint/tests porque solo se tocaron especificaciones/tipos declarativos.
- **Result:** Tipos wire centralizados en `api-types.ts`; README/components usan los aliases compartidos y se aclaró required/nullability de comparison, rango invertido, baseline alerta, cardinalidad del Top, y propuesta de derivar porcentajes/gráfico desde summary. Pendientes PM: política de fechas, baseline móvil vs acumulado, umbral, denominador/redondeo/cero/divisa y métrica/ejes del gráfico. Sin commit.

### Current exercise — data contract specification

- **Skill:** `financial-dashboard` — [`.agents/skills/financial-dashboard/SKILL.md`](../.agents/skills/financial-dashboard/SKILL.md)
- **Purpose / guidance applied:** Se consultó y aplicó el flujo de trabajo de especificación: mantener el alcance documental, trazar requisitos a OpenAPI/backend/frontend, etiquetar discrepancias como pendientes, no tocar runtime y validar enlaces/consistencia antes de implementar.
- **Task/phase:** Contrato de datos para filtro de fechas, alertas y comparación B2B/B2C, 2026-10-09.
- **Files affected by this exercise:** [`frontend/specs/README.md`](../frontend/specs/README.md) y este registro. No se modificaron componentes runtime ni backend. Se preservaron cambios preexistentes de la rama.
- **Verification evidence:** `git diff --check` pasó. Se verificaron 12 secciones numeradas, casos límite de las tres funcionalidades y enlaces relativos existentes; no se ejecutaron build, lint ni tests porque solo se documentó el contrato. OpenAPI vivo consultado; `frontend/specs/api-types.ts` y la matriz aprobada referida por PM no estaban presentes.
- **Result:** Especificación creada, con tipos de query y respuesta documentales trazados al contrato observado, límites/defaults y decisiones pendientes (baseline tres periodos, denominador porcentual, divisa y política de fechas). No se creó `api-types.ts` ni se hizo commit.

### Current exercise — dashboard component specification

- **Skill:** `financial-dashboard` — [`.agents/skills/financial-dashboard/SKILL.md`](../.agents/skills/financial-dashboard/SKILL.md)
- **Purpose:** Guiar la especificación de funcionalidades del dashboard financiero usando evidencia del contrato real y separando datos confirmados de decisiones pendientes.
- **Why applied:** La tarea requiere especificar componentes financieros y contrastar requisitos con el estado del frontend y la API.
- **Task/phase:** Documento agnóstico de componentes para filtros de fechas, alertas de egresos y comparativa B2B/B2C, 2026-10-09.
- **Concrete guidance applied:** Se revisaron fuentes existentes y contratos reales; se mantuvieron cálculos/reglas financieras fuera de una propuesta de implementación de UI; se señalaron explícitamente discrepancias y datos no presentes en el API en vez de inventar contratos.
- **Files affected by this exercise:** [`frontend/specs/components.md`](../frontend/specs/components.md) y este registro de evidencia. No se modificaron frontend runtime ni backend en esta tarea.
- **Verification evidence:** `git diff --check` pasó; siete enlaces relativos del documento apuntan a rutas existentes; se verificó presencia de las secciones A/B/C, fechas de un solo extremo y estados vacíos de alertas y de ambos grupos. No se ejecutaron build, lint ni tests porque el cambio de esta tarea es documentación.
- **Result:** Documento creado y validado estructuralmente. `frontend/specs/api-types.ts` no existe en el workspace, por lo que el documento distingue tipos derivados del OpenAPI vivo de tipos TypeScript importables y deja esa fuente como pendiente.

### Current exercise — create and document a project skill

- **Skill:** `financial-dashboard` — [`.agents/skills/financial-dashboard/SKILL.md`](../.agents/skills/financial-dashboard/SKILL.md)
- **Purpose:** Guiar la exploración, especificación, implementación y validación del dashboard financiero de este repositorio.
- **Why applied:** Este ejercicio pide crear una skill específica del dashboard y comprobar su formato, rutas y consistencia con las reglas locales.
- **Task/phase:** Ejercicio de reutilización de conocimiento, objetivos A–C, 2026-10-09.
- **Concrete guidance applied:** Tras crear la skill, consulté sus pasos de exploración y de distinción de uso real, verifiqué fuentes/rutas ya revisadas y separé su uso actual de los cambios que la precedieron. La skill no se atribuye cambios previos a su creación.
- **Files affected by this exercise:** [`.agents/skills/financial-dashboard/SKILL.md`](../.agents/skills/financial-dashboard/SKILL.md) y este documento. La creación y verificación se ejecutan con esta tarea; no se alteraron componentes del dashboard en este ejercicio.
- **Verification evidence:** La skill existe bajo la estructura documentada por `README.md` y `README.es.md` como `.agents/skills/<nombre>/SKILL.md`; frontmatter YAML con `name` y `description`; los enlaces/rutas a archivos descritos se verifican en la validación final de esta tarea. La skill fue leída después de su creación y sus instrucciones de comprobación documental se aplicaron al crear este registro.
- **Result:** Parcial. Creada y aplicada a esta tarea, con rutas y formato verificados. No se ejecutó una implementación funcional del dashboard ni una segunda validación completa de build/lint/tests en este ejercicio; esos resultados pertenecen a la iteración previa, no a la skill recién creada.

### Previous exercise — metadata, accessibility, and build corrections

- **Skills actually used:** Ninguna identificable.
- **Purpose / reason:** El registro disponible muestra que se inspeccionaron las reglas `.agents/rules/` y el estado del repositorio, pero no existía ninguna skill bajo `.agents/skills/` al iniciar ese ejercicio.
- **Task/phase:** Corrección de metadatos, accesibilidad y validación del frontend, anterior a este ejercicio.
- **Concrete changes documented elsewhere:** título/descripción en `frontend/index.html`; semántica de encabezados en `frontend/src/components/ui/card.tsx`; estado de carga y alertas en `frontend/src/App.tsx`; estados vacíos y capa accesible en los dos gráficos; actualización de `memory-bank/current-state.md`; creación de `.agents/rules/11-evidencia-de-skills.md`.
- **Files affected:** Los archivos anteriores constan en el `git status`/resumen de la iteración previa. No se atribuyen a `financial-dashboard`, que todavía no existía.
- **Verification evidence recorded at that time:** `npm ci`, `npm run build`, `npm run lint`, `npm test` (5 pruebas) y `git diff --check` se reportaron ejecutados. La memoria también registra advertencias de chunk >500 kB, 13 vulnerabilidades de npm y que no hubo prueba manual de contraste/lector de pantalla.
- **Result:** Completado para esas correcciones, según el informe anterior. No fueron cambios producidos por una skill.

## Classification

- **Applied in current exercises:** `financial-dashboard` — aplicada en la creación/documentación de la skill y en la especificación de componentes.
- **Created but not retroactively applied:** `financial-dashboard` no produjo cambios del ejercicio anterior.
- **Consulted/applied rules (not skills):** archivos de `.agents/rules/` y `AGENTS.md`. Son reglas/instrucciones del repositorio, no skills.
- **Unavailable:** Ninguna skill estaba disponible en `.agents/skills/` al comenzar el ejercicio de correcciones anterior.
