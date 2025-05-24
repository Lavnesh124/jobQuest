import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    companyName: {
        type: String,
    },
    companyPassword: {
        type: String,
    },
    role: {
        type: String,
        enum: ['student', 'recruiter','admin'],
        default: 'student',
        required: true,
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String },
        resumeOrigionalName: { type: String },
        profilePhoto: {
            type: String,
            default: ""
        }
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
