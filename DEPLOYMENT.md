# Panduan Deploy ke Vercel

Panduan lengkap untuk hosting aplikasi e-commerce Next.js Anda di Vercel.

## Prerequisites

- ✅ Akun GitHub (gratis)
- ✅ Akun Vercel (gratis) - [vercel.com](https://vercel.com)
- ✅ Git terinstall di komputer
- ✅ Aplikasi sudah berjalan di local

## Step 1: Setup Git Repository

### 1.1 Cek Status Git

Buka terminal di folder project dan jalankan:

```bash
git status
```

Jika sudah ada repository (ada folder `.git`), lanjut ke step 1.2. Jika belum, inisialisasi git:

```bash
git init
git add .
git commit -m "Initial commit: E-commerce application"
```

### 1.2 Buat Repository di GitHub

1. Buka [github.com](https://github.com)
2. Klik tombol **"New"** atau **"+"** → **"New repository"**
3. Isi detail repository:
   - **Repository name:** `tugas-akhir-ecommerce` (atau nama lain)
   - **Description:** "IT E-commerce Platform with Next.js"
   - **Visibility:** Public atau Private (terserah)
   - **JANGAN** centang "Initialize with README" (sudah ada di local)
4. Klik **"Create repository"**

### 1.3 Push ke GitHub

Setelah repository dibuat, GitHub akan menampilkan instruksi. Jalankan di terminal:

```bash
# Ganti URL dengan URL repository Anda
git remote add origin https://github.com/username/tugas-akhir-ecommerce.git
git branch -M main
git push -u origin main
```

> **Note:** Ganti `username` dengan username GitHub Anda

## Step 2: Deploy ke Vercel

### 2.1 Login ke Vercel

1. Buka [vercel.com](https://vercel.com)
2. Klik **"Sign Up"** atau **"Login"**
3. Pilih **"Continue with GitHub"**
4. Authorize Vercel untuk akses GitHub

### 2.2 Import Project

1. Di dashboard Vercel, klik **"Add New..."** → **"Project"**
2. Pilih **"Import Git Repository"**
3. Cari repository `tugas-akhir-ecommerce`
4. Klik **"Import"**

### 2.3 Configure Project

Vercel akan otomatis mendeteksi Next.js. Konfigurasi:

**Build & Development Settings:**
- Framework Preset: `Next.js` ✅ (auto-detected)
- Build Command: `next build` ✅ (default)
- Output Directory: `.next` ✅ (default)
- Install Command: `npm install` ✅ (default)

**Root Directory:**
- Biarkan default (`.`)

**Environment Variables:**
Klik **"Add"** untuk menambahkan variabel environment (lihat Step 3)

### 2.4 Deploy

Klik **"Deploy"** dan tunggu proses build selesai (2-5 menit)

## Step 3: Environment Variables

> [!IMPORTANT]
> Aplikasi ini menggunakan Supabase untuk database. Anda perlu setup environment variables.

### 3.1 Jika Sudah Punya Supabase Project

Di Vercel project settings → **Environment Variables**, tambahkan:

| Key | Value | Source |
|-----|-------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJxxx...` | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` | URL Vercel Anda |

### 3.2 Jika Belum Punya Supabase Project

1. **Buat Akun Supabase**
   - Buka [supabase.com](https://supabase.com)
   - Sign up dengan GitHub

2. **Buat Project Baru**
   - Klik **"New Project"**
   - Isi detail:
     - Name: `ecommerce-db`
     - Database Password: (simpan password ini!)
     - Region: Southeast Asia (Singapore)
   - Klik **"Create new project"**
   - Tunggu ~2 menit

3. **Setup Database Schema**
   - Di Supabase Dashboard → **SQL Editor**
   - Copy isi file `supabase/schema.sql` dari project Anda
   - Paste di SQL Editor
   - Klik **"Run"**

4. **Ambil API Keys**
   - Supabase Dashboard → **Settings** → **API**
   - Copy:
     - `Project URL` → untuk `NEXT_PUBLIC_SUPABASE_URL`
     - `anon public` key → untuk `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. **Tambahkan ke Vercel**
   - Kembali ke Vercel → Project Settings → Environment Variables
   - Tambahkan 3 variabel di atas
   - Klik **"Save"**

### 3.3 Redeploy

Setelah menambahkan environment variables:
1. Kembali ke **Deployments** tab
2. Klik **"..."** pada deployment terakhir
3. Klik **"Redeploy"**

## Step 4: Verifikasi Deployment

### 4.1 Cek URL Production

Setelah deployment selesai:
1. Vercel akan memberikan URL: `https://your-app.vercel.app`
2. Klik URL untuk membuka aplikasi
3. Test fitur-fitur:
   - ✅ Homepage loading
   - ✅ Products page
   - ✅ Login/Register
   - ✅ Profile page
   - ✅ Cart functionality

### 4.2 Custom Domain (Optional)

Jika ingin custom domain:
1. Vercel Dashboard → Project → **Settings** → **Domains**
2. Klik **"Add"**
3. Masukkan domain Anda (misal: `ecommerce.yourdomain.com`)
4. Follow instruksi untuk update DNS

## Step 5: Continuous Deployment

Setelah setup awal, setiap kali Anda push ke GitHub:

```bash
git add .
git commit -m "Update: fitur baru"
git push
```

Vercel akan **otomatis** deploy perubahan! 🚀

## Troubleshooting

### Build Failed

**Error:** `Module not found` atau `Cannot find module`

**Solusi:**
```bash
# Di local, pastikan semua dependencies terinstall
npm install
npm run build

# Jika berhasil di local, push lagi ke GitHub
git add .
git commit -m "Fix dependencies"
git push
```

### Environment Variables Not Working

**Gejala:** Aplikasi tidak bisa connect ke Supabase

**Solusi:**
1. Vercel → Settings → Environment Variables
2. Pastikan semua variable ada dan benar
3. Klik **"Redeploy"**

### Image/Assets Not Loading

**Gejala:** Gambar tidak muncul

**Solusi:**
- Pastikan gambar ada di folder `public/`
- Path harus dimulai dengan `/` (misal: `/images/logo.png`)

### Supabase Connection Error

**Gejala:** Error 401 atau CORS error

**Solusi:**
1. Supabase Dashboard → **Authentication** → **URL Configuration**
2. Tambahkan Vercel URL ke **Site URL** dan **Redirect URLs**:
   ```
   https://your-app.vercel.app
   ```

## Commands Reference

### Local Development
```bash
npm run dev          # Start dev server
npm run build        # Build production
npm run start        # Start production server
```

### Git Commands
```bash
git status           # Cek perubahan
git add .            # Stage semua file
git commit -m "msg"  # Commit dengan message
git push             # Push ke GitHub
```

### Vercel CLI (Optional)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy dari terminal
vercel

# Deploy production
vercel --prod
```

## Next Steps

- [ ] Setup custom domain
- [ ] Enable analytics di Vercel
- [ ] Setup monitoring (Vercel Analytics)
- [ ] Configure caching untuk performa
- [ ] Setup staging environment

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Documentation](https://supabase.com/docs)
- [GitHub Guides](https://guides.github.com)

---

**Selamat! Aplikasi Anda sekarang live di internet! 🎉**
