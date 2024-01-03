const express = require('express');
const path = require('path');
const fs = require('fs');
const {all} = require("express/lib/application");
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  const buffer = fs.readFileSync(path.join(__dirname, './db.json'), { encoding: 'base64' });
  const result = JSON.parse(Buffer.from(buffer, 'base64').toString('utf8'));
  const allPosts = result.posts.map(post => {
    const likes = result.likes.filter(like => like.postId === post.id);

    return { ...post, likes, likesCount: likes.length };
  });
  const users = result.users.map(user => {
    const posts = allPosts.filter(post => post.userId === user.id);

    return { ...user, posts };
  });

  res.send(users);
});

router.get('/user', (req, res) => {
  const { authToken } = req.params;
  const token = jwt.decode(authToken, { complete: true });
  const buffer = fs.readFileSync(path.join(__dirname, './db.json'), { encoding: 'base64' });
  const allData = JSON.parse(Buffer.from(buffer, 'base64').toString('utf8'));
  const result = allData.users.find(user => user.id === token.payload.id);
  const posts = allData.posts.map(post => {
    const likes = allData.likes.filter(like => like.postId === post.id);

    return { ...post, likes, likesCount: likes.length };
  }).filter(post => post.userId === result.id);

  res.send({ ...result, posts });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const token = jwt.decode(id, { complete: true });
  const buffer = fs.readFileSync(path.join(__dirname, './db.json'), { encoding: 'base64' });
  const allData = JSON.parse(Buffer.from(buffer, 'base64').toString('utf8'));
  const result = allData.users.find(user => user.id === token.payload.id);
  const posts = allData.posts.map(post => {
    const likes = allData.likes.filter(like => like.postId === post.id);

    return { ...post, likes, likesCount: likes.length };
  }).filter(post => post.userId === result.id);

  res.send({ ...result, posts });
});

router.get('/:login/:password', (req, res) => {
  const { login, password } = req.params;

  const buffer = fs.readFileSync(path.join(__dirname, './db.json'), { encoding: 'base64' });
  const allData = JSON.parse(Buffer.from(buffer, 'base64').toString('utf8'));
  const result = allData.users.find(user => (user.nickname === login || user.email === login) && user.password === password);

  if (result && result.id) {
    const token = jwt.sign(
      { id: result.id, username: result.nickname, expiresIn: Date.now() + 3600000, lastUpdatedAt: Date.now() },
      'secret-key',
      { expiresIn: '1h' },
    );

    res.status(200).json(token);
  } else {
    res.status(401).json({ status: 'User not found' });
  }
});


router.put('/refreshToken', (req, res) => {
  const { authToken } = req.params;
  const decoded = jwt.decode(authToken, { complete: true });

  if (decoded) {
    const { payload } = decoded;

    if (payload.id) {
      if (Date.now() > payload.expiresIn) {
        if (Date.now() - payload.lastUpdatedAt > 172800000) {
          res.status(403).json({ status: 'Unable to refresh token' })
        }

        const newToken = jwt.sign(
          { id: payload.id, username: payload.username, expiresIn: Date.now() + 3600000, lastUpdatedAt: Date.now() },
          'secret-key',
          { expiresIn: '1h' },
        );

        res.status(200).json(newToken);
      }
    } else {
      res.status(500).json({ status: 'Failed to refresh token' });
    }
  }
})

module.exports = router;
