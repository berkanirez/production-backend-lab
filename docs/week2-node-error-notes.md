# Hafta 2 - Node.js Async Akış ve Hata Yönetimi Notları

## 1. Call stack

Call stack, o anda çalışmakta olan fonksiyonları takip eder.

## 2. Event loop

Event loop, senkron kod tamamlandıktan sonra Node.js’in asenkron işleri yönetmesine yardımcı olur.

## 3. setTimeout ve Promise.then farkı

`setTimeout` değeri 0 olsa bile callback hemen çalışmaz.  
`Promise.then` callback’leri, timer callback’lerinden önce çalışabilir.

## 4. async function

Bir `async` fonksiyon her zaman bir `Promise` döner.

- `return` -> resolved promise
- `throw` -> rejected promise

## 5. Sıralı ve paralel async çalışma

Sıralı çalışma:
`await a(); await b();`

Paralel çalışma:
`await Promise.all([a(), b()])`

Eğer işler birbirinden bağımsızsa, paralel çalıştırmak daha verimli olabilir.

## 6. I/O-bound ve CPU-bound farkı

- I/O-bound: veritabanı, dosya sistemi, API, storage gibi dış kaynakları bekleyen işler
- CPU-bound: ağır hesaplama, büyük döngüler, pahalı veri işleme işlemleri

## 7. Business error ve unexpected error farkı

Business error, sistemin beklediği ama olumsuz olan durumlardır:
- validation hatası
- kayıt bulunamaması
- yetkisiz erişim

Unexpected error ise teknik veya sistemsel problemlerdir:
- kodlama hatası
- undefined üzerinde işlem yapma
- çökme/crash

## 8. Custom error class’lar

Özel hata sınıfları, farklı hata türlerini daha açık ve kontrollü temsil etmeyi sağlar.

Örnekler:
- BadRequestError
- UnauthorizedError
- ForbiddenError
- NotFoundError

## 9. Merkezi error middleware

Her route içinde hatayı manuel formatlamak yerine, hata `next(error)` ile yukarı taşınır ve tek bir merkezde response’a çevrilir.

## 10. Bu yaklaşım neden önemli?

Bu yaklaşım kodu:
- daha temiz
- bakımı daha kolay
- daha tutarlı
- büyütülmesi daha kolay

hale getirir.