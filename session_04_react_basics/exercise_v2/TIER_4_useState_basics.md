### Bài 4.1 — useState với số (Đếm)

```jsx
import { useState } from "react";

function Challenge41() {
    const [count, setCount] = useState(0);

    // Tính toán màu sắc dựa vào count
    const textColor = count > 0 ? "green" : count < 0 ? "red" : "black";
    // Tính toán trạng thái số
    const status = count > 0 ? "Số dương" : count < 0 ? "Số âm" : "Số không";

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            {/* Áp dụng màu sắc */}
            <h2 style={{ color: textColor }}>
                Bộ đếm: {count} ({status})
            </h2>
            
            <button onClick={() => setCount(count + 1)}>Tăng (+1)</button>
            <button onClick={() => setCount(count - 1)}>Giảm (-1)</button>
            <button onClick={() => setCount(0)}>Reset</button>
            <button onClick={() => setCount(count * 2)}>Nhân đôi</button>
            
            {/* Nút mới thêm */}
            <button onClick={() => setCount(count + 5)}>Tăng 5 (+5)</button>
        </div>
    );
}

export default Challenge41;
'''

### Bài 4.2 — useState với chuỗi (Input)

'''Javascript'''
import { useState } from "react";

function Challenge42() {
    const [text, setText] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Validate email đơn giản
    const isEmailValid = email.includes("@");

    return (
        <div style={{ padding: "20px" }}>
            <h2>Thử thách Nhập liệu</h2>
            
            <div style={{ marginBottom: "15px" }}>
                <label>Đoạn văn ({text.length}/100 ký tự): </label><br />
                <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={100}
                    rows={3}
                />
            </div>
            
            <div style={{ marginBottom: "15px" }}>
                <label>Email: </label>
                <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {email && (
                    <span style={{ color: isEmailValid ? "green" : "red", marginLeft: "10px" }}>
                        {isEmailValid ? "✅ Hợp lệ" : "❌ Thiếu chữ @"}
                    </span>
                )}
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label>Mật khẩu: </label>
                <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={() => setShowPassword(!showPassword)} style={{ marginLeft: "5px" }}>
                    {showPassword ? "Ẩn" : "Hiện"}
                </button>
            </div>
        </div>
    );
}

export default Challenge42;


### Bài 4.3 — useState với boolean (Toggle)

'''Javascript'''
import { useState } from "react";

function Challenge43() {
    const [showPassword, setShowPassword] = useState(false);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [isLightOn, setIsLightOn] = useState(false);

    return (
        <div style={{ padding: "20px" }}>
            {/* 1. Hiện/Ẩn mật khẩu */}
            <div style={{ marginBottom: "20px" }}>
                <h3>1. Toggle Input</h3>
                <input type={showPassword ? "text" : "password"} defaultValue="secret123" />
                <button onClick={() => setShowPassword(!showPassword)} style={{ marginLeft: "5px" }}>
                    {showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                </button>
            </div>

            <hr />

            {/* 2. Accordion */}
            <div style={{ marginBottom: "20px" }}>
                <h3>2. Accordion</h3>
                <div style={{ border: "1px solid #ccc", width: "300px" }}>
                    <div 
                        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                        style={{ background: "#f1f1f1", padding: "10px", cursor: "pointer", fontWeight: "bold" }}
                    >
                        Hỏi đáp thường gặp {isAccordionOpen ? "▲" : "▼"}
                    </div>
                    {isAccordionOpen && (
                        <div style={{ padding: "15px", borderTop: "1px solid #ccc" }}>
                            React là thư viện JavaScript phổ biến nhất hiện nay.
                        </div>
                    )}
                </div>
            </div>

            <hr />

            {/* 3. Bóng đèn */}
            <div>
                <h3>3. Bật/Tắt Đèn</h3>
                <div style={{ fontSize: "50px", filter: isLightOn ? "none" : "grayscale(100%) opacity(0.3)" }}>
                    💡
                </div>
                <button onClick={() => setIsLightOn(!isLightOn)} style={{ marginTop: "10px" }}>
                    {isLightOn ? "Tắt đèn" : "Bật đèn"}
                </button>
            </div>
        </div>
    );
}

export default Challenge43;

### Bài 4.4 — Kết hợp nhiều useState

'''Javascript'''
import { useState } from "react";

function Challenge44() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); // Thêm state email
    const [age, setAge] = useState("");
    const [isStudent, setIsStudent] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    
    function handleSubmit() {
        // Kiểm tra rỗng
        if (name.trim() === "" || email.trim() === "" || age === "") {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        
        // Validate tuổi
        const ageNumber = Number(age);
        if (ageNumber <= 0 || ageNumber >= 100) {
            alert("Tuổi phải lớn hơn 0 và nhỏ hơn 100!");
            return;
        }

        setSubmitted(true);
    }
    
    function handleReset() {
        setName("");
        setEmail("");
        setAge("");
        setIsStudent(false);
        setSubmitted(false);
    }
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Form đăng ký</h2>
            
            {!submitted ? (
                <div style={{ maxWidth: "300px" }}>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Tên: </label>
                        <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%" }} />
                    </div>
                    
                    {/* Trường Email mới */}
                    <div style={{ marginBottom: "10px" }}>
                        <label>Email: </label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%" }} />
                    </div>
                    
                    <div style={{ marginBottom: "10px" }}>
                        <label>Tuổi: </label>
                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={{ width: "100%" }} />
                    </div>
                    
                    <div style={{ marginBottom: "10px" }}>
                        <label>
                            <input 
                                type="checkbox"
                                checked={isStudent}
                                onChange={(e) => setIsStudent(e.target.checked)}
                            />
                            Là sinh viên
                        </label>
                    </div>
                    
                    <button onClick={handleSubmit}>Đăng ký</button>
                </div>
            ) : (
                <div style={{ background: "#d4edda", padding: "15px", borderRadius: "8px", maxWidth: "300px" }}>
                    {/* Hiển thị lời chào */}
                    <h3 style={{ color: "#155724", marginTop: 0 }}>🎉 Xin chào {name}!</h3>
                    <p>Đăng ký thành công với các thông tin:</p>
                    <ul>
                        <li><strong>Email:</strong> {email}</li>
                        <li><strong>Tuổi:</strong> {age}</li>
                        <li><strong>Sinh viên:</strong> {isStudent ? "Có" : "Không"}</li>
                    </ul>
                    <button onClick={handleReset}>Đăng ký lại</button>
                </div>
            )}
        </div>
    );
}

export default Challenge44;