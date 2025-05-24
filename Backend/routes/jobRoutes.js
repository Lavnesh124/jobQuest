import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { postJob, getAlljobs, getJobById, getRecruiterJobs, getJobsByCompanyId } from "../controllers/jobController.js";


const router = express.Router();

// Public routes
router.route("/get").get(getAlljobs);
router.route("/get/:id").get(getJobById);
router.route("/company/:companyId").get(getJobsByCompanyId);

// Protected routes
router.route("/post").post(isAuthenticated, postJob);
router.route("/recruiter/jobs").get(isAuthenticated, getRecruiterJobs);

export default router;
