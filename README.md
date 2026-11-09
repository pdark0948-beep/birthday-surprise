# 🎂 Panduan Website Kejutan Ulang Tahun

Website ini dirancang khusus untuk kado kejutan ulang tahun yang interaktif, romantis, dan responsif (sempurna saat dibuka di HP maupun laptop), dibuat dengan typography **Geist** dan prinsip desain bersih bebas AI-slop.

---

## 📂 Struktur File

| File | Keterangan |
| :--- | :--- |
| `index.html` | Struktur utama website 5 langkah kejutan. |
| `style.css` | Tampilan responsif dengan font Geist, tema romantic rose, dan background foto per halaman. |
| `script.js` | Logika interaktif: musik, kuis, tiup lilin, confetti, dan form wish. |
| `google-apps-script.js` | Kode untuk ditempel ke Google Sheets agar data wish masuk otomatis. |
| `kolase.jpg` | Foto kolase strip photobooth untuk halaman pembuka (Welcome Screen). |
| `foto1.jpg` | Background untuk Halaman 2 (Kuis Kenangan). |
| `foto2.jpg` | Background untuk Halaman 3 (Kue Ultah & Tiup Lilin). |
| `foto3.jpg` | Background untuk Halaman 4 (Surat Cinta). |
| `foto4.jpg` | Background untuk Halaman 5 (Kotak Harapan). |
| `lagu.mp3` | *(Opsional)* File musik romantis favorit kalian berdua. |

---

## 🚀 Cara Menjalankan & Mengetes Langsung
Cukup buka file `index.html` di browser laptop kamu (klik ganda `index.html`).
Website langsung aktif! File `kolase.jpg` dan `foto1.jpg` s/d `foto4.jpg` sudah otomatis siap dipakai dari foto referensi yang kamu berikan, dan kamu juga bisa bebas menggantinya kapan saja dengan fotomu sendiri.

---

## 📸 Cara Mengganti Foto (Kolase & Background Tiap Halaman)
1. **Halaman 1 (Welcome Screen)**:
   * Menggunakan file `kolase.jpg` sebagai foto background utama yang romantis. Kamu bisa menaruh foto kolase vertikal favoritmu dengan nama `kolase.jpg`.
2. **Halaman 2 s/d 5 (Background Tiap Langkah)**:
   * Setiap langkah petualangan memiliki foto kenangan berdua sebagai background yang lembut dan estetik:
     * `foto1.jpg`: Background Kuis Romantis
     * `foto2.jpg`: Background Tiup Lilin Kue Ultah
     * `foto3.jpg`: Background Surat Cinta
     * `foto4.jpg`: Background Kotak Harapan
   * Cukup ganti foto-foto tersebut di folder `Surprice` ini jika ingin memakai foto baru!

---

## 🎵 Musik Latar
Website sudah otomatis terhubung ke lagu **Taylor Swift - Love Story** via YouTube player resmi (`https://music.youtube.com/watch?v=CxcEqhy4yKg`). Musik akan otomatis berputar saat pacarmu menekan tombol "Buka Kejutan" atau tombol musik di atas.
*(Jika offline, website tetap memiliki fallback melodi piano lembut via Web Audio API).*

---

## 📊 Cara Menyambungkan ke Google Spreadsheet (1 Menit)
Google Spreadsheet milikmu sudah **100% terhubung** ke formulir di `script.js` via Google Apps Script Web App!
Data doa dan pesan rahasia yang diisi pacarmu akan otomatis langsung masuk ke baris Google Sheet kamu secara real-time.
*(Data juga tetap otomatis di-backup ke penyimpanan lokal/localStorage HP pacarmu).*

---

## 🌐 Cara Membagikan Link ke Pacar (Hosting Gratis)
Agar pacar bisa membuka website ini dari HP-nya:
* **Vercel / Netlify**: Cukup *drag and drop* folder `Surprice` ini ke dashboard [Netlify Drop](https://app.netlify.com/drop), langsung jadi link dalam 10 detik!
* **GitHub Pages**: Upload ke repository GitHub kamu dan aktifkan GitHub Pages.

