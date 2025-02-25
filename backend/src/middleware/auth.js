import jwt from "jsonwebtoken";
import { Patient } from "../Models/patient.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1]; // get the token from the request header
    console.log("received token:", token);
    if (!token) {
      throw new ApiError(401, "Invalid token");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const patient = await Patient.findById(decoded?._id).select(
      "-password -refreshToken"
    );

    if (!patient) {
      throw new ApiError(401, "Invalid token");
    }
    req.patient = patient;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid token");
  }
});
