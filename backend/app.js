import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv";

const app = express();

// Allow only frontend URL

const allowedOrigins = [
  "https://fosshack-2025-qqxa5momk-thetypo36s-projects.vercel.app",
  "https://fosshack-2025.vercel.app", // Add all Vercel domains
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import patientRouter from "./src/Routes/patientRouter.routes.js";
app.use("/api/v1/patient", patientRouter);
// app.use("/api/v1/hospital", hospitalRouter);
// app.use("/api/v1/doctor", doctorRouter);
export default app;
