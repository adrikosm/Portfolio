# Epics and Sprints Plan

Date: February 20, 2026  
Repository: `/Users/andreasmavropoulos/Downloads/Personal Projects/Portfolio`

Assumptions (explicit):

- Deployment target is static hosting (likely GitHub Pages based on canonical URL in `public/index.html`).
- Team size is small (single maintainer or very small contributor set).
- Sprint cadence is 2 weeks.

## 1. Project Goals & Non-Goals

### Goals

- Modernize the portfolio front end incrementally without breaking current functionality.
- Improve visual consistency using shared tokens/patterns while preserving existing brand identity.
- Raise UX quality and accessibility baseline (keyboard, focus, semantics, feedback states).
- Reduce security and maintenance risk from legacy tooling.
- Establish enforceable quality gates (tests, lint, accessibility, performance checks, CI).

### Non-Goals

- No full redesign from scratch.
- No migration to a different product architecture (no SSR/Next.js rewrite at this stage).
- No backend platform rewrite; contact delivery remains endpoint-driven with safe fallback.
- No broad content rewrite that changes portfolio claims without evidence updates.

## 2. Current State Summary (Brief)

- React 18 single-page app with section-based architecture and anchor navigation (`src/App.jsx` + section components).
- Data model is centralized and strong (`src/data/profileData.js`) and should be retained.
- Existing build passes (`npm run build`), but test pipeline has no real tests (`npm run test:ci` passes with no tests).
- Security script exists but currently fails because of remote Google Fonts import in `src/index.css`.
- CRA (`react-scripts` 5.0.1) remains in use and carries significant transitive vulnerability/maintenance burden.
- UX strengths: full navigation coverage, modal semantics, contact fallback flow, and polished visual tone.

## 3. Target State (Vision)

An intentionally designed, high-trust portfolio with:

- A consistent design system (typography, spacing, color tokens, card/button/form primitives).
- Strong UX and accessibility defaults (clear hierarchy, keyboard-first interactions, robust feedback states).
- Leaner and faster front end (reduced bundle hotspots, controlled motion, optimized icon and asset usage).
- Modern toolchain with lower risk and better developer experience (Vite), introduced through staged migration.
- CI-backed quality gates that prevent regressions before deployment.

## 4. Final Decisions (Design + UX + Front-End Architecture)

### Keep As-Is Decisions

1. Keep the single-page narrative architecture and section order.
2. Keep `profileData.js` as the source of truth for portfolio content.
3. Keep dark/light thematic direction and current brand voice.
4. Keep contact form fallback behavior (`mailto`) when endpoint is unavailable.
5. Keep modal-driven project deep dive interaction pattern.

### Change Decisions

1. Standardize visual system via shared tokens and reusable primitives.
2. Implement accessibility baseline upgrades (skip-link, keyboard flow polish, form semantics, tooltip accessibility).
3. Remove remote font import and adopt self-hosted/local fonts.
4. Optimize performance hotspots (explicit icon imports, animation budget, lazy boundaries where safe).
5. Introduce real regression guardrails (unit/component tests + CI).
6. Migrate from CRA to Vite in staged phases after parity checks.

### Risk Controls and Rollback Decisions

1. Every risky UI refactor must include tests before/after and a scoped rollback commit path.
2. Toolchain migration must run in parallel branch phase; CRA remains fallback until cutover sign-off.
3. Rollout uses staged deployment with smoke tests and simple reversion path to previous build artifact.

## 5. Epics

### EPIC-01: Baseline Safeguards and Keep-As-Is Protection

Objective: protect current working behavior before major changes.

Scope:

- Baseline smoke tests for navigation, theme toggle, project modal, and contact flow.
- Snapshot of current visual behavior for parity checks.
- Document explicit keep-as-is constraints in code/docs.

Out-of-scope:

- Major visual redesign.
- Toolchain migration.

Acceptance criteria:

- Critical interaction tests exist and pass locally.
- Keep-as-is list is documented and referenced in PRs.
- No behavior regressions in key flows.

Risks:

- Baseline tests become brittle if over-specified.

Dependencies:

- Existing app structure in `src/*`.

### EPIC-02: UX and Accessibility Baseline

Objective: raise interaction clarity and accessibility without changing product scope.

Scope:

- Add skip-link and keyboard-first navigation improvements.
- Improve form semantics (`required`, `autocomplete`, `aria-invalid`, error association).
- Improve modal focus return behavior on close.
- Replace hover-only metric tooltip model with touch/keyboard-accessible disclosure.

Out-of-scope:

- New content sections.
- Full content rewrite.

Acceptance criteria:

- Keyboard-only navigation covers header/menu/modal/contact end-to-end.
- Accessibility checks pass for major sections.
- No loss of current visual quality.

Risks:

- Interaction changes may feel different to returning users.

Dependencies:

- EPIC-01 safety tests.

### EPIC-03: Design System Unification

Objective: improve consistency and maintainability of visual patterns.

Scope:

- Token normalization for spacing, typography scale, and card/form/button variants.
- Extract section shell and reusable UI primitives.
- Remove redundant per-component styling drift.

Out-of-scope:

- Rebranding or theme replacement.

Acceptance criteria:

- Shared primitives used across at least hero/projects/contact/experience sections.
- Reduced duplicated style rules and improved consistency in spacing/typography.
- Design retains existing portfolio identity.

Risks:

- Refactors can unintentionally alter layouts.

Dependencies:

- EPIC-01 regression safeguards.
- EPIC-02 accessibility requirements integrated into primitives.

### EPIC-04: Interaction Reliability and Content States

Objective: make UI states explicit and resilient.

Scope:

- Standardize loading/error/empty feedback patterns where relevant.
- Improve CTA clarity and interactive affordances.
- Ensure non-interactive cards no longer imply clickability.

Out-of-scope:

- Backend platform changes.

Acceptance criteria:

- Forms and modal states are consistently communicated.
- No misleading interactive affordances remain.

Risks:

- Over-standardization can reduce visual character.

Dependencies:

- EPIC-03 primitive system.

### EPIC-05: Performance and Bundle Efficiency

Objective: reduce rendering and bundle overhead with minimal behavior change.

Scope:

- Replace broad icon imports with explicit icon mapping.
- Audit/trim animation hot paths and respect reduced-motion in JS-driven flows.
- Set performance budgets and monitor bundle size deltas.

Out-of-scope:

- Feature removals that degrade portfolio narrative.

Acceptance criteria:

- Measurable bundle reduction vs current baseline.
- Smooth interactions on mobile and desktop.
- No functional regressions.

Risks:

- Icon mapping refactor can break render paths if incomplete.

Dependencies:

- EPIC-01 tests.
- EPIC-03 component refactor boundaries.

### EPIC-06: Quality Engineering and CI Gates

Objective: enforce build quality automatically.

Scope:

- Add lint script, unit/component tests, and accessibility checks.
- Add CI workflow for install/build/lint/test/security checks.
- Add quality gate documentation and failure policy.

Out-of-scope:

- Enterprise-scale release orchestration.

Acceptance criteria:

- PR pipeline runs deterministic checks.
- Failing checks block merge/deploy.
- QA checklist is tied to release process.

Risks:

- Initial CI setup may increase iteration time until tuned.

Dependencies:

- EPIC-01 test baseline.

### EPIC-07: Toolchain Modernization (CRA -> Vite)

Objective: reduce dependency risk and improve build/developer experience.

Scope:

- Create Vite branch path with parity checklist.
- Migrate scripts/config incrementally.
- Validate production parity and deployment behavior before cutover.

Out-of-scope:

- Simultaneous framework migration.

Acceptance criteria:

- Vite dev/build pass with UI parity.
- CRA fallback remains available until final cutover.
- Audit posture materially improved post-migration.

Risks:

- Build/deploy assumptions may change unexpectedly.

Dependencies:

- EPIC-06 CI gates.
- EPIC-01 regression tests.

## 6. Sprints

### Sprint 1 (Weeks 1-2): Stabilize Baseline and Security Alignment

Goals:

- Freeze current behavior with tests.
- Fix known security mismatch without visual churn.

Tasks:

1. Add baseline tests for theme toggle persistence, anchor navigation, modal open/close, and contact validation.
2. Remove remote Google Fonts import from `src/index.css` and move to self-hosted/local font strategy.
3. Add `npm run lint` script and baseline lint config usage.
4. Create lightweight parity checklist (desktop/mobile key flows).

Definition of done:

- `security:check` passes.
- New baseline tests execute in CI/local.
- No visual regressions in core flows.

QA checklist:

- Keyboard navigation from header to contact works.
- Modal opens/closes with keyboard and mouse.
- Contact form still supports endpoint + mailto fallback.
- Theme persists after reload.

Rollout plan:

- Merge in small PRs (security fix first, then tests/lint).
- Deploy after smoke test; rollback by reverting sprint commits.

### Sprint 2 (Weeks 3-4): Accessibility and UX Baseline

Goals:

- Close highest-impact accessibility and clarity gaps.

Tasks:

1. Add skip-link and confirm focus order across layout.
2. Improve mobile menu keyboard support and ESC handling.
3. Add form semantics (`required`, `autocomplete`, `aria-invalid`, error IDs).
4. Add focus return to modal trigger on close.
5. Replace hover-only impact tooltip with accessible disclosure pattern.

Definition of done:

- Keyboard-only user can complete full interaction path.
- Accessibility checks pass for header/projects/contact/impact sections.

QA checklist:

- Tab order is logical on desktop and mobile.
- Screen reader labels announce controls clearly.
- No pointer-only critical interaction.

Rollout plan:

- Release behind incremental component-level changes.
- If regressions occur, rollback only affected component changes.

### Sprint 3 (Weeks 5-6): Design System Consolidation

Goals:

- Improve consistency and reduce style duplication.

Tasks:

1. Introduce normalized typography and spacing token scales.
2. Extract shared primitives for section shell, cards, buttons, and form fields.
3. Refactor at least 4 sections to shared primitives while preserving current look.
4. Remove redundant CSS rules after parity validation.

Definition of done:

- Shared primitives are adopted and documented.
- Existing visual identity remains intact.

QA checklist:

- Compare before/after screenshots across breakpoints.
- Validate dark/light mode parity.
- Confirm no text truncation regressions in project cards.

Rollout plan:

- Section-by-section refactor; deploy after each validated section.
- Rollback by reverting the section currently being migrated.

### Sprint 4 (Weeks 7-8): Performance and Interaction Reliability

Goals:

- Reduce bundle/runtime cost and tighten state feedback behavior.

Tasks:

1. Replace `lucide-react` broad import pattern with explicit icon imports.
2. Profile and reduce unnecessary motion overhead (especially on low-power devices).
3. Ensure reduced-motion preference is respected in JS-driven animation flows.
4. Standardize loading/error/success patterns for interactive components.

Definition of done:

- Bundle size reduced from current baseline.
- No regression in icon rendering or key interactions.

QA checklist:

- Performance check on mobile viewport and desktop.
- Reduced-motion user preference tested.
- Contact and modal states remain clear and stable.

Rollout plan:

- Land icon optimization in isolated PR first.
- Rollback strategy: restore previous icon mapping commit if visual break appears.

### Sprint 5 (Weeks 9-10): CI and Quality Gate Enforcement

Goals:

- Make quality gates non-optional before release.

Tasks:

1. Add CI workflow for install, build, lint, tests, and security checks.
2. Add accessibility test command and include it in CI.
3. Add performance budget check (bundle size threshold + warning/fail policy).
4. Document release checklist and failure response path.

Definition of done:

- CI gates run on every PR.
- Quality gate failures block merge.

QA checklist:

- Simulate failure in each gate to ensure blocking behavior.
- Confirm deterministic CI results across re-runs.

Rollout plan:

- Enable CI in advisory mode for first week, then enforce blocking.
- Rollback: revert strict blocking rule if false positives are discovered.

### Sprint 6 (Weeks 11-12): Toolchain Migration and Cutover

Goals:

- Complete low-risk migration from CRA to Vite with rollback safety.

Tasks:

1. Create Vite setup in migration branch and port config/scripts incrementally.
2. Run parity checks against current production behavior.
3. Update deployment config and docs for Vite build output.
4. Keep CRA fallback branch/tag until post-release validation window closes.

Definition of done:

- Vite build and dev workflows are stable.
- Production parity validated.
- Deployment is successful with documented rollback.

QA checklist:

- Validate all section routes/anchors and modal/contact behavior.
- Compare performance and bundle metrics pre/post migration.
- Re-run full CI and security checks.

Rollout plan:

- Staged release (canary -> full).
- Rollback: redeploy last CRA artifact/tag immediately if parity issue appears.

## 7. Quality Gates

### Mandatory Gates (Post-Sprint 5)

1. Build and compile:
- `npm run build` must pass.

2. Security baseline:
- `npm run security:check` must pass.
- No remote font imports and no unsafe `_blank` links.

3. Lint/format:
- `npm run lint` must pass.
- Formatting check command added and enforced.

4. Tests:
- `npm run test:ci` must execute real tests (no longer “no tests found” baseline).
- Coverage threshold applied to critical paths (header, projects modal, contact flow).

5. Accessibility:
- Automated a11y check command required in CI.
- Manual keyboard-only smoke run required before release.

6. Performance:
- Bundle size tracked each PR; fail when threshold is exceeded without explicit approval.
- Reduced-motion behavior validated.

7. Release safety:
- Manual smoke checklist on desktop and mobile before production deploy.
- Rollback steps documented and tested at least once.

