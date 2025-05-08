const User = require('./../models/User');
const Note = require('./../models/Note');
const asyncHandler = require('express-async-handler');

// Get - Get all users
const getAllUser = asyncHandler(
    async (req,res)=>{
        const users = await User.find().select('-password').lean();// lean = returns plain JS object without the mongoose documnets that includes heavier methods like save()
        if(!users?.length){
            return res.status(400).json({message:`No users found`})
        } 
        res.json({message: `${users.length} users found!`});
    }
);
// Post - Create a new user
const createUser = asyncHandler(
    async (req,res)=>{
        const {username,passwrod,roles} = req.body;
        //data validation
        if(!username || !password || !Array.isArray(roles)){
            return res.status(400).json({message: 'All fields are required'});
        }
        //check for duplicates
        const duplicate = await User.findOne({username}.lean().exec()); // {username} is shorthand for {username : username}
        if(duplicate) {
            return res.status(409).json({message:'Duplicate username found.'})
        }
        //hash the password
        const hashedPwd = await bcrypt.hash(password,10);

        const userObject = {username, "password": hashedPwd, roles }

        const user = await User.create(userObject);

        if(user){
            return res.status(201).json({message: `New user ${username} created`});
        }
        else{
            return res.status(400).json({message: 'Invalid Data'});
        }


    }
);
// Patch - update a user
    const updateUser = asyncHandler(
        async (req,res)=>{
            const {id,username, roles,active, password} = req.body;
            
            const user = await User.findById(id).exec(); //find the specific user that's need to be updated

            //validation
            if(!id || !username || !Array.isArray(roles) || typeof active != 'boolean'){
                return res.status(400).json({message: 'All fields are required'});
            }
            //check for duplicate
            const duplicate = await User.findOne({username}).lean();
            if(duplicate && duplicate?._id.toString() !== id){
                return res.status(409).json({message: 'Username already exists'});
            }

            user.username = username;
            user.roles = roles;
            user.active = active;
            
            if(password){
                const hashedPwd = await bcrypt.hash(password,10);
                user.password = hashedPwd;
            }

            const updatedUser = await user.save();
            if(updatedUser){
                return res.status(200).json({message : `${updatedUser.username} is updated`});
            }
        }
    );
// Delete - delete a user
const deleteUser = asyncHandler(
    (req,res)=>{

    }
);

module.exports = {getAllUser,createUser,updateUser,deleteUser}