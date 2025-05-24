import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { postJob, getAlljobs, getJobById, getAdminJobs } from "../controllers/jobController.js";


const router = express.Router();

router.route("/post").post( postJob);
router.route("/get").get( getAlljobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(getJobById);

export default router;

