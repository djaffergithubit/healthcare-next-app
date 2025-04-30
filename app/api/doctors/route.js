import { Connect } from "@/lib/config/dbConfig";
import { isAuth } from "@/lib/middlewares/isAuth";
import { Doctor } from "@/lib/models/doctors";
import { User } from "@/lib/models/users";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // isAdmin(request)
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
        return NextResponse.json( { msg: "Something went wrong!" } , {status: 500})
    }
}

export async function GET(request){
    try {
        const user = await isAuth(request)
        
        const foundUser = await User.findById(user?.userId)

        if (!foundUser) {
            return NextResponse.json({ 'message': "user not found" }, {status: 404})
        }

        const doctors = await Doctor.find()
        return NextResponse.json({ data:doctors }, {status: 200})

    } catch (error) {
        return NextResponse.json({ "msg": "Something went wrong!" }, { status: 500 })
    }
}