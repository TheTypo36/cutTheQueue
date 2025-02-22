import { Patient } from "../Models/patient.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// import generateToken from "../utils/generateToken.js";
const options = {
  httpOnly: true,
  secure: true,
};
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const patientExists = await Patient.findOne({ name });

  if (patientExists) {
    throw new ApiError(400, "User already exists");
  }
  const medicalHistoryPath = req.file?.path;

  if (!medicalHistoryPath) {
    throw new ApiError(400, "Medical history is required");
  }
  const patient = await Patient.create({
    name,
    email,
    password,
  });
});

export { register };
