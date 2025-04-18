import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

export const isAdmin = (handler) => (req, res) => {
    try {
        const token = req.cookies.get("token")?.value

        if (!token) {
            return NextResponse.json({ 'msg': 'Unauthorized: No token provided' }, {status: 401})
        }

        const decoded = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = decoded

        if (req.user.role !== 'admin') {
            return NextResponse.json({ msg: 'Forbidden: you are not admin' }, {status: 403})
        }

        return decoded

    } catch (error) {
        return NextResponse.json({ msg: error.message }, {status: 500})
    }
}