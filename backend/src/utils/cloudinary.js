import { vs as cloundinary } from "cloudinary";
import { asyncHandler } from "./asyncHandler";
import fs from "fs";
import { ApiError } from "./apiError";

cloundinary.config({
    cloud_name:
    api_key:
    api_secret:
})
const uploadOnCloudinary = asyncHandler(async (req, res, next) => {
    try{
        const result = await cloundinary.uploader.upload(req.file.path);
        fs.unlinkSync(req.file.path
    }catch(error){
        throw new ApiError(500, "Error uploading image");
    }
});
