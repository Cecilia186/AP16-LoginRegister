# AP16 - Sistem Login dan Registrasi

Aplikasi Login dan Registrasi sederhana yang dibuat menggunakan React Native dan Expo untuk memenuhi tugas Praktikum Pemrograman Mobile.

## Fitur Aplikasi

- Halaman Login dengan kolom email dan password.
- Halaman Registrasi dengan kolom nama, email, password, dan konfirmasi password.
- Validasi format email.
- Validasi password.
- Pemeriksaan kecocokan password dan konfirmasi password.
- Validasi input secara langsung.
- Pesan kesalahan jika data yang dimasukkan tidak sesuai.
- Indikator loading saat proses registrasi.
- Pengaturan keyboard agar lebih nyaman digunakan.
- Navigasi antara halaman Login dan Registrasi.

## Teknologi yang Digunakan

- React Native
- Expo
- TypeScript
- JavaScript
- Visual Studio Code

## Struktur Folder Project

```text
AP16-LoginRegister/
├── src/
│   ├── app/
│   │   ├── index.tsx
│   │   ├── _layout.tsx
│   │   └── explore.tsx
│   ├── screens/
│   │   ├── LoginScreen.tsx
│   │   └── RegisterScreen.tsx
│   └── utils/
│       └── validators.ts
├── package.json
└── README.md
```

## Cara Menjalankan Aplikasi

Ikuti langkah-langkah berikut untuk menjalankan project di komputer.

1. Clone repository dari GitHub:

```bash
git clone https://github.com/Cecilia186/AP16-LoginRegister.git
```

2. Masuk ke folder project:

```bash
cd AP16-LoginRegister
```

3. Install semua dependency:

```bash
npm install
```

4. Jalankan aplikasi Expo:

```bash
npx expo start
```

5. Scan QR Code yang muncul menggunakan aplikasi Expo Go di HP.

## Pengujian Aplikasi

Beberapa bagian yang dapat diuji dari aplikasi ini:

- Melakukan registrasi dengan data yang benar.
- Memeriksa pesan validasi ketika kolom belum diisi.
- Memasukkan format email yang salah.
- Memasukkan password yang tidak sesuai ketentuan.
- Memeriksa apakah password dan konfirmasi password sudah sama.
- Melakukan login menggunakan akun yang sudah didaftarkan.
- Mencoba login dengan email atau password yang salah.
- Berpindah dari halaman Login ke halaman Registrasi dan sebaliknya.
- Memeriksa tampilan aplikasi saat keyboard muncul.

## Catatan Keamanan

Aplikasi ini dibuat untuk menunjukkan proses dasar login dan registrasi serta validasi data dari sisi aplikasi.

Data akun yang didaftarkan hanya disimpan sementara menggunakan state aplikasi. Aplikasi ini belum menggunakan server backend atau database, sehingga data akun tidak tersimpan secara permanen.

## Kendala dan Solusi

**1. Validasi Input**

Kendala: Memastikan pengguna memasukkan data dengan format yang benar.

Solusi: Membuat fungsi validasi untuk memeriksa nama, email, password, dan konfirmasi password.

**2. Pengaturan Keyboard**

Kendala: Kolom input terkadang tertutup oleh keyboard saat pengguna mengetik.

Solusi: Menggunakan pengaturan keyboard agar pengguna lebih mudah mengisi formulir.

**3. Navigasi Login dan Registrasi**

Kendala: Menghubungkan halaman Login dan Registrasi agar bisa digunakan secara bergantian.

Solusi: Menggunakan state React untuk berpindah halaman dan mengirimkan data akun yang sudah didaftarkan ke halaman Login.

## Expo Snack

Aplikasi juga dapat dicoba melalui Expo Snack pada link berikut:

https://snack.expo.dev/@cecilia186/ap16_loginregister_cecilia

## Identitas Pembuat

**Nama:** Cecilia

**NIM:** 253303620009

**Universitas:** Universitas Prima Indonesia

**Mata Kuliah:** Pemrograman Mobile
