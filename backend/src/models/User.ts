import mongoose, { Schema, model} from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'admin', 'superadmin'],
        default: "student",
        required: true
    },
}, {timestamps: true} // Adds createdAt and updatedAt attributes.
)

const User = mongoose.model("User", userSchema);

export default User;