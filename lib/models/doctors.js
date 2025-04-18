const { default: mongoose } = require("mongoose");


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

export const Doctor = mongoose.model("Doctor", doctorSchema)