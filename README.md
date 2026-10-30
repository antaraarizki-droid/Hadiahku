# HadiahKu — Properti Film (Demo)

Website simulasi fiktif untuk produksi film/edukasi keamanan digital. Halaman menampilkan formulir karakter rekaan dan OTP demo `123456` melalui popup.

## Isi project
- `public/index.html` — halaman utama.
- `server.js` — server Express.
- `package.json` — dependensi dan perintah start.
- `render.yaml` — konfigurasi deploy Render.

## Menjalankan di komputer
1. Instal Node.js versi 18 atau lebih baru.
2. Ekstrak ZIP.
3. Buka terminal pada folder yang berisi `package.json`.
4. Jalankan `npm install`.
5. Jalankan `npm start`.
6. Buka `http://localhost:3000`.

## Deploy ke Render
1. Unggah seluruh isi folder project ke repository GitHub, bukan hanya `index.html`.
2. Pastikan `package.json`, `server.js`, dan `render.yaml` berada di root repository. Folder `public` sejajar dengan `server.js`.
3. Di Render, pilih **New + → Web Service**, lalu hubungkan repository GitHub.
4. Jika diminta pengaturan manual, isi:
   - Runtime: **Node**
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Klik **Deploy Web Service** dan tunggu sampai deploy berhasil.
6. Buka URL `.onrender.com` dari Render.

Alternatif: pilih **New + → Blueprint** untuk membaca konfigurasi `render.yaml` secara otomatis.

## Catatan keamanan dan fungsi
- Data pada formulir hanya data karakter fiktif yang digunakan di browser.
- Formulir tidak mengirim atau menyimpan data ke server.
- OTP `123456` ditampilkan langsung di popup; tidak ada SMS/email yang dikirim dan kode tidak berlaku untuk akun atau layanan nyata.
- Paket ini tidak menyertakan dashboard pengumpulan peserta karena data formulir tidak disimpan.
- Pertahankan pemberitahuan bahwa situs adalah properti film dan gunakan dengan persetujuan pemeran/kru.
