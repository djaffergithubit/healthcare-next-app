import { isAuth } from "@/lib/middlewares/isAuth";
import { Appointment } from "@/lib/models/appointments";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    try{
        const user = await isAuth(request)
        if (user instanceof NextResponse) {
            return user
        }

        const appointment = await Appointment.findById(params._id).populate('doctor', "fullName doctorProfile")

        if (!appointment) {
            return NextResponse.json({ "msg": "Appointment not found" }, {status: 404})
        }

        return NextResponse.json({ "msg": "get your data", appointment: appointment })
    }
    catch(error){
        return NextResponse.json({ "msg": error.message }, {status: 500})
    }
}