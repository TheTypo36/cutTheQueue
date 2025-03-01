import { Router } from "express";
import { upload } from "../middleware/multer.js";
import {
  getMedicalRecord,
  register,
} from "../controllers/patientController.js";
import { login } from "../controllers/patientController.js";
import { logout } from "../controllers/patientController.js";
import { verifyJwt } from "../middleware/auth.js";
import { getTokenNo } from "../controllers/patientController.js";
const router = Router();

router.route("/registration").post(upload.single("medicalHistory"), register);

router.route("/login").post(login);

//verified routes
router.route("/logout").post(verifyJwt, logout);
router.route("/get-token-no").post(verifyJwt, getTokenNo);

router.route("/get-medical-history").post(verifyJwt, getMedicalRecord);
export default router;
// Compare this snippet from frontend/src/components/Header.jsx:
