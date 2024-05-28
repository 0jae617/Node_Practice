"use strict";

document.addEventListener('DOMContentLoaded', function() {
    // 서버로부터 게시물 데이터를 가져와서 표시하는 부분
    fetch('/posts')
        .then(response => response.json())
        .then(data => {
            const postsContainer = document.getElementById('posts');
            data.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <span>${post.title} - ${post.author}</span>
                    <div class="buttons">
                        <button onclick="deletePost(${post.id})">삭제</button>
                    </div>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
});

function deletePost(id) {
    fetch(`/posts/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            // 게시물 삭제 후 목록 갱신
            location.reload();
        } else {
            alert('게시물 삭제 실패');
        }
    })
    .catch(error => console.error('Error deleting post:', error));
}
