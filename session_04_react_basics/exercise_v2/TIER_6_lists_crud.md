### Bài 6.1 — Render danh sách

```jsx
import { useState } from "react";

function Challenge61() {
    const [students] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);

    // Thử thách 3: Tính tuổi trung bình
    const totalAge = students.reduce((sum, student) => sum + student.age, 0);
    const avgAge = (totalAge / students.length).toFixed(1); // Lấy 1 chữ số thập phân

    return (
        <div style={{ padding: "20px" }}>
            <h2>Danh sách sinh viên</h2>
            
            {students.map((student, index) => (
                <div key={student.id} style={{ 
                    padding: "10px", 
                    margin: "5px 0",
                    background: "#f9f9f9",
                    borderRadius: "5px",
                    // Thử thách 2: Tuổi >= 20 màu xanh, ngược lại màu đen
                    color: student.age >= 20 ? "green" : "black",
                    fontWeight: student.age >= 20 ? "bold" : "normal"
                }}>
                    {/* Thử thách 1: STT bằng index + 1 */}
                    {index + 1}. {student.name} - {student.age} tuổi
                </div>
            ))}

            {/* Hiển thị tuổi trung bình */}
            <h3 style={{ borderTop: "2px solid #ddd", paddingTop: "10px" }}>
                Tuổi trung bình: {avgAge}
            </h3>
        </div>
    );
}

export default Challenge61;

'''

### Bài 6.2 — Thêm phần tử (CREATE)

import { useState, useRef } from "react";

function Challenge62() {
    const [items, setItems] = useState([
        { id: 1, name: "HTML" },
        { id: 2, name: "CSS" }
    ]);
    const [newName, setNewName] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    
    // Dùng useRef để có thể điều khiển thẻ input từ xa (focus)
    const inputRef = useRef(null);

    function handleAdd() {
        // Thử thách 1: Validate không cho thêm nếu trống
        if (newName.trim() === "") {
            alert("Vui lòng nhập tên môn học!");
            return;
        }

        const newItem = { id: Date.now(), name: newName };
        setItems([...items, newItem]);
        setNewName("");

        // Thử thách 2: Hiện thông báo và tự động ẩn sau 3 giây
        setSuccessMessage("✅ Đã thêm thành công!");
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);

        // Thử thách 3: Focus lại vào ô input sau khi thêm
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Thêm môn học</h2>
            
            <div style={{ marginBottom: "15px" }}>
                <input 
                    ref={inputRef}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                    placeholder="Nhập tên môn học..."
                    style={{ padding: "8px", marginRight: "10px", width: "200px" }}
                />
                <button onClick={handleAdd} style={{ padding: "8px 16px", cursor: "pointer" }}>
                    ➕ Thêm
                </button>
            </div>

            {/* Vùng hiển thị thông báo thành công */}
            {successMessage && (
                <p style={{ color: "green", fontWeight: "bold" }}>{successMessage}</p>
            )}
            
            <h3>Danh sách ({items.length} môn):</h3>
            {items.map(item => (
                <div key={item.id} style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                    {item.name}
                </div>
            ))}
        </div>
    );
}

export default Challenge62;

'''

### Bài 6.3 — Xóa phần tử (DELETE)

import { useState } from "react";

function Challenge63() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh" },
        { id: 2, name: "An" },
        { id: 3, name: "Linh" }
    ]);
    
    // Lưu lại thông tin phần tử vừa xóa để hoàn tác
    const [deletedInfo, setDeletedInfo] = useState(null);

    function handleDelete(id, name) {
        // Thử thách 3: Chỉ xóa khi confirm
        if (!window.confirm(`Bạn có chắc chắn muốn xóa ${name} không?`)) {
            return;
        }

        // Tìm phần tử chuẩn bị xóa để lưu vào lịch sử hoàn tác
        const itemToDelete = items.find(item => item.id === id);
        
        // Tiến hành xóa
        setItems(items.filter(item => item.id !== id));

        // Nếu có hẹn giờ cũ đang chạy thì xóa đi
        if (deletedInfo && deletedInfo.timeoutId) {
            clearTimeout(deletedInfo.timeoutId);
        }

        // Thử thách 1 & 2: Thiết lập thông báo và Hoàn tác trong 5 giây
        const timeoutId = setTimeout(() => {
            setDeletedInfo(null); // Xóa cơ hội hoàn tác sau 5 giây
        }, 5000);

        setDeletedInfo({
            item: itemToDelete,
            timeoutId: timeoutId
        });
    }

    function handleUndo() {
        if (deletedInfo) {
            // Thêm lại phần tử vào danh sách
            setItems([...items, deletedInfo.item]);
            // Xóa thông báo
            clearTimeout(deletedInfo.timeoutId);
            setDeletedInfo(null);
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Xóa sinh viên</h2>

            {/* Thông báo đã xóa kèm nút hoàn tác */}
            {deletedInfo && (
                <div style={{ background: "#ffeeba", padding: "10px", marginBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Đã xóa <strong>{deletedInfo.item.name}</strong>.</span>
                    <button onClick={handleUndo} style={{ background: "#ffc107", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "3px" }}>
                        ↩️ Hoàn tác
                    </button>
                </div>
            )}
            
            {items.length === 0 ? (
                <p style={{ color: "#999" }}>Danh sách trống</p>
            ) : (
                items.map(item => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px", margin: "5px 0", background: "#f9f9f9" }}>
                        <span>{item.name}</span>
                        <button 
                            onClick={() => handleDelete(item.id, item.name)}
                            style={{ background: "#e74c3c", color: "white", border: "none", padding: "4px 8px", cursor: "pointer" }}
                        >
                            Xóa
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default Challenge63;

### Bài 6.4 — Sửa phần tử (UPDATE)

import { useState } from "react";

function Challenge64() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);
    
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    
    function startEdit(item) {
        setEditingId(item.id);
        setEditName(item.name);
        setEditAge(item.age.toString());
        setSuccessMsg(""); // Xóa thông báo cũ nếu có
    }
    
    function saveEdit() {
        // Thử thách 2: Không cho lưu nếu tên trống
        if (editName.trim() === "") {
            alert("Tên không được để trống!");
            return;
        }
        
        setItems(items.map(item => 
            item.id === editingId 
                ? { ...item, name: editName, age: parseInt(editAge) || 0 }
                : item
        ));
        
        setEditingId(null);

        // Thử thách 3: Hiển thị thông báo lưu thành công
        setSuccessMsg("✅ Đã lưu!");
        setTimeout(() => setSuccessMsg(""), 3000);
    }
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Sửa thông tin</h2>

            {successMsg && <p style={{ color: "green", fontWeight: "bold" }}>{successMsg}</p>}
            
            {items.map(item => (
                <div key={item.id} style={{ padding: "10px", margin: "5px 0", background: "#f9f9f9", borderRadius: "5px" }}>
                    {editingId === item.id ? (
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <input 
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                                autoFocus
                                // Thử thách 1: Highlight ô input khi sửa
                                style={{ 
                                    padding: "6px", 
                                    border: "2px solid #3498db", 
                                    outline: "none", 
                                    boxShadow: "0 0 5px rgba(52, 152, 219, 0.5)",
                                    borderRadius: "4px"
                                }}
                            />
                            <input 
                                type="number"
                                value={editAge}
                                onChange={(e) => setEditAge(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                                style={{ padding: "6px", width: "60px", border: "2px solid #3498db", borderRadius: "4px" }}
                            />
                            <button onClick={saveEdit} style={{ background: "#27ae60", color: "white", border: "none", padding: "6px 12px", cursor: "pointer" }}>✓ Lưu</button>
                            <button onClick={() => setEditingId(null)} style={{ background: "#95a5a6", color: "white", border: "none", padding: "6px 12px", cursor: "pointer" }}>✕ Hủy</button>
                        </div>
                    ) : (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>{item.name} - {item.age} tuổi</span>
                            <button onClick={() => startEdit(item)} style={{ background: "#3498db", color: "white", border: "none", padding: "4px 10px", cursor: "pointer" }}>
                                ✏️ Sửa
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Challenge64;