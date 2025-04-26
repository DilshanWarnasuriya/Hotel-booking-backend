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
    category: {
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
    contactNo: { 
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
    checkIn: { 
        type: Date,
    },
    checkOut: { 
        type: Date,
    },
    status: { 
        type: String,
        default: "pending",
        required: true
    },
    reason: {
        type: String,
        default: ""
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    payed: {
        type: Boolean,
        default: false,
        required: true
    },
});

export default mongoose.model("booking", bookingSchema);
