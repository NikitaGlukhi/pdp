const express = require('express');
const { v4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { Map, fromJS } = require('immutable');
const router = express.Router();

function getAllData() {
  return fs.readFileSync(path.join(__dirname, './db.json'), { encoding: 'base64' });
}

function prepareLikeData(id, data) {
  return {
    id,
    postId: data.postId,
    likedBy: data.userId,
  }
}

router.post('/', (req, res) => {
  const { data } = req.body;

  const newLike = prepareLikeData(v4(), data);

  const buffer = getAllData();
  const allData =  JSON.parse(Buffer.from(buffer, 'base64').toString('utf8'));
  const pathToFile = path.join(__dirname, './db.json');
  allData.likes.push(newLike);

  try {
    fs.writeFile(pathToFile, JSON.stringify(allData), () => {
      console.log('New like added');
    });

    res.contentType('text/plain');
    res.sendStatus(200);
  } catch (err) {
    console.log(err.message);

    res.sendStatus(500);
  }
});

router.get('/:postId', (req, res) => {
  const { postId } = req.params;
  const buffer = getAllData();
  const allData = Map(JSON.parse(Buffer.from(buffer, 'base64').toString('utf8')));
  const likes = allData.get('likes');
  const result = likes.filter(like => like.postId === postId);

  res.send(result);
});

router.delete('/:likeId', (req, res) => {
  const { likeId } = req.params;
  const buffer = getAllData();
  const allData =  JSON.parse(Buffer.from(buffer, 'base64').toString('utf8'));
  const pathToFile = path.join(__dirname, './db.json');
  allData.likes = allData.likes.filter(like => like.id !== likeId);

  try {
    fs.writeFile(pathToFile, JSON.stringify(allData), () => {
      console.log('Like removed');
    });

    res.setHeader('Content-Type', 'text/plain');
    res.sendStatus(200);
  } catch (err) {
    console.log(err.message);

    res.sendStatus(500);
  }
});

module.exports = router;
