# 🛒 TechStore - IT E-Commerce Platform

> **Tugas Akhir - Pemrograman Web Lanjut**  
> Universitas Pamulang

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

## 👨‍💻 Developer

**Gilang Maulana Kussay**  
📚 NIM: 221011401208  
🎓 Kelas: 07TPLM006  
🏫 Universitas Pamulang

---

## 📋 Deskripsi Proyek

TechStore adalah platform e-commerce modern yang dikhususkan untuk produk IT (hardware, software, dan aksesori). Aplikasi ini dibangun dengan teknologi terkini untuk memberikan pengalaman berbelanja yang cepat, responsif, dan user-friendly.

### ✨ Fitur Utama

- 🛍️ **Product Catalog** - Katalog produk dengan filtering berdasarkan kategori
- 🔍 **Search Functionality** - Pencarian produk real-time
- 🛒 **Shopping Cart** - Keranjang belanja dengan state management
- ❤️ **Wishlist** - Simpan produk favorit
- 👤 **User Authentication** - Login dan registrasi dengan Supabase
- 📦 **Order Management** - Sistem pemesanan dan tracking
- 💳 **Checkout System** - Proses checkout dengan multiple payment methods
- 📱 **Responsive Design** - Mobile-first design yang optimal di semua device
- 🌙 **Dark Mode** - Theme switching untuk kenyamanan mata
- ⚡ **Real-time Updates** - State management dengan Zustand

---

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 16.1.1** - React framework dengan App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript

### Styling & UI
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Backend & Database
- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Storage

### State Management
- **Zustand** - Lightweight state management
  - Cart state
  - Wishlist state
  - User preferences

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundler (Next.js 16)

---

## 📁 Struktur Proyek

```
tugas-akhir-ecommerce/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Homepage
│   ├── products/            # Product pages
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout flow
│   ├── orders/              # Order history
│   ├── wishlist/            # Wishlist page
│   ├── profile/             # User profile
│   ├── login/               # Login page
│   └── register/            # Registration page
├── components/              # Reusable components
│   ├── navbar.tsx          # Navigation bar
│   └── product-card.tsx    # Product card component
├── lib/                     # Utilities & helpers
│   ├── supabase/           # Supabase client & server
│   ├── utils.ts            # Utility functions
│   └── mock-data.ts        # Mock product data
├── stores/                  # Zustand stores
│   ├── cart-store.ts       # Shopping cart state
│   └── wishlist-store.ts   # Wishlist state
├── types/                   # TypeScript types
│   └── index.ts            # Type definitions
└── public/                  # Static assets
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x atau lebih tinggi
- npm, yarn, pnpm, atau bun
- Supabase account (untuk database & auth)

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/gilangkussay/Tugas_Akhir.git
   cd tugas-akhir-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Setup environment variables**
   
   Copy file `env.template` menjadi `.env.local`:
   ```bash
   cp env.template .env.local
   ```
   
   Isi dengan credentials Supabase Anda:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   
   Buka [http://localhost:3000](http://localhost:3000)

---

## 📦 Database Schema

### Tables

- **products** - Katalog produk
- **categories** - Kategori produk
- **orders** - Data pesanan
- **order_items** - Item dalam pesanan
- **profiles** - Profil pengguna

Lihat file `supabase/schema.sql` untuk detail lengkap.

---

## 🎨 Design Features

### UI/UX Highlights
- **Modern & Clean** - Interface yang bersih dan profesional
- **Mobile-First** - Optimized untuk mobile devices
- **Dark Mode** - Tema gelap untuk kenyamanan mata
- **Smooth Animations** - Transisi dan animasi yang halus
- **Glassmorphism** - Modern glass effect pada beberapa komponen
- **Responsive Grid** - Layout yang adaptif di semua ukuran layar

### Color Palette
- Primary: Blue (#3B82F6)
- Background: Dark Navy (#0A0E27)
- Accent: Cyan, Purple gradients
- Text: White, Gray shades

---

## 🔐 Authentication Flow

1. User registrasi dengan email & password
2. Supabase mengirim verification email
3. User login dengan credentials
4. Session disimpan di browser
5. Protected routes memerlukan authentication

---

## 🛒 Shopping Flow

1. Browse produk di catalog
2. Filter berdasarkan kategori
3. Tambah produk ke cart/wishlist
4. Review cart
5. Checkout dengan shipping info
6. Pilih payment method
7. Konfirmasi order
8. Track order di halaman orders

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

---

## 🚢 Deployment

Aplikasi ini di-deploy menggunakan **Vercel**:

1. Push code ke GitHub
2. Import project di Vercel
3. Configure environment variables
4. Deploy!

Vercel akan otomatis rebuild setiap kali ada push ke branch `main`.

**Live Demo:** [https://tugas-akhir-eight.vercel.app](https://tugas-akhir-eight.vercel.app)

---

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server dengan Turbopack

# Production
npm run build        # Build untuk production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

---

## 🤝 Contributing

Proyek ini adalah tugas akhir individu. Namun, feedback dan saran sangat diterima!

---

## 📄 License

Proyek ini dibuat untuk keperluan akademik - Tugas Akhir Pemrograman Web Lanjut.

---

## 🙏 Acknowledgments

- **Next.js Team** - Framework yang luar biasa
- **Vercel** - Hosting platform
- **Supabase** - Backend infrastructure
- **Unsplash** - Product images
- **Muhammad Rosdiana, S.Kom., M.Kom.** - Dosen Mata Kuliah Pemrograman Web II
- **Universitas Pamulang** - Institusi pendidikan

---

## 📞 Contact

**Gilang Maulana Kussay**  
📧 Email: [gilangkussay1869@gmail.com]  
🔗 GitHub: [@gilangkussay](https://github.com/gilangkussay)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by Gilang Maulana Kussay  
© 2024-2025 | Universitas Pamulang

</div>
