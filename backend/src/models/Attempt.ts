import mongoose, { Schema, model, Document} from 'mongoose';

export interface IAttemptAnswer {
  questionId: Schema.Types.ObjectId;
  selectedOptionId: Schema.Types.ObjectId | null;
  isCorrect: boolean;
}

export interface IAttempt extends Document {
  userId: Schema.Types.ObjectId;
  quizId: Schema.Types.ObjectId;
  score: number;
  totalPoints: number;
  timeTakenSeconds: number;
  startedAt: Date;
  submittedAt: Date;
  answers: IAttemptAnswer[];
}

const attemptAnswerSchema = new mongoose.Schema<IAttemptAnswer>({
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

const attemptSchema = new mongoose.Schema<IAttempt>({
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

const Attempt = mongoose.model<IAttempt>("Attempt", attemptSchema);

export default Attempt