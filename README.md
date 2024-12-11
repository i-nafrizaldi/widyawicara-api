# README - Aplikasi Fullstack

## Deskripsi Proyek
Proyek ini adalah aplikasi autentikasi dan manajemen produk yang dibuat dengan teknologi modern untuk memenuhi kebutuhan tes. Aplikasi terdiri dari dua bagian utama:

1. **Frontend**: Dibangun menggunakan Next.js, Tailwind CSS, dan Redux untuk membuat antarmuka pengguna yang responsif dan dinamis.
2. **Backend**: Dibangun menggunakan Express.js, Prisma ORM, dan JWT untuk menyediakan REST API yang aman dan efisien. Database yang digunakan adalah PostgreSQL.

---

## Bagian Frontend

### Teknologi yang Digunakan
- **Framework**: Next.js
- **UI Library**: Tailwind CSS
- **State Management**: Redux

### Fitur
1. **Registrasi**: Formulir pendaftaran dengan validasi input (nama, email, dan jenis kelamin).
2. **Login**: Formulir login untuk mengakses profil pengguna dan manajemen produk.
3. **Manajemen Produk**: CRUD produk melalui antarmuka pengguna.
4. **Autentikasi JWT**: Melakukan permintaan API dengan header token JWT.

### Cara Menjalankan Frontend Secara Lokal
1. Clone repositori ini.
   ```bash
   git clone https://github.com/i-nafrizaldi/widyawicara-web.git
   ```
2. Instal dependensi.
   ```bash
   npm install
   ```
3. Jalankan aplikasi.
   ```bash
   npm run dev
   ```
4. Buka di browser pada `http://localhost:3000`.


---

## Bagian Backend

### Teknologi yang Digunakan
- **Framework**: Express.js
- **ORM**: Prisma
- **Autentikasi**: JSON Web Token (JWT)
- **Database**: PostgreSQL

### Fitur
1. **Registrasi Pengguna**: Endpoint untuk membuat akun baru.
2. **Login Pengguna**: Endpoint untuk mendapatkan token JWT.
3. **Profil Pengguna**: Endpoint untuk mengakses data pengguna dengan token JWT.
4. **CRUD Produk**: Endpoint untuk membuat, membaca, memperbarui, dan menghapus data produk dengan autentikasi.

### Cara Menjalankan Backend Secara Lokal
1. Clone repositori ini.
   ```bash
   git clone https://github.com/i-nafrizaldi/widyawicara-api.git
   ```
2. Instal dependensi.
   ```bash
   npm install
   ```
3. Atur file konfigurasi di `.env`.
   ```env
   DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
   JWT_SECRET="your_secret_key"
   ```
4. Migrasikan database dengan Prisma.
   ```bash
   npx prisma migrate dev
   ```
5. Jalankan server.
   ```bash
   npm run dev
   ```
6. Server berjalan di `http://localhost:8080`.

### Dokumentasi API
1. **Base URL**: `http://localhost:8080/api`
2. **Endpoint Utama**:
   - **POST** `/auth/register`: Mendaftarkan pengguna baru.
   - **POST** `/auth/login`: Login dan mendapatkan token JWT.
   - **GET** `/users`: Mengakses profil pengguna.
   - **PATCH** `/users/:id`: Memperbarui profil pengguna.
   - **CRUD Produk**:
     - **POST** `/products`: Membuat produk baru.
     - **GET** `/products`: Melihat semua produk.
     - **GET** `/products/:id`: Melihat detail produk.
     - **PATCH** `/products/:id`: Memperbarui produk.
     - **DELETE** `/products/:id`: Menghapus produk.


---

## Deployment
Aplikasi ini telah di-deploy ke:
- **Frontend**: https://widyawicara-web.ivannafrizaldi.my.id/
- **Backend**: https://widyawicara-api.ivannafrizaldi.my.id/api

---

**Nama**: IVAN NAFRIZALDI

**Repo**: 
- **FRONTEND**: https://github.com/i-nafrizaldi/widyawicara-web.git
- **BACKEND**: https://github.com/i-nafrizaldi/widyawicara-api.git
