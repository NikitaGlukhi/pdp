const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  const buffer = fs.readFileSync(path.join(__dirname, './db.json'), { encoding: 'base64' });
  const result = JSON.parse(Buffer.from(buffer, 'base64').toString('utf8'));

  res.send(result.users);
});

module.exports = router;
