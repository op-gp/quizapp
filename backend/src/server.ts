import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './configs/db.ts';
import type {Request, Response} from 'express';
import { errorHandler } from './middleware/errorMiddleware.ts';
import path from 'path';

// Import routes
import authRoutes from './routes/authRoutes.ts';
import adminRoutes from './routes/adminRoutes.ts';

// Loads environment variables into the process.
dotenv.config();


// Validate critical environment variables before startup
const validateEnv = (): void => {
  const required = ['MONGO_URI', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error(`\n[FATAL ERROR] Missing required environment variables: ${missing.join(', ')}`);
    console.error('Please configure them in your .env file. Exiting...\n');
    process.exit(1);
  }

  const provider = (process.env.EMAIL_PROVIDER || 'mock').toLowerCase();
  if (provider === 'nodemailer') {
    const smtpRequired = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
    const missingSmtp = smtpRequired.filter(key => !process.env[key]);
    if (missingSmtp.length > 0) {
      console.warn(`[WARNING] EMAIL_PROVIDER is set to 'nodemailer', but SMTP configurations are incomplete: ${missingSmtp.join(', ')}. Email service will fallback to mock logging.`);
    } else {
      console.log(`[CONFIG] SMTP mail configurations verified successfully.`);
    }
  } else {
    console.log(`[CONFIG] Email provider is set to '${provider}'. Email service will run in mock logging mode.`);
  }

  console.log(`[CONFIG] Environment configuration validation passed.`);
};

validateEnv();

const app = express();

// Port is either 5001 by default if no value is given in the .env file or uses the value from the .env if given.
const PORT = process.env.PORT || 5001;

// Middleware 

app.use(cors());

// Able to parse JSON that comes from the request.
app.use(express.json());
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)

app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Quiz Web App API is active and running.' });
});

// Global Error Handler Middleware (must be registered last)
app.use(errorHandler);

// 1. Serve the frontend static assets
// const frontendBuildPath = path.join(__dirname, '../../frontend/dist');
// app.use(express.static(frontendBuildPath));

// 2. Fallback route: serve index.html for any non-API routes (enables React Router)
// app.get('*', (req: Request, res: Response) => {
//   res.sendFile(path.join(frontendBuildPath, 'index.html'));
// });

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
