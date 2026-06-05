### Trả lời câu hỏi Bài 0.1

**1. File `.jsx` khác gì file `.js`?**
- `.js`: Là file JavaScript thuần, chỉ hiểu mã JavaScript.
- `.jsx`: Là phần mở rộng của React (JavaScript XML), cho phép viết trực tiếp cú pháp HTML (như `<div>`, `<h1>`) lồng ngay bên trong code JavaScript.

**2. Tại sao phải `export default App`?**
- Để "xuất" component `App` ra ngoài. Nhờ đó, các file khác (cụ thể là `main.jsx`) mới có thể `import` (nhập) nó vào để render (hiển thị) lên trình duyệt. 

**3. Thử xóa `export default` → chuyện gì xảy ra?**
- Ứng dụng sẽ báo lỗi và trang web không hiển thị được. Lỗi xảy ra vì `main.jsx` đang cố gọi `App` nhưng không tìm thấy do nó chưa được export.

---

### Bài tập Bài 0.2: Viết lại HTML thành JSX

**Bài 1: Component UserProfile**

```jsx
function UserProfile() {
    return (
        <div className="profile">
            <h1>Hồ sơ cá nhân</h1>
            <img src="photo.jpg" alt="Ảnh đại diện" />
            <table>
                <tbody>
                    <tr>
                        <td>Họ tên:</td>
                        <td>Minh</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>minh@example.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default UserProfile;


**Bài 2: Viết component ProductInfo**

function ProductInfo() {
    return (
        <div className="product">
            <h2>iPhone 15</h2>
            <p className="price">25.000.000đ</p>
            <ul>
                <li>Màn hình: 6.1 inch</li>
                <li>Camera: 48MP</li>
                <li>Pin: 3349 mAh</li>
            </ul>
            <button>Mua ngay</button>
        </div>
    );
}

export default ProductInfo;