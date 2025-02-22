import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    isNewPatient: {
      type: Boolean,
      default: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    medicalHistory: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

patientSchema.pre("save", async function (next) {
  const patient = this;
  if (patient.isModified("password")) {
    patient.password = await bcrypt.hash(patient.password, 8);
  }
  next();
});

patientSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const Patient = mongoose.model("Patient", patientSchema);
