import { Router } from "express";
import { verifyJwt } from "../middleware/auth.js";
import { getAdminSignIn } from "../controllers/hospitalController.js";
const router = Router();

router.route("/get-admin").post(getAdminSignIn);

export default router;
