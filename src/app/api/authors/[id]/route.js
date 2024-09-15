import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { object404Respsonse } from "@/utils/helpers/apiHelpers";

const prisma = new PrismaClient();

export const GET = async (req, options) => {
  const id = options.params.id;
  let author;

  try {
    author = await prisma.author.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(author);
  } catch (error) {
    console.log(error);
    return object404Respsonse(NextResponse, "Author");
  }
};
// export const GET = async (req, options) => {
//   const id = options.params.id;
//   const author = authors.find((a) => a.id == id);

//   return NextResponse.json({ author });
// };

export const PUT = async (req, options) => {
  const id = options.params.id;
  let body;

  try {
    body = await req.json();
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

  let author;

  try {
    author = await prisma.author.update({
      where: { id: Number(id) },
      data: {
        name: body.name,
        yearOfBirth: body.yearOfBirth,
      },
    });

    return NextResponse.json(author, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error updating the author",
      },
      {
        status: 500,
      }
    );
  }
};
// export const PUT = async (req) => {
//   const body = await req.json();
//   const id = authors.length + 1;

//   const author = {
//     id,
//     ...body,
//   };

//   return NextResponse.json({ author });
// };
