require('dotenv').config(); //let us use env variable.
const express = require('express'); //loads the express library - Hey node, give me the express tool!
const app = express(); //calls the express function, becmoes the main object.  
const path = require('path'); // path gives tools to work with file and folders
const {logger,logEvents} = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/dbCon');
const mongoose = require('mongoose');
const corsOptions = require('./config/corsOption')

const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

connectDB();

app.use(cors(corsOptions));

app.use(express.json()); // let the app to rcv and parse json data

app.use(cookieParser());

app.use('/',express.static(path.join(__dirname,'public'))); // when someone visit the app ('/), this line provides all the files that are in the public folder, express.sttaic() is a built-in express function to serve static files.

app.use('/',require('./routes/root')); //"Hey, Express, for anything under /, go ask the routes/root.js file how to handle it."
app.use('/users', require('./routes/userRoutes'))

app.all(/.*/,(req,res)=>{
    res.status(404) //sets the http status code as 404 which means the file they are looking for does not exist
    if(req.accepts('html')){ // if the user prefers HTML response
        res.sendFile(path.join(__dirname,'views','404.html')) // sendFile() => its a method that sends an actual file to the client. in this case, its the 404.html file inside the views folder
    }
    else if(req.accepts('json')){
        res.json({message: '404 not found'})
    }
    else{
        res.type('txt').send('404 not found')
    }
})

app.use(errorHandler);


mongoose.connection.once('open', ()=>{ //run this function once the mongodb connection opens successfully
    console.log('Connected to mongoDB')
    app.listen(PORT, ()=>{
        console.log(`Server started on port ${PORT} `)
    })
})

mongoose.connection.on('error',(err)=>{ //istens for any MongoDB connection error
    console.log(err)
    logEvents(`${err.no}\t${err.code}$\${err.syscall}\t${err.hostname}`,'mongoErrLog.log');
})