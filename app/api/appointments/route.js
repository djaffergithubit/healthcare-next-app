import { isAuth } from "@/lib/middlewares/isAuth";
import { Appointment } from "@/lib/models/appointments";
import { User } from "@/lib/models/users";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
        const user = await isAuth(request)
        const body = await request.json()
        const { doctor, reasonOfAppointment, additionalCommentsNotes, appointmentDate } = body

        const userFound = await User.findOne({ _id: user.userId })

        if (!userFound) {
            return NextResponse.json({ 'msg': "user not found" }, {status: 404})
        }

        if (user instanceof NextResponse) {
            return user;
        }

        const newAppointment = new Appointment({
            doctor,
            reasonOfAppointment,
            additionalCommentsNotes,
            appointmentDate,
            patient: user.userId
        })

        await newAppointment.save()
        return NextResponse.json({ 'msg': "New appointment has been created" }, {status: 201})

    } catch (error) {
        return NextResponse.json({ 'msg': error.message }, {status: 500})
    }
}

