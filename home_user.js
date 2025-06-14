// Toggle dropdown bộ lọc
function toggleDropdown() {
  const dropdown = document.getElementById('filterDropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Ẩn dropdown bộ lọc nếu click ra ngoài
document.addEventListener('click', function (e) {
  const filterWrapper = document.querySelector('.filter-wrapper');
  if (filterWrapper && !filterWrapper.contains(e.target)) {
    const dropdown = document.getElementById('filterDropdown');
    if (dropdown) {
      dropdown.style.display = 'none';
    }
  }
});

// Toggle Like
function toggleLike(element) {
  const parent = element.closest('.post-actions') || element.closest('.comment-actions');
  const dislike = parent.querySelector('.dislike-action');

  element.classList.toggle('liked');
  if (dislike) dislike.classList.remove('disliked');
}

// Toggle Dislike
function toggleDislike(element) {
  const parent = element.closest('.post-actions') || element.closest('.comment-actions');
  const like = parent.querySelector('.like-action');

  element.classList.toggle('disliked');
  if (like) like.classList.remove('liked');
}

// Toggle hiển thị bình luận
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.comment-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const postCard = btn.closest('.post-card');
      const commentSection = postCard.querySelector('.comments-section');
      if (commentSection) {
        commentSection.classList.toggle('hidden');
      }
    });
  });
});

// Toggle dropdown 3 chấm (bài viết)
function togglePostOptions(icon) {
  const dropdown = icon.nextElementSibling;
  dropdown.classList.toggle("hidden");
}

// Ẩn dropdown 3 chấm nếu click ra ngoài
document.addEventListener("click", function (e) {
  document.querySelectorAll(".post-header-options").forEach(container => {
    if (!container.contains(e.target)) {
      const dropdown = container.querySelector(".more-options-dropdown");
      if (dropdown) dropdown.classList.add("hidden");
    }
  });
});
