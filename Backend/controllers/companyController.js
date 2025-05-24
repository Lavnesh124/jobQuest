import Company from "../models/companyModel.js";
import Job from "../models/jobModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const check = async (req, res) => {
    console.log("hello");
    return res.status(404).json({
        message: "hello world",
        success: false
    })
}

export const registerCompany = async (req, res) => {
    try {
        const { companyname, description, website, location, companypassword } = req.body;
        
        if (!companyname || !companypassword) {
            return res.status(400).json({
                message: "Company name and password are required",
                success: false
            });
        }

        const existingCompany = await Company.findOne({ companyname });
        if (existingCompany) {
            return res.status(400).json({
                message: "Company with this name already exists",
                success: false
            });
        }

        const hashedpassword = await bcrypt.hash(companypassword, 10);
        const company = await Company.create({
            companyname,
            description,
            website,
            location,
            companypassword: hashedpassword
        });

        return res.status(201).json({ 
            message: 'Company registered successfully',
            company,
            success: true 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error registering company",
            success: false
        });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userid: userId });
        
        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching companies",
            success: false
        });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching company",
            success: false
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { companyname, description, website, location } = req.body;
        
        if (!companyname && !description && !website && !location) {
            return res.status(400).json({
                message: "No update data provided",
                success: false
            });
        }

        const updateData = { companyname, description, website, location };
        const company = await Company.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error updating company",
            success: false
        });
    }
};

export const getJobsByCompanyId = async (req, res) => {
    try {
        const companyId = req.params.id;
        const jobs = await Job.find({ companyId })
            .populate('recruiterId', 'fullname email')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching company jobs",
            success: false
        });
    }
};