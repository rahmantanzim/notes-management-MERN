const allowedOrigins = require('./allowerOrigins');

const corsOptions = {
    origin: (origin,callback)=>{
        if(allowedOrigins.indexOf(origin) != -1 || !origin){ //!origin means: “If there’s no origin at all, just allow it.”
            callback(null,true) // the CORS function uses this to either allow or deny the request
        }
        else{
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionSuccessStatus: 200
}

module.exports = corsOptions;