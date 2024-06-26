import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import authenticateRouter from './routes/authenticateRouter.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listingRouter.js'
import cors from 'cors'

const port = 5000;
const app = express();
dotenv.config();
app.use(cors());



app.use(express.json());

app.use(cookieParser());


app.use('/backend/user', userRouter);

app.use('/backend/authenticate', authenticateRouter);

app.use('/backend/listing', listingRouter);









app.use((err, req, res, next) => {

    const statusCode = err.statusCode || 500;

    const message = err.message || 'Server Error';

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})








// connected the backend to MONGODB
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('connected to the database')

}).catch((err) => console.log('Error:', err))

app.listen(port, ()=> {
    console.log(`Server is running on port ${port} `)
})
