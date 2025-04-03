import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// Allow only frontend URL
const prodOrigins = [process.env.ORIGIN_1, process.env.ORIGIN_2].filter(
  Boolean
);
const devOrigin = ["http://localhost:5173"];
const allowedOrigins =
  process.env.NODE_ENV === "production" ? prodOrigins : devOrigin;

console.log("PORT:", process.env.PORT);
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("ORIGIN_1:", process.env.ORIGIN_1);
console.log("ORIGIN_2:", process.env.ORIGIN_2);

app.use(
  cors({
    origin: allowedOrigins || devOrigin,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new ApiError("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
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

import hospitalRouter from "./src/Routes/hospitalRouter.routes.js";
app.use("/api/v1/hospital", hospitalRouter);
app.use("/api/v1/speech", speechRouter);
export default app;
