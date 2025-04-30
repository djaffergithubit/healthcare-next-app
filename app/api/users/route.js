import { User } from "@/lib/models/users";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Connect } from "@/lib/config/dbConfig";
import { isAuth } from "@/lib/middlewares/isAuth";

export async function POST(request) {
    await Connect(); 
    try {
        const body = await request.json();
        const { adminPassKey } = body
        const { full_name, email_address, phone_number } = body;

        if (adminPassKey) {
            const actualCode = process.env.ADMIN_PASS_KEY
            const userFound = await User.findOne({email: "admin@gmail.com"})
            const token = jwt.sign({ userId: userFound?._id}, process.env.SECRET_TOKEN, { expiresIn: 3600 })
            if (adminPassKey === JSON.stringify(actualCode)) {
                const response = NextResponse.json({ "msg": "Admin logged in successfully", success:true }, {status: 200})

                response.cookies.set('token', token, {
                    httpOnly: true,
                    path: '/',
                    secure: true,
                    maxAge: 3600
                })
                response.cookies.set('admin', "true", {
                    path: '/',
                    secure: true,
                    maxAge: 3600
                })

                return response

            }else {
                return NextResponse.json({ 'msg': "Invalid admin pass key! Please try again.", success: false}, {status: 401})
            }
        }else{
            const userFound = await User.findOne({ email: email_address });

            if (userFound) {
                const token = jwt.sign({ userId: userFound._id }, process.env.SECRET_TOKEN, { expiresIn: "1h" });

                const response = NextResponse.json(
                    { msg: "You are logged In", exist: true, token },
                    { status: 200 }
                );

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
                { msg: "You have registered successfully", exist: false, token },
                { status: 201 }
            );

            response.cookies.set('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 3600 // 1 hour
            })

            return response
        }

    } catch (error) {
        return NextResponse.json(
            { msg: "Something went wrong!" },
            { status: 500 }
        );
    }
}

export const GET = async (request) => {
  const user = await isAuth(request);

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
        return NextResponse.json({ msg: "Something went wrong!" }, { status: 500 })
    }
}

export async function DELETE(){
    const response = NextResponse.json({ "msg": "user logged out successfully" })

    response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
        path: '/'
    })

    response.cookies.set("admin", "", {
        httpOnly: true,
        expires: new Date(0),
        path: '/'
    })

    return response
}