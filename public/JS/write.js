"use strict";

document.getElementById('writeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;

    fetch('/write', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author, content })
    })
    .then(res => res.json())
    .then(result => {
        if(result.success){
            alert('게시글이 성공적으로 작성되었습니다.');
            window.location.href = '/dashboard'; // 게시글 작성 후 메인 페이지로 이동
        }else{
            alert(`게시글 작성에 실패했습니다: All fields are required`);
        }
    })
    .catch(error => console.error('Error:', error));
});