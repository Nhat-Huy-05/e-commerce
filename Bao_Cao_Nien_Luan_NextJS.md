# TRƯỜNG ĐẠI HỌC KHOA HỌC HUẾ
**KHOA: CÔNG NGHỆ THÔNG TIN**  
**NGÀNH: CÔNG NGHỆ PHẦN MỀM**  
**HỌC PHẦN: THỰC TẬP VIẾT NIÊN LUẬN**  

---

## BÁO CÁO ĐỀ TÀI
# XÂY DỰNG WEBSITE BÁN HÀNG VỚI NEXT.JS APP ROUTER + TYPESCRIPT

* **LỚP:** THỰC TẬP VIẾT NIÊN LUẬN – NHÓM 5
* **MÃ HỌC PHẦN:** TIN3142
* **SINH VIÊN THỰC HIỆN:** BÙI NGUYỄN NHẬT HUY
* **MSSV:** 23T1020248
* **KHÓA:** K47
* **GIẢNG VIÊN HƯỚNG DẪN:** LÊ HỮU BÌNH

---

## NHẬN XÉT GIÁO VIÊN HƯỚNG DẪN
………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………

---

## MỤC LỤC

| Mục | Trang |
| :--- | :--- |
| **LỜI MỞ ĐẦU** | **7** |
| **CHƯƠNG 1. GIỚI THIỆU** | **10** |
| - Đặt vấn đề | 10 |
| - Lý do chọn đề tài | 10 |
| - Mục tiêu đề tài | |
| - Phương pháp nghiên cứu | |
| - Ý nghĩa đề tài | |
| **CHƯƠNG 2. KIẾN THỨC NỀN TẢNG** | |
| - Giới thiệu về Next.js và TypeScript | |
| &nbsp;&nbsp;&nbsp;&nbsp;+ Next.js là gì? Lịch sử phát triển | |
| &nbsp;&nbsp;&nbsp;&nbsp;+ Tại sao chọn Next.js + TypeScript? | |
| - App Router trong Next.js | |
| &nbsp;&nbsp;&nbsp;&nbsp;+ Cơ chế định tuyến và giao diện lồng nhau | |
| &nbsp;&nbsp;&nbsp;&nbsp;+ Server Components vs Client Components | |
| - Các chiến lược Rendering | |
| &nbsp;&nbsp;&nbsp;&nbsp;+ CSR (Client-Side Rendering) | |
| &nbsp;&nbsp;&nbsp;&nbsp;+ SSR (Server-Side Rendering) | |
| &nbsp;&nbsp;&nbsp;&nbsp;+ SSG (Static Site Generation) | |
| &nbsp;&nbsp;&nbsp;&nbsp;+ ISR (Incremental Static Regeneration) | |
| &nbsp;&nbsp;&nbsp;&nbsp;+ Bảng tổng hợp so sánh các chiến lược Rendering | |
| - Giới thiệu ngắn gọn về Prisma ORM | |
| &nbsp;&nbsp;&nbsp;&nbsp;+ Khái niệm và kiến trúc cốt lõi của Prisma | |
| &nbsp;&nbsp;&nbsp;&nbsp;+ Lý do chọn Prisma ORM cho hệ thống E-commerce | |
| **CHƯƠNG 3. PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG** | |
| - 3.1. Phân tích yêu cầu hệ thống | |
| &nbsp;&nbsp;&nbsp;&nbsp;+ 3.1.1. Khảo sát các giải pháp E-commerce và đặt vấn đề | |
| &nbsp;&nbsp;&nbsp;&nbsp;+ 3.1.2. Phân tích yêu cầu chức năng | |
| - 3.2. Thiết kế kiến trúc UML và mô hình khái niệm | |
| &nbsp;&nbsp;&nbsp;&nbsp;+ 3.2.1. Sơ đồ Lớp (Class Diagram) | |
| &nbsp;&nbsp;&nbsp;&nbsp;+ 3.2.2. Sơ đồ Use Case tổng quan và bảng đặc tả Use Case | |
| &nbsp;&nbsp;&nbsp;&nbsp;+ 3.2.3. Activity & Sequence Diagram | |
| - 3.3. Thiết kế Cơ sở dữ liệu | |
| &nbsp;&nbsp;&nbsp;&nbsp;+ 3.3.1. Sơ đồ thực thể mối quan hệ (ERD Diagram) | |
| **CHƯƠNG 4. CÀI ĐẶT VÀ TRIỂN KHAI ỨNG DỤNG** | |
| - 4.1. Giao diện trang chủ hệ thống | 45 |
| - 4.2. Giao diện trang đăng nhập và xác thực | 46 |
| - 4.3. Giao diện trang tìm kiếm và lọc sản phẩm | 47 |
| - 4.4. Giao diện trang chi tiết sản phẩm | 48 |
| - 4.5. Giao diện trang giỏ hàng tương tác | 48 |
| - 4.6. Giao diện thanh toán và đặt hàng | 49 |
| - 4.7. Giao diện quản lý đơn hàng cá nhân | 49 |
| - 4.8. Giao diện trang cá nhân khách hàng/admin | 50 |
| - 4.9. Giao diện trang dashboard quản trị sản phẩm | 51 |
| - 4.10. Giao diện trang thêm/chỉnh sửa sản phẩm | 51 |
| **CHƯƠNG 5. KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN** | **53** |
| - 5.1. Kết luận | 52 |
| - 5.2. Hướng phát triển | 53 |
| **TÀI LIỆU THAM KHẢO** | **54** |

---

## DANH MỤC HÌNH ẢNH

| STT | TÊN HÌNH ẢNH | TRANG |
| :---: | :--- | :---: |
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |

---

## DANH MỤC TỪ VIẾT TẮT

| STT | Ký tự viết tắt | Tiếng Anh | Tiếng Việt |
| :---: | :--- | :--- | :--- |
| 1 | SEO | Search Engine Optimization | Tối ưu hoá công cụ tìm kiếm |
| 2 | UI | User Interface | Giao diện người dùng |
| 3 | UX | User Experience | Trải nghiệm người dùng |
| 4 | SSR | Server-Side Rendering | Kết xuất phía máy chủ |
| 5 | SSG | Static Site Generation | Khởi tạo trang tĩnh |
| 6 | ISR | Incremental Static Regeneration | Tái tạo trang tĩnh tăng tiến |
| 7 | RSC | React Server Components | Thành phần React phía máy chủ |
| 8 | ORM | Object-Relational Mapping | Ánh xạ quan hệ - đối tượng |
| 9 | FCP | First Contentful Paint | Thời gian hiển thị nội dung đầu tiên |
| 10 | TTI | Time to Interactive | Thời gian sẵn sàng tương tác |

---

## LỜI MỞ ĐẦU

Trong bối cảnh hiện nay, kinh tế số có những bước phát triển vượt bậc, thương mại điện tử (e-commerce) đã trở thành một phần không thể thiếu trong hoạt động kinh doanh của các doanh nghiệp cũng như thói quen tiêu dùng của xã hội. Sự cạnh tranh khốc liệt trên thị trường trực tuyến đòi hỏi các website bán hàng không chỉ dừng lại ở việc cung cấp đầy đủ tính năng, mà còn phải đáp ứng những yêu cầu tiêu chuẩn cực kỳ khắt khe về tốc độ tải trang (Performance), khả năng tối ưu hoá công cụ tìm kiếm (SEO) để tiếp cận khách hàng tự nhiên, và sự kết hợp hoàn hảo giữa giao diện trực quan (UI) cùng trải nghiệm người dùng mượt mà (UX).

Các giải pháp xây dựng website truyền thống hoặc các Single Page Application (SPA) thuần tuý trước đây dần bộc lộ những hạn chế lớn. Điển hình là việc Web phụ thuộc hoàn toàn vào Client-Side Rendering (CSR) khiến thời gian tải trang đầu tiên (FCP) bị kéo dài và gây cản trở nghiêm trọng cho các robot tìm kiếm (SEO Crawlers) khi thu thập dữ liệu.

Để giải quyết bài toán này tối ưu, các công nghệ Web hiện đại đã chuyển dịch mạnh mẽ sang mô hình Hybrid Rendering. Nhận thấy tiềm năng vượt trội của hệ sinh thái React, em đã lựa chọn nghiên cứu và thực hiện đề tài: **“Xây dựng Website bán hàng với Next.js App Router + TypeScript”**.

Đề tài này không chỉ dừng lại ở việc tạo ra một ứng dụng mua bán trực tuyến đầy đủ chức năng, mà tập trung nghiên cứu sâu vào việc tối ưu hoá kiến trúc hệ thống:

* **Ứng dụng Next.js App Router:** Khai thác sức mạnh của mô hình phân chia cấu trúc trang linh hoạt, kết hợp nhuần nhuyễn giữa React Server Components (RSC) và Client Components để giảm thiểu tối đa dung lượng JavaScript tải xuống trình duyệt của mỗi người dùng.
* **Tối ưu hoá các chiến lược Rendering:** Phân tích kỹ lưỡng từng phân hệ chức năng để áp dụng chiến lược hiển thị phù hợp nhất. Từ việc sử dụng Static Site Generation (SSG) kết hợp Incremental Static Regeneration (ISR) cho trang chủ và trang sản phẩm nhằm đạt tốc độ tải trang tức thì và tối ưu SEO, cho đến việc áp dụng Server-Side Rendering (SSR) cho trang thanh toán bảo mật và Client-Side Rendering (CSR) để xử lý các tương tác thời gian thực tại trang giỏ hàng, nơi dữ liệu liên tục thay đổi theo hành vi của từng người dùng.
* **Đảm bảo tính toàn vẹn hệ thống với TypeScript và Prisma:** Sử dụng TypeScript xuyên suốt từ Front-end đến Back-end giúp phát hiện lỗi sớm trong quá trình phát triển, kiểm soát chặt chẽ kiểu dữ liệu của các luồng API, kết hợp cùng Prisma ORM để giao tiếp với cơ sở dữ liệu một cách an toàn và tường minh.

Bài báo cáo này là kết quả từ việc nghiên cứu lý thuyết, phân tích thực trạng các giải pháp e-commerce hiện nay và trực tiếp xây dựng, đo lường hiệu năng thực tế của ứng dụng.

---

## CHƯƠNG 1. GIỚI THIỆU

### 1.1. Đặt vấn đề
Trong kỷ nguyên số hoá, thương mại điện tử (e-commerce) không còn là một kênh bán hàng phụ trợ mà đã trở thành trọng điểm kinh doanh của các doanh nghiệp. Tuy nhiên, sự phát triển này cũng đi kèm với kỳ vọng ngày càng lớn từ phía những người dùng. Khách hàng không còn đủ kiên nhẫn để chờ đợi một trang web tải chậm, hay chấp nhận một giao diện giật lag khi tương tác, ảnh hưởng tới trải nghiệm người dùng. Theo các nghiên cứu về trải nghiệm người dùng, chỉ cần trang web tải chậm quá 3 giây, tỉ lệ khách hàng rời bỏ hệ thống sẽ tăng lên hơn 50%.

Bên cạnh đó, đối với một website bán hàng, SEO (Search Engine Optimization) là yếu tố sống còn để doanh nghiệp tiếp cận khách hàng một cách tự nhiên mà không tốn quá nhiều chi phí quảng cáo. Các giải pháp như Single Page Application (SPA) truyền thống (như ReactJS thuần) sử dụng cơ chế Client-Side Rendering (CSR) thường gặp bất lợi lớn về SEO lý do vì các robot tìm kiếm khó có thể lập chỉ mục (index) các trang web trống rỗng trước khi JavaScript được thực thi ở trình duyệt (client). Bài toán lúc này đặt ra là làm thế nào để giữ được trải nghiệm mượt mà của một ứng dụng trang đơn, vừa tối ưu hoá tốc độ tải trang lần đầu tiên và đảm bảo thân thiện với các bộ máy tìm kiếm.

### 1.2. Lý do chọn đề tài
Để giải quyết những vấn đề trên, các framework hiện đại đã hướng tới mô hình Hybrid Rendering (kết hợp nhiều phương pháp hiển thị khác nhau trên cùng một hệ thống). Next.js – với kiến trúc App Router mới nhất – nổi lên như một giải pháp hàng đầu khi cho phép nhà phát triển linh hoạt lựa chọn giữa Server Components và Client Components, đồng thời kết hợp linh hoạt các chiến lược Rendering như SSG, SSR, và ISR trên từng trang riêng biệt.

Bên cạnh đó, việc xây dựng một hệ thống e-commerce lớn đòi hỏi sự chặt chẽ về mặt dữ liệu để tránh các lỗi logic trong quá trình đặt hàng, thanh toán và quản lý kho. TypeScript với cơ chế static typing (kiểm tra kiểu dữ liệu tĩnh) là mảnh ghép hoàn hảo giúp kiểm soát chặt chẽ mã nguồn, hạn chế tối đa lỗi runtime và tăng khả năng bảo trì, mở rộng dự án.

Chính vì những lý do trên, em đã lựa chọn đề tài: **“Xây dựng Website bán hàng với Next.js App Router + TypeScript”** nhằm nghiên cứu sâu vào cách tối ưu hiệu năng và SEO cho hệ thống thương mại điện tử thực tế bằng những công nghệ tiên tiến nhất hiện nay.

### 1.3. Mục tiêu đề tài
* **Mục tiêu nghiên cứu lý thuyết:**
  * Tìm hiểu sâu về cơ chế hoạt động của Next.js App Router, sự khác biệt và cách phối hợp giữa React Server Components và Client Components.
  * Phân tích và nắm vững các chiến lược hiển thị dữ liệu: CSR, SSR, SSG và ISR để áp dụng chính xác cho từng phân hệ chức năng.
  * Nghiên cứu cách thiết kế hệ thống an toàn kiểu (Type-safe) từ Front-end đến Database sử dụng TypeScript và Prisma ORM.
* **Mục tiêu xây dựng ứng dụng thực tiễn:**
  * Xây dựng hoàn chỉnh ứng dụng Website bán hàng với giao diện trực quan, hiện đại và nhất quán (UI/UX).
  * Hiện thực hoá các trang chức năng tối ưu: Trang chủ và Trang sản phẩm đạt điểm hiệu năng cao nhờ SSG + ISR, Trang giỏ hàng tương tác thời gian thực mượt mà nhờ CSR, Trang thanh toán bảo mật nhờ SSR.
  * Đạt điểm tối ưu trên các công cụ đo lường hiệu năng danh tiếng (như Google Lighthouse) về các chỉ số Performance, SEO và Accessibility.

### 1.4. Phương pháp nghiên cứu
* Đọc và phân tích các tài liệu chính thức của Next.js, TypeScript và Prisma, nghiên cứu các bài viết phân tích chuyên sâu về kiến trúc Web Rendering trên các diễn đàn công nghệ uy tín.
* Khảo sát thực trạng hiện tại của các trang web e-commerce lớn hiện nay, phân tích ưu điểm – nhược điểm của từng giải pháp để đưa ra thiết kế kiến trúc hệ thống, sơ đồ luồng dữ liệu và thiết kế cơ sở dữ liệu tối ưu trên MySQL thông qua Prisma.

### 1.5. Ý nghĩa đề tài
* Đóng góp nghiên cứu thực nghiệm rõ ràng về hiệu quả của việc kết hợp các chiến lược Rendering (SSG, SSR, ISR, CSR) đối với hiệu năng và khả năng tối ưu SEO của 1 website thương mại điện tử trong thực tế.
* Tạo một trang website bán hàng hoàn chỉnh, có tốc độ phản hồi cực nhanh, giao diện hiện đại và có khả năng ứng dụng trực tiếp vào các mô hình kinh doanh nhỏ và vừa. Đồng thời, dự án là tài liệu tham khảo hữu ích cho các nhà phát triển muốn tiếp cận và làm chủ Next.js App Router và TypeScript theo các chuẩn mực phát triển phần mềm tốt nhất.

---

## CHƯƠNG 2. KIẾN THỨC NỀN TẢNG

### 2.1. Giới thiệu về Next.js và TypeScript

#### 2.1.1. Next.js là gì? Lịch sử phát triển
Next.js là một framework mã nguồn mở dành cho React nhằm xây dựng các ứng dụng web full-stack, ta sử dụng React Components để xây dựng giao diện người dùng, và Next.js cho các tính năng bổ sung và tối ưu hoá. Nếu React thuần chỉ là một thư viện tập trung vào việc xây dựng giao diện người dùng (UI) ở phía Client, thì Next.js cung cấp một giải pháp toàn diện (Framework) bao gồm cả công cụ build, hệ thống định tuyến (Routing), và đặc biệt là khả năng tối ưu hoá rendering (SSR, SSG, ISR) ở phía Server. Cho dù bạn là một nhà phát triển cá nhân hay là thành viên của một nhóm lớn, Next.js đều có thể giúp bạn xây dựng các ứng dụng React tương tác, năng động và nhanh chóng.

*Hình 2.1: Các tính năng và lợi ích cốt lõi của Next.js trong phát triển ứng dụng Web*

**Lịch sử phát triển và các cột mốc quan trọng:**
Next.js ra đời năm 2016 với mục tiêu cung cấp giải pháp render phía máy chủ cho React. Từ phiên bản 13.0 (năm 2022), Next.js giới thiệu kiến trúc App Router cách mạng, tích hợp React Server Components (RSC) cho phép kết xuất hybrid linh hoạt trên cùng một ứng dụng. Phiên bản hiện đại (15.0+) đã ổn định các tính năng này thành chuẩn công nghiệp.

#### 2.1.2. Tại sao chọn Next.js + TypeScript?
Việc kết hợp giữa Next.js và TypeScript đã trở thành một tiêu chuẩn công nghiệp trong quá trình phát triển ứng dụng Web full-stack hiện nay nhờ vào các lý do cốt lõi sau:
* **Tối ưu hoá hiệu năng và SEO toàn diện (Từ Next.js):** Next.js cung cấp các cơ chế Rendering linh hoạt (SSR, SSG, ISR, CSR) giúp website bán hàng tải trang nhanh, cung cấp đầy đủ HTML cho bot tìm kiếm, tối ưu SEO.
* **Kiểm soát lỗi dữ liệu:** TypeScript giúp phát hiện sai lệch kiểu dữ liệu ngay lúc viết code, loại bỏ những lỗi chỉ phát hiện được khi ứng dụng chạy.

**Tại sao TypeScript trong thương mại điện tử:**
Bên cạnh Next.js, TypeScript đóng vai trò quan trọng trong việc đảm bảo tính toàn vẹn của hệ thống bán hàng. Trong bối cảnh mà dữ liệu sản phẩm, giỏ hàng và thanh toán phải luôn chính xác tuyệt đối, TypeScript cung cấp ba lợi ích cốt lõi:
1. **Phát hiện lỗi sớm:** Thay vì chỉ phát hiện lỗi khi ứng dụng chạy, TypeScript kiểm tra lỗi ngay tại thời điểm viết code.
2. **Tự động hoàn tất và tài liệu code:** Trong quá trình viết code, editor tự động gợi ý các thuộc tính và methods, giảm thiểu thời gian tra cứu tài liệu.
3. **Kiến trúc code an toàn qua các layer:** Trong mô hình Next.js + Prisma, TypeScript đảm bảo tính an toàn dữ liệu từ database -> API -> Frontend.

### 2.2. App Router trong Next.js

#### 2.2.1. Cơ chế định tuyến và giao diện lồng nhau (File-based Routing & Nested Layouts)
Hệ thống App Router được giới thiệu từ phiên bản Next.js 13 là một bước tiến lớn trong việc thay đổi kiến trúc xây dựng ứng dụng Web dựa trên nền tảng React. Hệ thống này hoạt động dựa trên các đặc tính cốt lõi sau:

* **Định tuyến dựa trên cấu trúc thư mục (File-based Routing):** Các đường dẫn (URL) của ứng dụng được quyết định trực tiếp bởi cấu trúc cây thư mục bên trong thư mục gốc `/app`. Một đường dẫn chỉ được hình thành và hiển thị giao diện khi thư mục tương ứng chứa tệp tin được cấu hình với tên cố định là `page.tsx`. Cơ chế này giúp việc quản lý các phân đoạn phân cấp của Website bán hàng (ví dụ: `/products`, `/cart`, `/checkout`) trở nên tường minh, trực quan và dễ bảo trì.

*Hình 2.2: Cơ chế ánh xạ hệ thống định tuyến dựa trên cấu trúc thư mục (File-based Routing)*

* **Giao diện lồng nhau (Nested Layouts):** Next.js cho phép định nghĩa các tệp `layout.tsx` tại từng cấp thư mục nhằm chia sẻ các thành phần giao diện dùng chung (như thanh điều hướng – Header, chân trang – Footer) cho toàn bộ các trang con. Khi người dùng thực hiện chuyển trang, hệ thống chỉ tái cấu trúc phần nội dung thay đổi bên trong file `page.tsx`, giữ nguyên trạng thái của Layout chung. Cơ chế này giúp giảm thiểu tối đa số lượng phần tử phải tải lại (re-render), từ đó tối ưu hoá hiệu năng và tăng tốc độ phản hồi của website.

*Hình 2.3: Cơ chế kế thừa giao diện lồng nhau và định tuyến động (Nested Layouts)*

#### 2.2.2. Server Components và Client Components
Trong kiến trúc App Router của Next.js, các thành phần giao diện (Components) được phân chia rõ rệt thành hai loại dựa trên môi trường thực thi: Server Components (kết xuất phía máy chủ) và Client Components (kết xuất phía máy khách). Sự phân tách này giúp tối ưu hoá hiệu năng bằng cách tận dụng sức mạnh xử lý của máy chủ kết hợp với tính tương tác linh hoạt của trình duyệt.

**Khái niệm và cơ chế hoạt động:**
* **React Server Components (RSC):** Theo tài liệu kỹ thuật chính thức của React và Next.js (Vercel), tất cả các thành phần trong thư mục `app` mặc định đều là Server Components. Quy trình rendering hoàn toàn diễn ra trên môi trường máy chủ. Máy chủ thực thi mã nguồn, thực hiện các truy vấn dữ liệu trực tiếp, sau đó chuyển đổi các thành phần thành một dạng cấu trúc dữ liệu đặc biệt để tạo ra HTML tĩnh gửi về cho trình duyệt. Trình duyệt nhận về HTML và hiển thị ngay lập tức mà không cần đợi tải các tệp JavaScript lớn.
* **Client Components:** Để định nghĩa một Client Component, tệp tin phải được khai báo chỉ thị `"use client"` ở ngay dòng đầu tiên của mã nguồn. Thành phần này vẫn được Next.js tiền kết xuất (prerender) thành HTML tĩnh trên Server trong lần tải trang đầu tiên để đảm bảo tốc độ. Sau đó, khi mã JavaScript tương ứng được tải về trình duyệt, hệ thống sẽ kích hoạt và gắn các bộ lắng nghe sự kiện (như click, thay đổi dữ liệu) vào phần khung HTML có sẵn. Quá trình này giúp chuyển đổi giao diện từ trạng thái hiển thị tĩnh ban đầu sang trạng thái động, sẵn sàng phản hồi và tương tác với các hành động của người dùng.

**Bảng so sánh và tiêu chí lựa chọn ứng dụng:**

| Tiêu chí phân loại | Server Components (mặc định) | Client Components (Thêm `"use client"`) |
| :--- | :--- | :--- |
| **Môi trường thực thi chính** | Máy chủ (Server) | Máy khách / Trình duyệt (Browser) |
| **Tác vụ phân tích dữ liệu** | Cho phép truy vấn dữ liệu trực tiếp từ Database (qua Prisma ORM) hoặc các API nội bộ. | Không thể kết nối trực tiếp với Database, phải gọi dữ liệu thông qua các API Routes. |
| **Tính bảo mật** | Giữ an toàn các thông tin nhạy cảm (Tokens, API Keys) trên server, không bị lộ phía client. | Các đoạn mã xử lý logic và dữ liệu trạng thái sẽ hiển thị ở phía client. |
| **Dung lượng JavaScript** | Không làm tăng dung lượng gói JavaScript tải về trình duyệt. | Phụ thuộc vào kích thước của thành phần và các thư viện bên thứ ba đi kèm. |
| **Khả năng tương tác (React Hooks)** | Không sử dụng được các Hook quản lý trạng thái (`useState`, `useEffect`). | Sử dụng toàn bộ các Hooks của React và các API của trình duyệt (`window`, `localStorage`). |
| **Thành phần tương ứng trong dự án E-commerce** | Trang danh sách sản phẩm (`/products`), Trang chi tiết sản phẩm (`/products/[id]`), Các khối thông tin tĩnh. | Nút “Thêm vào giỏ hàng” (Add to Cart), Thanh tìm kiếm sản phẩm, Các biểu mẫu (form,...). |

**Nguyên lý phối hợp trong kiến trúc hệ thống:** Để đạt hiệu năng cao nhất, hệ thống E-commerce được thiết kế theo mô hình "Mở đầu bằng Server, Tương tác bằng Client". Các Server Components đóng vai trò là phần khung (Shell) bên ngoài để đảm nhận việc lấy dữ liệu (Fetch data) từ cơ sở dữ liệu, sau đó truyền dữ liệu này xuống dưới dạng các tham số (props) cho các Client Components nhỏ hơn nằm bên trong để xử lý tương tác. Sự phân tách này đảm bảo website bán hàng vừa đạt điểm số SEO tối đa, vừa duy trì được trải nghiệm mượt mà khi khách hàng mua sắm.

### 2.3. Các chiến lược Rendering
Rendering (kết xuất) là quá trình chuyển đổi mã nguồn React và dữ liệu thành giao diện HTML để trình duyệt hiển thị cho người dùng. Trong kiến trúc App Router của Next.js, cơ chế này được vận hành theo mô hình **Hybrid Rendering** (Kết xuất hỗn hợp). Mô hình này cho phép nhà phát triển linh hoạt áp dụng các chiến lược hiển thị khác nhau trên từng trang cụ thể thay vì áp đặt một cấu hình duy nhất cho toàn bộ hệ thống. 

Đối với một dự án thương mại điện tử, việc lựa chọn chiến lược Rendering phù hợp là bài toán tối ưu hoá đồng thời giữa ba yếu tố: tốc độ tải trang (Hiệu năng), khả năng lập chỉ mục của bot tìm kiếm (SEO), và tính cập nhật liên tục của thông tin sản phẩm (Trải nghiệm người dùng).

Để giải quyết bài toán này, Next.js cung cấp bốn chiến lược kết xuất cốt lõi:
1. **Client-Side Rendering (CSR):** Kết xuất dữ liệu và giao diện trực tiếp trên trình duyệt của người dùng thông qua mã JavaScript.
2. **Server-Side Rendering (SSR):** Kết xuất động toàn bộ trang HTML trên máy chủ theo từng yêu cầu (request) thời gian thực từ người dùng.
3. **Static Site Generation (SSG):** Kết xuất và đóng gói trang thành các tệp HTML tĩnh ngay tại thời điểm biên dịch hệ thống (Build time).
4. **Incremental Static Regeneration (ISR):** Cho phép tái tạo hoặc cập nhật ngầm các trang tĩnh theo chu kỳ thời gian quy định mà không cần thực hiện build lại toàn bộ ứng dụng.

#### 2.3.1. Client-Side Rendering (CSR)
* **Khái niệm:** CSR là cơ chế kết xuất giao diện truyền thống của các ứng dụng React đơn trang (Single Page Application – SPA). Khi người dùng gửi yêu cầu truy cập, máy chủ chỉ trả về một tệp HTML tối giản (gần như trống rỗng) kèm theo một tệp JavaScript đã được đóng gói. Trình duyệt của người dùng tải tệp JavaScript này về, thực thi mã nguồn React, tạo cây DOM, sau đó mới gửi các yêu cầu API (fetch) đến máy chủ để lấy dữ liệu thực tế và hiển thị lên màn hình.
* **Cơ chế hoạt động:**
  1. Trình duyệt gửi yêu cầu tới máy chủ. Máy chủ trả về một trang HTML trống hoặc rất tối giản, kèm theo các đường dẫn đến file JavaScript và CSS.
  2. Tải file JavaScript: Trình duyệt tải các file JavaScript về máy. Trong lúc này, màn hình của người dùng có thể hiện trang trắng hoặc biểu tượng đang tải.
  3. Thực thi và tạo DOM: Trình duyệt chạy mã JavaScript để tự tạo ra nội dung HTML, cấu trúc trang và các thẻ giao diện.
  4. Lấy dữ liệu (API): JavaScript tiếp tục gửi yêu cầu phụ để lấy dữ liệu từ máy chủ (dạng JSON).
  5. Hiển thị hoàn chỉnh: Dữ liệu được lắp vào giao diện để người dùng nhìn thấy và thao tác.

*Hình 2.4: Luồng hoạt động của Client-Side Rendering (CSR)*

* **Ưu điểm:**
  * Tải nhanh sau lần đầu: Sau khi tải xong bộ code ban đầu, việc load trang hoặc tải thêm dữ liệu mới mượt mà. Người dùng không cần phải load lại toàn bộ trang.
  * Giảm tải cho server: Server chỉ đóng vai trò cung cấp data (API data) và các file tĩnh, việc xử lý hiển thị được đẩy lên client.
  * Tương tác cao: Phù hợp với các ứng dụng web phức tạp (web apps) cần phản hồi nhanh theo yêu cầu người dùng.
* **Nhược điểm:**
  * SEO không tốt vì công cụ tìm kiếm sẽ gặp khó khăn trong việc đọc trang web của mình vì ban đầu server chỉ trả về 1 file HTML rỗng.
  * Tải lần đầu chậm: Người dùng phải chờ trình duyệt tải và thực thi xong JavaScript mới có thể nhìn thấy nội dung. Trên các thiết bị cấu hình thấp hoặc kết nối mạng yếu, hiện tượng màn hình trắng sẽ kéo dài rõ rệt. Thậm chí, việc lạm dụng các hiệu ứng chuyển động (animation) phức tạp có thể gây giật lag nghiêm trọng trên máy yếu.
* **Ứng dụng thực tế trong dự án E-commerce:**
  * Trang giỏ hàng (`/cart`): Nơi dữ liệu thay đổi liên tục theo từng hành động của khách hàng (thêm/bớt số lượng, xoá sản phẩm) và hoàn toàn không cần tối ưu SEO.
  * Trang Hồ sơ cá nhân / Lịch sử đơn hàng (`/profile`, `/orders`): Dữ liệu riêng tư mang tính cá nhân hoá cao (User-specific data), yêu cầu xác thực người dùng (Authentication) ở phía client.

#### 2.3.2. Server-Side Rendering (SSR)
* **Khái niệm:** SSR là cơ chế kết xuất giao diện động ngay tại máy chủ (Server) cho mỗi lượt yêu cầu (request) từ phía người dùng. Khác với CSR, khi người dùng truy cập vào một trang SSR, máy chủ sẽ thực thi mã nguồn React, gọi API hoặc truy vấn trực tiếp cơ sở dữ liệu (thông qua Prisma ORM) để lấy dữ liệu mới nhất, sau đó lắp ráp thành một trang HTML hoàn chỉnh chứa đầy đủ nội dung trước khi trả về cho trình duyệt. Trình duyệt nhận được tệp HTML có thể hiển thị văn bản và hình ảnh ngay lập tức. Sau đó, tệp JavaScript được tải về để thực hiện quá trình Hydration (gắn các sự kiện tương tác React vào cây DOM đã có sẵn), giúp trang web trở thành một ứng dụng tương tác động hoàn chỉnh.
* **Cơ chế hoạt động:**
  1. Người dùng gửi yêu cầu truy cập trang web từ trình duyệt.
  2. Máy chủ xử lý dữ liệu và tạo tệp HTML hoàn chỉnh nội dung.
  3. Trình duyệt hiển thị ngay giao diện từ tệp HTML nhưng người dùng chưa thể tương tác.
  4. Trình duyệt tiến hành tải các tệp JavaScript từ máy chủ về.
  5. Trình duyệt thực thi mã JavaScript gắn các sự kiện (Hydration).
  6. Trang web hoàn tất kết nối và sẵn sàng cho người dùng tương tác đầy đủ.

*Hình 2.5: Luồng hoạt động của Server-Side Rendering (SSR)*

* **Ưu điểm:**
  * SEO cực kỳ tốt: Vì file HTML trả về từ server đã đầy đủ nội dung, các bot tìm kiếm vào là sẽ đọc được dữ liệu ngay lập tức.
  * Tải trang đầu tiên rất nhanh, người dùng không cần phải chờ trình duyệt chạy JavaScript mới thấy giao diện. Ngay khi file HTML tải về xong thì người dùng đã thấy nội dung trang web, hạn chế tối đa màn hình trắng hoặc màn hình chờ.
  * Luôn đảm bảo tính thời gian thực: Dữ liệu hiển thị luôn là dữ liệu mới nhất từ Cơ sở dữ liệu tại thời điểm truy cập.
* **Nhược điểm:**
  * Nặng tải cho máy chủ: Mỗi lần người dùng chuyển trang hoặc tải trang lại, máy chủ lại phải tính toán và xây dựng lại toàn bộ file HTML từ đầu. Nếu lượng truy cập quá lớn, máy chủ sẽ bị quá tải.
  * Trải nghiệm chuyển trang có độ chậm trễ: Mỗi lần đổi trang, toàn bộ trang web sẽ phải reload lại từ đầu từ phía máy chủ chứ không mượt mà như ứng dụng no-reload của Client-Side Rendering.
* **Ứng dụng thực tế trong dự án E-commerce:**
  * Trang kết quả tìm kiếm và bộ lọc sản phẩm (`/search`): Dữ liệu thay đổi liên tục theo từ khoá, trang, và các tiêu chí lọc của từng người dùng tại thời điểm thực, đồng thời cần chuẩn SEO.
  * Trang danh mục sản phẩm động (`/categories/...`): Nơi danh sách sản phẩm và tồn kho biến động thường xuyên, đòi hỏi cập nhật chính xác theo thời gian thực mà vẫn phải giữ khả năng lập chỉ mục SEO cao.

#### 2.3.3. Static Site Generation (SSG)
* **Khái niệm:** SSG là cơ chế kết xuất giao diện tĩnh ngay tại thời điểm biên dịch ứng dụng (Build time). Với SSG, toàn bộ dữ liệu từ cơ sở dữ liệu sẽ được truy vấn một lần duy nhất trong quá trình đóng gói dự án (`npm run build`). Next.js sẽ sinh ra sẵn các tệp HTML, CSS và JavaScript tĩnh cho từng trang. Khi có yêu cầu từ người dùng, máy chủ chỉ cần trả về ngay lập tức các tệp HTML đã biên dịch sẵn mà không cần mất thời gian xử lý logic hay truy vấn lại cơ sở dữ liệu.
* **Cơ chế hoạt động:**
  1. Build time (Giai đoạn lập trình viên đóng gói code): Hệ thống sẽ chạy qua toàn bộ mã nguồn, tự động kết nối DB để lấy dữ liệu (nếu có), và tự động vẽ sẵn ra tất cả các file HTML tĩnh tương ứng với từng trang.
  2. Deploy lên server: Toàn bộ các file HTML tĩnh được tải lên và lưu trữ trên máy chủ.
  3. Người dùng gửi yêu cầu: Khi người dùng vào trang web, server không cần tính toán hay vẽ thêm bất cứ cái gì, chỉ việc lấy ngay file HTML tĩnh đã có sẵn đó để đưa về trình duyệt.
  4. Trình duyệt nhận được file HTML tĩnh hoàn chỉnh và hiển thị ngay cho người dùng.

*Hình 2.6: Luồng hoạt động của Static Site Generation (SSG)*

* **Ưu điểm:**
  * Tốc độ tải trang cực nhanh: Vì mọi thứ đã được làm sẵn, server chỉ gửi file đi chứ không cần xử lý logic hay truy vấn DB, tốc độ phản hồi ngay lập tức.
  * SEO hoàn hảo: Giống với Server-Side Rendering (SSR), file HTML gửi về đã có đầy đủ nội dung, bot tìm kiếm dữ liệu dễ dàng.
* **Nhược điểm:**
  * Dữ liệu bị cũ: Vì trang web đã được tạo ra từ lúc build, nên nếu ta thay đổi nội dung bài viết trong DB, trang web trên mạng sẽ không tự động cập nhật. Phải bắt buộc build và deploy lại toàn bộ dự án thì người dùng mới thấy cập nhật mới.
  * Thời gian build lâu: Nếu hệ thống thương mại điện tử có hàng chục nghìn sản phẩm, việc tạo sẵn tệp HTML cho từng sản phẩm tại build time sẽ tốn rất nhiều thời gian và tài nguyên.
* **Ứng dụng thực tế trong dự án E-commerce:**
  * Trang Giới thiệu / Điều khoản dịch vụ / Chính sách bảo hành (`/about`, `/terms`, `/policy`): Các trang có nội dung cố định, hiếm khi thay đổi và cần truy cập nhanh.
  * Trang Bài viết blog / Hướng dẫn mua hàng (`/blog/[slug]`): Nội dung mang tính xuất bản, cần tối ưu SEO cao và ít khi chỉnh sửa sau khi đăng.

#### 2.3.4. Incremental Static Regeneration (ISR)
* **Khái niệm:** ISR là một cơ chế nâng cao được phát triển bởi Next.js, kết hợp ưu điểm tốc độ của SSG và tính cập nhật thời gian thực của SSR. Với ISR, nhà phát triển có thể tạo hoặc cập nhật các trang tĩnh ngầm ở phía máy chủ theo một chu kỳ thời gian định sẵn (tham số `revalidate`) mà không cần phải thực hiện build lại toàn bộ hệ thống. Khi có yêu cầu từ phía người dùng, máy chủ sẽ trả về ngay tệp HTML đã được lưu trong bộ nhớ đệm (Cache). Nếu thời gian truy cập vượt quá khoảng thời gian `revalidate` đã cấu hình, Next.js vẫn trả về trang cũ cho người dùng hiện tại, đồng thời tự động kích hoạt một quá trình khởi tạo lại trang ngầm ở phía máy chủ để cập nhật bản HTML mới cho các lượt truy cập tiếp theo.
* **Cơ chế hoạt động:**
  1. User gửi request: Người dùng gửi yêu cầu truy cập một trang web từ trình duyệt.
  2. Static Server xử lý: Yêu cầu được gửi tới Static Server – nơi đang chứa sẵn các tệp HTML đã được tạo và áp dụng style hoàn chỉnh.
  3. Hiển thị trang hoàn chỉnh: Static Server phản hồi ngay lập tức tệp HTML tĩnh để trình duyệt hiển thị một trang web hoàn chỉnh cho người dùng với tốc độ tối đa.
  4. Update data (Cập nhật ngầm): Song song với quá trình phục vụ người dùng, Static Server sẽ thực hiện cập nhật dữ liệu. Các tệp HTML tĩnh này sẽ tự động được làm mới (update) sau một khoảng thời gian cấu hình nhất định mà không cần thực hiện build lại toàn bộ ứng dụng.

*Hình 2.7: Luồng hoạt động của Incremental Static Regeneration (ISR)*

* **Ưu điểm:**
  * Tốc độ phản hồi cực nhanh: Người dùng luôn nhận được tệp HTML tĩnh từ bộ nhớ đệm nên tốc độ tải trang tương đương với SSG.
  * Dữ liệu luôn được làm mới: Nội dung trang được tự động cập nhật theo chu kỳ mà không cần can thiệp thủ công hay deploy lại ứng dụng.
  * Tối ưu tài nguyên máy chủ: Giảm tải tối đa cho cơ sở dữ liệu và CPU máy chủ so với SSR vì không phải render lại trang ở mọi request.
* **Nhược điểm:**
  * Độ trễ cập nhật nhỏ: Người dùng đầu tiên truy cập sau khoảng thời gian `revalidate` vẫn sẽ thấy dữ liệu cũ, chỉ người dùng từ lượt tiếp theo mới thấy dữ liệu mới.
  * Quản lý bộ nhớ đệm phức tạp: Cần cấu hình thời gian hợp lý cho từng loại trang để tránh tình trạng dữ liệu quá cũ hoặc revalidate quá nhiều gây tải máy chủ.
* **Ứng dụng thực tế trong dự án E-commerce:**
  * Trang Chi tiết sản phẩm (`/products/[id]`): Nơi thông tin sản phẩm, giá cả hay mô tả ít khi thay đổi theo từng giây. Việc đặt `revalidate: 60` (1 phút) giúp trang tải cực nhanh nhưng vẫn đảm bảo giá và thông tin mới luôn được cập nhật.
  * Trang Danh sách sản phẩm nổi bật / Landing page (`/featured`): Nơi nội dung được cập nhật theo định kỳ vài giờ một lần mà vẫn giữ được tốc độ tối đa trong chiến dịch tiếp thị.

#### 2.3.5. Bảng tổng hợp so sánh các chiến lược Rendering

| Tiêu chí | CSR | SSR | SSG | ISR |
| :--- | :--- | :--- | :--- | :--- |
| **Thời điểm Render** | Tại trình duyệt (Client) | Mỗi khi có Request | Lúc biên dịch (Build Time) | Build Time + Cập nhật ngầm |
| **Tốc độ tải đầu** | Chậm (Phụ thuộc JS) | Trung bình (Chờ Server) | Rất nhanh (Gần như ngay lập tức) | Rất nhanh (Lấy từ bộ nhớ đệm) |
| **Khả năng tối ưu SEO** | Hạn chế | Rất tốt | Tối ưu tuyệt đối | Tối ưu tuyệt đối |
| **Tải lên Server/CSDL** | Thấp (Chỉ trả tệp tĩnh) | Cao (Query CSDL liên tục) | Rất thấp (Chỉ query khi build) | Rất thấp (Chỉ query khi revalidate) |
| **Tính thời gian thực** | Cao (Tải dữ liệu qua API) | Tuyệt đối (Thời gian thực) | Thấp (Dữ liệu bị đóng băng) | Cao (Phụ thuộc khoảng revalidate) |
| **Trường hợp sử dụng** | Dashboard, Giỏ hàng | Tìm kiếm, Thanh toán | Điều khoản, Giới thiệu | Chi tiết sản phẩm, Landing Page |

#### 2.3.6. Đánh giá kết luận và định hướng kiến trúc Hybrid Rendering
Trong bối cảnh phát triển ứng dụng thương mại điện tử hiện đại trên nền tảng Next.js (App Router), việc áp dụng đơn lẻ một phương pháp kết xuất duy nhất sẽ không thể giải quyết triệt để bài toán tối ưu toàn diện. Mỗi trang trong hệ thống có mục tiêu kinh doanh và đặc tính dữ liệu hoàn toàn khác nhau:
* **Tối ưu SEO và Tốc độ hiển thị tối đa:** Các trang nội dung cố định hoặc thông tin sản phẩm ít biến động được đảm bảo hiệu năng tối ưu thông qua SSG và ISR. Điều này giúp cải thiện thứ hạng tìm kiếm và giảm thiểu tối đa chi phí vận hành máy chủ.
* **Đảm bảo tính chính xác dữ liệu thời gian thực:** Các tính năng có tần suất biến động dữ liệu liên tục hoặc mang tính cá nhân hoá cao bắt buộc phải sử dụng SSR để tránh rủi ro hiển thị sai lệch thông tin (như tồn kho hay trạng thái đơn hàng).
* **Trải nghiệm ứng dụng mượt mà:** Các khu vực tương tác riêng tư của người dùng được giao cho CSR xử lý nhằm giảm bớt độ trễ chuyển trang và tối ưu trải nghiệm thao tác.

**Kết luận:** Việc triển khai mô hình Hybrid Rendering (Kết xuất hỗn hợp) – linh hoạt phối hợp giữa SSR, SSG, ISR và CSR – chính là giải pháp kiến trúc tối ưu nhất. Mô hình này giúp hệ thống e-commerce vừa đạt được tốc độ truy cập vượt trội, tối ưu hoá công cụ tìm kiếm SEO, vừa đảm bảo tính toàn vẹn dữ liệu và duy trì trải nghiệm người dùng liền mạch với quy mô lớn.

### 2.4. Giới thiệu ngắn gọn về Prisma ORM

#### 2.4.1. Khái niệm và kiến trúc cốt lõi của Prisma
Prisma ORM là một công cụ ánh xạ quan hệ - đối tượng (Object – Relational Mapping) thế hệ mới dành cho Node.js và TypeScript. Khác với các ORM truyền thống dựa trên mô hình Active Record hay Data Mapper (như TypeORM hay Sequelize), Prisma tiếp cận việc truy vấn dữ liệu thông qua việc định nghĩa schema tập trung và tự động tạo ra một truy vấn mã nguồn mở (Query Engine) có kiểu dữ liệu an toàn (Type-safe).

*Hình 2.8: Logo Prisma ORM*

Kiến trúc cốt lõi của Prisma bao gồm 3 thành phần chính đóng vai trò mắt xích trong toàn bộ vòng đời phát triển ứng dụng:
1. **Prisma Schema (`schema.prisma`):** Tệp cấu hình trung tâm định nghĩa mô hình dữ liệu (Models), các mối quan hệ (Relationships), nguồn kết nối cơ sở dữ liệu (Database) và chỉ định công cụ sinh mã (Generator).
2. **Prisma Client:** Bộ thư viện truy vấn dữ liệu tự động sinh (Auto-generated) dựa trên khai báo từ `schema.prisma`. Prisma Client cung cấp các hàm truy vấn có tính gõ kiểu an toàn (Type-safe) 100% dành cho TypeScript, giúp kiểm tra lỗi truy vấn ngay tại thời điểm biên dịch.
3. **Prisma Migrate:** Công cụ quản lý và đồng bộ phiên bản cơ sở dữ liệu. Cho phép chuyển đổi các định nghĩa từ Prisma Schema thành các câu lệnh SQL chính xác mà không làm thất thoát dữ liệu.

*Hình 2.9: Luồng kiến trúc các thành phần trong Prisma ORM*

#### 2.4.2. Lý do chọn Prisma ORM cho hệ thống E-commerce
* **An toàn kiểu dữ liệu tuyệt đối:** Trong thương mại điện tử, dữ liệu liên quan đến cấu trúc sản phẩm, biến thể, đơn hàng và thanh toán vô cùng phức tạp. Prisma Client tự động sinh các kiểu dữ liệu (TypeScript Types) tương ứng với từng Model. Khi thay đổi cấu trúc bảng trong `schema.prisma`, toàn bộ mã nguồn truy vấn sẽ được kiểm tra lỗi ngay tại thời điểm biên dịch, loại bỏ hoàn toàn các rủi ro sai lệch dữ liệu ở thời điểm thực thi.
* **Tích hợp tự nhiên với React Server Components (RSC) và Server Actions:** Trong mô hình Next.js App Router, các truy vấn CSDL có thể thực thi trực tiếp ngay bên trong các Server Components hoặc Server Actions mà không cần khởi tạo tầng REST API trung gian. Prisma Client hoạt động như một cầu nối nhẹ, giúp gọi dữ liệu nhanh chóng từ máy chủ Node.js đến cơ sở dữ liệu PostgreSQL/MySQL với độ trễ thấp nhất.
* **Tối ưu hoá truy vấn quan hệ phức tạp:** Hệ thống E-commerce sở hữu nhiều quan hệ dữ liệu đa dạng (1-N giữa danh mục và sản phẩm, N-N giữa đơn hàng và sản phẩm thông qua bảng trung gian chi tiết đơn hàng). Prisma giúp đơn giản hoá việc truy vấn các bảng nối thông qua cú pháp `include` hoặc `select` rõ ràng, tự động tối ưu các câu lệnh SQL bên dưới để tránh lỗi truy vấn dư thừa (N + 1 query problem).

---

## CHƯƠNG 3. PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG

### 3.1. Phân tích yêu cầu hệ thống

#### 3.1.1. Khảo sát các giải pháp E-commerce tại Việt Nam và Đặt vấn đề
Theo Báo cáo Chỉ số Thương mại điện tử Việt Nam (EBI 2026) do Hiệp hội Thương mại điện tử Việt Nam (VECOM) công bố, thị trường thương mại điện tử trong nước tiếp tục ghi nhận đà tăng trưởng cao, kéo theo sự cạnh tranh gay gắt và yêu cầu ngày càng cao về hạ tầng công nghệ từ phía doanh nghiệp. Để tham gia vào thị trường này, các doanh nghiệp và nhà bán hàng tại Việt Nam hiện nay thường cân nhắc ba nhóm giải pháp kỹ thuật chính:

* **Sàn thương mại Điện tử (Shopee, Lazada, Tiki):**
  * *Ưu điểm:* Tận dụng lượng người dùng sẵn có khổng lồ, hạ tầng vận chuyển và thanh toán đã tích hợp đồng bộ, chi phí khởi tạo ban đầu thấp.
  * *Nhược điểm:* Phụ thuộc chặt chẽ vào chính sách vận hành và mức chiết khấu của sàn, mức độ cạnh tranh về giá cao, giao diện thương hiệu bị đóng khung và không thể sở hữu dữ liệu khách hàng cho chiến lược tiếp thị dài hạn.
* **Nền tảng SaaS dựng sẵn nội địa (Haravan, Sapo):**
  * *Ưu điểm:* Triển khai nhanh chóng, tích hợp sẵn hệ sinh thái vận chuyển và cổng thanh toán nội địa (VNPAY, MoMo).
  * *Nhược điểm:* Đòi hỏi chi phí duy trì định kỳ, khả năng can thiệp sâu vào mã nguồn, tuỳ biến giao diện phức tạp và kiến trúc dữ liệu bị hạn chế bởi khung hệ thống đóng của nhà cung cấp.
* **Giải pháp tự phát triển (Custom Next.js + Prisma):**
  * *Ưu điểm:* Doanh nghiệp làm chủ hoàn toàn mã nguồn và dữ liệu, tự do thiết kế trải nghiệm người dùng (UX/UI), dễ dàng tối ưu hoá chỉ số Core Web Vitals và SEO nhờ khả năng can thiệp trực tiếp vào cơ chế Rendering.
  * *Nhược điểm:* Đòi hỏi mức đầu tư thời gian và năng lực lập trình ban đầu.

**Đặt vấn đề:** Nhằm khắc phục các hạn chế về phụ thuộc dữ liệu và giới hạn tuỳ biến của các giải pháp đóng, đề tài lựa chọn giải pháp Tự phát triển hệ thống web bán hàng (Custom E-commerce Platform) dựa trên Next.js App Router, TypeScript và Prisma ORM. Tiếp thu tư duy kiến trúc hiện đại từ mẫu chuẩn Vercel E-commerce, hệ thống tập trung giải quyết bài toán tối ưu hiệu năng tải trang, nâng cao thứ hạng SEO và đảm bảo tính chủ động về dữ liệu.

#### 3.1.2. Phân tích yêu cầu chức năng
Dựa trên mục tiêu xây dựng nền tảng E-commerce hoàn chỉnh và tối ưu trải nghiệm người dùng, hệ thống phân chia thành hai tác nhân chính (Actor): Khách hàng (Customer) và Quản trị viên (Admin). Các yêu cầu chức năng được chi tiết hoá theo từng phân hệ như sau:

**Phân quyền người dùng:**
* **Khách hàng (Customer/Guest):** Người dùng truy cập vào hệ thống để tham khảo thông tin, tìm kiếm, mua sắm sản phẩm và quản lý thông tin đơn hàng cá nhân.
* **Quản trị viên (Admin):** Người dùng có quyền cao nhất (được xác thực thông qua middleware bảo mật AdminAuthGuard), chịu trách nhiệm quản lý danh mục, sản phẩm, kho hàng và theo dõi đơn hàng toàn hệ thống.

**Phân hệ Khách hàng:**
* **Quản lý Tài khoản và Xác thực:**
  * Cho phép người dùng đăng ký tài khoản mới và đăng nhập vào hệ thống qua Email/Password.
  * Lưu trữ và bảo mật trạng thái đăng nhập qua HTTP Cookie.
  * Trang thông tin cá nhân hỗ trợ xem chi tiết lịch sử các đơn hàng đã đặt và xem trạng thái giao hàng.
* **Khám phá & Tìm kiếm Sản phẩm:**
  * *Trang chủ:* Hiển thị danh sách các sản phẩm nổi bật, banner quảng cáo và danh mục chính.
  * *Danh sách & Lọc sản phẩm:* Hiển thị toàn bộ sản phẩm, hỗ trợ lọc theo danh mục và sắp xếp theo giá hoặc mức độ đánh giá.
  * *Tìm kiếm:* Tìm kiếm tức thì theo từ khoá liên quan đến hoặc mô tả sản phẩm.
  * *Chi tiết sản phẩm:* Xem chi tiết thông tin, bộ sưu tập hình ảnh, mức giá (giá gốc và giá khuyến mãi), tình trạng tồn kho và đánh giá từ người dùng khác.
* **Giỏ hàng & Đặt hàng:**
  * *Quản lý giỏ hàng:* Thêm sản phẩm vào giỏ, điều chỉnh số lượng, xoá sản phẩm khỏi giỏ hàng.
  * *Thanh toán:* Cho phép nhập thông tin giao hàng (Họ tên, Email, Số điện thoại, Địa chỉ, Thành phố).
  * Cho phép lựa chọn phương thức thanh toán linh hoạt: Thẻ tín dụng (credit card), chuyển khoản ngân hàng hoặc tiền mặt khi nhận hàng.
  * Tự động tính toán tổng số tiền, kiểm tra tồn kho thời gian thực và ghi nhận đơn hàng vào hệ thống database.

**Phân hệ Quản trị:**
* **Quản lý Sản phẩm:**
  * Xem danh sách toàn bộ sản phẩm trong hệ thống dưới dạng bảng dữ liệu có hỗ trợ tìm kiếm và phân trang.
  * *Thêm sản phẩm mới:* Nhập đầy đủ thông tin gồm tên sản phẩm, mô tả ngắn gọn, giá bán, giá khuyến mãi, số lượng tồn kho, danh mục, ảnh đại diện. Dữ liệu được xác thực chặt chẽ trước khi lưu.
  * *Chỉnh sửa sản phẩm:* Cập nhật thông tin chi tiết hoặc điều chỉnh số lượng tồn kho của từng sản phẩm.
  * *Xoá sản phẩm:* Xoá sản phẩm khỏi hệ thống và kích hoạt cơ chế revalidate tự động để cập nhật lại giao diện phía khách hàng ngay lập tức.
* **Quản lý Danh mục & Đơn hàng:**
  * Xem danh sách đơn hàng toàn hệ thống, theo dõi trạng thái thanh toán và trạng thái xử lý đơn hàng.

### 3.2. Thiết kế kiến trúc UML và mô hình khái niệm

#### 3.2.1. Sơ đồ Lớp (Class Diagram)

*Hình 3.1: Sơ đồ Lớp (Class Diagram) của hệ thống*

#### 3.2.2. Sơ đồ Use Case tổng quan và bảng đặc tả Use Case

*Hình 3.2: Sơ đồ Use Case tổng quan*

**Bảng đặc tả Use Case 1: “Đặt hàng & Thanh toán” (Khách hàng)**

| Tên Use Case | Use Case “Đặt hàng & Thanh toán” |
| :--- | :--- |
| **Mục đích** | Cho phép khách hàng tiến hành gửi đơn đặt hàng và thanh toán cho các sản phẩm có trong giỏ hàng. |
| **Tác nhân** | Khách hàng (User) |
| **Điều kiện tiên quyết** | Khách hàng đang ở màn hình Giỏ hàng và giỏ hàng có ít nhất 1 sản phẩm. |
| **Luồng sự kiện** | 1. Khách hàng chọn chức năng “Thanh toán”.<br>2. Hệ thống hiển thị biểu mẫu thanh toán tại đường dẫn `/checkout`.<br>3. Khách hàng nhập thông tin giao hàng (Họ tên, Email, Số điện thoại, Địa chỉ, Thành phố) và chọn phương thức thanh toán.<br>4. Khách hàng nhấn “Xác nhận đặt hàng”.<br>5. Client gửi yêu cầu POST `/api/orders` tới Server.<br>6. Server kiểm tra tồn kho, thực thi giao dịch Prisma `$transaction` để tạo đơn hàng, chi tiết đơn hàng và tự động giảm số lượng tồn kho sản phẩm.<br>7. Hệ thống xoá sạch giỏ hàng trong Zustand store và thông báo “Đặt hàng thành công”.<br>8. Hệ thống chuyển hướng người dùng tới trang lịch sử đơn hàng (`/orders`).<br>9. Kết thúc Use Case. |
| **Kết quả** | Đơn hàng được tạo thành công trong cơ sở dữ liệu, số lượng tồn kho sản phẩm được cập nhật chính xác và người dùng theo dõi được đơn hàng của mình. |

**Bảng đặc tả Use Case 2: “Quản lý sản phẩm” (Quản trị viên)**

| Tên Use Case | Use Case “Quản lý sản phẩm” |
| :--- | :--- |
| **Mục đích** | Cho phép quản trị viên điều chỉnh, cập nhật hoặc xoá thông tin sản phẩm trong hệ thống. |
| **Tác nhân** | Quản trị viên (Admin). |
| **Điều kiện tiên quyết** | Quản trị viên đã đăng nhập thành công với vai trò Admin và đang ở màn hình quản lý sản phẩm (`/admin/products`). |
| **Luồng sự kiện** | 1. Quản trị viên chọn chức năng Thêm mới, Chỉnh sửa hoặc Xoá sản phẩm.<br>2. **Trường hợp thêm mới:** Hệ thống hiển thị biểu mẫu tại `/admin/products/new`. Quản trị viên nhập thông tin sản phẩm và nhấn “Lưu sản phẩm”. Client gửi POST `/api/products`.<br>3. **Trường hợp chỉnh sửa:** Hệ thống hiển thị biểu mẫu chi tiết sản phẩm hiện tại ở `/admin/products/[id]/edit`. Quản trị viên nhập các thông tin cần thay đổi và nhấn “Cập nhật”. Client gửi PUT `/api/products/[id]`.<br>4. **Trường hợp xoá:** Quản trị viên nhấn nút xoá tại dòng sản phẩm tương ứng và nhấn xác nhận trên hộp thoại cảnh báo. Client gửi DELETE `/api/products/[id]`.<br>5. Hệ thống thực thi lưu các thay đổi hoặc xoá bản ghi trong cơ sở dữ liệu qua Prisma ORM.<br>6. Hệ thống tự động kích hoạt `revalidatePath()` làm mới cache dữ liệu trên toàn hệ thống.<br>7. Hệ thống thông báo “Thao tác thành công” và cập nhật danh sách hiển thị.<br>8. Kết thúc Use Case. |
| **Kết quả** | Thông tin sản phẩm được cập nhật chính xác trong cơ sở dữ liệu và dữ liệu hiển thị trên các trang bán hàng công khai được đồng bộ tức thì. |

#### 3.2.3. Activity & Sequence Diagram

**Phân hệ xác thực:**
* Sequence Diagram:

*Hình 3.3: Sequence Diagram cho phân hệ Xác thực*

* Activity Diagram:

*Hình 3.4: Activity Diagram cho phân hệ Xác thực*

**Phân hệ giỏ hàng & Đặt hàng:**
* Sequence Diagram:

*Hình 3.5: Sequence Diagram cho phân hệ Giỏ hàng & Đặt hàng*

* Activity Diagram:

*Hình 3.6: Activity Diagram cho phân hệ Giỏ hàng & Đặt hàng*

**Phân hệ quản trị sản phẩm:**
* Sequence Diagram:

*Hình 3.7: Sequence Diagram cho phân hệ Quản trị sản phẩm*

* Activity Diagram:

*Hình 3.8: Activity Diagram cho phân hệ Quản trị sản phẩm*

### 3.3. Thiết kế Cơ sở dữ liệu

#### 3.3.1. Sơ đồ thực thể mối quan hệ (ERD Diagram)

*Hình 3.9: Sơ đồ thực thể mối quan hệ (ERD Diagram)*

---

## CHƯƠNG 4. CÀI ĐẶT VÀ TRIỂN KHAI ỨNG DỤNG

### 4.1. Giao diện trang chủ hệ thống (Home Page)
Giao diện hiển thị banner quảng cáo, các sản phẩm nổi bật và danh mục sản phẩm chính giúp khách hàng điều hướng nhanh chóng.

### 4.2. Giao diện trang đăng nhập và xác thực (Authentication)
Màn hình cho phép người dùng/admin đăng nhập vào hệ thống bằng Email và Mật khẩu, thiết lập Cookie phiên làm việc.

### 4.3. Giao diện trang tìm kiếm và lọc sản phẩm
Trang tìm kiếm kết hợp các tiêu chí lọc theo danh mục, mức giá và từ khoá thời gian thực.

### 4.4. Giao diện trang chi tiết sản phẩm
Hiển thị đầy đủ thông tin chi tiết sản phẩm, hình ảnh, mức giá, tình trạng tồn kho, đánh giá và nút "Thêm vào giỏ hàng".

### 4.5. Giao diện trang giỏ hàng tương tác (Cart)
Giao diện quản lý giỏ hàng sử dụng Client-Side Rendering cho phép thay đổi số lượng, xoá sản phẩm và xem tổng chi phí tức thì.

### 4.6. Giao diện thanh toán & đặt hàng (Checkout)
Biểu mẫu nhập thông tin giao hàng, chọn phương thức thanh toán và gửi đơn đặt hàng lên hệ thống.

### 4.7. Giao diện quản lý đơn hàng cá nhân (Orders)
Cho phép khách hàng theo dõi danh sách các đơn hàng đã đặt kèm trạng thái xử lý/giao hàng.

### 4.8. Giao diện trang cá nhân Khách hàng / Admin
* **Trang cá nhân khách hàng:** Quản lý thông tin tài khoản và xem lịch sử giao dịch.
* **Trang cá nhân Admin:** Tổng quan các thông tin điều hành.

### 4.9. Giao diện trang dashboard quản trị sản phẩm
Bảng thống kê và danh sách sản phẩm dành cho admin với các tính năng lọc, sửa, xoá sản phẩm.

### 4.10. Giao diện trang thêm/chỉnh sửa sản phẩm
Biểu mẫu nhập liệu chi tiết thông tin sản phẩm mới hoặc cập nhật sản phẩm đã có.

---

## CHƯƠNG 5. KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN

### 5.1. Kết luận
Sau quá trình khảo sát, phân tích, thiết kế xây dựng hệ thống, đề tài **“Xây dựng Website bán hàng với Next.js App Router + TypeScript”** đã hoàn thành các chức năng cơ bản đáp ứng nhu cầu mua sắm và quản lý bán hàng thương mại điện tử.

Hệ thống hỗ trợ các chức năng như:
* **Phân hệ Khách hàng (User/Guest):**
  * Xem trang chủ và danh mục sản phẩm.
  * Tìm kiếm và lọc sản phẩm theo từ khoá, danh mục.
  * Xem thông tin chi tiết sản phẩm.
  * Quản lý giỏ hàng tương tác (thêm, sửa số lượng, xoá sản phẩm).
  * Đặt hàng và điền thông tin thanh toán.
  * Xem lịch sử đơn hàng cá nhân.
* **Phân hệ Quản trị (Admin):**
  * Đăng nhập xác thực tài khoản quản trị.
  * Quản lý danh sách sản phẩm (Thêm mới, chỉnh sửa, xoá sản phẩm).

**Ưu điểm của hệ thống:**
* **Giao diện trực quan, dễ thao tác:** Giao diện hiện đại, rõ ràng, giúp người dùng dễ dàng tìm kiếm và mua sắm.
* **Tốc độ tải trang nhanh:** Nhờ áp dụng cơ chế render tĩnh (SSG/ISR) của Next.js, các trang như Trang chủ và Chi tiết sản phẩm tải mượt mà.
* **Quản lý dữ liệu nhất quán:** Sử dụng TypeScript kết hợp Prisma ORM giúp kiểm soát kiểu dữ liệu chặt chẽ từ CSDL đến giao diện, hạn chế lỗi phát sinh trong quá trình chạy.

**Nhược điểm của hệ thống:**
* **Xác thực và phân quyền còn đơn giản:** Chức năng đăng nhập Admin đang xử lý qua cookie và state phía client để phục vụ thử nghiệm, chưa áp dụng cơ chế mã hoá mật khẩu và Token bảo mật chuyên sâu.
* **Chưa hỗ trợ phân trang:** Danh sách sản phẩm hiển thị tất cả trên một trang, nếu số lượng sản phẩm lớn sẽ làm kéo dài trang web.
* **Trang admin chưa có thống kê:** Mới dừng lại ở việc quản lý sản phẩm, chưa có biểu đồ báo cáo doanh thu hay số lượng đơn hàng.

### 5.2. Hướng phát triển
Để hoàn thiện hệ thống hơn trong tương lai, bài toán có thể phát triển thêm các hướng sau:
* **Tích hợp thanh toán online đơn giản:** Kết nối cổng thanh toán qua mã QR (Momo, VNPAY,...) để khách hàng có thể quét mã thanh toán trực tiếp.
* **Nâng cấp hệ thống đăng nhập:** Áp dụng mã hoá mật khẩu (bcrypt) và mã hoá token (JWT/NextAuth) để bảo mật tài khoản người dùng và admin tốt hơn.
* **Thêm chức năng phân trang & lọc nâng cao:** Chia nhỏ danh sách sản phẩm theo từng trang và bổ sung lọc theo khoảng giá, đánh giá.
* **Thêm biểu đồ thống kê cho Admin:** Tích hợp thư viện biểu đồ đơn giản (như Chart.js, Recharts) để trực quan hoá số lượng đơn hàng và tổng doanh thu.
* **Tối ưu giao diện:** Cải thiện trải nghiệm người dùng (UX/UI) mượt mà hơn trên các thiết bị di động.

---

## TÀI LIỆU THAM KHẢO

1. Hostinger Tutorials. *Website Load Time Statistics*. Truy cập từ: [https://www.hostinger.com/tutorials/website-load-time-statistics](https://www.hostinger.com/tutorials/website-load-time-statistics)
2. Next.js Documentation. *Next.js Documentation & App Router Guide*. Truy cập từ: [https://nextjs.org/docs](https://nextjs.org/docs)
3. Next.js Documentation. *Configuring TypeScript in Next.js*. Truy cập từ: [https://nextjs.org/docs/app/api-reference/config/typescript](https://nextjs.org/docs/app/api-reference/config/typescript)
4. React Documentation. *React Server Components*. Truy cập từ: [https://react.dev/reference/rsc/server-components](https://react.dev/reference/rsc/server-components)
5. Prisma Documentation. *Prisma ORM Documentation*. Truy cập từ: [https://www.prisma.io/docs](https://www.prisma.io/docs)
6. Tran Thuy Vy (200Lab). *CSR là gì? Quy trình hoạt động của Client-Side Rendering*. Truy cập từ: [https://200lab.io/blog/csr-la-gi](https://200lab.io/blog/csr-la-gi)
7. Tran Thuy Vy (200Lab). *Prisma là gì? Hướng dẫn ORM cho Node.js*. Truy cập từ: [https://200lab.io/blog/prisma-la-gi](https://200lab.io/blog/prisma-la-gi)
8. InRhythm (LinkedIn). *Enhancing Web Performance: Comprehensive Guide to Server-Side Rendering*.
9. Hiệp hội Thương mại điện tử Việt Nam (VECOM). *Báo cáo Chỉ số Thương mại điện tử Việt Nam (EBI 2026)*. Truy cập từ: [https://vecom.vn/bao-cao-chi-so-thuong-mai-dien-tu-viet-nam-2026](https://vecom.vn/bao-cao-chi-so-thuong-mai-dien-tu-viet-nam-2026)
10. Công cụ hỗ trợ: ChatGPT, Claude,...

---

## PHỤ LỤC – HƯỚNG DẪN DEMO CHẠY ỨNG DỤNG

> Phần này mô tả chi tiết từng bước vận hành thực tế của hệ thống khi demo trực tiếp, bao gồm hai vai trò chính: **Người dùng (Customer)** và **Quản trị viên (Admin)**. Đồng thời giải thích lý do kỹ thuật đằng sau mỗi màn hình.

**Điều kiện trước khi chạy demo:**
* Ứng dụng đang chạy tại địa chỉ `http://localhost:3000` (lệnh `npm run dev` đã được thực thi).
* Cơ sở dữ liệu SQLite (`prisma/dev.db`) đã được khởi tạo và có sẵn dữ liệu mẫu từ `seed.ts`.

---

### A. DEMO VAI TRÒ NGƯỜI DÙNG (CUSTOMER)

#### Bước A1: Truy cập Trang Chủ – `http://localhost:3000/`

**Thao tác:** Mở trình duyệt, gõ địa chỉ `http://localhost:3000` và nhấn Enter.

**Màn hình hiển thị:**
* Banner hero toàn màn hình với nút "Khám phá ngay" và "Admin Dashboard".
* Danh sách sản phẩm nổi bật (tối đa 8 sản phẩm có `isFeatured = true`).
* Các danh mục sản phẩm kèm số lượng.

**Giải thích kỹ thuật – Tại sao trang load nhanh như vậy?**

Trang chủ sử dụng chiến lược **ISR (Incremental Static Regeneration)**. Khi dự án được build, Next.js đã truy vấn CSDL một lần để lấy danh sách sản phẩm nổi bật và render thành file HTML tĩnh sẵn. Khi người dùng truy cập, server chỉ cần trả về file HTML có sẵn đó mà **không phải truy vấn database thêm lần nào nữa**, nên tốc độ gần như tức thì. Sau mỗi chu kỳ `revalidate`, Next.js sẽ tự động cập nhật ngầm file HTML trong nền mà không làm gián đoạn người dùng.

---

#### Bước A2: Đăng Ký Tài Khoản – `http://localhost:3000/register`

**Thao tác:**
1. Nhấn vào nút "Đăng ký" trên thanh điều hướng hoặc banner.
2. Điền đầy đủ thông tin: **Tên**, **Email**, **Mật khẩu** vào form.
3. Nhấn nút "Đăng ký".

**Màn hình hiển thị:**
* Thông báo đăng ký thành công.
* Hệ thống tự động chuyển hướng về trang chủ và cập nhật trạng thái đã đăng nhập trên Header.

**Giải thích kỹ thuật – Dữ liệu đi đâu khi nhấn Đăng ký?**

Khi form được submit, trình duyệt gửi một yêu cầu **POST** đến API Route `/api/auth/register`. Tại đây, Next.js (chạy trên server Node.js) xác thực dữ liệu đầu vào, sau đó gọi `db.user.create(...)` thông qua **Prisma Client**. Prisma dịch lệnh này thành câu SQL `INSERT INTO User (...)` và thực thi trực tiếp trên file cơ sở dữ liệu `prisma/dev.db`. Sau khi ghi thành công, server trả về cookie phiên làm việc (session cookie) và thông tin tài khoản về cho trình duyệt. Từ đó, Header tự động hiển thị tên người dùng đã đăng nhập.

---

#### Bước A3: Duyệt và Tìm Kiếm Sản Phẩm – `http://localhost:3000/products`

**Thao tác:**
1. Nhấn nút "Khám phá ngay" từ trang chủ hoặc vào thẳng đường dẫn `/products`.
2. Sử dụng thanh tìm kiếm để tìm sản phẩm theo tên (ví dụ: gõ "laptop").
3. Chọn một danh mục từ bộ lọc để xem sản phẩm theo nhóm.

**Màn hình hiển thị:**
* Grid sản phẩm hiển thị đầy đủ ảnh, tên, giá, danh mục.
* Kết quả tự động lọc lại khi thay đổi từ khoá hoặc danh mục.

**Giải thích kỹ thuật – Tại sao kết quả tìm kiếm cập nhật ngay lập tức?**

Thanh tìm kiếm là một **Client Component** (có khai báo `"use client"` ở đầu file). Khi người dùng gõ, trình duyệt dùng React Hook `useState` để lưu từ khoá và tự lọc danh sách sản phẩm **trực tiếp trên trình duyệt** mà không cần gửi request lên server. Đây chính là ưu điểm của **CSR** trong trường hợp này: dữ liệu sản phẩm đã được tải về một lần, mọi thao tác lọc/tìm kiếm sau đó đều xảy ra tức thì.

---

#### Bước A4: Xem Chi Tiết Sản Phẩm và Thêm Vào Giỏ Hàng

**Thao tác:**
1. Nhấn vào một sản phẩm bất kỳ trong danh sách.
2. Trang chi tiết mở ra tại đường dẫn `/product/[handle]` (ví dụ: `/product/laptop-gaming-asus`).
3. Chọn số lượng và nhấn nút **"Thêm vào giỏ hàng"**.

**Màn hình hiển thị:**
* Thông tin đầy đủ: ảnh lớn, mô tả, giá gốc và giá khuyến mãi (nếu có), tồn kho.
* Thông báo nhỏ "Đã thêm vào giỏ" xuất hiện sau khi nhấn.
* Số lượng trên icon giỏ hàng ở Header tăng lên.

**Giải thích kỹ thuật – Giỏ hàng hoạt động như thế nào?**

Trang chi tiết sản phẩm sử dụng **ISR**: dữ liệu sản phẩm đã được render sẵn thành HTML tĩnh từ lúc build, bot SEO có thể đọc được ngay. Riêng nút "Thêm vào giỏ hàng" là một **Client Component** độc lập. Khi nhấn, nó gọi hàm từ **Zustand store** (thư viện quản lý trạng thái phía client) để thêm sản phẩm vào giỏ và lưu vào `localStorage` của trình duyệt. Dữ liệu giỏ hàng **không lưu trên database** ở giai đoạn này – nó chỉ tồn tại trên máy của người dùng cho đến khi họ xác nhận đặt hàng.

---

#### Bước A5: Thanh Toán và Đặt Hàng – `http://localhost:3000/checkout`

**Thao tác:**
1. Truy cập trang giỏ hàng `/cart`, kiểm tra danh sách sản phẩm và tổng tiền.
2. Nhấn nút **"Tiến hành thanh toán"**.
3. Điền đầy đủ thông tin giao hàng: Họ tên, Email, Số điện thoại, Địa chỉ, Thành phố.
4. Chọn phương thức thanh toán (COD / Thẻ tín dụng / Chuyển khoản).
5. Nhấn nút **"Xác nhận đặt hàng"**.

**Màn hình hiển thị:**
* Thông báo "Đặt hàng thành công!" xuất hiện.
* Giỏ hàng được xóa trắng.
* Hệ thống chuyển hướng tự động về trang `/orders` để xem lịch sử đơn hàng.

**Giải thích kỹ thuật – Đơn hàng được lưu vào CSDL như thế nào?**

Khi nhấn "Xác nhận đặt hàng", trình duyệt gửi một yêu cầu **POST** đến API Route `/api/orders` kèm toàn bộ thông tin giỏ hàng và thông tin giao hàng. Trên server, Next.js thực hiện các bước sau thông qua **Prisma `$transaction`** (giao dịch nguyên tử):

1. **Kiểm tra tồn kho:** Truy vấn `db.product.findUnique(...)` để xác minh số lượng tồn kho của từng sản phẩm vẫn đủ.
2. **Tạo bản ghi đơn hàng:** `db.order.create(...)` – ghi vào bảng `Order` trong CSDL với các trường thông tin giao hàng, phương thức thanh toán, trạng thái ban đầu `"pending"`.
3. **Tạo chi tiết đơn hàng:** `db.orderItem.createMany(...)` – ghi từng sản phẩm vào bảng `OrderItem` với số lượng và giá tại thời điểm đặt hàng.
4. **Giảm tồn kho:** `db.product.update({ stock: { decrement: quantity } })` – tự động trừ đi số lượng tồn kho tương ứng.

Toàn bộ 4 bước trên được bọc trong một `$transaction`, nghĩa là **nếu bất kỳ bước nào thất bại, toàn bộ giao dịch sẽ bị huỷ**, đảm bảo dữ liệu luôn nhất quán (không xảy ra tình huống tiền đã trừ nhưng đơn hàng chưa tạo). Sau khi thành công, server trả về mã đơn hàng và trình duyệt xóa sạch giỏ hàng trong Zustand store.

---

#### Bước A6: Xem Lịch Sử Đơn Hàng – `http://localhost:3000/orders`

**Thao tác:** Sau khi đặt hàng thành công, hệ thống tự chuyển đến trang `/orders`. Hoặc người dùng có thể vào trang Profile → Lịch sử đơn hàng.

**Màn hình hiển thị:**
* Danh sách các đơn đã đặt: Mã đơn, ngày đặt, tổng tiền, trạng thái.
* Trạng thái có thể là: `pending` (chờ xử lý), `processing`, `shipped`, `delivered`, `cancelled`.

**Giải thích kỹ thuật:**

Trang này sử dụng **SSR (Server-Side Rendering)**. Mỗi lần người dùng mở trang, server đọc cookie phiên làm việc để xác định danh tính, sau đó truy vấn `db.order.findMany({ where: { userId: ... } })` để lấy **đúng đơn hàng của người dùng đó**, render thành HTML hoàn chỉnh rồi trả về. Nhờ SSR, dữ liệu luôn là mới nhất mà không cần người dùng phải tự refresh trang.

---

### B. DEMO VAI TRÒ QUẢN TRỊ VIÊN (ADMIN)

#### Bước B1: Đăng Nhập Admin – `http://localhost:3000/login`

**Thao tác:**
1. Truy cập `http://localhost:3000/login`.
2. Nhập thông tin tài khoản quản trị (được tạo sẵn trong `seed.ts`):
   * **Email:** `admin@shop.com`
   * **Mật khẩu:** `admin123`
3. Nhấn nút **"Đăng nhập"**.

**Màn hình hiển thị:**
* Hệ thống xác thực thành công, chuyển về trang chủ.
* Header hiển thị tên Admin và nút "Admin Dashboard" xuất hiện.

**Giải thích kỹ thuật – Làm thế nào hệ thống biết đây là Admin?**

Khi đăng nhập, server đọc trường `role` trong bảng `User` của CSDL. Nếu `role = "admin"`, server tạo session cookie có đính kèm thông tin quyền Admin. Middleware `AdminAuthGuard` được cấu hình trong Next.js sẽ kiểm tra cookie này trước mỗi request đến các route `/admin/*`. Nếu cookie không tồn tại hoặc không có quyền Admin, middleware sẽ **từ chối truy cập và redirect về trang đăng nhập**.

---

#### Bước B2: Truy Cập Trang Quản Lý Sản Phẩm – `http://localhost:3000/admin/products`

**Thao tác:** Nhấn vào nút "Admin Dashboard" trên Banner hoặc Header.

**Màn hình hiển thị:**
* Bảng thống kê KPI gồm: Tổng doanh thu, Tổng đơn hàng, Sản phẩm đã bán, Tồn kho thấp (≤5).
* Bảng danh sách toàn bộ sản phẩm: Ảnh, Tên, Slug, Danh mục, Giá bán, Tồn kho, Đã bán, Nổi bật.
* Nút **"Thêm sản phẩm mới"** ở góc phải trên.
* Nút **Sửa** (biểu tượng bút) và **Xóa** (biểu tượng thùng rác) cho từng sản phẩm.

**Giải thích kỹ thuật – Tại sao số liệu luôn luôn chính xác?**

Trang này được cấu hình `export const dynamic = 'force-dynamic'` và `export const revalidate = 0`, nghĩa là Next.js **bắt buộc dùng SSR** cho trang này – mỗi lần Admin mở trang, server chạy lại toàn bộ logic, truy vấn CSDL bằng `db.product.findMany(...)` kết hợp `db.order.findMany(...)` để tổng hợp số liệu doanh thu và lượng đã bán theo thời gian thực. Điều này đảm bảo Admin luôn thấy dữ liệu chính xác nhất mà không bị phục vụ từ cache cũ.

---

#### Bước B3: Thêm Sản Phẩm Mới – `http://localhost:3000/admin/products/new`

**Thao tác:**
1. Nhấn nút **"Thêm sản phẩm mới"** (màu xanh indigo, góc phải trên).
2. Điền đầy đủ thông tin vào form:
   * **Tên sản phẩm** (ví dụ: "Bàn phím cơ AKKO 3087")
   * **Mô tả ngắn**
   * **Giá bán** (ví dụ: 1500000)
   * **Giá khuyến mãi** (tuỳ chọn)
   * **Số lượng tồn kho** (ví dụ: 50)
   * **Danh mục** (chọn từ dropdown)
   * **URL ảnh đại diện** (Thumbnail)
   * **Đánh dấu Nổi bật** (checkbox `isFeatured`)
3. Nhấn nút **"Lưu sản phẩm"**.

**Màn hình hiển thị:**
* Thông báo "Tạo sản phẩm thành công!".
* Hệ thống tự động chuyển về trang danh sách, sản phẩm mới xuất hiện ở đầu bảng.

---

#### Bước B4: Giải Thích Chi Tiết – Sản Phẩm Mới Được Lưu Vào CSDL Như Thế Nào?

Đây là luồng dữ liệu hoàn chỉnh khi Admin nhấn "Lưu sản phẩm":

**Bước 1 – Trình duyệt gửi yêu cầu:**
Form thu thập toàn bộ dữ liệu người dùng vừa nhập. Trình duyệt gửi một yêu cầu `POST` đến API Route `/api/products` với body JSON chứa toàn bộ thông tin sản phẩm.

**Bước 2 – Server xác thực dữ liệu:**
Tại file `app/api/products/route.ts`, Next.js nhận request và gọi `CreateProductSchema.parse(body)`. Thư viện Zod kiểm tra từng trường: tên không được rỗng, giá phải là số dương, tồn kho không âm,... Nếu có lỗi, server trả về HTTP `400 Bad Request` ngay lập tức mà **không chạm đến database**.

**Bước 3 – Prisma ghi vào SQLite:**
Nếu dữ liệu hợp lệ, server gọi lệnh:
```typescript
await db.product.create({
  data: {
    name: "Bàn phím cơ AKKO 3087",
    slug: "ban-phim-co-akko-3087",  // tự sinh từ tên
    price: 1500000,
    stock: 50,
    images: JSON.stringify(["https://..."]),  // mảng ảnh serialize thành JSON string
    categoryId: "...",
    isFeatured: false,
    // ... các trường còn lại
  },
  include: { category: true }
});
```
Prisma dịch lệnh JavaScript trên thành câu SQL tương đương:
```sql
INSERT INTO "Product" (id, name, slug, price, stock, images, categoryId, isFeatured, createdAt, updatedAt)
VALUES ('cuid_tu_dong_sinh', 'Bàn phím cơ AKKO 3087', 'ban-phim-co-akko-3087', 1500000, 50, '["https://..."]', '...', 0, datetime('now'), datetime('now'));
```
Câu SQL này được thực thi trực tiếp trên file `prisma/dev.db` (cơ sở dữ liệu SQLite).

**Bước 4 – Kích hoạt revalidate để cập nhật giao diện:**
Ngay sau khi ghi thành công, server gọi `revalidatePath('/')`, `revalidatePath('/products')`, và `revalidatePath('/products/ban-phim-co-akko-3087')`. Đây là cơ chế **On-Demand ISR** của Next.js: nó đánh dấu các trang tĩnh đã cached là "lỗi thời" (stale). Lần tiếp theo người dùng truy cập các trang này, Next.js sẽ render lại từ dữ liệu mới nhất trong CSDL và cache lại bản HTML mới. Nhờ đó, sản phẩm vừa thêm **xuất hiện ngay trên trang chủ và trang sản phẩm mà không cần deploy lại ứng dụng**.

**Bước 5 – Server trả về kết quả:**
Server trả về HTTP `201 Created` cùng thông tin sản phẩm vừa tạo (bao gồm cả `id`, `slug` được sinh tự động). Trình duyệt nhận phản hồi, hiển thị thông báo thành công và chuyển hướng Admin về trang danh sách.

---

#### Bước B5: Sửa Sản Phẩm

**Thao tác:**
1. Tại bảng danh sách, nhấn biểu tượng **bút chỉnh sửa** tương ứng với sản phẩm cần sửa.
2. Trang form mở ra tại `/admin/products/[id]/edit`, các trường đã được điền sẵn dữ liệu hiện tại.
3. Thay đổi thông tin (ví dụ: cập nhật giá, tăng tồn kho).
4. Nhấn **"Cập nhật sản phẩm"**.

**Giải thích kỹ thuật:** Tương tự bước thêm mới, nhưng lần này trình duyệt gửi yêu cầu `PUT` đến `/api/products/[id]`. Prisma thực thi `db.product.update({ where: { id }, data: {...} })`, tương đương câu SQL `UPDATE "Product" SET ... WHERE id = '...'`. Sau đó `revalidatePath` được gọi để cập nhật cache.

---

#### Bước B6: Xóa Sản Phẩm

**Thao tác:**
1. Nhấn biểu tượng **thùng rác** tương ứng với sản phẩm cần xóa.
2. Hộp thoại xác nhận xuất hiện: "Bạn có chắc chắn muốn xóa sản phẩm X không?".
3. Nhấn **"Xác nhận xóa"**.

**Giải thích kỹ thuật:** Trình duyệt gửi yêu cầu `DELETE` đến `/api/products/[id]`. Prisma thực thi `db.product.delete({ where: { id } })`. Vì schema định nghĩa `onDelete: Cascade` trên quan hệ với `OrderItem`, tất cả chi tiết đơn hàng liên quan cũng được xóa theo để đảm bảo tính toàn vẹn dữ liệu. Cuối cùng `revalidatePath` cập nhật lại cache toàn hệ thống.

---

### C. TỔNG KẾT LUỒNG DỮ LIỆU TOÀN HỆ THỐNG

| Hành động | Route | Chiến lược Rendering | Cơ chế CSDL |
| :--- | :--- | :--- | :--- |
| Xem trang chủ | `/` | ISR (revalidate theo chu kỳ) | Đọc từ HTML cache, query DB khi revalidate |
| Xem danh sách sản phẩm | `/products` | ISR | Đọc từ HTML cache |
| Xem chi tiết sản phẩm | `/product/[handle]` | ISR | Đọc từ HTML cache |
| Tìm kiếm & Lọc | `/products` (filter) | CSR | Lọc dữ liệu trên trình duyệt |
| Thêm vào giỏ hàng | – | CSR (Zustand store) | Lưu vào `localStorage`, không chạm DB |
| Đặt hàng & Thanh toán | `POST /api/orders` | SSR (API Route) | INSERT Order + OrderItems, UPDATE stock |
| Xem lịch sử đơn hàng | `/orders` | SSR | SELECT từ bảng Order theo userId |
| Admin xem dashboard | `/admin/products` | SSR (force-dynamic) | SELECT tất cả sản phẩm + đơn hàng |
| Admin thêm sản phẩm | `POST /api/products` | SSR (API Route) | INSERT vào bảng Product |
| Admin sửa sản phẩm | `PUT /api/products/[id]` | SSR (API Route) | UPDATE bảng Product |
| Admin xóa sản phẩm | `DELETE /api/products/[id]` | SSR (API Route) | DELETE từ bảng Product (cascade) |

---

## PHỤ LỤC B – KỊCH BẢN THUYẾT TRÌNH BÁO CÁO & BỘ CÂU HỎI VẤN ĐÁP (CHEATSHEET BẢO VỆ)

> **Mục đích:** Giúp bạn nắm chắc mạch trình bày từ đầu đến cuối chỉ trong 5–7 phút, không bị ngợp, nói trôi chảy, đúng trọng tâm kỹ thuật và sẵn sàng trả lời các câu hỏi thầy cô thường hỏi nhất.

---

### 1. KỊCH BẢN NÓI MẪU (Nói theo 5 bước – khoảng 5 phút)

#### 🎙️ Bước 1: Chào hỏi & Giới thiệu đề tài (30 giây)
> *"Kính thưa Thầy/Cô và các bạn, em tên là **Bùi Nguyễn Nhật Huy**, sinh viên lớp K47 ngành Công nghệ Phần mềm. Hôm nay em xin phép được báo cáo đề tài niên luận: **'Xây dựng Website bán hàng với Next.js App Router và TypeScript'** do Thầy Lê Hữu Bình hướng dẫn."*

---

#### 🎙️ Bước 2: Nêu lý do chọn đề tài & Điểm cốt lõi kỹ thuật (1 phút)
> *"Lý do em chọn đề tài này là vì các trang web bán hàng hiện nay gặp 2 vấn đề lớn: Một là nếu dùng React thuần (CSR) thì tải lần đầu chậm và bot Google khó đọc được nội dung để làm SEO. Hai là dữ liệu thương mại điện tử rất phức tạp, dễ sinh lỗi sai lệch giá hay tồn kho.*
> 
> *Để giải quyết, em áp dụng 3 giải pháp công nghệ chính:*
> 1. **Next.js App Router:** Kết hợp **Server Components** và **Client Components** để giảm dung lượng JavaScript gửi về trình duyệt.
> 2. **Mô hình Hybrid Rendering:** Linh hoạt dùng **SSG/ISR** cho trang sản phẩm để tải nhanh và tối ưu SEO; dùng **SSR** cho trang bảo mật; và **CSR** cho giỏ hàng tương tác thời gian thực.
> 3. **TypeScript + Prisma ORM:** Đảm bảo tính an toàn dữ liệu (Type-safety) đồng bộ 100% từ Database lên tới giao diện Frontend."*

---

#### 🎙️ Bước 3: Trình chiếu Demo phân hệ Người dùng (1.5 phút)
*(Vừa thao tác chuột trên màn hình vừa nói)*
> *"Em xin phép demo luồng của **Khách hàng (Customer)**:*
> - *Đầu tiên là **Trang chủ**: Tải tức thì vì được tạo sẵn qua **ISR**. Bot tìm kiếm vào là đọc được ngay toàn bộ thẻ tiêu đề và giá sản phẩm.*
> - *Tiếp theo, em vào **Danh sách sản phẩm**, thanh tìm kiếm và lọc danh mục chạy rất mượt nhờ **Client Component**, lọc ngay tại trình duyệt mà không cần load lại cả trang.*
> - *Em bấm vào chi tiết một sản phẩm, bấm **'Thêm vào giỏ hàng'**. Trạng thái giỏ hàng được quản lý qua **Zustand store** lưu tạm ở `localStorage` trên máy người dùng, chưa cần lưu vào CSDL để tránh làm nặng server.*
> - *Khi vào **Thanh toán (Checkout)** và bấm **'Xác nhận đặt hàng'**, server sẽ nhận dữ liệu và chạy một **Prisma $transaction**: vừa tạo bản ghi Đơn hàng, tạo Chi tiết đơn hàng, vừa tự động trừ số lượng tồn kho. Nếu có lỗi xảy ra thì hệ thống sẽ rollback ngay để tránh mất mát dữ liệu.*
> - *Sau khi đặt xong, trang **Đơn hàng của tôi** dùng **SSR** lấy đúng các đơn của tài khoản hiện tại ra hiển thị."*

---

#### 🎙️ Bước 4: Trình chiếu Demo phân hệ Quản trị (Admin) (1.5 phút)
*(Vừa thao tác chuột trên màn hình vừa nói)*
> *"Tiếp theo là luồng của **Quản trị viên (Admin)**:*
> - *Em đăng nhập bằng tài khoản `admin@shop.com`. Hệ thống kiểm tra quyền `role = admin` qua Cookie và bảo vệ các trang quản trị bằng **Middleware**.*
> - *Ở trang **Dashboard quản trị (`/admin/products`)**, hệ thống dùng cơ chế **SSR (force-dynamic)** để mỗi lần Admin mở ra là tính toán lại ngay tổng doanh thu, số đơn hàng và cảnh báo hàng tồn kho thấp.*
> - *Khi em bấm **'Thêm sản phẩm mới'**, điền thông tin và bấm **'Lưu sản phẩm'**: Server sẽ kiểm tra dữ liệu qua **Zod validation**, sau đó Prisma thực thi lệnh `INSERT` vào SQLite. Đặc biệt, hệ thống gọi hàm `revalidatePath()` để làm mới cache ngầm. Do đó, sản phẩm mới sẽ hiển thị ngay lập tức ngoài trang chủ và trang danh mục của khách hàng mà không cần phải build hay deploy lại web."*

---

#### 🎙️ Bước 5: Kết luận & Lời cảm ơn (30 giây)
> *"Tóm lại, hệ thống đã hoàn thiện đầy đủ các chức năng mua sắm và quản lý bán hàng, đảm bảo tốc độ cao, chuẩn SEO và kiểm soát kiểu dữ liệu an toàn. Trong tương lai, em định hướng tích hợp thêm cổng thanh toán online (VNPAY/MoMo) và biểu đồ thống kê nâng cao.*
> 
> *Em xin chân thành cảm ơn Thầy/Cô đã lắng nghe. Em rất mong nhận được những góp ý và câu hỏi từ Thầy/Cô để hoàn thiện đề tài hơn nữa ạ!"*

---

### 2. BỘ CÂU HỎI VẤN ĐÁP THƯỜNG GẶP (VÀ CÁCH TRẢ LỜI NGẮN GỌN, CHUẨN XÁC)

#### ❓ Câu 1: Em phân biệt Server Component và Client Component như thế nào? Trong bài em dùng chúng ở đâu?
* **Trả lời:**
  * **Server Component (mặc định trong Next.js):** Chạy trên Server, có thể query trực tiếp Database qua Prisma, không gửi mã JavaScript xuống trình duyệt nên trang tải rất nhẹ và bảo mật. *Em dùng cho Trang chủ, Trang danh sách sản phẩm, Trang chi tiết sản phẩm và Layout chung.*
  * **Client Component (có `"use client"`):** Chạy trên trình duyệt, dùng được các React Hooks (`useState`, `useEffect`) và bắt sự kiện người dùng (click, gõ phím). *Em dùng cho nút 'Thêm vào giỏ', Form nhập liệu, Thanh tìm kiếm trực tiếp.*

---

#### ❓ Câu 2: ISR là gì và nó giúp ích gì cho website bán hàng của em?
* **Trả lời:**
  * **ISR (Incremental Static Regeneration)** là cơ chế cho phép tạo trang tĩnh (HTML) sẵn từ lúc build, nhưng vẫn có thể **cập nhật lại ngầm định kỳ hoặc theo yêu cầu** (`revalidate`) mà không cần build lại toàn bộ dự án.
  * Giúp trang sản phẩm vừa mở ra là thấy ngay (tốc độ SSG cực nhanh), bot Google đọc tốt để làm SEO, mà khi admin đổi giá hay thêm sản phẩm mới thì trang tĩnh vẫn tự cập nhật được dữ liệu mới.

---

#### ❓ Câu 3: Tại sao em dùng Prisma ORM mà không viết câu lệnh SQL thuần?
* **Trả lời:**
  * Prisma cung cấp tính năng **Type-safety 100%** với TypeScript. Khi em sửa cấu trúc bảng trong `schema.prisma`, Prisma tự sinh ra code gợi ý và báo lỗi ngay nếu code sai tên cột hoặc sai kiểu dữ liệu lúc biên dịch.
  * Prisma hỗ trợ quan hệ bảng (Relations) rất trực quan, tự động tối ưu truy vấn tránh lỗi N+1 query, và có tính năng `$transaction` giúp xử lý đặt hàng an toàn nguyên tử.

---

#### ❓ Câu 4: Khi Admin thêm 1 sản phẩm mới thì dữ liệu được lưu và hiển thị ra sao?
* **Trả lời (Nói theo 3 ý):**
  1. **Kiểm tra:** Client gửi `POST /api/products` → Server dùng Zod kiểm tra dữ liệu hợp lệ (giá dương, tên không rỗng).
  2. **Lưu:** Gọi `db.product.create(...)` → Prisma dịch thành câu lệnh `INSERT INTO Product` lưu vào CSDL SQLite (`dev.db`).
  3. **Đồng bộ hiển thị:** Server gọi `revalidatePath('/products')` để xoá cache cũ, giúp khách hàng vào xem thấy ngay sản phẩm mới.

---

#### ❓ Câu 5: Dữ liệu giỏ hàng em đang lưu ở đâu? Tại sao không lưu trong Database?
* **Trả lời:**
  * Giỏ hàng em đang lưu tạm ở **`localStorage` trình duyệt thông qua thư viện Zustand**.
  * Lý do: Khi khách hàng chỉ đang xem và chọn món, việc lưu tạm ở Client giúp thao tác tăng giảm số lượng diễn ra tức thì, không tốn tài nguyên gửi request liên tục lên Server/Database. Chỉ khi khách hàng bấm **'Xác nhận đặt hàng'** thì toàn bộ thông tin mới được gửi lên để ghi vào Database thành bản ghi Đơn hàng chính thức.

---

#### ❓ Câu 6: Dự án này còn hạn chế gì và em dự định phát triển tiếp ra sao?
* **Trả lời:**
  * **Hạn chế:** Hệ thống chưa tích hợp cổng thanh toán thực tế (mới mô phỏng COD/Chuyển khoản), phân quyền Admin còn đơn giản qua Cookie.
  * **Hướng phát triển:** Tích hợp thanh toán quét mã QR (VNPAY/MoMo), áp dụng NextAuth/JWT để mã hoá mật khẩu nâng cao, và bổ sung biểu đồ doanh thu bằng Chart.js.
