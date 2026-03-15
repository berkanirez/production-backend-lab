# Week 1 - TypeScript Notes

## 1. TypeScript neden var?

TypeScript, JavaScript'e tip güvenliği ekler.
Kod çalışmadan önce bazı hataları yakalamayı sağlar.

## 2. Compile time vs runtime

- Compile time: Kod çalışmadan önce kontrol edilen aşama
- Runtime: Kod gerçekten çalışırken olan aşama

TypeScript compile time'da yardımcı olur.
Ama runtime hataları için validation ve error handling gerekir.

## 3. Primitive types

- string
- number
- boolean
- null
- undefined

## 4. Optional field

Bir alanın zorunlu olmamasını sağlar.

Örnek:
`bio?: string`

## 5. Union type

Bir alanın birden fazla tip veya sabit değerden birini almasını sağlar.

Örnek:
`role: "admin" | "user"`

## 6. Interface ve type

- interface: nesne yapıları için sık kullanılır
- type: union, literal ve yardımcı tipler için esnektir

## 7. BaseEntity mantığı

Birden fazla modelde ortak alan varsa tekrar yazmamak için ortak yapı oluşturulur.

Örnek ortak alanlar:
- id
- createdAt
- updatedAt
- deletedAt

## 8. Generic

Generic, aynı yapının farklı veri tipleriyle çalışmasını sağlar.

Örnek:
`ApiSuccessResponse<T>`

## 9. Interface vs helper function

- interface: veri şekli tanımlar
- helper function: çalışan kod olarak veri üretir

## 10. any neden risklidir?

`any`, TypeScript'in kontrolünü azaltır.
Bu da yanlış veri kullanımını daha geç fark etmene neden olabilir.