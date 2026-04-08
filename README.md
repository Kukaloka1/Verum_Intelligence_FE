<div align="center">

# Verum Intelligence — Frontend

**AI-powered regulatory intelligence workspace for the GCC market.**  
Natural-language compliance queries, jurisdiction comparison, and market-entry guidance — built for founders, legal teams, and operators.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Auth_Ready-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)](./LICENSE)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Product Modules](#product-modules)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Route Map](#route-map)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Design System](#design-system)
- [Repository Scope](#repository-scope)
- [Integration Roadmap](#integration-roadmap)

---

## Overview

**Verum Intelligence** is a structured regulatory intelligence product purpose-built for the GCC. It delivers a premium, AI-powered workspace where legal teams, investors, and market-entry operators can navigate complex jurisdictional frameworks across:

| Jurisdiction | Coverage |
|---|---|
| **DIFC** | Dubai International Financial Centre |
| **ADGM** | Abu Dhabi Global Market |
| **QFC** | Qatar Financial Centre |
| **KSA** | Kingdom of Saudi Arabia |

This repository contains the **frontend application only** — a product-grade Next.js codebase structured for modular growth, clean GitHub presentation, and future backend integration.

---

## Product Modules

### AI Query Interface
Natural-language legal and compliance queries answered through a structured, source-backed interface. Built for precision — not generic chat.

### Compliance Dashboard
A premium monitoring surface for jurisdiction-level regulatory visibility across target GCC markets. Designed for ongoing operational use.

### Framework Comparison
Side-by-side comparison flows for jurisdictional frameworks, licensing context, and regulatory differences across DIFC, ADGM, QFC, and KSA.

### Market Entry Toolkit
A structured market-entry guidance surface with roadmap-oriented UX and jurisdiction-aware framing for operators entering the GCC.

### User Workspace
Authenticated product space for saved queries, continuity, and account-aware workflows. Auth-ready, Supabase-integrated entrypoints included.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js | 15.x |
| UI Library | React | 19.x |
| Language | TypeScript | 5.8 |
| Styling | Tailwind CSS | 3.4 |
| Auth | Supabase JS | 2.x |
| Package Manager | npm | — |

---

## Architecture

This codebase follows a strict implementation doctrine:

**What it is:**
- Modular product structure with explicit component ownership
- Clear separation of concerns across all boundaries
- Small, readable, maintainable files throughout
- Backend-ready frontend contracts and API client stubs
- Two-layer UX: marketing surface + authenticated product shell

**What it is not:**
- No baroque monoliths or oversized catch-all files
- No frontend-side model calls or AI orchestration
- No hidden architecture theater
- No unnecessary framework bloat
- No fake enterprise complexity

The objective is to make the repository itself communicate seriousness before anyone runs the product.

---

## Project Structure

```
verum_FE/
├── app/                    # Route-level entrypoints and page composition
│   ├── (auth)/             # Auth route group
│   ├── dashboard/          # Compliance Dashboard page
│   ├── comparison/         # Framework Comparison page
│   ├── query/              # AI Query Interface page
│   ├── toolkit/            # Market Entry Toolkit page
│   ├── workspace/          # User Workspace page
│   ├── profile/            # User Profile page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Marketing landing page
│
├── components/             # UI components organized by module
│   ├── auth/               # Auth forms and flows
│   ├── comparison/         # Framework comparison UI
│   ├── dashboard/          # Compliance dashboard panels
│   ├── layout/             # Sidebar, topbar, shell
│   ├── profile/            # Profile surface components
│   ├── query/              # AI query interface components
│   ├── shared/             # Genuinely reusable UI primitives
│   ├── toolkit/            # Market entry toolkit components
│   └── workspace/          # Workspace surface components
│
├── hooks/                  # Module-level frontend state hooks
├── lib/                    # Frontend infrastructure
│   ├── api/                # API client stubs (backend-ready)
│   ├── auth/               # Auth helpers
│   ├── constants/          # App-level constants
│   ├── formatters/         # Display formatting utilities
│   └── utils/              # General utilities
│
├── providers/              # App-level providers and composition wrappers
├── types/                  # Frontend contracts and typed placeholders
├── styles/                 # Shared design tokens and base styling
├── docs/                   # Frontend-local route and module documentation
│
├── middleware.ts            # Next.js route middleware
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

---

## Route Map

| Route | Module | Description |
|---|---|---|
| `/` | Marketing | Landing page — product positioning and CTA |
| `/query` | AI Query | Natural-language compliance query interface |
| `/dashboard` | Dashboard | Jurisdiction-level compliance monitoring |
| `/comparison` | Comparison | Side-by-side regulatory framework comparison |
| `/toolkit` | Toolkit | Market-entry guidance and roadmap surface |
| `/workspace` | Workspace | Authenticated user workspace |
| `/profile` | Profile | User account and profile management |
| `/auth/login` | Auth | Sign in |
| `/auth/signup` | Auth | Sign up |
| `/auth/callback` | Auth | Auth callback handler |

---

## Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd verum_FE

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Start the development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Copy `.env.example` to `.env.local` and configure the following:

```env
# Application
NEXT_PUBLIC_APP_NAME=Verum Intelligence
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:4000

# Supabase (Auth)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Note:** Real `.env.local` files are intentionally excluded from version control via `.gitignore`.

---

## Available Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm run start    # Start production server (port 3000)
npm run lint     # Run ESLint
```

---

## Design System

The UX is split into two deliberate layers:

**Marketing Layer** (`/`)
The landing page acts as a commercial entry surface with a hero, product positioning, jurisdiction framing, and a clear CTA flow.

**Product Layer** (`/query`, `/dashboard`, `/comparison`, `/toolkit`, `/workspace`)
Internal application routes use a product shell pattern with persistent sidebar navigation, topbar, and module-specific page shells built from reusable product UI patterns.

This split is intentional: the frontend must both sell the product and feel like a serious workspace once inside.

---

## Repository Scope

This repository is the **frontend application only**.

| Responsibility | Location |
|---|---|
| UI, routing, and product experience | **This repository** |
| Auth entrypoints and client stubs | **This repository** |
| Backend APIs and query orchestration | Backend repository |
| Retrieval, vector search, and ingestion | Backend repository |
| Regulatory source data pipelines | Backend repository |
| Database migrations and persistence | Backend repository |

---

## Integration Roadmap

This frontend is designed to connect to a dedicated backend responsible for:

- [ ] Query orchestration and AI response delivery
- [ ] Retrieval and source citation serving
- [ ] Regulatory source ingestion and indexing
- [ ] Compliance dashboard state serving
- [ ] Framework comparison data serving
- [ ] Market-entry guide content serving
- [ ] Auth and session verification (Supabase)
- [ ] User persistence and saved queries

The frontend deliberately stops at the frontend boundary. All API client stubs are backend-ready and typed.

---

<div align="center">

**Verum Intelligence** — Private & Confidential  
Frontend baseline. Built for scale, clarity, and professional traceability.

</div>
