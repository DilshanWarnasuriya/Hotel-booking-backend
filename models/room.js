import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    maxPerson: {
        type: Number,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
})

export default mongoose.model("rooms", roomSchema);