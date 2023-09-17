const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const posts = require('./posts');
const users = require('./users');
const likes = require('./likes');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/likes', likes);
app.use('/posts', posts);
app.use('/users', users);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
