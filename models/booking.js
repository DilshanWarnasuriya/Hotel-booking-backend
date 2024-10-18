import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    roomNo: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    personCount: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    reason: {
        type: String,
        default: ""
    },
    notes: {
        type: String,
        default: ""
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("booking", bookingSchema);
