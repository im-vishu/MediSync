# 🏥 MediSync — Doctor Appointment Booking System

![License](https://img.shields.io/github/license/vishantchaudhary/medisync?color=dddddd&labelColor=000000)
![Top Language](https://img.shields.io/badge/Stack-PERN-blue?logo=postgresql&logoColor=white)
![PRs](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)

> Full-stack healthcare platform that allows patients to search, book, and manage doctor appointments with real-time availability tracking, providing a secure and efficient solution for medical scheduling needs.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Security](#-security)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## ✨ Features

### 👤 Patient Portal
- **Smart Search** — Filter doctors by specialization (Cardiology, Pediatrics, etc.)
- **Live Booking** — View real-time availability slots and book instantly
- **Dashboard** — Manage upcoming appointments and view medical history
- **Secure Auth** — JWT-based authentication with persistent sessions

### 🩺 Doctor Management
- **Schedule Builder** — Set custom weekly availability and break times
- **Patient Management** — View upcoming patient lists and appointment details
- **Status Control** — Accept, complete, or cancel appointments with automated status updates

### 🛠 Admin Panel
- **Verification** — Approve or reject doctor registrations
- **Platform Insights** — Analytics dashboard showing total users and booking trends
- **Data Control** — Manage global specializations and system-wide user accounts

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Context API, Tailwind CSS |
| **Backend** | Node.js, Express.js (MVC Architecture) |
| **Database** | PostgreSQL |
| **Auth** | JWT & Bcrypt |
| **API** | RESTful |

---

## 📁 Project Structure
```
medisync/
├── client/                  # React Frontend
│   └── src/
│       ├── components/      # Reusable UI (Buttons, Modals, Cards)
│       ├── hooks/           # Custom React Hooks
│       ├── pages/           # Dashboard, Home, Booking Views
│       └── services/        # Axios API Configuration
├── server/                  # Node/Express Backend
│   └── src/
│       ├── controllers/     # Business Logic / Request Handlers
│       ├── middleware/      # Auth, Validation, Error Handling
│       ├── models/          # PostgreSQL Queries & Schema Logic
│       └── routes/          # API Endpoints
└── .env                     # Environment Variables
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- PostgreSQL `v14+`
- NPM or Yarn

### Backend Setup
```bash
# Navigate to server
cd server

# Install dependencies
npm install

# Start development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to client
cd client

# Install dependencies
npm install

# Start React app
npm start
```

---

## 🔒 Environment Variables

Create a `.env` file in the `server/` directory:
```env
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/medisync
JWT_SECRET=your_secret_key_here
```

---

## 📡 API Reference

### Auth Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new patient | Public |
| `POST` | `/api/auth/login` | Login user | Public |

### Patient Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/doctors` | Get all verified doctors | Patient |
| `POST` | `/api/appointments` | Book an appointment | Patient |
| `GET` | `/api/appointments/my` | Get my appointments | Patient |

### Doctor Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/doctor/appointments` | Get upcoming patients | Doctor |
| `PATCH` | `/api/appointments/:id` | Update appointment status | Doctor |
| `PUT` | `/api/doctor/schedule` | Update availability slots | Doctor |

### Admin Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/doctors` | Get all doctor registrations | Admin |
| `PATCH` | `/api/admin/doctors/:id/verify` | Approve/reject doctor | Admin |
| `GET` | `/api/admin/analytics` | Platform insights | Admin |

---

## 🔐 Security

- **Stateless Auth** — JWT stored securely to prevent session hijacking
- **RBAC** — Role-Based Access Control middleware protects sensitive routes
- **Data Integrity** — SQL constraints ensure no double-bookings on same slot
- **Encryption** — Industry-standard password hashing using `bcryptjs`

---

## 📈 Roadmap

- [ ] **Telehealth** — Integrated video consultations via WebRTC
- [ ] **Payments** — Stripe integration for pre-paid consultations
- [ ] **Notifications** — Automated Email/SMS reminders via Twilio
- [ ] **Reviews** — Patient rating system for healthcare providers

---

## 📋 License

**MediSync** is open source software licensed as [MIT](./LICENSE).

---

## 👨‍💻 Author

**Vishant Chaudhary**

[![GitHub](https://img.shields.io/badge/GitHub-vishantchaudhary-181717?logo=github)](https://github.com/vishantchaudhary)
- MediSync Phase 1 Milestone 1/35: chore: initialize MediSync monorepo workspace

- MediSync Phase 1 Milestone 2/35: build(infra): configure PostgreSQL service in docker-compose.yml

- MediSync Phase 1 Milestone 3/35: build(infra): set up health checks and persistence for database container

- MediSync Phase 1 Milestone 4/35: feat(server): initialize Express.js application structure

- MediSync Phase 1 Milestone 5/35: feat(server): implement centralized environment configuration in env.js

- MediSync Phase 1 Milestone 6/35: feat(server): integrate helmet and cors for initial security hardening

- MediSync Phase 1 Milestone 7/35: feat(server): set up morgan logger and standardized middleware stack

- MediSync Phase 1 Milestone 8/35: build(server): initialize Prisma ORM with PostgreSQL provider

- MediSync Phase 1 Milestone 9/35: feat(server): define initial schema.prisma for Appointment Booking

- MediSync Phase 1 Milestone 10/35: feat(server): create api/v1/health check endpoint

- MediSync Phase 1 Milestone 11/35: feat(server): implement global error handling middleware

- MediSync Phase 1 Milestone 12/35: feat(server): configure server.js entrypoint with port listening logic

- MediSync Phase 1 Milestone 13/35: build(server): configure nodemon for development hot-reloading

- MediSync Phase 1 Milestone 14/35: chore(server): set up .env template for backend local development

- MediSync Phase 1 Milestone 15/35: build(client): initialize React project with Vite and Tailwind CSS

- MediSync Phase 1 Milestone 16/35: feat(client): configure Tailwind PostCSS and Autoprefixer integration

- MediSync Phase 1 Milestone 17/35: feat(client): set up VITE_API_URL environment mapping

- MediSync Phase 1 Milestone 18/35: feat(client): implement basic API fetching service utility

- MediSync Phase 1 Milestone 19/35: feat(client): create HealthBadge component for backend status monitoring

- MediSync Phase 1 Milestone 20/35: feat(client): design initial responsive Landing Page layout

- MediSync Phase 1 Milestone 21/35: feat(client): implement client-side routing architecture

- MediSync Phase 1 Milestone 22/35: build(root): configure monorepo scripts for concurrent development

- MediSync Phase 1 Milestone 23/35: build(root): add workspace management in root package.json

- MediSync Phase 1 Milestone 24/35: feat(server): implement database connection retry logic

- MediSync Phase 1 Milestone 25/35: feat(server): add prisma client generation scripts

- MediSync Phase 1 Milestone 26/35: chore(client): optimize asset directory and public folder structure

- MediSync Phase 1 Milestone 27/35: feat(client): add global styles and Tailwind base configurations

- MediSync Phase 1 Milestone 28/35: test: implement backend health check integration test

- MediSync Phase 1 Milestone 29/35: test: verify Docker container connectivity for PostgreSQL

- MediSync Phase 1 Milestone 30/35: build(migrations): generate initial Prisma migration baseline

- MediSync Phase 1 Milestone 31/35: feat(client): implement navigation bar with responsive mobile menu

- MediSync Phase 1 Milestone 32/35: feat(client): add shadcn-ui inspired layout components
