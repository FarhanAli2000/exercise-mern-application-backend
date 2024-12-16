const express = require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const workouts=require('./routes/workouts.js');
const app = express();
require('dotenv').config(); 

//middleware
app.use(cors());
app.use(express.json());
app.use((req,res,next)=>{
console.log(req.path,req.method);
next()
})

//routes
app.use('/api/workouts',workouts);

//connect to dby
mongoose.connect(process.env.MONGO_URI)

.then(()=>{
// console.log('Mongo URI:', process.env.MONGO_URI);
// console.log('Port:', process.env.PORT);

    app.listen(process.env.PORT, () => {
        console.log(`Connected to Database & App is running on port ${process.env.PORT}`);
    });
})
.catch((error)=>{
console.log(error);
})


