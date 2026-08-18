import connectDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import Url from "@/lib/models/Url";
import { nanoid } from "nanoid";

export const createURLSchema = z.object({
  redirectURL: z.url(),
  customAlias: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-z)-9]+$/, "Alphanumeric only")
    .optional(),
});

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json().catch(() => {});
  if (!body) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }

  const parsed = createURLSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0].message },
      { status: 400 },
    );
  }

  const { redirectURL, customAlias } = parsed.data;
  const session = await auth();

  if (customAlias) {
    const taken = await Url.findOne({ shortId: customAlias });
    if (taken) {
      return NextResponse.json(
        { error: "Alias already taken" },
        { status: 409 },
      );
    }
  }

  const shortId = customAlias ?? nanoid(7);
  try {
    const url =  await Url.create({
      shortId,
      redirectURL,
      userId: session?.user?.id,
    });

    return NextResponse.json(
      {
        shortId: url.shortId,
        shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${url.shortId}`,
        redirectURL: url.redirectURL,
      },
      { status: 201 }
    );
  } catch (err: any) {
    if(err.code == 1100) {
      return NextResponse.json({ error: "something went wrong, Please try again later!"}, { status: 409 });
    }
    throw err;
  }
}
