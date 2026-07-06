import mongoose, { Schema, model } from 'mongoose';

const attemptAnswerSchema = new mongoose.Schema({
    questionId: {
        type: Schema.ObjectId,
        required: true
    },
    selectedOptionId: {
        type: Schema.ObjectId,
        default: null
    },
    isCorrect: {
        type: Boolean,
        required: true
    }
})

const attemptSchema = new mongoose.Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    quizId: {
        type: Schema.ObjectId,
        ref: 'Quiz',
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    totalPoints: {
        type: Number,
        required: true
    },
    timeTakenSeconds: {
        type: Number,
        required: true
    },
    startedAt: {
        type: Date,
        required: true
    },
    answers: [attemptAnswerSchema]
}, 
    {timestamps: true}
)

const Attempt = mongoose.model("Attempt", attemptSchema);

export default Attempt