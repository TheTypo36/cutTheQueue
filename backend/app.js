import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import "dotenv";

const app = express();

// Allow only frontend URL
const prodOrigins = [process.env.ORIGIN_1, process.env.ORIGIN_2];

const devOrigin = ["http://localhost:5173"];

const allowedOrigins =
  process.env.NODE_ENV === "production" ? prodOrigins : devOrigin;

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        console.log(origin, allowedOrigins);
        callback(null, true);
      } else {
        callback(new ApiError("not allowed by CORS"));
      }
    },
    credentials: true,
    metthods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import patientRouter from "./src/Routes/patientRouter.routes.js";
import { ApiError } from "./src/utils/ApiError.js";
app.use("/api/v1/patient", patientRouter);
// app.use("/api/v1/hospital", hospitalRouter);
// app.use("/api/v1/doctor", doctorRouter);
export default app;
