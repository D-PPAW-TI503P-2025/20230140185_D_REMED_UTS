 # INSTRUKSI CARA MENJALANKAN APLIKASI
 1. Buka folder Library menggunakan Visual Studio Code
 2. Buka terminal
 3. Masuk ke directory Backend (cd Backend)
 4. Jalankan Backend (npm start)
 5. Buka terminal baru
 6. Masuk ke directory Frontend (cd Frontend)
 7. Jalankan Frontend (npm start)
 8. Aplikasi berjalan

# Dokumentasi LIBRARY SYSTEM WITH GEOLOCATION 

## BACKEND
## Public
1. Melihat Semua Buku
![Dashboard](ss/lihat-semua-buku.png)

2. Melihat Detail Buku
![Dashboard](ss/lihat-detail-buk.png)

## Admin Mode
3. Tambah Buku
![Dashboard](ss/tambah-buku.png)

4. Update Buku
![Dashboard](ss/update-buku.png)

5. Delete Buku 
![Dashboard](ss/hapus-buku.png)

## User Mode
6. Meminjam Buku
![Dashboard](ss/meminjam-buku.png)

## Tambahan
7. Validasi Input Tittle dan Author tidak boleh kosong
![Dashboard](ss/Validasi-input.png)

8. Hanya Admin yang bisa Create, Update, Delete
![Dashboard](ss/hanya-admin-yang-create.png)
![Dashboard](ss/hanya-admin-yang-update.png)
![Dashboard](ss/hanya-admin-yang-delete.png)

9. Stok Berkurang Setelah User Meminjam Buku
Sebelum
![Dashboard](ss/lihat-semua-buku.png)
Setelah Dipinjam
![Dashboard](ss/stok-berubah-setelah-dipinjam.png)

## Struktur Tabel
10. Tabel Buku 
sebelum di update
![Dashboard](ss/tabel-buku-sebelum-diedit.png)
setelah di update
![Dashboard](ss/tabel-buku-setelah-diedit.png)

11. Tabel BorrowLog
![Dashboard](ss/tabel-peminjaman.png)


## FRONTEND
## Public dan User
12. Dashboard 
![Dashboard](ss/dashboard-user-dan-public.png)

13. Halaman Buku
![Dashboard](ss/halaman-buku-user-dan-public.png)
Disini tampilan halaman buku untuk public dan user sama, cuma bedanya kalo public dia tidak bisa meminjam buku

## Admin
14. Dashboard
![Dashboard](ss/dashboard-admin.png)

15. Halaman Buku Admin
![Dashboard](ss/halaman-buku-admin.png)

