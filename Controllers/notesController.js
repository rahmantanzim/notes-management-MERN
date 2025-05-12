const User = require('./../models/User')
const Note = require('./../models/Note')
const asyncHandler = require('express-async-handler')

const getAllNotes = asyncHandler(
    async (req,res)=>{
        const notes = await Note.find().lean(); // find() returns an array
        if(!notes?.length){
            return res.status(409).json({message: 'No note found'})
        } 
        const notesWithUser = await Promise.all(notes.map((note)=>{ //For every note, go find the person who wrote it, get their name, and add that name to the note.”
            const user = User.findById(note.user).lean().exec();
            return {...notes, username: user.username}
        }))
        res.json(notesWithUser);
        return res.status(200).json({message: `${notes.length} Notes found`});
    }
)

const createNote = asyncHandler(
    async(req,res) =>{
        const {title,text,completed} = req.body; 
        if(!user|| !title||!text){
            return res.status(409).json({message:'All fields are required'});
        } 
        // check for duplicate
        const duplicate = await Note.findOne({title}).lean().exec();
        if(duplicate){
            return res.status(409).json({message:'Duplicate title found'});
        }
        const note = Note.create({title,text,completed});

        if(!note){
            res.status(409).json({message:'Invalid note'});
        }
        res.status(201).json({message:'New note created'});
    }
);

const updateNote = asyncHandler(
    async(req,res) =>{
        const {id,user,title,text,completed} = req.body;
        //check data 
        if(!id||!user||!title||!text||typeof completed !== 'boolean'){
            res.status(400).json({message: 'All fields are required'})
        }
        //check if the note exists
        const note = await Note.findById(id).exec();
        if(!note){
            res.status(400).json({message: 'No Note found'})
        }
        // check duplicate title 
        const duplicate = Note.findOne({title}).lean().exec();
        // check if any other note other than is getting updated
        if(duplicate & duplicate?._id !== id){
            res.status(409).json({message: 'Duplicate title found'});
        }
        note.user = user;
        note.title = title;
        note.text=text; 
        note.completed = completed;
        const updatedNote = await note.save();
        res.json(`${updateNote.title} has been updated`);
    }
);

const deleteNote = asyncHandler(
    async(req,res) =>{
        const {id} = req.body;
        // confirm data
        if(!id){
            return res.status(400).json({message:'ID is required'});
        }
        const note = await Note.findById(id).exec();
        if(!note){
            return res.status(400).json({message:'Note not found'});
        }
        const result = await note.deleteOne();
        res.json(`${result.title} is deleted`);
    }
);

module.exports = ({getAllNotes,createNote,updateNote,deleteNote});