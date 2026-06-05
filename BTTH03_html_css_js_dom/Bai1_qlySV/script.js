// ==========================================
// BƯỚC 1: LẤY CÁC PHẦN TỬ DOM CẦN THIẾT
// ==========================================
const btnOpenForm = document.getElementById('btnOpenForm');
const btnCloseForm = document.getElementById('btnCloseForm');
const studentModal = document.getElementById('studentModal');
const studentForm = document.getElementById('studentForm');
const formTitle = document.getElementById('formTitle');
const studentTableBody = document.getElementById('studentTableBody');

// Các ô nhập liệu (Input)
const inputId = document.getElementById('studentId');
const inputName = document.getElementById('fullName');
const inputDob = document.getElementById('dob');
const inputClass = document.getElementById('className');
const inputScore = document.getElementById('score');
const inputEmail = document.getElementById('email');

// Thống kê
const totalStudentsEl = document.getElementById('totalStudents');
const avgScoreEl = document.getElementById('avgScore');

// Lấy dữ liệu từ localStorage
let students = JSON.parse(localStorage.getItem('students'));

// Nếu localStorage chưa có gì (người dùng mới vào web lần đầu)
if (!students || students.length === 0) {
    students = mockDatabase;  // Lấy 5 sinh viên từ file data.js
    saveToLocalStorage();     // Lưu ngay 5 người này vào localStorage của trình duyệt
}

// Biến để phân biệt đang Thêm mới hay là Sửa
let isEditMode = false;


// ==========================================
// BƯỚC 2: CÁC HÀM XỬ LÝ GIAO DIỆN & DỮ LIỆU
// ==========================================

// Hàm lưu dữ liệu xuống máy tính (localStorage)
function saveToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Hàm hiển thị danh sách sinh viên ra bảng
function renderStudents() {
    studentTableBody.innerHTML = ''; // Xóa trắng bảng cũ trước khi in bảng mới

    if (students.length === 0) {
        studentTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center;">Chưa có dữ liệu</td></tr>`;
    } else {
        // Duyệt qua từng sinh viên và tạo các dòng <tr>
        students.forEach((student, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.dob}</td>
                <td>${student.className}</td>
                <td>${student.score}</td>
                <td>${student.email}</td>
                <td>
                    <button class="btn btn-warning btn-edit" data-id="${student.id}">Sửa</button>
                    <button class="btn btn-danger btn-delete" data-id="${student.id}">Xóa</button>
                </td>
            `;
            studentTableBody.appendChild(tr);
        });
    }
    updateStats(); // Cập nhật lại số liệu thống kê
}

// Hàm tính toán và hiển thị thống kê
function updateStats() {
    totalStudentsEl.innerText = students.length;
    
    if (students.length > 0) {
        // Tính tổng điểm và chia trung bình
        let totalScore = students.reduce((sum, st) => sum + parseFloat(st.score), 0);
        let avg = (totalScore / students.length).toFixed(1);
        avgScoreEl.innerText = avg;
    } else {
        avgScoreEl.innerText = '0.0';
    }
}

// ==========================================
// BƯỚC 3: XỬ LÝ SỰ KIỆN MỞ/ĐÓNG FORM VÀ LƯU
// ==========================================

// 1. Mở Form để Thêm mới
btnOpenForm.addEventListener('click', function() {
    isEditMode = false; // Đánh dấu là đang thêm mới
    studentForm.reset(); // Xóa trắng các ô nhập liệu
    inputId.readOnly = false; // Cho phép nhập Mã SV
    formTitle.innerText = "Thêm sinh viên mới";
    studentModal.classList.remove('hidden'); // Hiện form
});

// 2. Đóng Form
btnCloseForm.addEventListener('click', function() {
    studentModal.classList.add('hidden'); // Ẩn form
});

// 3. Sự kiện Gửi Form (Lưu dữ liệu)
studentForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn trình duyệt tự động tải lại trang

    // Tạo 1 object chứa dữ liệu vừa nhập
    const studentData = {
        id: inputId.value,
        name: inputName.value,
        dob: inputDob.value,
        className: inputClass.value,
        score: inputScore.value,
        email: inputEmail.value
    };

    if (isEditMode) {
        // CHẾ ĐỘ SỬA: Tìm sinh viên đang sửa và cập nhật dữ liệu
        const index = students.findIndex(st => st.id === studentData.id);
        if (index !== -1) {
            students[index] = studentData;
        }
    } else {
        // CHẾ ĐỘ THÊM: Kiểm tra trùng Mã SV trước khi thêm
        const isExist = students.some(st => st.id === studentData.id);
        if (isExist) {
            alert("Mã sinh viên đã tồn tại!");
            return; // Dừng lại, không chạy tiếp
        }
        students.push(studentData); // Nhét vào mảng
    }

    saveToLocalStorage(); // Lưu mảng mới vào máy
    renderStudents(); // Vẽ lại bảng
    studentModal.classList.add('hidden'); // Đóng form
});

// ==========================================
// BƯỚC 4: XỬ LÝ SỰ KIỆN XÓA VÀ SỬA TẠI BẢNG
// ==========================================
// Vì các nút Xóa/Sửa được JS tạo ra sau, ta phải gắn sự kiện vào phần tử cha (Event Delegation)

studentTableBody.addEventListener('click', function(event) {
    const target = event.target;
    
    // Nếu bấm trúng nút XÓA
    if (target.classList.contains('btn-delete')) {
        const idToDelete = target.getAttribute('data-id');
        if (confirm(`Bạn có chắc chắn muốn xóa sinh viên mã ${idToDelete}?`)) {
            // Lọc ra danh sách mới, bỏ qua sinh viên có mã vừa chọn
            students = students.filter(st => st.id !== idToDelete);
            saveToLocalStorage();
            renderStudents();
        }
    }

    // Nếu bấm trúng nút SỬA
    if (target.classList.contains('btn-edit')) {
        const idToEdit = target.getAttribute('data-id');
        const studentToEdit = students.find(st => st.id === idToEdit);

        if (studentToEdit) {
            isEditMode = true; // Chuyển sang chế độ Sửa
            formTitle.innerText = "Cập nhật sinh viên";
            
            // Bơm dữ liệu cũ lên form
            inputId.value = studentToEdit.id;
            inputId.readOnly = true; // Không cho sửa Mã SV
            inputName.value = studentToEdit.name;
            inputDob.value = studentToEdit.dob;
            inputClass.value = studentToEdit.className;
            inputScore.value = studentToEdit.score;
            inputEmail.value = studentToEdit.email;

            studentModal.classList.remove('hidden'); // Mở form lên
        }
    }
});

// CHẠY LẦN ĐẦU TIÊN KHI TẢI TRANG
renderStudents();