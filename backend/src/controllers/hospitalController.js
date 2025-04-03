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
const getHospital = asyncHandler(async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "hospital Name is required"));
    }
    console.log("got the name", name);

    const hospital = await Hospital.findOne({ name: name });

    if (!hospital) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Hospital Not Found"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, { hospital }, "Successfully fetch the hospital")
      );
  } catch (error) {
    throw new ApiError(500, error.message || "couldn't fetch the hospital");
  }
});
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
              localField: "doctors",
              foreignField: "_id",
              as: "allDoctors",
              pipeline: [
                // Ensure we handle potential null or empty patient arrays
                {
                  $addFields: {
                    patients: { $ifNull: ["$patients", []] },
                  },
                },
                {
                  $lookup: {
                    from: "patients",
                    localField: "patients",
                    foreignField: "_id",
                    as: "allPatients",
                    pipeline: [
                      {
                        $project: {
                          name: 1,
                          // Add other patient fields you want to retrieve
                          email: 1,
                          age: 1,
                          // Add more fields as needed
                        },
                      },
                    ],
                  },
                },
                {
                  $project: {
                    name: 1,
                    room: 1,
                    patients: 1, // Keep original patient references
                    allPatients: 1, // Populated patient details
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
    // Optional: Additional stages for debugging
    {
      $addFields: {
        departmentCount: { $size: "$allDepartments" },
        firstDepartmentDoctorCount: {
          $cond: [
            { $gt: [{ $size: "$allDepartments" }, 0] },
            { $size: "$allDepartments.0.allDoctors" },
            0,
          ],
        },
      },
    },
  ]);

  // Debugging logs
  console.log("Hospital Info:", JSON.stringify(hospitalInfo, null, 2));
  console.log("Total Departments:", hospitalInfo[0]?.departmentCount);
  console.log(
    "Doctors in First Department:",
    hospitalInfo[0]?.firstDepartmentDoctorCount
  );

  // Optional error handling
  if (!hospitalInfo || hospitalInfo.length === 0) {
    throw new ApiError(404, "Hospital not found");
  }
  console.log("HOSPITAL INFO", hospitalInfo[0]);
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

export { getAdminSignIn, getHospital };
