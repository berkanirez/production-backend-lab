# API Kuralları

## 1. HTTP Methodları

### GET
Kaynak okumak için kullanılır.

Örnekler:
- GET /health
- GET /info
- GET /users
- GET /users/:id
- GET /projects

### POST
Yeni kaynak oluşturmak için kullanılır.

Örnekler:
- POST /users
- POST /projects
- POST /tasks

### PATCH
Kaynağın bir kısmını güncellemek için kullanılır.

Örnek:
- PATCH /users/:id

### DELETE
Kaynağı silmek için kullanılır.

Örnek:
- DELETE /users/:id

---

## 2. Status Code Kuralları

### 200 OK
Başarılı okuma işlemlerinde kullanılır.

### 201 Created
Yeni kaynak başarıyla oluşturulduğunda kullanılır.

### 204 No Content
İşlem başarılı ama response body dönülmeyecekse kullanılır. Genelde delete işlemlerinde tercih edilir.

### 400 Bad Request
Geçersiz input veya hatalı istek durumunda kullanılır.

### 401 Unauthorized
Kimlik doğrulama eksik veya geçersizse kullanılır.

### 403 Forbidden
Kullanıcı doğrulanmış ama yetkisi yoksa kullanılır.

### 404 Not Found
İstenen kaynak bulunamadığında kullanılır.

### 409 Conflict
İstek mevcut veriyle çakıştığında kullanılır.

### 500 Internal Server Error
Beklenmeyen sunucu hatalarında kullanılır.

---

## 3. İdempotency

### Genelde idempotent olan methodlar
- GET
- PUT
- DELETE

### Genelde idempotent olmayan method
- POST

PATCH ise iş mantığına göre idempotent olabilir veya olmayabilir.

---

## 4. Hata Response Standardı

Standart hata response yapısı:

```json
{
  "success": false,
  "message": "Hata mesajı",
  "errorCode": "ERROR_CODE"
}

## 5. Mevcut API Notları
GET endpoint’leri başarılıysa 200 döner
Tekil kaynak aramalarında kayıt yoksa 404 döner
Tanımsız route’lar standart JSON 404 döner
Business error’lar custom error class’larla yönetilir
Beklenmeyen hatalar 500 olarak ele alınır