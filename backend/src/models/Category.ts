import mongoose, { Schema, model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
}

// Creating category schema with mongoose.
const categorySchema = new mongoose.Schema<ICategory>({
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
const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;