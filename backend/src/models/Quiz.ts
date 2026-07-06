import mongoose, { Schema, model } from 'mongoose';

const quizSchema = new mongoose.Schema({
    categoryId: { 
        type: Schema.ObjectId, 
        ref: 'Category', 
        required: true 
    },
    creatorId: { 
        type: Schema.ObjectId, 
        ref: 'User', 
        required: true 
    },
    title: { 
        type: String, 
        required: true
    },
    description: { type: String },
    timeLimit: { 
        type: Number, 
        required: true, 
        default: 600 
    }
},
    {timestamps: true}
)

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;