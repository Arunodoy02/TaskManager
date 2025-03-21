const mongoose = require('mongoose');

//url is on .env file to keep it safe

const connectDB = (url)=>{
    return mongoose.connect(url)
}

module.exports=connectDB;