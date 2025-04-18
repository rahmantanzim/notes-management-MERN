const {format} = require('date-fns');
const {v4:uuid} = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async(message, logFileName) =>{
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}`;

    try{
        if(!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'));  
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logFileName),logItem);
    }
    catch(err){
        console.log(err);
    }
}

const logger = (req,res,next)=>{
    logEvents(`${req.method}\t${req.url}\t${req.headers.origni}`,'reqLog.log');
    console.log(`${req.method}\t${req.path}`);
    next();
}

module.exports = {logger,logEvents}