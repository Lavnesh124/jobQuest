import express from "express";
import { registerStudent, registerRecruiter, loginStudent, loginRecruiter, logout, updateProfile } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/registerStudents").post(registerStudent);
router.route("/registerRecruiters").post(registerRecruiter);
router.route("/loginStudents").post(loginStudent);
router.route("/loginRecruiters").post(loginRecruiter);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, updateProfile);

export default router;

