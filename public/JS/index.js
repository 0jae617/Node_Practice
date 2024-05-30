"use strict";
console.log("index script Operating Successfully!"); // 오류 없음 확인

let autho = 0;

// 로그인 API 구현
document.getElementById('login').addEventListener('click', async function(event){
    event.preventDefault(); // 폼의 기본 제출 동작을 막음

    const id = document.getElementById('id').value;
    const password = document.getElementById('psword').value;

    try{  // login 버튼 누르면 POST 요청 실행
        const res = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, password })
        });
        if(!res.ok){  // 오류 발생 시 오류메세지 저장
            const errorResult = await res.json();
            throw new Error(errorResult.error || 'Unknown error');
        }
        
        const result = await res.json();
        document.getElementById('message').textContent = result.message;
        autho = 1;
    }catch(error){
        console.error('Error:', error);
        alert(`로그인 중 오류가 발생했습니다: ${error.message}`);
    }
});


function moveToSignup(){ // '/signup' 경로로 이동
    window.location.href = "/signup";
}

function moveToDash(){ // 게시판 이동 함수
    if(autho == 1){
        window.location.href = "/dashboard";
    }
    else{
        alert("로그인 후 이용 바랍니다");
    }
}