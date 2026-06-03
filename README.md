# Boligmappa 

## Teknologi

- Backend: .NET 8 Web API 
- Frontend: React + TypeScript + React Query

## Kjør prosjektet

Terminal 1 (backend):

```bash
cd backend
dotnet build
dotnet ./bin/Debug/net8.0/backend.dll
```

Backend kjører på:

- http://localhost:5000
- Swagger: http://localhost:5000/swagger

Terminal 2 (frontend):

```bash
cd frontend
pnpm install
pnpm start
```

Frontend kjører på:

- http://localhost:3000

Frontend-proxy peker til backend på port 5000.

## Hva som fungerer

- Liste dokumenter per propertyId
- Opprette dokument
- Redigere dokument
- Slette dokument
- Velge eksisterende propertyId
- Generere ny propertyId

## Kort om data

- Backend bruker in-memory data
- Seed-data lastes ved oppstart
