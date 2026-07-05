import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

// Middleware 

// Able to parse JSON that comes from the request.
app.use(express.json());

app.listen(PORT, 
    () => {
        console.log("Server started on port ", PORT, ".")
    }
)