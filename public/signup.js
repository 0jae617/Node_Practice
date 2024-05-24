"use strict";
console.log("signup script Operating Successfully!");

document.getElementById('signup').addEventListener('click', async function(event){
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const id = document.getElementById('id').value;
    const password = document.getElementById('psword').value;
    const email = document.getElementById('email').value;
    
    try {
        const res = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, username, password, email })
        });
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const result = await res.text();
        alert(result);
        window.location.href = '/';
    } catch (error) {
        console.error('Error:', error);
        alert('회원가입 중 오류가 발생했습니다!');
    }
});






// function signUp() {
//     // HTML 입력 요소에서 사용자 입력값 가져오기
//     const username = document.querySelector('#username').value;
//     const id = document.querySelector('#id').value;
//     const password = document.querySelector('#psword').value;
//     const email = document.querySelector('#email').value;

//     const user = {
//         username,
//         id,
//         password,
//         email,
//     };

//     console.log(JSON.stringify(user));
// }

// 버튼 클릭 이벤트에 회원가입 함수 연결
//document.querySelector('#signup').addEventListener('click', signUp);