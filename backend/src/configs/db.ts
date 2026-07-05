import mongoose from 'mongoose';
import dotenv from 'dotenv';

// IMPORTED BY CO-PILOT 
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
});

process.once('SIGUSR2', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close(false);
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
    } catch (err) {
        console.error('Error closing MongoDB connection on app termination', err);
        process.exit(1);
    }
});

// END OF CO-PILOT GENERATION.

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
    }
    catch (error){
        console.log(process);
        console.error("Error connecting to MongoDB.", error);

        // Exit the process with error code 1.
        process.exit(1);
    }
}