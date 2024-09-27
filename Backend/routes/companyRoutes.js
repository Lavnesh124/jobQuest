import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { check, getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/companyController.js";

const router = express.Router();


router.route("/").get(isAuthenticated, check);
router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, updateCompany);

export default router;

