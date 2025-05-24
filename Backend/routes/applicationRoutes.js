import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus, getJobApplications } from "../controllers/applicationController.js";


const router = express.Router();


router.route("/apply/:id").post(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/job/:id").get(isAuthenticated, getJobApplications);
router.route("/:id/applicants").get(getApplicants);
router.route("/status/:id/update").put(updateStatus);

export default router;