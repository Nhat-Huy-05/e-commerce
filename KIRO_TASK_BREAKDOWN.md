# 🎯 KIRO TASK BREAKDOWN - Specific Prompts

Use these prompts khi bạn đã clone template và sẵn sàng code.

---

## ✅ TASK 1: Setup Prisma & Database

**Prerequisites**: Template cloned, Node installed

**Prompt for Kiro**:
```
I'm working on a Next.js e-commerce thesis project. I need to:

1. Install and configure Prisma ORM
2. Create a complete Prisma schema with these models:
   - User (id, email, password, name, role)
   - Category (id, name, slug, description, image)
   - Product (id, name, slug, description, price, discountPrice, stock, images, rating, isFeatured, categoryId, timestamps)
   - Order (id, orderNumber, userId, items, shipping info, payment, status, timestamps)
   - OrderItem (id, orderId, productId, quantity, price)
   - Review (id, productId, rating, title, content, timestamps)

3. Include proper:
   - Relations (@relation)
   - Indexes for queries
   - Timestamps (@default(now()), @updatedAt)
   - Constraints (@unique, required/optional)
   - Fulltext search if possible

4. Create migration file
5. Create seed.ts with sample data (10 categories, 50 products, 5 orders)

Output: Save as prisma/schema.prisma and create prisma/seed.ts

Use TypeScript for seed.ts
```

**Expected Output**:
- [ ] `prisma/schema.prisma` created
- [ ] `prisma/seed.ts` created
- [ ] `.env.local` has DATABASE_URL
- [ ] Migration created: `npx prisma migrate dev --name init`
- [ ] Seed data loaded: `npx prisma db seed`

---

## ✅ TASK 2: Create lib/db.ts & Types

**Prompt for Kiro**:
```
Create utility files for database access:

1. lib/db.ts
   - Prisma client singleton
   - Proper TypeScript export
   - Use best practices from Next.js docs

2. lib/types.ts
   - Export all Prisma model types (Product, Order, User, etc.)
   - Create extended types if needed:
     - ProductWithCategory = Product + Category relation
     - OrderWithItems = Order + OrderItem[] + User
   
3. Include proper TypeScript:
   - All exports are typed
   - No 'any' types
   - Re-export from Prisma types

Use this pattern:
export type Product = Prisma.ProductGetPayload<{ include: { category: true } }>;
```

**Expected Output**:
- [ ] `lib/db.ts` - Prisma singleton
- [ ] `lib/types.ts` - All TypeScript types
- [ ] Can import types across project

---

## ✅ TASK 3: Create lib/validation.ts with Zod

**Prompt for Kiro**:
```
Create Zod validation schemas for form submissions and API requests:

Create lib/validation.ts with these schemas:

1. CreateProductSchema
   - name: min 1, max 255
   - description: min 1
   - price: positive number
   - stock: non-negative integer
   - categoryId: string (cuid)
   - images: string array

2. UpdateProductSchema (same as create, but all optional)

3. CreateOrderSchema
   - userId: string
   - items: array of { productId: string, quantity: number }
   - shippingName, shippingEmail, shippingPhone, shippingAddress: string
   - shippingCity, shippingCountry, shippingZipCode: string

4. CreateCategorySchema
   - name: string min 1
   - slug: string min 1
   - description: optional

Export types using z.infer<typeof Schema>

Example pattern to follow:
export const ProductSchema = z.object({ ... });
export type ProductInput = z.infer<typeof ProductSchema>;
```

**Expected Output**:
- [ ] `lib/validation.ts` with all schemas
- [ ] Can import types from schemas
- [ ] Zod installed

---

## ✅ TASK 4: Create API Routes - Products CRUD

**Prompt for Kiro**:
```
Create fully typed API routes for product management:

1. app/api/products/route.ts
   GET: Fetch all products with pagination (limit, offset)
     - Return: Product[]
     - Handle errors
   POST: Create new product (admin only)
     - Validate with CreateProductSchema
     - Use Prisma create
     - Revalidate cache with revalidatePath('/products')
     - Return: Product + 201

2. app/api/products/[id]/route.ts
   GET: Fetch single product by ID
     - Include category relation
     - Include reviews
     - Return 404 if not found
   PUT: Update product (admin only)
     - Validate with UpdateProductSchema
     - Update with Prisma
     - Revalidate: revalidatePath('/products/[id]')
     - Return: Updated Product
   DELETE: Delete product (admin only)
     - Revalidate paths
     - Return: success message

All routes should:
- Use NextRequest & NextResponse types
- Be fully TypeScript typed
- Handle errors with try/catch
- Return proper status codes (200, 201, 400, 404, 500)
- Validate with Zod before using data

Example error handling:
catch (error) {
  return NextResponse.json(
    { error: 'Failed to fetch products' },
    { status: 500 }
  );
}
```

**Expected Output**:
- [ ] `app/api/products/route.ts` - GET all, POST new
- [ ] `app/api/products/[id]/route.ts` - GET, PUT, DELETE
- [ ] All routes fully typed
- [ ] Zod validation before mutations
- [ ] Proper error handling

---

## ✅ TASK 5: Create API Search Route

**Prompt for Kiro**:
```
Create a search API route:

1. app/api/search/route.ts
   - GET with query parameter: ?q=search_term
   - Search in Product name and description
   - Use Prisma findMany with OR condition and mode: 'insensitive'
   - Support pagination: ?limit=20&offset=0
   - Return: Product[] (with category)
   
Pattern:
const products = await db.product.findMany({
  where: {
    OR: [
      { name: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
    ],
  },
  include: { category: true },
  take: limit,
  skip: offset,
});

Type everything with TypeScript
```

**Expected Output**:
- [ ] `app/api/search/route.ts`
- [ ] Fully typed
- [ ] Handles pagination

---

## ✅ TASK 6: Create ServerComponent - Homepage (SSG+ISR)

**Prompt for Kiro**:
```
Create a type-safe homepage with SSG + ISR:

app/page.tsx should:
1. Be a Server Component (async component)
2. Set revalidate = 60 (ISR - revalidate every 60 seconds)
3. Fetch featured products:
   const products = await db.product.findMany({
     where: { isFeatured: true },
     include: { category: true },
     take: 8,
   });
4. Display:
   - Hero section (static text or from DB)
   - Featured products grid
   - Categories section
   - CTA buttons

5. Use TypeScript interfaces for props
6. Import shadcn/ui components if available (Button, Card)
7. Keep styling with Tailwind CSS

Pattern:
export const revalidate = 60;

export default async function Home() {
  const products = await db.product.findMany(...);
  
  return (
    <div>
      <HeroSection />
      <ProductGrid products={products} />
    </div>
  );
}
```

**Expected Output**:
- [ ] `app/page.tsx` - Homepage Server Component
- [ ] Fetches featured products
- [ ] Has `revalidate = 60`
- [ ] Styled with Tailwind
- [ ] Fully typed

---

## ✅ TASK 7: Create ServerComponent - Product Listing (ISR)

**Prompt for Kiro**:
```
Create product listing page with ISR:

app/products/page.tsx should:
1. Be Server Component with revalidate = 30
2. Accept searchParams for:
   - category filter
   - sort (price, rating, newest)
   - page for pagination
3. Fetch products based on filters:
   - If categoryId: filter by categoryId
   - Sort by query param
   - Pagination (limit 12, offset page*12)
4. Include category relation
5. Display:
   - ProductFilter component (Client Component for interactivity)
   - ProductGrid showing products
   - Pagination buttons

TypeScript everything.

Example:
export const revalidate = 30;

interface ProductPageProps {
  searchParams?: {
    category?: string;
    sort?: string;
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductPageProps) {
  // Validate and parse searchParams
  // Fetch products with filters
  // Return JSX
}
```

**Expected Output**:
- [ ] `app/products/page.tsx` - Product listing
- [ ] `revalidate = 30` for ISR
- [ ] Filters products based on searchParams
- [ ] Typed props
- [ ] Includes ProductFilter component reference

---

## ✅ TASK 8: Create ServerComponent - Product Detail (SSG+ISR)

**Prompt for Kiro**:
```
Create product detail page with SSG + ISR:

app/products/[slug]/page.tsx should:
1. Have revalidate = 60 (ISR)
2. Implement generateStaticParams:
   - Fetch all products
   - Return array of { slug: product.slug }
   - This pre-renders all product pages at build time
3. Dynamic route handler:
   - Get slug from params
   - Fetch product by slug with db.product.findUnique()
   - Include: { category: true, reviews: true }
   - notFound() if not found
4. Display:
   - Product image
   - Price (with discount if available)
   - Stock status
   - Description
   - Reviews section
   - "Add to Cart" button (Client Component)

Example pattern:
export const revalidate = 60;

export async function generateStaticParams() {
  const products = await db.product.findMany({
    select: { slug: true },
  });
  return products.map(p => ({ slug: p.slug }));
}

interface ProductPageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await db.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });
  
  if (!product) notFound();
  
  return (
    <div>
      {/* Product details */}
      <AddToCartButton productId={product.id} />
    </div>
  );
}
```

**Expected Output**:
- [ ] `app/products/[slug]/page.tsx`
- [ ] generateStaticParams implemented
- [ ] revalidate = 60
- [ ] Fetches with relations
- [ ] Uses notFound() for missing
- [ ] Fully typed

---

## ✅ TASK 9: Create Client Component - AddToCart Button & Cart Store

**Prompt for Kiro**:
```
Create Zustand store and client components for cart:

1. lib/store.ts (or hooks/useCart.ts)
   Create Zustand store with:
   - items: Array<{ productId: string, quantity: number }>
   - addItem(productId: string): void
   - removeItem(productId: string): void
   - updateQuantity(productId: string, quantity: number): void
   - clearCart(): void
   - getTotalPrice(products): number (calculate from store items + product prices)

Use TypeScript:
export const useCart = create<CartStore>((set, get) => ({
  items: [],
  addItem: (productId) => set((state) => ({
    items: [...state.items, { productId, quantity: 1 }]
  })),
  // ... other actions
}));

2. components/AddToCartButton.tsx
   - 'use client' directive
   - Props: productId: string, price?: number
   - Call useCart().addItem(productId)
   - Show success toast/message

3. lib/constants.ts or store config:
   - Export store types

All TypeScript typed.
```

**Expected Output**:
- [ ] `lib/store.ts` - Zustand cart store
- [ ] `components/AddToCartButton.tsx` - Client component
- [ ] Fully typed
- [ ] addItem works

---

## ✅ TASK 10: Create ServerComponent - Search Page (SSR)

**Prompt for Kiro**:
```
Create dynamic search results page with SSR:

app/search/page.tsx should:
1. NO revalidate (or revalidate = 0) - This forces SSR
2. Accept searchParams.q for search query
3. Fetch products matching query:
   - Use /api/search or direct Prisma
   - Query product name and description
   - Case-insensitive search
4. Display:
   - Search query in header
   - Number of results
   - Product grid
   - "No results" message if empty

Example:
export const revalidate = 0; // Force SSR

interface SearchPageProps {
  searchParams?: { q?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams?.q || '';
  
  const products = await db.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
  });
  
  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
}
```

**Expected Output**:
- [ ] `app/search/page.tsx`
- [ ] `revalidate = 0` for SSR
- [ ] Typed searchParams
- [ ] Fetches dynamically

---

## ✅ TASK 11: Create Client Component - Shopping Cart Page (CSR)

**Prompt for Kiro**:
```
Create cart page that works as CSR:

app/cart/page.tsx should:
1. Be 'use client'
2. Use useCart() hook to get items
3. Fetch product details for each item (use useEffect + fetch or TanStack Query)
4. Display:
   - Table/List of cart items
   - Product image, name, price
   - Quantity selector (with -, +, input)
   - Remove button for each item
   - Subtotal, Tax, Total calculations
   - "Proceed to Checkout" button
   - "Continue Shopping" link

5. Interactions:
   - Change quantity → Update store
   - Remove item → Update store
   - Checkout → Redirect to /checkout

Use TypeScript for all props and state.

Pattern:
'use client';

import { useCart } from '@/lib/store';

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Fetch products for items
  }, [items]);
  
  return (
    <div>
      {items.length > 0 ? (
        <>
          <CartItems items={items} products={products} />
          <CartSummary items={items} products={products} />
        </>
      ) : (
        <EmptyCartMessage />
      )}
    </div>
  );
}
```

**Expected Output**:
- [ ] `app/cart/page.tsx` - CSR component
- [ ] 'use client' directive
- [ ] Uses useCart() store
- [ ] Fetches product details
- [ ] Quantity adjustments
- [ ] Total calculations

---

## ✅ TASK 12: Create ServerComponent - Checkout Page (SSR)

**Prompt for Kiro**:
```
Create checkout page with SSR for security:

app/checkout/page.tsx should:
1. NO 'use client' - This is a Server Component with form
2. NO revalidate (forces SSR = revalidate: 0)
3. Fetch current prices from DB to validate order
4. Create form with:
   - Shipping section (name, email, phone, address, city, country, zip)
   - Payment method selector (credit_card, bank_transfer, cash_on_delivery)
   - Order summary (show products, current prices, total)
5. Form action (Server Action):
   - Validate with Zod
   - Check stock availability
   - Verify prices haven't changed
   - Create Order in DB
   - Clear cart
   - Redirect to /orders/[orderId]

Example Server Action:
async function createOrder(formData: FormData) {
  'use server';
  
  const shippingName = formData.get('shippingName') as string;
  // ... parse other fields
  
  const validated = CreateOrderSchema.parse({
    shippingName,
    shippingEmail,
    // ...
  });
  
  const order = await db.order.create({
    data: {
      // ... order data
    },
  });
  
  revalidatePath('/orders');
  redirect(`/orders/${order.id}`);
}

This ensures:
- Prices are always current (checked at order time)
- Stock is verified
- No client manipulation possible
```

**Expected Output**:
- [ ] `app/checkout/page.tsx` - Server Component
- [ ] `revalidate = 0` for SSR
- [ ] Server Action for form submission
- [ ] Validates order data
- [ ] Checks stock/prices
- [ ] Creates Order in DB

---

## ✅ TASK 13: Create ServerComponent - Order Confirmation Page (SSR)

**Prompt for Kiro**:
```
Create order confirmation page:

app/orders/[id]/page.tsx should:
1. Server Component with revalidate = 0 (SSR)
2. Fetch order by ID with relations:
   await db.order.findUnique({
     where: { id: params.id },
     include: { 
       user: true,
       items: { include: { product: true } }
     },
   });
3. notFound() if order doesn't exist
4. Display:
   - Order number and date
   - Order status
   - Shipping address
   - Order items (products, quantities, prices)
   - Total amount
   - Payment status
   - Estimated delivery
   - Links: "Continue Shopping", "View Order History"

Example:
interface OrderPageProps {
  params: { id: string };
}

export const revalidate = 0;

export default async function OrderPage({ params }: OrderPageProps) {
  const order = await db.order.findUnique({
    where: { id: params.id },
    include: { items: { include: { product: true } } },
  });
  
  if (!order) notFound();
  
  return <OrderConfirmation order={order} />;
}
```

**Expected Output**:
- [ ] `app/orders/[id]/page.tsx`
- [ ] Fetches order with relations
- [ ] revalidate = 0 for SSR
- [ ] Shows order details

---

## ✅ TASK 14: Create Admin Panel - Product Management

**Prompt for Kiro**:
```
Create admin product management pages:

1. app/admin/layout.tsx
   - Protect with auth check (Server Component)
   - Check if user.role === 'admin'
   - Redirect to login if not authenticated
   - Redirect to home if not admin
   - Show admin navbar/sidebar

2. app/admin/products/page.tsx
   - Server Component, SSR (revalidate = 0)
   - Fetch all products with pagination
   - Display as table:
     - Product name, sku, price, stock, category
     - Edit button
     - Delete button
   - "Add New Product" button

3. app/admin/products/[id]/edit/page.tsx
   - Server Component for layout
   - Fetch product by ID
   - Render ProductForm (Client Component)
   - Form handles:
     - Update product details
     - Upload images (or input image URL)
     - Submit to API
     - Revalidate product page

4. app/admin/products/new/page.tsx
   - Same as edit but for creating new product

ProductForm should be Client Component with:
- React Hook Form
- Zod validation
- Submit to POST /api/products or PUT /api/products/[id]

TypeScript everything.
```

**Expected Output**:
- [ ] `app/admin/layout.tsx` - Auth guard
- [ ] `app/admin/products/page.tsx` - List products
- [ ] `app/admin/products/[id]/edit/page.tsx` - Edit form
- [ ] `app/admin/products/new/page.tsx` - Create form
- [ ] `components/ProductForm.tsx` - Reusable form
- [ ] React Hook Form + Zod

---

## ✅ TASK 15: Create Reusable Components

**Prompt for Kiro**:
```
Create foundational UI components with TypeScript:

1. components/ProductCard.tsx
   Props: Product, showDeleteButton?: boolean
   Display: Image, name, price, rating, add-to-cart button

2. components/ProductGrid.tsx
   Props: products: Product[]
   Layout: Grid of ProductCards

3. components/ProductFilter.tsx (Client Component 'use client')
   Props: categories: Category[]
   Features: Filter by category, sort, price range
   Emit: Update URL searchParams

4. components/CartSummary.tsx
   Props: items, products
   Display: Subtotal, tax, total, checkout button

5. components/Header.tsx (Server Component)
   Display: Logo, navigation, search bar, cart icon
   Cart icon shows item count from cookies or DB

6. components/Footer.tsx
   Static content, links

All must have:
- TypeScript Props interfaces
- Tailwind CSS styling
- Proper JSX structure
- shadcn/ui components if available

Example:
interface ProductCardProps {
  product: Product;
  onAddToCart?: (id: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <img src={product.thumbnail} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart?.(product.id)}>Add to Cart</button>
    </div>
  );
}
```

**Expected Output**:
- [ ] `components/ProductCard.tsx`
- [ ] `components/ProductGrid.tsx`
- [ ] `components/ProductFilter.tsx`
- [ ] `components/CartSummary.tsx`
- [ ] `components/Header.tsx`
- [ ] `components/Footer.tsx`
- [ ] All fully typed

---

## 🎬 **FINAL STEP: Build & Test**

**Prompt for Kiro**:
```
After completing all pages, run:

1. npm run build
   - Check for TypeScript errors
   - Check for build warnings

2. npx tsc --noEmit
   - Verify no type errors

3. npm run lint
   - Check code style

4. npm run dev
   - Test in browser
   - Check all pages load
   - Test SSG/ISR/SSR behavior

5. Run Lighthouse audit:
   - Performance
   - SEO
   - Accessibility
   - Best Practices

Report findings.
```

---

## 📸 **CAPTURE SCREENSHOTS**

For your thesis, take screenshots of:
- [ ] Homepage (SSG+ISR)
- [ ] Product listing (ISR)
- [ ] Product detail (SSG+ISR)
- [ ] Search results (SSR)
- [ ] Shopping cart (CSR)
- [ ] Checkout (SSR)
- [ ] Order confirmation (SSR)
- [ ] Admin products list
- [ ] Admin edit product
- [ ] Lighthouse scores
- [ ] Build output showing render strategies

---

**Use this breakdown to guide Kiro through the entire project! 🚀**
