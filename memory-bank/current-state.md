# Current State

## Funcionalidades implementadas
1. API backend con endpoints:
- /health
- /api/metrics
- /api/metrics/facets
- /api/metrics/summary
- /api/metrics/categories/top
- /api/metrics/comparison
- /api/metrics/alerts
- /api/metrics/b2b
- /api/metrics/b2c
2. Generacion de dataset financiero mock deterministico y filtros por fecha, categoria, tipo de operacion y tipo de negocio.
3. Frontend con dashboard que:
- consume /api/metrics
- calcula KPI y serie mensual
- renderiza tarjetas KPI
- renderiza graficos de ingreso/egreso y margen
4. Pruebas existentes para backend (rutas y funciones de filtrado) y frontend (utilidades financieras).
5. Estructura de reglas de agentes creada en .agents/rules.

Evidencia:
- [backend/app/routes.py](../backend/app/routes.py)
- [backend/tests/test_routes.py](../backend/tests/test_routes.py)
- [frontend/src/App.tsx](../frontend/src/App.tsx)
- [frontend/src/lib/financial-utils.ts](../frontend/src/lib/financial-utils.ts)
- [frontend/src/components/dashboard/kpi-row.tsx](../frontend/src/components/dashboard/kpi-row.tsx)
- [frontend/src/components/dashboard/income-outcome-chart.tsx](../frontend/src/components/dashboard/income-outcome-chart.tsx)
- [frontend/src/components/dashboard/profit-percent-chart.tsx](../frontend/src/components/dashboard/profit-percent-chart.tsx)
- [.agents/rules/01-contratos-api-tipados.md](../.agents/rules/01-contratos-api-tipados.md)

## Problemas conocidos
1. CORS abierto con wildcard y credenciales habilitadas en backend.
2. Puerto de debug remoto expuesto (5678) en configuracion Docker.
3. README en espanol contiene una linea en ingles.

Evidencia:
- [backend/app/main.py](../backend/app/main.py)
- [backend/Dockerfile](../backend/Dockerfile)
- [docker-compose.yml](../docker-compose.yml)
- [README.es.md](../README.es.md)
- [frontend/index.html](../frontend/index.html)

## Riesgos
1. Riesgo de seguridad por CORS permisivo en entornos no controlados.
2. Riesgo de exposicion de depurador remoto si la configuracion se reutiliza fuera de desarrollo local.
3. Riesgo de mantenimiento por duplicacion entre endpoints B2B/B2C.
4. Riesgo de rendimiento por regenerar dataset completo en multiples endpoints por request.

Evidencia:
- [backend/app/main.py](../backend/app/main.py)
- [backend/Dockerfile](../backend/Dockerfile)
- [docker-compose.yml](../docker-compose.yml)
- [backend/app/routes.py](../backend/app/routes.py)

## Deuda tecnica
1. Dependencias de backend sin version pinneada en requirements.
2. Acoplamiento alto de logica de dominio y capa HTTP en un solo modulo backend/app/routes.py.
3. Cobertura de testing con foco principal en casos positivos.

Evidencia:
- [backend/requirements.txt](../backend/requirements.txt)
- [backend/app/routes.py](../backend/app/routes.py)
- [backend/tests/test_routes.py](../backend/tests/test_routes.py)
- [frontend/src/lib/financial-utils.test.ts](../frontend/src/lib/financial-utils.test.ts)

## Funcionalidades pendientes
No se encontraron funcionalidades pendientes explicitamente definidas en el repositorio (no hay backlog, roadmap ni seccion de pendientes funcionales en los archivos inspeccionados).

Incertidumbre explicita:
- La ausencia de backlog en el repositorio no prueba que no exista backlog externo.

Evidencia:
- [README.md](../README.md)
- [README.es.md](../README.es.md)
- [AGENTS.md](../AGENTS.md)

## Proximas prioridades
Prioridades de estabilizacion y calidad sobre lo ya implementado (sin agregar nuevas funcionalidades):
1. Reducir superficie de riesgo de seguridad en CORS y debug remoto.
2. Reducir deuda de mantenibilidad (duplicacion B2B/B2C y alto acoplamiento en routes.py).
3. Fortalecer reproducibilidad (versionado de dependencias backend).
4. Mejorar coherencia documental existente (README.es).

Evidencia:
- [backend/app/main.py](../backend/app/main.py)
- [backend/Dockerfile](../backend/Dockerfile)
- [docker-compose.yml](../docker-compose.yml)
- [backend/app/routes.py](../backend/app/routes.py)
- [backend/requirements.txt](../backend/requirements.txt)
- [README.es.md](../README.es.md)
- [frontend/index.html](../frontend/index.html)

## Como validar el estado
1. Inspeccion estatica de rutas backend y su cobertura en tests.
2. Verificacion de flujo frontend desde fetch en App hasta calculo y render de metricas.
3. Verificacion de configuracion de infraestructura y puertos expuestos.
4. Verificacion de scripts de desarrollo/testing declarados.

Evidencia para validacion:
- [backend/app/routes.py](../backend/app/routes.py)
- [backend/tests/test_routes.py](../backend/tests/test_routes.py)
- [frontend/src/App.tsx](../frontend/src/App.tsx)
- [frontend/src/lib/financial-utils.ts](../frontend/src/lib/financial-utils.ts)
- [docker-compose.yml](../docker-compose.yml)
- [frontend/package.json](../frontend/package.json)

## Incertidumbres detectadas en esta fase
1. No se ejecuto la suite de tests en esta fase; por tanto, no se valida aqui el estado runtime.
2. No fue posible inspeccionar el contenido de [frontend/.env.example](../frontend/.env.example) por restriccion de lectura del entorno.
3. No fue posible leer el archivo global de instrucciones del entorno (fuera del repositorio) por restriccion de acceso.

## Registro de correcciones de metadatos y accesibilidad
1. Se reemplazo el titulo generico del documento y se agrego una descripcion que resume el dashboard implementado; se mantuvo `lang="en"`, coherente con el texto visible de la interfaz.
2. Los titulos de las tarjetas de graficos ahora usan encabezados `h2`, subordinados al `h1` del dashboard. El cambio es global a `CardTitle`; validar otros usos de ese componente al ampliarlo.
3. Se expone el estado de carga en el landmark principal, los errores como alertas y los estados sin datos como status. Los graficos de Recharts activan explicitamente su capa de accesibilidad, que proporciona superficie SVG con `role="application"` y `tabIndex=0` en la version instalada.
4. Se agrego una regla de agentes para exigir evidencia al declarar uso de skills. En esta tarea no se encontro el directorio `.agents/skills/`, por lo que no se declara uso ni se crea una skill.

Archivos de evidencia:
- [frontend/index.html](../frontend/index.html)
- [frontend/src/App.tsx](../frontend/src/App.tsx)
- [frontend/src/components/ui/card.tsx](../frontend/src/components/ui/card.tsx)
- [frontend/src/components/dashboard/income-outcome-chart.tsx](../frontend/src/components/dashboard/income-outcome-chart.tsx)
- [frontend/src/components/dashboard/profit-percent-chart.tsx](../frontend/src/components/dashboard/profit-percent-chart.tsx)
- [11-evidencia-de-skills.md](../.agents/rules/11-evidencia-de-skills.md)

Validacion: `npm ci`, `npm run build`, `npm run lint` y `npm test` se ejecutaron en `frontend/`; build, lint y las 5 pruebas existentes pasaron. Build conserva una advertencia de chunk JavaScript >500 kB. `npm ci` informo 13 vulnerabilidades en dependencias (1 low, 5 moderate, 7 high); no se aplico `npm audit fix` para evitar cambios de dependencias fuera del alcance. `git diff --check` paso. No se realizo prueba visual/manual de contraste o lector de pantalla.

## Actualizacion posterior: accesibilidad, localizacion y rendimiento (2026-10-14)

Esta entrada refleja la iteracion posterior y prevalece sobre los detalles de estado que hayan quedado obsoletos en el registro histórico anterior.

- La interfaz y los metadatos visibles del documento se localizaron al español (`lang="es"`, texto, meses y etiquetas). El formato de moneda conserva la divisa explícita USD; los cálculos financieros y el contrato/API no se cambiaron.
- Se añadieron un enlace para saltar al contenido, estructura/etiquetas semánticas, anuncios de carga y error, foco visible, soporte de movimiento reducido y tablas de datos alternativas para los dos gráficos. Se añadió `dashboard-accessibility.test.tsx`.
- Validaciones registradas para esta iteración: `npm --prefix frontend test` pasó (2 archivos, 9 pruebas); `npm --prefix frontend run lint` pasó; `npm --prefix frontend run build` pasó con aviso de Vite por un chunk JavaScript de 587.76 kB (175.89 kB gzip); `git diff --check` pasó. Estos son resultados previamente registrados, no una nueva ejecución durante la actualización de memoria.
- `python -m pytest backend/tests` no pudo ejecutarse porque pytest no está instalado en el entorno. Aunque pytest figura en `backend/requirements.txt`, no se instalaron dependencias en esta iteración.
- Sigue pendiente la comprobación manual/en navegador de teclado, lector de pantalla, contraste renderizado y comportamiento runtime. No se midieron LCP/INP/CLS ni se ejecutó Lighthouse.
- La auditoría estática con `web-perf` identificó el aviso de bundle como oportunidad de investigación; no se implementaron optimizaciones de rendimiento. Cualquier cambio de división de bundle u otra optimización queda pendiente de aprobación y medición.

## Revisión final de cumplimiento de skills (2026-10-14)

- Se verificó la documentación de la actividad disponible en este repositorio (`README.md`, `README.es.md`, `FASE1_RESUMEN_PROYECTO.md`, `FASE2_BUENAS_PRACTICAS.md`, `FASE2_MALAS_PRACTICAS_RIESGOS.md`), `AGENTS.md`, `.agents/rules/11-evidencia-de-skills.md` y los documentos completos de `vercel-react-best-practices` y `web-perf`. No se encontró una rúbrica específica que exija una modificación de código por cada skill; las instrucciones del repositorio sí requieren registrar con evidencia el uso real, distinguiendo consulta de aplicación.
- **`vercel-react-best-practices` consultada:** se leyó la skill y su guía compilada completa. **Aplicada a auditoría:** se contrastaron reglas de imports de barrel, imports dinámicos y estado derivado con Vite/Rolldown, Recharts 3.8.1 y el código real; no se trasladó guía exclusiva de Next.js a esta SPA. **Aplicada a modificación verificada:** sí, `App.tsx` conserva los movimientos de API y deriva KPI/serie durante el render según `rerender-derived-state-no-effect`. El cambio simplifica la fuente de verdad; no se afirma una mejora de rendimiento medida. El algoritmo de `computeKPIs` no cambió.
- **`web-perf` consultada y aplicada a auditoría:** se inspeccionaron código, build y bundle. La build actual registra un chunk JS de aproximadamente 587.8 kB (175.9 kB gzip reportado por Vite) y el aviso por superar 500 kB. Los mappings atribuyen aproximadamente 258 kB generados a Recharts, pero eso no representa bytes necesariamente removibles. **Aplicada a modificación verificada:** no.
- **Medición pendiente:** Core Web Vitals, Lighthouse, traza de Chrome e inspección de red. Cualquier optimización del bundle queda pendiente de medición controlada; no se recomienda diferir los gráficos principales ni cambiar Vite solo para ocultar el aviso.
- Los cambios locales de accesibilidad/localización corresponden a la iteración anterior y no se atribuyen retroactivamente a las skills de rendimiento.
- Verificación de la auditoría previa: tests frontend (2 archivos, 9 pruebas), lint y build pasaron; la build mantuvo el aviso del chunk. En esta actualización documental no se repitieron esos comandos; se comprobaron el diff y el estado de Git. No se hizo stage ni commit.
- `frontend/src/App.tsx` contiene tanto cambios previos de accesibilidad/localización como el hunk nuevo de estado derivado. Para commits separados por skill, ese hunk de Vercel debe stagearse independientemente; no se debe incluir el archivo completo en ambos.

## Verificación final de entrega (2026-10-14)

- `npm --prefix frontend test`: pasó, 2 archivos y 9 pruebas.
- `npm --prefix frontend run lint`: pasó.
- `npm --prefix frontend run build`: pasó; Vite mantiene el aviso de chunk JavaScript sobre 500 kB. Salida actual: JS 587.76 kB (175.89 kB gzip) y CSS 19.16 kB (4.72 kB gzip).
- `npm --prefix frontend test -- src/components/dashboard/dashboard-accessibility.test.tsx`: pasó, 1 archivo y 3 pruebas.
- Contraste estático aproximado de tokens OKLCH del tema oscuro convertidos a sRGB: texto principal/tarjeta 8.20:1, texto muted/tarjeta 4.86:1, primario/fondo 5.97:1; iconos decorativos de badges 3.78:1, 4.11:1 y 4.51:1; trazos de gráficos/tarjeta 4.21:1, 4.68:1 y 4.74:1. Esto no sustituye una medición del color renderizado en navegador.
- `python -m pytest backend/tests` en el Python global del host sigue bloqueado por ausencia de pytest. Un venv temporal fuera del repo, creado con `backend/requirements.txt`, pasó 15 pruebas en Python 3.14; Docker también pasó 15 pruebas con Python 3.13.16/pytest 9.1.1. Ambos ejecutaron con una `StarletteDeprecationWarning` sobre `httpx` con `starlette.testclient` y recomendación de `httpx2`; no se cambiaron dependencias del proyecto.
- Tras el refactor de estado derivado, `npm --prefix frontend test` pasó (2 archivos, 9 pruebas), lint pasó y build pasó. El bundle conserva el aviso: JS 587.76 kB (175.89 kB gzip), CSS 19.16 kB (4.72 kB gzip); no hay mejora de bundle medida.
- El usuario informa que las comprobaciones manuales de accesibilidad ya pasaron; no se repitieron independientemente en esta sesión. No se midieron Lighthouse, traza de red ni Core Web Vitals.
- El CLI `npx --no-install skills list --json` reconoce `accessibility`, `financial-dashboard`, `financial-dashboard-validation`, `vercel-react-best-practices` y `web-perf` con alcance de proyecto y agente GitHub Copilot.
- Esta actualización de memoria no modifica código de aplicación. El build genera archivos bajo `frontend/dist/`, ignorados por Git; no se hizo stage ni commit.

## Publicación de la entrega (2026-10-14)

- Tras autorización explícita, se separaron commits para el refactor Vercel, accesibilidad/localización, skills comunitarias con su lockfile y la skill interna. El refactor de Vercel en `App.tsx` se stageó como hunk independiente del resto de accesibilidad/localización.
- Commits de producto y skills: `54269f5` (`refactor(dashboard): derive metrics from movements`), `b79ce24` (`feat(accessibility): improve dashboard accessibility and localization`), `1a022c6` (`feat(skills): add community skills and lock metadata`) y `23cd8a6` (`feat(skills): add financial dashboard validation skill`). La actualización de este memory bank se prepara como commit separado.
- Checks posteriores al refactor: frontend tests (2 archivos, 9 pruebas), lint y build pasaron; Vite mantuvo el aviso de chunk JS de 587.76 kB (175.89 kB gzip). `git diff --check` pasó.
- Backend: un venv temporal fuera del repositorio con `backend/requirements.txt` pasó 15 pruebas; Docker con Python 3.13.16/pytest 9.1.1 también pasó 15. Ambos emitieron `StarletteDeprecationWarning` por `httpx` con `starlette.testclient` y recomendación de `httpx2`. El Python global del host sigue sin pytest; no se cambiaron dependencias del proyecto.
- El usuario confirma que las pruebas manuales de accesibilidad pasaron. Se registra como resultado informado por el usuario, no como ejecución independiente en esta sesión. No se midieron Core Web Vitals ni bundle antes/después.
