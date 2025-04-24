import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    doctorProfile: {
        type: String,
        default: ""
    }
},
    {
        timestamps: true
    }
)

export const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);