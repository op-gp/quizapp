import mongoose from 'mongoose';

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