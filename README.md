# 🎯 AptiLearn - Enterprise Campus Placement Aptitude & Assessment Platform

**AptiLearn** is a professional, high-performance web platform designed to prepare engineering and graduate students for campus placement aptitude tests. It incorporates the patterns of leading tech recruiters including **TCS, Infosys, Deloitte, Accenture, Amazon, Wipro, Cognizant, Capgemini, LTI Mindtree, and IBM**.

---

## 🌟 Upgraded Professional Features

### 1. 💼 Enterprise SaaS Design & Theming
- **Clean Aesthetic**: Modern typography (*Plus Jakarta Sans* and *JetBrains Mono*), structured card grids, and high-contrast indicators replacing playful elements.
- **Dark Mode & Light Mode**: Seamless single-click toggle (`☀️ Light` / `🌙 Dark`) with full color token inversion and localStorage persistence.
- **Candidate Profile & Working Authentication**: Real candidate login, account registration, session persistence, profile preview, and target company tracking.

### 2. 🏢 10 Top Recruiter Assessment Blueprints
- **TCS NQT 2025-26**: Foundation Cognitive Section (Numerical, Reasoning & Verbal Ability).
- **Infosys Specialist & SE**: Mathematical thinking, cryptarithmetic, and analytical reasoning.
- **Deloitte National Assessment**: Quantitative analytics, coded relations, and business verbal logic.
- **Accenture Cognitive Assessment**: Critical reasoning, problem-solving, and abstract patterns.
- **Amazon Online Assessment (OA)**: Advanced kinematics, constrained permutations, and comprehension.
- **Wipro Elite NTH**: AMCAT-modeled cognitive and numerical aptitude.
- **Cognizant GenC / Elevate**: Men-hour schedules, analytical coding-decoding, and inferences.
- **Capgemini Excellence Drive**: Inlet-outlet flow rates, clock angles, and compound interest.
- **LTI Mindtree Campus Drive**: Punctuality dynamics, linear seating, and deductive syllogisms.
- **IBM Cognitive Ability**: Exponential CI rates, multi-sprint defect ratios, and family trees.

### 3. 📚 Comprehensive Question Bank & Practice Hub
- **48+ Curated Questions** spanning all essential categories:
  - **Quantitative Aptitude**: Time & Work, Pipes & Cisterns, Speed Time & Distance, Trains & Platforms, Boats & Streams, Percentages, Profit, Loss & False Weights, Simple & Compound Interest, Ratio & Mixtures/Alligation, Averages & Ages, Permutations, Probability, Number Systems & Remainder Theorem.
  - **Logical Reasoning**: Syllogisms & Possibilities, Seating Arrangement (Circular & Linear), Direction Sense, Blood Relations (Direct & Coded), Coding-Decoding, Number Series, Clocks & Calendar Angles.
  - **Verbal Ability**: Sentence Correction, Subject-Verb Proximity, Vocabulary, Synonyms & Antonyms, Reading Comprehension, Para Jumbles, Idioms & Phrases.
  - **Data Interpretation**: Bar Graphs, Sectoral Pie Charts, Tabular Sprint Analytics.
- Every question includes **Step-by-Step Derivation** and a **⚡ PRO TRICK (10-Second Placement Shortcut)**.

### 4. 📝 Authentic Exam Simulator Cockpit
- Real-time countdown timer with urgent flashing state at $\le 2$ minutes and auto-submit.
- **5-State Question Palette Matrix**:
  - 🟢 **Answered**: Option saved and counted.
  - 🔴 **Not Answered**: Visited but skipped.
  - ⚪ **Not Visited**: Unseen question.
  - 🔵 **Marked for Review**: Flagged for later check.
  - 🟣 **Answered & Marked**: Option selected and flagged.
- Section-wise navigation and negative marking (-0.25 marks or 0.0).
- Candidate ID, avatar, and college badge displayed on the proctored sidebar.

### 5. 📊 Post-Exam Scorecard Diagnostics
- Overall score, accuracy percentage, attempted count, and time taken.
- Qualification benchmark notification against actual recruiter cutoffs.
- Section-wise accuracy progress bars (Quantitative, Logical, Verbal).
- Filterable answer review (*All*, *Correct*, *Incorrect*, *Unattempted*) with side-by-side comparison of candidate choices and correct answers.

---

## 💻 Tech Stack & Architecture

- **Core**: HTML5, Vanilla CSS3 (Custom SaaS Design System), Modular JavaScript (ES6+).
- **Audio Engine**: Web Audio API synthesized haptic tones for interactions.
- **Data & Modules**:
  - `js/auth.js`: Working candidate authentication, session manager, and profiles.
  - `js/data/questions.js`: 48+ placement questions with step-by-step solutions and speed tricks.
  - `js/data/companies.js`: 10 recruiter exam specifications and blueprints.
  - `js/data/formulas.js`: Formulas, fraction-to-percentage tables, and shortcut rules.
  - `js/exam-engine.js`: Testing engine, timer, and 5-state palette matrix.
  - `js/practice.js`: Category filter, search, instant verification, and bookmarking.
  - `js/storage.js`: LocalStorage manager for stats, streaks, history, bookmarks, and theme.
  - `js/app.js`: Master application controller and routing.

---

## 🏃‍♂️ How to Run

1. The local server is already running at:
   ```text
   http://localhost:8080
   ```
2. You can also open [index.html](file:///c:/Users/mange/.antigravity-ide/Program/index.html) directly in any modern browser (Chrome, Edge, Firefox, Brave).
