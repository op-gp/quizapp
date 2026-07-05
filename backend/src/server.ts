import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../configs/db';

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

// Middleware 

// Able to parse JSON that comes from the request.
app.use(express.json());

// First connect to the database and only after a successfull connection will the application start.
// REASON: No reason for the application to start if it can't access the database to perform HTTP requests.
connectDB().then( () => {
        app.listen(PORT, 
            () => {
                console.log("Server started on port ", PORT, ".")
            }
        )
    }
);
