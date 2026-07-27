# Full-Stack Developer Hiring Assessment Solution

This repository contains a two-project system comprising a Next.js frontend dashboard 
and a Node.js/Express REST API built with strict layered architecture, security standards, and end-to-end Zod schema validations.

## Project Structure

```text
ishtari-Ass-Submission/
├── dashboard-nextjs/   # Next.js (App Router) Frontend Dashboard
├── api-nodejs/         # Express REST API (Layered Architecture: Route → Controller → Service → Model)
└── README.md           # Main Project Documentation


## Environment Configuration

Create ".env.local" inside dashboard-nextjs/ and ".env" inside api-nodejs/ based on their respective ".env.example" files

## Running the Dashboard (dashboard-nextjs)

cd dashboard-nextjs
npm install
npm run dev

Open http://localhost:3000 in your browser.


## Running the API (api-nodejs)

Without PM2 (Standard Development Mode):
    cd api-nodejs
    npm install
    npm run dev

With PM2 (Production Mode):
    cd api-nodejs
    npm install
    npx pm2 start ecosystem.config.js 
    npx	pm2	restart	api-nodejs 
    npx	pm2	logs api-nodejs 
    npx	pm2	stop api-nodejs


## PM2 Operational Guide ( Loop Restart Troubleshooting )

If the process is restarting in a loop, verify the following:

- Log Check: Run npx pm2 logs api-nodejs or inspect ./logs/error.log for unhandled runtime exceptions or syntax errors.

- Environment Variables: Verify .env configuration (PORT, JWT_SECRET). Ensure the configured PORT isn't already occupied by another application.

- Ecosystem Paths: Ensure script: "./index.js" inside ecosystem.config.js correctly points to your valid entry point.

- Dependencies: Verify all runtime dependencies are installed (npm install).


## API Endpoints & curl Testing 

Set Authorization Token Variable :
    $TOKEN = node -e "console.log(require('jsonwebtoken').sign({ userId: 'tester' }, 'jwt_secret'))"

Health Check (GET /health):
    curl.exe -i http://localhost:3001/health

Get All Products (GET /api/products):
    curl.exe -i -H "Authorization: Bearer $TOKEN" http://localhost:3001/api/products

Get Product by ID (GET /api/products/:id):
    curl.exe -i -H "Authorization: Bearer $TOKEN" http://localhost:3001/api/products/1

Create Product (POST /api/products):
    curl.exe -i -X POST http://localhost:3001/api/products `-H "Authorization: Bearer $TOKEN" ` -H "Content-Type: application/json" ` -d '{"name": "Playground Product", "status": "active"}'

Update Product Status (PUT /api/products/:id/status):
    curl.exe -i -X PUT http://localhost:3001/api/products/1/status `-H "Authorization: Bearer $TOKEN" `-H "Content-Type: application/json" ` -d '{"status": "out_of_stock"}'

Test Authentication Rejection (401 Unauthorized):
    curl.exe -i http://localhost:3001/api/products


## Architectural Assumptions

- In-Memory Store: Product persistence relies on an in-memory collection simulating asynchronous database CRUD operations.

- Interactive UI: The frontend uses Next.js App Router client components ("use client") for real-time status filtering and search.


## Security Notes

- JWT Authentication: Protected routes enforce and verify Bearer tokens before executing controller logic.

- Zod Payload Validation: HTTP request bodies pass through strict Zod schemas before reaching business services.

- Safe Output Logging: Custom middleware logs essential HTTP metadata (method, path, status, latency) without leaking credentials or raw payloads.

- Centralized Error Handling: Global error middleware catches exceptions and hides stack traces from production clients. 

## Key Improvements Beyond Requirements

- Comprehensive .gitignore file: Set up .gitignore to prevent committing sensitive environment variables (.env), heavy dependency folders (node_modules), and runtime log files (logs/) to keep the repository clean and secure.

- Interactive UI Badging & Filtering: Built dynamic status badges (active, inactive, out_of_stock) with color-coded visual indicators, alongside live search and status dropdown filtering.

- Dedicated Empty State UI: Built a clear "No products found" fallback UI on the frontend when search or status filters return zero matching items, distinguishing empty search results from general network or API errors.
