# Jayanth E — Developer Portfolio (Frontend Skeleton & Page Structure)

This repository contains the **structural skeleton and architecture** for the modern personal developer portfolio of **Jayanth E** (Artificial Intelligence & Data Science student).

> **Note**: This is intentionally implemented as a **wireframe foundation** (Layout + Components + Routing + Data Separation). It deliberately contains no decorative gradients, glassmorphism, 3D elements, or complex animations so that visual styling, custom art direction, and animations can be added independently.

---

## 🏗️ Architecture & Folder Structure

```
src/
├── types/
│   └── portfolio.ts           # Strict TypeScript models for all content & components
├── data/
│   ├── personal.ts            # Hero & personal details (name, titles, bio, CTAs)
│   ├── navigation.ts          # Section anchors, nav actions (Resume, GitHub, LinkedIn)
│   ├── journey.ts             # Chronological milestones (School, College, Internships)
│   ├── experience.ts          # Industry roles & internships (Pavakie, Agentic AI, MERN)
│   ├── projects.ts            # Projects data with slugs (/projects/leaksense-twin, etc.)
│   ├── skills.ts              # 7 skill categories with technical competencies
│   ├── codingProfiles.ts      # LeetCode, SkillRack, CodeChef stats & profiles
│   ├── certificates.ts        # Certifications with credential IDs and preview slots
│   ├── achievements.ts        # Hackathons, national rankings, and competitions
│   ├── contact.ts             # Form placeholders, direct coordinates, status
│   ├── socialLinks.ts         # Social & professional profile handles
│   └── index.ts               # Centralized data re-export
├── components/
│   ├── common/
│   │   ├── Navbar.tsx         # Semantic navigation with desktop & mobile toggle
│   │   ├── Footer.tsx         # Structured footer with section links & copyright
│   │   ├── SectionWrapper.tsx # Semantic <section> container with standard max-width
│   │   ├── SectionHeading.tsx # Reusable section title, tag, and index number
│   │   ├── Card.tsx           # Multi-slot wireframe card (header, body, footer)
│   │   ├── Button.tsx         # Accessible button/link with variants (primary/outline)
│   │   ├── Badge.tsx          # Reusable monospace pill/tag component
│   │   ├── Timeline.tsx       # Reusable chronological timeline component
│   │   ├── ProjectCard.tsx    # Reusable project card with stats, tech tags, and links
│   │   ├── SocialLink.tsx     # Accessible social icon & link component
│   │   ├── Placeholder.tsx    # Obvious dashed wireframe placeholder box
│   │   └── ScrollToTop.tsx    # Smooth hash scrolling & route scroll restoration
│   ├── sections/
│   │   ├── HeroSection.tsx    # Section 0: Home / About hero
│   │   ├── JourneySection.tsx # Section 1: Journey & milestones timeline
│   │   ├── ExperienceSection.tsx # Section 2: Work experience cards
│   │   ├── ProjectsSection.tsx# Section 3: Featured projects with filter placeholder
│   │   ├── SkillsSection.tsx  # Section 4: 7 categorized skill sets
│   │   ├── CodingProfilesSection.tsx # Section 5: LeetCode, SkillRack, CodeChef
│   │   ├── CertificatesSection.tsx   # Section 6: Certificate gallery
│   │   ├── AchievementsSection.tsx   # Section 7: Honors, awards & competitions
│   │   └── ContactSection.tsx # Section 8: Semantic contact form & coordinates
│   └── layout/
│       └── Layout.tsx         # Common app shell (Navbar + Main + Footer)
├── pages/
│   ├── HomePage.tsx           # Full SPA view assembling all 9 sections in sequence
│   ├── ProjectsPage.tsx       # Dedicated /projects route
│   └── ProjectDetailPage.tsx  # Dynamic /projects/:slug route (architecture breakdown)
├── styles/
│   └── wireframe.css          # Semantic CSS variables, responsive grids, wireframe borders
├── App.tsx                    # React Router configuration
└── main.tsx                   # React 19 entry point
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run local development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

---

## 🧩 Sections Included

1. **Home / About** (`#about`): Hero introduction, titles, visual avatar placeholder, primary & secondary CTAs, social tags.
2. **Journey** (`#journey`): Reusable timeline with School, Higher Secondary, College, MERN Stack Internship, Agentic AI Internship, and AI Internship.
3. **Experience** (`#experience`): Industry cards for AI Intern (Pavakie), Agentic AI Intern, and MERN Stack Intern.
4. **Projects** (`#projects`): Cards for Leaksense Twin, Offline Multimodal RAG System, UnifyOps, and Meraki, with category filter tabs.
5. **Skills** (`#skills`): 7 categories (Programming Languages, Web Technologies, AI/ML & LLM, Databases & Vector DBs, Tools & Platforms, Libraries, Core Concepts).
6. **Coding Profiles** (`#coding-profiles`): Statistics cards for LeetCode, SkillRack, and CodeChef.
7. **Certificates** (`#certificates`): Hyrup Ideathon, Oracle Java, IBM SkillsBuild GenAI, HackerRank SQL.
8. **Achievements** (`#achievements`): Caterpillar Tech Challenge, TN Impact, Codeathon, FedEx SMART IITM, India Innovates, Mini Project Expo.
9. **Contact** (`#contact`): Accessible form structure + direct coordinates.

---

## 🔗 Scalable Routing

- `/` &rarr; Home single-page layout with anchor navigation to all sections
- `/projects` &rarr; Dedicated project directory
- `/projects/:slug` &rarr; Standalone project architecture view (e.g. `/projects/leaksense-twin`, `/projects/offline-multimodal-rag`, `/projects/unifyops`, `/projects/meraki`)

