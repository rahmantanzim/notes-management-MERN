const express = require('express'); //loads the express library - Hey node, give me the express tool!
const app = express(); //calls the express function, becmoes the main object.  
const path = require('path'); // path gives tools to work with file and folders
const {logger} = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500;

app.use(logger);
app.use(express.json()); // let the app to rvc and parse json data
app.use('/',express.static(path.join(__dirname,'public'))); // when someone visit the app ('/), this line provides all the files that are in the public folder, express.sttaic() is a built-in express function to serve static files.

app.use('/',require('./routes/root')); //"Hey, Express, for anything under /, go ask the routes/root.js file how to handle it."

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

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT} `)
})