const express = require('express');
const app = express();
const route = require('../TaskManager/starter/routes/tasks')
const connectDB = require('./starter/db/connect');


const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' })); 



require('dotenv').config()//accessing the .env file
app.get('/hello',(req,res)=>{
    res.send('Task Manager')
})

app.use(express.static('./public'));
app.use(express.json());//middleware to parse json 


app.use('/api/v1/tasks',route)
 

const port = 5000;

const start = async()=>{ //setting connection with database 
    try{
        await connectDB(process.env.MONGO_URL)// if the database is working then the server will work
        app.listen(port,console.log('server is running on '+`${port}`))
    }
    catch(err){
        console.log(err);
    }
}
start()