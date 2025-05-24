import { application } from "express";
import Application from "../models/applicationModel.js";
import applicationModel from '../models/applicationModel.js';
import Job from '../models/jobModel.js';

export const applyJob = async (req, res) => {
    try {

        const userId = req.id;

        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required",
                success: false,
            })
        };

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });


        if (existingApplication) {
            return res.status(400).json({
                message: "You have applied for job",
                success: false,
            })
        }
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({
                message: "You have applied for job",
                success: false,
            })
        }
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        })
        job.applications.push(newApplication._id);

        await job.save();
        return res.status(201).json({
            message: "Job applied successfully",
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                select: "title description salary location jobType experienceLevel companyId",
                populate: {
                    path: "companyId",
                    select: "companyname description location logo"
                }
            });

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: "No Applications found",
                success: false,
            });
        }

        return res.status(200).json({
            applications,
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching applications",
            success: false,
        });
    }
}


//admin dakhaga kitna user na apply kia ha
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            option: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
            }
        });
        if (!job) {
            return res.status(404).json({
                message: "job not found ",
                success: false,
            })
        }

        return res.status(201).json({
            job,
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}



export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(404).json({
                message: "status is required",
                success: false,
            })
        };
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false,
            })
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully",
            success: true,
        })


    } catch (error) {
        console.log(error);
    }
}

export const getJobApplications = async (req, res) => {
    try {
        const jobId = req.params.id;
        
        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false,
            });
        }

        const applications = await Application.find({ job: jobId })
            .sort({ createdAt: -1 })
            .populate({
                path: "applicant",
                select: "fullname email"
            })
            .populate({
                path: "job",
                select: "title description salary location jobType experienceLevel"
            });

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: "No applications found for this job",
                success: false,
            });
        }

        return res.status(200).json({
            applications,
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching job applications",
            success: false,
        });
    }
};

