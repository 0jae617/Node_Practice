"use strict";

document.addEventListener('DOMContentLoaded', () => {  // posts 목록 가져오기
    fetch('/dashboard_posts')
        .then(res => res.json())  // HTTP 요청 성공 시 res.body 파싱
        .then(posts => {
            const postsContainer = document.getElementById('posts');
            posts.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.className = 'post';
                postDiv.dataset.id = post.post_id;
                postDiv.innerHTML = `<h2>${post.title}</h2><p>${post.author}</p>`;
                postDiv.addEventListener('click', () => showPost(post.post_id));
                postsContainer.appendChild(postDiv);
            });
        })
        .catch(error => console.error('Error during fetching posts:', error));


    function deletePost(id) {   // 게시물 삭제 함수
        fetch(`/dashboard_posts/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
            alert('게시물 삭제 성공');
            location.reload();
            } else {
            alert(`게시물 삭제 실패: ${result.message}`);
            }
        })
        .catch(error => console.error('Error deleting post:', error));
        }


    function showPost(postId){   // 게시물 불러오기 함수
        fetch(`/dashboard_posts/${postId}`)
            .then(res => res.json())
            .then(post => {
                document.getElementById('post-title').textContent = post.title;
                document.getElementById('post-author').textContent = `Author: ${post.author}`;
                document.getElementById('post-body').textContent = post.content;
                document.getElementById('post-content').style.display = 'block';

                const deleteButton = document.getElementById('delete-button');  // 삭제 버튼에 게시자 ID 전달
                deleteButton.onclick = function() {
                    deletePost(postId);
                };
            })
            .catch(error => console.error('Error fetching post:', error));
    }
});