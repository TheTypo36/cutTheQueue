import { Admin } from "../Models/admin.models.js";
import { Hospital } from "../Models/hospital.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// const getHospitalInfo = asyncHandler(async (req, res) => {
//   const hospital = req.hospital;
// });
const generateAccessTokenAndRefreshToken = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    const accessToken = admin.generateAcessToken();
    const refreshToken = admin.generateRefreshToken();
    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Error generating tokens in generateAcessTokenAndRefreshToken"
    );
  }
};
const getAdminSignIn = asyncHandler(async (req, res) => {
  console.log("req.body in admincontroller", req.body);
  const { hospitalName, email, password } = req.body;

  if (!hospitalName || !email || !password) {
    throw new ApiError(401, "hospitalName , email and password is required!!");
  }

  const admin = await Admin.findOne({ hospitalName });
  console.log("admin in admin controller", admin);
  if (!admin) {
    throw new ApiError(501, "mongodb error in admin sigIn");
  }
  if (admin.email !== email) {
    throw new ApiError(502, "incorrect email");
  }
  if (admin.password !== password) {
    throw new ApiError(502, "incorrect password");
  }
  // const existedHospital = await Hospital.findOne({ name: hospitalName });
  // console.log("existed hospital", existedHospital);
  const hospitalInfo = await Hospital.aggregate([
    {
      $match: {
        name: admin.hospitalName,
      },
    },
    {
      $lookup: {
        from: "departments",
        localField: "departments",
        foreignField: "_id",
        as: "allDepartments",
        pipeline: [
          {
            $lookup: {
              from: "doctors",
              localField: "doctors", // Refers to `doctors` array in Department
              foreignField: "_id",
              as: "allDoctors",
              pipeline: [
                {
                  $lookup: {
                    from: "patients",
                    localField: "patients", // Fix: Reference `patients` array in Doctor
                    foreignField: "_id",
                    as: "allPatients",
                    pipeline: [
                      {
                        $project: {
                          name: 1, // Fetch only name
                        },
                      },
                    ],
                  },
                },
                {
                  $project: {
                    name: 1,
                    room: 1,
                    allPatients: 1,
                  },
                },
              ],
            },
          },
          {
            $project: {
              name: 1,
              allDoctors: 1,
            },
          },
        ],
      },
    },
  ]);

  if (!hospitalInfo || hospitalInfo.length === 0) {
    throw new ApiError(501, "Failed in getting hospital info");
  }
  console.log(hospitalInfo[0]);
  const tokens = await generateAccessTokenAndRefreshToken(admin._id);
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        hospitalInfo: hospitalInfo[0],
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
      "Successfully fetched info and generated tokens"
    )
  );
});

export { getAdminSignIn };
