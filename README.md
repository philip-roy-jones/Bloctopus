# Bloctopus – Microservice Architecture Demo

Built as part of the **CS 361 course at Oregon State University**, Bloctopus is a microservice-based task management system demonstrating:

✅ Microservice architecture  
✅ JWT authentication with Kong API Gateway  
✅ Email verification and password reset flows  
✅ Distributed messaging with Redis + RabbitMQ  
✅ Docker Compose orchestration with NGINX proxy  
✅ MySQL + PostgreSQL + Redis databases  
✅ CI-ready testing with Vitest and modular TypeScript

---

## 📹 Demo Video

Watch the 2:51 demo here: [https://www.youtube.com/watch?v=-CmsmjxCOIQ](https://www.youtube.com/watch?v=-CmsmjxCOIQ)

[![Demo Video Thumbnail](https://img.youtube.com/vi/-CmsmjxCOIQ/0.jpg)](https://www.youtube.com/watch?v=-CmsmjxCOIQ)

---

## 🧱 Architecture Overview

- **Frontend**: React (decoupled)
- **Auth Service**: Node.js + Express + Prisma + MySQL  
- **Task Service**: Node.js + Express + Prisma + MySQL  
- **Suggestions Service**: Python + FastAPI (built by teammate)  
- **Notifications Service**: Node.js + BullMQ + Redis + RabbitMQ  
- **Queue System**: 
  - Redis + BullMQ used to schedule reminders  
  - RabbitMQ used for inter-service communication  
- **API Gateway**: Kong with JWT plugin (RS256), backed by PostgreSQL  
- **Proxy Layer**: NGINX for central routing  
- **Database Stack**:
  - MySQL used by main services
  - PostgreSQL used **only** for Kong

All services are containerized via Docker Compose and communicate internally using a private Docker network.

---

## 🔔 Task Reminder Flow

Tasks are scheduled by users in the Task Service.  
The Notifications Service uses **BullMQ** to schedule an email **10 minutes before the task start time**.  
Reminders are sent via email using SendGrid and NodeMailer logic inside the Notifications Service.

---

## 🚫 Not Deployed Publicly

Due to its resource footprint (over 2 GB RAM in Docker Compose), this system exceeds the limits of most free-tier hosting services.  
Demo is available upon request.

---

## 🧠 What I Learned

- Architected a microservice system with a mix of languages and databases
- Built secure JWT-based authentication using Kong API Gateway (RS256 public key verification)
- Used Prisma with MySQL for transactional logic
- Managed cross-service communication using RabbitMQ and BullMQ for timed job scheduling
- Deployed and debugged complex services using Docker Compose
- **Learned when microservices are overkill for solo devs 😅**

---

## 📁 Codebase Highlights

- [`authService.ts`](./services/auth/src/services/authService.ts) – Email verification, log ins, secure password hashing
- [`notifications/src/queues/index.ts`](./services/notifications/src/queues/index.ts) – BullMQ integration for scheduling reminders
- [`kong.yml`](./infrastructure/kong/deck.yaml) – API Gateway config with RS256 JWT plugin
- [`docker-compose.yml`](./docker-compose.yml) – Full orchestration of all services

---

## 🗂️ Repo Structure (Simplified)
```plaintext
apps/
└── web_app/ # React frontend (Vite) served independently

services/
├── auth/ # Handles user registration, login, JWT issuing, email verification
├── tasks/ # Manages task creation, completion, and scheduling
├── notifications/ # Listens via RabbitMQ; uses BullMQ + Redis to schedule reminders
├── suggestions/ # Python + FastAPI service (by teammate) for task suggestions

infrastructure/
├── kong/ # Kong config files (e.g., deck.yml)
├── nginx/ # NGINX proxy config (e.g., default.conf)
├── database-inits/ # SQL init scripts for bootstrapping databases with proper grants

.github/workflows/
└── auth.yml # GitHub Actions workflow for CI (auth service)

root/
├── docker-compose.yml # Orchestrates all services
├── docker-compose.override.yml # Dev overrides (e.g., volume mounts, ports)
├── public.pem # JWT public key for Kong RS256 verification
└── .env # Root-level environment file (shared vars if any)
```

---

## 🧑‍💻 Credits

- **Main Developer**: Philip Jones  
- **Teammate**: [Fuhai Feng](https://github.com/FuhaiFeng) - Contributed the Suggestions Service (Python + FastAPI)
