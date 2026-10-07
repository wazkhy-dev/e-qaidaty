# Bab Map Undefined Crash — Bugfix Design

## Overview

The e-Qaidaty application crashes with `TypeError: Cannot read properties of undefined (reading 'map')` in two distinct spots inside `LessonDetailView.tsx`:

1. **Poem key mismatch**: The component reads `lesson.baharRojaz.indonesianPoem` but the data stores the array under `lesson.baharRojaz.poem`. This crashes Bab 05 and Bab 06 immediately on open.
2. **Unguarded optional field**: The component calls `lesson.exercises.map(...)` directly. `exercises` is typed as `string[] | undefined` and is absent from all 23 Bab, so clicking "Latihan Mandiri" on any chapter crashes the app.

The fix is minimal and surgical: correct the key access in the Bahar Rojaz renderer and add a null/empty guard around the exercises renderer with an appropriate empty-state message. No data changes, no UI redesign, no tab restructuring.

---

## Glossary

- **Bug_Condition (C)**: The runtime condition that causes `undefined.map()` to be called — either `lesson.baharRojaz.indonesianPoem` being `undefined` (when `poem` is the actual key), or `lesson.exercises` being `undefined`.
- **Property (P)**: The desired behavior — the component renders without crashing, using the correct data field or showing a graceful empty state.
- **Preservation**: All existing tab rendering (Kaidah, Tabel, Contoh) and all Bab that did not exhibit the crash must continue to function identically.
- **LessonDetailView**: The component in `src/components/LessonDetailView.tsx` that renders an individual Bab with sub-tabs.
- **baharRojaz**: An optional object on the `Lesson` type that holds Arabic poem data. The `poem` key holds the Indonesian translation lines; `indonesianPoem` is an alternate key name defined in the type but never populated in the data.
- **exercises**: An optional `string[]` field on the `Lesson` type. Present in the type definition and interface, but not populated for any of the 23 Bab in `qaidatyKnowledge.ts`.

---

## Bug Details

### Bug Condition

The crash manifests in two independent code paths within `LessonDetailView.tsx`. In both cases, `.map()` is called on a value that is `undefined` at runtime.

**Formal Specification — Poem Crash:**
```
FUNCTION isBugCondition_poem(lesson)
  INPUT: lesson of type Lesson
  OUTPUT: boolean

  RETURN lesson.baharRojaz IS NOT undefined
         AND lesson.baharRojaz.poem IS undefined        // actual data key missing
         AND lesson.baharRojaz.indonesianPoem IS undefined // fallback also missing
END FUNCTION
```

**Formal Specification — Exercises Crash:**
```
FUNCTION isBugCondition_exercises(lesson)
  INPUT: lesson of type Lesson
  OUTPUT: boolean

  RETURN lesson.exercises IS undefined OR lesson.exercises IS null
END FUNCTION
```

### Examples

- **Bab 05 (Tanda-Tanda Kalimah Isim)**: Has `baharRojaz` with `poem: [...]` key. Component reads `baharRojaz.indonesianPoem` → `undefined` → `.map()` → **crash on open**.
- **Bab 06 (Kalimah Fi'il)**: Same structure as Bab 05 — `baharRojaz.poem` is set, `baharRojaz.indonesianPoem` is not → **crash on open**.
- **Any Bab — Latihan Mandiri tab**: No Bab defines `exercises`. Component reads `lesson.exercises.map(...)` → `undefined.map()` → **crash on tab click**.
- **Bab 01 — Latihan Mandiri tab**: `exercises` is absent → same crash. After fix: renders "Belum ada latihan untuk bab ini." gracefully.

---

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- "Kaidah & Rumus" tab renders `lesson.rules` for all 23 Bab — this field is always present and non-empty.
- "Contoh & Bedah" tab renders `lesson.examples` for all 23 Bab — this field is always present and non-empty.
- "Tabel Wazan" tab is already guarded by `lesson.wazanTable && lesson.wazanTable.length > 0` — this must remain unchanged.
- Bab 01–04 and Bab 07–23 (no `baharRojaz`) must continue to open without any crash or visual change.
- Navigation between Bab via prev/next buttons must continue to work.
- The Bahar Rojaz audio player (reads `lesson.baharRojaz.arabicPoem`) is unaffected by this fix.

**Scope:**
All Bab that do not trigger `isBugCondition_poem` or `isBugCondition_exercises` must render identically to their pre-fix state. The fix touches only the two `.map()` call sites and adds no new state, no new props, and no new API calls.

---

## Hypothesized Root Cause

1. **Stale field name in component**: The `Lesson` TypeScript interface defines `baharRojaz.indonesianPoem?: string[]` as an optional alias alongside `poem?: string[]`. The data was written using only `poem`. The component was written (or a later edit changed it) referencing `indonesianPoem`, creating a permanent mismatch that TypeScript did not catch because both keys are marked optional in the interface.

2. **Optional field accessed without guard**: The `exercises` field was added to the `Lesson` interface as optional (`exercises?: string[]`) with the intention of populating it later. The component was written assuming it would always be present, skipping the undefined check. Because no Bab data was ever populated with `exercises`, this assumption fails 100% of the time.

3. **TypeScript optional typing did not surface as an error**: Both `baharRojaz.indonesianPoem` and `exercises` are `?: string[]` — TypeScript would have flagged `.map()` on them without a null check, but the project may have had `strictNullChecks` disabled or the component was not type-checked at the point of writing.

4. **No test coverage for tab rendering**: The "Latihan Mandiri" tab and the Bahar Rojaz section had no automated tests to catch the regression when the data structure diverged from the component expectations.

---

## Correctness Properties

Property 1: Bug Condition — Bahar Rojaz Poem Renders Without Crash

_For any_ lesson where `isBugCondition_poem` holds (i.e., `baharRojaz` is present but `indonesianPoem` is undefined), the fixed `LessonDetailView` SHALL render the poem lines by reading `lesson.baharRojaz.poem` (falling back to `lesson.baharRojaz.indonesianPoem` if populated, then to an empty array) — without throwing a TypeError, and displaying the correct poem lines for Bab 05 and Bab 06.

**Validates: Requirements 2.1**

Property 2: Bug Condition — Latihan Mandiri Tab Renders Without Crash

_For any_ lesson where `isBugCondition_exercises` holds (i.e., `lesson.exercises` is `undefined`), the fixed `LessonDetailView` SHALL render the "Latihan Mandiri" tab with an empty-state message ("Belum ada latihan untuk bab ini.") instead of calling `.map()` on `undefined`.

**Validates: Requirements 2.2**

Property 3: Preservation — All Other Rendering Unchanged

_For any_ lesson where neither `isBugCondition_poem` nor `isBugCondition_exercises` holds, the fixed `LessonDetailView` SHALL produce exactly the same rendered output as the original component — preserving Kaidah, Tabel, and Contoh tabs, Bahar Rojaz rendering for other potential keys, and all navigation behavior.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**

---

## Fix Implementation

### Changes Required

**File**: `src/components/LessonDetailView.tsx`

#### Change 1 — Fix Bahar Rojaz poem key (line ~156)

**Before:**
```tsx
{lesson.baharRojaz.indonesianPoem.map((line, idx) => (
```

**After:**
```tsx
{(lesson.baharRojaz.poem ?? lesson.baharRojaz.indonesianPoem ?? []).map((line, idx) => (
```

- Reads `poem` first (the key actually used in the data).
- Falls back to `indonesianPoem` (the alternate key in the type) if populated.
- Falls back to `[]` (no crash, renders nothing) if neither is set.
- No data file changes needed.

#### Change 2 — Guard exercises with null check + empty state (line ~338)

**Before:**
```tsx
{lesson.exercises.map((ex, idx) => (
  ...
))}
```

**After:**
```tsx
{lesson.exercises && lesson.exercises.length > 0 ? (
  lesson.exercises.map((ex, idx) => (
    ...
  ))
) : (
  <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-sky-50/60 border border-sky-100 text-center">
    <p className="text-xs sm:text-sm text-slate-500 font-medium">Belum ada latihan untuk bab ini.</p>
  </div>
)}
```

- Guards against `undefined` and empty arrays.
- Empty-state message matches the app's Indonesian language and visual style (same styling classes as other empty states in the app).
- The "Tanya AI Tutor" button below the exercise list is unaffected and still renders.

---

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate the bug on unfixed code, then verify the fix works correctly and preserves existing behavior.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix. Confirm or refute the root cause analysis. If we refute, we will need to re-hypothesize.

**Test Plan**: Write tests that render `LessonDetailView` with a Bab that has `baharRojaz.poem` set and `baharRojaz.indonesianPoem` unset, and with a Bab that has no `exercises`. Assert that the render does NOT throw. Run these tests on the UNFIXED code to observe the crash.

**Test Cases**:
1. **Bab 05 Open Test**: Render `LessonDetailView` with `lessonId = 'bab-05'` — will throw `TypeError` on unfixed code due to `baharRojaz.indonesianPoem` being `undefined`.
2. **Bab 06 Open Test**: Render `LessonDetailView` with `lessonId = 'bab-06'` — same crash on unfixed code.
3. **Latihan Tab on Bab 01**: Render with `lessonId = 'bab-01'`, click "Latihan Mandiri" tab — will throw `TypeError` on unfixed code due to `exercises` being `undefined`.
4. **Latihan Tab on all 23 Bab**: All should crash on unfixed code; all should show empty state on fixed code.

**Expected Counterexamples**:
- `TypeError: Cannot read properties of undefined (reading 'map')` thrown in `LessonDetailView` at the `indonesianPoem.map()` line when `baharRojaz` exists.
- `TypeError: Cannot read properties of undefined (reading 'map')` thrown at `lesson.exercises.map()` for any Bab.

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed component renders correctly.

**Pseudocode:**
```
FOR ALL lesson WHERE isBugCondition_poem(lesson) DO
  result := render LessonDetailView_fixed(lesson)
  ASSERT no_crash(result)
  ASSERT poem_lines_rendered_from_poem_key(result)
END FOR

FOR ALL lesson WHERE isBugCondition_exercises(lesson) DO
  result := render LessonDetailView_fixed(lesson, tab='latihan')
  ASSERT no_crash(result)
  ASSERT empty_state_message_shown(result)
END FOR
```

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed component produces the same result as the original component.

**Pseudocode:**
```
FOR ALL lesson WHERE NOT isBugCondition_poem(lesson) AND NOT isBugCondition_exercises(lesson) DO
  ASSERT render(LessonDetailView_original, lesson) = render(LessonDetailView_fixed, lesson)
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because it can generate many random `lesson` shapes and verify that the non-buggy path output is identical. Manual unit tests should cover the most common tabs.

**Test Cases**:
1. **Kaidah Tab Preservation**: Render Bab 01–23 on "Kaidah" tab — output must be identical before and after fix.
2. **Contoh Tab Preservation**: Render Bab 01–23 on "Contoh" tab — output must be identical.
3. **Tabel Tab Preservation**: Render Bab with `wazanTable` on "Tabel" tab — output must be identical.
4. **Bab Without baharRojaz**: Render Bab 01 (no `baharRojaz`) — hero header renders, no poem section renders.

### Unit Tests

- Test that rendering `LessonDetailView` with Bab 05 does not throw.
- Test that rendering `LessonDetailView` with Bab 06 does not throw.
- Test that the "Latihan Mandiri" tab shows "Belum ada latihan untuk bab ini." for a lesson with `exercises: undefined`.
- Test that the "Latihan Mandiri" tab renders exercise items for a lesson with a non-empty `exercises` array.
- Test that the "Kaidah", "Contoh", and "Tabel" tabs render without regression on a representative set of Bab.

### Property-Based Tests

- Generate random `Lesson` objects where `baharRojaz` is present but `indonesianPoem` is absent — verify no crash and `poem` lines render if set.
- Generate random `Lesson` objects with `exercises: undefined` — verify no crash and empty state renders.
- Generate random `Lesson` objects with `exercises: string[]` of arbitrary length — verify all items render.
- Generate many lesson shapes covering all tab combinations and verify `lesson.rules`, `lesson.examples`, and `lesson.wazanTable` tabs remain unaffected.

### Integration Tests

- Open the full app, navigate to Bab 05, verify the Bahar Rojaz poem lines appear correctly.
- Open the full app, navigate to Bab 06, verify no crash and poem lines appear.
- Open the full app, navigate to any Bab, click "Latihan Mandiri" — verify "Belum ada latihan untuk bab ini." message appears.
- Open the full app, navigate between Bab using prev/next buttons, verify all tabs on each Bab load without error.
