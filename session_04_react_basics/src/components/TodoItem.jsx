import { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    // State quản lý chế độ đang xem hay đang sửa
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    // Lưu chỉnh sửa
    function handleSave() {
        if (editText.trim() === "") return;
        onEdit(todo.id, editText);
        setIsEditing(false);
    }

    // Xử lý phím khi đang sửa
    function handleKeyDown(e) {
        if (e.key === "Enter") handleSave();
        if (e.key === "Escape") {
            setEditText(todo.text); // Hoàn tác lại text cũ
            setIsEditing(false);
        }
    }

    return (
        <div style={{ display: "flex", alignItems: "center", padding: "15px", margin: "8px 0", background: todo.done ? "#f8fdf8" : "#fff", border: "1px solid #eee", borderRadius: "8px", transition: "all 0.2s", opacity: todo.done ? 0.7 : 1 }}>
            
            {/* Checkbox ẩn đi khi đang ở chế độ sửa */}
            {!isEditing && (
                <input 
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => onToggle(todo.id)}
                    style={{ marginRight: "15px", transform: "scale(1.5)", cursor: "pointer" }}
                />
            )}

            <div style={{ flex: 1, marginRight: "10px" }}>
                {isEditing ? (
                    // Giao diện khi ĐANG SỬA
                    <div style={{ display: "flex", gap: "10px" }}>
                        <input 
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            style={{ flex: 1, padding: "8px", border: "2px solid #3498db", borderRadius: "4px", outline: "none" }}
                        />
                        <button onClick={handleSave} style={{ background: "#27ae60", color: "white", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer" }}>Lưu</button>
                        <button onClick={() => setIsEditing(false)} style={{ background: "#95a5a6", color: "white", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer" }}>Hủy</button>
                    </div>
                ) : (
                    // Giao diện khi XEM BÌNH THƯỜNG (Thử thách 5: Double click để sửa)
                    <div onDoubleClick={() => setIsEditing(true)}>
                        <div style={{ textDecoration: todo.done ? "line-through" : "none", color: todo.done ? "#95a5a6" : "#2c3e50", fontSize: "16px", fontWeight: "500", marginBottom: "4px" }}>
                            {todo.text}
                        </div>
                        <div style={{ fontSize: "11px", color: "#bdc3c7" }}>
                            Tạo lúc: {todo.createdAt}
                        </div>
                    </div>
                )}
            </div>

            {/* Nút thao tác (ẩn khi đang sửa) */}
            {!isEditing && (
                <div style={{ display: "flex", gap: "5px" }}>
                    {/* Thử thách 4: Nút Sửa */}
                    <button 
                        onClick={() => setIsEditing(true)}
                        style={{ background: "#f1c40f", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}
                    >
                        ✏️ Sửa
                    </button>
                    <button 
                        onClick={() => onDelete(todo.id)}
                        style={{ background: "#e74c3c", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}
                    >
                        🗑 Xóa
                    </button>
                </div>
            )}
        </div>
    );
}

export default TodoItem;