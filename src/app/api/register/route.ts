import bcrypt from "bcryptjs";
import connectDB from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().toLowerCase().pipe(z.email("Invalid email")),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: Request) {
  try{
    const body = await req.json().catch(() => null)
    if(!body) {
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }

    const parsed = registerSchema.safeParse(body);
    if(!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message },
        { status: 400 }
      );
    }
    const { name, email, password } = parsed.data;

    await connectDB();

    const existing = await User.findOne({ email });
    if(existing) {
      return NextResponse.json( { message: "Email already in use"}, {status: 409} );
    }

    const hashed = await bcrypt.hash(password, 10);

    try {
      await User.create({ name, email, password: hashed, provider: "credentials" });
    } catch(err:any) {
      if(err.code == 11000) {
        return NextResponse.json( { message: "Email already in use"}, { status : 409 });
      }
      throw err;
    }

    return NextResponse.json({ success: true });
  } catch(err) {
    console.log("Register error:", err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}