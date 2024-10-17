import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    disabled: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model("review", reviewSchema);
