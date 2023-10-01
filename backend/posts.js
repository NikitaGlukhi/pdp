const express = require('express');
const path = require('path');
const fs = require('fs');
const { Map } = require('immutable');
const router = express.Router();

function getAllData() {
  return fs.readFileSync(path.join(__dirname, './db.json'), { encoding: 'base64' });
}

function createPostUpdatedMessage(postId) {
  return `Post ${postId} updated`;
}

router.get('/', (req, res) => {
  const buffer = getAllData();
  const allData = Map(JSON.parse(Buffer.from(buffer, 'base64').toString('utf8')));
  const posts = allData.get('posts');
  const result = posts.map(post => {
    const likes = allData.get('likes').filter(like => like.postId === post.id);

    return { ...post, likes };
  })

  res.send(result);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const buffer = getAllData();
  const allData = Map(JSON.parse(Buffer.from(buffer, 'base64').toString('utf8')));
  const posts = allData.get('posts');
  const result = posts.find(post => post.id === id);
  const resultLikes = allData.get('likes').filter(like => like.postId === result.id)

  res.send({ ...result, likes: resultLikes });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const buffer = getAllData();
  const allData = JSON.parse(Buffer.from(buffer, 'base64').toString('utf8'));
  const postId = allData.posts.findIndex(post => post.id === id);
  const pathToFile = path.join(__dirname, './db.json');
  allData.posts[postId] = JSON.parse(data);

  try {
    fs.writeFile(pathToFile, JSON.stringify(allData), () => {
      console.log(createPostUpdatedMessage(id));
    });

    res.sendStatus(200);
  } catch (err) {
    console.log(err.message);

    res.sendStatus(500);
  }
});

module.exports = router;
