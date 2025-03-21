const express = require('express')
const router =express.Router();
const { getAllTasks,createTasks,getTask,updateTasks,deleteTasks} = require('../controller/tasks')

// router.route('/').get((req,res)=>{ //routing the get request with another style
//     res.send('all items');
// })

router.route('/').get(getAllTasks).post(createTasks)//accessing the items from tasks.js in controller folder
router.route('/:id').patch(updateTasks).delete(deleteTasks).get(getTask);


module.exports=router