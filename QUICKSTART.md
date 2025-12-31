# 🚀 Quick Start Guide - TechStore Admin Dashboard

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Supabase account created
- [ ] Git installed

---

## Step 1: Clone & Install (5 minutes)

```bash
# Clone repository
git clone https://github.com/gilangkussay/Tugas_Akhir.git
cd tugas-akhir-ecommerce

# Install dependencies
npm install
```

---

## Step 2: Environment Setup (2 minutes)

1. Copy environment template:
```bash
cp env.template .env.local
```

2. Get Supabase credentials:
   - Login to [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project
   - Go to **Settings** → **API**
   - Copy **Project URL** and **anon public** key

3. Update `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## Step 3: Database Setup (10 minutes)

### 3.1 Run SQL Schema

1. Open Supabase Dashboard → **SQL Editor**
2. Open file `supabase/complete-schema.sql` from your project
3. Copy **ALL** content
4. Paste into SQL Editor
5. Click **Run** (or press `Ctrl+Enter`)

✅ You should see: "Success. No rows returned"

### 3.2 Create Admin User

1. In Supabase Dashboard → **Authentication** → **Users**
2. Click **Add User** (or **Invite**)
3. Fill in:
   - Email: `admin@techstore.com`
   - Password: `admin123`
   - ✅ Check "Confirm email automatically"
4. Click **Create User**

### 3.3 Set Admin Role

1. Go back to **SQL Editor**
2. Run this query:

```sql
UPDATE profiles 
SET role = 'admin', 
    full_name = 'Admin TechStore'
WHERE email = 'admin@techstore.com';
```

3. Verify with:

```sql
SELECT id, email, full_name, role 
FROM profiles 
WHERE role = 'admin';
```

✅ Should return 1 row with admin user

---

## Step 4: Run Development Server (1 minute)

```bash
npm run dev
```

Open browser: [http://localhost:3000](http://localhost:3000)

---

## Step 5: Test Admin Access (5 minutes)

### Login as Admin

1. Go to [http://localhost:3000/login](http://localhost:3000/login)
2. Login with:
   - Email: `admin@techstore.com`
   - Password: `admin123`
3. You should be redirected to `/admin` dashboard

### Test Admin Features

#### Dashboard
- ✅ View statistics (products, orders, revenue)
- ✅ See recent orders

#### Product Management
1. Click **Products** in sidebar
2. Click **Add New Product**
3. Fill in form:
   - Name: "Test Product"
   - Price: 1000000
   - Stock: 10
   - Category: (select any)
   - Upload 1-2 images
4. Click **Create Product**
5. ✅ Product should appear in list

#### Edit Product
1. Click **Edit** icon on any product
2. Change price or stock
3. Upload additional image
4. Click **Update Product**
5. ✅ Changes should be saved

#### Delete Product
1. Click **Trash** icon on test product
2. Confirm deletion
3. ✅ Product should be removed

#### Order Management
1. Click **Orders** in sidebar
2. ✅ View all orders
3. Change status dropdown
4. ✅ Status should update

---

## Step 6: Test Customer Features (Optional)

### Create Customer Account

1. Logout from admin
2. Go to `/register`
3. Create account:
   - Email: `customer@test.com`
   - Password: `customer123`
   - Full Name: "Test Customer"

### Test Shopping Flow

1. Browse products at `/products`
2. Click on a product
3. Add to cart
4. Go to cart → Checkout
5. Fill shipping info
6. Create order
7. ✅ Order should appear in `/orders`

### Test Review System

1. Login as **admin**
2. Go to **Orders** → Find customer's order
3. Change status to **"delivered"**
4. Logout, login as **customer**
5. Go to product detail page
6. ✅ Review form should appear
7. Submit review
8. ✅ Review should appear on product page

---

## Common Issues & Solutions

### Issue: "Cannot connect to Supabase"
**Solution:** 
- Check `.env.local` file exists
- Verify Supabase URL and key are correct
- Restart dev server (`Ctrl+C` then `npm run dev`)

### Issue: "Admin redirect to /products"
**Solution:**
- Run SQL to verify admin role:
  ```sql
  SELECT * FROM profiles WHERE email = 'admin@techstore.com';
  ```
- If role is not 'admin', run update query again

### Issue: "Cannot upload images"
**Solution:**
- Check if `product-images` bucket exists in Supabase Storage
- Verify storage policies were created (check SQL execution)
- Try creating bucket manually in Supabase Dashboard

### Issue: "TypeScript errors"
**Solution:**
- Restart TypeScript server: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
- Clear `.next` folder: `rm -rf .next` then restart dev server

---

## Next Steps

✅ **All Set!** Your admin dashboard is ready.

### Recommended Actions:

1. **Add Real Products**
   - Create categories for your products
   - Upload product images
   - Add detailed specifications

2. **Customize Branding**
   - Update logo and colors
   - Modify homepage content
   - Add your contact information

3. **Deploy to Production**
   - Push to GitHub
   - Deploy on Vercel
   - Configure production environment variables

---

## Need Help?

📖 **Documentation:**
- [README.md](../README.md) - Full documentation
- [DATABASE_SETUP.md](../supabase/DATABASE_SETUP.md) - Database guide
- [walkthrough.md](../.gemini/antigravity/brain/fdba3771-af31-4bd0-adca-e2dc0e04c78e/walkthrough.md) - Implementation details

🐛 **Found a bug?** Check the console for error messages

💡 **Feature request?** Document it in your project notes

---

**Estimated Total Time: ~25 minutes**

Happy coding! 🎉
