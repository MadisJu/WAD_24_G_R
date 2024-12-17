const express = require('express');
const { pool } = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const createTables = require('./database').createTables;

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: ['http://localhost:8080', 'http://localhost:8081'], credentials: true }));

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


// CREATE JWT
const secret = "gdgdhdbcb770785rgdzqws"

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: "1h" })
        //jwt.sign(payload, secret, [options, callback]), and it returns the JWT as string
}

// is used to check whether a user is authinticated
app.get('/auth/authenticate', async(req, res) => {
    console.log('authentication request has been arrived');
    const token = req.cookies.jwt; // assign the token named jwt to the token const
    let authenticated = false; // a user is not authenticated until proven the opposite
    try {
        if (token) { //checks if the token exists
            //jwt.verify(token, secretOrPublicKey, [options, callback]) verify a token
            await jwt.verify(token, secret, (err) => { //token exists, now we try to verify it
                if (err) { // not verified, redirect to login page
                    console.log(err.message);
                    console.log('token is not verified');
                    res.send({ "authenticated": authenticated }); // authenticated = false
                } else { // token exists and it is verified 
                    console.log('author is authinticated');
                    authenticated = true;
                    res.send({ "authenticated": authenticated }); // authenticated = true
                }
            })
        } else { //applies when the token does not exist
            console.log('author is not authinticated');
            res.send({ "authenticated": authenticated }); // authenticated = false
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.post('/auth/signup', async(req, res) => {
    try {
        console.log("a signup request has arrived");
        const { email, username, password } = req.body;

        const userExists = await pool.query(
            'SELECT * FROM "Users" WHERE "Email" = $1',
            [email]
          );
      
          if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "User with this email already exists." });
          }
        

        const salt = await bcrypt.genSalt(); 
        const bcryptPassword = await bcrypt.hash(password, salt) 
        const authUser = await pool.query( 
            'INSERT INTO "Users" ("Email", "Username","Password") values ($1, $2, $3) RETURNING*', [email, username, bcryptPassword]
        );
        console.log(authUser.rows[0]["ID"]);
        const token = await generateJWT(authUser.rows[0]["ID"]);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0]["ID"], token })
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

const findUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM "Users" WHERE "Email" = $1', [email]);
    return result.rows[0];
};

app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        
        if (!user) {
            return res.status(401).json({ error: "User is not registered" });
        }

        const validPassword = await bcrypt.compare(password, user.Password);

        if (!validPassword) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        const token = await generateJWT(user.id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.id });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(401).json({ error: error.message });
    }
});


app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" });
});


app.listen(port, () => {
    console.log("Server is listening to port " + port)
});