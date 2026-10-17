<div align="center">

# 🗳️ Secure Online Voting System (SOVS)

**A mission-critical, role-governed digital democracy platform with cryptographic ballot verification.**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## ⚡ Overview

**SOVS** is an enterprise-grade digital voting portal designed for fair, transparent, and tamper-evident electoral administration. Built with the **MERN stack + TypeScript**, it enforces strict single-ballot integrity, dual-factor voter authentication, and real-time incident resolution across 4 constitutional tiers.

### ✨ Key Features
- **Zero-Knowledge Privacy**: Voter identities are decoupled from cast ballots.
- **One Person, One Vote**: Enforced via MongoDB compound unique indexes.
- **Cryptographic Receipts**: Generates a verifiable digital hash receipt for every ballot.
- **Geographic Hierarchies**: Area-locked elections (`State → District → Sub-District → Locality`).
- **Real-Time Dashboards**: Turnout statistics, incident logging, and grievance redressal.

---

## 👥 Roles & Demo Credentials

| Role | Login Type | Credentials | Access & Purpose |
| :--- | :--- | :--- | :--- |
| **Voter** | Aadhaar / ECI + OTP | **Aadhaar:** `1234-5678-9012`<br/>**OTP:** `123456` | Browse active elections, cast ballots & view receipts |
| **Election Officer** | Email & Password | `officer@securevote.gov.in`<br/>`Officer@1234` | Polling station oversight, live turnout & field incidents |
| **System Admin** | Email & Password | `admin@securevote.gov.in`<br/>`Admin@1234` | Create elections, candidates, manage users & locations |
| **Chief Election Comm.** | Email & Password | `cec@securevote.gov.in`<br/>`CEC@1234` | National analytics, electoral certification & apex audits |

---

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env     # Configure MONGODB_URI and JWT_SECRET
node seed/seeder.js      # Seed 4 official accounts & elections
node server.js           # Runs on http://localhost:5001
```

### 2. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev              # Runs on http://localhost:5173
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Recharts
- **Backend**: Node.js, Express, JWT, BCrypt, Helmet, Express-Rate-Limit
- **Database**: MongoDB Atlas with Mongoose ODM
- **Deployment**: Vercel (Frontend) & Render (Backend)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
