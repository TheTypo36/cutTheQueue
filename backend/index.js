import { configDotenv } from "dotenv";
import app from "./app.js";
import "dotenv";
configDotenv({
  path: "./.env",
});
app.listen(process.env.PORT, () => {
  console.log(`server is running ${process.env.PORT}`);
});
