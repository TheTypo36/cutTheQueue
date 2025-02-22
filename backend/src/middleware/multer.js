import multer from "multer";
import fs from "fs";

const tempDir = "./public/temp";
if (!fs.existsSync(tempDir)) {
  console.log("Creating directory:", tempDir);
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log("Multer Destination Path:", );
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    console.log("Received File:", file);
    const fileExt = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${Date.now()}.${fileExt}`);
  },
});

export const upload = multer({ storage: storage });
