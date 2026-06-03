# Fullstack Starter (Backend + Frontend)

This workspace contains:

- `backend`: .NET 8 Web API with Swagger enabled in Development
- `frontend`: Create React App (TypeScript) managed with pnpm

## Prerequisites

- .NET 8 SDK
- Node.js 18+
- pnpm (`npm i -g pnpm` if needed)

## Run Backend

```bash
cd backend
dotnet run
```

If you run from Git Bash on Windows and `dotnet run` fails to start the app `.exe`, use:

```bash
cd backend
dotnet ./bin/Debug/net8.0/backend.dll --urls http://localhost:5231
```

Backend URLs (from launch settings):

- `http://localhost:5231`
- `https://localhost:7180`

Swagger UI is available in Development at:

- `http://localhost:5231/swagger`
- `https://localhost:7180/swagger`

## Run Frontend

```bash
cd frontend
pnpm start
```

Frontend runs at:

- `http://localhost:3000`

## Frontend <-> Backend Connection

The frontend is configured with a CRA dev proxy in `frontend/package.json`:

```json
"proxy": "http://localhost:5231"
```

The React app calls `/api/health`, which is served by the backend endpoint in `backend/Program.cs`.

## Quick Start (Two Terminals)

Terminal 1:

```bash
cd backend
dotnet run
```

Terminal 2:

```bash
cd frontend
pnpm start
```

Open `http://localhost:3000` and verify the API status is shown as `ok`.
