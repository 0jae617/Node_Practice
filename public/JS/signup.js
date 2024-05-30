"use strict";
console.log("signup script Operating Successfully!");

document.getElementById('signup').addEventListener('click', async function(event){
    event.preventDefault();
    
    // 회원 정보 가져와서 일시적으로 담기
    const username = document.getElementById('username').value;
    const id = document.getElementById('id').value;
    const password = document.getElementById('psword').value;
    const email = document.getElementById('email').value;
    
    try{
        const res = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, username, password, email })
        });
        if(!res.ok){
            const errorResult = await res.json();
            throw new Error(errorResult.error || 'Unknown error');
        }
        
        const result = await res.json();
        alert(result.message);
        window.location.href = '/';
    }catch(error){
        console.error('Error:', error);
        alert(`회원가입 중 오류가 발생했습니다: ${error.message}`);
    }
});