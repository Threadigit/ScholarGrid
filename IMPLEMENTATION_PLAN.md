# ScholarGrid Implementation Plan

> **Audience:** This document is written to be executed by an engineering team working with Claude Code. Each phase is broken into numbered tasks with explicit acceptance criteria. Work through phases in order; within a phase, tasks marked `[parallel]` can be done concurrently.

---

## 1. Context

ScholarGrid (thescholargrid.com) is a predictive education intelligence platform. It ingests historical standardized exam data (WAEC, NECO, UTME, SAT to start), models individual student mastery in real time, and returns a calibrated probability of passing plus an adaptive study pathway.

Four products sit on one engine:

1. **Intelligence API** (EdTech ecosystem): REST API for learning events in, predictions out. **This is the core and is built first. Everything else is a client of it.**
2. **Mastery Copilot** (students): readiness score, topic-level mastery, adaptive pathway.
3. **Cohort Radar** (schools): live cohort dashboards, early warning flags, intervention tracking.
4. **Foresight Terminal** (governments): national/regional pass rate forecasting, curriculum gap analysis. Out of scope for v1; the data model must not preclude it.

### Strategic decisions (locked)

| Decision | Choice | Rationale |
|---|---|---|
| Build order | API-first. The Intelligence API is the product; first-party apps consume it through the same public interface. | Forces a clean contract, dogfoods the API, makes EdTech partners first-class. |
| Prediction engine at launch | Statistical baseline: Bayesian Knowledge Tracing (BKT) for topic mastery + logistic calibration (Platt scaling) for pass probability. No deep ML until real usage data accumulates. | Works with sparse data, explainable, cheap, honest. ML upgrade path is Phase 7. |
| Backend | Python 3.12, FastAPI, SQLAlchemy 2.x, Pydantic v2 | Modeling and serving in one language; team preference. |
| Database | PostgreSQL 16 (+ TimescaleDB extension for event/timeseries tables) | Relational core, time-series events, one operational store. |
| Cache / queue | Redis (cache, rate limiting) + Celery or Arq (async jobs: recompute, batch scoring) | Simple, well-understood. |
| Frontend (Phases 5–6) | Next.js + TypeScript, consuming the public API | Keep the marketing site's stack family; SSR for dashboards. |
| Infra | Docker, docker-compose for dev; deploy target Fly.io / Render / AWS ECS (team picks one in P0.6) | Containers from day one. |
| Auth | API keys (hashed) for the public API; OAuth2/OIDC + JWT for first-party apps | Matches the "get your keys" sandbox flow advertised on the site. |

### The published API contract (must be honored)

The marketing site already advertises this response shape for `POST /v1/predictions`:

```json
{
  "student_id": "stu_8h2k4",
  "exam": "WAEC",
  "pass_probability": 0.87,
  "mastery_index": 74.2,
  "focus_topics": ["probability", "vectors"]
}
```

Treat this as a contractual constraint: prefixed IDs (`stu_`), exam as enum string, probability as 0–1 float, mastery index as 0–100 float, focus topics as topic slugs.

---

## 2. System architecture

```
                        ┌─────────────────────────────┐
  EdTech partners ────► │                             │
  Mastery Copilot ────► │   API Gateway (FastAPI)     │ ──► Postgres (core)
  Cohort Radar    ────► │   /v1/* public REST         │ ──► Timescale (events)
                        │                             │ ──► Redis (cache/ratelimit)
                        └──────────┬──────────────────┘
                                   │ internal calls / queue
                        ┌──────────▼──────────────────┐
                        │  Mastery Engine (Python pkg) │
                        │  - BKT per (student, topic)  │
                        │  - Mastery Index aggregation │
                        │  - Pass probability calib.   │
                        │  - Pathway recommender       │
                        └──────────┬──────────────────┘
                                   │ batch
                        ┌──────────▼──────────────────┐
                        │  Jobs (Celery/Arq workers)   │
                        │  - event ingestion fan-out   │
                        │  - nightly recalibration     │
                        │  - cohort aggregates         │
                        └─────────────────────────────┘
```

Monorepo layout:

```
scholargrid/
├── apps/
│   ├── api/                 # FastAPI service (public /v1 + internal routes)
│   ├── worker/              # Celery/Arq workers
│   ├── copilot-web/         # Phase 5: Next.js student app
│   └── radar-web/           # Phase 6: Next.js schools app
├── packages/
│   ├── engine/              # mastery + prediction models (pure Python, no IO)
│   ├── db/                  # SQLAlchemy models, Alembic migrations
│   └── sdk-python/          # generated/hand-written client SDK
├── data/
│   ├── syllabi/             # versioned exam syllabus/topic taxonomies (YAML)
│   └── seeds/               # seed + synthetic data generators
├── infra/                   # docker, compose, IaC, CI
└── docs/                    # OpenAPI artifacts, ADRs, runbooks
```

Rules for Claude Code throughout:

- `packages/engine` must stay pure: deterministic functions, no DB or network access, fully unit-testable.
- Every endpoint gets a Pydantic request/response model; the OpenAPI spec is generated, committed to `docs/openapi.json`, and treated as a reviewable artifact.
- Every phase ends green: `ruff`, `mypy --strict` on `packages/*`, `pytest` all passing in CI before the phase is "done".
- All public IDs are prefixed ULIDs: `stu_`, `sch_`, `evt_`, `key_`, `coh_`, `pred_`.
- Money/PII rules in §9 apply from the first migration, not retrofitted.

---

## 3. Phase 0 — Foundations (Week 1–2)

**Goal:** a running skeleton: API container answering `/healthz`, Postgres with migrations, CI, auth scaffolding.

| # | Task | Acceptance criteria |
|---|---|---|
| P0.1 | Scaffold monorepo per layout above. `uv` or Poetry workspace for Python packages, pnpm workspace reserved for apps. | `docker compose up` starts api + postgres + redis; `GET /healthz` returns 200 with git SHA. |
| P0.2 | Set up Alembic in `packages/db` with a baseline empty migration. | `alembic upgrade head` runs in compose and CI. |
| P0.3 | CI pipeline (GitHub Actions): lint (ruff), typecheck (mypy), test (pytest), build images. | Pipeline green on main; failing test blocks merge. |
| P0.4 | API key auth middleware: keys stored as SHA-256 hashes, `Authorization: Bearer sg_live_...` / `sg_test_...` prefixes, key scopes (`predict`, `ingest`, `admin`). | Unit tests: valid key passes, revoked key 401, wrong scope 403. Sandbox vs live keys route to flagged data partitions. |
| P0.5 | Rate limiting via Redis (per-key sliding window, default 60 rpm, configurable per key). | 429 with `Retry-After` header when exceeded; covered by tests. |
| P0.6 | Pick and provision deploy target (team decision: Fly.io / Render / ECS). Staging environment auto-deploys from main. | Staging URL serves `/healthz`; deploy documented in `docs/runbooks/deploy.md`. |
| P0.7 | Error/response conventions: RFC 9457 problem+json errors, request IDs, structured JSON logging. | Error envelope documented; every 4xx/5xx carries `request_id`. |

---

## 4. Phase 1 — Domain core: exams, topics, students, events (Week 2–4)

**Goal:** the canonical data model. Nothing predictive yet; everything ingestible.

### 4.1 Data model (initial migrations)

```
exams            id, code (WAEC|NECO|UTME|SAT), name, pass_mark, grading_scale jsonb
subjects         id, exam_id, code, name                       e.g. WAEC Mathematics
topics           id, subject_id, slug, name, parent_id,        topic taxonomy, tree
                 syllabus_version
organizations    id (sch_/org_), type (school|edtech|ministry), name, country
students         id (stu_),name, org_id nullable, external_ref,     PII minimized: no name
                 exam_id, exam_sitting_date, created_at        required at this layer
api_keys         id (key_), org_id, hash, scopes[], env, revoked_at
learning_events  id (evt_), student_id, topic_id, kind         TimescaleDB hypertable
                 (question_attempt|lesson_complete|mock_exam|diagnostic),
                 correct bool null, score numeric null, duration_ms,
                 occurred_at, payload jsonb
```

### 4.2 Tasks

| # | Task | Acceptance criteria |
|---|---|---|
| P1.1 | Migrations + SQLAlchemy models for the tables above. Topic tree supports arbitrary depth. | Migrations apply cleanly; model round-trip tests pass. |
| P1.2 | Syllabus pipeline: author WAEC Mathematics + English topic taxonomies as YAML in `data/syllabi/`, with a loader CLI (`sg syllabus load waec-math-2026.yaml`). Source topics from the official WAEC syllabus. | Two subjects loaded with ≥30 topics each; loader is idempotent and versioned (re-running updates, never duplicates). |
| P1.3 | `POST /v1/students` and `GET /v1/students/{id}`: register a learner against an exam + sitting date. Org-scoped: a key only sees its own students. | Cross-tenant access returns 404 (not 403, no existence leak). Contract tests pass. |
| P1.4 | `POST /v1/events` (single + batch up to 500): ingest learning events. Validates topic slugs against the taxonomy, rejects unknown ones with a precise error. | p95 ingest latency < 150 ms for batch of 100 in staging; idempotency via client-supplied `event_id`. |
| P1.5 | [parallel] Synthetic data generator in `data/seeds/`: simulate N students with configurable ability levels producing realistic event streams (correctness drawn from per-topic ability). | `sg seed --students 1000` produces a dataset the engine team can develop against; documented assumptions. |
| P1.6 | [parallel] ADR-001: data sovereignty + PII policy (see §9). | ADR merged; reviewed by whoever owns legal/compliance. |

---

## 5. Phase 2 — Mastery engine (Week 4–7)

**Goal:** `packages/engine` turns event streams into topic-level mastery and a 0–100 Mastery Index. This is the heart of the company; it gets the most test coverage.

### 5.1 Model spec

- **Per (student, topic) mastery:** Bayesian Knowledge Tracing with four parameters: `p_init` (prior), `p_learn` (transit), `p_slip`, `p_guess`. Start with literature defaults per topic difficulty tier; store parameters per topic so they can be fit later.
- **Update rule:** standard BKT posterior update on each `question_attempt`; `lesson_complete` applies a bounded learn-rate bump; `mock_exam` events update all covered topics at once with higher evidence weight.
- **Decay:** exponential forgetting on `p_mastery` as a function of days since last interaction with the topic (configurable half-life, default 30 days). This is what makes the "readiness drops if you stop studying" behavior real.
- **Mastery Index (0–100):** syllabus-weighted average of topic mastery for the student's exam subjects, weights from historical topic frequency in the exam (start with uniform weights + a weights file per syllabus version).
- **Mastery states for UI:** `mastered` (≥0.85), `focus` (highest expected score gain), `queued`, matching the site's pathway language.

### 5.2 Tasks

| # | Task | Acceptance criteria |
|---|---|---|
| P2.1 | Implement BKT core in `packages/engine/bkt.py` as pure functions: `update(state, observation) -> state`, `decay(state, days) -> state`. | Property-based tests (hypothesis): probabilities always in [0,1]; correct answers never decrease mastery; mastery converges to ≥0.95 after 20 consecutive correct on default params. |
| P2.2 | Mastery Index aggregation with per-syllabus weight files. | Deterministic: same events in, same index out. Unit tests with hand-computed fixtures. |
| P2.3 | Persistence layer: `mastery_states` table (student_id, topic_id, p_mastery, evidence_count, updated_at) updated transactionally on event ingest via worker. | Replaying the full event log reproduces identical states (event-sourced rebuild command: `sg engine rebuild --student stu_x`). |
| P2.4 | Incremental vs batch paths: synchronous update on single-event ingest; queued batch job for bulk/backfill. | Batch of 100k synthetic events processes in < 5 min on dev hardware. |
| P2.5 | Diagnostic flow support: short adaptive diagnostic (pick next topic by max information gain over the taxonomy) to establish baseline, per the "establish your baseline" step on the site. | `POST /v1/diagnostics/start`, `POST /v1/diagnostics/{id}/answer`, terminates in ≤ 25 questions with a full prior over topics. |
| P2.6 | Engine evaluation harness: run engine against synthetic cohorts with known ground-truth abilities, report calibration plots + AUC to `docs/engine-reports/`. | AUC ≥ 0.80 on synthetic recovery task; harness runs in CI weekly. |

---

## 6. Phase 3 — Prediction service (Week 7–9)

**Goal:** the advertised endpoint, real and calibrated.

### 6.1 Model spec

- **Pass probability:** logistic function over features: Mastery Index, per-subject mastery, days until exam sitting, evidence volume (how much we actually know about this student), and historical pass-mark distributions per exam.
- **Calibration:** Platt scaling against whatever outcome data exists (historical datasets when acquired, synthetic until then). Calibration parameters versioned per exam in a `model_versions` table; every prediction records which model version produced it.
- **Uncertainty honesty:** with low evidence_count, widen and report a `confidence` band. Never show "87%" off five questions. This is an explicit product ethic.
- **Focus topics:** rank topics by expected Mastery Index gain per study hour (gap × syllabus weight × learnability), return top N slugs.

### 6.2 Tasks

| # | Task | Acceptance criteria |
|---|---|---|
| P3.1 | `POST /v1/predictions` implementing the published contract exactly (§1), plus additive fields: `confidence_band`, `model_version`, `subject_breakdown`, `computed_at`. | Contract test pins the advertised shape; additive fields don't break it. p95 < 200 ms (reads from materialized mastery, no recompute on request). |
| P3.2 | Prediction persistence: every served prediction stored (`predictions` table) for later calibration against real outcomes. | Row written per call; backfillable to evaluation harness. |
| P3.3 | `GET /v1/students/{id}/pathway`: ordered focus topics with status (`mastered`/`focus_next`/`queued`), matching Mastery Copilot UI semantics. | Pathway reorders when new events arrive; integration test simulates a study session and asserts reordering. |
| P3.4 | Recalibration job: nightly batch refits Platt parameters per exam when ≥ threshold of outcome data exists; otherwise logs skip. | Job idempotent; model_version bumps recorded; rollback documented. |
| P3.5 | Outcome ingestion: `POST /v1/outcomes` (actual exam results per student) to close the loop. This is the most valuable data the company will own. | Validated against exam grading scales; feeds the recalibration job. |
| P3.6 | [parallel] Acquire/negotiate historical exam datasets (WAEC chief examiner reports, published pass-rate statistics). Engineering task: build importers for whatever formats arrive (CSV/PDF tables). | At least published national pass-rate aggregates per subject/year imported into `historical_aggregates`; importer tested. |

---

## 7. Phase 4 — Public Intelligence API launch (Week 9–12)

**Goal:** what the site promises EdTech partners: keys, sandbox, docs, reliability.

| # | Task | Acceptance criteria |
|---|---|---|
| P4.1 | Developer portal (minimal): self-serve sandbox key issuance behind waitlist approval, key management UI (create/rotate/revoke). Can be a thin Next.js page or even an admin-issued flow at first. | A waitlist-approved partner gets a `sg_test_` key and reaches a working sandbox without human help. |
| P4.2 | Sandbox environment: `sg_test_` keys hit isolated data; seeded demo students available so partners get meaningful responses immediately. | Documented demo student IDs return stable, realistic predictions. |
| P4.3 | API docs: published reference generated from OpenAPI + handwritten quickstart ("send events → get predictions" in < 10 min). Host at `docs.thescholargrid.com` or `/docs`. | A new engineer follows the quickstart cold and gets a prediction in under 10 minutes (test this literally). |
| P4.4 | Python + TypeScript SDKs (thin, generated from OpenAPI is fine). | `pip install scholargrid` / `npm i @scholargrid/sdk` against staging works end to end. |
| P4.5 | Webhooks: `prediction.updated`, `student.at_risk` events with HMAC signatures and retry/backoff. | Signature verification documented; redelivery on 5xx with exponential backoff; dead-letter after N attempts. |
| P4.6 | Usage metering per key (requests, events ingested, predictions served) for future billing. | Daily usage rollups queryable per org; no billing integration yet. |
| P4.7 | Observability: tracing (OpenTelemetry), dashboards (latency, error rate, ingest lag), alerts on SLO breach. SLOs: 99.5% availability, p95 read < 300 ms. | Dashboards exist; one synthetic-monitor alert wired to the team channel. |
| P4.8 | Load test: 200 rps mixed read/ingest sustained 10 min on staging. | No errors above 0.1%, p95 within SLO; report committed to `docs/loadtests/`. |
| P4.9 | Security pass: dependency audit, secrets scanning in CI, pen-test checklist (OWASP API Top 10), key hashing review. | Checklist completed in `docs/security/`; criticals fixed. |

**Milestone: Intelligence API v1 GA to waitlist partners.**

---

## 8. Phases 5–6 — First-party apps on the API

### Phase 5 — Mastery Copilot (students) (Week 12–17)

Next.js app consuming only public API endpoints (plus first-party auth).

| # | Task | Acceptance criteria |
|---|---|---|
| P5.1 | Student auth: email/phone OTP signup (phone matters for the Nigerian market), org-less individual students supported. | Signup → diagnostic → readiness report flow works on mobile viewport. |
| P5.2 | Onboarding: choose exam (WAEC/NECO/UTME/SAT) + sitting date → diagnostic (P2.5). | Mirrors the site's three-step "how it works". |
| P5.3 | Readiness report screen: pass probability, per-subject scores, confidence band, exactly the card shown on the marketing site. | Live: answering practice questions visibly moves the number. |
| P5.4 | Adaptive pathway screen: mastered / focus next / queued topics from P3.3. | Pathway updates after each study session without refresh (poll or SSE). |
| P5.5 | Practice/question delivery: question bank tables + delivery endpoint. Content sourcing (past questions licensing or authored) is a parallel non-engineering track; engineering ships the schema, import CLI, and delivery API. | 200+ imported questions across 2 subjects for beta; per-question topic tagging validated against taxonomy. |
| P5.6 | Offline/low-bandwidth posture: aggressive caching, < 200 KB initial JS on the practice flow, works on 3G. | Lighthouse performance ≥ 80 on simulated 3G mid-tier device. |
| P5.7 | Beta launch to waitlist students. | 100 real students through diagnostic; funnel instrumented (signup → diagnostic complete → 7-day retention). |

### Phase 6 — Cohort Radar (schools) (Week 17–22)

| # | Task | Acceptance criteria |
|---|---|---|
| P6.1 | School onboarding: org accounts, CSV roster import (class/stream/year-group structure), student linking/claiming. | A school admin imports 500 students in one flow with row-level error reporting. |
| P6.2 | Cohort aggregates job: nightly + on-demand readiness rollups per class/stream/year vs historical benchmarks. | Materialized `cohort_snapshots`; dashboard reads never scan raw events. |
| P6.3 | Radar dashboard: on-track / watch / at-risk segmentation (thresholds configurable), per the site's UI. | Drill-down from cohort → class → student readiness profile. |
| P6.4 | Early warning: `student.at_risk` webhook + in-app flags when a student drops below the mastery curve trajectory needed for their sitting date. | Flag fires in a simulated scenario weeks before projected failure; no flag flapping (hysteresis built in). |
| P6.5 | Intervention tracking: record interventions, annotate the readiness timeline, show recovery. | Intervention markers visible on student/cohort charts. |
| P6.6 | RBAC: school admin / teacher / counselor roles; teachers see only their classes. | Permission matrix tested. |

**Foresight Terminal (governments) is Phase 8+, deliberately deferred:** it needs ministry data partnerships and real longitudinal data. The only Phase 1–6 obligation is that `historical_aggregates`, `cohort_snapshots`, and `outcomes` are designed region-aware (state/LGA columns nullable from day one).

---

## 9. Cross-cutting: data ethics, privacy, compliance (continuous)

The site leads with "Ethical Data Sovereignty." Make it true in the schema:

- **Data minimization:** the prediction layer needs no names. Names/contact live only in the auth/profile service tables, separable from learning data. EdTech partners send opaque `external_ref`, never PII.
- **Minors:** most users are under 18. Consent flows must support guardian/school consent; document the lawful basis per market. Nigeria: NDPR/NDPA compliance; data residency question (Nigerian hosting or contractual safeguards) resolved in ADR-001 before GA.
- **No gatekeeping:** predictions are formative, for the student/school. Terms must prohibit partner use of pass probabilities for admissions screening or student selection. Product enforces framing: always serve `focus_topics` alongside probability; never expose a raw ranked list of students by probability through partner-facing endpoints (school dashboards segment, they don't rank-order publicly).
- **Explainability:** every prediction can answer "why": top contributing topic gaps via `GET /v1/predictions/{id}/explanation`.
- **Retention & deletion:** student deletion endpoint that cascades through events/mastery/predictions within 30 days; tested, not aspirational.
- **Audit:** admin/key actions append-only audit log.

---

## 10. Phase 7+ — Model evolution (post-GA, data-dependent)

Not scheduled; triggered by data volume thresholds.

1. Fit BKT parameters per topic from real event data (EM fitting) once ≥ 50k attempts/topic-tier.
2. IRT (2PL) item calibration on the question bank once items have ≥ 1k responses.
3. Gradient-boosted or deep knowledge tracing models, shadow-deployed behind the same `model_versions` interface, promoted only when they beat BKT on held-out calibration + AUC.
4. Foresight Terminal forecasting models (hierarchical timeseries on cohort outcomes) once two exam cycles of outcome data exist.

The `model_versions` + stored-predictions design from Phase 3 is what makes all of this swappable without API changes.

---

## 11. Sequencing summary & team shape

```
Wk  1–2   P0 Foundations
Wk  2–4   P1 Domain core + syllabi + ingestion
Wk  4–7   P2 Mastery engine (BKT, diagnostics, eval harness)
Wk  7–9   P3 Predictions + pathways + outcomes loop
Wk  9–12  P4 Public API GA (keys, sandbox, docs, SDKs, SLOs)
Wk 12–17  P5 Mastery Copilot beta
Wk 17–22  P6 Cohort Radar beta
Continuous: §9 privacy/ethics, content sourcing, data partnerships
```

Workable with 3–5 engineers: 2 backend/platform, 1 modeling-leaning backend, 1–2 product/frontend from Phase 4 onward. The critical path is P1 → P2 → P3; frontend hiring can lag until Week 9.

### Top risks

1. **Historical data may not exist in usable form.** Mitigated: the engine launches on BKT + live events; historical data improves calibration but is not a launch dependency (P3.6 treats it as enhancement, not blocker).
2. **Question content licensing** (past questions are copyrighted by exam bodies). Start licensing conversations in Phase 1; schema supports authored content as fallback.
3. **Overpromising precision.** The site says "precise probability." Confidence bands (P3 model spec) and evidence thresholds are non-negotiable; shipping fake precision is an existential trust risk for an exam product.
4. **Low-bandwidth market reality.** P5.6 performance budget is a launch gate, not a nice-to-have.

---

## 12. How to work this plan with Claude Code

- Feed this document in as the root spec. Ask Claude Code to start with: "Implement Phase 0 per scholargrid-implementation-plan.md, task P0.1."
- One task = one PR. Acceptance criteria in the tables are the PR's definition of done; include the task ID (e.g. `P2.1`) in the PR title.
- When a task's criteria are ambiguous in context, write/update an ADR in `docs/adrs/` rather than guessing silently.
- Keep `docs/openapi.json` regenerated in every API-touching PR; contract tests in `apps/api/tests/contract/` pin the published prediction shape from §1.
- Do not let Claude Code skip the eval harness (P2.6) or the contract tests; they are the guardrails for everything that follows.
