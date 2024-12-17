const express = require('express');
const { pool } = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const createTables = require('./database').createTables;

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

app.use(express.json());
app.use(cookieParser());

createTables().then(() => {
    console.log("Tables created successfully.");
}).catch(err => {
    console.error("Error creating tables:", err);
});

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
            ID: Number(post.ID),
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
            'SELECT * FROM "Posts" WHERE "ID" = $1',
            [parseInt(id)]
        );
        
        if (post.rows.length === 0) {
            return res.status(404).json({ error: "Post not found" });
        }
        
        res.json(post.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" + err.message });
    }
});

//ADD LIKE TO POST
app.post('/api/posts/:id/like', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'UPDATE "Posts" SET "Likes" = "Likes" + 1 WHERE "ID" = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json(result.rows[0]); // Return the updated post
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

//DELETE ALL POSTS
app.delete('/api/posts', async (req, res) => {
    try {
        await pool.query('DELETE FROM "Posts"');
        res.status(200).json({ message: "All posts deleted successfully." });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});