# Backend Assessment Review Instructions

You are acting as a senior Laravel reviewer for a technical assessment.

Your responsibility is to review the backend implementation ONLY against the assessment requirements below.

This is a code review task, NOT a refactoring task.

---

# Rules

Review the existing codebase exactly as it is.

Do NOT modify any files.

Do NOT generate any code.

Do NOT refactor anything.

Do NOT suggest personal coding preferences.

Do NOT suggest architecture changes.

Do NOT recommend features outside the assessment.

Do NOT over-engineer the solution.

Only evaluate compliance with the assessment requirements.

---

# Assessment Specification

Use the attached Backend Assessment document as the ONLY source of truth.

Evaluate whether the implementation satisfies the assessment exactly as written.

Do not invent additional requirements.

Ignore anything that is not explicitly requested by the assessment.

---

# Review Checklist

## Functional Requirements

Verify:

- POST /api/check exists.
- POST /api/generate exists.
- /check only checks voucher existence.
- /generate creates exactly 3 unique seats.
- Generated seats are valid for the selected aircraft.
- Duplicate vouchers are prevented using **flight_number + flight_date**.
- Successful responses match the required JSON format.
- Error responses are appropriate.
- Data is persisted correctly.

---

## Laravel Best Practices

Verify:

- Routes are defined in routes/api.php.
- Form Request validation is used.
- Eloquent ORM is used.
- Seat generation logic is located inside a Service class.
- API Resources are used where appropriate.
- Error handling follows Laravel conventions.

---

## Database

Verify:

- SQLite is used.
- Migration matches the assessment.
- Voucher model is correct.
- Database schema follows the specification.

---

## Assessment Flow

Verify that the backend follows this flow exactly:

POST /check

↓

If exists == false

↓

POST /generate

↓

Store voucher

↓

Return generated seats

If duplicate:

Return an error indicating vouchers already exist for that flight and date.

---

## Code Quality

Review only for:

- Readability
- Maintainability
- Separation of concerns
- Naming consistency

Do NOT recommend unnecessary refactoring.

---

## Bonus Items

Check whether the project includes:

- Laravel Form Requests
- Custom validation messages
- Composite unique constraint (flight_number + flight_date)
- Feature Tests
- API Resources
- Docker / Sail support

If missing, simply mention them.

Do NOT recommend implementing them unless they are bonus points.

---

# Important

If something already satisfies the assessment,
mark it as PASS.

Do NOT suggest changing working code.

Do NOT recommend improvements simply because they are "better".

Only report issues when they directly affect assessment compliance.

---

# Output Format

Provide a report containing:

## Overall Assessment

One of:

- Ready for submission
- Mostly ready (minor improvements)
- Needs revision

---

## Functional Checklist

PASS / FAIL with explanation.

---

## Laravel Best Practices

PASS / FAIL with explanation.

---

## Database Review

PASS / FAIL with explanation.

---

## Code Quality

PASS / FAIL with explanation.

---

## Bonus Points

List only.

---

## Required Changes

Only include changes that are necessary to satisfy the assessment.

If there are no required changes, explicitly state:

"No required backend changes."

---

## Optional Improvements

List improvements that are NOT required by the assessment.

Do NOT recommend implementing them unless specifically requested.

---

## Final Verdict

State whether the backend is ready to be submitted for this assessment.

If yes, explain why.

If no, explain exactly which assessment requirement is not yet satisfied.
