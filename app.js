// 기본 setting
const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

// 미들웨어 등록
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// public 경로 설정
app.use(express.static('public'));

// DB setting
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dudwo@03',  // MySQL의 root 비밀번호
    database: 'nodepractice',
});

db.connect((err) => {
    if(err){
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});


// 홈페이지 접속 setting
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
})

// 홈페이지 로그인 기능 setting
app.post('/', (req, res) => {
    const { id, password } = req.body;
    console.log(id, password);         // 아이디 비밀번호 입력 확인

    const sql = 'SELECT * FROM users WHERE id = ? AND password = ?';
    db.query(sql, [id, password], (err, results) => {
        if(err){
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
        if(results.length > 0){
            res.status(200).json({ message: 'Login successful' });
        }else{
            res.status(401).json({ message: 'Invalid ID or password' });
        }
    });
});


// 회원가입 page 접속 setting
app.get('/signup', (req, res) => {
    res.sendFile(`${__dirname}/public/signup.html`);
})

// 회원가입 실행 메서드 setting
app.post('/signup', (req, res) => {
    const {id, username, password, email} = req.body;
    
    if(!username || !id || !password || !email) {
        return res.status(400).send('All fields are required');
    }

    const sqlINSERT = 'INSERT INTO users (id, username, password, email) VALUES (?, ?, ?, ?)';
    db.query(sqlINSERT, [id, username, password, email], (err, result) => {
        if(err){
            console.error(err);
            return res.status(500).send('Server error');
        }
        res.status(200).send('User registered successfully');
    });
});


// DASHBOARD 접속 setting
app.get('/dashboard', (req, res) => {
    res.sendFile(`${__dirname}/public/dashboard.html`);
})

// DASHBOARD 에 posts 목록 불러오기
app.get('/dashboard_posts', (req, res) => {
    const sql = 'SELECT title, author, post_id FROM posts';
    db.query(sql, (err, results) => {
        if(err){
            console.error(err);
            return res.status(500).send('Database query error');
        }
        res.json(results);
    });
});

// DASHBOARD 에 특정 게시글 내용 가져오기
app.get('/dashboard_posts/:id', (req, res) => {
    const postId = req.params.id;
    const sql = 'SELECT title, author, content FROM posts WHERE post_id = ?';
    db.query(sql, [postId], (err, results) => {
        if(err) {
            console.error(err);
            return res.status(500).send('Database query error');
        }
        if(results.length === 0) {
            return res.status(404).send('Post not found');
        }
        res.json(results[0]);
    });
});


// Posting Page 접속 setting
app.get('/write', (req, res) => {
    res.sendFile(__dirname + '/public/write.html');
});

// Post 작성 setting
app.post('/posts', (req, res) => {
    const { title, author, content } = req.body;

    if(!title || !author || !content){
        return res.status(400).send('All fields are required');
    }
    const sql = 'INSERT INTO posts (title, author, content) VALUES (?, ?, ?)';
    db.query(sql, [title, author, content], (err, result) => {
        if(err){
            console.error('Error inserting data into the database:', err);
            return res.status(500).send('Server error');
        }
        res.status(200).json({ success: true, message: 'posting success!' });
    });
});


// 서버 시작
app.listen(PORT, ()=>{
    console.log(`Server is running successfully on port ${PORT}`);
});


module.exports = app;