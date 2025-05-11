const express = require('express');
const Router = express.Router();
const notesController = require('../Controllers/notesController')
Router.route('/')
    .get()
    .post()
    .patch()
    .delete() 

