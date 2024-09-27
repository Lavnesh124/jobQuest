import mongoose from "mongoose";
//const bcrypt = require('bcrypt');


const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    websites: {
        type: String,
    },
    location: {
        type: String,
    },
    logo: {
        type: String,
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);
export default Company;