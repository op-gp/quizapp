import mongoose, { Schema, model, Document} from 'mongoose';

export interface IAttemptAnswer {
  questionId: mongoose.Types.ObjectId | string;
  selectedOptionId: mongoose.Types.ObjectId | string | null;
  isCorrect: boolean;
}

export interface IAttempt extends Document {
  userId: mongoose.Types.ObjectId | string;
  quizId: mongoose.Types.ObjectId | string;
  score: number;
  totalPoints: number;
  timeTakenSeconds: number;
  startedAt: Date;
  submittedAt: Date;
  answers: IAttemptAnswer[];
}

const attemptAnswerSchema = new mongoose.Schema<IAttemptAnswer>({
    questionId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    selectedOptionId: {
        type: Schema.Types.ObjectId,
        default: null
    },
    isCorrect: {
        type: Boolean,
        required: true
    }
})

const attemptSchema = new mongoose.Schema<IAttempt>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quizId: {
        type: Schema.Types.ObjectId,
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

const Attempt = mongoose.model<IAttempt>("Attempt", attemptSchema);

export default Attempt