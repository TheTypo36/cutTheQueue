import mongoose from "mongoose";

const doctorScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  degree: {},
  department: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  room: {
    type: Number,
    required: true,
  },
});

export const Doctor = mongoose.model("Doctor", doctorScheme);
