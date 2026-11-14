# Lê Quốc Đạt Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (`EN`/`VI`) Next.js portfolio for Software Engineer Lê Quốc Đạt featuring a main profile/projects page (`/`) and a dedicated modular Industrial Automation projects showcase page (`/automation`).

**Architecture:** Next.js App Router with TypeScript and Tailwind CSS. All bilingual profile data, software projects, and modular automation project blocks live in a strongly-typed `src/data/portfolio.ts` module consumed through a client `LanguageContext` (`vi` default, `en` toggleable with `localStorage` persistence).

**Tech Stack:** Next.js (App Router), React 19, TypeScript, Tailwind CSS, Lucide React, Vitest + React Testing Library + jsdom.

**Spec:** `docs/superpowers/specs/2026-11-05-portfolio-design.md`

---

### Task 1: Project Scaffolding & Test Runner Setup
- Create Next.js TypeScript + Tailwind project structure in workspace root (`d:\Personal-Project\6. MyFortfolio`).
- Configure Vitest + `@testing-library/react` + `@testing-library/jest-dom` + `jsdom`.

### Task 2: Portfolio Data Model & Bilingual Context (TDD)
- Test & implement `src/data/portfolio.ts` (personal info, skills categories, featured software projects excluding student CRUD clones, and modular `automationProjects` array with `en`/`vi` localized content, gallery items, specs, and highlights).
- Test & implement `src/context/LanguageContext.tsx` (`useLanguage()` hook providing `lang`, `setLang`, `t` helper).

### Task 3: Shared Navigation & Footer with Quick Copy (TDD)
- Test & implement `src/components/Navbar.tsx` (floating glass header, navigation links, `/automation` highlight link, `EN | VI` language toggle).
- Test & implement `src/components/Footer.tsx` (contact details, copy-to-clipboard for email & phone, GitHub link).

### Task 4: Main Portfolio Page (`/`) Sections (TDD)
- Test & implement `src/components/HeroSection.tsx` (intro, status badge, CTA to `/automation`, and interactive End-to-End Architecture Pipeline widget).
- Test & implement `src/components/SkillsBento.tsx`, `src/components/ExperienceSection.tsx` (featured Industrial Support card linking to `/automation`, HOFURI, VHTMSC/VHTSMSC, and education/training timeline).
- Wire into `src/app/page.tsx`.

### Task 5: Dedicated Automation Projects Page (`/automation`) (TDD)
- Test & implement `src/components/AutomationShowcase.tsx` (category filter pills, individual project blocks with image/diagram gallery, click-to-zoom Lightbox modal, problem/solution breakdown, and technical specs).
- Wire into `src/app/automation/page.tsx`.

### Task 6: Full Verification
- Run `npm test`, `npm run lint`, and `npm run build` and verify local server rendering.

