import { Router } from "express";
import { upload } from "multer";
import { voiceLogin } from "../controllers/speechController";

const router = Router();

router.post("/voice-login", upload.single("audio"), voiceLogin);
