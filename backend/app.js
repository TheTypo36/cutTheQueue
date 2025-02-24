import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv";

const app = express();

// Allow only frontend URL

app.use(
  cors({
    origin: process.env.FRONT_END_URL, // Allow only frontend URL
    credentials: true, // Allow cookies and authorization headers
    methods: "GET,POST,PUT,DELETE,OPTIONS", // Allow necessary methods
    allowedHeaders: "Content-Type,Authorization", // Allow required headers
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
