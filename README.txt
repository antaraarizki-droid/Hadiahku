HADIAHKU — STARTER SIMULASI SHORT MOVIE

FITUR
- Halaman simulasi dengan nama panggilan/pseudonim.
- Dashboard kru produksi dengan login.
- Mencatat waktu pendaftaran dan progres simulasi.
- OTP demo tetap 123456, ditampilkan di halaman; TIDAK dikirim via SMS/email.
- Tidak meminta nomor HP, email, rekening, password, OTP asli, atau IP.

JALANKAN DI KOMPUTER
1. Instal Node.js versi LTS.
2. Ekstrak ZIP ini.
3. Buka terminal di folder proyek.
4. Jalankan: npm install
5. Atur password admin dan session secret:
   Windows PowerShell:
     $env:ADMIN_PASSWORD="password-admin-kuat"
     $env:SESSION_SECRET="string-acak-panjang"
   macOS/Linux:
     export ADMIN_PASSWORD="password-admin-kuat"
     export SESSION_SECRET="string-acak-panjang"
6. Jalankan: npm start
7. Buka http://localhost:3000
8. Dashboard: http://localhost:3000/admin.html

PUBLISH KE DOMAIN
- Deploy aplikasi Node.js ini ke layanan hosting yang mendukung Node.js (mis. Render, Railway, atau VPS).
- Set environment variables ADMIN_PASSWORD, SESSION_SECRET, NODE_ENV=production.
- Tambahkan domain milik sendiri melalui panel hosting dan ikuti pengaturan DNS yang diberikan host.
- Aktifkan HTTPS sebelum membagikan tautan.
- Ganti penyimpanan memori dengan database persisten hanya jika memang diperlukan; saat server restart, daftar peserta contoh ini akan terhapus.
- Jangan menambahkan pelacakan tersembunyi. Beri tahu peserta bahwa ini simulasi dan gunakan persetujuan kru/pemeran.

CATATAN
Ini starter lokal untuk produksi film, bukan layanan OTP sungguhan. Jangan gunakan untuk menyamar sebagai bank/layanan nyata atau mengambil kredensial orang.
