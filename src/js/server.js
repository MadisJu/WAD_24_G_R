const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

app.use(express.json());
app.use(cookieParser());

// ADD POST
app.post('/api/posts', async (req, res) => {
    try {
        const { title, text, author_id } = req.body;
        const date = new Date().toISOString();
        
        const newPost = await pool.query(
            'INSERT INTO "Posts" ("Title", "Text", "Date", "Likes", "Author_ID") VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, text, date, 0, author_id]
        );
        
        res.status(201).json(newPost.rows[0]);
    } 
    catch (err) 
    {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// ALL POSTS
app.get('/api/posts', async (req, res) => {
    try {
        const allPosts = await pool.query(
            'SELECT * FROM "Posts" ORDER BY "Date" DESC'
        );
        const transformedPosts = allPosts.rows.map(post => ({
            postId: post.id,
            title: post.Title,
            text: post.Text,
            date: post.Date,
            author_id: post.Author_ID,
            like_count: post.Likes
        }));
        res.json(transformedPosts);
    } 
    catch (err) 
    {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});


//POST BY ID
app.get('/api/posts/:id', async (req, res) => 
    {
    try {
        const { id } = req.params;
        const post = await pool.query(
            "SELECT * FROM Posts WHERE id = $1",
            [id]
        );
        
        if (post.rows.length === 0) {
            return res.status(404).json({ error: "Post not found" });
        }
        
        res.json(post.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});