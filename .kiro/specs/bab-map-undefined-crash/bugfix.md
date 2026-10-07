# Bugfix Requirements Document

## Introduction

The e-Qaidaty application crashes with `TypeError: Cannot read properties of undefined (reading 'map')` when opening certain Bab (chapters) or navigating to the "Latihan Mandiri" tab inside any Bab. The root cause is two distinct field-name/presence mismatches between the lesson data (`qaidatyKnowledge.ts`) and the rendering component (`LessonDetailView.tsx`).

**Root Cause 1 — Field name mismatch in `baharRojaz`:**
The data defines the poem lines under the key `poem` (e.g., Bab 05, Bab 06), but `LessonDetailView.tsx` reads `lesson.baharRojaz.indonesianPoem.map(...)`. Because `indonesianPoem` is never set in any Bab, the access returns `undefined`, and calling `.map()` on it crashes the component whenever a Bab with `baharRojaz` is opened.

**Root Cause 2 — Optional field accessed without null guard:**
The `exercises` field on the `Lesson` type is typed as `string[] | undefined` (optional). None of the 23 Bab in the data file define `exercises`. `LessonDetailView.tsx` calls `lesson.exercises.map(...)` directly on line 338 without any null check. This crashes the entire app whenever any user clicks the "Latihan Mandiri" sub-tab.

Both crashes originate solely in `LessonDetailView.tsx` and the lesson data file — no other rendering component is affected.

---

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a user opens Bab 05 (Tanda-Tanda Kalimah Isim) or Bab 06 (Kalimah Fi'il) — which have a `baharRojaz` object — THEN the system crashes with `TypeError: Cannot read properties of undefined (reading 'map')` because `LessonDetailView` reads `lesson.baharRojaz.indonesianPoem` which is `undefined` (the data stores this array under the key `poem`, not `indonesianPoem`).

1.2 WHEN a user navigates to the "Latihan Mandiri" tab of ANY Bab (Bab 01 through Bab 23) THEN the system crashes with `TypeError: Cannot read properties of undefined (reading 'map')` because `LessonDetailView` calls `lesson.exercises.map(...)` directly and `exercises` is `undefined` for all 23 chapters.

1.3 WHEN `LessonDetailView` falls back to the first lesson (`QAIDATY_LESSONS[0]`) due to an unrecognised `lessonId` THEN the system silently loads Bab 01 instead of showing an error, masking navigation bugs.

### Expected Behavior (Correct)

2.1 WHEN a user opens Bab 05 or Bab 06 THEN the system SHALL render the Bahar Rojaz poem lines correctly by reading the `poem` array (or `indonesianPoem` if it is added as an alias) without throwing a TypeError.

2.2 WHEN a user navigates to the "Latihan Mandiri" tab of any Bab THEN the system SHALL safely render the exercises list if `exercises` is defined and non-empty, or display a graceful empty-state message (e.g., "Belum ada latihan untuk bab ini.") if `exercises` is `undefined` or empty — without throwing a TypeError.

2.3 WHEN a `lessonId` that exists in `QAIDATY_LESSONS` is passed to `LessonDetailView` THEN the system SHALL open exactly that Bab and SHALL NOT fall back to Bab 01 silently; a missing/unknown id may still fall back to Bab 01 but only as an intentional defensive default.

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a user opens any Bab that does NOT have a `baharRojaz` field (Bab 01–04, Bab 07–23) THEN the system SHALL CONTINUE TO render all tabs (Kaidah, Tabel, Contoh, Latihan) without any runtime error.

3.2 WHEN a user opens the "Kaidah & Rumus" tab of any Bab THEN the system SHALL CONTINUE TO render `lesson.rules` correctly, as this field is present and non-empty for all 23 Bab.

3.3 WHEN a user opens the "Contoh & Bedah" tab of any Bab THEN the system SHALL CONTINUE TO render `lesson.examples` correctly, as this field is present and non-empty for all 23 Bab.

3.4 WHEN a user opens a Bab that has a `wazanTable` THEN the system SHALL CONTINUE TO render the Tabel Wazan tab correctly (this tab is already guarded by a null check and is not broken).

3.5 WHEN a user navigates between Bab using the prev/next pagination buttons at the bottom of `LessonDetailView` THEN the system SHALL CONTINUE TO navigate to the correct adjacent Bab by ID without loading the wrong chapter.

3.6 WHEN `QAIDATY_KNOWLEDGE_CHUNKS` is generated at module load time using `lesson.baharRojaz.poem.join(...)` THEN the system SHALL CONTINUE TO produce the same text chunks (the knowledge base access path must remain consistent with the data's `poem` key, not change to `indonesianPoem`).

---

## Bug Condition (Pseudocode)

**Bug Condition C(X) — exercises crash:**
```pascal
FUNCTION isBugCondition_exercises(X)
  INPUT: X of type Lesson
  OUTPUT: boolean
  RETURN X.exercises = undefined OR X.exercises = null
END FUNCTION
```

**Bug Condition C(X) — indonesianPoem crash:**
```pascal
FUNCTION isBugCondition_poem(X)
  INPUT: X of type Lesson with baharRojaz present
  OUTPUT: boolean
  RETURN X.baharRojaz IS NOT undefined AND X.baharRojaz.indonesianPoem = undefined
END FUNCTION
```

**Property: Fix Checking (exercises)**
```pascal
FOR ALL X WHERE isBugCondition_exercises(X) DO
  result ← renderLatihanTab'(X)
  ASSERT no_crash(result) AND shows_empty_state_message(result)
END FOR
```

**Property: Fix Checking (indonesianPoem)**
```pascal
FOR ALL X WHERE isBugCondition_poem(X) DO
  result ← renderBaharRojaz'(X)
  ASSERT no_crash(result) AND renders_poem_lines_correctly(result)
END FOR
```

**Preservation Goal**
```pascal
FOR ALL X WHERE NOT isBugCondition_exercises(X) AND NOT isBugCondition_poem(X) DO
  ASSERT F(X) = F'(X)  // all other tabs and Bab render identically to before
END FOR
```
