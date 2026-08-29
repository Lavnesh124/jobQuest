import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, acceptApplication, rejectApplicant, getJobApplications } from "../controllers/applicationController.js";

const router = express.Router();

// TODO: Re-enable isAuthenticated middleware when auth is back
router.route("/apply/:id").post(applyJob);
router.route("/get").get(getAppliedJobs);
router.route("/job/:id").get(getJobApplications);
router.route("/:id/applicants").get(getApplicants);
router.route("/accept/:id").put(acceptApplication);
router.route("/reject/:id").put(rejectApplicant);
// router.route("/apply/:id").post(isAuthenticated, applyJob);
// router.route("/get").get(isAuthenticated, getAppliedJobs);
// router.route("/job/:id").get(isAuthenticated, getJobApplications);
// router.route("/accept/:id").put(isAuthenticated, acceptApplication);
// router.route("/reject/:id").put(isAuthenticated, rejectApplicant);

export default router;