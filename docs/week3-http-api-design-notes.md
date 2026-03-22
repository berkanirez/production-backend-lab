# Hafta 3 - HTTP ve API Tasarımı Notları

## 1. HTTP methodları

- GET -> veri okumak için kullanılır
- POST -> yeni kaynak oluşturmak için kullanılır
- PATCH -> kaynağın bir kısmını güncellemek için kullanılır
- DELETE -> kaynağı silmek için kullanılır

## 2. Status code mantığı

- 200 OK -> başarılı okuma işlemleri
- 201 Created -> yeni kaynak oluşturuldu
- 204 No Content -> başarılı ama body dönülmeyecek işlemler
- 400 Bad Request -> input veya request hatası
- 401 Unauthorized -> kimlik doğrulama yok / geçersiz
- 403 Forbidden -> kimlik var ama yetki yok
- 404 Not Found -> kaynak bulunamadı
- 409 Conflict -> mevcut veriyle çakışma
- 500 Internal Server Error -> beklenmeyen sunucu hatası

## 3. Resource odaklı route tasarımı

İyi örnekler:
- GET /users
- POST /users
- GET /projects
- POST /projects
- GET /tasks
- POST /tasks

Kaçınılması gereken örnekler:
- /createUser
- /getAllProjects
- /makeTask

## 4. DTO mantığı

DTO, request veya response taşımak için kullanılan veri şeklidir.
Entity ile aynı olmak zorunda değildir.

Örneğin kullanıcı oluştururken:
- id
- createdAt
- updatedAt

gibi alanları istemeyiz.

## 5. Pagination

Pagination büyük veri listelerini kontrollü döndürmek için gereklidir.

Temel parametreler:
- page
- limit

## 6. Filtering ve sorting

Liste endpoint’lerinde query param ile:
- filtreleme
- sıralama
- sayfalama

yapılabilir.

Doğru akış sırası genelde:
1. filtreleme
2. sıralama
3. pagination

## 7. API contract

API contract, endpoint’in nasıl kullanılacağını tanımlayan teknik sözleşmedir.

Şunları netleştirir:
- method
- path
- request body
- query params
- success response
- error cases

## 8. Breaking change

Mevcut kullanan tarafı bozan API değişikliğidir.
Örneğin response alan isimlerini habersiz değiştirmek breaking change olabilir.