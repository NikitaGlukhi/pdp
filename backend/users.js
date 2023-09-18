const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  const buffer = fs.readFileSync(path.join(__dirname, './db.json'), { encoding: 'base64' });
  const result = JSON.parse(Buffer.from(buffer, 'base64').toString('utf8'));

  res.send(result.users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const buffer = fs.readFileSync(path.join(__dirname, './db.json'), { encoding: 'base64' });
  const allData = JSON.parse(Buffer.from(buffer, 'base64').toString('utf8'));
  const result = allData.users.find(user => user.id === id);

  res.send(result);
});

router.get('/:login/:password', (req, res) => {
  const { login, password } = req.params;

  const buffer = fs.readFileSync(path.join(__dirname, './db.json'), { encoding: 'base64' });
  const allData = JSON.parse(Buffer.from(buffer, 'base64').toString('utf8'));
  const result = allData.users.find(user => (user.nickname === login || user.email === login) && user.password === password);

  res.send(result);
});

module.exports = router;
