# MediSync — Doctor Appointment Booking Platform

## About

MediSync is a full-stack doctor appointment booking system that connects patients with healthcare providers. It enables real-time slot booking, robust role-based access control (Patient/Doctor/Admin), and secure JWT authentication for seamless and secure medical management.

---

## 🚦 Project Status

**Phase 3 Complete!**

- [x] Frontend and backend boilerplate in place (React, Node.js/Express, Prisma)
- [x] Database models and migrations applied (User, Doctor, Specialization, Slot, Appointment, HealthCheck)
- [x] User authentication & role-based access (Patient/Doctor/Admin) with JWT
- [x] Doctor slot creation & management
- [x] Patient appointment booking & viewing
- [x] Doctor views their patient appointments
- [x] All API endpoints protected and tested

### **Next Up (Phase 4+)**
- Admin interfaces (approve doctors, manage users & appointments)
- Appointment status workflows (confirm, cancel, complete)
- Notifications (email/SMS)
- Dashboard analytics & UI enhancements

---

## 🏗️ Project Structure

```
MediSync/
├─ client/          # React + Vite + Tailwind frontend
├─ server/          # Node.js + Express + Prisma backend
│  ├─ src/
│  │  ├─ controllers/
│  │  ├─ middleware/
│  │  ├─ routes/
│  │  ├─ utils/
│  │  └─ ...
│  ├─ prisma/
│  │  ├─ schema.prisma
│  │  └─ migrations/
│  └─ .env
├─ infra/
│  └─ docker-compose.yml
├─ package.json
└─ README.md
```

---

## ⚡ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, Prisma ORM, bcrypt (hashing), JWT (authentication)
- **Database:** PostgreSQL (Docker Compose)
- **Dev:** Nodemon, concurrently, express-validator

---

## 🚀 Getting Started

### 1. **Clone & Install Dependencies**

```sh
git clone <your-repo-url> MediSync
cd MediSync
npm install
```

### 2. **Configure Environment**

**server/.env**
```env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://medisync_user:medisync_pass@localhost:5433/medisync_db?schema=public"
JWT_SECRET=your-jwt-secret
FRONTEND_URL=http://localhost:5173
```

**client/.env**
```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 3. **Start Database**

```sh
docker compose -f infra/docker-compose.yml up -d
```

### 4. **Run Migrations & Generate Prisma Client**

From **root** (preferred):
```sh
npm run prisma:generate -w server
npm run prisma:migrate -w server
```
Or from **server/** folder:
```sh
npm run prisma:generate
npm run prisma:migrate
```

### 5. **Add Demo Specializations (Manual via Prisma Studio)**

```sh
npx prisma studio -w server
# Add `Cardiology`, `Dermatology`, etc.
```

### 6. **Start Both Client and Server**

From root:
```sh
npm run dev
# Client:  http://localhost:5173/
# Server:  http://localhost:5000/api/v1/health
```

---

## 🔒 API Overview

### **Auth Endpoints**
- `POST /api/v1/auth/register`  — Patient/doctor registration
- `POST /api/v1/auth/login`     — Login and receive JWT
- `GET /api/v1/auth/me`         — Authenticated user details

### **Doctor Endpoints**
- `POST /api/v1/slots`          — Create available slots **(DOCTOR)**
- `GET /api/v1/slots/mine`      — List my slots  **(DOCTOR)**
- `GET /api/v1/appointments/my-patients` — My patient appointments **(DOCTOR)**

### **Patient Endpoints**
- `GET /api/v1/slots/doctor/:doctorId`   — See a doctor’s available slots **(PATIENT)**
- `POST /api/v1/appointments/book`       — Book appointment **(PATIENT)**
- `GET /api/v1/appointments/mine`        — My appointments **(PATIENT)**

### **Admin (Phase 4+)**
- (Coming soon)

---

## 🧪 Example Requests

### **Register Patient**
```http
POST /api/v1/auth/register
{
  "name": "Patient One",
  "email": "patient@example.com",
  "password": "secret123"
}
```

### **Register Doctor**
```http
POST /api/v1/auth/register
{
  "name": "Dr. Jane Doe",
  "email": "doctor@example.com",
  "password": "secret123",
  "role": "DOCTOR",
  "doctor": {
    "licenseNo": "DOC-001",
    "specializationId": 1
  }
}
```

### **Login**
```http
POST /api/v1/auth/login
{
  "email": "doctor@example.com",
  "password": "secret123"
}
```

### **Create Slots (Doctor)**
```http
POST /api/v1/slots
Authorization: Bearer <JWT>
{
  "slots": [
    { "startTime": "2026-04-08T09:00:00Z", "endTime": "2026-04-08T09:30:00Z" },
    { "startTime": "2026-04-08T10:00:00Z", "endTime": "2026-04-08T10:30:00Z" }
  ]
}
```

### **Book Appointment (Patient)**
```http
POST /api/v1/appointments/book
Authorization: Bearer <JWT>
{
  "slotId": 1
}
```

---

## ⏭️ Roadmap

- [ ] Phase 4: Admin panel, analytics, doctor approval/rejection
- [ ] Appointment status workflow (confirm/cancel)
- [ ] Notifications (email/SMS)
- [ ] Modern frontend dashboards

---

## 🤝 Contributing

1. Fork and branch (`feature/my-feature`)
2. Open PR
3. Follow code style in client/server

---

## 📝 License

MIT

---

## 🙋‍♂️ Maintainer

- [im-vishu](https://github.com/im-vishu)

---

PRs, feedback, and enhancements welcome!
- MediSync Booking Milestone 1/10: feat(prisma): add Slot and Appointment models with status enums to schema

- MediSync Booking Milestone 2/10: build(prisma): apply migrations and re-generate Prisma Client for Phase 3

- MediSync Booking Milestone 3/10: feat(server): implement POST /v1/slots for Doctor availability management

- MediSync Booking Milestone 4/10: feat(server): implement GET /v1/slots/mine for personal Doctor schedules

- MediSync Booking Milestone 5/10: feat(server): implement GET /v1/slots/doctor/:id for Patient discovery

- MediSync Booking Milestone 6/10: feat(server): implement POST /v1/appointments/book with atomic slot locking

- MediSync Booking Milestone 7/10: feat(server): implement GET /v1/appointments/mine for Patient history
