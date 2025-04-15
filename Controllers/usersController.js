const User = require('./../models/User');
const Note = require('./../models/Note');
const asyncHandler = require('express-async-handler');

// Get - Get all users
const getAllUser = asyncHandler(
    async (req,res)=>{
        const users = await User.find().select('-password').lean();
        if(!users?.length){
            return res.status(400).json({message:`No users found`})
        } 
        res.json({message: `${users.length} users found!`});
    }
);
// Post - Create a new user
const createUser = asyncHandler(
    (req,res)=>{

    }
);
// Patch - update a user
const updateUser = asyncHandler(
    (req,res)=>{

    }
);
// Delete - delete a user
const deleteUser = asyncHandler(
    (req,res)=>{

    }
);

module.exports = {getAllUser,createUser,updateUser,deleteUser}