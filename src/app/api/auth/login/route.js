import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { signJWT } from "@/utils/helpers/authHelpers";

const prisma = new PrismaClient();

export const POST = async (req) => {
  let body;
  try {
    body = await req.json();
    console.log("BODY:::", body);
    if (!body.email || !body.password) {
      throw new Error();
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "A valid user object has to be provided",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    const token = await signJWT({
      userId: user.id,
    });

    return NextResponse.json({
      user,
      token,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 400,
      }
    );
  }
};
