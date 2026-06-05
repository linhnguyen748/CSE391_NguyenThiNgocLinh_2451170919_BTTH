import { useState } from "react";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";

function App() {
    // Thử thách 6 (Level 2): Khởi tạo state từ localStorage
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("all");

    // Hàm hỗ trợ: Vừa cập nhật State, vừa lưu vào LocalStorage
    const saveTodos = (newTodos) => {
        setTodos(newTodos);
        localStorage.setItem("todos", JSON.stringify(newTodos));
    };

    function addTodo() {
        if (inputValue.trim() === "") return;
        
        const newTodo = {
            id: Date.now(),
            text: inputValue,
            done: false,
            // Thử thách 1 (Level 1): Thêm ngày giờ tạo
            createdAt: new Date().toLocaleString("vi-VN") 
        };
        
        saveTodos([...todos, newTodo]);
        setInputValue("");
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") addTodo();
    }

    function toggleTodo(id) {
        const newTodos = todos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        );
        saveTodos(newTodos);
    }

    function deleteTodo(id) {
        const newTodos = todos.filter(todo => todo.id !== id);
        saveTodos(newTodos);
    }

    // Thử thách 4 & 5 (Level 2): Hàm cập nhật nội dung khi sửa
    function editTodo(id, newText) {
        const newTodos = todos.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo
        );
        saveTodos(newTodos);
    }

    const filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.done;
        if (filter === "completed") return todo.done;
        return true;
    });

    const activeCount = todos.filter(todo => !todo.done).length;
    const completedCount = todos.filter(todo => todo.done).length;
    // Thử thách 2 (Level 1): Đếm tổng số
    const totalCount = todos.length; 

    // Thử thách 3 (Level 1): Thay đổi placeholder theo bộ lọc
    let inputPlaceholder = "Nhập công việc...";
    if (filter === "active") inputPlaceholder = "Thêm việc chưa làm...";
    if (filter === "completed") inputPlaceholder = "Thêm việc đã hoàn thành...";

    return (
        <div style={{ maxWidth: "550px", margin: "40px auto", padding: "20px", fontFamily: "Arial, sans-serif", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", borderRadius: "10px", backgroundColor: "#fff" }}>
            <h1 style={{ textAlign: "center", color: "#2c3e50" }}>📋 Quản Lý Công Việc</h1>
            
            <div style={{ display: "flex", marginBottom: "20px" }}>
                <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={inputPlaceholder}
                    style={{ flex: 1, padding: "12px", fontSize: "16px", border: "2px solid #ecf0f1", borderRadius: "8px 0 0 8px", outline: "none" }}
                />
                <button 
                    onClick={addTodo}
                    style={{ padding: "0 25px", fontSize: "16px", background: "#3498db", color: "white", border: "none", borderRadius: "0 8px 8px 0", cursor: "pointer", fontWeight: "bold" }}
                >
                    Thêm
                </button>
            </div>
            
            <TodoFilter filter={filter} setFilter={setFilter} />
            
            <div style={{ minHeight: "200px" }}>
                {filteredTodos.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "40px", color: "#bdc3c7" }}>
                        {todos.length === 0 ? "📝 Chưa có công việc nào" : "Không có công việc phù hợp"}
                    </div>
                ) : (
                    filteredTodos.map(todo => (
                        <TodoItem 
                            key={todo.id}
                            todo={todo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                            onEdit={editTodo} // Truyền hàm edit xuống component con
                        />
                    ))
                )}
            </div>
            
            {totalCount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", padding: "15px", background: "#f8f9fa", borderRadius: "8px", fontSize: "14px" }}>
                    <span>Tổng: <strong>{totalCount}</strong> | Còn lại: <strong>{activeCount}</strong></span>
                    {completedCount > 0 && (
                        <span style={{ color: "#27ae60", fontWeight: "bold" }}>
                            Đã xong: {completedCount}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;