# ஆதனத் தரகர் — Aadana Tharakar Real Estate Platform

> **Tamil Nadu's #1 Real Estate Platform** — Buy, Sell, and Rent properties across all major Tamil Nadu cities with RERA verification, Vaastu compliance tracking, and WhatsApp-native lead management.

[![CI/CD](https://github.com/YOUR_ORG/nilaamnai/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_ORG/nilaamnai/actions)

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Tech Stack](#tech-stack)
3. [Local Development Setup](#local-development-setup)
4. [Environment Variables](#environment-variables)
5. [Running with Docker](#running-with-docker)
6. [Frontend (Next.js)](#frontend-nextjs)
7. [Backend (Spring Boot)](#backend-spring-boot)
8. [API Reference](#api-reference)
9. [Redis Cache Key Registry](#redis-cache-key-registry)
10. [Deployment (Production)](#deployment-production)
11. [GitHub Actions Secrets](#github-actions-secrets)
12. [Security Architecture](#security-architecture)

---

## Architecture Overview

```
Browser / Mobile
      │
      ▼
  Vercel (Next.js 15)
      │  /api/* → rewrites to →
      ▼
  Nginx Reverse Proxy (rate-limit + gzip + TLS)
      │
      ▼
  Spring Boot 3.2 (JDK 21)
      │         │
      ▼         ▼
 PostgreSQL 16  Redis 7
  (persistence)  (cache + rate-limit + JWT blacklist)
      │
      ▼
  Cloudinary (image/video CDN)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS |
| **State** | Zustand, TanStack Query |
| **Charts** | Recharts |
| **Tables** | TanStack Table |
| **Backend** | Spring Boot 3.2, Java 21, Spring Security, Spring Data JPA |
| **Database** | PostgreSQL 16 |
| **Cache / Sessions** | Redis 7 |
| **Auth** | JWT (JJWT 0.11.5) — 15m access / 7d refresh |
| **Media** | Cloudinary |
| **API Docs** | SpringDoc OpenAPI 3 (Swagger UI) |
| **CI/CD** | GitHub Actions + Docker + Vercel |
| **Proxy** | Nginx (Alpine) |

---

## Local Development Setup

### Prerequisites

- Java 21 (Eclipse Temurin recommended)
- Maven 3.9+
- Node.js 20+
- Docker & Docker Compose
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_ORG/nilaamnai.git
cd nilaamnai
```

### 2. Configure Environment Variables

```bash
cp .env.template .env
# Edit .env with your values (DB password, JWT secret, Cloudinary keys, etc.)
```

### 3. Start All Services with Docker Compose

```bash
docker-compose up -d
```

This starts:
- **PostgreSQL 16** on `localhost:5432`
- **Redis 7** on `localhost:6379`
- **Spring Boot API** on `localhost:8080`
- **Nginx** on `localhost:80`

### 4. Start the Frontend Development Server

```bash
npm install
npm run dev
# Visit http://localhost:3000
```

### 5. Access Swagger UI

```
http://localhost:8080/api/v1/swagger-ui.html
```

---

## Environment Variables

### Backend (`.env` at root)

| Variable | Default | Description |
|---|---|---|
| `DB_HOST` | `postgres` | PostgreSQL host |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_NAME` | `nilamnai_db` | Database name |
| `DB_USER` | `nilamnai_user` | Database username |
| `DB_PASSWORD` | — | **Required.** Strong password |
| `REDIS_HOST` | `redis` | Redis host |
| `REDIS_PORT` | `6379` | Redis port |
| `REDIS_PASSWORD` | — | Redis password (leave blank for local) |
| `JWT_SECRET` | — | **Required.** Min 256-bit key |
| `JWT_ACCESS_EXPIRATION_MS` | `900000` | Access token TTL (15 minutes) |
| `JWT_REFRESH_EXPIRATION_MS` | `604800000` | Refresh token TTL (7 days) |
| `CLOUDINARY_CLOUD_NAME` | — | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | — | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | — | Cloudinary API secret |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:3000` | Comma-separated allowed origins |

### Frontend (`.env.production`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Production backend URL |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (country code + number) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |

---

## Running with Docker

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f app

# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes DB data)
docker-compose down -v
```

### Building the Backend Image Only

```bash
cd backend
docker build -t nilaamnai-backend:latest .
```

---

## Frontend (Next.js)

### Directory Structure

```
app/
  (public)/          # Public pages (no auth)
    page.tsx           # Homepage
    properties/        # Property listings
    property/[slug]/   # Property detail
    location/[city]/   # City SEO pages
    flats-in-chennai/  # Static SEO landing
    villas-in-coimbatore/
    plots-in-madurai/
  (dashboard)/       # Protected dashboards
    admin/             # Admin dashboard
    agent/             # Agent dashboard
    builder/           # Builder dashboard
  layout.tsx           # Root layout + metadata
  sitemap.ts           # Dynamic sitemap
  robots.ts            # robots.txt generator
components/
  common/              # Navbar, Footer, JsonLd
  property/            # FilterPanel, PropertyCard, EMICalculator
  admin/               # AdminLayout, OverviewView, LeadsView
  agent/               # AgentLayout, AddPropertyForm
  builder/             # BuilderLayout, SubscriptionView
store/                 # Zustand stores
lib/                   # API client, utilities
types/                 # TypeScript type definitions
```

### Available Scripts

```bash
npm run dev      # Development server (Turbopack)
npm run build    # Production build
npm run start    # Production server
npx tsc --noEmit # Type checking only
```

---

## Backend (Spring Boot)

### Directory Structure

```
backend/src/main/java/com/nilaamnai/
  controller/          # REST controllers
  config/              # Security, Redis, Cloudinary, CORS configs
  dto/
    request/           # Request DTOs with Bean Validation
    response/          # Response DTOs
    validation/        # Custom validators (IndianPhone, ReraFormat)
  entity/              # JPA entities
  enums/               # Role, PropertyType, PropertyStatus, LeadStatus
  exception/           # Custom exceptions + GlobalExceptionHandler
  repository/          # Spring Data JPA repositories + Specifications
  security/            # JwtUtil, JwtAuthFilter, RateLimitFilter, SecurityHeadersFilter
  service/             # Service interfaces
    impl/              # Service implementations
```

### Building the Backend

```bash
cd backend
mvn clean package -DskipTests
java -jar target/nilamnai-backend-0.0.1-SNAPSHOT.jar
```

---

## API Reference

### Base URL

- **Local:** `http://localhost:8080/api/v1`
- **Production:** `https://api.nilaamnai.com/api/v1`

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | Public | Register new user |
| `POST` | `/auth/login` | Public | Login, get tokens |
| `POST` | `/auth/refresh-token` | Public | Rotate access token |
| `POST` | `/auth/logout` | Bearer | Blacklist token, revoke refresh |
| `GET` | `/health` | Public | Liveness probe |

### Properties

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/properties` | Public | List properties (paginated + filtered) |
| `GET` | `/properties/{slug}` | Public | Property detail |
| `POST` | `/properties` | Agent/Admin | Create property |
| `PUT` | `/properties/{id}` | Agent/Admin | Update property |
| `DELETE` | `/properties/{id}` | Admin | Delete property |

### Response Format

All responses follow the `ApiResponse<T>` envelope:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Validation failed",
  "data": {
    "phone": "Phone number must be a valid 10-digit Indian mobile number starting with 6-9",
    "reraNumber": "RERA number must follow Tamil Nadu format: TN/XXXXX/YYYY"
  }
}
```

---

## Redis Cache Key Registry

| Key Pattern | TTL | Description |
|---|---|---|
| `properties::{filterHash}` | 5 min | Paginated property listing cache |
| `property::{slug}` | 10 min | Individual property detail cache |
| `user::{id}` | 30 min | User profile cache |
| `ratelimit:public:{ip}` | 60 sec | Public IP rate-limit counter |
| `ratelimit:user:{email}` | 60 sec | Authenticated user rate-limit counter |
| `login_attempts:{ip}` | 900 sec (15 min) | Login attempt counter (brute-force guard) |
| `blacklist:{token}` | Token remaining TTL | Blacklisted JWT (logged-out tokens) |
| `refresh:{email}` | 7 days | Active refresh token per user |

---

## Deployment (Production)

### Backend (VPS)

1. Provision a VPS (Ubuntu 22.04 LTS recommended, min 2 CPU / 4 GB RAM)
2. Install Docker + Docker Compose
3. Clone repo to `/opt/nilaamnai`
4. Copy `.env.template` → `/opt/nilaamnai/.env` and fill secrets
5. Obtain TLS certificate: `certbot certonly --standalone -d api.nilaamnai.com`
6. Uncomment SSL directives in `nginx.conf`
7. Run: `docker-compose up -d --build`

### Frontend (Vercel)

1. Import the GitHub repository in the Vercel dashboard
2. Set root directory to `/` (monorepo root)
3. Add all `NEXT_PUBLIC_*` environment variables in Vercel → Settings → Environment Variables
4. Deploy: `git push origin main` triggers the CI/CD pipeline automatically

---

## GitHub Actions Secrets

Configure these in your GitHub repository → Settings → Secrets and Variables → Actions:

| Secret | Description |
|---|---|
| `VPS_HOST` | VPS IP address or hostname |
| `VPS_USER` | SSH username (e.g., `ubuntu`) |
| `VPS_SSH_KEY` | Private SSH key (PEM format) |
| `VPS_PORT` | SSH port (default 22) |
| `VERCEL_TOKEN` | Vercel API token |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |
| `NEXT_PUBLIC_API_URL` | Production backend URL |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number |
| `NEXT_PUBLIC_SITE_URL` | Production site URL |

---

## Security Architecture

### JWT Token Lifecycle

```
Login
  ↓
Generate Access Token (15 min) + Refresh Token (7 days)
Store Refresh Token in Redis: refresh:{email} → token
  ↓
Client uses Access Token for API calls
  ↓
JwtAuthFilter:
  1. Check Redis blacklist (blacklist:{token})
  2. Validate signature + expiry
  3. Set SecurityContext
  ↓
Token Refresh:
  POST /auth/refresh-token → validate refresh token against Redis
  Issue new Access Token (15 min)
  ↓
Logout:
  Blacklist Access Token: blacklist:{token} with TTL = remaining lifetime
  Delete Refresh Token: DELETE refresh:{email}
```

### Rate Limiting

| Endpoint type | Limit | Window | Redis Key |
|---|---|---|---|
| Public/anonymous | 100 req | 60 sec | `ratelimit:public:{ip}` |
| Authenticated | 1000 req | 60 sec | `ratelimit:user:{email}` |
| Login / Register | 5 attempts | 15 min | `login_attempts:{ip}` |

On breach: HTTP 429 with `Retry-After: <seconds>` header.

### Security Headers

| Header | Value |
|---|---|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Content-Security-Policy` | See `next.config.ts` |
| `Strict-Transport-Security` | Set at Nginx layer (HTTPS only) |

### Tamil Nadu Validation Rules

| Field | Rule |
|---|---|
| `phone` | 10 digits starting with 6-9 (`@IndianPhone`) |
| `reraNumber` | `TN/[A-Z0-9]{1,7}/YYYY` format (`@ReraFormat`) |

---

*Built with ❤️ for Tamil Nadu's real estate ecosystem.*
