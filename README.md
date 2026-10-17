# 🗳️ Secure Online Voting System (SOVS)

[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

A secure, role-based online voting and election administration platform built for electoral oversight, voter integrity, and transparent democratic participation.

---

## 📁 Repository Structure

```
SOVS/
├── frontend/                   # React + TypeScript + Vite client application
│   ├── src/                    # Components, dashboards, routes, and styles
│   │   ├── app/                # Application modules & pages
│   │   │   ├── components/     # UI, Dashboards, Elections, Login, Results, etc.
│   │   │   ├── lib/            # Auth, state utilities, and cryptographic helpers
│   │   │   └── routes.tsx      # Application routing
│   │   └── styles/             # Tailwind CSS & theme tokens
│   ├── package.json
│   └── vite.config.ts          # Vite configuration with /api backend proxy
│
├── backend/                    # Node.js + Express API server
│   ├── config/                 # Database & environment configurations
│   ├── middleware/             # Authentication & validation middleware
│   ├── models/                 # Mongoose schemas (User, Election, Vote, Incident)
│   ├── routes/                 # REST API endpoints (Auth, Elections, Votes, etc.)
│   ├── seed/                   # Database seed scripts
│   ├── .env.example            # Environment variables template
│   ├── package.json
│   └── server.js               # Express server entry point
│
├── .gitignore                  # Monorepo ignore rules (node_modules, .env, dist)
└── README.md                   # Project documentation
```

---

## ⚡ Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (v9+)
- MongoDB Atlas cluster or local MongoDB instance

---

### 1️⃣ Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secrets

# Start the backend server
node server.js
```

The backend API will run on **`http://localhost:5001`**.

#### Environment Variables (`backend/.env`):
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/securevote?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=30m
OTP_SECRET=123456
CLIENT_URL=http://localhost:5173
```

---

### 2️⃣ Frontend Setup

```bash
# Navigate to the frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application will run on **`http://localhost:5173`** with an automated proxy forwarding `/api` calls directly to `http://localhost:5001`.

---

## 👥 Role-Based Access & Demo Credentials

| Role | Email | Password / OTP | Responsibilities |
| :--- | :--- | :--- | :--- |
| **System Admin** | `admin@securevote.gov.in` | `Admin@1234` | Full system control, create elections, manage users |
| **District Magistrate (DM)** | `dm@securevote.gov.in` | `DM@5678` | District election oversight, booth allocations |
| **Sub-Divisional Magistrate (SDM)** | `sdm@securevote.gov.in` | `SDM@9012` | Sub-district administration, incident management |
| **Chief Development Officer (CDO)** | `cdo@securevote.gov.in` | `CDO@3456` | Booth infrastructure, turnout metrics |
| **Verified Voter** | `voter@example.com` | OTP Flow (`VTR-001-2026`) | Cast encrypted ballots, view verification receipts |

---

## 🛡️ Security Features

- **Rate Limiting & DDoS Defense**: Strict IP-based request throttling using `express-rate-limit`.
- **Encrypted Ballots**: Cryptographic simulation of vote hashes ensuring tamper-proof records.
- **Secure Authentication**: Salted BCrypt password hashing and JWT token authorization.
- **HTTP Header Hardening**: Secured with `helmet` middleware.
- **Protected Environment**: Sensitive connection strings and secrets excluded from version control.

---

## 📜 License
This project is licensed under the MIT License.
