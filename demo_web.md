# Demo Web – Dự Án E-Commerce (Next.js)

> Tài liệu này trình bày các màn hình thực tế của web dự án, đối chiếu với phần **Thiết kế giao diện** và **Thiết kế hệ thống** trong 3 báo cáo.

---

## 1. Trang Chủ (Home Page)

**Route:** `/`

### Những gì hiển thị
- **Banner hero** toàn chiều rộng: ảnh nền, gradient overlay, tiêu đề, CTA "Khám phá ngay" → `/products`, nút "Admin Dashboard" → `/admin/products`.
- **HeroAuthSection**: hiển thị nút Đăng nhập / Đăng ký theo trạng thái session người dùng.
- **3 Perk Cards**: Miễn phí vận chuyển, Bảo hành chính hãng, Thanh toán an toàn.
- **Sản phẩm nổi bật** (isFeatured=true, tối đa 8 sản phẩm) – dạng grid.
- **Danh mục sản phẩm** – hiển thị tất cả category kèm số lượng sản phẩm.

### Đối chiếu báo cáo
| Yêu cầu trong báo cáo | Có trên web? |
|---|---|
| Trang chủ hiển thị tổng quan hệ thống, menu nhanh (Bida) | ✅ Banner + CTA + Category |
| Hiển thị thực đơn/sản phẩm theo danh mục (Hải sản) | ✅ Grid sản phẩm nổi bật + danh mục |
| Đăng nhập / Đăng ký từ trang chủ (cả 3 báo cáo) | ✅ HeroAuthSection |

---

## 2. Trang Đăng Nhập / Đăng Ký

**Route:** `/login` · `/register`

### Những gì hiển thị
- Form đăng nhập: Email + Mật khẩu, nút Submit.
- Form đăng ký: Tên, Email, Mật khẩu.
- Redirect về trang chủ sau khi đăng nhập thành công.
- Báo lỗi nếu thông tin không hợp lệ.

### Đối chiếu báo cáo
| Yêu cầu | Có trên web? |
|---|---|
| Giao diện đăng nhập tối giản, 2 trường Tài khoản + Mật khẩu (Hải sản) | ✅ |
| Phân quyền: Admin / Staff (Bida, Hải sản) | ✅ (session role-based) |
| Báo lỗi khi sai thông tin (cả 3 báo cáo) | ✅ |

---

## 3. Trang Danh Sách Sản Phẩm

**Route:** `/products`

### Những gì hiển thị
- Grid sản phẩm toàn bộ (hoặc theo category filter).
- Thanh tìm kiếm theo tên sản phẩm.
- Filter theo danh mục.
- Mỗi card sản phẩm: Ảnh, Tên, Giá, Category badge, nút Thêm vào giỏ.

### Đối chiếu báo cáo
| Yêu cầu | Có trên web? |
|---|---|
| Hiển thị danh sách món/sản phẩm theo nhóm, kèm tên + giá (Hải sản) | ✅ |
| Tìm kiếm theo tên (Hải sản – Tìm kiếm thực đơn, Bida) | ✅ |
| Thêm vào đơn hàng/giỏ hàng (Hải sản – Gọi món) | ✅ nút Add to Cart |
| Hình ảnh sản phẩm trực quan (Bida – Giao diện gọi dịch vụ) | ✅ |

---

## 4. Trang Chi Tiết Sản Phẩm

**Route:** `/product/[handle]`

### Những gì hiển thị
- Ảnh sản phẩm lớn.
- Tên, mô tả, giá.
- Nút thêm vào giỏ hàng kèm chọn số lượng.
- Thông tin bảo hành, vận chuyển.

---

## 5. Giỏ Hàng (Cart)

**Route:** `/cart`

### Những gì hiển thị
- Danh sách sản phẩm đã thêm: Ảnh, Tên, Số lượng (+/-), Đơn giá, Thành tiền.
- Tổng tiền tự động cập nhật.
- Nút xóa từng sản phẩm.
- Nút "Tiến hành thanh toán" → `/checkout`.

### Đối chiếu báo cáo
| Yêu cầu | Có trên web? |
|---|---|
| Điều chỉnh số lượng món / xóa món (Hải sản – Giao diện Order) | ✅ |
| Tổng tiền tạm tính cập nhật real-time (Hải sản) | ✅ |
| Danh sách món + số lượng + đơn giá (Bida – Đóng bàn) | ✅ |

---

## 6. Trang Thanh Toán (Checkout)

**Route:** `/checkout`

### Những gì hiển thị
- Thông tin giao hàng: Họ tên, địa chỉ, số điện thoại.
- Tóm tắt đơn hàng: danh sách sản phẩm, tổng tiền, phí giao hàng.
- Chọn phương thức thanh toán (COD / Online).
- Xác nhận đặt hàng.

### Đối chiếu báo cáo
| Yêu cầu | Có trên web? |
|---|---|
| Hiển thị chi tiết hóa đơn (danh sách, đơn giá, tổng) (Hải sản – Thanh toán) | ✅ |
| Chọn phương thức thanh toán (tiền mặt / ATM) (Hải sản) | ✅ |
| Tính tổng tiền tự động (Bida – Giải thuật tính tiền) | ✅ |
| Lưu lịch sử giao dịch sau khi xác nhận (cả 3 báo cáo) | ✅ |

---

## 7. Trang Đơn Hàng Của Tôi

**Route:** `/orders`

### Những gì hiển thị
- Danh sách đơn hàng đã đặt: Mã đơn, Ngày, Tổng tiền, Trạng thái.
- Click để xem chi tiết từng đơn.

### Đối chiếu báo cáo
| Yêu cầu | Có trên web? |
|---|---|
| Xem danh sách hóa đơn đã thanh toán (Hải sản – Quản lý hóa đơn) | ✅ |
| Tra cứu hóa đơn theo thông tin (Bida – Use Case 20) | ✅ |

---

## 8. Admin – Quản Lý Sản Phẩm

**Route:** `/admin/products`

### Những gì hiển thị
- Bảng danh sách sản phẩm: Ảnh, Tên, Danh mục, Giá, isFeatured.
- Nút **Thêm sản phẩm mới** → form nhập Tên, Giá, Mô tả, Ảnh, Category.
- Nút **Sửa** từng sản phẩm.
- Nút **Xóa** từng sản phẩm (có xác nhận).
- Tìm kiếm sản phẩm theo tên/category.

### Đối chiếu báo cáo
| Yêu cầu | Có trên web? |
|---|---|
| Thêm / Sửa / Xóa món ăn trong thực đơn (Hải sản – Quản lý thực đơn) | ✅ |
| Thêm / Sửa / Xóa hàng hóa (Bida – Use Case 25-27) | ✅ |
| Hiển thị danh sách dạng bảng với ảnh, tên, phân loại, đơn giá (Hải sản) | ✅ |
| Tìm kiếm theo danh mục và từ khóa (Hải sản) | ✅ |

---

## 9. Trang Profile

**Route:** `/profile`

### Những gì hiển thị
- Thông tin cá nhân: Tên, Email.
- Lịch sử đơn hàng.
- Đăng xuất.

### Đối chiếu báo cáo
| Yêu cầu | Có trên web? |
|---|---|
| Quản lý thông tin người dùng / thành viên (Bida – Use Case 14-17) | ✅ (cơ bản) |
| Lịch sử giao dịch (cả 3 báo cáo) | ✅ |

---

## Tóm Tắt Màn Hình

| Màn hình | Route | Chức năng chính |
|---|---|---|
| Trang chủ | `/` | Banner, sản phẩm nổi bật, danh mục |
| Đăng nhập | `/login` | Xác thực người dùng |
| Đăng ký | `/register` | Tạo tài khoản mới |
| Danh sách sản phẩm | `/products` | Duyệt, tìm kiếm, lọc sản phẩm |
| Chi tiết sản phẩm | `/product/[handle]` | Xem thông tin, thêm vào giỏ |
| Giỏ hàng | `/cart` | Xem/sửa/xóa sản phẩm, tổng tiền |
| Thanh toán | `/checkout` | Nhập thông tin, chọn PT thanh toán |
| Đơn hàng | `/orders` | Lịch sử đơn hàng |
| Admin sản phẩm | `/admin/products` | CRUD sản phẩm |
| Profile | `/profile` | Thông tin tài khoản |

---

## Những Chức Năng Trong Báo Cáo Chưa Có Trên Web

> Dự án là **e-commerce bán lẻ**, không phải hệ thống quản lý nội bộ nhà hàng/quán bida, nên một số chức năng nghiệp vụ đặc thù chưa được triển khai:

- Sơ đồ bàn ăn / trạng thái bàn (Trống – Đang phục vụ – Đã đặt)
- Gọi món trực tiếp tại bàn, gửi lệnh bếp
- Mở ca / Đóng ca với kiểm đếm tiền mặt
- Chuyển bàn / Gộp bàn
- Tính giờ chơi tự động (bida)
- Báo cáo thống kê doanh thu nâng cao (biểu đồ, xuất Excel)
- Quản lý thành viên với điểm tích lũy / hạng
