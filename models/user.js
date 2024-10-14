import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
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
    gender: {
        type: String,
        required: true
    },
    whatsappNo: {
        type: Number,
        required: true,
        unique: true
    },
    phoneNo: {
        type: Number,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: "https://img.icons8.com/forma-thin-filled/96/guest-male.png"
    },
    disabled: {
        type: Boolean,
        default: false
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        required: true,
        default: "user"
    }
})

export default mongoose.model("user", userSchema);