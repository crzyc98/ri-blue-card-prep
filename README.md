# RI Blue Card Study App

An interactive study tool for the **Rhode Island RIDEM Pistol/Revolver Safety Certificate** (Blue Card) exam. Built with React, TypeScript, Vite, and Tailwind CSS.

## What is the Blue Card?

The Rhode Island Blue Card (officially the RIDEM Pistol/Revolver Safety Certificate) is required to purchase a handgun in Rhode Island. Applicants must be 21 years of age or older and a US citizen or lawful resident.

The exam consists of 50 multiple choice and true/false questions based on:
- *Today's Handgun Safety Basics* (study booklet)
- Rhode Island Firearms Law (RIGL Title 11, Chapter 11-47)

> **Note:** The Blue Card is not the same as a Concealed Carry Permit. Carry permits are issued through town halls and the RI Attorney General's Office.

## Features

- **📖 Study Guide** — 8 collapsible topic sections covering all exam material
- **🃏 Flashcards** — Flip-style cards with "Got It / Still Learning" tracking and missed-card review mode
- **✏️ Practice Quiz** — Up to 50 randomized questions with instant feedback, explanations, and a results screen showing every missed question

**75 questions** across 8 categories:
- RI Firearms Law
- Safety Rules (10 Commandments + 4 Primary Rules)
- Handgun Parts & Types
- Ammunition
- Storage & Transport
- Shooting Techniques
- Handgun Laws (Federal)
- Loading & Unloading

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm (included with Node.js)

### Install dependencies

```bash
cd ri-blue-card-study
npm install
```

### Run in development mode

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

The output goes to `dist/`. Open `dist/index.html` directly in any browser — no server required.

### Serve the built files locally

```bash
npx serve dist
```

## Project Structure

```
ri-blue-card-study/
├── src/
│   ├── components/
│   │   ├── Home.tsx          # Landing page with exam info
│   │   ├── Quiz.tsx          # Practice quiz with scoring
│   │   ├── Flashcards.tsx    # Flip card study mode
│   │   └── StudyGuide.tsx    # Collapsible topic sections
│   ├── data/
│   │   └── questions.ts      # Full question bank (75 questions)
│   ├── App.tsx               # Root component + navigation
│   └── main.tsx              # Entry point
├── dist/                     # Built output (open index.html directly)
└── ...
```

## Study Resources

The content in this app is based on official RIDEM exam materials:

- [RIDEM Blue Card Info](https://dem.ri.gov/natural-resources-bureau/fish-wildlife/handgun-safety-certification-blue-card)
- [Exam Reservation](https://dem.ri.gov/blue-card-exam-reservation)
- RI Firearms Law — RIGL Title 11, Chapter 11-47
- *Today's Handgun Safety Basics* — available at participating firearm vendors or by emailing DEM.DFW@dem.ri.gov

## Disclaimer

This is an **unofficial** study aid. Always verify current laws and exam requirements directly with RIDEM. Laws and exam content may change.
