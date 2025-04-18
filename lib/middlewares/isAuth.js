// lib/middlewares/isAuth.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const isAuth = (request) => {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ msg: "Unauthorized: No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    return decoded; 
  } catch (error) {
    return NextResponse.json({ msg: "Unauthorized: Invalid token" }, { status: 401 });
  }
};
