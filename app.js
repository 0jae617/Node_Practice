// 기본 세팅
const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

// 미들웨어 등록
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// public 경로 설정
app.use(express.static('public'));

// DB 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dudwo@03',  // MySQL의 root 비밀번호
    database: 'nodepractice',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});


// 홈페이지 접속 설정
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
})

// 홈페이지 로그인 기능 설정
app.post('/', (req, res) => {
    const { id, password } = req.body;
    console.log(id, password);

    const sql = 'SELECT * FROM users WHERE id = ? AND password = ?';
    db.query(sql, [id, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid ID or password' });
        }
    });
});


// 회원가입 접속 설정
app.get('/signup', (req, res) => {
    res.sendFile(`${__dirname}/public/signup.html`);
})

// 회원가입 post 메서드 설정
app.post('/signup', (req, res) => {
    const {id, username, password, email} = req.body;
    
    if (!username || !id || !password || !email) {
        return res.status(400).send('All fields are required');
    }

    const sqlINSERT = 'INSERT INTO users (id, username, password, email) VALUES (?, ?, ?, ?)';
    db.query(sqlINSERT, [id, username, password, email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }
        res.status(200).send('User registered successfully');
    });
});


// 서버 접속
app.listen(PORT, ()=>{
    console.log(`Server is running successfully on port ${PORT}`);
});


module.exports = app;