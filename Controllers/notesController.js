const User = require('./../models/User')
const Note = require('./../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');

const getAllNotes = asyncHandler(
    async (req,res)=>{
        const notes = await Note.find().lean();
        if(!notes?.length){
            return res.status(409).json({message: 'No note found'})
        } 
        return res.status(200).json({message: `${notes.length} Notes found`});
    }
)

module.exports = ({getAllNotes});