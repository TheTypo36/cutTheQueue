import { Patient } from "../Models/patient.models";
import { ApiError } from "../utils/ApiError";
import { speech } from "@google-cloud/text-to-speech";
import { generateAcessTokenAndRefreshToken } from "./patientController";
const voiceLogin = async (req, res) => {
  const client = new speech.SpeechClient({
    keyFilename: "google-key.json",
  });
  try {
    const filePath = req.file.path;

    const audioBytes = fs.readFileSync(filePath).toString("base64");

    const request = {
      audio: {
        content: audioBytes,
      },
      config: {
        encoding: "LINEAR16",
        sampleRateHertz: 16000,
        languageCode: "en-US",
      },
    };

    const [response] = await client.recognize(request);
    const transcript = response.results
      .map((result) => result.alternatives[0].transcript)
      .join(" ");

    console.log("Transcript:", transcript);

    const words = transcript.split(" ");
    const wordCount = words.length;
    console.log("Word Count:", wordCount);
    const email = words[0];
    const password = words[1].slice(1).join(" ");

    const patient = await Patient.findOne({
      email,
    });

    const isPasswordValid = await patient.isPasswordCorrect(password);
    if (!patient && !isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } =
      await patient.generateAcessTokenAndRefreshToken(patient._id);

    if (!accessToken || !refreshToken) {
      throw new ApiError(500, "Error generating tokens in voice login");
    }

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(
          200,
          { patient, accessToken, refreshToken },
          "Patientlogged in successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, error.message || "Error in voice login");
  }
};

export { voiceLogin };
