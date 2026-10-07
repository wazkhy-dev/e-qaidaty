# Implementation Plan

- [ ] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - undefined `.map()` crash in LessonDetailView
  - **CRITICAL**: This test MUST FAIL on unfixed code — failure confirms the bugs exist
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior — it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate both `.map()` crashes
  - **Scoped PBT Approach**: Scope the property to the two concrete failing cases:
    1. A lesson whose `baharRojaz` uses the `poem` key (Bab 05 / Bab 06) — reading `.indonesianPoem` crashes
    2. A lesson where `exercises` is `undefined` — calling `.map()` on it crashes
  - Bug Condition 1 (isBugCondition): `lesson.baharRojaz !== undefined && lesson.baharRojaz.indonesianPoem === undefined`  
    Expected: `.map()` over poem lines succeeds; actual (unfixed): `TypeError: Cannot read properties of undefined (reading 'map')`
  - Bug Condition 2 (isBugCondition): `lesson.exercises === undefined || lesson.exercises === null`  
    Expected: renders empty-state message; actual (unfixed): `TypeError: Cannot read properties of undefined (reading 'map')`
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct — it proves both bugs exist)
  - Document counterexamples found (e.g., "Bab 05 crashes on render; all Bab crash on Latihan Mandiri tab")
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 1.2_

- [ ] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Non-affected lessons render without crash
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for non-buggy inputs:
    - Lessons with no `baharRojaz` field: render normally (no poem section shown)
    - Lessons where `baharRojaz.poem` is defined: poem lines render correctly
    - Lessons where `exercises` is a populated array: exercises render correctly
  - Write property-based tests asserting that for all lessons satisfying `¬C(X)`:
    1. Lesson with `baharRojaz.poem` defined → all poem lines render without crash
    2. Lesson with `exercises` populated → all exercise items render without crash
    3. Lesson with no `baharRojaz` → component renders without crash (section hidden)
  - Verify tests PASS on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2_

- [ ] 3. Fix for undefined `.map()` crash in LessonDetailView

  - [ ] 3.1 Implement Fix 1 — baharRojaz poem key mismatch
    - In `LessonDetailView.tsx`, replace `lesson.baharRojaz.indonesianPoem.map(...)` with  
      `(lesson.baharRojaz.poem ?? lesson.baharRojaz.indonesianPoem ?? []).map(...)`
    - Resolves crash for Bab 05 and Bab 06 whose data uses the `poem` key
    - _Bug_Condition: `lesson.baharRojaz !== undefined && lesson.baharRojaz.indonesianPoem === undefined` (isBugCondition)_
    - _Expected_Behavior: poem lines render correctly regardless of which key (`poem` or `indonesianPoem`) the data uses_
    - _Preservation: Lessons already using `indonesianPoem` key continue to render correctly_
    - _Requirements: 1.1, 2.1, 3.1_

  - [ ] 3.2 Implement Fix 2 — exercises null guard
    - In `LessonDetailView.tsx`, wrap `lesson.exercises.map(...)` in a null/length check:  
      `lesson.exercises && lesson.exercises.length > 0 ? lesson.exercises.map(...) : <empty state>`
    - Empty state message: "Belum ada latihan untuk bab ini."
    - Resolves crash for all Bab when the "Latihan Mandiri" tab is opened
    - _Bug_Condition: `lesson.exercises === undefined || lesson.exercises.length === 0` (isBugCondition)_
    - _Expected_Behavior: renders empty-state message instead of crashing_
    - _Preservation: Lessons with exercises defined still render all exercise items correctly_
    - _Requirements: 1.2, 2.2, 3.2_

  - [ ] 3.3 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - undefined `.map()` crash in LessonDetailView
    - **IMPORTANT**: Re-run the SAME test from task 1 — do NOT write a new test
    - The test from task 1 encodes the expected behavior
    - When this test passes, it confirms the expected behavior is satisfied for both fixes
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms both bugs are fixed)
    - _Requirements: 2.1, 2.2_

  - [ ] 3.4 Verify preservation tests still pass
    - **Property 2: Preservation** - Non-affected lessons render without crash
    - **IMPORTANT**: Re-run the SAME tests from task 2 — do NOT write new tests
    - Run preservation property tests from step 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm all tests still pass after fix (no regressions introduced)

- [ ] 4. Checkpoint — Ensure all tests pass
  - Run TypeScript typecheck (`tsc --noEmit`) — must complete with no errors
  - Run Vite production build (`vite build`) — must complete without errors
  - Ensure all property-based tests pass
  - Ask the user if any questions arise
