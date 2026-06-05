### Bài 2.1 — Hiển thị biến đơn giản

```jsx
function Challenge21() {
    // 1. Thông tin cá nhân
    const name = "Nguyễn Văn A";
    const age = 21;
    const hometown = "Hà Nội";
    
    // 2. Lấy giờ hiện tại để xét lời chào
    const currentHour = new Date().getHours();
    let greeting = "";
    if (currentHour < 12) greeting = "Chào buổi sáng 🌅";
    else if (currentHour < 18) greeting = "Chào buổi chiều 🌤️";
    else greeting = "Chào buổi tối 🌙";

    // 3. Tính BMI
    const weight = 60; // Cân nặng (kg)
    const height = 1.70; // Chiều cao (m)
    const bmi = (weight / (height * height)).toFixed(2); // Lấy 2 số thập phân

    return (
        <div style={{ padding: "20px" }}>
            <h2>Thông tin cá nhân</h2>
            <ul>
                <li>Tên: {name}</li>
                <li>Tuổi: {age}</li>
                <li>Quê quán: {hometown}</li>
            </ul>

            <h2>{greeting}</h2>

            <h2>Chỉ số sức khỏe</h2>
            <p>Với chiều cao {height}m và cân nặng {weight}kg, BMI của bạn là: <strong>{bmi}</strong></p>
        </div>
    );
}
export default Challenge21;



**Bài 2.2: Conditional Rendering**

function Challenge22() {
    const isOnline = true;
    const isLoggedIn = true;
    const stock = 0;

    return (
        <div style={{ padding: "20px" }}>
            {/* 1. Hiển thị icon trạng thái */}
            <h2>Trạng thái: {isOnline ? "🟢 Online" : "🔴 Offline"}</h2>

            {/* 2. Hiện/ẩn menu */}
            {isLoggedIn && (
                <div style={{ background: "#e3f2fd", padding: "10px", marginBottom: "10px" }}>
                    <b>Menu Người Dùng</b>
                    <ul>
                        <li>Hồ sơ của tôi</li>
                        <li>Đơn hàng</li>
                        <li>Đăng xuất</li>
                    </ul>
                </div>
            )}

            {/* 3. Hiển thị thông báo hết hàng */}
            <div style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
                <h3>Áo thun nam</h3>
                <p>Số lượng còn: {stock}</p>
                {stock === 0 && <p style={{ color: "red", fontWeight: "bold" }}>⚠️ Đã hết hàng</p>}
            </div>
        </div>
    );
}
export default Challenge22;