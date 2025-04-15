const express = require('express');
const router = express.Router();
const usersController = require('../Controllers/usersController');
router.route('/') //This is a shortcut to define multiple methods on the same path (in this case: users/)
    .get()
    .post()
    .patch()
    .delete()


module.exports = router;