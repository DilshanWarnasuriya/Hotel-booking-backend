import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNo: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    type: {
        type: String,
        required: true,
        default: "user"
    },
    disabled: {
        type: Boolean,
        default: false
    },
    emailVerified: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("user", userSchema);