import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    note: {
        type: String,
        default: ""
    }
})

export default mongoose.model("event", eventSchema);