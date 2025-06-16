// Toggle dropdown bộ lọc
function toggleFilterDropdown() {
  const dropdown = document.getElementById('filterDropdown');
  dropdown.classList.toggle('hidden');
}

// Toggle Like hoặc Dislike (áp dụng cho cả bài viết & bình luận)
function toggleLike(element) {
  const parent = element.closest('.post-actions') || element.closest('.comment-actions');
  parent.querySelector('.dislike-action')?.classList.remove('disliked');
  element.classList.toggle('liked');
}
function toggleDislike(element) {
  const parent = element.closest('.post-actions') || element.closest('.comment-actions');
  parent.querySelector('.like-action')?.classList.remove('liked');
  element.classList.toggle('disliked');
}

// Ẩn/hiện phần bình luận của bài viết
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.comment-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sec = btn.closest('.post-card')?.querySelector('.comments-section');
      sec?.classList.toggle('hidden');
    });
  });
});

// Toggle menu 3 chấm trong phần bài viết
function togglePostOptions(icon) {
  icon.nextElementSibling.classList.toggle('hidden');
}

// Toggle menu 3 chấm trong phần bình luận
function toggleCommentOptions(icon) {
  icon.nextElementSibling.classList.toggle('hidden');
}

// Mở/đóng modal tạo bài viết
function openPostModal() {
  document.getElementById('postModalOverlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = '15px';
}

function closePostModal() {
  document.getElementById('postModalOverlay').classList.add('hidden');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}

function submitPost() {
  alert('Bài viết đã được đăng!');
  closePostModal();
}

// Ẩn mọi dropdown khi click ngoài
document.addEventListener('click', function (e) {
  if (!e.target.closest('.filter-wrapper')) {
    document.getElementById('filterDropdown')?.classList.add('hidden');
  }
  document.querySelectorAll('.post-header-options, .comment-header-options')
    .forEach(container => {
      if (!container.contains(e.target)) {
        container.querySelector('.more-options-dropdown')?.classList.add('hidden');
      }
    });

  const overlay = document.getElementById('postModalOverlay');

  if (overlay) {
    overlay.addEventListener('click', function (e) {
      const modal = overlay.querySelector('.post-modal');
      // Nếu click KHÔNG nằm trong modal, thì đóng
      if (modal && !modal.contains(e.target)) {
        closePostModal();
      }
    });
  }
});
const titleInput = document.getElementById('postTitle');
const contentInput = document.getElementById('postContent');
const submitBtn = document.getElementById('submitBtn');

function checkInput() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title && content) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

titleInput.addEventListener('input', checkInput);
contentInput.addEventListener('input', checkInput);

function toggleTagPopup() {
  document.getElementById('tagPopup').classList.toggle('hidden');
}

function closeTagPopup() {
  document.getElementById('tagPopup').classList.add('hidden');
}

function addTag() {
  const tag = document.querySelector('.tag-input').value.trim();
  if (tag) {
    alert(`Đã thêm thẻ: ${tag}`);
    // Thêm xử lý thêm thẻ ở đây nếu cần
    document.querySelector('.tag-input').value = '';
    closeTagPopup();
  }
}

function openDeletePopup() {
  document.getElementById('deletePopup').classList.remove('hidden');
}

function closeDeletePopup() {
  document.getElementById('deletePopup').classList.add('hidden');
}

function confirmDelete() {
  alert("Xóa thành công!");
  closeDeletePopup();
}

// sửa bài viết 
function openEditPostModal() {
  document.getElementById("editPostModalOverlay").classList.remove("hidden");
}

function closeEditPostModal() {
  document.getElementById("editPostModalOverlay").classList.add("hidden");
}

function submitEditPost() {
  // Xử lý logic lưu bài viết đã sửa tại đây (nếu cần)
  alert("Đã lưu bài viết");
  closeEditPostModal();
}
function toggleNotificationDropdown() {
    const dropdown = document.getElementById("notificationDropdown");
    dropdown.classList.toggle("hidden");
}
document.addEventListener("click", function (event) {
    const dropdown = document.getElementById("notificationDropdown");
    const bell = document.querySelector(".notify-circle");

    if (!bell.contains(event.target)) {
        dropdown.classList.add("hidden");
    }
});
