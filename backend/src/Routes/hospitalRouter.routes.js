import { Router } from "express";
import { verifyJwt } from "../middleware/auth.js";
import { getAdminSignIn , getHospital} from "../controllers/hospitalController.js";
const router = Router();

router.route("/get-admin").post(getAdminSignIn);
router.route("/get-hospital").get(getHospital);
export default router;
