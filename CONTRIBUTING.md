# Contributing to WebSocket Kanban Board

Welcome! Follow these instructions to get the project up and running on your local machine.

## Prerequisites

- **Node.js**: v22 or higher
- **pnpm**: v10 or higher
- **MongoDB**: A running instance (for local development)
- **Docker & Docker Compose**: (for Docker development)

---

## Local Development (Normal)

This method allows for faster iterations and debugging.

### 1. Setup Environment
In the root directory, create a `.env` file:
```bash
cp .env.example .env
```
*Note: Ensure `MONGODB_URI` points to your local MongoDB instance (e.g., `mongodb://localhost:27017/kanban`).*

### 2. Install Dependencies
Install dependencies for both the frontend and backend:
```bash
# Install root/backend deps
cd backend && pnpm install

# Install frontend deps
cd ../frontend && pnpm install
```

### 3. Start Backend
```bash
cd backend
pnpm run dev
```
The backend will run at `http://localhost:5000`. You can verify it via `http://localhost:5000/health`.

### 4. Start Frontend
```bash
cd frontend
pnpm run dev
```
The frontend will run at `http://localhost:3000`.

---

## Running with Docker (Production-like)

This method builds optimized images and manages the database automatically.

### 1. Configure Environment
Ensure your `.env` file in the root directory has the correct credentials. The `docker-compose.yml` uses these to initialize the database.

### 2. Build and Start
Run the following command from the root directory:
```bash
docker-compose up -d --build
```

### 3. Verification
- **Frontend**: Accessible at `http://localhost:3000`
- **Backend Health**: Accessible at `http://localhost:5000/health`
- **Database**: Runs internally on port `27017`

### 4. Stopping
```bash
docker-compose down
```

---

## Testing

### Unit & Integration Tests
```bash
cd frontend
pnpm run test
```

### E2E Tests (Playwright)
Ensure the dev server is running, then:
```bash
cd frontend
pnpm run test:e2e
```
