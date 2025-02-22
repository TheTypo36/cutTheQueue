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

const generateAcessTokenAndRefreshToken = async (patientId) => {
  try {
    const patient = await Patient.findById(patientId);
    const accessToken = patient.generateAcessToken();
    const refreshToken = patient.generateRefreshToken();
    patient.refreshToken = refreshToken;
    await patient.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Error generating tokens in generateAcessTokenAndRefreshToken"
    );
  }
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

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const patient = await Patient.findOne({ email });
  console.log("patient", patient);
  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  const isPasswordCorrect = await patient.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  //   const accessToken = patient.generateAcessToken();
  //   const refreshToken = patient.generateRefreshToken();

  //   patient.refreshToken = refreshToken;
  //   await patient.save({ validateBeforeSave: false });

  const { accessToken, refreshToken } = await generateAcessTokenAndRefreshToken(
    patient._id
  );
  if (!accessToken || !refreshToken) {
    throw new ApiError(500, "Error generating tokens in patient login");
  }
  console.log("patient logged in", patient._id);
  const loggedInPatient = await Patient.findById(patient._id).select(
    "-password -refreshToken"
  );
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { patient: loggedInPatient, accessToken, refreshToken },
        "Patientlogged in successfully"
      )
    );
});

const generatePatientToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw new ApiError(401, "Invalid token");
  }

  const patientToken = await Patient.aggregate([
    {
      $match: { refreshToken },
    },
    {
      $addFields: {
        patientToken: {
          $size: "$patients",
        },
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        patientToken: 1,
        age: 1,
        phone: 1,
        isNewPatient: 1,
        department: 1,
        medicalHistory: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, patientToken, "Patient token generated"));
});
const logout = asyncHandler(async (req, res) => {
  await Patient.findByIdAndUpdate(
    req.patient._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .clearCookie("refreshToken")
    .clearCookie("accessToken")
    .json(new ApiResponse(200, {}, "Patient logged out successfully"));
});

const getTokenNo = asyncHandler(async (req, res) => {});
export { register, login, logout, generatePatientToken };
