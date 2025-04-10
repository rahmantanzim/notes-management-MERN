const express = require('express');
const router = express.Router();
const path= require('path'); // node module that provides tool to deal with files and folders

router.get(/^\/$|\/index(.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});
module.exports = router;