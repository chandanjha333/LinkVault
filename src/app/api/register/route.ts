import bcrypt from "bcryptjs";
import connectDB from "@/lib/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json()

  await connectDB()
  const existing = await User.findOne({ email })
  if(existing) {
    return NextResponse.json({ error:"Email already in use" }, { status: 409 })
  }

  const hashed = await bcrypt.hash(password, 10)
  await User.create({ name, email, password:hashed, provider: "credentials" })

  return NextResponse.json({ success: true })
}