# Database Setup Guide

## File Structure

### ✅ **USE THIS FILE:**
- **`complete-schema.sql`** - File lengkap yang berisi semua setup database

### ⚠️ **OLD FILES (Deprecated):**
- ~~`schema.sql`~~ - Schema dasar (sudah digabung ke `complete-schema.sql`)
- ~~`setup-admin.sql`~~ - Setup admin manual (sudah digabung ke `complete-schema.sql`)
- ~~`migrations/002_admin_features.sql`~~ - Fitur admin (sudah digabung ke `complete-schema.sql`)

**File-file lama bisa dihapus atau diabaikan.**

---

## Setup Instructions

### 1️⃣ Run Complete Schema

1. Login ke **Supabase Dashboard**
2. Buka **SQL Editor**
3. Copy paste seluruh isi file **`complete-schema.sql`**
4. Klik **Run** atau tekan `Ctrl+Enter`

File ini akan membuat:
- ✅ Semua tables (profiles, products, orders, reviews, dll)
- ✅ Indexes untuk performance
- ✅ Row Level Security (RLS) policies
- ✅ Functions & Triggers
- ✅ Storage bucket untuk product images

### 2️⃣ Create Admin User

1. Di Supabase Dashboard, buka **Authentication > Users**
2. Klik **Add User** (atau **Invite**)
3. Isi:
   - Email: `admin@techstore.com`
   - Password: `admin123`
   - ✅ Confirm email automatically
4. Klik **Create User**

### 3️⃣ Set Admin Role

Kembali ke **SQL Editor** dan jalankan:

```sql
UPDATE profiles 
SET role = 'admin', 
    full_name = 'Admin TechStore'
WHERE email = 'admin@techstore.com';
```

### 4️⃣ Verify Setup

Jalankan query ini untuk memastikan admin sudah terbuat:

```sql
SELECT id, email, full_name, role 
FROM profiles 
WHERE role = 'admin';
```

Harusnya muncul 1 row dengan email `admin@techstore.com` dan role `admin`.

---

## What's Included

### Tables
- `profiles` - User profiles dengan role (customer/admin)
- `categories` - Kategori produk
- `products` - Produk dengan rating & reviews
- `wishlist` - Wishlist user
- `orders` - Orders dengan tracking status
- `order_items` - Item dalam order
- `reviews` - Review produk (linked ke orders)

### Features
- **Order Tracking**: Status tracking dari processing → delivered
- **Review System**: User bisa review setelah order delivered
- **Auto Rating Update**: Rating produk otomatis update saat ada review baru
- **Image Storage**: Bucket untuk upload gambar produk
- **RLS Policies**: Security policies untuk semua tables

### Admin Capabilities
- View & manage all products
- View & manage all orders
- Update order tracking status
- Upload product images
- View all user profiles

---

## Test Accounts

Setelah setup selesai, Anda bisa login dengan:

**Admin:**
- Email: `admin@techstore.com`
- Password: `admin123`

**Customer** (buat manual atau via register):
- Email: `customer@test.com`
- Password: `customer123`

---

## Troubleshooting

### Error: "relation already exists"
Jika table sudah ada, SQL akan skip (karena pakai `IF NOT EXISTS`). Aman untuk dijalankan ulang.

### Error: "policy already exists"  
SQL sudah include `DROP POLICY IF EXISTS` sebelum create policy. Aman untuk dijalankan ulang.

### Admin user tidak bisa login
1. Check apakah user sudah dibuat di Authentication > Users
2. Check apakah email sudah confirmed
3. Jalankan query verify di step 4️⃣

### Storage bucket error
Pastikan Supabase project sudah enable Storage. Bisa check di Dashboard > Storage.
