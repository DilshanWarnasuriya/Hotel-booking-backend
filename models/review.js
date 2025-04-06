import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    comment: {
        type: String,
        default: ""
    },
    disabled: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model("review", reviewSchema);
