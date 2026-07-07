import mongoose, { Schema, model, Document} from 'mongoose';

export interface IQuiz extends Document {
  categoryId: Schema.Types.ObjectId | string;
  creatorId: Schema.Types.ObjectId | string;
  title: string;
  description: string;
  timeLimit: number;
  createdAt: Date;
}

const quizSchema = new mongoose.Schema<IQuiz>({
    categoryId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    },
    creatorId: { 
        type: Schema.Types.ObjectId, 
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