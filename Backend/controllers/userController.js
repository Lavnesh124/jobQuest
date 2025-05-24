import User from "../models/userModel.js";
import Company from "../models/companyModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerStudent = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password } = req.body;
        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false,
            });
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedpassword,
            role: 'student',
        });

        return res.status(201).json({
            message: "Student account created successfully",
            success: true
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}

export const registerRecruiter = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, companyname, companypassword } = req.body;
        if (!fullname || !email || !password || !companyname || !companypassword) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false,
            });
        }

        // Verify company credentials
        const company = await Company.findOne({ companyname: companyname });
        if (!company) {
            return res.status(400).json({
                message: "Company not found",
                success: false,
            });
        }

        // Verify company password
        const isCompanyPasswordValid = await bcrypt.compare(companypassword, company.companypassword);
        if (!isCompanyPasswordValid) {
            return res.status(400).json({
                message: "Invalid company credentials",
                success: false,
            });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedpassword,
            companyname,
            companyId: company._id,
            role: 'recruiter',
        });

        return res.status(201).json({
            message: "Recruiter account created successfully",
            success: true
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}

export const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        // Verify this is a student account
        if (user.role !== 'student') {
            return res.status(400).json({
                message: "Please use the recruiter login",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}

export const loginRecruiter = async (req, res) => {
    try {
        const { email, password, companyname, companypassword } = req.body;
        if (!email || !password || !companyname || !companypassword) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        // Verify this is a recruiter account
        if (user.role !== 'recruiter') {
            return res.status(400).json({
                message: "Please use the student login",
                success: false,
            });
        }

        // Verify company credentials
        const company = await Company.findOne({ companyname: companyname });
        if (!company) {
            return res.status(400).json({
                message: "Company not found",
                success: false,
            });
        }

        // Verify company password
        const isCompanyPasswordValid = await bcrypt.compare(companypassword, company.companypassword);
        if (!isCompanyPasswordValid) {
            return res.status(400).json({
                message: "Invalid company credentials",
                success: false,
            });
        }

        // Verify user belongs to this company
        if (!user.companyId || user.companyId.toString() !== company._id.toString()) {
            return res.status(400).json({
                message: "You are not associated with this company",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            companyname: user.companyname,
            companyId: user.companyId,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.bio = bio;
        if (skillsArray) user.profile.skills = skillsArray;

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: `Profile updated successfully`,
            user,
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}
