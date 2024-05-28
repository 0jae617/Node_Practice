"use strict";
console.log("index script Operating Successfully!"); // 오류 없음 확인

let autho = 0;

// 로그인 API 구현
document.getElementById('login').addEventListener('click', async function(event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 막음

    const id = document.getElementById('id').value;
    const password = document.getElementById('psword').value;

    try{
        const res = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, password })
        });
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        document.getElementById('message').textContent = result.message;
        autho = 1;
    }catch (error){
        console.error('Error:', error);
        alert('로그인 중 오류가 발생했습니다!');
    }
});

function moveToSignup(){ // '/signup' 경로로 이동
    window.location.href = "/signup";
}

function moveToDash(){
    if(autho == 1){
        window.location.href = "/dashboard";
    }
    else{
        alert("로그인 해주십시오!");
    }
}