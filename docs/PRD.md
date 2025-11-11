# MadeByNoob: MVP Product Requirements Document

* **Version:** 1.0 (MVP)
* **Project:** MadeByNoob Game Information Platform
* **MVP Focus:** *Grow a Garden* (Roblox)

---

## 1. Project Overview

### 1.1. Product Vision
To create the fastest, cleanest, and most useful source of information for video games. We are building a high-performance, user-centric alternative to slow, ad-cluttered, and poorly designed game wikis.

### 1.2. Brand Identity ("MadeByNoob")
The name is a deliberate contrast. It suggests a "noob-friendly" approach, but the product itself must be the opposite: **professional, expertly-designed, and incredibly fast.** It's "pro-level data with noob-level simplicity."

### 1.3. MVP Goal
To launch a focused, high-value "Source of Truth" for a single game community: **Grow a Garden**. The goal is to capture and monopolize this community by providing a superior product, validating the model before scaling.

---

## 2. Core Engineering & Design Principles

### 2.1. Design Philosophy: "Premium Dark Utility"
* **Theme:** Dark mode by default.
* **Feel:** The site must feel like a premium, exclusive, and focused software tool. It should be clean, high-contrast, and fast, avoiding the "cluttered" feel of typical gamer sites.
* **Speed:** Performance is a primary feature. Use static generation (SSG) wherever possible.

### 2.2. Technology Stack
* **Language:** TypeScript
* **Framework:** Next.js (App Router)
* **Styling:** Pure Tailwind CSS.
* **Package Manager:** pnpm
* **Constraint:** **No external component libraries** (e.g., Shadcn, DaisyUI). All components will be custom-built using Tailwind utility classes.

### 2.3. Code & File Structure
* **Filenames:** All new files (components, pages, services) **must** use `kebab-case`.
    * *Good:* `hero-section.tsx`, `main-header.tsx`
    * *Bad:* `HeroSection.tsx`, `HeroSection.js`
* **Component Scope:** Components should be small, focused, and placed in a top-level `/components` directory.

### 2.4. Design System (Semantic Tokens)
We will define all brand colors semantically in `tailwind.config.js` to ensure consistency and easy future updates. We will **not** hardcode hex values or raw Tailwind colors (e.g., `bg-lime-400`) in components.

| Token | Utility Class | Tailwind Equivalent (Ref) | Description |
| :--- | :--- | :--- | :--- |
| Background | `bg-background` | `slate-900` | Main page background |
| Card/Module | `bg-card` | `slate-800` | Background for cards, modals |
| Border | `border-border` | `slate-700` | Borders, dividers, outlines |
| Text (Primary) | `text-text-primary` | `slate-100` | Headings, important text |
| Text (Secondary) | `text-text-secondary` | `slate-400` | Body copy, sub-headlines |
| Accent (Primary) | `bg-accent-primary` | `lime-400` | Primary buttons, links, highlights |
| Accent Text | `text-accent-foreground` | `lime-950` | Text on top of accent buttons |

---

## 3. Feature Specification: Brand Landing Page (`/`)

**Objective:** To introduce the "MadeByNoob" brand, articulate its "Premium Dark Utility" value proposition, and effectively funnel 100% of MVP users to the single supported game hub (*Grow a Garden*).

| Section | Component Name | Functional & UI Requirement |
| :--- | :--- | :--- |
| **3.1. Main Header** | `components/main-header.tsx` | - Sticky or static header with `bg-background` and `border-b border-border`.<br>- "MadeByNoob" logo text (use `text-text-primary` and `font-bold`).<br>- Mobile menu (hamburger) icon on the right, hidden on `md:` screens. |
| **3.2. Hero Section** | `components/hero-section.tsx` | - Large vertical padding (e.g., `py-24`).<br>- **H1:** "Game Guides, Built Better." (use `text-text-primary`, `font-extrabold`, `text-6xl`).<br>- **Sub-headline:** "Tired of slow, ad-filled wikis?..." (use `text-text-secondary`, `text-xl`).<br>- **Primary CTA:** Single button "View (Grow a Garden) Guides".<br>- **CTA Styling:** `bg-accent-primary`, `text-accent-foreground`, `font-bold`, `rounded-lg`, `hover:opacity-90`. |
| **3.3. Pillars** | `components/pillars-section.tsx` | - 3-column layout.<br>- Each column is a "Card" (`bg-card`, `rounded-lg`) with an icon, title, and description.<br>- **Pillar 1:** "In-Depth Databases" (Fast, filterable data).<br>- **Pillar 2:** "Essential Gamer Tools" (Code trackers, calculators).<br>- **Pillar 3:** "Community Hubs" (Trading boards, strategy). |
| **3.4. Philosophy** | `components/philosophy-section.tsx` | - Simple text-block section explaining "Why 'MadeByNoob'?".<br>- "We're gamers and engineers..." (use `text-text-secondary`). |
| **3.5. Future / CTA** | `components/subscribe-section.tsx` | - Final section with a simple email input for "Request a Game" or "Get Updates".<br>- Input styled with `bg-card` and `border-border`. |

---

## 4. Feature Specification: Product Hub (`/grow-a-garden`)

**Objective:** To be the definitive, all-in-one resource for *Grow a Garden*. This section functions as a self-contained application.

### 4.1. Hub Layout & Navigation
* **File:** `/app/grow-a-garden/layout.tsx`
* **Component:** `components/hub-navigation.tsx`
* **UI:** A secondary navigation bar (e.g., tabs) that is persistent across all `/grow-a-garden` pages.
* **Links:** [Home], [Database], [Codes], [Trading], [Tools].
* **Global Search (Hub-Specific):** A prominent, fast search bar (client-side) to filter database items.

### 4.2. Feature: The Wiki (Wiki 2.0)
* **Pages:** `/grow-a-garden/wiki/(items|pets|guides)/[slug].tsx`
* **Data Strategy:** All data (items, pets, guides) will be treated as content. **SSG (Static Site Generation)** is mandatory for instant loads and SEO.
* **UI:**
    * **Master List Page:** A filterable and searchable grid/list of all items/pets.
    * **Detail Page:** A static, pre-rendered page for each individual item, pet, or guide.

### 4.3. Feature: The Hook (Code Tracker)
* **Page:** `/grow-a-garden/codes`
* **UI:**
    * **Tabs:** "Active Codes" (default) and "Expired Codes".
    * **List Item:** Each code shows [Reward], [Code String], and a "Copy" button.
    * **Trust Signal:** A "Last Verified: [timestamp]" element is crucial.
* **Data:** This page will be dynamic (SSR or CSR) to fetch the latest code status.

### 4.4. Feature: The Differentiator (Trading Board)
* **Page:** `/grow-a-garden/trading`
* **UI:**
    * A simple, forum-style list of posts, sorted by newest.
    * A "New Post" form (modal or on-page) with "Offering:" and "Looking For:" text inputs.
* **Note:** This is *not* a live chat. It's a structured message board.

### 4.5. Feature: The Differentiator (Utility Tools)
* **Pages:** `/grow-a-garden/tools/profit-calculator`, `.../xp-calculator`
* **UI:** Simple forms with inputs.
* **Logic:** All calculation logic will be **client-side** (JavaScript).
    * *Profit Calc:* Select plant -> Get "Profit per Hour".
    * *XP Calc:* Input "Current Lvl" & "Target Lvl" -> Get "Total XP Needed".