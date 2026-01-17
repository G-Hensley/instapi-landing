# InstAPI Post-MVP Roadmap

This document captures the full vision for InstAPI beyond the initial landing page. Reference this when building Phase 2 after validating demand.

---

## Phase 2: Full Application

### Core App Features

- **User Authentication**: Google + GitHub OAuth via NextAuth
- **Project Management**: Save/load designs to database, private by default
- **API Design Wizard**: Guided flow (not drag-and-drop canvas)
- **Code Generation Engine**: Node.js/Express + Prisma + Postgres
- **Export Options**:
  - Zip download
  - OpenAPI spec

---

## Wizard Flow Design

### Step 1: Project Setup
- Name your project
- Choose architecture: Monolithic (MVP) or Microservices (post-MVP)

### Step 2: Define Services (Microservices only)
- "How many services do you need?"
- Name each service (e.g., "users-service", "orders-service")

### Step 3: Define Resources
- For each service (or the monolith), define resources
- Input: comma-separated list (e.g., "users, orders, products")

### Step 4: Configure Each Resource

**Fields:**
- Name, type, required, unique, default value
- Supported types:
  - Basic: string, number, boolean, date
  - Complex: arrays, nested objects
  - Relationships: foreign keys to other resources

**Endpoints:**
- GET all (with pagination, filtering)
- GET one by ID
- POST (create)
- PUT (update)
- DELETE

**Auth Requirements:**
- Per-endpoint toggle for authentication required
- Role-based access (future)

**Relationships:**
- Foreign keys (user_id references users)
- Nested routes generated (e.g., `/users/:id/orders`)

### Step 5: Global Settings
- Auth strategy: JWT (MVP), API keys, OAuth providers (post-MVP)
- Database: Postgres (MVP), MySQL, SQLite, MongoDB (post-MVP)
- Export format: OpenAPI, Postman collection

### Step 6: Generate & Download
- Preview generated structure
- Download as zip or push to GitHub (post-MVP)

---

## Generated Code Features

Every generated backend includes:

### Security (Built-in)
- JWT authentication with refresh tokens
- Input validation (Zod schemas)
- Rate limiting middleware
- CORS configuration
- Security headers (Helmet)
- SQL injection prevention (Prisma)

### Production-Ready
- Error handling middleware with proper status codes
- Health check endpoints (`/health`, `/ready`)
- Environment config (.env.example template)
- Docker + docker-compose files
- Logging setup (structured JSON logs)

### Testing
- Unit tests for all routes
- Integration test setup
- Test database configuration

### Documentation
- OpenAPI 3.0 spec auto-generated
- Inline code comments
- README with setup instructions

---

## Post-MVP Enhancements

### Architecture Options
- [ ] **Microservices**: Separate deployable services
  - Monorepo or separate repos (user choice)
  - Service-to-service communication patterns
  - Shared database vs database per service

### Additional Auth Options
- [ ] **API Keys**: For machine-to-machine auth
- [ ] **OAuth Providers**: Google, GitHub, etc. in generated code
- [ ] **Role-based Access Control**: Admin, user, custom roles

### Multiple Languages
- [ ] Python/FastAPI
- [ ] Go (Gin or Echo)
- [ ] Java/Spring Boot
- [ ] Ruby on Rails
- [ ] PHP/Laravel

### Multiple Databases
- [ ] MySQL
- [ ] SQLite
- [ ] MongoDB
- [ ] Redis (caching layer)

### Integrations
- [ ] **GitHub Push**: Push generated code directly to a branch
- [ ] **Postman Collection Export**: Import directly into Postman
- [ ] **CI/CD Templates**: GitHub Actions, GitLab CI configs

### Collaboration
- [ ] **Sharing**: Public/private project toggle
- [ ] **Forking**: Clone and modify others' public designs
- [ ] **Team Workspaces**: Shared projects and templates
- [ ] **Version History**: Track changes to designs

### AI Features
- [ ] **Natural Language Input**: "Create a user API with email, password, and profile picture"
- [ ] **Voice Input**: Describe your API, let AI structure it
- [ ] **Smart Suggestions**: Recommend fields based on resource name

---

## Business Model

### Pricing Tiers

| Tier | Price | Credits | Features |
|------|-------|---------|----------|
| Free | $0 | 1 backend total | Max 3 endpoints, TypeScript only, no tests/docs export |
| Pay-as-you-go | $29/credit | 1 | Unlimited endpoints, all features |
| Pro | $29/mo | 1/month (rollover cap 4) | $22 per extra credit, priority support |
| Team | $99/mo | 6/month (rollover cap 8) | $19 per extra credit, team workspace, shared templates |

### Credit System
- 1 credit = 1 published backend with unlimited endpoints
- Credits are used on publish/export
- Pro/Team unused credits roll over (capped)

---

## Technical Architecture (Full App)

```
src/
├── app/
│   ├── (marketing)/          # Landing page, pricing
│   ├── (app)/                # Authenticated app
│   │   ├── dashboard/        # User's projects
│   │   ├── project/[id]/     # Design wizard
│   │   └── settings/         # Account settings
│   └── api/
│       ├── auth/             # NextAuth routes
│       ├── projects/         # CRUD for projects
│       └── generate/         # Code generation endpoint
├── components/
│   ├── wizard/               # Wizard step components
│   ├── ui/                   # Shared UI components
│   └── forms/                # Form components
├── lib/
│   ├── generator/            # Code generation engine
│   │   ├── templates/        # Handlebars/EJS templates
│   │   ├── express/          # Express-specific generators
│   │   └── prisma/           # Prisma schema generators
│   ├── auth/                 # Auth utilities
│   └── db/                   # Database client
└── prisma/
    └── schema.prisma         # App database schema
```

### Database Schema (App)

```prisma
model User {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String?
  image     String?
  projects  Project[]
  createdAt DateTime  @default(now())
}

model Project {
  id          String    @id @default(cuid())
  name        String
  schema      Json      // The API design as JSON
  userId      String
  user        User      @relation(fields: [userId], references: [id])
  isPublic    Boolean   @default(false)
  forkedFrom  String?   // ID of original if forked
  versions    Version[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Version {
  id        String   @id @default(cuid())
  projectId String
  project   Project  @relation(fields: [projectId], references: [id])
  schema    Json
  createdAt DateTime @default(now())
}
```

---

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| UX Approach | Guided wizard | Simpler than canvas, better for this use case |
| MVP Architecture | Monolithic only | Reduce complexity, add microservices later |
| MVP Auth | JWT only | Most common, add OAuth/API keys later |
| Code Gen | Server-side | Keep templates proprietary, easier updates |
| Persistence | Yes (Supabase) | Enables save/share/fork features |
| AI for MVP | No | Keep scope tight, validate core value first |

---

## Success Metrics

### Landing Page (Phase 1)
- Waitlist signups
- Conversion rate (visit → signup)
- Language preferences distribution

### Full App (Phase 2)
- Backends generated
- User retention (return to generate more)
- Time from signup to first generation
- Credit purchase rate
- NPS score

---

*Last updated: January 2026*
