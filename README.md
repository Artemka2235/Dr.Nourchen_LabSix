# Dr.Nourchen_LabSix

## My Student Portal — CSIT248 Week Project

## Student values

These are the values used in this version. **Replace the enrolment number with your actual enrolment number before submitting.**

- Student name: Artemiy Kunetsov
- Enrolment number: A85204925050
- D1 = 5
- D2 = 8
- D3 = 3
- D4 = 1
- Formula example used in the project: `D1 × 10 + D2 + D3 × 5 + D4 = 74`

The grading threshold `T` is **75**, so marks below 50 are Fail, marks from 50 to below T are Pass, and marks at or above T are Distinction.

## Files

- `index.html` — registration page.
- `board.html` — marks board.
- `style.css` — external stylesheet and responsive phone layout.
- `app.js` — plain JavaScript validation, confirmation, fetch, table rendering, sorting/grade logic, and console output.
- `students.json` — student data loaded with `fetch()`.

## Requirements implemented

1. Registration form with full name, email, phone, password, confirm password and city.
2. Required-field validation and visible error messages.
3. Email validation.
4. Phone validation: exactly 9 digits.
5. Password minimum length of 8 characters.
6. Password confirmation matching.
7. Invalid fields receive a visible border/background.
8. `preventDefault()` prevents a bad form submission.
9. A submit listener is attached to the `<form>`, not the button.
10. Successful registration uses `confirm("Register <name>?")`.
11. OK navigates to `board.html?name=<name>`; Cancel stays on the form.
12. Board reads the `name` query parameter with `URLSearchParams`.
13. Student records are loaded asynchronously from `students.json`.
14. `fetch()` uses `async/await` and `try/catch`.
15. Failure is shown on the page, not only in the console.
16. Student rows are created with `createElement()` and `textContent`, not an HTML string.
17. Grade function returns Fail / Pass / Distinction using threshold T = 75.
18. Back button calls `history.back()`.
19. CSS is external and includes a phone-width responsive layout.
20. No libraries or frameworks are used.
21. `let`/`const`, arrow functions, `addEventListener`, `textContent`, `createElement`, and other plain JavaScript requirements are used.
22. Console output includes the enrolment-derived values and submitted/test data.

## Testing

Open the project through an HTTP server because `fetch()` should load `students.json` over HTTP.

### VS Code Live Server

Open the folder in VS Code and use the Live Server extension.

### Python

From the project folder:

```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000/index.html`

## Suggested console tests

```js
grade(1);    // Fail
grade(75);   // Distinction
grade(50);   // Pass
```

## GitHub submission checklist

Use a public repository and commit as you go. The assignment asks for at least 6 commits on at least 3 different days. Suggested commit messages:

1. `add README with student values`
2. `add registration page structure`
3. `add form validation`
4. `add marks board and JSON data`
5. `add fetch and grade rendering`
6. `add responsive styling and final testing`

Do not make all commits on the same day if the assignment requires the history to span multiple days.
