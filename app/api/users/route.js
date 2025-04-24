import { User } from "@/lib/models/users";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Connect } from "@/lib/config/dbConfig";
import { isAuth } from "@/lib/middlewares/isAuth";

export async function POST(request) {
    await Connect(); 
    try {
        const body = await request.json();
        const { full_name, email_address, phone_number } = body;

        const userFound = await User.findOne({ email: email_address });

        if (userFound) {
            const token = jwt.sign({ userId: userFound._id }, process.env.SECRET_TOKEN, { expiresIn: "1h" });

            const response = NextResponse.json(
                { msg: "User already exists", exist: true, token },
                { status: 200 }
            );

            console.log('token', token);            

            response.cookies.set('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 3600
            })

            return response
        }

        const newUser = new User({
            fullName: full_name,
            email: email_address,
            phoneNumber: phone_number,
        });

        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_TOKEN, { expiresIn: "1h" });

        const response = NextResponse.json(
            { msg: "User created successfully", exist: false, token },
            { status: 201 }
        );

        console.log('token', token);

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600 // 1 hour
        })

        return response

    } catch (error) {
        return NextResponse.json(
            { msg: error.message },
            { status: 500 }
        );
    }
}

export const GET = async (request) => {
  const user = isAuth(request);

  await Connect();
  const userFound = await User.findOne({_id: user.userId }).populate('primaryCarePhysician', 'fullName doctorProfile')

  if (!userFound) {
    return NextResponse.json({ msg: "user doesn\'t exist" })
  }
  
  if (user instanceof NextResponse) {
    return user;
  }

  return NextResponse.json(
    { msg: "User fetched successfully", user: userFound },
    { status: 200 }
  );
};

export async function PUT(request){
    try {
        const user = isAuth(request)
        const body = await request.json()
        const { 
            fullName,
            email,
            phoneNumber,
            dateOfBirth,
            address,
            occupation,
            emergencyContactName,
            primaryCarePhysician,
            insuranceProvider,
            insurancePolicyNumber,
            allergies,
            currentMedications,
            familyMedicalHistory,
            pastMedicalHistory,
         } = body

        await Connect()
        console.log('data', dateOfBirth, address);
        const data = {
            fullName,
            email,
            phoneNumber,
            dateOfBirth,
            address,
            occupation,
            emergencyContactName,
            primaryCarePhysician,
            insuranceProvider,
            insurancePolicyNumber,
            allergies,
            currentMedications,
            familyMedicalHistory,
            pastMedicalHistory
        }

        const userFound = await User.findOne({ _id: user.userId })

        if (!userFound) {
            return NextResponse.json({ msg: "user not found" }, {status: 400})
        }
        
        const updatedUser = await User.findByIdAndUpdate(user.userId, data)

        return NextResponse.json( { msg: "user updated successfully", user: updatedUser }, {status: 200} )

    } catch (error) {
        return NextResponse.json({ msg: error.message }, { status: 500 })
    }
}

export async function DELETE(){
    const response = NextResponse.json({ "msg": "user logged out successfully" })

    response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
        path: '/'
    })

    return response
}