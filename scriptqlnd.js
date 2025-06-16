document.addEventListener('DOMContentLoaded', () => {
    const userTableBody = document.getElementById('userTableBody');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const currentPageSpan = document.getElementById('currentPageSpan');

    // Modal elements (Delete Modal)
    const deleteModal = document.getElementById('deleteModal');
    const closeDeleteModalBtn = document.querySelector('#deleteModal .close-button'); // Specific selector for delete modal's close button
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

    // NEW: Modal elements (Lock Modal)
    const lockModal = document.getElementById('lockModal');
    const closeLockModalBtn = document.querySelector('.lock-modal-close-button'); // Specific selector for lock modal's close button
    const lockDurationSelect = document.getElementById('lockDurationSelect');
    const confirmLockBtn = document.getElementById('confirmLockBtn');
    const cancelLockBtn = document.getElementById('cancelLockBtn');


    // Toast Notification element
    const toastNotification = document.getElementById('toastNotification');

    let userToDeleteId = null;
    let userToLockId = null; // NEW: To store the ID of the user to be locked

    // Dữ liệu người dùng (Sử dụng `let` để có thể sửa đổi mảng này)
    // NEW: Thêm thuộc tính `isLocked: false` và `lockDuration: null` cho mỗi người dùng
    let allUsers = [
        { id: 1, stt: 1, hoTen: "Trần Văn Sơn", ngaySinh: "16/09/2002", sdt: "0123456789", diaChi: "Hà Nội", gioiTinh: "Nam", email: "son123@gmail.com", isLocked: false, lockDuration: null },
        { id: 2, stt: 2, hoTen: "Nguyễn Thị Hoa", ngaySinh: "20/03/2001", sdt: "0987654321", diaChi: "TP. Hồ Chí Minh", gioiTinh: "Nữ", email: "hoa.nguyen@example.com", isLocked: false, lockDuration: null },
        { id: 3, stt: 3, hoTen: "Lê Minh Tuấn", ngaySinh: "05/11/2000", sdt: "0112233445", diaChi: "Đà Nẵng", gioiTinh: "Nam", email: "tuan.le@example.com", isLocked: false, lockDuration: null },
        { id: 4, stt: 4, hoTen: "Phạm Thu Hằng", ngaySinh: "10/07/2003", sdt: "0667788990", diaChi: "Hải Phòng", gioiTinh: "Nữ", email: "hang.pham@example.com", isLocked: false, lockDuration: null },
        { id: 5, stt: 5, hoTen: "Hoàng Đình Lộc", ngaySinh: "25/01/1999", sdt: "0334455667", diaChi: "Cần Thơ", gioiTinh: "Nam", email: "loc.hoang@example.com", isLocked: false, lockDuration: null },
        { id: 6, stt: 6, hoTen: "Đỗ Thị Mai", ngaySinh: "14/05/2002", sdt: "0223344556", diaChi: "Huế", gioiTinh: "Nữ", email: "mai.do@example.com", isLocked: false, lockDuration: null },
        { id: 7, stt: 7, hoTen: "Trần Đăng Khoa", ngaySinh: "01/02/2000", sdt: "0778899001", diaChi: "Nha Trang", gioiTinh: "Nam", email: "khoa.tran@example.com", isLocked: false, lockDuration: null },
        { id: 8, stt: 8, hoTen: "Vũ Thanh Mai", ngaySinh: "19/08/2001", sdt: "0556677889", diaChi: "Vũng Tàu", gioiTinh: "Nữ", email: "mai.vu@example.com", isLocked: false, lockDuration: null },
        { id: 9, stt: 9, hoTen: "Ngô Văn Khải", ngaySinh: "29/04/1998", sdt: "0445566778", diaChi: "Biên Hòa", gioiTinh: "Nam", email: "khai.ngo@example.com", isLocked: false, lockDuration: null },
        { id: 10, stt: 10, hoTen: "Đinh Phương Anh", ngaySinh: "07/12/2003", sdt: "0101010101", diaChi: "Bình Dương", gioiTinh: "Nữ", email: "anh.dinh@example.com", isLocked: false, lockDuration: null },
        { id: 11, stt: 11, hoTen: "Chu Quốc Anh", ngaySinh: "03/06/2002", sdt: "0998877665", diaChi: "Đồng Nai", gioiTinh: "Nam", email: "anh.chu@example.com", isLocked: false, lockDuration: null },
        { id: 12, stt: 12, hoTen: "Lý Thị Kim", ngaySinh: "11/01/2001", sdt: "0887766554", diaChi: "Long An", gioiTinh: "Nữ", email: "kim.ly@example.com", isLocked: false, lockDuration: null }
    ];

    const rowsPerPage = 6;
    let currentPage = 1;
    let currentTotalPages = Math.ceil(allUsers.length / rowsPerPage);

    function renderTable(page) {
        userTableBody.innerHTML = '';
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedUsers = allUsers.slice(start, end);

        paginatedUsers.forEach(user => {
            const row = document.createElement('tr');
            // Thêm class 'disabled' cho nút khóa nếu người dùng bị khóa
            const lockButtonClass = user.isLocked ? "btn btn-lock disabled" : "btn btn-lock";
            const lockButtonDisabled = user.isLocked ? "disabled" : "";

            row.innerHTML = `
                <td>${user.stt}</td>
                <td>${user.hoTen}</td>
                <td>${user.ngaySinh}</td>
                <td>${user.sdt}</td>
                <td>${user.diaChi}</td>
                <td>${user.gioiTinh}</td>
                <td>${user.email}</td>
                <td>
                    <button class="${lockButtonClass}" data-user-id="${user.id}" ${lockButtonDisabled}>Khóa</button>
                    <button class="btn btn-delete" data-user-id="${user.id}">Xóa</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });

        updatePaginationControls();
        addDeleteButtonListeners();
        addLockButtonListeners(); // NEW: Add listeners for lock buttons
    }

    function updatePaginationControls() {
        currentTotalPages = Math.ceil(allUsers.length / rowsPerPage);
        if (currentTotalPages === 0) {
            currentPageSpan.textContent = `0/0`;
        } else {
            currentPageSpan.textContent = `${currentPage}/${currentTotalPages}`;
        }

        if (currentPage <= 1) {
            prevPageBtn.classList.add('disabled');
        } else {
            prevPageBtn.classList.remove('disabled');
        }

        if (currentPage >= currentTotalPages || currentTotalPages === 0) {
            nextPageBtn.classList.add('disabled');
        } else {
            nextPageBtn.classList.remove('disabled');
        }
    }

    function addDeleteButtonListeners() {
        const deleteButtons = document.querySelectorAll('.btn-delete');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                userToDeleteId = event.target.dataset.userId;
                deleteModal.style.display = 'flex';
            });
        });
    }

    // NEW: Function to add event listeners to lock buttons
    function addLockButtonListeners() {
        const lockButtons = document.querySelectorAll('.btn-lock');
        lockButtons.forEach(button => {
            // Only add event listener if button is not disabled
            if (!button.classList.contains('disabled')) {
                button.addEventListener('click', (event) => {
                    userToLockId = event.target.dataset.userId;
                    lockModal.style.display = 'flex'; // Show the lock modal
                    lockDurationSelect.value = "1"; // Reset select to default '1 ngày'
                });
            }
        });
    }

    // Function to show toast notification
    function showToast(message, duration = 3000) {
        toastNotification.textContent = message;
        toastNotification.classList.add('show');
        toastNotification.style.display = 'block'; // Ensure it's block before showing

        // Hide after 'duration' milliseconds
        setTimeout(() => {
            toastNotification.classList.remove('show');
            // Optional: Hide completely after transition for accessibility
            setTimeout(() => {
                 toastNotification.style.display = 'none';
            }, 500); // Should match CSS transition duration
        }, duration);
    }


    // Modal Event Listeners (Delete Modal)
    closeDeleteModalBtn.addEventListener('click', () => {
        deleteModal.style.display = 'none';
        userToDeleteId = null;
    });

    cancelDeleteBtn.addEventListener('click', () => {
        deleteModal.style.display = 'none';
        userToDeleteId = null;
    });

    confirmDeleteBtn.addEventListener('click', () => {
        if (userToDeleteId) {
            const initialUserCount = allUsers.length;
            allUsers = allUsers.filter(user => user.id != userToDeleteId);
            const userWasDeleted = (allUsers.length < initialUserCount);

            if (userWasDeleted) {
                const newTotalPages = Math.ceil(allUsers.length / rowsPerPage);

                if (currentPage > newTotalPages && newTotalPages > 0) {
                    currentPage = newTotalPages;
                } else if (newTotalPages === 0) {
                    currentPage = 1;
                }
                renderTable(currentPage);
                showToast("Xóa thành công");
            } else {
                 console.log("Không tìm thấy người dùng để xóa.");
            }
        }
        deleteModal.style.display = 'none';
        userToDeleteId = null;
    });

    // NEW: Modal Event Listeners (Lock Modal)
    closeLockModalBtn.addEventListener('click', () => {
        lockModal.style.display = 'none';
        userToLockId = null;
    });

    cancelLockBtn.addEventListener('click', () => {
        lockModal.style.display = 'none';
        userToLockId = null;
    });

    confirmLockBtn.addEventListener('click', () => {
        if (userToLockId) {
            const lockDuration = lockDurationSelect.value;
            // Find the user and update their locked status
            const userIndex = allUsers.findIndex(user => user.id == userToLockId);
            if (userIndex !== -1) {
                allUsers[userIndex].isLocked = true;
                allUsers[userIndex].lockDuration = `${lockDuration} ngày`;
                renderTable(currentPage); // Re-render table to update button state
                showToast(`Người dùng ${allUsers[userIndex].hoTen} đã bị khóa ${lockDuration} ngày`);
            } else {
                console.log(`Không tìm thấy người dùng với ID: ${userToLockId} để khóa.`);
            }
        }
        lockModal.style.display = 'none'; // Hide lock modal
        userToLockId = null; // Reset ID
    });


    // Close any modal if the user clicks anywhere outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === deleteModal) {
            deleteModal.style.display = 'none';
            userToDeleteId = null;
        }
        if (event.target === lockModal) { // Handle clicking outside lock modal
            lockModal.style.display = 'none';
            userToLockId = null;
        }
    });


    // Event Listeners for pagination
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable(currentPage);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < currentTotalPages) {
            currentPage++;
            renderTable(currentPage);
        }
    });

    // Initial render
    renderTable(currentPage);
});