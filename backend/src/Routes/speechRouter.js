import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { voiceLogin } from "../controllers/speechController.js";

const router = Router();

router.route("/voice-login").post(upload.single("audio"), voiceLogin);

export default router;
