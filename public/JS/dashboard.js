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
});

function showPost(postId){
    fetch(`/dashboard_posts/${postId}`)
        .then(res => res.json())
        .then(post => {
            document.getElementById('post-title').textContent = post.title;
            document.getElementById('post-author').textContent = `Author: ${post.author}`;
            document.getElementById('post-body').textContent = post.content;
            document.getElementById('post-content').style.display = 'block';
        })
        .catch(error => console.error('Error fetching post:', error));
}


// async function deletePost(postId){
//     fetch(`/dashboard_posts/${id}`, {
//         method: 'DELETE'
//     })
//     .then(response => response.json())
//     .then(result => {
//         if(result.success){
//             // 게시물 삭제 후 페이지 리로드
//             location.reload();
//         }else{
//             alert('게시물 삭제 실패');
//         }
//     })
//     .catch(error => console.error('Error deleting post:', error));
// }
