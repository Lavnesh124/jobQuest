import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { postJob, getAlljobs, getJobById, getRecruiterJobs, getJobsByCompanyId, updateJobStatus } from "../controllers/jobController.js";

const router = express.Router();

// Public routes
router.route("/get").get(getAlljobs);
router.route("/get/:id").get(getJobById);
router.route("/company/:companyId").get(getJobsByCompanyId);

router.route("/post").post(isAuthenticated, postJob);
router.route("/recruiter/jobs").get(isAuthenticated, getRecruiterJobs);
router.route("/:id/status").patch(isAuthenticated, updateJobStatus);

export default router;
