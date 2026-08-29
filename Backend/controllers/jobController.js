import Job from "../models/jobModel.js";

const JOB_STATUSES = ["NoAction", "apply", "save", "reject"];

const activeJobsFilter = () => ({
  $or: [{ status: "apply" }, { status: { $exists: false } }],
});

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
      status,
    } = req.body;
    const recruiterId = req.id;

    const salaryNum = Number(salary);
    const experienceNum = Number(experience);
    const positionNum = Number(position);

    const missingCore =
      !title?.trim() ||
      !description?.trim() ||
      requirements == null ||
      String(requirements).trim() === "" ||
      !location?.trim() ||
      !jobType?.trim() ||
      companyId == null ||
      String(companyId).trim() === "";

    const badNumbers =
      !Number.isFinite(salaryNum) ||
      salaryNum <= 0 ||
      !Number.isFinite(experienceNum) ||
      experienceNum < 0 ||
      !Number.isFinite(positionNum) ||
      positionNum < 1;

    if (missingCore || badNumbers) {
      return res.status(400).json({
        message:
          "All fields are required: title, description, requirements (comma-separated), salary (> 0), location, jobType, experience (years ≥ 0), position (≥ 1), companyId",
        success: false,
      });
    }

    if (status && !JOB_STATUSES.includes(status)) {
      return res.status(400).json({
        message: "Invalid job status. Use NoAction, apply, save, or reject",
        success: false,
      });
    }

    const job = await Job.create({
      title: title.trim(),
      description: description.trim(),
      requirements: String(requirements)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      salary: salaryNum,
      location: location.trim(),
      jobType,
      experienceLevel: experienceNum,
      position: positionNum,
      companyId,
      recruiterId,
      status: status || "NoAction",
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
    const status = req.query.status || "apply";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    if (status === "apply") {
      query.$and = [activeJobsFilter()];
    } else if (JOB_STATUSES.includes(status)) {
      query.status = status;
    }
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
    const query = { recruiterId };
    if (req.query.status && JOB_STATUSES.includes(req.query.status)) {
      query.status = req.query.status;
    }
    const jobs = await Job.find(query)
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

    const status = req.query.status || "apply";
    const companyQuery = { companyId };
    if (status === "apply") {
      companyQuery.$or = [{ status: "apply" }, { status: { $exists: false } }];
    } else if (JOB_STATUSES.includes(status)) {
      companyQuery.status = status;
    }
    const jobs = await Job.find(companyQuery)
      .sort({ createdAt: -1 });

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

export const updateJobStatus = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { status } = req.body;
    const recruiterId = req.id;

    if (!status || !JOB_STATUSES.includes(status)) {
      return res.status(400).json({
        message: "Valid status is required (NoAction, apply, save, reject)",
        success: false,
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    if (job.recruiterId.toString() !== recruiterId) {
      return res.status(403).json({
        message: "Not authorized to update this job",
        success: false,
      });
    }

    job.status = status;
    await job.save();

    return res.status(200).json({
      message: "Job status updated successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error updating job status",
      success: false,
    });
  }
};
