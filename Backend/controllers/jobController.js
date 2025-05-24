import Job from "../models/jobModel.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const recruiterId = req.id;

    if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      companyId,
      recruiterId,
    });

    return res.status(201).json({
      message: "New job created successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error creating job",
      success: false,
    });
  }
};

export const getAlljobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "companyId",
        select: "companyname description location logo"
      })
      .populate({
        path: "recruiterId",
        select: "fullname email"
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching jobs",
      success: false,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate({
        path: "companyId",
        select: "companyname description location logo"
      })
      .populate({
        path: "recruiterId",
        select: "fullname email"
      });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching job",
      success: false,
    });
  }
};

export const getRecruiterJobs = async (req, res) => {
  try {
    const recruiterId = req.id;
    const jobs = await Job.find({ recruiterId })
      .populate({
        path: "companyId",
        select: "companyname description location logo"
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching recruiter jobs",
      success: false,
    });
  }
};

export const getJobsByCompanyId = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    
    if (!companyId) {
      return res.status(400).json({
        message: "Company ID is required",
        success: false,
      });
    }

    const jobs = await Job.find({ companyId })
      .sort({ createdAt: -1 });

      console.log(jobs);
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching company jobs",
      success: false,
    });
  }
};
