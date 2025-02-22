import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required,
  },
  deparment: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  isNew: {
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
