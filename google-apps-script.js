/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT - SINKRONISASI WISH ULANG TAHUN KE GOOGLE SPREADSHEET
 * ==============================================================================
 * 
 * PANDUAN PEMASANGAN (HANYA 1 MENIT):
 * 1. Buka Google Spreadsheet baru di browser (sheets.google.com).
 * 2. Beri nama spreadsheet, misalnya: "Birthday Wishes - Pacar".
 * 3. Klik menu: Ekstensi (Extensions) > Apps Script.
 * 4. Hapus semua kode default di editor, lalu paste seluruh kode di bawah ini.
 * 5. Klik tombol "Simpan" (ikon disket).
 * 6. Klik tombol "Terapkan" (Deploy) > "Penerapan baru" (New deployment).
 * 7. Pada jenis penerapan (ikon roda gigi), pilih "Aplikasi Web" (Web app).
 * 8. Konfigurasi:
 *    - Deskripsi: "Birthday Wish Webhook"
 *    - Jalankan sebagai (Execute as): "Saya" (Me)
 *    - Yang memiliki akses (Who has access): "Siapa saja" (Anyone) -> PENTING!
 * 9. Klik "Terapkan" (Deploy) & berikan izin akses akun Google kamu jika diminta.
 * 10. Salin "URL Aplikasi Web" (akhiran /exec) dan tempelkan ke script.js
 *     pada variabel GOOGLE_SCRIPT_URL.
 */

const SPREADSHEET_ID = "1BqK1ajVckEwpvSxczGsb3LgJ4YqZrCvA-fttXjhPBPA";

function doPost(e) {
  try {
    let sheet;
    try {
      sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    } catch (err) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    }
    
    // Siapkan Header jika Spreadsheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Waktu Pengiriman", 
        "Doa & Harapan Utama", 
        "Pesan Rahasia"
      ]);
      
      // Styling header baris pertama
      const headerRange = sheet.getRange(1, 1, 1, 3);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#FFE4E8");
      headerRange.setFontColor("#9F1239");
    }

    // Parsing data JSON yang dikirim dari website
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }

    const timestamp = data.timestamp || new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
    const wishMain = data.wishMain || "-";
    const wishSecret = data.wishSecret || "-";

    // Tambahkan baris data baru ke spreadsheet
    sheet.appendRow([timestamp, wishMain, wishSecret]);

    // Kembalikan respon sukses
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Wish berhasil disimpan!" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("Endpoint Google Apps Script untuk Wish Ulang Tahun aktif!")
    .setMimeType(ContentService.MimeType.TEXT);
}

