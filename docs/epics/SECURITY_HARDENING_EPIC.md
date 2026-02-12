# Epic: Portfolio Security Hardening

## Epic ID

`EPIC-SEC-001`

## Created

February 12, 2026

## Context

A security review found:

- Toolchain vulnerabilities in the `react-scripts` dependency chain.
- Missing browser hardening policy layer (CSP and related headers).
- Privacy leakage from externally hosted fonts.
- A risky parent-relative stylesheet link in the HTML template.
- No automated security regression checks in test/CI.

## Goal

Reduce practical security risk in production and development by introducing layered hardening, automated checks, and a migration path away from legacy tooling.

## Non-Goals

- Full redesign of the UI.
- Immediate one-shot migration of the entire frontend stack in this sprint.
- Backend/API security (no backend exists in this repo).

## Success Metrics

- No parent-relative stylesheet references in production HTML.
- No remote font fetches on first page load.
- Baseline browser security policy present and documented.
- Security checks runnable locally via npm scripts.
- Migration plan and acceptance criteria for replacing `react-scripts`.

## Workstreams

### WS1: Immediate Hardening (completed in this pass)

1. Remove parent-relative CSS include from `public/index.html`.
2. Add baseline CSP and security meta policies in `public/index.html`.
3. Remove external Google Fonts import from `src/index.css` and use local/system fallbacks.

### WS2: Security Regression Guardrails (in progress)

1. Add script/check that verifies:
   - No `target="_blank"` without `rel="noopener noreferrer"`.
   - No parent-relative stylesheet links in `public/index.html`.
   - No external font imports from Google in `src/index.css`.
2. Expose these checks as npm scripts for local and CI usage.

### WS3: Dependency Risk Reduction

Baseline on February 12, 2026 (`npm audit --omit=dev --audit-level=high`):

- 47 total vulnerabilities (4 critical, 26 high, 11 moderate, 6 low)

1. Isolate known vulnerable transitive dependencies currently brought by CRA.
2. Define migration path to a maintained build system (recommended: Vite).
3. Execute migration in controlled phases with parity checks.

### WS4: Policy and Deployment Hardening

1. Define production headers (CSP, HSTS, Referrer-Policy, X-Content-Type-Options, Permissions-Policy).
2. Add deployment notes for Netlify/Vercel/Nginx/Cloudflare equivalents.

## Milestones

### M1: Quick Wins (this implementation pass)

- [x] Epic documented
- [x] HTML/CSS hardening completed
- [x] Security check scripts added
- [x] Build/tests green

### M2: Guardrails and CI

- [ ] Security checks integrated into CI pipeline
- [x] Developer workflow documented in README

### M3: Toolchain Migration

- [ ] CRA decommission plan approved
- [ ] Vite-based build introduced
- [ ] Audit severity reduced to accepted threshold

## Risks and Mitigations

- Risk: CSP blocks legitimate runtime behaviors.
  - Mitigation: start with a conservative policy, verify build/runtime, then tighten.
- Risk: migration introduces regressions.
  - Mitigation: add smoke tests and run visual/manual parity checklist before cutover.
- Risk: `npm audit` remains noisy until migration.
  - Mitigation: track accepted temporary risk explicitly and prioritize M3.

## Acceptance Criteria

1. `npm run build` succeeds after hardening changes.
2. `npm run security:check` exists and passes.
3. No remote font imports remain in app CSS.
4. Security policy baseline exists in app template and deployment notes.
5. Next migration tasks are documented with clear done criteria.

## Implementation Notes

The first pass focuses on reducing preventable issues immediately while preserving current behavior. Toolchain migration is tracked as a dedicated follow-up milestone because most high/critical advisories are transitive from `react-scripts`.
