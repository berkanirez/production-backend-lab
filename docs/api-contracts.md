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