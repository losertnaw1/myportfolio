# Lê Quốc Đạt — Software Engineer Portfolio Design Spec

## 1. Intent & Positioning
Build a high-craft, bilingual (`EN` / `VI`) portfolio in **Next.js (App Router + TypeScript + Tailwind CSS)** for **Lê Quốc Đạt**, positioned as a **Software Engineer specializing in Fullstack Web/Desktop & Industrial Automation Systems**.

Key differentiator: End-to-end engineering ownership bridging factory-floor hardware (**PLC, MES, Industrial Camera / Machine Vision for Cross-Belt Sorting**) with modern backend (**C# / .NET 6+, Node.js / NestJS, Erlang**) and client interfaces (**React, Next.js, Vue.js, Electron**).

## 2. Information Architecture & Content Filtering
- **Curated CV Content** (student CRUD clones like SOICT clone and teaching schedules are omitted to keep the profile senior and focused):
  - **Personal Profile**: Lê Quốc Đạt (DOB: Dec 21, 1998 | Hanoi, Vietnam | `0364261898` | `quale.2112@gmail.com` | `https://github.com/losertnaw1`).
  - **Education & Training**: Thuy Loi University (Information Technology, 2017–2023), FPT Software Academy (Fresher NodeJS, 2021–2022), Edso Labs JSC (Frontend Developer Internship, 2021).
  - **Featured Experience & Projects on Main Page (`/`)**:
    1. **Industrial Support & Automation Systems (Mar 2024 – Present | Team of 1, End-to-End Owner)**: Umbrella showcase with prominent CTA link to `/automation` where all individual automation projects live.
    2. **HOFURI — Currency Trading System (Aug 2021 – Mar 2024 | Team of 30)**: UI detailed design, Atomic Design System, Vue.js web application optimization.
    3. **VHTMSC & VHTSMSC — Telecom Signaling & Message Flow Systems (Mar 2021 – Jul 2021 | Teams of 6 & 14)**: Hardware failure alarm signaling & multi-threaded message flow systems on Linux/Eclipse/Erlang/Mnesia.
- **Dedicated Automation Projects Page (`/automation`)**:
  - Designed so each automation project is a self-contained **Case Study Block** with:
    - Project ID, Title (`EN`/`VI`), Period/Role, Category tags (`PLC / MES`, `Machine Vision`, `Cross-Belt Sorting`, `Desktop / HMI`).
    - Multi-image gallery / architecture diagram preview with interactive **Lightbox modal** for zooming.
    - Structured description (`EN`/`VI`), Key Highlights, and Technical Stack badges.
  - Pre-populated with realistic, well-structured blocks derived from the CV's industrial automation scope (Cross-Belt Sorting Vision System, PLC Production Line Telemetry & MES Reporting, Industrial Camera Post-Processing & Calibration Tool, On-Site Factory Control HMI) stored in a single clean data file (`src/data/portfolio.ts`) so the user can easily edit/add projects and drop images into `public/images/automation/`.

## 3. Visual Style (Option A — Tech & Industrial Precision)
- **Theme**: Deep Obsidian/Slate (`#070B12` / `#0F172A`) with subtle technical grid background, ambient radial spotlight, and Emerald (`#10B981`) + Cyan (`#06B6D4`) + Amber (`#F59E0B`) telemetry accents.
- **Components**:
  - Floating glassmorphic `Navbar` with animated status pulse, navigation links, `/automation` badge link, `EN | VI` toggle, and CV download action.
  - Hero section with live interactive **End-to-End System Pipeline widget** (`PLC / Camera ↔ C# .NET 6+ Core ↔ React / Electron HMI`).
  - Bento Grid for Technical Skills (Languages, Frontend/Desktop, Backend/Databases, Industrial & Protocols).
  - Featured Software & Industrial Experience section with spotlight cards.
  - Quick Contact & Footer with one-click copy for Email (`quale.2112@gmail.com`) and Phone (`0364261898`).

