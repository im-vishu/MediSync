# MediSync - Docter Appointment Booking System

**MediSync** is a full-stack healthcare platform template with robust role-based authentication, user registration for patients/doctors/admin, secure JWT authentication, and a modern frontend-backend codebase with PostgreSQL and Prisma ORM.

---

## 🏗️ Project Structure

```
MediSync/
├─ client/         # React + Vite + Tailwind frontend (Patient/Doctor/Admin UI)
├─ server/         # Node.js + Express + Prisma backend (API & business logic)
│  ├─ src/         
│  │  ├─ controllers/
│  │  ├─ middleware/
│  │  ├─ routes/
│  │  ├─ utils/
│  │  ├─ app.js
│  │  └─ server.js
│  ├─ .env
│  └─ prisma/
│      ├─ schema.prisma
│      └─ (migrations…)
├─ infra/
│  └─ docker-compose.yml    # PostgreSQL via Docker
├─ package.json             # Monorepo yarn/npm workspaces
└─ README.md
```

---

## ⚡ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, Prisma ORM, bcrypt, JWT
- **Database:** PostgreSQL (local Docker container)
- **Dev tooling:** nodemon, concurrently, express-validator

---

## 🚀 Getting Started

### 1. **Clone & Install**

```bash
git clone <your-repo-url> MediSync
cd MediSync
npm install           # Installs all workspaces (client & server)
```

### 2. **Configure Environment**

- Copy & fill in required `.env` files:

**`server/.env`**
```env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://medisync_user:medisync_pass@localhost:5433/medisync_db?schema=public"
JWT_SECRET=replace_this_with_a_random_secret
FRONTEND_URL=http://localhost:5173
```

**`client/.env`**
```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 3. **Start Database (Postgres via Docker Compose)**

```bash
docker compose -f infra/docker-compose.yml up -d
```
> ⚠️ If you get "port already allocated", edit `docker-compose.yml` to use an open port (e.g. `5433:5432`) and update your `.env`.

### 4. **Apply Prisma Database Schema & Migrations**

```bash
npm run prisma:generate -w server
npm run prisma:migrate -w server
```

#### (Optional) Add demo rows to "Specialization" table:
```bash
npx prisma studio -w server    # Use web UI to add Cardiology, etc.
```

### 5. **Start the Full Stack (Both Client & Server)**

From project root:
```bash
npm run dev
# client:  http://localhost:5173
# server:  http://localhost:5000/api/v1/health
```

---

## 🔒 Phase 2: Authentication & Role-Based Access

### ✏️ Account Registration
- `/api/v1/auth/register` — Register as patient or doctor
- `/api/v1/auth/login`    — Login, receive JWT token
- `/api/v1/auth/me`       — Get current user (JWT required)

### 🩺 Doctor registration requires:
- `name`, `email`, `password`, `role=DOCTOR`
- `doctor.licenseNo`, `doctor.specializationId`

### 👤 Patient registration requires:
- `name`, `email`, `password`, `role=PATIENT` (default)

### 🗝️ Protected/API access
- To access protected endpoints:  
  Use `Authorization: Bearer <token>` header with your JWT.

---

## 🧪 Example API Usage

**Register Patient**
```http
POST /api/v1/auth/register
Content-Type: application/json
{
  "name": "Vishu",
  "email": "patient@example.com",
  "password": "changeme"
}
```

**Register Doctor**
```http
POST /api/v1/auth/register
Content-Type: application/json
{
  "name": "Dr. Sinha",
  "email": "drsinha@example.com",
  "password": "changeme",
  "role": "DOCTOR",
  "doctor": {
    "licenseNo": "ABC-123X",
    "specializationId": 1     // (get from Specializations list)
  }
}
```

**Login**
```http
POST /api/v1/auth/login
{
  "email": "drsinha@example.com",
  "password": "changeme"
}
```

**Get Current User (JWT required)**
```http
GET /api/v1/auth/me
Authorization: Bearer <your-jwt-token>
```

---

## 🛠️ Run Backend or Frontend ONLY

- **Server (API):**
  ```
  cd server
  npm run dev
  ```
- **Client (React):**
  ```
  cd client
  npm run dev
  ```

---

## 🤝 Contributing

1. Fork the repo
2. Open a branch (`feature/xyz`)
3. Open a PR

---

## 📝 License

MIT

---

## 🙋‍♂️ Maintainer

- [im-vishu](https://github.com/im-vishu)

---

PRs and suggestions welcome!