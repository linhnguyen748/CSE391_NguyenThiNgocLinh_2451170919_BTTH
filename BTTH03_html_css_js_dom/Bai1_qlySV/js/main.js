document.addEventListener('DOMContentLoaded', function () {
  const STORAGE_KEY = 'students';
  const btnAddStudent = document.getElementById('btnAddStudent');
  const modal = document.getElementById('modal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnCancel = document.getElementById('btnCancel');
  const studentForm = document.getElementById('studentForm');
  const formModeInput = document.getElementById('formMode');
  const editingIdInput = document.getElementById('editingId');
  const studentIdInput = document.getElementById('studentId');
  const studentNameInput = document.getElementById('studentName');
  const studentDobInput = document.getElementById('studentDob');
  const studentClassInput = document.getElementById('studentClass');
  const studentGpaInput = document.getElementById('studentGpa');
  const studentEmailInput = document.getElementById('studentEmail');
  const tbody = document.getElementById('studentTableBody');
  const messageEl = document.getElementById('message');
  const totalStudentsEl = document.getElementById('totalStudents');
  const avgScoreEl = document.getElementById('avgScore');
  const modalTitle = document.getElementById('modalTitle');

  let students = [];

  function loadStudents() {
    const raw = localStorage.getItem(STORAGE_KEY);
    try {
      students = raw ? JSON.parse(raw) : [];
    } catch (e) {
      students = [];
    }
  }

  function saveStudents() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }

  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('vi-VN');
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>"']/g, function (m) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m];
    });
  }

  function updateStatistics() {
    const total = students.length;
    const avg = total === 0 ? 0 : students.reduce(function (sum, s) { return sum + Number(s.gpa || 0); }, 0) / total;
    totalStudentsEl.textContent = String(total);
    avgScoreEl.textContent = avg.toFixed(2);
  }

  function renderStudents() {
    tbody.innerHTML = '';
    if (students.length === 0) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 7;
      td.className = 'empty';
      td.textContent = 'Chưa có dữ liệu sinh viên.';
      tr.appendChild(td);
      tbody.appendChild(tr);
      updateStatistics();
      return;
    }
    students.forEach(function (s) {
      const tr = document.createElement('tr');
      tr.innerHTML = '' +
        '<td>' + escapeHtml(s.code) + '</td>' +
        '<td>' + escapeHtml(s.name) + '</td>' +
        '<td>' + formatDate(s.dob) + '</td>' +
        '<td>' + escapeHtml(s.className) + '</td>' +
        '<td>' + Number(s.gpa).toFixed(2) + '</td>' +
        '<td>' + escapeHtml(s.email) + '</td>' +
        '<td>' +
          '<button class="btn small btn-edit" data-id="' + s.id + '">Sửa</button> ' +
          '<button class="btn small btn-danger btn-delete" data-id="' + s.id + '">Xóa</button>' +
        '</td>';
      tbody.appendChild(tr);
    });
    updateStatistics();
  }

  function showMessage(text, type) {
    messageEl.textContent = text;
    if (type === 'error') messageEl.classList.add('error'); else messageEl.classList.remove('error');
    clearTimeout(showMessage._t);
    showMessage._t = setTimeout(function () { messageEl.textContent = ''; messageEl.classList.remove('error'); }, 3000);
  }

  function openModal(mode, student) {
    formModeInput.value = mode;
    if (mode === 'add') {
      modalTitle.textContent = 'Thêm sinh viên';
      editingIdInput.value = '';
      studentForm.reset();
    } else if (mode === 'edit' && student) {
      modalTitle.textContent = 'Cập nhật sinh viên';
      editingIdInput.value = student.id;
      studentIdInput.value = student.code || '';
      studentNameInput.value = student.name || '';
      studentDobInput.value = student.dob || '';
      studentClassInput.value = student.className || '';
      studentGpaInput.value = student.gpa || '';
      studentEmailInput.value = student.email || '';
    }
    modal.classList.remove('hidden');
    studentIdInput.focus();
  }

  function closeModal() {
    modal.classList.add('hidden');
    studentForm.reset();
    formModeInput.value = 'add';
    editingIdInput.value = '';
  }

  btnAddStudent.addEventListener('click', function () { openModal('add'); });
  btnCloseModal.addEventListener('click', closeModal);
  btnCancel.addEventListener('click', closeModal);
  window.addEventListener('click', function (ev) { if (ev.target === modal) closeModal(); });

  studentForm.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (!studentForm.checkValidity()) { studentForm.reportValidity(); return; }
    const code = studentIdInput.value.trim();
    const name = studentNameInput.value.trim();
    const dob = studentDobInput.value;
    const className = studentClassInput.value.trim();
    const gpa = parseFloat(studentGpaInput.value);
    const email = studentEmailInput.value.trim();
    if (!(code && name && dob && className && !Number.isNaN(gpa) && email)) { showMessage('Vui lòng nhập đầy đủ thông tin hợp lệ.', 'error'); return; }
    const mode = formModeInput.value;
    if (mode === 'add') {
      if (students.some(function (s) { return s.code === code; })) { showMessage('Mã sinh viên đã tồn tại.', 'error'); return; }
      const newStudent = { id: Date.now().toString(), code: code, name: name, dob: dob, className: className, gpa: gpa, email: email };
      students.push(newStudent);
      saveStudents();
      renderStudents();
      closeModal();
      showMessage('Đã thêm sinh viên.');
    } else if (mode === 'edit') {
      const id = editingIdInput.value;
      const index = students.findIndex(function (s) { return s.id === id; });
      if (index === -1) { showMessage('Không tìm thấy sinh viên để cập nhật.', 'error'); return; }
      if (students.some(function (s) { return s.code === code && s.id !== id; })) { showMessage('Mã sinh viên đã tồn tại.', 'error'); return; }
      students[index] = Object.assign({}, students[index], { code: code, name: name, dob: dob, className: className, gpa: gpa, email: email });
      saveStudents();
      renderStudents();
      closeModal();
      showMessage('Đã cập nhật sinh viên.');
    }
  });

  tbody.addEventListener('click', function (ev) {
    const btn = ev.target.closest('button');
    if (!btn) return;
    const id = btn.dataset.id;
    if (btn.classList.contains('btn-edit')) {
      const student = students.find(function (s) { return s.id === id; });
      if (student) openModal('edit', student);
      return;
    }
    if (btn.classList.contains('btn-delete')) {
      const student = students.find(function (s) { return s.id === id; });
      if (!student) return;
      if (!confirm('Xác nhận xóa sinh viên ' + student.code + ' - ' + student.name + '?')) return;
      students = students.filter(function (s) { return s.id !== id; });
      saveStudents();
      renderStudents();
      showMessage('Đã xóa sinh viên.');
    }
  });

  loadStudents();
  renderStudents();
});
