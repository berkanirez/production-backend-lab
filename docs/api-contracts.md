# API Contracts

Bu dosya, production-backend-lab projesindeki mevcut endpoint’lerin request ve response sözleşmelerini tanımlar.

---

## 1. GET /health

### Açıklama
Servisin ayakta olup olmadığını kontrol eder.

### Request Body
Yok

### Query Params
Yok

### Success Response
**Status:** `200 OK`

```json
{
  "status": "ok",
  "service": "production-backend-lab",
  "environment": "development",
  "timestamp": "2026-03-15T10:00:00.000Z"
}

Error Cases

Beklenmez. Beklenmeyen teknik hata olursa 500.

2. GET /info
Açıklama

Uygulama hakkında temel bilgileri döner.

Request Body

Yok

Query Params

Yok

Success Response

Status: 200 OK

{
  "success": true,
  "message": "Application info fetched successfully.",
  "data": {
    "name": "production-backend-lab",
    "version": "1.0.0",
    "environment": "development",
    "description": "Backend learning project for building a production-minded TypeScript API skeleton.",
    "features": [
      "TypeScript",
      "Express",
      "Environment configuration",
      "Typed API responses"
    ]
  }
}
Error Cases

Beklenmeyen teknik hata olursa 500.

3. GET /users
Açıklama

Kullanıcı listesini pagination, filtering ve sorting destekli şekilde döner.

Request Body

Yok

Query Params
page (opsiyonel, number string)
limit (opsiyonel, number string)
role (opsiyonel, admin | manager | member)
isActive (opsiyonel, "true" | "false")
sort (opsiyonel, name_asc | name_desc | createdAt_asc | createdAt_desc)
Örnek Query
/users?page=1&limit=2&role=admin&sort=name_asc
Success Response

Status: 200 OK

{
  "success": true,
  "message": "Users fetched successfully.",
  "data": [
    {
      "id": "u1",
      "createdAt": "2026-03-15T10:00:00.000Z",
      "updatedAt": "2026-03-15T10:00:00.000Z",
      "deletedAt": null,
      "name": "Berkan Irez",
      "email": "berkan@example.com",
      "role": "admin",
      "isActive": true
    }
  ],
  "meta": {
    "page": 1,
    "limit": 2,
    "totalItems": 1,
    "totalPages": 1
  }
}
Error Cases
Beklenmeyen teknik hata -> 500
4. GET /users/:id
Açıklama

Belirli bir kullanıcıyı ID’ye göre döner.

Request Body

Yok

Path Params
id (zorunlu)
Success Response

Status: 200 OK

{
  "success": true,
  "message": "User fetched successfully.",
  "data": {
    "id": "u1",
    "createdAt": "2026-03-15T10:00:00.000Z",
    "updatedAt": "2026-03-15T10:00:00.000Z",
    "deletedAt": null,
    "name": "Berkan Irez",
    "email": "berkan@example.com",
    "role": "admin",
    "isActive": true
  }
}
Error Cases
Kullanıcı bulunamazsa -> 404 Not Found
Beklenmeyen teknik hata -> 500

Örnek hata:

{
  "success": false,
  "message": "User not found.",
  "errorCode": "USER_NOT_FOUND"
}
5. POST /users
Açıklama

Yeni kullanıcı oluşturur.

Request Body
{
  "name": "Can Yılmaz",
  "email": "can@example.com",
  "role": "member",
  "isActive": true
}
Request Body Kuralları
name zorunlu
email zorunlu
role zorunlu
isActive opsiyonel
Success Response

Status: 201 Created

{
  "success": true,
  "message": "User created successfully.",
  "data": {
    "id": "u4",
    "createdAt": "2026-03-15T10:20:00.000Z",
    "updatedAt": "2026-03-15T10:20:00.000Z",
    "deletedAt": null,
    "name": "Can Yılmaz",
    "email": "can@example.com",
    "role": "member",
    "isActive": true
  }
}
Error Cases
Eksik alan -> 400 Bad Request
Aynı email zaten varsa -> 409 Conflict
Beklenmeyen teknik hata -> 500

Örnek conflict hatası:

{
  "success": false,
  "message": "A user with this email already exists.",
  "errorCode": "USER_EMAIL_ALREADY_EXISTS"
}
6. GET /projects
Açıklama

Proje listesini döner.

Request Body

Yok

Query Params

Şu an yok

Success Response

Status: 200 OK

{
  "success": true,
  "message": "Projects fetched successfully.",
  "data": [
    {
      "id": "p1",
      "createdAt": "2026-03-15T11:00:00.000Z",
      "updatedAt": "2026-03-15T11:00:00.000Z",
      "deletedAt": null,
      "name": "Production Backend Lab",
      "description": "Learning backend architecture with TypeScript.",
      "status": "active",
      "ownerId": "u1"
    }
  ]
}
Error Cases
Beklenmeyen teknik hata -> 500
7. POST /projects
Açıklama

Yeni proje oluşturur.

Request Body
{
  "name": "New CRM Project",
  "description": "New project for testing create flow",
  "ownerId": "u1",
  "status": "draft"
}
Request Body Kuralları
name zorunlu
description zorunlu
ownerId zorunlu
status opsiyonel
Success Response

Status: 201 Created

{
  "success": true,
  "message": "Project created successfully.",
  "data": {
    "id": "p3",
    "createdAt": "2026-03-15T11:30:00.000Z",
    "updatedAt": "2026-03-15T11:30:00.000Z",
    "deletedAt": null,
    "name": "New CRM Project",
    "description": "New project for testing create flow",
    "status": "draft",
    "ownerId": "u1"
  }
}
Error Cases
Eksik alan -> 400 Bad Request
owner user bulunamazsa -> 404 Not Found
Beklenmeyen teknik hata -> 500
8. GET /tasks
Açıklama

Task listesini pagination, filtering ve sorting destekli şekilde döner.

Request Body

Yok

Query Params
page (opsiyonel, number string)
limit (opsiyonel, number string)
status (opsiyonel, todo | in_progress | done)
projectId (opsiyonel)
assigneeId (opsiyonel)
sort (opsiyonel, title_asc | title_desc | createdAt_asc | createdAt_desc)
Örnek Query
/tasks?page=1&limit=2&status=done&sort=createdAt_desc
Success Response

Status: 200 OK

{
  "success": true,
  "message": "Tasks fetched successfully.",
  "data": [
    {
      "id": "t1",
      "createdAt": "2026-03-15T12:00:00.000Z",
      "updatedAt": "2026-03-15T12:00:00.000Z",
      "deletedAt": null,
      "title": "Set up project structure",
      "description": "Initialize folders and TypeScript configuration.",
      "status": "done",
      "assigneeId": "u1",
      "projectId": "p1"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 2,
    "totalItems": 1,
    "totalPages": 1
  }
}
Error Cases
Beklenmeyen teknik hata -> 500
9. POST /tasks
Açıklama

Yeni task oluşturur.

Request Body
{
  "title": "Prepare API docs",
  "description": "Write the first version of API documentation",
  "assigneeId": "u1",
  "projectId": "p1",
  "status": "todo"
}
Request Body Kuralları
title zorunlu
description zorunlu
assigneeId zorunlu
projectId zorunlu
status opsiyonel
Success Response

Status: 201 Created

{
  "success": true,
  "message": "Task created successfully.",
  "data": {
    "id": "t4",
    "createdAt": "2026-03-15T12:40:00.000Z",
    "updatedAt": "2026-03-15T12:40:00.000Z",
    "deletedAt": null,
    "title": "Prepare API docs",
    "description": "Write the first version of API documentation",
    "status": "todo",
    "assigneeId": "u1",
    "projectId": "p1"
  }
}
Error Cases
Eksik alan -> 400 Bad Request
assignee bulunamazsa -> 404 Not Found
project bulunamazsa -> 404 Not Found
Beklenmeyen teknik hata -> 500
10. Unknown Routes
Açıklama

Tanımsız route’lar standart JSON hata formatı ile döner.

Example

GET /unknown-route

Response

Status: 404 Not Found

{
  "success": false,
  "message": "Route not found: GET /unknown-route",
  "errorCode": "ROUTE_NOT_FOUND"
}