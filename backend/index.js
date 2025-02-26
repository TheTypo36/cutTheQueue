import { configDotenv } from "dotenv";
import app from "./app.js";
import "dotenv";
import { dbConnect } from "./src/DB/index.js";
import { ApiError } from "./src/utils/ApiError.js";
configDotenv({
  path: "./.env",
});

dbConnect().then(() => {
  app.on("error", (error) => {
    throw new ApiError(
      500,
      error.message || "error in connecting to db in main index.file"
    );
  });

  app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`server is running ${process.env.PORT}`);
  });
});
