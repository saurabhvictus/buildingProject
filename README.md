# 🏢 Building Temperature Management System

A full-stack application to simulate and manage temperature across apartments and common rooms.

---

## 🚀 Tech Stack

* Frontend: Next.js (React)
* Backend: Spring Boot (Java)
* Database: PostgreSQL (via Docker)
* Containerization: Docker + Docker Compose

---

## 📦 Project Structure

```bash
buildingProject/
│
├── frontend/     # Next.js app
├── backend/      # Spring Boot app
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Prerequisites

You only need:

* ✅ Docker & Docker Compose
* ✅ Git

Optional (only for manual run):

* Node.js (v18+)
* Java 17

👉 **No need to install PostgreSQL manually** — Docker handles it.

---

## 🐳 Run the Project (Recommended)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd buildingProject
```

---

### 2. Build backend

```bash
cd backend
./mvnw clean install -DskipTests
cd ..
```

---

### 3. Start everything

```bash
docker-compose up --build
```

---

### 4. Open in browser

* Frontend → http://localhost:3000
* Backend → http://localhost:8080

---

## 🗄️ Database

Managed automatically by Docker:

* DB Name: `building_db`
* User: `postgres`
* Password: `admin`
* Port: `5432`

---

## ⚠️ IMPORTANT

### 🔴 If PostgreSQL is installed locally

👉 STOP it before running Docker

Otherwise:

* Port conflicts (5432)
* Wrong DB connection
* Data mismatch issues

---

## 🧪 Verify Data (Optional)

```bash
docker exec -it postgres psql -U postgres -d building_db
```

```sql
SELECT * FROM apartment_entity;
```

---

## 🧹 Reset Project

```bash
docker-compose down -v
docker system prune -a
docker-compose up --build
```

---

## 💻 Run Without Docker (Optional)

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

👉 In this case, you MUST install PostgreSQL locally.

---

## 🐞 Common Issues

### ❌ Data not showing in pgAdmin

Cause:

* Connected to local PostgreSQL instead of Docker

Fix:

* Stop local PostgreSQL
* Reconnect to Docker DB

---

### ❌ Port already in use

Cause:

* PostgreSQL already running locally

Fix:

* Stop service or change port

---

## 👨‍💻 Author

Saurabh Singh

---

## ⭐ Summary

* Fully local setup (no cloud needed)
* One command to run everything
* Docker handles backend + DB + frontend
