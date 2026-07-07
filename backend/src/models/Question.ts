import mongoose, { Schema, model, Document} from 'mongoose';

export interface IOption {
  _id?: Schema.Types.ObjectId;
  optionText: string;
  isCorrect: boolean;
}

export interface IQuestion extends Document {
  quizId: Schema.Types.ObjectId | string;
  questionText: string;
  points: number;
  options: IOption[];
}

const optionSchema = new mongoose.Schema<IOption>({
  optionText: { 
    type: String, 
    required: true 
},
  isCorrect: { 
    type: Boolean, 
    required: true, 
    default: false 
}
});

const questionSchema = new mongoose.Schema<IQuestion>({
  quizId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Quiz', 
    required: true 
},
  questionText: { 
    type: String, 
    required: true },
  points: { type: Number, 
    required: true, 
    default: 1 
},
  options: [optionSchema]
});

const Question = mongoose.model<IQuestion>("Question", questionSchema);

export default Question;