import { Router } from "express";
import { upload } from "../middleware/multer.js";
import { register } from "../controllers/patientController.js";
const router = Router();

router.route("/registration").post(
  upload.fields([
    {
      name: "mdeicalReport",
      maxCount: 1,
    },
  ]),
  register
);

export default router;
// Compare this snippet from frontend/src/components/Header.jsx:
