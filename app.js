const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let posts = [];

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.static('public')); // Serve static files from the 'public' directory

app.set('view engine', 'ejs'); // Set the view engine to EJS

app.get('/', (req, res) => {
    res.render('home', { posts: posts }); // Render the home.ejs file and pass the posts array
});

app.post('/compose', (req, res) => {
    const post = {
        id: Date.now().toString(),
        title: req.body.title,
        content: req.body.content
    };
    posts.push(post);
    res.redirect('/');
});

//for deletion of content
app.post('/delete', (req, res) => {
    const postId = req.body.id;
    posts = posts.filter(post => post.id !== postId);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Blog app listening at http://localhost:${port}`);
});
