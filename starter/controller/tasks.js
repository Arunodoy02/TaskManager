//CRUD OPERATIONS

const Task = require('../models/task');
// Fetches all tasks from the database
const getAllTasks = async (req,res)=>{  //asynchronous function as we have use await in the connect.js
    // res.send('get tasks')
    try {
        const task = await Task.find(req.body) //.create() is a query in MongoDB where it will create task
        res.status(201).json(task)//to check if the middleware is running properly or not 
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
// Creates a new task in the database.
const createTasks =async (req,res)=>{ //asynchronous function as we have use await in the connect.js
    // res.send('create tasks')
    try {
        const task = await Task.create(req.body) //.create() is a query in MongoDB where it will create task
        res.status(201).json(task)//to check if the middleware is running properly or not 
    } catch (error) {
        res.status(500).json({msg:error})
    }
   
}
// Fetches a single task by ID.
const getTask = async (req, res) => {  
    try {  
        const { id: taskID } = req.params;  
 
        // Find the task by its ID  
        const task = await Task.findById(taskID);  
        
        // If the task is not found, return a 404 status with a message  
        if (!task) {  
            return res.status(404).json({ msg: `No task with id: ${taskID}` });  
        }  
        
        // If the task is found, return it in the response  
        res.status(200).json({ task });  
    } 
    catch (error) {  
        console.error(error); // Log the error for debugging  
        // Handle any errors that occur during the process  
        res.status(500).json({ msg: error.message });  
    }  
};
const updateTasks = async (req,res)=>{
    // res.send(' update tasks')
    try {
        const {id:taskID}=req.params;
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{ //updates the task and returns the modified document (new: true)
              new:true,
              runValidators:true,
        })
        if (!task) {  
            return res.status(404).json({ msg: `No task with id: ${taskID}` });  
        }  
        res.status(200).json({ task });   
    } 
    catch (error) {
        res.status(500).json({ msg: error.message });  
    }
}
const deleteTasks =async (req,res)=>{
    // res.send('delete tasks')
    try {
        const { id: taskID } = req.params;// as there will be specific id for it 
        
        // Find the task by its ID
        const task = await Task.findOneAndDelete({ _id: taskID }); //finding the taskID  so .findOneAndDelete() is used for deleting the task with that id 
        // If the task is not found, return a 404 status with a message
        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` });
        }
        // If the task is found, return it in the response
        res.status(200).json({ task });
    } 
    catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ msg: error.message });
    }
};

module.exports={
    getAllTasks,createTasks,getTask,updateTasks,deleteTasks
};