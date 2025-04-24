import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    reasonOfAppointment: { type: String, required: true },
    additionalCommentsNotes: { type: String, default: "" },
    appointmentDate: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Processing', 'Scheduled'], default: "Pending" },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
},
{ timestamps: true }
)

export const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);