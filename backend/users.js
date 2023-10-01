const express = require('express');
const path = require('path');
const fs = require('fs');
const {all} = require("express/lib/application");
const router = express.Router();

router.get('/', (req, res) => {
  const buffer = fs.readFileSync(path.join(__dirname, './db.json'), { encoding: 'base64' });
  const result = JSON.parse(Buffer.from(buffer, 'base64').toString('utf8'));
  const allPosts = result.posts.map(post => {
    const likes = result.likes.filter(like => like.postId === post.id);

    return { ...post, likes };
  });
  const users = result.users.map(user => {
    const posts = allPosts.filter(post => post.userId === user.id);

    return { ...user, posts };
  });

  res.send(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const buffer = fs.readFileSync(path.join(__dirname, './db.json'), { encoding: 'base64' });
  const allData = JSON.parse(Buffer.from(buffer, 'base64').toString('utf8'));
  const result = allData.users.find(user => user.id === id);
  const posts = allData.posts.map(post => {
    const likes = allData.likes.filter(like => like.postId === post.id);

    return { ...post, likes };
  }).filter(post => post.userId === result.id);

  res.send({ ...result, posts });
});

router.get('/:login/:password', (req, res) => {
  const { login, password } = req.params;

  const buffer = fs.readFileSync(path.join(__dirname, './db.json'), { encoding: 'base64' });
  const allData = JSON.parse(Buffer.from(buffer, 'base64').toString('utf8'));
  const result = allData.users.find(user => (user.nickname === login || user.email === login) && user.password === password);
  const posts = allData.posts.map(post => {
    const likes = allData.likes.filter(like => like.postId === post.id);

    return { ...post, likes };
  }).filter(post => post.userId === result.id);

  res.send({ ...result, posts });
});

module.exports = router;
