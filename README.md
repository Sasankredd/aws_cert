# AWS Certification Exam Preparation App

A React-based, backend-less examination sandbox for AWS certification studies.

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📝 Adding Daily Data

The application is designed to automatically ingest new data added to the JS files in `src/data/`.

### 1. Adding Questions
Open `src/data/questions.js` and append a new object to the `questions` array:

```js
{
  id: 101, // Unique ID
  question: "What is your question?",
  options: [
    "Option A",
    "Option B",
    "Option C",
    "Option D"
  ],
  correctOption: "Option B", // Must match exactly one of the options
  reason: "Explain why the answer is correct.",
  difficulty: "Easy", // Easy, Medium, or Hard
  certification: "AWS Cloud Practitioner",
  concept: "Amazon EC2" // Must match a concept name for linking
}
```

### 2. Adding Concepts
Open `src/data/concepts.js` and append a new object to the `concepts` array:

```js
{
  id: 20, // Unique ID
  conceptName: "Amazon EC2", // Must match the 'concept' field in questions
  concept: "Detailed multi-paragraph explanation here...",
  certification: "AWS Cloud Practitioner"
}
```

---

## 🛠 Features

- **No Backend:** Pure React + LocalStorage.
- **Persistence:** Refreshes don't lose exam progress or results.
- **Dynamic Filters:** Certification, Difficulty, and Concept-based exam generation.
- **Concept Reading:** Integrated study mode for deep-dives into AWS services.
- **Result Analysis:** Score breakdown with detailed reasoning and one-click concept lookup.
- **Responsive Design:** Modern, mobile-friendly UI built with Tailwind CSS.
