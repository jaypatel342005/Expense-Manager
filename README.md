# 💸 ExpenXO – Company Expense Manager

### Full-Stack Business Expense Management System Built with Next.js, Prisma & TiDB Serverless

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://prisma.io)
[![TiDB](https://img.shields.io/badge/TiDB-Serverless-CC3534?style=flat-square)](https://tidbcloud.com)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://expenxo.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)
[![Stars](https://img.shields.io/github/stars/jaypatel342005/Expense-Manager?style=flat-square&color=facc15)](https://github.com/jaypatel342005/Expense-Manager/stargazers)
[![TypeScript](https://img.shields.io/badge/code-98.5%25_TypeScript-3178C6?style=flat-square)](https://github.com/jaypatel342005/Expense-Manager)

**A production-ready, full-stack expense management system for IT companies and businesses — manage employees, track company-wide income & expenses, schedule events, generate Excel reports, and gain real-time financial insights from a powerful admin dashboard.**

[🌐 **Live Demo**](https://expenxo.vercel.app) • [📂 **GitHub**](https://github.com/jaypatel342005/Expense-Manager) • [💬 **Contact**](mailto:pateljay97378@gmail.com)

---

## 📋 Quick Navigation

| Section | Link |
|---|---|
| Overview | [🌟 Jump to Overview](#-overview) |
| Features | [🎯 Jump to Features](#-features-at-a-glance) |
| How It Works | [🔄 Jump to How It Works](#-how-it-works) |
| Tech Stack | [🛠️ Jump to Tech Stack](#%EF%B8%8F-tech-stack) |
| Database Schema | [🗄️ Jump to Database Schema](#%EF%B8%8F-database-schema) |
| Installation | [📦 Jump to Installation](#-installation) |
| Environment Variables | [🔐 Jump to Environment Variables](#-environment-variables) |
| Project Structure | [🗂 Jump to Structure](#-project-structure) |
| Deployment | [☁️ Jump to Deployment](#%EF%B8%8F-deployment) |
| Contributing | [🤝 Jump to Contributing](#-contributing) |

---

## 🌟 Overview

**ExpenXO** is a modern, full-stack **business expense management system** designed for IT companies and organizations of any size. It provides a centralized platform to manage employees (People), track company-wide income and expenses, schedule calendar events tied to team members, and generate detailed financial reports — all secured behind role-aware authentication.

Built on the **Next.js 16 App Router** with React Server Components, **Prisma 7 ORM**, and **TiDB Serverless** (MySQL-compatible), ExpenXO delivers enterprise-grade reliability with a polished, accessible, and fully responsive UI.

- 🏢 **Company-Wide Expense Tracking** – Log and categorize income & expenses across the organization
- 👥 **People / Employee Directory** – Manage employees with unique codes, contact details & active status
- 🗓️ **Calendar Module** – Schedule and track financial events linked to People/employees
- 🔐 **Secure Authentication** – Login with email or username; JWT sessions with bcryptjs password hashing
- 🗄️ **Serverless-Ready Database** – Prisma 7 with TiDB Serverless (MySQL-compatible) + MariaDB adapter
- 📁 **Import & Export** – Bulk CSV import via PapaParse; Excel report export via xlsx
- 🖼️ **User Profile Management** – Avatar upload with crop & CDN delivery via ImageKit (4 MB limit)
- 🌙 **Dark / Light Mode** – Full theme switching via `next-themes`
- ⌨️ **Command Palette (⌘K)** – Fast in-app navigation powered by `cmdk`
- 📱 **Fully Responsive** – Works seamlessly on desktop, tablet, and mobile

> 🌐 **Try it live:** [expenxo.vercel.app](https://expenxo.vercel.app)

---

## 🎯 Features at a Glance

| | |
|---|---|
| 💳 **Expense & Income Management** <br><br> ✅ Add, edit, and delete company income & expenses <br> ✅ Categorize by type with custom labels <br> ✅ Attach descriptions, dates, and references <br> ✅ Filter transactions by date range & category <br> ✅ Drag-and-drop transaction reordering (react-dnd) <br> ✅ Sortable, paginated data table (TanStack Table) <br> ✅ Bulk import from CSV files (PapaParse) | 📊 **Analytics & Reporting** <br><br> ✅ Recharts-powered income vs. expense trend charts <br> ✅ Company-wide financial overview dashboard <br> ✅ Category-wise spending breakdown <br> ✅ Export reports as `.xlsx` (Excel) for accounting <br> ✅ Progress indicators for budget monitoring (Radix Progress) <br> ✅ Collapsible data panels (Radix Collapsible) |
| 👥 **People / Employee Directory** <br><br> ✅ Register employees with unique PeopleCode <br> ✅ Store name, email, mobile number per person <br> ✅ Active / inactive employee status management <br> ✅ Link People entries to calendar events & expenses <br> ✅ Avatar upload per employee profile (ImageKit CDN) <br> ✅ Image cropping before upload (react-image-crop) | 🗓️ **Calendar & Event Scheduling** <br><br> ✅ Company event calendar linked to People records <br> ✅ Schedule financial events, meetings & deadlines <br> ✅ Date picker with react-day-picker <br> ✅ Carousel-style calendar navigation (Embla Carousel) <br> ✅ Events tied to specific employees / People entries |
| 🔐 **Authentication & Access** <br><br> ✅ Sign up with username, email, mobile & password <br> ✅ Login via email address OR username <br> ✅ JWT session management with jose <br> ✅ bcryptjs password hashing <br> ✅ Protected dashboard routes via middleware | 🎨 **UI / UX** <br><br> ✅ shadcn/ui (radix-vega style) component system <br> ✅ Full Radix UI accessible component primitives <br> ✅ Tailwind CSS v4 with CSS variable theming <br> ✅ Dark / light / system theme toggle <br> ✅ Toast notifications (Sonner) <br> ✅ Smooth animations (tw-animate-css) <br> ✅ Command palette ⌘K for quick navigation (cmdk) |

---

## 🔄 How It Works

```
┌──────────────────────────────────────────────────────────────┐
│  1. USER AUTHENTICATION                                      │
│  • User registers with username, email, mobile & password   │
│  • Password hashed with bcryptjs before storage             │
│  • JWT issued via jose for session management               │
│  • Login supports email address OR username                 │
│  • Protected routes enforced via Next.js middleware          │
└────────────────────┬─────────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  2. PEOPLE / EMPLOYEE MANAGEMENT                             │
│  • Admins add employees with unique PeopleName & PeopleCode  │
│  • Each person has email, mobile, active/inactive status     │
│  • Profile images managed via ImageKit CDN                   │
│  • People directory serves as the foundation for all modules │
└────────────────────┬─────────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  3. EXPENSE & INCOME TRACKING                                │
│  • Add income / expense entries linked to categories         │
│  • React Hook Form + Zod validates all form data             │
│  • Server Actions persist entries via Prisma → TiDB          │
│  • Drag-and-drop (react-dnd) for reordering records          │
│  • Bulk import transactions from CSV (PapaParse)             │
└────────────────────┬─────────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  4. CALENDAR & EVENT SCHEDULING                              │
│  • Events scheduled and linked to People directory entries   │
│  • Calendar displays financial deadlines & meetings by date  │
│  • react-day-picker handles date selection                   │
└────────────────────┬─────────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  5. DASHBOARD & ANALYTICS                                    │
│  • Recharts renders company-wide income vs. expense charts   │
│  • TanStack Table: sortable, paginated transaction grids     │
│  • Radix Progress shows per-category budget utilization      │
│  • Command palette (⌘K) for fast navigation across modules  │
└────────────────────┬─────────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  6. REPORTING & EXPORT                                       │
│  • xlsx generates downloadable Excel financial reports       │
│  • PapaParse handles bulk CSV transaction import             │
│  • Server Actions support file uploads up to 4 MB            │
└────────────────────┬─────────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  7. DEPLOYMENT                                               │
│  • Next.js deployed on Vercel (global edge network)          │
│  • TiDB Serverless for globally distributed database access  │
│  • ImageKit CDN for fast, optimized image delivery           │
└──────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema

Confirmed from Prisma configuration and TypeScript source traces:

### 👥 People (Employee / Contact) Model

| Field | Type | Description |
|---|---|---|
| `PeopleID` | `Int` (PK) | Unique identifier for each person |
| `PeopleName` | `String` | Full name of the employee / contact |
| `PeopleCode` | `String?` | Unique employee or department code |
| `Email` | `String` | Work email address |
| `MobileNo` | `String` | Contact mobile number |
| `Description` | `String?` | Role, notes, or department description |
| `IsActive` | `Boolean?` | Active (true) / Inactive (false) employee flag |
| `Created` | `DateTime` | Record creation timestamp |
| `Modified` | `DateTime` | Last updated timestamp |

### 🔑 User (Authentication) Model

| Field | Type | Description |
|---|---|---|
| `UserID` | `Int` (PK) | Unique user account identifier |
| `PeopleID` | `Int` (FK) | Linked People directory entry |
| `Email` | `String` | Login email address |
| `Password` | `String` | bcryptjs-hashed password |
| `MobileNo` | `String` | Contact mobile number |
| `Created` | `DateTime` | Account creation timestamp |
| `Modified` | `DateTime` | Last updated timestamp |

### 🔗 Key Relations

- **User → People** — Every user account is linked to a People record via `PeopleID`
- **People → Calendar** — Calendar events reference People entries (name, profile image)
- **People → Expenses** — Transactions and reports can be scoped to specific employees or departments

---

## 🛠️ Tech Stack

### 🖥️ Frontend

[![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

### 🎨 UI Components & Interaction

[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com)
[![Radix UI](https://img.shields.io/badge/Radix%20UI-161618?style=for-the-badge&logo=radixui&logoColor=white)](https://radix-ui.com)
[![Lucide React](https://img.shields.io/badge/Lucide_React-F56565?style=for-the-badge)](https://lucide.dev)
[![Recharts](https://img.shields.io/badge/Recharts-8884D8?style=for-the-badge)](https://recharts.org)
[![TanStack Table](https://img.shields.io/badge/TanStack_Table-FF4154?style=for-the-badge)](https://tanstack.com/table)

### ⚙️ Backend & Database

[![Prisma](https://img.shields.io/badge/Prisma%207-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io)
[![TiDB](https://img.shields.io/badge/TiDB%20Serverless-CC3534?style=for-the-badge)](https://tidbcloud.com)
[![MariaDB](https://img.shields.io/badge/MariaDB%20Adapter-003545?style=for-the-badge&logo=mariadb&logoColor=white)](https://mariadb.org)

### 🔒 Auth, Storage & Forms

[![jose](https://img.shields.io/badge/jose%20JWT-000000?style=for-the-badge)](https://github.com/panva/jose)
[![bcryptjs](https://img.shields.io/badge/bcryptjs-4A90D9?style=for-the-badge)](https://github.com/dcodeIO/bcrypt.js)
[![ImageKit](https://img.shields.io/badge/ImageKit%20CDN-blue?style=for-the-badge)](https://imagekit.io)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge)](https://react-hook-form.com)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge)](https://zod.dev)

### ☁️ Deployment & Tooling

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jaypatel342005/Expense-Manager)

---

## 📦 Installation

### ✅ Prerequisites

- **Node.js 18+** ([Download](https://nodejs.org))
- **npm** or **yarn**
- **Git**
- A **TiDB Serverless** account ([Free tier](https://tidbcloud.com)) — or any **MariaDB / MySQL** instance
- An **ImageKit** account ([Free tier](https://imagekit.io)) for employee profile image uploads

### Step 1️⃣ – Clone the Repository

```bash
git clone https://github.com/jaypatel342005/Expense-Manager.git
cd Expense-Manager
```

### Step 2️⃣ – Install Dependencies

```bash
npm install
# The postinstall hook automatically runs: prisma generate
```

### Step 3️⃣ – Configure Environment Variables

```bash
cp .env.example .env
# Edit .env with your database, JWT, and ImageKit credentials
```

### Step 4️⃣ – Push the Database Schema

```bash
# Apply all Prisma models to your database
npx prisma db push

# (Optional) Open Prisma Studio to inspect and manage records
npx prisma studio
```

### Step 5️⃣ – Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll see the ExpenXO login page.

---

## 🚀 Getting Started

### 🌐 Option A: Live Demo (Zero Setup)

👉 **[expenxo.vercel.app](https://expenxo.vercel.app)** — Click **Sign up**, enter your company username, email, and password, and access the full dashboard immediately.

### 💻 Option B: Local Development

```bash
git clone https://github.com/jaypatel342005/Expense-Manager.git
cd Expense-Manager
npm install
# configure .env
npm run dev
```

### 🏗️ Option C: Production Build

```bash
npm run build   # prisma generate && next build
npm run start   # starts production server on port 3000
```

---

## 🔐 Environment Variables

Create a `.env` file at the project root:

```env
# ─── Database (TiDB Serverless / MariaDB / MySQL) ──────────────
DATABASE_URL="mysql://<user>:<password>@<host>:<port>/<database>?ssl=true"

# ─── Authentication ────────────────────────────────────────────
JWT_SECRET="your-super-secret-jwt-key"

# ─── ImageKit (Employee Avatars + CDN) ─────────────────────────
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY="your_imagekit_public_key"
IMAGEKIT_PRIVATE_KEY="your_imagekit_private_key"
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_imagekit_id"

# ─── App ───────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

> ⚠️ **Never commit `.env` to version control.** It is already listed in `.gitignore`.

---

## 🗂 Project Structure

```
Expense-Manager/
│
├── 📁 prisma/
│   ├── 📄 schema.prisma           # Data models: User, People, Transactions, Events…
│   └── 📁 migrations/             # Prisma migration history
│
├── 📁 public/
│   └── 🖼️ expenXO_logo.png        # Company branding — logo used on login, signup & sidebar
│
├── 📁 src/
│   ├── 📁 app/                    # Next.js 16 App Router
│   │   ├── 📄 layout.tsx          # Root layout (Geist font, theme provider)
│   │   ├── 📄 globals.css         # Tailwind v4 global CSS + CSS variable tokens
│   │   ├── 📁 (auth)/             # Auth routes → /login  /signup
│   │   ├── 📁 (dashboard)/        # Protected company dashboard routes
│   │   └── 📁 api/                # Server-side API route handlers
│   │
│   ├── 📁 components/
│   │   ├── 📁 ui/                 # shadcn/ui base components (Button, Dialog, Table…)
│   │   ├── 📁 calendar/           # Calendar module + People-linked event requests
│   │   └── 📁 ...                 # Charts, employee tables, expense forms, reports
│   │
│   ├── 📁 hooks/                  # Custom React hooks
│   ├── 📁 lib/                    # DB client, auth helpers, utility functions
│   └── 📁 types/                  # Global TypeScript type definitions
│
├── ⚙️  components.json            # shadcn/ui config (style: radix-vega, icons: lucide)
├── ⚙️  next.config.ts             # Next.js (ImageKit remote patterns, Server Actions 4 MB)
├── ⚙️  tailwind.config.ts         # Tailwind CSS v4 config
├── ⚙️  prisma.config.ts           # Prisma datasource (reads DATABASE_URL from env)
├── ⚙️  tsconfig.json              # TypeScript configuration
├── 📄 package.json                # Scripts, dependencies, devDependencies
└── ✨ README.md                   # This file
```

---

## 📊 Key Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.0.10 | Full-stack React framework (App Router + RSC) |
| `react` | 19.2.1 | UI rendering library |
| `typescript` | ^5 | Static type safety (98.5% of codebase) |
| `tailwindcss` | ^4 | Utility-first CSS with CSS variable theming |
| `@prisma/client` | ^7.2.0 | Type-safe ORM (auto-generated on build) |
| `@tidbcloud/serverless` | ^0.2.0 | TiDB Serverless MySQL-compatible driver |
| `@prisma/adapter-mariadb` | ^7.1.0 | MariaDB driver adapter for Prisma |
| `recharts` | ^3.6.0 | Company-wide income / expense charts |
| `@tanstack/react-table` | ^8.21.3 | Headless sortable + paginated data table |
| `react-hook-form` | ^7.71.2 | Performant form state management |
| `@hookform/resolvers` | ^5.2.2 | Zod integration for react-hook-form |
| `zod` | ^4.3.6 | Schema validation for all form inputs |
| `jose` | ^6.1.3 | JWT signing & verification for auth |
| `bcryptjs` | ^3.0.3 | Secure password hashing |
| `imagekit` | ^6.0.0 | ImageKit server SDK (upload / delete) |
| `imagekitio-next` | ^1.0.1 | Next.js ImageKit image component |
| `react-image-crop` | ^11.0.10 | Client-side image crop before upload |
| `papaparse` | ^5.5.3 | CSV parsing for bulk expense import |
| `xlsx` | ^0.18.5 | Excel report export for accounting |
| `react-dnd` | ^16.0.1 | Drag-and-drop record reordering |
| `react-dnd-html5-backend` | ^16.0.1 | HTML5 DnD backend |
| `cmdk` | ^1.1.1 | Command palette ⌘K for quick navigation |
| `sonner` | ^2.0.7 | Toast notification system |
| `next-themes` | ^0.4.6 | Dark / light / system theme switching |
| `react-day-picker` | ^9.13.0 | Calendar date picker component |
| `embla-carousel-react` | ^8.6.0 | Smooth carousel for calendar navigation |
| `date-fns` | ^3.6.0 | Date formatting and manipulation |
| `radix-ui` suite | various | Avatar, Dialog, Dropdown, Progress, Tooltip… |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/Expense-Manager.git
cd Expense-Manager
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Install, Configure & Develop

```bash
npm install
cp .env.example .env   # fill in credentials
npm run dev
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "Add: short description of your change"
```

### 5. Push & Open a Pull Request

```bash
git push origin feature/your-feature-name
```

Open a PR on GitHub with a clear description of what changed and why.

**Contribution ideas:**
- Role-based access control (Admin / Manager / Employee)
- Department-wise expense budgeting and alerts
- Approval workflow for expense submissions
- Multi-currency support with live exchange rates
- PDF report generation for accounting
- Email notifications for expense approvals
- Recurring expense scheduler
- Audit log for all financial changes

---

## 🚀 Future Roadmap

- 🔑 **Role-Based Access Control** — Admin, Manager, and Employee permission levels
- 🏬 **Department Management** — Group People by department; track budgets per department
- ✅ **Expense Approval Workflow** — Submit → Review → Approve / Reject pipeline
- 💰 **Budget Alerts** — Notify when department or category spending exceeds limits
- 🌍 **Multi-Currency** — Real-time exchange rate conversion for international operations
- 📄 **PDF Reports** — Download financial summaries as formatted PDF documents
- 📧 **Email Notifications** — Automated alerts for approvals, deadlines, and budget overruns
- 🔁 **Recurring Expenses** — Auto-log fixed monthly costs (rent, subscriptions, salaries)
- 📋 **Audit Logs** — Full change history for all financial records
- 📱 **PWA Support** — Installable app with offline access for field employees

---

## ☁️ Deployment

### Deploy on Vercel (Recommended)

1. Push your fork to GitHub
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. Add all [environment variables](#-environment-variables) in the Vercel project dashboard
4. Deploy — Vercel automatically runs `prisma generate && next build`

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jaypatel342005/Expense-Manager)

### Other Platforms

The app runs on any **Node.js 18+** platform:

```bash
npm run build   # prisma generate + next build
npm run start   # production server on port 3000
```

---

## 📜 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

- ✅ Commercial use · ✅ Modification · ✅ Distribution · ✅ Private use
- ⚠️ Must include original license and copyright notice

---

## 📞 Contact & Support

**Jay Patel** — Full-Stack Developer

📧 **Email:** [pateljay97378@gmail.com](mailto:pateljay97378@gmail.com)  
💼 **GitHub:** [@jaypatel342005](https://github.com/jaypatel342005)  
🌐 **Live App:** [expenxo.vercel.app](https://expenxo.vercel.app)

**Found a bug or have a question?** Open an [Issue](https://github.com/jaypatel342005/Expense-Manager/issues) on GitHub!

---

### ⭐ Show Your Support

If ExpenXO helped your company, please:

- ⭐ **Star** this repository on GitHub
- 🔗 **Share** it with your network
- 📢 **Contribute** via PRs or feature ideas
- 💬 **Give feedback** through GitHub issues

---

**Built for businesses that care about financial clarity · ExpenXO © 2024 | All Rights Reserved**

![Profile Views](https://komarev.com/ghpvc/?username=jaypatel342005&color=blueviolet)
