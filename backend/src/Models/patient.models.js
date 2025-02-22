import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  deparment: {
    type: String,
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  isNewPatient: {
    type: Boolean,
    default: true,
  },
  phone: {
    type: String,
    required: true,
  },
  medicalHistory: {
    type: String,
    required: true,
  },
});

export const Patient = mongoose.model("Patient", patientSchema);
