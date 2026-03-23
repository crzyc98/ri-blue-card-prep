# CLAUDE.md

## Project Overview
RI Blue Card Study — a free interactive exam prep app for the Rhode Island RIDEM Pistol/Revolver Safety Certificate (Blue Card) exam. Built with React 19, Vite 8, Tailwind CSS v4, and TypeScript.

## Tech Stack
- **Framework:** React 19 + TypeScript
- **Build:** Vite 8
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"` in `src/index.css`)
- **Dark mode:** Class-based (`html.dark`), default on, toggled via localStorage. Uses `@custom-variant dark` in CSS and `dark:` Tailwind variants throughout.
- **Deployment:** Docker (nginx:alpine), published to `crzyc/ri-blue-card-prep:latest`
- **Target platform:** linux/amd64 (TrueNAS Scale). Must build with `docker buildx build --platform linux/amd64` from Mac.

## Key Commands
- `npm run dev` — local dev server
- `npm run build` — production build (`tsc -b && vite build`)
- `npm run lint` — ESLint
- `docker buildx build --platform linux/amd64 --no-cache -t crzyc/ri-blue-card-prep:latest --push .` — build and publish Docker image

## Project Structure
- `src/data/questions.ts` — 162 questions, all verified against RIGL Title 11 Ch. 47 statutes
- `src/components/Home.tsx` — landing page with stats and study mode cards
- `src/components/Quiz.tsx` — practice quiz (up to 50 randomized questions, category filter)
- `src/components/Flashcards.tsx` — flip-card review with known/unknown tracking
- `src/components/StudyGuide.tsx` — accordion-style reference by topic
- `src/App.tsx` — router, nav, theme toggle

## Question Data
- 162 questions across 8 categories: RI Firearms Law, Safety Rules, Handgun Parts & Types, Ammunition, Storage & Transport, Shooting Techniques, Handgun Laws (Federal), Loading & Unloading
- All RI law questions verified against actual statutes at `webserver.rilegislature.gov/statutes/title11/11-47/`
- Questions referencing specific statutes include RIGL section numbers in explanations
- The `CATEGORIES` array and question `id` fields must stay consistent — UI depends on them

## Important Notes
- The Blue Card exam tests on the study guide booklet "Today's Handgun Safety Basics" and RI Firearms Law — not the raw statutes. Some simplifications from the study guide are intentional.
- When adding new questions, verify against the actual statute text and use the next sequential `id`.
- The stats on the Home page are computed dynamically from `questions.length` — no hardcoded counts.
