# AWS Certification Exam Preparation React App

Build a **React-based AWS certification exam preparation application** with **no backend**.

The application should use local data files and `localStorage` for exam progress/results.

I will be **adding questions and concepts daily**, so the data-file format must be simple, consistent, and clearly documented.

---

# 1. Data File 1 – Questions

Create a data file containing all exam questions.

For example:

`src/data/questions.js`

Each question should contain:

```js
{
  id: 1,
  question: "What is Amazon EC2?",
  options: [
    "A cloud storage service",
    "A virtual server service",
    "A database service",
    "A DNS service"
  ],
  correctOption: "A virtual server service",
  reason: "Amazon EC2 provides resizable compute capacity in the AWS Cloud.",
  difficulty: "Easy",
  certification: "AWS Cloud Practitioner",
  concept: "Amazon EC2"
}
```

Required fields:

- `id`
- `question`
- `options`
- `correctOption`
- `reason`
- `difficulty`
- `certification`
- `concept`

I will add new questions **daily**, so the application must automatically work with newly added questions without requiring code changes elsewhere.

---

# 2. Data File 2 – Concepts

Create another data file containing explanations of AWS concepts.

For example:

`src/data/concepts.js`

Format:

```js
{
  id: 1,
  conceptName: "Amazon EC2",
  concept: "Amazon EC2 is a service that provides resizable compute capacity in the AWS Cloud.",
  certification: "AWS Cloud Practitioner"
}
```

Required fields:

- `id`
- `conceptName`
- `concept`
- `certification`

I will also add concepts daily, so keep this format consistent.

---

# 3. Page 1 – Home / Exam Configuration Page

This is the main page.

The questions should come from **Data File 1**.

Provide dropdown/select controls for:

### Certification

Example:

- AWS Cloud Practitioner
- AWS Solutions Architect Associate
- etc.

The options should preferably be generated from the data rather than hardcoded.

### Question Count

Allow the user to select how many questions they want.

Example:

- 5
- 10
- 20
- 30
- 50

Do not allow the user to select more questions than are available after applying the selected filters.

### Difficulty

Dropdown:

- Easy
- Medium
- Hard
- Mixed

If `Mixed` is selected, questions can come from all difficulty levels.

### Concept

Dropdown containing concepts available for the selected certification.

Also provide:

### Read Concepts

This is a separate option/button.

It should allow the user to select:

- Certification
- Concept

After selecting them, navigate to the **Concept Reading Page**.

### Clear/Reset Everything

Add an option on the Home page to completely clear the application's stored exam data/localStorage.

This should reset the application to a fresh state.

---

# 4. Page 2 – Concept Reading Page

This page is used for learning concepts.

The user reaches this page by selecting:

**Certification + Concept → Read Concept**

The page should retrieve the matching concept from **Data File 2**.

Display:

- Certification name
- Concept name
- Full concept explanation

At the end of the page provide:

**Exit / Back button**

The user should be able to return to the previous page.

---

# 5. Page 3 – Exam Page

After the user selects:

- Certification
- Question count
- Difficulty
- Concept

on the Home page, clicking **Start Exam** should navigate to the Exam Page.

The Exam Page should display **ALL selected questions on one page**.

There should be:

- Question
- Options
- Difficulty

for every question.

The user should be able to select/write their answer for each question.

### Important

Do **NOT** create separate pages for every question.

There should be:

```text
Question 1
Options

Question 2
Options

Question 3
Options

...

Question N
Options

Submit Exam
```

Everything should be on one page.

---

# 6. Exam Progress Must Survive Refresh

Store the current exam state in `localStorage`.

If the user refreshes the browser while taking the exam:

- Questions should remain the same.
- Selected answers should remain.
- Exam configuration should remain.
- User should not lose their progress.

For example, store:

```js
{
  questions: [...],
  selectedAnswers: {...},
  certification: "...",
  difficulty: "...",
  concept: "...",
  questionCount: 10
}
```

The exam should restore itself from `localStorage` after refresh.

---

# 7. Page 4 – Result Page

After submitting the exam, navigate to the Result Page.

Display a summary at the top.

For example:

```text
AWS Certification: AWS Cloud Practitioner

Difficulty: Mixed

Questions: 20

Correct: 15

Wrong: 5

Score: 75%
```

Show:

- Certification selected
- Difficulty selected
- Concept selected
- Number of questions selected
- Number correct
- Number wrong
- Score/percentage

---

# 8. Result Page – Detailed Question Review

Below the summary, display every question.

For each question show:

### Question

The original question from Data File 1.

### User's Answer

Show what the user selected.

### Correct Answer

Show the correct answer.

### Result

Clearly indicate:

- Correct
- Wrong

### Reason

Display the `reason` from Data File 1.

### Difficulty

Display the question difficulty.

### Concept

Display the concept name.

Example:

```text
Question 1

What is Amazon EC2?

Your Answer:
Amazon S3

Correct Answer:
Amazon EC2 is a virtual server service

❌ Wrong

Reason:
Amazon EC2 provides resizable compute capacity...

Difficulty:
Easy

Concept:
Amazon EC2
```

---

# 9. Concept Navigation From Result Page

For every question on the Result Page, the concept name should be clickable.

When the user clicks the concept:

1. Find the matching concept in **Data File 2**.
2. Navigate to the Concept Reading Page.
3. Display the complete concept explanation.
4. Provide a button to return to the Result Page.

### Important

When the user goes from:

```text
Result Page
     ↓
Concept Page
     ↓
Back
     ↓
Result Page
```

the result data must **NOT disappear**.

The result should remain exactly as it was.

---

# 10. Store Results in LocalStorage

The exam result should be stored in `localStorage`.

The result must remain available while the user navigates:

```text
Result → Concept → Result
```

It should also survive a browser refresh on the Result Page.

Do not clear the result when navigating to the Concept Page.

---

# 11. Finish Button

On the Result Page, provide a:

**Finish Exam**

button.

When the user clicks Finish:

1. Clear the stored exam questions.
2. Clear the selected answers.
3. Clear the current exam state.
4. Clear the result data.
5. Clear other exam-related localStorage data.
6. Navigate back to the Home Page.

After clicking Finish, the next exam should start completely fresh.

---

# 12. Home Page – Clear Everything

The Home Page should also have an option such as:

**Reset All Data**

When clicked, it should clear all application-related localStorage/cache data.

This should be useful if the user wants to completely reset the application.

Add a confirmation before clearing everything:

```text
Are you sure you want to clear all saved exam data?
```

---

# 13. Data Handling

The application should NOT require a backend.

Use:

```text
React
   ↓
Data File 1 → Questions
Data File 2 → Concepts
   ↓
React Application
   ↓
localStorage → Exam progress/results
```

I will manually add new questions and concepts to the data files every day.

The application should automatically use the newly added data.

---

# 14. Important Data Relationship

Questions and concepts are connected using the concept name.

For example, Data File 1:

```js
{
  question: "What is EC2?",
  concept: "Amazon EC2"
}
```

Data File 2:

```js
{
  conceptName: "Amazon EC2",
  concept: "Amazon EC2 is a compute service...",
  certification: "AWS Cloud Practitioner"
}
```

When the user clicks `Amazon EC2` on the Result Page, find:

```js
conceptName === question.concept;
```

and display that concept.

---

# 15. Filtering Logic

The Home Page filters should work together.

For example:

```text
Certification:
AWS Cloud Practitioner

Difficulty:
Easy

Concept:
Amazon EC2

Question Count:
10
```

The application should first filter Data File 1 based on:

```text
Certification
     ↓
Difficulty
     ↓
Concept
```

Then randomly select the requested number of questions.

If Difficulty = `Mixed`, include all difficulty levels.

If Concept = `All`, include all concepts belonging to the selected certification.

---

# 16. Random Questions

When starting an exam, randomly select questions from the filtered question pool.

Do not always show the questions in the same order.

However, once the exam starts, the selected questions/order must be stored in `localStorage`.

Therefore, refreshing the page must **not randomize the exam again**.

Example:

```text
Start Exam
   ↓
Randomly select 10 questions
   ↓
Save those 10 questions to localStorage
   ↓
User refreshes
   ↓
Load the SAME 10 questions
```

---

# 17. CSS / UI

Create a clean and professional UI suitable for AWS certification preparation.

Use good CSS styling.

You may use:

- Tailwind CSS
- or another suitable CSS solution

if it makes the UI cleaner.

The design should include:

- Clean cards
- Proper spacing
- Clear buttons
- Dropdown styling
- Question cards
- Correct/wrong indicators
- Responsive design
- Mobile-friendly layout
- Good typography
- Easy navigation

The Exam Page should make it easy to answer many questions on one page.

---

# 18. Suggested Project Structure

Use a clean structure similar to:

```text
src/
│
├── data/
│   ├── questions.js
│   └── concepts.js
│
├── pages/
│   ├── Home.jsx
│   ├── ConceptPage.jsx
│   ├── ExamPage.jsx
│   └── ResultPage.jsx
│
├── components/
│   ├── QuestionCard.jsx
│   ├── FilterPanel.jsx
│   └── ConceptCard.jsx
│
├── utils/
│   ├── storage.js
│   └── examUtils.js
│
├── App.jsx
├── main.jsx
└── index.css
```

The exact structure can be changed if there is a better architecture.

---

# 19. Daily Data Entry Format

I will add data every day.

Therefore, provide clear documentation in the project explaining exactly how I should add new questions.

### Question format

```js
{
  id: 101,
  question: "Your question here?",
  options: [
    "Option A",
    "Option B",
    "Option C",
    "Option D"
  ],
  correctOption: "Option B",
  reason: "Explanation of why Option B is correct.",
  difficulty: "Medium",
  certification: "AWS Cloud Practitioner",
  concept: "Amazon EC2"
}
```

Every new question should follow the same structure.

### Concept format

```js
{
  id: 20,
  conceptName: "Amazon EC2",
  concept: "Detailed explanation of Amazon EC2...",
  certification: "AWS Cloud Practitioner"
}
```

Every new concept should follow the same structure.

---

# 20. Important Requirements

Make sure the final application satisfies ALL of these:

- No backend.
- Questions come from Data File 1.
- Concepts come from Data File 2.
- I can add questions daily.
- I can add concepts daily.
- Certification filter.
- Question count filter.
- Difficulty filter.
- Mixed difficulty option.
- Concept filter.
- Concept reading option.
- Concept reading page.
- Exam page.
- All exam questions on one page.
- No next/previous question navigation.
- User can answer every question.
- Difficulty displayed for every question.
- Exam state saved to localStorage.
- Refresh does not lose exam progress.
- Questions remain the same after refresh.
- Result page.
- Correct/wrong count.
- Selected certification displayed.
- Selected difficulty displayed.
- Selected concept displayed.
- Selected question count displayed.
- Detailed review of every question.
- User answer displayed.
- Correct answer displayed.
- Reason displayed.
- Concept displayed.
- Concept is clickable.
- Clicking concept opens the corresponding concept from Data File 2.
- User can return from Concept Page to Result Page.
- Result data must remain intact while reading concepts.
- Finish button.
- Finish clears exam-related localStorage.
- Finish returns to Home Page.
- Home Page has a complete reset/clear-data option.
- Good CSS styling.
- Responsive/mobile-friendly design.
- Clearly document the format for adding daily questions and concepts.

Build the application completely and make sure all pages/routes, state management, filtering, localStorage persistence, exam calculation, result review, and navigation work together.
