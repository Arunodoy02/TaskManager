const mongoose = require('mongoose'); 

const  TaskSchema = new mongoose.Schema({ //setting up of schema in mongoDB by schema means structure of a db//Note the things we have givgen input in schema will be shown only no extra thing will be store in cloud
    name : {
        type:String,
        require:[true,'must provide name'],
        trim:true,
        maxlength:[20,'name cannot be more than 20 characters']
    },
    completed: Boolean,
})
module.exports=mongoose.model('Task', TaskSchema);