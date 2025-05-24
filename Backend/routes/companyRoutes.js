import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { check, getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/companyController.js";

const router = express.Router();


router.route("/").get( check);
router.route("/register").post(registerCompany);
router.route("/get").get(getCompany);
router.route("/get/:id").get(getCompanyById);
router.route("/update/:id").put( updateCompany);

export default router;

