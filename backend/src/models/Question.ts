import mongoose, { Schema, model } from 'mongoose';

const optionSchema = new mongoose.Schema({
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

const questionSchema = new mongoose.Schema({
  quizId: { 
    type: Schema.ObjectId, 
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

const Question = mongoose.model("Question", questionSchema);

export default Question;