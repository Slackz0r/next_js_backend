import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { signJWT } from "@/utils/helpers/authHelpers";

const prisma = new PrismaClient();

export const POST = async (req) => {
  let body;
  try {
    body = await req.json();
    if (!body.email || !body.password || !body.name) {
      throw new Error();
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "A valid JSON object has to be sent",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
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
