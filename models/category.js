import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    features: [{
        type: String
    }],
    images: [{
        type: String,
        required: true
    }]
})

export default mongoose.model("category", categorySchema);