import mongoose from "mongoose";

import { DB_NAME } from "../contants.js";
import { ApiError } from "../utils/ApiError.js";

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.DB_URL}/${DB_NAME}`
    );

    console.log("we are connect to database at", connection.connection.host);
  } catch (error) {
    throw new ApiError(
      401,
      error.message || "error in connection of database in db connect"
    );
  }
};

export { dbConnect };
