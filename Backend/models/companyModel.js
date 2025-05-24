import mongoose from "mongoose";
//const bcrypt = require('bcrypt');


const companySchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: true,
        unique: true,
    },
    companypassword: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    logo: {
        type: String,
    }
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);
export default Company;