# production-backend-lab

TypeScript ve Node.js backend temellerini öğrenmek için oluşturulmuş çalışma reposu.

## Proje amacı

Bu repo ile aşağıdaki konuların adım adım öğrenilmesi amaçlanmaktadır:

- TypeScript temel tip sistemi
- Node.js + Express backend iskeleti
- Modüler klasör yapısı
- Ortak API response yapısı
- Fake data ile endpoint geliştirme
- Sonraki aşamalarda error handling ve validation

## Mevcut klasör yapısı

```bash
src/
  common/
    http/
      response.ts
  config/
    env.ts
  data/
    fake-db.ts
  routes/
    health.route.ts
    info.route.ts
    project.route.ts
    user.route.ts
  types/
    api.types.ts
    domain.types.ts
  app.ts
  server.ts

 ## Scriptler
npm run dev
npm run build
npm start
npm run lint
npm run format

## Endpointler

GET /health

GET /info

GET /users

GET /projects

## Bu hafta öğrenilen ana konular

primitive types

union types

interface vs type

generic response modeli

fake data ile domain modelleme

## Error Strategy

This project uses centralized error handling.

### Error flow

Request -> Route -> Service -> Error thrown -> next(error) -> Error Middleware -> Standard error response

### Error categories

- BadRequestError -> 400
- UnauthorizedError -> 401
- ForbiddenError -> 403
- NotFoundError -> 404
- Unexpected errors -> 500

### Why centralized error handling?

- Prevents repeated error response code in every route
- Keeps response format consistent
- Separates business logic from HTTP error formatting
- Allows different behavior for development and production