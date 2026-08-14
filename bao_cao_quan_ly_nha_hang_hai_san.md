
**Dự án:** Hệ thống quản lý nhà hàng hải sản  
## Mục Lục

- [CHƯƠNG 1: KHẢO SÁT DỰ ÁN](#chương-1-khảo-sát-dự-án)
  - [I. Mục tiêu dự án](#i-mục-tiêu-dự-án)
  - [II. Đối tượng sử dụng dự án](#ii-đối-tượng-sử-dụng-dự-án)
  - [III. Tình hình thực tế](#iii-tình-hình-thực-tế)
  - [IV. Đặc tả chức năng theo đối tượng](#iv-đặc-tả-chức-năng-theo-đối-tượng)
- [CHƯƠNG 2: PHÂN TÍCH HỆ THỐNG](#chương-2-phân-tích-hệ-thống)
  - [I. Sơ đồ chức năng (Use case)](#i-sơ-đồ-chức-năng-use-case)
  - [II. Đặc tả và mô hình chi tiết các chức năng](#ii-đặc-tả-và-mô-hình-chi-tiết-các-chức-năng)
- [CHƯƠNG 3: THIẾT KẾ HỆ THỐNG](#chương-3-thiết-kế-hệ-thống)
  - [I. Thiết kế kiến trúc hệ thống](#i-thiết-kế-kiến-trúc-hệ-thống)
  - [II. Thiết kế Class Diagram](#ii-thiết-kế-class-diagram)
  - [III. Thiết kế ERD](#iii-thiết-kế-erd)
  - [IV. Thiết kế giao diện](#iv-thiết-kế-giao-diện)
- [CHƯƠNG 4: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN](#chương-4-kết-luận-và-hướng-phát-triển)
  - [I. Kết luận](#i-kết-luận)
  - [II. Hướng phát triển](#ii-hướng-phát-triển)

---

# CHƯƠNG 1: KHẢO SÁT DỰ ÁN

## I. Mục tiêu dự án

### 1. Mục tiêu tổng quát
Xây dựng một hệ thống quản lí nhà hàng hải sản nội bộ, tập trung, dễ sử dụng và hiệu quả, nhằm hỗ trợ quản lí toàn bộ hoạt động của nhà hàng như đặt bàn, gọi món, thanh toán, quản lí thực đơn và thống kê doanh thu. Hệ thống giúp tối ưu vận hành, nâng cao trải nghiệm khách hàng và giảm sai sót trong quá trình phục vụ.

### 2. Mục tiêu cụ thể
- Quản lí danh sách món ăn (hải sản tươi sống, món chế biến, combo,…).
- Quản lí bàn (trạng thái trống/đã đặt/đang phục vụ).
- Cho phép nhân viên tạo và xử lí đơn hàng nhanh chóng.
- Hỗ trợ thanh toán và xuất hóa đơn.
- Thống kê doanh thu, báo cáo hoạt động theo ngày/tháng/năm.

## II. Đối tượng sử dụng dự án
1. **Khách hàng:** Có nhu cầu đặt bàn, gọi món và thanh toán.
2. **Nhân viên phục vụ:** Tiếp nhận yêu cầu khách hàng, ghi nhận order, thanh toán, hỗ trợ phục vụ.
3. **Nhân viên bếp:** Nhận thông tin món ăn cần chế biến.
4. **Chủ nhà hàng/Quản lí nhà hàng:** Theo dõi hoạt động, quản lí nhân viên, doanh thu và thực đơn.

## III. Tình hình thực tế
Hiện nay, nhiều nhà hàng hải sản vẫn quản lí theo cách thủ công hoặc sử dụng nhiều công cụ rời rạc, dẫn đến một số vấn đề như:
- Thông tin đơn hàng dễ bị sai sót hoặc nhầm lẫn.
- Khó kiểm soát tình trạng bàn và thời gian phục vụ.
- Thiếu thống kê rõ ràng về doanh thu và hiệu suất.
- Giao tiếp giữa nhân viên phục vụ và bếp chưa hiệu quả.

### 1. Bối cảnh hiện nay
#### 1.1. Nhu cầu quản lí tăng cao
Số lượng khách hàng tại các nhà hàng hải sản ngày càng tăng, đặc biệt vào giờ cao điểm hoặc cuối tuần. Điều này đòi hỏi nhà hàng phải có hệ thống quản lí hiệu quả để tránh quá tải và nâng cao chất lượng phục vụ.

#### 1.2. Quy trình phục vụ thủ công còn hạn chế
- Ghi order bằng giấy dễ sai sót, thất lạc.
- Chậm truyền thông tin đến bếp.
- Dễ xảy ra nhầm bàn, nhầm món.

#### 1.3. Thiếu sự liên kết giữa các bộ phận
Thông tin giữa các bộ phận (phục vụ – bếp – thu ngân – quản lý) chưa được kết nối chặt chẽ, dẫn đến:
- Chậm trễ trong xử lý đơn hàng.
- Giao tiếp thủ công, dễ sai lệch.
- Khó kiểm soát toàn bộ quy trình.

#### 1.4. Khó khăn trong thống kê và quản lí doanh thu
- Tổng hợp doanh thu mất nhiều thời gian.
- Dữ liệu dễ sai sót nếu nhập tay.
- Không có báo cáo trực quan để hỗ trợ ra quyết định.

#### 1.5. Trải nghiệm khách hàng chưa tối ưu
- Thời gian chờ món lâu.
- Dễ xảy ra tình trạng nhầm món, thiếu món.
- Mất nhiều thời gian chờ thanh toán.

#### 1.6. Xu hướng cạnh tranh và số hóa
Ngày càng nhiều nhà hàng áp dụng công nghệ vào quản lí, tạo áp lực cạnh tranh. Nếu không chuyển đổi số sẽ xảy ra những hậu quả:
- Khó nâng cao hiệu suất.
- Khó giữ chân khách hàng.
- Dễ bị tụt hậu so với đối thủ cạnh tranh.

### 2. Xu hướng số hóa trong nhà hàng
Việc áp dụng hệ thống quản lí giúp:
- Tăng tốc độ phục vụ khách hàng.
- Giảm sai sót trong order.
- Quản lí hoạt động phục vụ khách hàng chính xác hơn.
- Theo dõi doanh thu theo thời gian thực.
- Nâng cao trải nghiệm khách hàng.

## IV. Đặc tả chức năng theo đối tượng

### 1. Chức năng quản lí bàn ăn
#### 1.1. Mô tả
Giúp người sử dụng dễ dàng quản lí trạng thái, thông tin của các bàn ăn một cách đầy đủ, trực quan và nhanh chóng. Các tính năng cụ thể:
- Hiển thị đầy đủ tất cả bàn ăn kèm theo trạng thái (trống/đã đặt/đang phục vụ) và tổng tiền hóa đơn tạm tính (nếu có).
- Cho phép sắp xếp, tùy chỉnh vị trí các bàn ăn trên giao diện để phù hợp với sơ đồ thực tế của nhà hàng.
- Cập nhật trạng thái bàn theo thời gian thực.
- Mỗi trạng thái được biểu diễn bằng màu sắc khác nhau giúp người dùng dễ nhận biết.
- Cho phép chọn vào bàn đang hoạt động để xem chi tiết hóa đơn (danh sách món đã gọi, số lượng, giá tiền, tổng tiền tạm tính).
- Cho phép chuyển toàn bộ thông tin phục vụ từ một bàn sang bàn khác.

#### 1.2. Quy trình chuyển trạng thái bàn
- **Bước 1:** Nhân viên chọn bàn.
- **Bước 2:** Chọn trạng thái bàn cần chuyển (trống/đã đặt/đang phục vụ).
- **Bước 3:** Hệ thống cập nhật trạng thái mới.

#### 1.3. Quy trình sắp xếp bàn
- **Bước 1:** Nhân viên chọn chế độ chỉnh sửa sơ đồ bàn.
- **Bước 2:** Di chuyển vị trí bàn theo đúng với bố cục mong muốn.
- **Bước 3:** Xác nhận lưu bố cục.
- **Bước 4:** Hệ thống lưu bố cục mới và cập nhật trên tất cả thiết bị.

#### 1.4. Quy trình chuyển bàn
- **Bước 1:** Nhân viên chọn bàn đang phục vụ cần chuyển.
- **Bước 2:** Chọn chức năng “Chuyển bàn”.
- **Bước 3:** Hệ thống hiển thị danh sách bàn trống.
- **Bước 4:** Nhân viên chọn bàn đích.
- **Bước 5:** Xác nhận chuyển bàn.
- **Bước 6:** Hệ thống chuyển toàn bộ hóa đơn sang bàn mới và cập nhật trạng thái 2 bàn.

### 2. Chức năng quản lí thực đơn
#### 2.1. Mô tả
Cho phép quản lí thêm, sửa, xóa và tổ chức danh sách món ăn trong nhà hàng một cách linh hoạt, đảm bảo thông tin món luôn chính xác và cập nhật.
Các tính năng cụ thể:
- Hiển thị danh sách toàn bộ món ăn trong thực đơn bao gồm tên món, giá kèm hình ảnh.
- Phân loại món ăn theo nhóm giúp dễ tìm kiếm và quản lí.
- Thêm món mới vào thực đơn (tên món, giá, hình ảnh).
- Chỉnh sửa thông tin món (cập nhật tên món, giá).
- Xóa món hoặc ẩn món khỏi thực đơn.
- Đánh dấu món bán chạy, món đặc biệt, khuyến mãi.

#### 2.2. Quy trình thêm món
- **Bước 1:** Quản lí chọn chức năng “Thêm món”.
- **Bước 2:** Nhập thông tin món ăn (tên món, giá, hình ảnh).
- **Bước 3:** Xác nhận thêm món ăn vào thực đơn.
- **Bước 4:** Hệ thống lưu và cập nhật thực đơn.

#### 2.3. Quy trình chỉnh sửa món
- **Bước 1:** Chọn món cần chỉnh sửa.
- **Bước 2:** Cập nhật thông tin món.
- **Bước 3:** Xác nhận thay đổi.
- **Bước 4:** Hệ thống lưu và cập nhật thực đơn.

#### 2.4. Quy trình xóa/ẩn món
- **Bước 1:** Chọn món cần xóa/ẩn.
- **Bước 2:** Chọn xóa hoặc ẩn.
- **Bước 3:** Xác nhận xóa hoặc ẩn.
- **Bước 4:** Hệ thống lưu và cập nhật thực đơn.

### 3. Chức năng đặt bàn ăn
#### 3.1. Mô tả
Cho phép người sử dụng đặt trước bàn cho khách hàng và quản lí thông tin đặt bàn một cách hiệu quả. Các tính năng cụ thể:
- Cho phép thay đổi trạng thái bàn thành “Đã đặt” kèm với thông tin khách hàng đặt bàn (họ tên, số điện thoại, thời gian đặt, số lượng khách).
- Đánh dấu các bàn đã được đặt để tránh trùng lặp hoặc nhầm lẫn.
- Cho phép chỉnh sửa hoặc hủy đặt bàn khi cần thiết.
- Tự động chuyển trạng thái thành “Trống” nếu quá thời gian đặt mà khách không đến.
- Cảnh báo khi có 2 lượt đặt trùng bàn và thời gian với nhau.

#### 3.2. Quy trình đặt bàn
- **Bước 1:** Khách hàng yêu cầu đặt bàn (trực tiếp, điện thoại hoặc ứng dụng).
- **Bước 2:** Nhân viên kiểm tra tình trạng bàn trên hệ thống.
- **Bước 3:** Nếu còn bàn phù hợp, nhập thông tin đặt bàn (tên khách, số điện thoại, thời gian đặt, số lượng khách). Nếu hết bàn, thông báo với khách hàng và đề xuất thời gian khác.
- **Bước 4:** Hệ thống lưu thông tin và cập nhật trạng thái bàn thành “Đã đặt”.
- **Bước 5:** Xác nhận lại thông tin với khách hàng.

### 4. Chức năng gọi món
#### 4.1. Mô tả
Cho phép nhân viên phục vụ ghi nhận, quản lí và gửi yêu cầu món ăn của khách hàng đến bộ phận bếp một cách nhanh chóng, chính xác. Các tính năng cụ thể:
- Cho phép chọn bàn đang phục vụ để tiến hành gọi món.
- Hiển thị danh sách món ăn được phân loại theo nhóm kèm thông tin (tên món, giá).
- Cho phép thêm món kèm số lượng và ghi chú (nếu có) vào hóa đơn.
- Cho phép cập nhật số lượng món hoặc xóa món khỏi hóa đơn.
- Tự động cập nhật tổng tiền tạm tính theo thời gian thực.
- Gửi danh sách món đã gọi đến bộ phận bếp.
- Cho phép gọi thêm món trong quá trình phục vụ.
- Có tùy chọn nhập thêm món khác không có trong thực đơn.

#### 4.2. Quy trình gọi món
- **Bước 1:** Khách hàng yêu cầu gọi món.
- **Bước 2:** Nhân viên chọn bàn đang phục vụ trên hệ thống.
- **Bước 3:** Hệ thống hiển thị menu món ăn.
- **Bước 4:** Nhân viên chọn món, nhập số lượng và ghi chú (nếu có).
- **Bước 5:** Xác nhận lại thông tin với khách hàng.
- **Bước 6:** Hệ thống lưu thông tin vào hóa đơn và gửi yêu cầu đến bếp.
- **Bước 7:** Bếp nhận thông tin và bắt đầu chế biến.

### 5. Chức năng thanh toán
#### 5.1. Mô tả
Cho phép nhân viên thực hiện việc thanh toán hóa đơn cho khách hàng một cách nhanh chóng, chính xác và thuận tiện. Dữ liệu thanh toán được sử dụng làm cơ sở cho chức năng thống kê doanh thu, đảm bảo tính chính xác và nhất quán. Các tính năng cụ thể:
- Cho phép chọn bàn cần thanh toán.
- Hiển thị chi tiết hóa đơn của bàn (danh sách món đã gọi, số lượng từng món, đơn giá, tổng tiền tạm tính).
- Tự động tính tổng tiền hóa đơn bao gồm thuế và phụ phí nếu có.
- Hỗ trợ áp dụng giảm giá, khuyến mãi, voucher nếu có.
- Cho phép lựa chọn phương thức thanh toán (tiền mặt, ATM).
- Sau khi xác nhận thanh toán và hoàn tất giao dịch, hệ thống tự động lưu lịch sử giao dịch.
- In hoặc xuất hóa đơn cho khách hàng.
- Sau khi thanh toán, tự động chuyển trạng thái bàn thành “Trống”.

#### 5.2. Quy trình thanh toán
- **Bước 1:** Khách hàng yêu cầu thanh toán.
- **Bước 2:** Nhân viên chọn bàn cần thanh toán trên hệ thống.
- **Bước 3:** Hệ thống hiển thị chi tiết hóa đơn.
- **Bước 4:** Nhân viên chọn in hóa đơn, kiểm tra và xác nhận với khách.
- **Bước 5:** Áp dụng giảm giá hoặc khuyến mãi (nếu có).
- **Bước 6:** Chọn phương thức thanh toán.
- **Bước 7:** Xác nhận thanh toán.
- **Bước 8:** Hệ thống ghi nhận giao dịch và cập nhật trạng thái bàn thành “Trống”.

### 6. Chức năng thống kê doanh thu
#### 6.1. Mô tả
Cho phép quản lí theo dõi, phân tích và đánh giá tình hình kinh doanh của nhà hàng thông qua các báo cáo doanh thu chi tiết và trực quan. Các tính năng cụ thể:
- Thống kê doanh thu theo thời gian (ngày/tháng/năm).
- Hiển thị tổng doanh thu (tổng số hóa đơn, tổng tiền thu được).
- Thống kê theo món ăn (món bán chạy, số lượng từng món đã bán, doanh thu theo từng món).
- Thống kê theo khung giờ (giờ cao điểm, lượng khách theo thời gian).
- Hỗ trợ phân loại dữ liệu theo khoảng thời gian, theo loại món.
- Hỗ trợ xuất báo cáo (Excel/PDF).

#### 6.2. Quy trình thống kê doanh thu
- **Bước 1:** Quản lí chọn chức năng thống kê.
- **Bước 2:** Chọn tiêu chí thống kê (khoảng thời gian/loại báo cáo).
- **Bước 3:** Hệ thống truy xuất dữ liệu từ các hóa đơn.
- **Bước 4:** Xử lí và tổng hợp dữ liệu.
- **Bước 5:** Hiển thị kết quả dưới dạng bảng và biểu đồ.
- **Bước 6:** Xuất báo cáo ra file (nếu cần).

---

# CHƯƠNG 2: PHÂN TÍCH HỆ THỐNG

## I. Sơ đồ chức năng (Use case)

### 1. Use case diagram tổng quát
Sơ đồ Use case tổng quát mô tả cái nhìn tổng quan về toàn bộ với những nhóm người dùng của hệ thống như: Nhân viên, Quản lí. Bên cạnh đó còn thể hiện các chức năng cơ bản của từng nhóm người dùng.

### 2. Use case diagram của tác nhân Nhân viên
Nhân viên sau khi đăng nhập thành công vào hệ thống bằng tài khoản của nhân viên, có thể thực hiện những chức năng sau:
- **Xem bàn ăn:** Nhân viên có thể xem danh sách bàn, đặt bàn cho khách, chuyển bàn, gộp bàn, gọi món ăn cho các bàn hoặc xóa món ăn của các bàn, in hóa đơn và thanh toán.

### 3. Use case diagram của tác nhân Quản lí
Quản lí sau khi đăng nhập thành công vào hệ thống bằng tài khoản của quản lí, có thể thực hiện những chức năng sau:
- **Mở ca:** Quản lí có thể bắt đầu ca làm.
- **Đóng ca:** Quản lí có thể kết thúc ca làm.
- **Xem danh sách món ăn:** Quản lí có thể xem, thêm món, tìm kiếm, chỉnh sửa hoặc xóa các món ăn trong hệ thống món ăn.
- **Xem danh sách người dùng:** Quản lí có thể xem danh sách người dùng (Nhân viên, Quản lí), thêm, chỉnh sửa, xóa người dùng trong hệ thống.
- **Xem sơ đồ bàn:** Quản lí có thể xem danh sách bàn ăn hiện có, thêm, chỉnh sửa hoặc xóa bàn ăn trong hệ thống.
- **Xem danh sách hóa đơn:** Quản lí có thể xem, chỉnh sửa hoặc xóa các hóa đơn đã thanh toán.
- **Xem báo cáo doanh thu:** Quản lí có thể xem báo cáo doanh thu.

---

## II. Đặc tả và mô hình chi tiết các chức năng (Đặc tả Use Case, Activity diagram, Sequence diagram)

### 1. Chức năng Đăng nhập
#### 1.1. Đặc tả Use Case Đăng nhập
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Đăng nhập” |
| **Mục đích** | Cho phép người dùng đăng nhập vào hệ thống. |
| **Tác nhân** | Quản lí, Nhân viên |
| **Điều kiện tiên quyết** | Người dùng đã có tài khoản trong hệ thống. |
| **Luồng sự kiện** | 1. Người dùng truy cập trang chủ và chọn chức năng “Đăng nhập”.<br>2. Hệ thống hiển thị giao diện đăng nhập.<br>3. Người dùng nhập tài khoản và mật khẩu, chọn “Đăng nhập”.<br>4. Hệ thống kiểm tra thông tin đăng nhập.<br>5. Hệ thống chuyển hướng đến trang chủ.<br>6. Kết thúc Use case. |
| **Luồng rẽ nhánh** | **A1 – Thông tin đăng nhập sai.** (Bắt đầu ở bước 4)<br>- Hệ thống thông báo “Thông tin đăng nhập không hợp lệ”.<br>- Hệ thống quay về bước 3. |
| **Kết quả** | Người dùng vào được trang chủ của hệ thống. |

---

### 2. Chức năng Mở ca
#### 2.1. Đặc tả Use Case Mở ca
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Mở ca” |
| **Mục đích** | Cho phép Quản lí khai báo số tiền mặt hiện có tại quầy (tiền lẻ, tiền vốn) và kích hoạt hệ thống để bắt đầu cho phép nhân viên thực hiện các giao dịch bán hàng. |
| **Tác nhân** | Quản lí |
| **Điều kiện tiên quyết** | Quản lí đã đăng nhập thành công và hệ thống hiện đang ở trạng thái "Chờ mở ca" (đầu ngày hoặc sau khi ca trước đã đóng). |
| **Luồng sự kiện** | 1. Quản lí chọn chức năng “Mở ca” trên màn hình quản lí.<br>2. Hệ thống hiển thị biểu mẫu mở ca gồm: Tên người mở ca, ngày giờ mở ca và số tiền vốn ban đầu.<br>3. Quản lí kiểm đếm tiền mặt tại quầy và nhập số tiền vào hệ thống.<br>4. Quản lí nhấn “Xác nhận”.<br>5. Hệ thống ghi nhận thời điểm mở ca và số tiền vốn vào nhật kí hệ thống.<br>6. Hệ thống chuyển sang trạng thái “Đang hoạt động” và cho phép thực hiện tất cả các chức năng.<br>7. Kết thúc Use case. |
| **Kết quả** | Ca làm việc mới được bắt đầu thành công, hệ thống sẵn sàng phục vụ khách hàng. |

---

### 3. Chức năng Đóng ca
#### 3.1. Đặc tả Use Case Đóng ca
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Đóng ca” |
| **Mục đích** | Cho phép Quản lí tổng kết toàn bộ doanh thu, kiểm đếm tiền mặt thực tế và chốt sổ dữ liệu để kết thúc ca làm việc hiện tại. |
| **Tác nhân** | Quản lí |
| **Điều kiện tiên quyết** | Hệ thống đang trong trạng thái “Đang hoạt động” và tất cả các bàn đã được thanh toán xong. |
| **Luồng sự kiện** | 1. Quản lí chọn chức năng “Đóng ca” trên màn hình quản lí.<br>2. Hệ thống tự động tổng hợp dữ liệu doanh thu trong ca (Tổng hóa đơn, Tổng tiền mặt, Tổng tiền chuyển khoản).<br>3. Hệ thống hiển thị biểu mẫu đối chiếu tiền mặt.<br>4. Quản lí nhấn “Xác nhận”.<br>5. Hệ thống in phiếu tổng kết ca và chuyển trạng thái hệ thống về “Đã đóng ca”.<br>6. Kết thúc Use case. |
| **Kết quả** | Ca làm việc kết thúc thành công, dữ liệu doanh thu được chốt và lưu trữ vào báo cáo lịch sử. |

---

### 4. Chức năng Xem danh sách hóa đơn
#### 4.1. Đặc tả Use Case Xem danh sách hóa đơn
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Xem danh sách hóa đơn” |
| **Mục đích** | Cho phép Quản lí tra cứu lịch sử thanh toán để kiểm soát doanh thu. |
| **Tác nhân** | Quản lí |
| **Điều kiện tiên quyết** | Quản lí đăng nhập thành công vào hệ thống. |
| **Luồng sự kiện** | 1. Quản lí chọn chức năng “Xem danh sách hóa đơn”.<br>2. Hệ thống hiển thị danh sách các hóa đơn đã thanh toán bao gồm: Mã hóa đơn, Ngày, Tổng tiền.<br>3. Quản lí có thể chọn thêm chức năng (Sửa hóa đơn, Xóa hóa đơn).<br>4. Kết thúc Use case. |
| **Kết quả** | Quản lí nắm bắt được thông tin chi tiết về các giao dịch đã phát sinh trong hệ thống. |

---

### 5. Chức năng Sửa hóa đơn
#### 5.1. Đặc tả Use Case Sửa hóa đơn
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Sửa hóa đơn” |
| **Mục đích** | Cho phép Quản lí điều chỉnh thông tin của một hóa đơn đã lập. |
| **Tác nhân** | Quản lí |
| **Điều kiện tiên quyết** | Quản lí đang ở màn hình “Xem danh sách hóa đơn” và chọn một hóa đơn cụ thể. |
| **Luồng sự kiện** | 1. Quản lí chọn chức năng “Sửa hóa đơn”.<br>2. Hệ thống hiển thị biểu mẫu chi tiết hóa đơn hiện tại.<br>3. Quản lí nhập các thông tin cần thay đổi.<br>4. Quản lí nhấn “Xác nhận”.<br>5. Hệ thống lưu các thay đổi vào cơ sở dữ liệu.<br>6. Hệ thống thông báo “Cập nhật hóa đơn thành công”.<br>7. Kết thúc Use case. |
| **Kết quả** | Thông tin hóa đơn được cập nhật chính xác và tổng tiền được đồng bộ vào báo cáo doanh thu. |

---

### 6. Chức năng Xóa hóa đơn
#### 6.1. Đặc tả Use Case Xóa hóa đơn
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Xóa hóa đơn” |
| **Mục đích** | Cho phép Quản lí loại bỏ các hóa đơn bị lập sai, hóa đơn rác hoặc hóa đơn thử nghiệm để đảm bảo tính chính xác của báo cáo doanh thu. |
| **Tác nhân** | Quản lí |
| **Điều kiện tiên quyết** | Quản lí đang ở màn hình “Xem danh sách hóa đơn” và chọn một hóa đơn cụ thể. |
| **Luồng sự kiện** | 1. Quản lí chọn chức năng “Xóa hóa đơn”.<br>2. Hệ thống thông báo “Bạn có chắc chắn muốn xóa hóa đơn không?”.<br>3. Quản lí nhấn “Xác nhận”.<br>4. Hệ thống xóa hóa đơn khỏi cơ sở dữ liệu.<br>5. Hệ thống thông báo “Xóa hóa đơn thành công”.<br>6. Kết thúc Use case. |
| **Kết quả** | Hóa đơn bị loại bỏ khỏi danh sách doanh thu thực tế. |

---

### 7. Chức năng Xem báo cáo doanh thu
#### 7.1. Đặc tả Use Case Xem báo cáo doanh thu
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Xem báo cáo doanh thu” |
| **Mục đích** | Cho phép Quản lí tổng kết tình hình kinh doanh theo thời gian. |
| **Tác nhân** | Quản lí |
| **Điều kiện tiên quyết** | Quản lí đăng nhập thành công vào hệ thống. |
| **Luồng sự kiện** | 1. Quản lí chọn chức năng “Xem báo cáo doanh thu”.<br>2. Hệ thống hiển thị màn hình báo cáo với các tùy chọn lọc (theo ngày, tháng, quý, năm).<br>3. Quản lí chọn khoảng thời gian cần xem và nhấn “Xem báo cáo”.<br>4. Hệ thống tính toán tổng tiền từ các hóa đơn đã thanh toán trong khoảng thời gian đó.<br>5. Hệ thống hiển thị kết quả dưới dạng con số tổng quát.<br>6. Kết thúc Use case. |
| **Luồng rẽ nhánh** | **A1 – Không có dữ liệu kinh doanh** (Bắt đầu ở bước 4)<br>5. Hệ thống thông báo “Không có dữ liệu doanh thu trong khoảng thời gian đã chọn”.<br>6. Hệ thống quay về bước 3. |
| **Kết quả** | Quản lý nắm được con số doanh thu cụ thể của nhà hàng. |

---

### 8. Chức năng Xem sơ đồ bàn ăn
#### 8.1. Đặc tả Use Case Xem sơ đồ bàn ăn
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Xem sơ đồ bàn” |
| **Mục đích** | Cung cấp cái nhìn tổng quan về bố cục và tình trạng hiện tại của tất cả các bàn trong nhà hàng, đồng thời là điểm truy cập để thực hiện các thay đổi về cấu hình bàn. |
| **Tác nhân** | Quản lí |
| **Điều kiện tiên quyết** | Quản lí đã đăng nhập thành công vào hệ thống. |
| **Luồng sự kiện** | 1. Quản lí chọn chức năng “Xem sơ đồ bàn” trong thanh menu.<br>2. Hệ thống truy xuất danh sách bàn và sơ đồ vị trí từ cơ sở dữ liệu.<br>3. Hệ thống hiển thị sơ đồ trực quan kèm theo thông tin tên bàn và trạng thái (Trống, Có khách, Đã đặt).<br>4. Quản lí quan sát và theo dõi tình hình bố trí bàn tại các khu vực.<br>5. Quản lí có thể chọn thêm các chức năng (Thêm bàn, Sửa bàn, Xóa bàn).<br>6. Kết thúc Use case. |
| **Kết quả** | Quản lý nắm bắt được toàn bộ sơ đồ bàn ăn để điều phối hoặc thực hiện các thiết lập cần thiết. |

---

### 9. Chức năng Thêm bàn ăn
#### 9.1. Đặc tả Use Case Thêm bàn ăn
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Thêm bàn” |
| **Mục đích** | Cho phép Quản lí khởi tạo thêm bàn mới vào hệ thống khi nhà hàng mở rộng quy mô. |
| **Tác nhân** | Quản lí |
| **Điều kiện tiên quyết** | Quản lí đang ở màn hình “Xem sơ đồ bàn”. |
| **Luồng sự kiện** | 1. Quản lí chọn chức năng “Thêm bàn”.<br>2. Hệ thống hiển thị biểu mẫu nhập tên bàn, sức chứa.<br>3. Quản lí nhập tên bàn, sức chứa và chọn vị trí phù hợp.<br>4. Quản lí nhấn “Xác nhận”.<br>5. Hệ thống kiểm tra tên bàn.<br>6. Hệ thống cập nhật bàn mới vào cơ sở dữ liệu.<br>7. Hệ thống thông báo “Thêm bàn thành công”.<br>8. Kết thúc Use case. |
| **Luồng rẽ nhánh** | **A1 – Tên bàn đã tồn tại hoặc không hợp lệ** (Bắt đầu ở bước 5)<br>6. Hệ thống thông báo “Tên đã tồn tại hoặc không đúng định dạng”.<br>7. Hệ thống quay về bước 3. |
| **Kết quả** | Một bàn mới được tạo ra và hiển thị trên sơ đồ bàn. |

---

### 10. Chức năng Sửa bàn ăn
#### 10.1. Đặc tả Use Case Sửa bàn ăn
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Sửa bàn” |
| **Mục đích** | Cho phép Quản lí thay đổi các thông tin của một bàn hiện có. |
| **Tác nhân** | Quản lí |
| **Điều kiện tiên quyết** | Quản lí đang ở màn hình “Xem sơ đồ bàn” và chọn một bàn cụ thể. |
| **Luồng sự kiện** | 1. Quản lí chọn chức năng “Sửa bàn” tại bàn đã chọn.<br>2. Hệ thống hiển thị biểu mẫu chỉnh sửa với các thông tin hiện tại của bàn.<br>3. Quản lí thực hiện thay đổi thông tin (tên bàn, sức chứa hoặc đổi vị trí).<br>4. Quản lí nhấn “Xác nhận”.<br>5. Hệ thống kiểm tra tính hợp lệ của thông tin mới.<br>6. Hệ thống lưu các thay đổi vào cơ sở dữ liệu và thông báo “Cập nhật thông tin thành công”.<br>7. Kết thúc Use case. |
| **Luồng rẽ nhánh** | **A1 – Tên bàn mới bị trùng** (Bắt đầu ở bước 5)<br>6. Hệ thống thông báo “Tên bàn đã tồn tại, vui lòng nhập tên khác”.<br>7. Hệ thống quay về bước 3.<br><br>**A2 – Bỏ trống thông tin bắt buộc** (Bắt đầu ở bước 5)<br>6. Hệ thống thông báo “Vui lòng nhập đầy đủ thông tin”.<br>7. Hệ thống quay về bước 3. |
| **Kết quả** | Thông tin bàn được cập nhật mới trên hệ thống và sơ đồ. |

---

### 11. Chức năng Xóa bàn ăn
#### 11.1. Đặc tả Use Case Xóa bàn ăn
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Xóa bàn” |
| **Mục đích** | Cho phép Quản lí loại bỏ một bàn không còn sử dụng ra khỏi hệ thống. |
| **Tác nhân** | Quản lí |
| **Điều kiện tiên quyết** | Quản lí đang ở màn hình “Xem sơ đồ bàn” và chọn một bàn cụ thể. |
| **Luồng sự kiện** | 1. Quản lí chọn chức năng “Xóa bàn” tại bàn muốn xóa.<br>2. Hệ thống kiểm tra trạng thái của bàn.<br>3. Hệ thống thông báo “Bạn có chắc chắn muốn xóa bàn này không?”.<br>4. Quản lí nhấn “Xác nhận”.<br>5. Hệ thống thực hiện xóa bàn khỏi cơ sở dữ liệu và cập nhật lại sơ đồ bàn.<br>6. Hệ thống thông báo “Xóa bàn thành công”.<br>7. Kết thúc Use case. |
| **Luồng rẽ nhánh** | **A1 – Bàn đang có khách hoặc chưa thanh toán** (Bắt đầu ở bước 2)<br>3. Hệ thống thông báo “Không thể xóa bàn đang có khách hoặc chưa hoàn tất thanh toán”.<br>4. Hệ thống hủy thao tác xóa và quay về màn hình “Xem sơ đồ bàn”.<br><br>**A2 – Quản lí hủy lệnh xóa** (Bắt đầu ở bước 3)<br>5. Quản lí nhấn “Hủy bỏ”.<br>6. Hệ thống quay về màn hình “Xem sơ đồ bàn”. |
| **Kết quả** | Bàn được chọn đã được xóa khỏi hệ thống. |

---

### 12. Chức năng Xem bàn ăn
#### 12.1. Đặc tả Use Case Xem bàn ăn
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Xem bàn ăn” |
| **Mục đích** | Cho phép nhân viên theo dõi trạng thái các bàn hiện có và truy cập các chức năng quản lí bàn (Gọi món, Xóa món, Đặt bàn, Chuyển bàn, Gộp bàn, In hóa đơn, Thanh toán). |
| **Tác nhân** | Nhân viên |
| **Điều kiện tiên quyết** | Nhân viên đã đăng nhập vào hệ thống. |
| **Luồng sự kiện** | 1. Nhân viên chọn chức năng “Xem bàn ăn” trong thanh menu.<br>2. Hệ thống hiển thị danh sách các bàn cùng trạng thái tương ứng (Trống, Đang phục vụ, Đã đặt).<br>3. Nhân viên chọn một bàn cụ thể để xem chi tiết hoặc thực hiện thao tác.<br>4. Tùy vào trạng thái bàn, nhân viên có thể chọn các chức năng (Gọi món, Xóa món, Đặt bàn, Chuyển bàn, Gộp bàn, In hóa đơn, Thanh toán).<br>5. Kết thúc Use case. |
| **Kết quả** | Nhân viên nắm bắt được tình trạng bàn để điều phối và phục vụ. |

---

### 13. Chức năng Đặt bàn
#### 13.1. Đặc tả Use Case Đặt bàn
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Đặt bàn” |
| **Mục đích** | Cho phép nhân viên ghi nhận thông tin đặt chỗ của khách hàng và cập nhật trạng thái bàn sang "Đã đặt" để tránh trùng lặp. |
| **Tác nhân** | Nhân viên |
| **Điều kiện tiên quyết** | Nhân viên đang ở màn hình “Xem bàn ăn” và chọn một bàn đang có trạng thái “Trống”. |
| **Luồng sự kiện** | 1. Nhân viên chọn chức năng “Đặt bàn” tại bàn đã chọn.<br>2. Hệ thống hiển thị màn hình nhập thông tin đặt bàn.<br>3. Nhân viên nhập các thông tin (Tên khách hàng, Số điện thoại, Thời gian đến, Số lượng).<br>4. Hệ thống xác nhận đặt bàn.<br>5. Nhân viên nhấn “Xác nhận”.<br>6. Hệ thống kiểm tra tính hợp lệ của thông tin và lưu vào cơ sở dữ liệu.<br>7. Hệ thống cập nhật trạng thái của bàn thành “Đã đặt” và thông báo “Đặt bàn thành công”.<br>8. Kết thúc Use case. |
| **Kết quả** | Thông tin đặt chỗ được lưu lại, trạng thái bàn trên sơ đồ thay đổi để nhân viên khác không xếp khách vào bàn này. |

---

### 14. Chức năng Thêm món vào hóa đơn
#### 14.1. Đặc tả Use Case Thêm món
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Thêm món” |
| **Mục đích** | Cho phép nhân viên ghi nhận các món ăn/đồ uống khách hàng yêu cầu vào hóa đơn của một bàn ăn. |
| **Tác nhân** | Nhân viên |
| **Điều kiện tiên quyết** | Nhân viên đang ở màn hình “Xem bàn ăn” và chọn một bàn cụ thể. |
| **Luồng sự kiện** | 1. Nhân viên chọn chức năng “Thêm món” tại bàn đã chọn.<br>2. Hệ thống hiển thị danh sách thực đơn.<br>3. Nhân viên tìm và chọn các món khách yêu cầu.<br>4. Hệ thống xác nhận các món đã chọn.<br>5. Nhân viên nhấn “Xác nhận”.<br>6. Hệ thống cập nhật danh sách các món đã chọn vào cơ sở dữ liệu và thông báo “Gọi món thành công”.<br>7. Kết thúc Use case. |
| **Kết quả** | Yêu cầu gọi món được ghi nhận. |

---

### 15. Chức năng Xóa món
#### 15.1. Đặc tả Use Case Xóa món
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Xóa món” |
| **Mục đích** | Cho phép nhân viên loại bỏ một hoặc nhiều món ăn đã gọi khỏi danh sách gọi món của một bàn ăn. |
| **Tác nhân** | Nhân viên |
| **Điều kiện tiên quyết** | Nhân viên đang ở màn hình “Xem bàn ăn” và chọn một bàn đang có danh sách món ăn đã gọi. |
| **Luồng sự kiện** | 1. Nhân viên chọn chức năng “Xóa món” tại bàn đã chọn.<br>2. Hệ thống hiển thị danh sách các món hiện có của bàn.<br>3. Nhân viên chọn các món ăn cần xóa.<br>4. Hệ thống xác nhận các món đã chọn.<br>5. Nhân viên nhấn “Xác nhận”.<br>6. Hệ thống cập nhật lại danh sách các món ăn của bàn, tính lại tổng tiền và thông báo “Xóa món thành công”.<br>7. Kết thúc Use case. |
| **Kết quả** | Món ăn được loại bỏ khỏi danh sách của bàn, dữ liệu hóa đơn được cập nhật. |

---

### 16. Chức năng Chuyển bàn
#### 16.1. Đặc tả Use Case Chuyển bàn
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Chuyển bàn” |
| **Mục đích** | Cho phép nhân viên di chuyển toàn bộ danh sách món ăn và thông tin hóa đơn từ bàn này sang một bàn trống khác theo yêu cầu của khách hàng. |
| **Tác nhân** | Nhân viên |
| **Điều kiện tiên quyết** | Nhân viên đang ở màn hình “Xem bàn ăn”, chọn một bàn đang ở trạng thái “Đang phục vụ" và bàn chuyển đến đang ở trạng thái “Trống”. |
| **Luồng sự kiện** | 1. Nhân viên chọn chức năng “Chuyển bàn” tại bàn đã chọn.<br>2. Hệ thống yêu cầu chọn bàn đích.<br>3. Nhân viên chọn bàn trống muốn chuyển đến.<br>4. Hệ thống xác nhận chuyển bàn.<br>5. Nhân viên nhấn “Xác nhận”.<br>6. Hệ thống chuyển toàn bộ danh sách món đã gọi sang bàn đích.<br>7. Hệ thống cập nhật trạng thái của bàn thành “Trống” và bàn đích thành “Đang phục vụ”.<br>8. Kết thúc Use case. |
| **Kết quả** | Thông tin hóa đơn được chuyển sang bàn mới chính xác, sơ đồ bàn cập nhật trạng thái mới của cả hai bàn. |

---

### 17. Chức năng Gộp bàn
#### 17.1. Đặc tả Use Case Gộp bàn
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Gộp bàn” |
| **Mục đích** | Cho phép nhân viên kết hợp danh sách món ăn và hóa đơn của hai hoặc nhiều bàn đang có khách lại thành một bàn duy nhất để thuận tiện cho việc thanh toán. |
| **Tác nhân** | Nhân viên |
| **Điều kiện tiên quyết** | Nhân viên đang ở màn hình "Xem bàn ăn" và các bàn được chọn để gộp đều phải đang ở trạng thái "Đang phục vụ". |
| **Luồng sự kiện** | 1. Nhân viên chọn chức năng “Gộp bàn” tại bàn thứ nhất.<br>2. Hệ thống yêu cầu nhân viên chọn các bàn tiếp theo muốn gộp chung bàn này.<br>3. Nhân viên chọn các bàn muốn gộp chung trong danh sách bàn.<br>4. Hệ thống hiển thị danh sách món ăn tổng hợp dự kiến sau khi gộp để nhân viên kiểm tra.<br>5. Nhân viên nhấn “Xác nhận”.<br>6. Hệ thống cộng dồn danh sách các món ăn của các bàn phụ vào bàn chính.<br>7. Hệ thống cập nhật trạng thái các bàn phụ thành “Trống”.<br>8. Kết thúc Use case. |
| **Kết quả** | Hóa đơn của các bàn được cộng dồn vào một bàn duy nhất, các bàn còn lại được chuyển trạng thái về "Trống". |

---

### 18. Chức năng In hóa đơn tạm tính
#### 18.1. Đặc tả Use Case In hóa đơn tạm tính
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “In hóa đơn” |
| **Mục đích** | Cho phép nhân viên xuất hóa đơn tạm tính ghi rõ danh sách món ăn, số lượng, đơn giá và tổng số tiền của một bàn để khách hàng kiểm tra và thanh toán. |
| **Tác nhân** | Nhân viên |
| **Điều kiện tiên quyết** | Nhân viên đang ở màn hình “Xem bàn ăn” và bàn được chọn phải đang ở trạng thái “Đang phục vụ”. |
| **Luồng sự kiện** | 1. Nhân viên chọn chức năng “In hóa đơn” tại bàn đã chọn.<br>2. Hệ thống tổng hợp dữ liệu từ danh sách món ăn, hiển thị bản xem trước của hóa đơn trên màn hình để nhân viên kiểm tra.<br>3. Nhân viên nhấn “Xác nhận”.<br>4. Hệ thống gửi lệnh đến máy in hóa đơn kết nối với hệ thống.<br>5. Kết thúc Use case. |
| **Kết quả** | Hóa đơn được in ra thành công, đầy đủ thông tin để khách hàng đối soát. |

---

### 19. Chức năng Thanh toán hóa đơn
#### 19.1. Đặc tả Use Case Thanh toán hóa đơn
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Thanh toán” |
| **Mục đích** | Cho phép nhân viên thực hiện thu tiền, xác nhận hoàn tất hóa đơn và chuyển bàn về trạng thái “Trống” trong danh sách. |
| **Tác nhân** | Nhân viên |
| **Điều kiện tiên quyết** | Nhân viên đang ở màn hình “Xem bàn ăn” và bàn được chọn đang ở trạng thái “Đang phục vụ”. |
| **Luồng sự kiện** | 1. Nhân viên chọn chức năng “Thanh toán” tại bàn khách muốn thanh toán tiền.<br>2. Hệ thống hiển thị tổng số tiền khách phải trả.<br>3. Nhân viên chọn phương thức thanh toán (Tiền mặt, Chuyển khoản).<br>4. Nhân viên nhập số tiền khách đưa (nếu là tiền mặt), hệ thống tính toán và hiển thị số tiền thừa trả lại khách.<br>5. Nhân viên nhấn “Xác nhận”.<br>6. Hệ thống lưu thông tin hóa đơn vào lịch sử doanh thu.<br>7. Hệ thống in hóa đơn thanh toán chính thức cho khách.<br>8. Hệ thống cập nhật trạng thái của bàn thành “Trống”.<br>9. Kết thúc Use case. |
| **Kết quả** | Hóa đơn được thanh toán thành công, doanh thu được ghi nhận và bàn được chuyển trạng thái về “Trống” để đón khách mới. |

---

### 20. Chức năng Xem danh sách người dùng
#### 20.1. Đặc tả Use Case Xem danh sách người dùng
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Xem danh sách người dùng” |
| **Mục đích** | Cho phép Quản lí xem toàn bộ danh sách nhân viên trong hệ thống để nắm bắt thông tin và thực hiện điều chỉnh nhân sự. |
| **Tác nhân** | Quản lí |
| **Điều kiện tiên quyết** | Quản lí đã đăng nhập thành công vào hệ thống. |
| **Luồng sự kiện** | 1. Quản lí chọn chức năng “Xem danh sách người dùng” trong thanh menu.<br>2. Hệ thống truy xuất danh sách toàn bộ tài khoản người dùng từ cơ sở dữ liệu.<br>3. Hệ thống hiển thị bảng danh sách bao gồm: Tên đăng nhập, Họ tên, Vai trò, Trạng thái.<br>4. Quản lí có thể chọn thêm chức năng (Thêm người dùng, Sửa người dùng, Xóa người dùng).<br>5. Kết thúc Use case. |
| **Kết quả** | Quản lý nắm được danh sách nhân sự hiện tại của nhà hàng. |

---

### 21. Chức năng Thêm người dùng
#### 21.1. Đặc tả Use Case Thêm người dùng
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Thêm người dùng” |
| **Mục đích** | Cho phép Quản lí tạo tài khoản mới cho nhân viên để họ có thể đăng nhập và sử dụng các chức năng của hệ thống theo đúng vai trò. |
| **Tác nhân** | Quản lí |
| **Điều kiện tiên quyết** | Quản lí đang ở màn hình "Xem danh sách người dùng". |
| **Luồng sự kiện** | 1. Quản lí chọn chức năng “Thêm người dùng”.<br>2. Hệ thống hiển thị biểu mẫu nhập thông tin người dùng mới bao gồm: Tên đăng nhập, Mật khẩu, Họ tên, Vai trò.<br>3. Quản lí nhập đầy đủ các thông tin cần thiết vào biểu mẫu.<br>4. Quản lí nhấn “Xác nhận”.<br>5. Hệ thống thực hiện kiểm tra tính hợp lệ và tính duy nhất của thông tin.<br>6. Hệ thống lưu tài khoản mới vào cơ sở dữ liệu.<br>7. Hệ thống thông báo “Thêm người dùng thành công”.<br>8. Kết thúc Use case. |
| **Luồng rẽ nhánh** | **A1 – Tên đăng nhập đã tồn tại** (Bắt đầu ở bước 5)<br>6. Hệ thống thông báo “Tên đăng nhập đã tồn tại”.<br>7. Hệ thống quay về bước 3.<br><br>**A2 – Bỏ trống thông tin bắt buộc hoặc sai định dạng** (Bắt đầu ở bước 5)<br>6. Hệ thống thông báo lỗi tương ứng (Mật khẩu quá ngắn, Tên đăng nhập để trống).<br>7. Hệ thống quay về bước 3. |
| **Kết quả** | Một tài khoản người dùng mới được khởi tạo thành công trong hệ thống. |

---

### 22. Chức năng Sửa người dùng
#### 22.1. Đặc tả Use Case Sửa người dùng
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Sửa người dùng” |
| **Mục đích** | Cho phép Quản lí cập nhật hoặc thay đổi thông tin cá nhân, mật khẩu hoặc vai trò của một tài khoản nhân viên hiện có. |
| **Tác nhân** | Quản lí |
| **Điều kiện tiên quyết** | Quản lí đang ở màn hình “Xem danh sách người dùng”. |
| **Luồng sự kiện** | 1. Quản lí chọn một người dùng cụ thể trong danh sách và chọn chức năng “Sửa người dùng”.<br>2. Hệ thống hiển thị biểu mẫu chứa các thông tin hiện tại của người dùng đó.<br>3. Quản lí thực hiện thay đổi các thông tin cần thiết.<br>4. Quản lí nhấn “Xác nhận”.<br>5. Hệ thống kiểm tra tính hợp lệ của dữ liệu mới nhập.<br>6. Hệ thống lưu các thay đổi vào cơ sở dữ liệu.<br>7. Hệ thống thông báo “Cập nhật thông tin người dùng thành công”.<br>8. Kết thúc Use case. |
| **Luồng rẽ nhánh** | **A1 – Bỏ trống thông tin bắt buộc** (Bắt đầu ở bước 5)<br>6. Hệ thống thông báo “Vui lòng nhập đầy đủ thông tin bắt buộc”.<br>7. Hệ thống quay về bước 3. |
| **Kết quả** | Thông tin của người dùng được cập nhật mới và có hiệu lực ngay lập tức trong hệ thống. |

---

### 23. Chức năng Xóa người dùng
#### 23.1. Đặc tả Use Case Xóa người dùng
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Xóa người dùng” |
| **Mục đích** | Cho phép Quản lí loại bỏ tài khoản của nhân viên khỏi hệ thống khi họ nghỉ việc hoặc không còn quyền truy cập. |
| **Tác nhân** | Quản lí |
| **Điều kiện tiên quyết** | Quản lí đang ở màn hình “Xem danh sách người dùng”. |
| **Luồng sự kiện** | 1. Quản lí chọn một người dùng cụ thể trong danh sách và chọn chức năng “Xóa người dùng”.<br>2. Hệ thống thông báo “Bạn có chắc chắn muốn xóa người dùng này không?”.<br>3. Quản lí nhấn “Xác nhận”.<br>4. Hệ thống thực hiện xóa tài khoản khỏi cơ sở dữ liệu.<br>5. Hệ thống thông báo “Xóa người dùng thành công”.<br>6. Kết thúc Use case. |
| **Luồng rẽ nhánh** | **A1 – Quản lí hủy lệnh xóa** (Bắt đầu ở bước 2)<br>3. Quản lí nhấn “Hủy bỏ”.<br>4. Hệ thống quay lại màn hình “Xem danh sách người dùng”. |
| **Kết quả** | Tài khoản được chọn đã bị loại bỏ hoàn toàn khỏi hệ thống. |

---

### 24. Chức năng Xem danh sách thực đơn
#### 24.1. Đặc tả Use Case Xem danh sách thực đơn
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Xem danh sách thực đơn” |
| **Mục đích** | Cho phép Quản lí xem toàn bộ các món ăn, đồ uống hiện có trong thực đơn của nhà hàng để theo dõi giá cả và tình trạng phục vụ. |
| **Tác nhân** | Quản lí |
| **Điều kiện tiên quyết** | Quản lí đã đăng nhập thành công vào hệ thống. |
| **Luồng sự kiện** | 1. Quản lí chọn chức năng “Xem danh sách món ăn” ở thanh menu.<br>2. Hệ thống truy xuất danh sách món ăn từ cơ sở dữ liệu.<br>3. Hệ thống hiển thị bảng danh sách món ăn bao gồm: Mã món, Tên món, Đơn giá, Đơn vị tính.<br>4. Quản lí có thể chọn thêm chức năng (Thêm món ăn, Tìm kiếm món ăn, Sửa món ăn, Xóa món ăn).<br>5. Kết thúc Use case. |
| **Kết quả** | Quản lý nắm bắt được thông tin thực đơn hiện tại của nhà hàng. |

---

### 25. Chức năng Thêm thực đơn
#### 25.1. Đặc tả Use Case Thêm thực đơn
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Thêm thực đơn” |
| **Mục đích** | Cho phép Quản lí bổ sung các món ăn, đồ uống mới vào thực đơn. |
| **Tác nhân** | Quản lí |
| **Điều kiện tiên quyết** | Quản lí đang ở màn hình “Xem danh sách món ăn”. |
| **Luồng sự kiện** | 1. Quản lí chọn chức năng “Thêm món ăn”.<br>2. Hệ thống hiển thị biểu mẫu nhập thông tin món mới bao gồm: Tên món, Đơn giá, Loại món, Đơn vị tính.<br>3. Quản lí nhập đầy đủ các thông tin cần thiết vào biểu mẫu.<br>4. Quản lí nhấn “Xác nhận”.<br>5. Hệ thống thực hiện kiểm tra tính hợp lệ của dữ liệu.<br>6. Hệ thống lưu món ăn mới vào cơ sở dữ liệu.<br>7. Hệ thống thông báo “Thêm món ăn thành công”.<br>8. Kết thúc Use case. |
| **Luồng rẽ nhánh** | **A1 – Tên món ăn đã tồn tại** (Bắt đầu ở bước 5)<br>6. Hệ thống thông báo “Tên món ăn này đã tồn tại”.<br>7. Hệ thống quay về bước 3.<br><br>**A2 – Dữ liệu nhập vào không hợp lệ** (Bắt đầu ở bước 5)<br>6. Hệ thống thông báo lỗi tương ứng (Giá món nhỏ hơn 0, Tên món để trống).<br>7. Hệ thống quay về bước 3. |
| **Kết quả** | Món ăn mới được thêm vào thực đơn thành công và nhân viên có thể bắt đầu gọi món này cho khách. |

---

### 26. Chức năng Sửa thực đơn
#### 26.1. Đặc tả Use Case Sửa thực đơn
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Sửa thực đơn” |
| **Mục đích** | Cho phép Quản lí cập nhật thông tin về đơn giá, tên món, hoặc trạng thái phục vụ của một món ăn hiện có trong thực đơn. |
| **Tác nhân** | Quản lí |
| **Điều kiện tiên quyết** | Quản lí đang ở màn hình “Xem danh sách món ăn” và chọn một món ăn cụ thể. |
| **Luồng sự kiện** | 1. Quản lí chọn chức năng “Sửa món ăn”.<br>2. Hệ thống hiển thị biểu mẫu chứa thông tin hiện tại của món ăn đó.<br>3. Quản lí nhập thông tin cần cập nhật.<br>4. Quản lí nhấn “Xác nhận”.<br>5. Hệ thống kiểm tra tính hợp lệ của dữ liệu mới.<br>6. Hệ thống lưu các thay đổi vào cơ sở dữ liệu.<br>7. Hệ thống thông báo “Cập nhật món ăn thành công”.<br>8. Kết thúc Use case. |
| **Luồng rẽ nhánh** | **A1 – Đơn giá không hợp lệ** (Bắt đầu ở bước 5)<br>6. Hệ thống thông báo “Giá món ăn phải là số và lớn hơn 0”.<br>7. Hệ thống quay về bước 3.<br><br>**A2 – Tên món mới bị trùng** (Bắt đầu ở bước 5)<br>6. Hệ thống thông báo “Tên món ăn đã tồn tại”.<br>7. Hệ thống quay về bước 3. |
| **Kết quả** | Thông tin món ăn được cập nhật mới trên toàn hệ thống. |

---

### 27. Chức năng Xóa thực đơn
#### 27.1. Đặc tả Use Case Xóa thực đơn
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Xóa thực đơn” |
| **Mục đích** | Cho phép Quản lí loại bỏ một món ăn/đồ uống khỏi thực đơn. |
| **Tác nhân** | Quản lí |
| **Điều kiện tiên quyết** | Quản lí đang ở màn hình “Xem danh sách món ăn” và chọn một món ăn cụ thể. |
| **Luồng sự kiện** | 1. Quản lí chọn chức năng “Xóa món ăn”.<br>2. Hệ thống kiểm tra các ràng buộc dữ liệu (món ăn có đang nằm trong các hóa đơn chưa thanh toán hay không).<br>3. Hệ thống thông báo “Bạn có chắc chắn muốn xóa món?”.<br>4. Quản lí nhấn “Xác nhận”.<br>5. Hệ thống xóa món ăn khỏi cơ sở dữ liệu.<br>6. Hệ thống thông báo “Xóa món ăn thành công”.<br>7. Kết thúc Use case. |
| **Luồng rẽ nhánh** | **A1 – Món ăn đang được sử dụng trong hóa đơn hiện hành** (Bắt đầu ở bước 2)<br>3. Hệ thống thông báo “Không thể xóa món ăn này vì đang có khách gọi món hoặc hóa đơn chưa hoàn tất”.<br>4. Hệ thống quay lại màn hình “Xem danh sách món ăn”. |
| **Kết quả** | Món ăn được chọn bị xóa khỏi danh sách thực đơn. |

---

### 28. Chức năng Tìm kiếm thực đơn
#### 28.1. Đặc tả Use Case Tìm kiếm thực đơn
| Mục | Nội dung |
|---|---|
| **Tên Use case** | Use case “Tìm kiếm thực đơn” |
| **Mục đích** | Giúp Quản lí nhanh chóng tìm thấy thông tin của một món ăn cụ thể trong danh sách thực đơn bằng cách sử dụng từ khóa. |
| **Tác nhân** | Quản lí |
| **Điều kiện tiên quyết** | Quản lí đang ở màn hình “Xem danh sách món ăn”. |
| **Luồng sự kiện** | 1. Quản lí nhập tên món vào ô tìm kiếm.<br>2. Hệ thống truy vấn và lọc dữ liệu dựa trên tên món đã nhập.<br>3. Hệ thống hiển thị danh sách các món ăn có thông tin trùng khớp với từ khóa tìm kiếm.<br>4. Kết thúc Use case. |
| **Kết quả** | Danh sách món ăn được lọc đúng theo tên món Quản lí yêu cầu. |

---

# CHƯƠNG 3: THIẾT KẾ HỆ THỐNG

## I. Thiết kế kiến trúc hệ thống

### 1. Mô hình kiến trúc hệ thống
Hệ thống quản lý nhà hàng hải sản được xây dựng theo mô hình kiến trúc 3 lớp (Three-tier Architecture), bao gồm:
- Lớp giao diện (Presentation Layer)
- Lớp xử lý nghiệp vụ (Business Logic Layer)
- Lớp dữ liệu (Data Layer)

Mô hình này giúp hệ thống dễ bảo trì, dễ nâng cấp và tăng khả năng quản lý dữ liệu hiệu quả.

### 2. Mô tả các thành phần hệ thống
#### a. Lớp giao diện (Presentation Layer)
Đây là lớp tương tác trực tiếp với người dùng, có nhiệm vụ:
- Hiển thị giao diện hệ thống
- Nhận dữ liệu từ người dùng
- Gửi yêu cầu xử lý đến lớp nghiệp vụ

Các giao diện chính gồm: Giao diện đăng nhập, Giao diện quản lý bàn ăn, Giao diện quản lý thực đơn, Giao diện gọi món, Giao diện thanh toán, Giao diện thống kê doanh thu.

#### b. Lớp xử lý nghiệp vụ (Business Logic Layer)
Đây là lớp trung gian giữa giao diện và cơ sở dữ liệu, có nhiệm vụ:
- Xử lý logic nghiệp vụ
- Kiểm tra tính hợp lệ dữ liệu
- Thực hiện các chức năng của hệ thống

#### c. Lớp dữ liệu (Data Layer)
Lớp dữ liệu có nhiệm vụ:
- Kết nối cơ sở dữ liệu
- Lưu trữ dữ liệu
- Truy xuất dữ liệu hệ thống

### 3. Luồng xử lý dữ liệu trong hệ thống
Quy trình xử lý dữ liệu trong hệ thống được thực hiện theo các bước sau:
1. Người dùng thao tác trên giao diện hệ thống.
2. Giao diện gửi yêu cầu đến lớp xử lý nghiệp vụ.
3. Lớp nghiệp vụ kiểm tra và xử lý dữ liệu.
4. Nếu dữ liệu hợp lệ, hệ thống gửi yêu cầu truy xuất hoặc cập nhật cơ sở dữ liệu.
5. Cơ sở dữ liệu trả kết quả về lớp xử lý nghiệp vụ.
6. Lớp nghiệp vụ xử lý kết quả và trả về giao diện.
7. Giao diện hiển thị kết quả cho người dùng.

---

## II. Thiết kế Class Diagram
Class Diagram mô tả cấu trúc tĩnh của hệ thống quản lý nhà hàng hải sản, bao gồm các lớp, thuộc tính và mối quan hệ giữa các lớp trong hệ thống.
Các lớp chính gồm:
- KhachHang
- ThongTinDatBan
- BanAn
- NhanVien
- ChucVu
- TaiKhoan
- MonAn
- HoaDon
- ChiTietHoaDon
- PhuongThucThanhToan

Biểu đồ lớp giúp hỗ trợ quá trình phân tích, thiết kế cơ sở dữ liệu và xây dựng hệ thống phần mềm.

---

## III. Thiết kế ERD

### 1. Mô hình ERD
ERD (Entity Relationship Diagram) được sử dụng để mô tả cấu trúc cơ sở dữ liệu của hệ thống quản lý nhà hàng hải sản. Biểu đồ thể hiện các thực thể, thuộc tính và mối quan hệ giữa các thực thể trong hệ thống. Các thực thể được liên kết với nhau nhằm hỗ trợ quản lý đặt bàn, quản lý thực đơn, gọi món, thanh toán hóa đơn và quản lý nhân viên trong nhà hàng.

### 2. Mô tả các thực thể và ràng buộc

#### 2.1. Thực thể KhachHang
| Thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| MaKH | varchar(10) | PK, AUTO_INCREMENT | Mã khách hàng |
| HoTen | nvarchar(50) | NOT NULL | Họ tên khách hàng |
| SoDienThoai | varchar(10) | UNIQUE, NOT NULL | Số điện thoại |
| Email | varchar(50) | NULL | Email khách hàng |

#### 2.2. Thực thể ThongTinDatBan
| Thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| MaDatBan | varchar(10) | PK, AUTO_INCREMENT | Mã đặt bàn |
| MaKH | varchar(10) | FK | Mã khách hàng |
| MaNV | varchar(10) | FK | Mã nhân viên |
| MaBan | varchar(10) | FK | Mã bàn ăn |
| NgayDat | date | NOT NULL | Ngày đặt bàn |
| NgayDen | date | NOT NULL | Ngày khách đến |
| SoNguoi | int | CHECK(SoNguoi > 0) | Số lượng người |
| GhiChu | nvarchar(255) | NULL | Ghi chú |
| TrangThai | nvarchar(50) | NOT NULL | Trạng thái đặt bàn |

#### 2.3. Thực thể BanAn
| Thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| MaBan | varchar(10) | PK, AUTO_INCREMENT | Mã bàn ăn |
| TenBan | nvarchar(50) | UNIQUE, NOT NULL | Tên bàn |
| SucChua | int | CHECK(SucChua > 0) | Sức chứa |
| TrangThai | nvarchar(50) | NOT NULL | Trạng thái bàn |

#### 2.4. Thực thể ChucVu
| Thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| MaChucVu | varchar(10) | PK, AUTO_INCREMENT | Mã chức vụ |
| TenChucVu | nvarchar(50) | NOT NULL | Tên chức vụ |

#### 2.5. Thực thể NhanVien
| Thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| MaNV | varchar(10) | PK, AUTO_INCREMENT | Mã nhân viên |
| MaChucVu | varchar(10) | FK | Mã chức vụ |
| TenNV | nvarchar(50) | NOT NULL | Tên nhân viên |
| NgaySinh | date | NOT NULL | Ngày sinh |
| DiaChi | nvarchar(255) | NULL | Địa chỉ |
| SDT | varchar(10) | UNIQUE | Số điện thoại |
| SoCCCD | varchar(12) | UNIQUE | Số CCCD |
| GioiTinh | bit | NOT NULL | Giới tính |

#### 2.6. Thực thể TaiKhoan
| Thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| MaTaiKhoan | varchar(10) | PK, AUTO_INCREMENT | Mã tài khoản |
| MaNV | varchar(10) | FK | Mã nhân viên |
| TenDangNhap | nvarchar(50) | UNIQUE, NOT NULL | Tên đăng nhập |
| MatKhau | varchar(20) | NOT NULL | Mật khẩu |

#### 2.7. Thực thể MonAn
| Thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| MaMon | varchar(10) | PK, AUTO_INCREMENT | Mã món ăn |
| TenMon | nvarchar(50) | NOT NULL | Tên món ăn |
| Gia | decimal(18,2) | CHECK(Gia > 0) | Giá món ăn |
| TrangThai | nvarchar(50) | NOT NULL | Trạng thái món ăn |
| MoTa | nvarchar(255) | NULL | Mô tả món ăn |

#### 2.8. Thực thể HoaDon
| Thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| MaHoaDon | varchar(10) | PK, AUTO_INCREMENT | Mã hóa đơn |
| MaPTTT | varchar(10) | FK | Mã phương thức thanh toán |
| MaBan | varchar(10) | FK | Mã bàn ăn |
| MaNV | varchar(10) | FK | Mã nhân viên |
| NgayLap | date | NOT NULL | Ngày lập hóa đơn |
| GiamGia | decimal(18,2) | DEFAULT 0 | Giảm giá |
| TongTien | decimal(18,2) | CHECK(TongTien >= 0) | Tổng tiền |
| TrangThai | nvarchar(50) | NOT NULL | Trạng thái hóa đơn |

#### 2.9. Thực thể ChiTietHoaDon
| Thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| MaMon | varchar(10) | PK, FK | Mã món ăn |
| MaHoaDon | varchar(10) | PK, FK | Mã hóa đơn |
| SoLuong | int | CHECK(SoLuong > 0) | Số lượng món ăn |
| GhiChu | nvarchar(255) | NULL | Ghi chú |
| ThanhTien | decimal(18,2) | CHECK(ThanhTien >= 0) | Thành tiền |

#### 2.10. Thực thể PhuongThucThanhToan
| Thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
|---|---|---|---|
| MaPTTT | varchar(10) | PK, AUTO_INCREMENT | Mã phương thức thanh toán |
| TenPTTT | nvarchar(50) | NOT NULL | Tên phương thức thanh toán |

---

## IV. Thiết kế giao diện

### 1. Giao diện Đăng nhập
Thiết kế tối giản với hai trường nhập liệu chính là Tài khoản và Mật khẩu, giúp người dùng truy cập nhanh vào hệ thống theo vai trò đã phân quyền.

### 2. Giao diện Mở ca
Hiển thị một cửa sổ thông báo yêu cầu người quản lý nhập số tiền mặt đầu ca để kích hoạt hệ thống và bắt đầu phiên làm việc mới.

### 3. Giao diện đóng ca
Tự động tổng hợp và hiển thị các số liệu doanh thu trong ca bao gồm: số lượng hóa đơn, tổng doanh thu, doanh thu tiền mặt và chuyển khoản. Giao diện này cũng yêu cầu kiểm kê số tiền mặt thực tế tại quầy để đối chiếu.

### 4. Giao diện Quản lý bàn ăn
Là giao diện trung tâm, mô phỏng bố cục thực tế của nhà hàng. Mỗi bàn được hiển thị dưới dạng các ô hình chữ nhật kèm số bàn, sức chứa và trạng thái hiện tại (Trống, Đang phục vụ, Đã đặt) được phân biệt bằng màu sắc. Thực hiện các thao tác Thêm/Sửa/Xóa bàn ăn.

### 5. Giao diện Order
Tích hợp toàn diện các tính năng giúp người dùng thao tác nhanh chóng trên cùng một màn hình. Hệ thống cung cấp menu phân loại thực đơn theo nhóm để lọc món dễ dàng, kết hợp với danh sách món ăn hiển thị dưới dạng thẻ trực quan kèm hình ảnh thực tế và đơn giá. Tại đây, nhân viên có thể thêm món tức thì vào giỏ hàng bằng nút cộng (+), đồng thời trực tiếp điều chỉnh số lượng, xóa món hoặc thêm ghi chú yêu cầu gửi đến bếp. Toàn bộ thông tin về mã giảm giá (%) và tổng tiền tạm tính được hệ thống tự động cập nhật liên tục theo thời gian thực, đảm bảo tính chính xác trước khi chuyển sang bước thanh toán.

### 6. Giao diện In hóa đơn và Thanh toán
Hiển thị bảng kê chi tiết danh sách món khách đã dùng, đơn giá, thành tiền, mức giảm giá và tổng cộng số tiền cuối cùng cần trả.

### 7. Giao diện Quản lý Đặt bàn
Hiển thị danh sách các bàn có trạng thái Đã đặt (màu đỏ). Mỗi thẻ bàn tích hợp chức năng xem chi tiết thông tin khách hàng hoặc hủy lịch đặt ngay tại giao diện.

### 8. Giao diện Quản lý thực đơn
Trình bày danh sách món ăn dưới dạng bảng quản trị trực quan, bao gồm hình ảnh, tên món, phân loại và đơn giá. Tại mỗi dòng, hệ thống cung cấp các nút chức năng Sửa và Xóa để cập nhật thông tin nhanh chóng. Ngoài ra, quản lý có thể dễ dàng thêm món mới thông qua biểu mẫu nhập liệu hoặc tìm kiếm món ăn theo danh mục và từ khóa để tối ưu việc điều chỉnh thực đơn.

### 9. Giao diện Quản lý người dùng
Hiển thị danh sách nhân sự dưới dạng bảng minh bạch với các cột thông tin chính như họ tên, tên đăng nhập và quyền hạn cụ thể (ADMIN hoặc STAFF). Quản lý có thể thực hiện thêm người dùng mới thông qua biểu mẫu nhập liệu hoặc trực tiếp chỉnh sửa và xóa các tài khoản hiện có để điều chỉnh nhân sự kịp thời.

### 10. Giao diện Quản lý hóa đơn
Cung cấp danh sách lịch sử các giao dịch đã thực hiện. Tại giao diện này, quản lý có thể xem lại chi tiết hóa đơn, thực hiện chỉnh sửa thông tin hoặc xóa bỏ các hóa đơn lỗi để đảm bảo tính chính xác cho dữ liệu doanh thu. Ngoài ra, màn hình còn hiển thị nhanh các số liệu tổng hợp như doanh thu trong ngày và tổng số lượng hóa đơn đã lập.

### 11. Giao diện Báo cáo và thống kê
Cung cấp cái nhìn tổng quan về hiệu quả kinh doanh thông qua các thông số doanh thu theo Ngày/Tháng. Hệ thống tự động tổng hợp dữ liệu từ các hóa đơn đã thanh toán để hiển thị các chỉ số chi tiết như tổng số lượng hóa đơn, số tiền thu được theo từng phương thức thanh toán (tiền mặt, chuyển khoản). Quản lý có thể lọc báo cáo theo khoảng thời gian tùy chỉnh và thực hiện in hoặc xuất dữ liệu ra file Excel phục vụ công tác lưu trữ và kế toán.

---

# CHƯƠNG 4: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN

## I. Kết luận
Sau quá trình khảo sát, phân tích, thiết kế và xây dựng hệ thống, đề tài “Hệ thống quản lý nhà hàng hải sản” đã hoàn thành các chức năng cơ bản đáp ứng nhu cầu quản lý của nhà hàng.

Hệ thống hỗ trợ các chức năng như:
- Quản lý bàn ăn
- Quản lý thực đơn
- Đặt bàn ăn
- Gọi món
- Thanh toán hóa đơn
- Thống kê doanh thu
- Quản lý nhân viên và tài khoản

Việc áp dụng hệ thống giúp giảm thời gian quản lý, hạn chế sai sót trong quá trình vận hành và nâng cao hiệu quả hoạt động của nhà hàng.

### Ưu điểm của hệ thống
- Giao diện dễ sử dụng
- Dữ liệu được quản lý tập trung
- Hỗ trợ quản lý hóa đơn và doanh thu hiệu quả
- Giảm sai sót khi quản lý thủ công
- Dễ dàng mở rộng và nâng cấp hệ thống

### Nhược điểm của hệ thống
- Chưa hỗ trợ thanh toán trực tuyến
- Chưa phát triển trên nền tảng di động
- Chưa tích hợp chức năng đặt bàn online
- Chưa hỗ trợ quản lý nhiều chi nhánh
- Giao diện vẫn còn đơn giản

Ngoài ra, đề tài cũng giúp nhóm vận dụng các kiến thức đã học về phân tích thiết kế hệ thống, UML, thiết kế cơ sở dữ liệu và xây dựng phần mềm quản lý.

## II. Hướng phát triển
Trong tương lai, hệ thống có thể được phát triển thêm các chức năng như:
- Tích hợp thanh toán online
- Xây dựng ứng dụng di động
- Hỗ trợ đặt bàn trực tuyến
- Tích hợp QR Code gọi món
- Thống kê doanh thu bằng biểu đồ
- Quản lý chuỗi nhà hàng nhiều chi nhánh
- Tích hợp AI hỗ trợ dự đoán doanh thu và quản lý khách hàng
