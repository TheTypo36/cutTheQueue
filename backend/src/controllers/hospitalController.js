import { Admin } from "../Models/admin.models";
import { Hospital } from "../Models/hospital.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

// const getHospitalInfo = asyncHandler(async (req, res) => {
//   const hospital = req.hospital;
// });

const getAdminSignIn = asyncHandler(async (req, res) => {
  const { hospitalName, email, password } = req.body;

  if (!hospitalName || !email || !password) {
    throw new ApiError(401, "hospitalName , email and password is required!!");
  }

  const admin = await Admin.findOne({ hospitalName });

  if (!admin) {
    throw new ApiError(501, "mongodb error in admin sigIn");
  }
  if (admin.email !== email) {
    throw new ApiError(502, "incorrect email");
  }
  if (admin.password !== password) {
    throw new ApiError(502, "incorrect password");
  }

  const hospitalInfo = await Hospital.aggregate([
    {
      $match: {
        hospital: admin.hospitalName,
      },
    },
    {
      $lookup: {
        from: "departments",
        localField: "_id",
        foreignField: "hospital",
        as: "allDeparments",
        pipeline: [
          {
            $lookup: {
              from: "doctors",
              localField: "doctors",
              foreignField: "_id",
              as: "allDoctors",
              pipeline: [
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

  if (!hospitalInfo) {
    throw new ApiError(501, "failed in getting hospital info");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, hospitalInfo[0], "sucessfull fetched info"));
});

export { getAdminSignIn };
