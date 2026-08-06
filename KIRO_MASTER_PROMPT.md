# 🎯 MASTER PROMPT FOR KIRO AI - E-COMMERCE THESIS PROJECT

## 📋 PROJECT OVERVIEW

**Thesis Title**: Xây dựng Website bán hàng với Next.js App Router + TypeScript

**Goal**: Cải tạo Vercel Commerce template để áp dụng Hybrid Rendering strategies (SSG, SSR, ISR, CSR) và đảm bảo tất cả code là TypeScript + Prisma ORM

**Student**: Bùi Nguyễn Nhật Huy (HUSC K47)

**Tech Stack**: 
- Next.js 15+ (App Router)
- TypeScript (100% type-safe)
- Prisma ORM + PostgreSQL/MySQL
- Tailwind CSS + shadcn/ui
- Zustand (cart state)
- TanStack Query (optional)
- GSAP (smooth animations)

---

## 🏗️ CURRENT TASK

**Base Template**: https://vercel.com/templates/next.js/nextjs-commerce

**Task**: Phân tích và cải tạo template sao cho:
1. Rendering strategies rõ ràng cho từng page
2. Có TypeScript definitions xuyên suốt
3. Có Prisma schema + migrations
4. Admin panel hoàn chỉnh (CRUD products)
5. Real database integration (không hardcoded data)
6. Performance metrics ready (Lighthouse audit)

---

## 📊 RENDERING STRATEGY MAPPING

Áp dụng chiến lược rendering sau cho từng route:

| Route | Strategy | Revalidate | Reason |
|-------|----------|-----------|--------|
| `/` | SSG + ISR | 60 seconds | Featured products, hero section - static but update daily |
| `/products` | ISR | 30 seconds | Product listing with filters - changes frequently |
| `/products/[id]` | SSG + ISR | 60 seconds | Product detail - SEO optimal, update when price/stock changes |
| `/search` | SSR | - | Dynamic search based on query params - real-time |
| `/cart` | CSR | - | Client-side state, no SEO needed, high interaction |
| `/checkout` | SSR | - | Security critical, real-time inventory check |
| `/orders/[id]` | SSR | - | User-specific, real-time confirmation |
| `/profile` | CSR + Auth | - | Protected route, user-specific data |
| `/admin/*` | SSR + Auth | - | Real-time management, protected |
| `/blog/*` | SSG + ISR | 3600 seconds | Static content, rarely changes |

---

## 🗄️ DATABASE SCHEMA (PRISMA)

Create `prisma/schema.prisma` with these models:

```prisma
// User model
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      String   @default("customer") // "customer" | "admin"
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  orders    Order[]
}

// Category model
model Category {
  id        String   @id @default(cuid())
  name      String   @unique
  slug      String   @unique
  description String?
  image     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  products  Product[]
}

// Product model - CORE
model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String   @db.Text
  longDescription String? @db.Text
  price       Float
  discountPrice Float?
  stock       Int      @default(0)
  
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  
  // Media
  images      String[] // JSON array of image URLs
  thumbnail   String
  
  // Metadata
  rating      Float    @default(0)
  reviewCount Int      @default(0)
  isFeatured  Boolean  @default(false)
  
  // Timestamps
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  orderItems  OrderItem[]
  reviews     Review[]
  
  @@index([categoryId])
  @@index([slug])
  @@fulltext([name, description]) // For search
}

// Order model
model Order {
  id        String   @id @default(cuid())
  orderNumber String  @unique // Human-readable order ID
  
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  items     OrderItem[]
  
  // Shipping
  shippingName String
  shippingEmail String
  shippingPhone String
  shippingAddress String @db.Text
  shippingCity String
  shippingCountry String
  shippingZipCode String
  
  // Payment
  total     Float
  status    String   @default("pending") // "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentMethod String? // "credit_card" | "bank_transfer" | "cash"
  paymentStatus String @default("unpaid") // "unpaid" | "paid" | "failed"
  
  notes     String?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([userId])
  @@index([status])
  @@index([createdAt])
}

// OrderItem - JOIN table
model OrderItem {
  id        String   @id @default(cuid())
  
  orderId   String
  order     Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  
  quantity  Int
  price     Float    // Price at time of order
  
  @@unique([orderId, productId])
  @@index([orderId])
}

// Review model
model Review {
  id        String   @id @default(cuid())
  
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  rating    Int      // 1-5
  title     String
  content   String   @db.Text
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([productId])
}
```

---

## 🎨 PROJECT STRUCTURE

Organize theo cấu trúc sau:

```
project-root/
├── app/
│   ├── (public)/                  # Public routes
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Homepage - SSG+ISR
│   │   ├── products/
│   │   │   ├── page.tsx          # Product listing - ISR
│   │   │   ├── layout.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Product detail - SSG+ISR
│   │   ├── search/
│   │   │   └── page.tsx          # Search results - SSR
│   │   ├── cart/
│   │   │   └── page.tsx          # Cart - CSR
│   │   ├── checkout/
│   │   │   └── page.tsx          # Checkout - SSR
│   │   └── orders/
│   │       └── [id]/
│   │           └── page.tsx      # Order confirmation - SSR
│   │
│   ├── (auth)/                    # Auth pages
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   │
│   ├── (protected)/               # Protected routes (require auth)
│   │   ├── layout.tsx            # Auth middleware
│   │   └── profile/
│   │       └── page.tsx          # Profile - CSR
│   │
│   ├── admin/                     # Admin routes (require admin role)
│   │   ├── layout.tsx            # Admin auth check
│   │   ├── products/
│   │   │   ├── page.tsx          # Product list - SSR
│   │   │   └── [id]/edit/page.tsx # Edit product - CSR with form
│   │   ├── orders/
│   │   │   └── page.tsx          # Order management - SSR
│   │   └── categories/
│   │       └── page.tsx
│   │
│   ├── api/                       # API Routes
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── register/route.ts
│   │   │   └── logout/route.ts
│   │   ├── products/
│   │   │   ├── route.ts          # GET all, POST new
│   │   │   └── [id]/
│   │   │       └── route.ts      # GET, PUT, DELETE single
│   │   ├── cart/route.ts
│   │   ├── orders/
│   │   │   ├── route.ts          # POST new order
│   │   │   └── [id]/route.ts     # GET order details
│   │   ├── search/route.ts       # Search products
│   │   └── revalidate/
│   │       └── route.ts          # On-demand revalidation
│   │
│   └── middleware.ts             # Auth middleware
│
├── components/
│   ├── common/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── Providers.tsx          # Client context providers
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductFilter.tsx
│   │   └── ProductReviews.tsx
│   ├── cart/
│   │   ├── CartSummary.tsx
│   │   ├── CartItems.tsx
│   │   └── CartButton.tsx
│   ├── forms/
│   │   ├── ProductForm.tsx        # Admin form
│   │   ├── CheckoutForm.tsx
│   │   ├── LoginForm.tsx
│   │   └── FilterForm.tsx
│   └── loading/
│       ├── ProductSkeleton.tsx
│       └── LoadingSpinner.tsx
│
├── lib/
│   ├── db.ts                     # Prisma client singleton
│   ├── auth.ts                   # Auth utilities
│   ├── types.ts                  # Shared TypeScript types
│   ├── utils.ts                  # Helper functions
│   ├── constants.ts              # App constants
│   └── validation.ts             # Zod schemas
│
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── migrations/               # Auto-generated
│   └── seed.ts                   # Seed initial data
│
├── public/
│   ├── images/
│   └── assets/
│
├── styles/
│   ├── globals.css
│   └── variables.css
│
├── .env.local                     # Environment variables
├── .env.example
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── package.json
└── README.md
```

---

## 🚀 IMPLEMENTATION PHASES

### PHASE 1: SETUP & DATABASE
- [ ] Clone Vercel Commerce template
- [ ] Install Prisma
- [ ] Create `schema.prisma` with models above
- [ ] Create `.env.local` with database URL
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Create `prisma/seed.ts` with sample data
- [ ] Generate Prisma client types

### PHASE 2: CORE RENDERING PATTERNS
- [ ] Create `lib/db.ts` - Prisma singleton
- [ ] Create `lib/types.ts` - TypeScript definitions for models
- [ ] Implement **SSG+ISR** pattern for `/products/[slug]`
  - [ ] Use `generateStaticParams()` for pre-rendering
  - [ ] Use `revalidatePath()` on product update
- [ ] Implement **ISR** for `/products` listing
- [ ] Implement **SSR** for `/search` page
- [ ] Implement **CSR** for `/cart` with Zustand store

### PHASE 3: API ROUTES & SERVER ACTIONS
- [ ] Create API routes for CRUD operations
  - [ ] `GET /api/products` - List all
  - [ ] `POST /api/products` - Create (admin only)
  - [ ] `GET /api/products/[id]` - Get single
  - [ ] `PUT /api/products/[id]` - Update
  - [ ] `DELETE /api/products/[id]` - Delete
  - [ ] `GET /api/search?q=query` - Search
- [ ] Create Server Actions for mutations
  - [ ] Create order action
  - [ ] Update cart action
- [ ] All routes fully TypeScript-typed

### PHASE 4: AUTHENTICATION (Optional but recommended)
- [ ] Setup NextAuth.js or custom auth
- [ ] Protect admin routes with role check
- [ ] User profile page
- [ ] Order history page

### PHASE 5: ADMIN PANEL
- [ ] Product management (CRUD)
- [ ] Category management
- [ ] Order management dashboard
- [ ] Basic analytics

### PHASE 6: OPTIMIZATION & TESTING
- [ ] Add `revalidate` headers to all pages
- [ ] Test rendering strategies in production build
- [ ] Run Lighthouse audit
- [ ] Fix performance issues
- [ ] Screenshot results for thesis

---

## 📝 DETAILED CODING REQUIREMENTS

### 1. ALL FILES MUST BE TYPESCRIPT
- ✅ No `.js` files
- ✅ All components have typed props
- ✅ All functions have return types
- ✅ Use `type` and `interface` consistently

Example:
```typescript
// ❌ BAD
export function ProductCard({ product }) {
  return <div>{product.name}</div>;
}

// ✅ GOOD
interface ProductCardProps {
  product: Product;
  onAddToCart: (id: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps): JSX.Element {
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
    </div>
  );
}
```

### 2. SERVER COMPONENTS BY DEFAULT
- ✅ All components are Server Components by default
- ✅ Only add `'use client'` when needed (interactivity, hooks, browser APIs)
- ✅ Use Server Components for data fetching

Example:
```typescript
// ✅ GOOD - Server Component (fetch data)
async function ProductList() {
  const products = await db.product.findMany();
  return (
    <div>
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

// ✅ GOOD - Client Component (interactivity)
'use client';

interface CartButtonProps {
  productId: string;
}

export function CartButton({ productId }: CartButtonProps) {
  const handleClick = () => {
    // Add to cart
  };
  return <button onClick={handleClick}>Add to Cart</button>;
}
```

### 3. DATA FETCHING PATTERNS

#### For SSG + ISR:
```typescript
// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: { slug: string };
}

export const revalidate = 60; // ISR: revalidate every 60 seconds

export async function generateStaticParams() {
  const products = await db.product.findMany({
    select: { slug: true },
  });
  return products.map(p => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await db.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });
  
  if (!product) notFound();
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <AddToCartButton productId={product.id} />
    </div>
  );
}
```

#### For SSR:
```typescript
// app/search/page.tsx
interface SearchPageProps {
  searchParams: { q?: string };
}

export const revalidate = 0; // SSR: no cache

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  
  const products = await db.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
  });
  
  return <ProductGrid products={products} />;
}
```

### 4. API ROUTES - ALL TYPED
```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const products = await db.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate with Zod
    const validated = CreateProductSchema.parse(body);
    
    const product = await db.product.create({
      data: validated,
    });
    
    // Revalidate product listing
    revalidatePath('/products');
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 400 }
    );
  }
}
```

### 5. VALIDATION WITH ZOD
```typescript
// lib/validation.ts
import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  categoryId: z.string().cuid(),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
```

### 6. STATE MANAGEMENT - ZUSTAND
```typescript
// lib/store.ts
'use client';

import { create } from 'zustand';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  addItem: (productId) => set((state) => {
    const existing = state.items.find(i => i.productId === productId);
    if (existing) {
      return {
        items: state.items.map(i =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };
    }
    return {
      items: [...state.items, { productId, quantity: 1 }],
    };
  }),
  removeItem: (productId) => set((state) => ({
    items: state.items.filter(i => i.productId !== productId),
  })),
}));
```

---

## 🧪 TESTING & VALIDATION CHECKLIST

Before considering project complete, verify:

- [ ] **TypeScript**: `npm run typecheck` passes
- [ ] **Build**: `npm run build` succeeds without warnings
- [ ] **Lint**: `npm run lint` passes
- [ ] **Database**: Prisma migrations work
- [ ] **Rendering**:
  - [ ] SSG pages pre-render correctly
  - [ ] ISR revalidates on schedule
  - [ ] SSR pages load fresh data
  - [ ] CSR pages work with JavaScript disabled initially
- [ ] **Performance**: 
  - [ ] Lighthouse > 90 Performance
  - [ ] Lighthouse 100 SEO
  - [ ] Core Web Vitals pass
- [ ] **Screenshots**: Capture all pages for thesis

---

## 🎯 FINAL DELIVERABLES FOR THESIS

For Chương 4 (Implementation), you need:

1. **Code Repository**: Complete, working e-commerce site
2. **Architecture Diagram**: Show how rendering strategies applied
3. **Database Schema**: Show ERD
4. **Performance Metrics**: Lighthouse scores, load times
5. **Screenshots**: 
   - Homepage (SSG+ISR)
   - Product listing (ISR)
   - Product detail (SSG+ISR)
   - Cart (CSR)
   - Checkout (SSR)
   - Admin panel
   - Successful order
6. **User Flow Documentation**: Test scenarios with screenshots

---

## 💡 TIPS FOR KIRO

When using Kiro for this project:

1. **Split work into tasks**: 
   - "Setup Prisma schema with all models"
   - "Create ProductCard component with TypeScript"
   - "Implement SSG+ISR for /products/[slug]"
   - etc.

2. **Reference files when asking**: 
   - "In app/products/page.tsx, add ISR revalidate = 30"
   - "Check lib/db.ts and create similar instance"

3. **Ask for type-safe patterns**:
   - Always ask Kiro to "Use TypeScript types"
   - "Make this a Server Component with typed props"
   - "Add Zod validation for this API route"

4. **Verify before committing**:
   - Build locally: `npm run build`
   - Check types: `npx tsc --noEmit`
   - Test page rendering

---

## 📚 REFERENCES

- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- TypeScript Handbook: https://www.typescriptlang.org/docs
- React Server Components: https://react.dev/reference/rsc/server-components
- Vercel Commerce: https://github.com/vercel/commerce

---

**Good luck! You've got this! 🚀**
