# 🩺 MediSync — Doctor Appointment Booking System

MediSync is a production-grade doctor appointment booking platform built for clinics and hospitals.  
Designed with robust security, scalable architecture, clean modular code, and a modern developer experience.

---

## ✨ Key Features

- 🧑‍⚕️ Role-based portals for Admin, Doctor, and Patient
- 📅 Real-time slot/appointment booking & doctor schedules
- 🔑 Secure JWT authentication (access + refresh)
- 💾 Durable database storage (PostgreSQL or MongoDB)
- 🚦 Redis-powered caching (performance & sessions)
- 📬 Email/SMS notifications (pluggable providers)
- 📱 Fully responsive, mobile-ready SPA frontend
- 🧑‍🔬 Automated CI for test, lint, build, and deployment
- 🔒 Secret and code scanning in CI/CD pipelines

---

## 🧱 Tech Stack

### Frontend
- React 18+ (with TypeScript)
- Vite (lightning-fast build/dev)
- Tailwind CSS (utility-first styling)
- React Router v6+
- Axios or React Query (API state/fetch)
- Jest + React Testing Library
- Storybook (component-driven UI, optional)

### Backend
- Node.js with Express.js (TypeScript recommended)
- PostgreSQL or MongoDB database
- Redis (caching, session, queue)
- JWT & refresh tokens with RBAC
- Nodemailer (email), Twilio (SMS, optional)
- Winston or Pino (structured logging)
- Joi or Zod (input validation)
- Jest (testing)

### DevOps & Quality
- Docker and docker-compose for service orchestration
- GitHub Actions (CI/CD: lint, type, migrate, test, deploy)
- Environment variable/secrets management
- API docs via Swagger/OpenAPI
- Prettier, ESLint formatting
- Gitleaks secret scanning

---

## 🗂️ Project Structure

```text
medisync-doctor-appointment-booking-system/
├─ .github/
│  └─ workflows/
│     ├─ ci.yml            # CI: lint, test, scan, migrate
│     └─ deploy.yml        # Deploy and healthcheck
├─ docs/                   # Docs and screenshots
│
├─ server/
│  ├─ src/
│  │  ├─ api/              # Route/controllers
│  │  ├─ config/           # Env, DB, CORS configs
│  │  ├─ middleware/
│  │  ├─ models/           # ORM/ODM schemas
│  │  ├─ services/         # Business logic, emails, slots
│  │  ├─ utils/            # Helpers
│  │  ├─ validation/       # Input validation
│  │  ├─ app.ts            # Express app setup
│  │  └─ server.ts         # App entrypoint
│  ├─ tests/               # Unit/integration tests
│  ├─ package.json
│  └─ .env.example
│
├─ client/
│  ├─ public/
│  ├─ src/
│  │  ├─ api/
│  │  ├─ assets/
│  │  ├─ components/
│  │  ├─ context/
│  │  ├─ hooks/
│  │  ├─ pages/
│  │  ├─ routes/
│  │  ├─ styles/
│  │  └─ utils/
│  ├─ tests/
│  ├─ package.json
│  └─ .env.example
│
├─ docker/                 # Docker-compose & service configs
├─ scripts/                # Seed/setup/deploy scripts
├─ .env.example            # Root env example (if monorepo)
├─ README.md
├─ LICENSE
└─ package.json            # Monorepo/dev scripts (optional)
```

> This layout is modular, scalable, and matches production best practices as the project grows.

---

## ⚙️ Environment Variables

Copy and edit `.env.example` as `.env` for both server and client.

**Example: `server/.env.example`**
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=medisync
DB_PASS=medisync
DB_NAME=medisync
JWT_SECRET=super-long-secret
JWT_REFRESH_SECRET=another-secret
REDIS_URL=redis://localhost:6379/0
EMAIL_HOST=smtp.mail.com
EMAIL_PORT=587
EMAIL_USER=service@mail.com
EMAIL_PASS=yourpassword
FRONTEND_URL=http://localhost:5173
```

**Example: `client/.env.example`**
```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 🚀 Quick Start

```bash
git clone https://github.com/im-vishu/medisync-doctor-appointment-booking-system.git
cd medisync-doctor-appointment-booking-system
npm install
cp server/.env.example server/.env
cp client/.env.example client/.env
npm run dev
```

- Frontend: http://localhost:5173/
- API: http://localhost:5000/

---

## ✅ Development Commands

```bash
# Lint & format
npm run lint
npm run format

# Backend tests
cd server && npm run test

# Frontend tests
cd client && npm run test

# Type checks (TypeScript)
npm run typecheck

# Run migrations (if using SQL)
npm run migrate
```

---

## 🔄 CI/CD

### CI (`.github/workflows/ci.yml`)
- Secret/code scan (Gitleaks)
- Start database/Redis services
- Lint, format, typecheck, migrate, and test with coverage
- API docs deployment

### Deploy (`.github/workflows/deploy.yml`)
- Trigger on push to `main`
- Runs deploy steps
- Health/readiness check on deploy (`/api/v1/ready`)

---

## 🩺 Health Endpoints

- `GET /api/v1/health` — server up check
- `GET /api/v1/ready` — DB/Redis dependencies ready

---

## 🔐 Required GitHub Secrets

- Cloud provider credentials (deployment)
- Healthcheck URL
- Gitleaks and CI secrets as needed

---

## 🏷️ Versioning

```bash
git tag vX.Y.Z
git push origin vX.Y.Z
```
- Semantic versioning — bump version for each release.

---

## 🤝 Contributing

1. Branch from `main` (feature/your-feature)
2. Keep commits focused and atomic
3. Open PR with clear title/description
4. Ensure all CI checks pass before merge

---

## 📄 License

MIT. See `LICENSE` file.

---

_MediSync © 2026 im-vishu and contributors_