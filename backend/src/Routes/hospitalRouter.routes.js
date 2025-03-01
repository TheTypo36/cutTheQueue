import { Router } from "express";
import { verify } from "jsonwebtoken";
import { verifyJwt } from "../middleware/auth";

const router = Router();

router.route("/signIn-admin").post(adminLogin);

router.route("/get-admin").post(verifyJwt);
