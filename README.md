# NextCommerce - Nền Tảng Thương Mại Điện Tử Hybrid Rendering

> **Báo cáo Đề tài Niên Luận**  
> **Sinh viên thực hiện:** Bùi Nguyễn Nhật Huy (HUSC K47)  
> **Đơn vị:** Khoa Công nghệ Thông tin - Trường Đại học Khoa học, Đại học Huế  
> **Nội dung nghiên cứu:** Ứng dụng Next.js 15 App Router, Turbopack, Prisma ORM và kiến trúc Hybrid Rendering (SSG, ISR, SSR, CSR) vào bài toán xây dựng hệ thống E-commerce hiện đại.

---

## 🚀 Công Nghệ Sử Dụng

- **Framework:** Next.js 15 (App Router, Turbopack)
- **UI Library:** React 19, Lucide React Icons
- **Ngôn ngữ:** TypeScript (Strict Type Checking)
- **Styling:** Tailwind CSS v4, Vanilla CSS Utilities
- **Database & ORM:** SQLite (`prisma/dev.db`), Prisma ORM 5.x
- **State Management:** Zustand (với LocalStorage Persistence cho Cart & Auth)
- **Validation:** Zod Schema Validation

---

## 📂 Cấu Trúc Thư Mục Dự Án (Project Structure)

Dự án được tổ chức khoa học theo chuẩn **Next.js App Router**, tách bạch rõ ràng giữa tầng hiển thị (UI components), tầng dữ liệu (Database/Prisma), tầng xử lý logic (Lib/Stores) và hệ thống Routing:

```text
e-commerce/
├── 📁 app/                               # Next.js App Router (Routing, Layouts & API)
│   ├── 📁 about/                         # Trang giới thiệu đề tài niên luận (SSG)
│   │   └── page.tsx
│   ├── 📁 admin/                         # Khu vực quản trị hệ thống (Admin Dashboard)
│   │   ├── 📁 customers/                 # Quản lý khách hàng, phân quyền, trạng thái
│   │   ├── 📁 orders/                    # Quản lý & xử lý trạng thái đơn hàng
│   │   ├── 📁 products/                  # Quản lý kho, thêm/sửa/xóa sản phẩm
│   │   │   ├── 📁 [id]/edit/             # Trang chỉnh sửa thông tin sản phẩm
│   │   │   ├── 📁 new/                   # Trang tạo sản phẩm mới
│   │   │   └── page.tsx
│   │   ├── layout.tsx                    # Layout bọc AdminAuthGuard bảo vệ route
│   │   └── page.tsx                      # Tự động điều hướng vào /admin/products
│   ├── 📁 api/                           # Backend REST API Endpoints (Next.js Route Handlers)
│   │   ├── 📁 admin/                     # API thống kê, quản lý người dùng & sản phẩm
│   │   ├── 📁 auth/                      # API đăng ký, đăng nhập, gửi OTP xác thực
│   │   ├── 📁 categories/                # API danh mục sản phẩm
│   │   ├── 📁 orders/                    # API tạo và cập nhật trạng thái đơn hàng
│   │   ├── 📁 products/                  # API CRUD sản phẩm & đánh giá (reviews)
│   │   └── 📁 search/                    # API gợi ý tìm kiếm theo thời gian thực
│   ├── 📁 cart/                          # Trang giỏ hàng người dùng (CSR + Zustand)
│   │   └── page.tsx
│   ├── 📁 checkout/                      # Trang thanh toán và nhập thông tin giao hàng
│   │   └── page.tsx
│   ├── 📁 login/                         # Trang đăng nhập người dùng & quản trị viên
│   ├── 📁 orders/                        # Hệ thống tra cứu và quản lý đơn hàng
│   │   ├── 📁 [id]/                      # Chi tiết đơn hàng & xác nhận đặt hàng (SSR)
│   │   └── page.tsx                      # Tra cứu tình trạng đơn theo mã ORD / SĐT
│   ├── 📁 privacy/                       # Trang chính sách bảo mật thông tin (SSG)
│   ├── 📁 products/                      # Hệ thống hiển thị sản phẩm
│   │   ├── 📁 [slug]/                    # Trang chi tiết sản phẩm (ISR - revalidate: 60s)
│   │   └── page.tsx                      # Danh sách sản phẩm kết hợp bộ lọc (SSG + CSR)
│   ├── 📁 profile/                       # Trang quản lý thông tin cá nhân & lịch sử mua sắm
│   ├── 📁 register/                      # Trang đăng ký tài khoản với OTP verification
│   ├── 📁 search/                        # Trang kết quả tìm kiếm sản phẩm (SSR)
│   ├── 📁 stores/                        # Trang hệ thống showroom & chi nhánh cửa hàng
│   ├── 📁 terms/                         # Trang điều khoản sử dụng & chính sách bảo hành (SSG)
│   ├── error.tsx                         # Error boundary xử lý ngoại lệ toàn cục
│   ├── globals.css                       # Global styles & Tailwind CSS configuration
│   ├── layout.tsx                        # Root layout (Header, Footer, Toast notifications)
│   ├── opengraph-image.tsx               # Tự động tạo ảnh OpenGraph qua Next.js ImageResponse
│   ├── page.tsx                          # Trang chủ (Homepage - SSG + ISR)
│   ├── robots.ts                         # Cấu hình crawler SEO (robots.txt)
│   └── sitemap.ts                        # Sitemap XML động trích xuất trực tiếp từ SQLite/Prisma
│
├── 📁 components/                        # UI Components (Reusable & Clean Architecture)
│   ├── 📁 admin/                         # Giao diện dành riêng cho Admin
│   │   ├── AdminAuthGuard.tsx            # Component chặn truy cập trái phép
│   │   ├── AdminNavBar.tsx               # Thanh điều hướng các phân hệ quản trị
│   │   ├── CustomerManagementClient.tsx  # Bảng quản lý khách hàng & phân quyền
│   │   └── ProductForm.tsx               # Form thêm/sửa sản phẩm với preview ảnh
│   ├── 📁 cart/                          # Component liên quan đến giỏ hàng
│   │   └── AddToCartButton.tsx           # Nút thêm vào giỏ hàng kèm hiệu ứng phản hồi
│   ├── 📁 common/                        # Thành phần giao diện dùng chung toàn trang
│   │   ├── Footer.tsx                    # Chân trang thông tin, liên kết, bản quyền
│   │   ├── Header.tsx                    # Thanh điều hướng chính (Logo, Menu, Cart, Auth)
│   │   ├── HeaderSearch.tsx              # Thanh tìm kiếm thông minh với animation thu kính lúp
│   │   ├── HeroAuthSection.tsx           # Khối hiển thị trạng thái đăng nhập trên Hero Banner
│   │   ├── HeroBannerActions.tsx         # Nút điều hướng nhanh trên trang chủ
│   │   └── RenderingBadge.tsx            # Badge trực quan hóa chiến lược Rendering (SSG/ISR/SSR/CSR)
│   ├── 📁 icons/                         # SVG icons tùy biến
│   │   └── logo.tsx
│   ├── 📁 products/                      # Component liên quan đến hiển thị sản phẩm
│   │   ├── ProductCard.tsx               # Thẻ hiển thị sản phẩm với badge giá, rating, ảnh
│   │   ├── ProductFilter.tsx             # Bộ lọc danh mục, khoảng giá, sắp xếp
│   │   ├── ProductGrid.tsx               # Grid bố cục danh sách sản phẩm responsive
│   │   └── ProductImageGallery.tsx       # Bộ sưu tập ảnh sản phẩm với thumbnail tương tác
│   └── 📁 stores/                        # Component hệ thống cửa hàng
│       └── StoreListClient.tsx           # Bộ lọc khu vực (Miền Bắc, Trung, Nam) & tìm kiếm showroom
│
├── 📁 lib/                               # Business Logic, Database Client & State Stores
│   ├── auth-store.ts                     # Zustand store quản lý phiên đăng nhập người dùng
│   ├── db.ts                             # Singleton Prisma Client kết nối SQLite an toàn
│   ├── otp-store.ts                      # Zustand store quản lý mã OTP tạm thời
│   ├── store.ts                          # Zustand store quản lý giỏ hàng (Cart State)
│   ├── types.ts                          # Định nghĩa TypeScript Interfaces toàn cục
│   ├── utils.ts                          # Hàm tiện ích (định dạng tiền tệ, xử lý URL)
│   └── validation.ts                     # Schemas Zod validate dữ liệu đầu vào
│
├── 📁 prisma/                            # Cơ sở dữ liệu & Cấu hình ORM
│   ├── dev.db                            # SQLite Database chứa dữ liệu thực nghiệm
│   ├── schema.prisma                     # Định nghĩa Schema bảng: User, Product, Category, Order, Review
│   └── seed.ts                           # Kịch bản nạp dữ liệu mẫu ban đầu
│
├── 📁 public/                            # Tài nguyên tĩnh (Static Assets, Icons, Favicon)
├── package.json                          # Khai báo thư viện & script lệnh
├── tsconfig.json                         # Cấu hình TypeScript compiler
└── README.md                             # Tài liệu hướng dẫn & mô tả đề tài
```

---

## ⚡ Chiến Lược Rendering Trong Dự Án (Hybrid Architecture)

| Chiến lược | Trang áp dụng | Cơ chế hoạt động | Ưu điểm |
| :--- | :--- | :--- | :--- |
| **SSG** *(Static Site Generation)* | Trang chủ `/`, `/about`, `/terms`, `/privacy` | Build sẵn thành HTML tĩnh lúc build time. | Tốc độ load tức thì (TTFB < 50ms), tối ưu SEO tối đa. |
| **ISR** *(Incremental Static Regeneration)* | Chi tiết sản phẩm `/products/[slug]` | HTML tĩnh được tạo sẵn và tự động revalidate lại sau mỗi khoảng chu kỳ (60s). | Vừa có tốc độ của static vừa cập nhật được giá bán và số lượng kho mới nhất. |
| **SSR** *(Server-Side Rendering)* | Tìm kiếm `/search`, Chi tiết đơn hàng `/orders/[id]` | Server render động theo từng request chứa query/params mới nhất. | Dữ liệu chính xác 100% theo thời gian thực và bảo mật thông tin đơn hàng. |
| **CSR** *(Client-Side Rendering)* | Giỏ hàng `/cart`, Lọc showroom `/stores`, Admin Panels | Render tại trình duyệt, kết hợp Zustand store và LocalStorage. | Trải nghiệm tương tác mượt mà, phản hồi tức thì không cần tải lại trang. |

---

## 🛠️ Hướng Dẫn Cài Đặt & Chạy Cục Bộ (Local Development)

### 1. Yêu cầu môi trường
- **Node.js:** phiên bản `18.x` hoặc `20.x` trở lên
- **Trình quản lý gói:** `pnpm` (khuyến nghị), `npm` hoặc `yarn`

### 2. Cài đặt Dependencies
```bash
pnpm install
```

### 3. Đồng bộ Cơ sở dữ liệu (Prisma & SQLite)
```bash
# Tạo schema trong SQLite (nếu chưa có file dev.db)
npx prisma db push

# Nạp dữ liệu mẫu (Sản phẩm, danh mục, tài khoản demo)
npx tsx prisma/seed.ts
```

### 4. Khởi chạy máy chủ phát triển
```bash
pnpm run dev
```

Truy cập ứng dụng tại: [http://localhost:3000](http://localhost:3000)

---

## 📌 Các Tính Năng Nổi Bật Đã Triển Khai

1. **Giao diện & Trải nghiệm:**
   - Thiết kế giao diện hiện đại, responsive hoàn chỉnh trên thiết bị di động, tablet và desktop.
   - Thanh tìm kiếm thông minh (`HeaderSearch.tsx`) tích hợp hiệu ứng thu gọn kính lúp khi gõ và gợi ý sản phẩm trực tiếp.
   - Tối ưu SEO với metadata chuẩn, OpenGraph động (`next/og`) và file sitemap XML tự động sinh theo cơ sở dữ liệu.
2. **Kinh doanh & Bán hàng:**
   - Bộ lọc sản phẩm đa tiêu chí: danh mục, khoảng giá, trạng thái tồn kho, sắp xếp theo giá/độ mới.
   - Thêm vào giỏ hàng tức thời với thông báo Toast chuyên nghiệp.
   - Quy trình đặt hàng (Checkout) và hệ thống tra cứu đơn hàng trực tuyến (`/orders`).
3. **Trang thông tin & Hệ thống cửa hàng:**
   - Hệ thống showroom (`/stores`) lọc theo vùng miền (Bắc - Trung - Nam) kèm liên kết Google Maps chỉ đường.
   - Đầy đủ trang Điều khoản dịch vụ (`/terms`), Chính sách bảo mật (`/privacy`) và Giới thiệu đề tài (`/about`).
4. **Quản trị hệ thống (Admin Portal):**
   - Bảng điều khiển quản lý kho hàng, thống kê doanh thu, số lượng đơn, hàng sắp hết.
   - Quản lý danh sách khách hàng và trạng thái kích hoạt tài khoản.
