# User Management System

A React + Vite-based user management system with Ant Design UI, Cypress E2E tests, and Docker support for production deployment.

---
##  Getting Started (Locally)

### 1. Install dependencies

```bash
pnpm install
```

> You can also use `npm install` or `yarn`, but `pnpm` is recommended.

### 2. Start the development server

```bash
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

##  Run E2E Tests with Cypress

### Interactive mode

```bash
pnpm test:e2e
```

This will:
- Start the Vite dev server
- Open the Cypress test runner
- Run tests against your live dev server

### Headless/CI mode

```bash
pnpm test:e2e:ci
```

This runs Cypress in headless mode for CI pipelines or quick checks.

---

## Run in Docker (Production)

### 1. Build the Docker image

```bash
docker build -t user-management-app .
```

### 2. Run the container

```bash
docker run -p 3000:80 user-management-app
```

Then open [http://localhost:3000](http://localhost:3000) to see the production build.

---