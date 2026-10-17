# 🗳️ Secure Online Voting System (SOVS)

[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A modern, role-based online voting and election administration platform built for electoral oversight, voter integrity, cryptographic audit trails, and transparent democratic participation.

---

## 🏛️ 4 Official Platform Roles

The application strictly enforces **4 distinct administrative & participation roles**:

| Role | Role Name (हिन्दी) | Login Type | Credentials / Details | Primary Dashboard & Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Voter** | मतदाता | **Aadhaar / ECI + OTP** | **Aadhaar:** `1234-5678-9012`<br/>**ECI:** `ECI-VTR-001`<br/>**OTP:** `123456` | `/dashboard` & `/voter-dashboard`<br/>• Browse eligible active elections<br/>• Cast encrypted single-instance ballots<br/>• View cryptographic receipts & hashes<br/>• Submit feedback and location-based complaints |
| **Election Officer** | चुनाव अधिकारी | **Email & Password** | **Email:** `officer@securevote.gov.in`<br/>**Password:** `Officer@1234` | `/officer-dashboard`<br/>• District & polling station monitoring<br/>• Live turnout and hourly pattern analytics<br/>• Incident response & field resolution<br/>• Departmental complaints inbox |
| **Admin** | व्यवस्थापक | **Email & Password** | **Email:** `admin@securevote.gov.in`<br/>**Password:** `Admin@1234` | `/admin-dashboard` & `/admin`<br/>• Create & configure elections & candidates<br/>• Manage eligible voters & area restrictions<br/>• Geographic location hierarchy management<br/>• User management, blocking/unblocking & notices |
| **Chief Election Commissioner (CEC)** | मुख्य चुनाव आयुक्त | **Email & Password** | **Email:** `cec@securevote.gov.in`<br/>**Password:** `CEC@1234` | `/cec-dashboard`<br/>• Apex Commission oversight & analytics<br/>• Demographic & national turnout trends<br/>• Audit trail verification & certification<br/>• Apex complaint reviews |

---

## 📁 Repository Structure

```
SOVS/
├── frontend/                   # React 18 + Vite + TypeScript client application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── dashboards/ # Role dashboards (Admin, Officer, CEC, Voter)
│   │   │   │   ├── shared/     # Reusable hooks & election panels
│   │   │   │   ├── ui/         # Modern Shadcn/Tailwind UI primitives
│   │   │   │   ├── Login.tsx   # Multilingual login with role selector & OTP
│   │   │   │   ├── Dashboard.tsx # Voter gateway with automatic role routing
│   │   │   │   └── Root.tsx    # App root provider wrapper
│   │   │   ├── lib/
│   │   │   │   ├── config.ts   # Centralized environment-aware API URL resolver
│   │   │   │   ├── auth.ts     # Client auth service & session management
│   │   │   │   └── elections.ts# Local election services & data types
│   │   │   ├── routes.tsx      # React Router definition with role routes
│   │   │   └── App.tsx         # Main entry component
│   │   └── styles/             # Tailwind CSS tokens & global styles
│   ├── .env.example            # Frontend environment variable template
│   ├── vercel.json             # Vercel SPA routing rewrite rules
│   ├── package.json
│   └── vite.config.ts          # Vite configuration & dev server proxy
│
├── backend/                    # Node.js + Express REST API server
│   ├── config/
│   │   └── db.js               # MongoDB connection with Windows SRV DNS fallback
│   ├── middleware/
│   │   └── auth.js             # JWT verification & role-based route guard
│   ├── models/                 # Mongoose schema definitions
│   │   ├── User.js             # User accounts, roles, bcrypt hashing
│   │   ├── Election.js         # Elections, candidates, geographic scope
│   │   ├── Vote.js             # Encrypted votes, compound unique index
│   │   ├── Incident.js         # Booth glitches & field incidents
│   │   ├── Feedback.js         # Voter feedback & complaints routing
│   │   ├── Location.js         # Hierarchical geographical registry
│   │   ├── Notice.js           # Administrative broadcast notices
│   │   └── AuditLog.js         # Immutable security & activity audit trail
│   ├── routes/                 # Express API routes
│   │   ├── auth.js             # OTP voter login & staff credential auth
│   │   ├── dashboard.js        # Overview metrics for all 4 roles
│   │   ├── elections.js        # Election CRUD, candidate management
│   │   ├── votes.js            # Vote casting, receipts, verification
│   │   ├── incidents.js        # Incident logging & resolution
│   │   ├── feedback.js         # Feedback submission & authority responses
│   │   ├── locations.js        # Location hierarchy endpoints
│   │   ├── notices.js          # Voter notices & announcements
│   │   └── users.js            # User administration & voter blocking
│   ├── seed/
│   │   └── seeder.js           # Database seeder with 4 official demo roles
│   ├── .env.example            # Backend environment variable template
│   ├── package.json
│   └── server.js               # Express application entry point
│
├── .gitignore                  # Monorepo ignore rules (node_modules, .env, dist)
└── README.md                   # Full platform documentation
```

---

## ⚡ Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18, v20, or v22 recommended)
- [npm](https://www.npmjs.com/) (v9+)
- [MongoDB Atlas](https://www.mongodb.com/) account or local MongoDB instance

---

### 1️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

Configure your `.env` file:
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/securevote?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=30m
OTP_SECRET=123456
CLIENT_URL=http://localhost:5173
```

Seed the default database collections and 4 official accounts:
```bash
node seed/seeder.js
```

Start the backend server:
```bash
node server.js
```
The backend API starts on **`http://localhost:5001`**.

---

### 2️⃣ Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
The frontend starts on **`http://localhost:5173`**.

---

## 🔒 Security Architecture

1. **Role-Based Access Control (RBAC)**:
   - Middleware `protect` verifies incoming JWT bearer tokens.
   - Middleware `authorize(...roles)` ensures users only execute operations permitted for their role.
2. **One-Vote Guarantee**:
   - Compound unique index on `{ userId: 1, electionId: 1 }` prevents a voter from casting more than one vote per election.
   - Immediate atomic decrement & turnout tracking prevents race conditions.
3. **Anonymized Vote Records**:
   - Ballot records are stored with cryptographic hashes (`generateHash`).
   - `toJSON` transforms strip voter identity, candidate selections, and IP addresses when returning audit queries.
4. **Resilient Network Handling**:
   - Built-in DNS resolver configuration (`8.8.8.8`, `1.1.1.1`) ensures SRV connection string resolution for MongoDB Atlas across Windows environments.
   - Dynamic API routing automatically targets localhost in local development and production URLs in cloud environments.

---

## 🚀 Cloud Deployment

### Backend on Render
- **Environment**: Node
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Environment Variables**: Add `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`.

### Frontend on Vercel
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**: Set `VITE_API_URL` to your Render backend URL (e.g. `https://your-backend.onrender.com/api`).
- [vercel.json](file:///c:/Users/Pawan/OneDrive/Desktop/SOVS%20(1)/SOVS/frontend/vercel.json) already includes client-side SPA route rewrites for `/index.html`.

---

## 📜 License
This project is licensed under the [MIT License](LICENSE).
