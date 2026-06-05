# 📝 Tổng kết: 

## 1:
Ở Phần A, mỗi khi thao tác dữ liệu, chúng ta phải gọi **2 hàm** (đối với các hàm do chúng ta tự định nghĩa):
* **Khi thêm (Add):** Gọi `addTodo()` ➔ sau đó bên trong gọi tiếp `renderTodos()`.
* **Khi đảo trạng thái (Toggle):** Gọi `toggleTodo(id)` ➔ sau đó bên trong gọi tiếp `renderTodos()`.
* **Khi xóa (Delete):** Gọi `deleteTodo(id)` ➔ sau đó bên trong gọi tiếp `renderTodos()`.
-  Vì Vanilla JS không tự biết khi nào dữ liệu (`todos`) thay đổi để cập nhật giao diện. Ta phải chủ động gọi hàm `renderTodos()` để xóa sạch DOM cũ và vẽ lại DOM mới.

------------------

## 2:
Khi gọi `setTodos(...)`, React sẽ tự động thực hiện các bước sau một cách "âm thầm":
1.  **Cập nhật State:** Lưu trữ dữ liệu mới vào biến `todos`.
2.  **Trigger Re-render:** Tự động gọi lại hàm Component `TodoApp()` để tính toán lại giao diện.
3.  **Virtual DOM & Diffing:** React tạo ra một bản nháp giao diện mới (Virtual DOM), so sánh nó với bản nháp cũ để tìm ra **chính xác** những chỗ bị thay đổi.
4.  **Cập nhật DOM thực:** Chỉ tác động và vẽ lại những phần tử bị thay đổi trên trình duyệt (thay vì xóa trắng và vẽ lại toàn bộ như cách dùng `innerHTML` ở Phần A).

------------------

## 3:
* Cách dùng React (Phần B) sẽ an toàn và hiệu quả hơn rất nhiều.

* **Về mặt hiệu suất :** Nếu dùng Vanilla JS như Phần A (`todoList.innerHTML = ""`), mỗi lần có thay đổi nhỏ (như xóa 1 project), trình duyệt phải xóa cả 50 project và vẽ lại toàn bộ 50 project từ đầu. Điều này rất nặng nề. React với Virtual DOM và thuộc tính `key` sẽ chỉ xóa đúng 1 thẻ DOM của project đó, giữ nguyên 49 thẻ còn lại.
* **Về mặt bảo trì :** Khi dự án lớn lên, việc tự quản lý DOM bằng tay (querySelector, addEventListener, innerHTML) rất dễ sinh lỗi (bug) và khó kiểm soát trạng thái. React ép chúng ta quản lý theo luồng: Data thay đổi ➔ UI tự thay đổi.

------------------

## 4: 
1. **`useState`**: Quản lý trạng thái cốt lõi.
    * `const [projects, setProjects] = useState(projectData);` ➔ Lưu trữ danh sách 50 projects.
    * `const [activeCategory, setActiveCategory] = useState('All');` ➔ Lưu trạng thái bộ lọc hiện tại (VD: 'All', 'Web', 'Mobile').
2. **`.filter()`**: Xử lý logic dữ liệu (Lọc và Xóa).
    * *Lọc theo Category:* `const filteredProjects = projects.filter(p => activeCategory === 'All' || p.category === activeCategory);`
    * *Xóa bỏ (nếu có tính năng quản lý):* `setProjects(projects.filter(p => p.id !== idToDelete));`
3. **`.map()`**: Biến đổi dữ liệu thành Giao diện (Render UI).
    * Duyệt qua danh sách đã lọc để hiển thị ra các thẻ Card tương ứng:
        ```jsx
        {filteredProjects.map(project => (
            <ProjectCard 
                key={project.id} 
                title={project.title} 
                techStack={project.techStack} 
            />
        ))}
        ```