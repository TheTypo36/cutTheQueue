import express from "express";
import cookieParser from "cookie-parser";

import cors from "cors";
import "dotenv";

const app = express();

app.use(
  cors({
    origin: "./",
  })
);

export default app;
