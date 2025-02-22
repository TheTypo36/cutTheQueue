import { Patient } from "../Models/patient.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import generateToken from "../utils/generateToken.js";
const options = {
  httpOnly: true,
  secure: true,
};
const register = asyncHandler(async (req, res) => {
  const { name, age, email, password, phoneNumber, isNewPatient, department } =
    req.body;

  const patientExists = await Patient.findOne({ name });

  if (patientExists) {
    throw new ApiError(400, "User already exists");
  }
  const medicalHistoryPath = req.file?.path;

  if (!medicalHistoryPath) {
    throw new ApiError(400, "Medical history is required");
  }

  const medicalHistory = await uploadOnCloudinary(medicalHistoryPath);
  if (!medicalHistory) {
    throw new ApiError(500, "Error uploading medical history");
  }
  const patient = await Patient.create({
    name,
    email,
    password,
    age,
    phoneNumber,
    isNewPatient,
    department,
    medicalHistory: medicalHistory.url,
  });

  console.log("patient is created", patient);

  const createdPatient = await Patient.findById(patient._id).select(
    "-password -refreshToken"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, createdPatient, "Patient created successfully"));
});

export { register };
