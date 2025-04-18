import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true, index: true },
    phoneNumber: { type: String, required: true, index: true },
    dateOfBirth: { type: Date, default: null },
    address: { type: String, default: "" },
    occupation: { type: String, default: "" },
    emergencyContactName: { type: String, default: "" },
    primaryCarePhysician: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    insuranceProvider: { type: String, default: "" },
    insurancePolicyNumber: { type: String, default: "" },
    allergies: { type: [String], default: [] },
    currentMedications: { type: [String], default: [] },
    familyMedicalHistory: { type: String, default: "" },
    pastMedicalHistory: { type: String, default: "" },
    // identificationType: {type: String, enum: ["Birth Certificate", "Passport", "Driver’s License", "National Card"]},
    // identificationNumber: {type: String},
    // identificationDocument: {type: String},
    // verificationStatus: {type: String, enum: ['pending', 'processing', 'verified', 'denied']},
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  }, {
    timestamps: true
  });
  
  export const User = mongoose.models.User || mongoose.model('User', userSchema);
  