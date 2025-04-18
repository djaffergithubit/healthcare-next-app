import { Connect } from "@/lib/config/dbConfig";
import { Doctor } from "@/lib/models/doctors";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {
        isAdmin(request)
        const body = await request.json()
        const { fullName } = body

        await Connect()
        
        const foundDoctor = await Doctor.findOne({fullName: fullName})

        if (foundDoctor) {
            return NextResponse.json({ msg: "doctor already exist" }, {status: 400})
        }

        const newDoctor = new Doctor({
            fullName: fullName,
            doctorProfile: request.file ? req.file.filename : ""
        })

        await newDoctor.save()
        return NextResponse.json({ msg: "Doctor created successfully" }, {status: 201})

    } catch (error) {
        return NextResponse.json( { msg: error.message } , {status: 500})
    }
}