import mongoose, { Schema, model } from 'mongoose';

export interface IQuiz extends Document {
  categoryId: Schema.Types.ObjectId;
  creatorId: Schema.Types.ObjectId;
  title: string;
  description: string;
  timeLimit: number;
  createdAt: Date;
}

const quizSchema = new mongoose.Schema<IQuiz>({
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

const Quiz = mongoose.model<IQuiz>("Quiz", quizSchema);

export default Quiz;