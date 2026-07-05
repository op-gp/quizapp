import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './configs/db.ts';

// Import routes
import authRoutes from './routes/authRoutes.ts'

// Loads environment variables into the process.
dotenv.config();

// Port is either 5001 by default if no value is given in the .env file or uses the value from the .env if given.
const PORT = process.env.PORT || 5001;

const app = express();

// Middleware 
// Able to parse JSON that comes from the request.
app.use(express.json());
app.use("/api/auth", authRoutes)

// First connect to the database and only after a successfull connection will the application start.
// REASON: No reason for the application to start if it can't access the database to perform HTTP requests.
connectDB().then( () => {
        app.listen(PORT, 
            () => {
                console.log("Server started on port ", PORT)
            }
        )
    }
);
