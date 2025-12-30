# Setup Git Credential - Personal Access Token (PAT)

## Langkah 1: Buat Personal Access Token di GitHub

1. **Login ke GitHub** → [github.com](https://github.com)

2. **Buka Settings**
   - Klik foto profile (pojok kanan atas)
   - Klik **"Settings"**

3. **Developer Settings**
   - Scroll ke bawah di sidebar kiri
   - Klik **"Developer settings"**

4. **Personal Access Tokens**
   - Klik **"Personal access tokens"** → **"Tokens (classic)"**
   - Klik **"Generate new token"** → **"Generate new token (classic)"**

5. **Konfigurasi Token**
   - **Note:** `tugas-akhir-ecommerce` (nama untuk mengingat token ini)
   - **Expiration:** `90 days` (atau pilih sesuai kebutuhan)
   - **Select scopes:** Centang yang berikut:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)
   
6. **Generate Token**
   - Scroll ke bawah
   - Klik **"Generate token"**
   - **PENTING:** Copy token yang muncul (contoh: `ghp_xxxxxxxxxxxxxxxxxxxx`)
   - **SIMPAN TOKEN INI!** Token hanya ditampilkan sekali

## Langkah 2: Gunakan Token untuk Push

Setelah mendapat token, ada 2 cara menggunakannya:

### **Cara A: Langsung di Command (Sekali Pakai)**

```bash
# Format:
git push https://TOKEN@github.com/gilangkussay/tugas-akhir-ecommerce.git master

# Contoh (ganti YOUR_TOKEN dengan token Anda):
git push https://ghp_xxxxxxxxxxxxxxxxxxxx@github.com/gilangkussay/tugas-akhir-ecommerce.git master
```

### **Cara B: Update Remote URL (Permanen)**

```bash
# Hapus remote lama
git remote remove origin

# Tambah remote baru dengan token
git remote add origin https://TOKEN@github.com/gilangkussay/tugas-akhir-ecommerce.git

# Ganti TOKEN dengan token Anda, contoh:
git remote add origin https://ghp_xxxxxxxxxxxxxxxxxxxx@github.com/gilangkussay/tugas-akhir-ecommerce.git

# Push
git push -u origin master
```

### **Cara C: Git Credential Manager (Recommended)**

Jika Git Credential Manager sudah terinstall (biasanya otomatis dengan Git for Windows):

```bash
# Push seperti biasa
git push -u origin master

# Akan muncul popup untuk login
# Pilih "Sign in with your browser"
# Login di browser
# Selesai!
```

## Langkah 3: Verifikasi

Setelah push berhasil, cek di browser:
```
https://github.com/gilangkussay/tugas-akhir-ecommerce
```

Semua file project Anda seharusnya sudah ada di GitHub!

## Troubleshooting

### Error: "Authentication failed"
- Pastikan token sudah di-copy dengan benar
- Pastikan token belum expired
- Pastikan scope `repo` sudah dicentang saat buat token

### Error: "remote: Repository not found"
- Pastikan repository sudah dibuat di GitHub
- Pastikan username benar: `gilangkussay`

### Token Hilang/Lupa
- Buat token baru (tidak bisa melihat token lama)
- Update remote URL dengan token baru

---

**Pilih cara mana yang Anda mau gunakan, lalu beritahu saya untuk lanjut!**
