import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
console.log("CLOUDINARY CONFIG", {
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET ? "******" : "NOT FOUND",
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const absolutePath = path.resolve(localFilePath);
    console.log("absolutePath", absolutePath);
    console.log("localFilePath", localFilePath);

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("result", result);
    fs.unlinkSync(localFilePath);
    console.log();
    return result;
  } catch (error) {
    fs.unlinkSync(localFilePath);

    throw error;
  }
};

export { uploadOnCloudinary };
