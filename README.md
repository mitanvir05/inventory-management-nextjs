# 📦 Inventory Management App

A modern **Inventory Management System** built with **Next.js (App Router)**, **Prisma**, and **PostgreSQL**.  
The application supports authentication, dashboards, product management, and is fully **production-ready for Vercel**.

---

## 🚀 Features

- 🔐 User Authentication (Stack Auth)
- 📊 Dashboard overview
- ➕ Add, view, and manage products
- 👤 User-based product ownership
- 🧠 Server Components (Next.js App Router)
- 🗄️ Prisma ORM with PostgreSQL
- 🎨 Tailwind CSS styling
- ☁️ Optimized for Vercel deployment

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, Tailwind CSS
- **Backend**: Next.js Server Actions / API Routes
- **Database**: PostgreSQL (Neon / Supabase / etc.)
- **ORM**: Prisma
- **Authentication**: Stack Auth
- **Deployment**: Vercel

---

## 📁 Project Structure

```text
.
├── app/
│   ├── add-product/
│   ├── dashboard/
│   ├── inventory/
│   ├── settings/
│   ├── sign-in/
│   ├── handler/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── globals.css
│   ├── favicon.ico
│   └── icon.png
├── components/
├── lib/
│   ├── prisma.ts
│   └── auth.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
├── stack/
├── .env.example
├── package.json
└── README.md



## 📸 Screenshots

### 🏠 Home Page
![Home Page](https://inventory-management-nextjs-app.vercel.app/assets/home.png)

### 📊 Dashboard
![Dashboard](https://inventory-management-nextjs-app.vercel.app/assets/dashboard.png)

### 📦 Inventory
![Inventory](https://inventory-management-nextjs-app.vercel.app/assets/inventory.png)

### ➕ Add Product
![Add Product](https://inventory-management-nextjs-app.vercel.app/assets/addproduct.png)
