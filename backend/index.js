import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const port = 5000;
const app = express();
dotenv.config();


// connected the backend to MONGODB
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('connected to the database')

}).catch((err) => console.log('Error:', err))

app.listen(port, ()=> {
    console.log(`Server is running on port ${port} `)
})
