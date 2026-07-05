import mongoose, { Schema, model } from 'mongoose';

// Creating category schema with mongoose.
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true  
    }
})

// Creating category model from schema.
const Category = mongoose.model("Category", categorySchema);

export default Category;