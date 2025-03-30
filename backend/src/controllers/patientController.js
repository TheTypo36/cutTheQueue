import { Patient } from "../Models/patient.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { PatientToken } from "../Models/patientToken.models.js";
import { Doctor } from "../Models/doctor.models.js";
import { Department } from "../Models/department.models.js";
import axios from "axios";
// import generateToken from "../utils/generateToken.js";
const options = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

const generatePatientToken = async (patientId) => {
  try {
    // Validate input
    if (!patientId) {
      throw new ApiError(400, "Patient ID is required");
    }

    // Get today's date at the start of the day
    const today = new Date();
    today.setHours(1, 0, 0, 0);
    const todayStr = today.toISOString().split("T")[0];

    // Fetch patient with error handling
    const patient = await Patient.findById(patientId).populate("department");

    console.log("patient", patient);

    if (!patient) {
      throw new ApiError(404, "Patient not found");
    }

    // Fetch or create today's token record
    let tokenData = await PatientToken.findOne({
      date: todayStr,
      department: patient.department._id,
    });

    console.log("tokenData", tokenData);

    // Check token limit
    if (tokenData && tokenData.lastTokenNo >= 100) {
      throw new ApiError(400, "Token limit reached for today");
    }

    // Determine next token number
    const nextTokenNo = tokenData ? tokenData.lastTokenNo + 1 : 1;

    // Assign doctor logic
    let assignedDoctor;
    if (patient.isNewPatient) {
      // Find doctor with minimum patients in the department
      assignedDoctor = await Doctor.findOne({
        department: patient.department._id,
      })
        .sort({ patients: 1 })
        .limit(1);

      if (!assignedDoctor) {
        throw new ApiError(404, "No available doctors in the department");
      }
    } else {
      // Use existing doctor for returning patients
      assignedDoctor = patient.doctor;
    }

    console.log("assignedDoctor", assignedDoctor);
    // Generate or update token
    if (!tokenData) {
      tokenData = await PatientToken.create({
        token: `${todayStr}-${nextTokenNo}`,
        date: todayStr,
        lastTokenNo: nextTokenNo,
        department: patient.department._id,
        doctor: assignedDoctor._id,
        patient: patient._id,
      });
    } else {
      tokenData.lastTokenNo = nextTokenNo;
      await tokenData.save();
    }

    // Update patient details
    patient.isNewPatient = false;
    patient.doctor = assignedDoctor._id;
    patient.patientToken = tokenData._id;
    await patient.save({ validateBeforeSave: false });

    return tokenData;
  } catch (error) {
    console.error("Error in generatePatientToken:", error);

    // Re-throw known API errors, wrap others
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, "Unexpected error in token generation");
  }
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
  console.log("req.body in register", req.body);
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

  let incomingDepartment = await Department.findOne({ name: department });

  if (!incomingDepartment) {
    throw new ApiError(404, "Department not found");
  }

  const patient = await Patient.create({
    name,
    email,
    password,
    age,
    phoneNumber,
    isNewPatient,
    department: incomingDepartment._id,
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
  //
  // console.log("this is patientDepartment", patient.department);

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { patient, accessToken, refreshToken },
        "Patientlogged in successfully"
      )
    );
});

const getTokenNo = asyncHandler(async (req, res) => {
  try {
    const patient = await Patient.findById(req.patient._id);

    if (!patient) {
      throw new ApiError(404, "Patient not found");
    }

    let tokenData = patient?.patientToken;
    if (!tokenData) {
      tokenData = await generatePatientToken(patient._id);
      console.log("getting new token", tokenData);
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, tokenData, "Token number fetched successfully")
      );
  } catch (error) {
    throw new ApiError(500, error.message || "Error fetching token number");
  }
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

const getMedicalRecord = asyncHandler(async (req, res) => {
  if (!req.patient || !req.patient.medicalHistory) {
    throw new ApiError(500, "not getting the info from verifyjwt");
  }
  const medicalHistory = req.patient.medicalHistory;
  console.log("getting the record ", medicalHistory);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        medicalHistory,
        "successfull fetched patient medical History"
      )
    );
});
const getHospitalSuggestion = asyncHandler(async (req, res) => {
  try {
    const { lat, lng } = req.query;
    console.log("lat", lat, "lng", lng);
    if (!lat || !lng) {
      throw new ApiError(400, "Latitude and Longitude are required");
    }
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10000&type=hospital&key=${apiKey}&&keyword=government+hospital|AIIMS|Mahaveer&type=hospital|university|research_institute`;
    const response = await axios.get(url);
    console.log("response", response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export {
  register,
  login,
  logout,
  generatePatientToken,
  getTokenNo,
  getMedicalRecord,
  getHospitalSuggestion,
};
