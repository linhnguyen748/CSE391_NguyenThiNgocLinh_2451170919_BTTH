### Phần A — Nhận diện Component 

## 1. Sơ đồ cây Component

graph TD
    App --> Navbar
    App --> HeroSection
    App --> ProductSection
    ProductSection --> ProductCard1[ProductCard]
    ProductSection --> ProductCard2[ProductCard]
    ProductSection --> ProductCard3[ProductCard]
    App --> Footer
 
## 2. Nhận diện Component & Danh sách Props

| Tên Component | Lồng trong | Props dự kiến cần nhận | Có thể tái sử dụng ở đâu? |
| :--- | :--- | :--- | :--- |
| **`Navbar`** | `App` | `logo`, `links` (mảng menu) | Đầu trang của tất cả các trang (Home, About, Contact). |
| **`Hero`** | `App` | `title`, `subtitle`, `btnText` | Làm banner nổi bật ở Trang chủ hoặc Landing page. |
| **`ProductSection`**| `App` | `products` (mảng dữ liệu) | Các trang cần hiện danh sách (Danh mục, Kết quả tìm kiếm). |
| **`ProductCard`** | `ProductSection` | `image`, `name`, `price` | Bất cứ nơi nào cần hiện 1 sản phẩm (Giỏ hàng, Gợi ý mua thêm). |
| **`Footer`** | `App` | `copyrightText` | Cuối trang của tất cả các trang. |

## 3. Lý do tách Component

- Tái sử dụng code (DRY - Don't Repeat Yourself):** Loại bỏ việc viết lặp lại các đoạn code giống hệt nhau (như 3 khối `<div>` sản phẩm). Chỉ cần định nghĩa `ProductCard` một lần và dùng lại nhiều lần.

- Dễ bảo trì và nâng cấp:** Khi có yêu cầu thay đổi giao diện (ví dụ: thêm nút "Yêu thích" vào sản phẩm), bạn chỉ cần sửa ở một nơi duy nhất là `ProductCard`, toàn bộ trang web sẽ được cập nhật.

- Tách biệt trách nhiệm:** Việc chia nhỏ giúp component gốc (`App`) không bị phình to và rối rắm. Mỗi component con đảm nhận một chức năng cụ thể, giúp code dễ đọc, dễ sửa lỗi và dễ chia việc khi làm nhóm.