### Bài 5.1 — Click Events

```jsx
import { useState } from "react";

function Challenge51() {
    const [bgColor, setBgColor] = useState("#ffffff");
    const [btn1Count, setBtn1Count] = useState(0);
    const [btn2Count, setBtn2Count] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    // 1. Hàm đổi màu ngẫu nhiên
    function handleChangeColor() {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        setBgColor(randomColor);
    }

    return (
        <div style={{ padding: "20px", backgroundColor: bgColor, minHeight: "200px", transition: "background-color 0.3s" }}>
            <h2>Click Events Challenge</h2>
            
            {/* 1. Đổi màu ngẫu nhiên */}
            <button onClick={handleChangeColor} style={{ marginBottom: "15px" }}>
                Đổi màu nền ngẫu nhiên
            </button>
            <br />

            {/* 2. Đếm số lần click riêng biệt */}
            <button onClick={() => setBtn1Count(btn1Count + 1)} style={{ marginRight: "10px" }}>
                Nút A (Click: {btn1Count})
            </button>
            
            <button onClick={() => setBtn2Count(btn2Count + 1)} style={{ marginBottom: "15px" }}>
                Nút B (Click: {btn2Count})
            </button>
            <br />

            {/* 3. Nút Like Toggle */}
            <button 
                onClick={() => setIsLiked(!isLiked)} 
                style={{ fontSize: "20px", background: "none", border: "1px solid #ccc", borderRadius: "5px", cursor: "pointer", padding: "5px 15px" }}
            >
                {isLiked ? "❤️ Đã thích" : "🤍 Thích"}
            </button>
        </div>
    );
}

export default Challenge51;


### Bài 5.2 — Input Events:

import { useState } from "react";

function Challenge52() {
    const [email, setEmail] = useState("");
    const [wordCount, setWordCount] = useState(0);

    // Xử lý đếm từ
    function handleTextChange(event) {
        const text = event.target.value;
        // Tách chuỗi theo dấu cách (loại bỏ khoảng trắng thừa) để đếm số từ
        const words = text.trim().split(/\s+/);
        // Nếu input rỗng thì số từ là 0, ngược lại thì đếm số phần tử trong mảng words
        setWordCount(text.trim() === "" ? 0 : words.length);
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Input Events Challenge</h2>

            {/* 1. Validate Email */}
            <div style={{ marginBottom: "20px" }}>
                <label>Email: </label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Nhập email..."
                />
                <span style={{ marginLeft: "10px", color: email.includes("@") ? "green" : "red" }}>
                    {email.includes("@") ? "✅ Hợp lệ" : "❌ Phải chứa ký tự @"}
                </span>
            </div>

            {/* 2. Đếm từ & Preview */}
            <div style={{ marginBottom: "20px" }}>
                <label>Đoạn văn (Đếm từ):</label><br />
                <textarea 
                    onChange={handleTextChange} 
                    rows={4} 
                    style={{ width: "100%", marginTop: "5px" }} 
                    placeholder="Nhập gì đó để đếm từ..."
                />
                <p><strong>Số từ đã nhập:</strong> {wordCount} từ</p>
            </div>
        </div>
    );
}

export default Challenge52;

### Bài 5.3 — Keyboard Events

iimport { useState } from "react";

function Challenge53() {
    // 1. Game đoán phím
    const [targetKey, setTargetKey] = useState("a"); // Phím ngẫu nhiên ban đầu
    const [gameMessage, setGameMessage] = useState("Nhấn phím '" + targetKey + "' để thắng!");

    // 2. Di chuyển ô vuông
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // 3. Phím tắt đổi màu
    const [bgColor, setBgColor] = useState("white");

    function handleKeyDown(e) {
        // --- Logic Game Đoán Phím ---
        if (e.key === targetKey) {
            setGameMessage("✅ Chuẩn rồi!");
            // Tạo phím ngẫu nhiên mới từ a-z
            const characters = 'abcdefghijklmnopqrstuvwxyz';
            const newKey = characters.charAt(Math.floor(Math.random() * characters.length));
            setTimeout(() => {
                setTargetKey(newKey);
                setGameMessage("Nhấn phím '" + newKey + "' để thắng!");
            }, 1000);
        } else {
             // Không cập nhật gameMessage nếu đang nhấn mũi tên (để tránh nhiễu game)
             if(!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Control", "d"].includes(e.key)) {
                 setGameMessage("❌ Sai rồi! Thử lại phím: " + targetKey);
             }
        }

        // --- Logic Di Chuyển Ô Vuông ---
        const step = 20; // Mỗi lần di chuyển 20px
        if (e.key === "ArrowUp") setPosition(prev => ({ ...prev, y: prev.y - step }));
        if (e.key === "ArrowDown") setPosition(prev => ({ ...prev, y: prev.y + step }));
        if (e.key === "ArrowLeft") setPosition(prev => ({ ...prev, x: prev.x - step }));
        if (e.key === "ArrowRight") setPosition(prev => ({ ...prev, x: prev.x + step }));

        // --- Logic Phím Tắt Ctrl + D ---
        if (e.ctrlKey && e.key === "d") {
            e.preventDefault(); // Ngăn trình duyệt mở bookmark (hành vi mặc định của Ctrl+D)
            setBgColor(prevColor => prevColor === "white" ? "#f0e68c" : "white"); // Đổi qua lại màu khaki và trắng
        }
    }

    return (
        <div 
            style={{ padding: "20px", height: "400px", position: "relative", backgroundColor: bgColor, outline: "none" }}
            onKeyDown={handleKeyDown}
            tabIndex={0} // Bắt buộc phải có để thẻ div nhận được sự kiện bàn phím
        >
            <h2>Keyboard Events Challenge</h2>
            <p><i>(Hãy click chuột vào khung này trước khi bấm phím)</i></p>

            {/* Game Đoán Phím */}
            <div style={{ padding: "10px", background: "#eee", marginBottom: "20px" }}>
                <h3>Game Đoán Phím</h3>
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>{gameMessage}</p>
            </div>

            {/* Phím Tắt */}
            <p><strong>Bấm Ctrl + D</strong> để đổi màu nền thẻ div này.</p>

            {/* Di Chuyển Ô Vuông */}
            <p><strong>Bấm Mũi tên (Lên/Xuống/Trái/Phải)</strong> để di chuyển ô đỏ bên dưới:</p>
            <div style={{ 
                width: "50px", 
                height: "50px", 
                backgroundColor: "red", 
                position: "absolute",
                transition: "all 0.1s", // Tạo hiệu ứng mượt
                // Giới hạn để ô vuông không chạy ra khỏi khung (demo cơ bản)
                left: Math.max(0, position.x) + "px", 
                top: Math.max(0, position.y + 250) + "px" // +250 để lùi xuống dưới dòng text
            }} />
        </div>
    );
}

export default Challenge53;

### Bài 5.4 — Form Events

import { useState } from "react";

function Challenge54() {
    const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "" });
    const [submitted, setSubmitted] = useState(false);

    // Xử lý thay đổi input & Validation Realtime
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Realtime validation
        let newErrors = { ...errors };
        
        if (name === "email") {
            newErrors.email = value.includes("@") ? "" : "Email phải chứa '@'";
        }
        
        if (name === "password") {
            // Check mật khẩu quá ngắn
            newErrors.password = value.length >= 6 ? "" : "Mật khẩu phải từ 6 ký tự";
            
            // Nếu người dùng đang sửa password, ta cũng cần kiểm tra lại confirmPassword
            if (formData.confirmPassword && value !== formData.confirmPassword) {
                 newErrors.confirmPassword = "Mật khẩu xác nhận không khớp!";
            } else {
                 newErrors.confirmPassword = "";
            }
        }
        
        if (name === "confirmPassword") {
            newErrors.confirmPassword = value === formData.password ? "" : "Mật khẩu xác nhận không khớp!";
        }

        setErrors(newErrors);
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Kiểm tra xem có lỗi nào đang tồn tại không hoặc có trường nào bị rỗng không
        if (errors.email || errors.password || errors.confirmPassword || !formData.email || !formData.password || !formData.confirmPassword) {
            alert("Vui lòng sửa các lỗi trước khi gửi!");
            return;
        }

        setSubmitted(true);
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Form Events Challenge</h2>
            
            {!submitted ? (
                <form onSubmit={handleSubmit} style={{ width: "300px" }}>
                    {/* Email */}
                    <div style={{ marginBottom: "15px" }}>
                        <label>Email: </label>
                        <input 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            style={{ width: "100%", borderColor: errors.email ? "red" : "ccc" }}
                        />
                        {errors.email && <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.email}</div>}
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: "15px" }}>
                        <label>Mật khẩu: </label>
                        <input 
                            name="password" 
                            type="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            style={{ width: "100%", borderColor: errors.password ? "red" : "ccc" }}
                        />
                        {errors.password && <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.password}</div>}
                    </div>

                    {/* Confirm Password */}
                    <div style={{ marginBottom: "20px" }}>
                        <label>Xác nhận mật khẩu: </label>
                        <input 
                            name="confirmPassword" 
                            type="password" 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            style={{ width: "100%", borderColor: errors.confirmPassword ? "red" : "ccc" }}
                        />
                        {errors.confirmPassword && <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.confirmPassword}</div>}
                    </div>

                    <button type="submit" style={{ width: "100%", padding: "10px", background: "#3498db", color: "white", border: "none", cursor: "pointer" }}>
                        Đăng Ký
                    </button>
                </form>
            ) : (
                <div style={{ background: "#d4edda", padding: "15px", borderRadius: "4px" }}>
                    <h3>✅ Đăng ký thành công!</h3>
                    <p>Tài khoản: {formData.email}</p>
                    <button onClick={() => setSubmitted(false)}>Tạo tài khoản mới</button>
                </div>
            )}
        </div>
    );
}

export default Challenge54;