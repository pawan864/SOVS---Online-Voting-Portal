# 🗳️ Secure Online Voting System · `SOVS v2.0`

> **Enterprise Digital Electoral Infrastructure**  
> *End-to-End Cryptographic Ballot Privacy · 4-Tier RBAC Governance · Geofenced Demographics*

[![Stack](https://skillicons.dev/icons?i=react,ts,nodejs,express,mongodb,tailwind,vite)](https://github.com/pawan864/SOVS---Online-Voting-Portal)

---

### 💡 What is SOVS?

SOVS is a digital democracy platform engineered for sovereign electoral commissions. It provides tamper-proof ballot casting, dual-factor voter authentication, and real-time governance dashboards for field officers and commission leadership.

---

### ⚡ Architectural Highlights

| 🔐 Zero-Knowledge Privacy | 🛡️ Single-Ballot Integrity |
| :--- | :--- |
| Voter identities are mathematically decoupled from candidate selections. Every ballot yields an immutable verification hash. | Enforced by database-level compound unique constraints (`userId` + `electionId`), making ballot stuffing impossible. |

| 📍 Geofenced Electoral Scope | 📊 Operational Command Center |
| :--- | :--- |
| Dynamic 4-level territorial filtering (`State → District → Sub-District → Locality`) locks ballots to registered voter constituencies. | Live turnout tracking, EVM/booth glitch resolution, and citizen grievance redressal across administrative tiers. |

---

### 👥 Access Matrix & Demo Accounts

| Role / Authority | Login Method | Demo Credentials | Dashboard Scope |
| :--- | :--- | :--- | :--- |
| **Voter** | Aadhaar / ECI + OTP | **Aadhaar:** `1234-5678-9012`<br/>**OTP:** `123456` | Cast encrypted votes & download digital receipts |
| **Election Officer** | Official Email | `officer@securevote.gov.in`<br/>`Officer@1234` | Polling station oversight & incident resolution |
| **System Admin** | Official Email | `admin@securevote.gov.in`<br/>`Admin@1234` | Election configuration, candidate lists & voter access |
| **Chief Election Comm.** | Official Email | `cec@securevote.gov.in`<br/>`CEC@1234` | National turnout analytics & electoral certification |

---

### 💻 Run Locally

```bash
# 1. Clone repository
git clone https://github.com/pawan864/SOVS---Online-Voting-Portal.git
cd SOVS---Online-Voting-Portal

# 2. Start Backend API (Port 5001)
cd backend && npm install
cp .env.example .env && node seed/seeder.js && node server.js

# 3. Start Frontend Client (Port 5173)
cd ../frontend && npm install && npm run dev
```

---

### 🧰 Technology

```yaml
Frontend : React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Recharts
Backend  : Node.js, Express.js, JWT, BCrypt, Helmet, Express-Rate-Limit
Database : MongoDB Atlas (Mongoose ODM)
Hosting  : Vercel (Client SPA) & Render (REST API)
```

---

<p align="center">
  <sub>MIT License · Secure Online Voting System · Election Commission of India Simulation</sub>
</p>
