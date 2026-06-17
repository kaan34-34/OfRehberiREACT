# Of Rehberi Final Teslim Yapısı

Bu klasör final yönergesindeki kaynak kod düzenine göre hazırlandı.

## Klasörler

- `frontend`: React + Material UI arayüzü. `npm install` ve `npm run dev` ile çalışır.
- `backend`: Java Spring Boot REST API. Controller, Service, Repository, Entity, DTO, Security ve Exception katmanları ayrıdır.
- `database`: MySQL tablo şeması ve mock veriden türetilmiş seed verisi.

## Veritabanı

Bağlantı bilgileri `backend/src/main/resources/application.properties` içinde:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ofrehberi?useUnicode=true&characterEncoding=utf8&serverTimezone=Europe/Istanbul&createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=rootroot
```

Elle kurulum için:

```bash
mysql -u root -prootroot < database/schema.sql
mysql -u root -prootroot < database/data.sql
```

Backend çalışırken `schema.sql` ve `data.sql` dosyaları Spring Boot tarafından da okunur.

## Backend Çalıştırma

```bash
cd backend
mvn spring-boot:run
```

Codex sandbox içinde Maven cache'i proje içinde tutmak gerekirse:

```bash
mvn -Dmaven.repo.local=.m2/repository spring-boot:run
```

Ana proje klasöründen tek komutla backend ve frontend başlatılabilir:

```bash
npm start
```

Bu komut önce `SourceCode/backend` için Maven package alır, backend'i `localhost:8080` üzerinde başlatır, ardından `SourceCode/frontend` Vite dev server'ını açar.

## Firebase

Frontend için Firebase Console'da Project settings > General > Your apps bölümünden Web App config alınmalı ve `frontend/.env` dosyasına yazılmalıdır. Örnek dosya: `frontend/.env.example`.

```bash
cp frontend/.env.example frontend/.env
```

Backend Firebase Admin SDK servis hesabını şu dosyadan okur:

```text
backend/firebase-admin/ofrehberi-93567-firebase-adminsdk-fbsvc-eb0007acf6.json
```

Kullanıcıyı admin yapmak için:

```bash
cd backend/firebase-admin
node make-admin.js kullanici@mail.com
```

Frontend HTTP istekleri `src/api/axios.js` üzerinden yapılır. Axios interceptor Firebase kullanıcısının ID token'ını alır ve isteklerde şu header'ı gönderir:

```http
Authorization: Bearer <firebase-id-token>
```

Admin endpointleri bu token içindeki `admin=true` custom claim bilgisini Firebase Admin SDK ile doğrular.

Örnek endpointler:

- `GET /api/businesses`
- `GET /api/businesses/slug/pide-house-of`
- `POST /api/businesses/F001/reviews`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/firebase-login`
- `GET /api/users/2/reviews`
- `POST /api/users/2/businesses/F001/reviews`
- `DELETE /api/users/2/reviews/{reviewId}`
- `POST /api/businesses/F001/questions`
- `POST /api/purchases/mock-checkout`
- `GET /api/purchases/users/2`
- `POST /api/admin/businesses` (`Authorization: Bearer <firebase-id-token>`)
- `PUT /api/admin/businesses/F001` (`Authorization: Bearer <firebase-id-token>`)
- `DELETE /api/admin/businesses/F001` (`Authorization: Bearer <firebase-id-token>`)
- `GET /api/admin/reviews` (`Authorization: Bearer <firebase-id-token>`)
- `DELETE /api/admin/reviews/{reviewId}` (`Authorization: Bearer <firebase-id-token>`)
- `PATCH /api/admin/questions/2/answer` (`Authorization: Bearer <firebase-id-token>`)

## Notlar

Ödeme tarafında bu aşamada `MOCK_APPROVED` durumlu satın alma kaydı kullanılır. Admin güvenliği Firebase ID token ve admin role/claim doğrulamasıyla yapılır. Bu yapı daha sonra Stripe PaymentIntent servisiyle genişletilebilir.
