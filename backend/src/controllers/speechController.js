import { Patient } from "../Models/patient.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"; // Make sure this is imported
import fs from "fs";
import path from "path";
import speech from "@google-cloud/speech"; // Not text-to-speech
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const voiceLogin = async (req, res, next) => {
  // Check if file exists in the request
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No audio file uploaded",
    });
  }

  console.log("Received File:", req.file);

  try {
    const client = new speech.SpeechClient({
      keyFilename: path.resolve(__dirname, "../google-key.json"),
    });

    const filePath = req.file.path;
    console.log("Reading file from path:", filePath);

    // Read file as buffer first to verify it exists
    let audioBytes;
    try {
      audioBytes = fs.readFileSync(filePath).toString("base64");
      console.log("Successfully read audio file, size:", audioBytes.length);
    } catch (fsError) {
      console.error("Error reading file:", fsError);
      return res.status(500).json({
        success: false,
        message: `Error reading audio file: ${fsError.message}`,
      });
    }

    // Speech-to-text request configuration
    const request = {
      audio: {
        content: audioBytes,
      },
      config: {
        encoding: "LINEAR16", // Change to match your file format, m4a might need "MP3" or other encoding
        sampleRateHertz: 16000,
        languageCode: "en-US",
      },
    };

    console.log("Sending request to Speech API");

    // Use recognize method, not synthesizeSpeech
    try {
      const [response] = await client.recognize(request);
      console.log("Speech API Response:", response);

      if (!response.results || response.results.length === 0) {
        return res.status(400).json({
          success: false,
          message:
            "Could not transcribe audio. Please speak clearly and try again.",
        });
      }

      const transcript = response.results
        .map((result) => result.alternatives[0].transcript)
        .join(" ");

      console.log("Transcript:", transcript);

      // Parse the transcript for credentials
      const words = transcript.trim().split(" ");
      console.log("Word Count:", words.length);

      if (words.length < 2) {
        return res.status(400).json({
          success: false,
          message:
            "Could not identify credentials in the audio. Please say your email and password clearly.",
        });
      }

      // Better parsing strategy - first word is email, rest is password
      const email = words[0];
      const password = words.slice(1).join(" ");

      console.log("Attempting login with email:", email);

      // Find the patient
      const patient = await Patient.findOne({ email });

      if (!patient) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Verify password
      const isPasswordValid = await patient.isPasswordCorrect(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Generate tokens
      const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshToken(patient._id);

      const options = {
        httpOnly: true,
        secure: true,
      };

      // Send response
      return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(
          new ApiResponse(
            200,
            { patient, accessToken, refreshToken },
            "Patient logged in successfully"
          )
        );
    } catch (speechError) {
      console.error("Speech API Error:", speechError);
      return res.status(500).json({
        success: false,
        message: `Error processing speech: ${speechError.message}`,
      });
    }
  } catch (error) {
    console.error("General Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error in voice login",
    });
  } finally {
    // Clean up the uploaded file
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error("Error deleting file:", err);
      }
    }
  }
};

export { voiceLogin };
