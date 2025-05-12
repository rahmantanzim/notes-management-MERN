const express = require('express');
const Router = express.Router();
const notesController = require('../Controllers/notesController')
Router.route('/')
    .get(notesController.getAllNotes)
    .post(notesController.createNote)
    .patch(notesController.updateNote)
    .delete(notesController.deleteNote);
    
module.exports = router;

