import jwt from "jsonwebtoken";
import { Patient } from "../models/patient.models";
import { asyncHandler } from "../utils/asyncHandler";

export const verifyJwt = asyncHandler(async (req, res, next) => {});
