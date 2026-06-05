### Trả lời câu hỏi Bài 1.1

**1. Tại sao component chỉ render 1 lần?**
- Vì React chỉ gọi hàm `LifecycleDemo` lần đầu tiên để lấy giao diện (JSX) và vẽ lên màn hình (Initial Render). Do bên trong component này không có bất kỳ trạng thái (state) nào thay đổi, React không có lý do gì để gọi lại hàm này.

**2. Khi nào nó sẽ render lại?**
- Component sẽ render lại (Re-render) khi có một trong hai điều kiện sau xảy ra:
  1. Trạng thái (State - tạo bởi `useState`) của chính nó bị thay đổi.
  2. Dữ liệu truyền từ component cha (Props) thay đổi.

---

### Bài 1.2 — Biến "bình thường" vs useState

**1. Chạy `BadCounter` → nhấn nút → thấy gì?**
- Thấy: Trong tab Console (F12), số `count` tăng lên liên tục (1, 2, 3...), nhưng trên giao diện web (UI), con số vẫn đứng im ở `0`. 
- Lý do: Biến bình thường thay đổi không báo hiệu cho React biết để vẽ lại giao diện.

**2. Chạy `GoodCounter` → nhấn nút → thấy gì?**
- Thấy: Số bộ đếm trên giao diện web tăng lên tương ứng mỗi khi click.
- Lý do: Khi gọi hàm `setCount`, React nhận được thông báo trạng thái đã thay đổi, nó lập tức kích hoạt quy trình render lại component để cập nhật giao diện mới nhất.

**3. Mở Console → thấy log "render" mấy lần?**
- Với `BadCounter`: Log chỉ xuất hiện 1 lần duy nhất lúc mới tải trang.
- Với `GoodCounter`: Mỗi lần bấm nút `Tăng (+1)`, bạn sẽ thấy log render xuất hiện thêm 1 lần (vì component được gọi lại để tính toán giao diện mới).