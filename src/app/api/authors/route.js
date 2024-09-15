import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req) => {
  const url = new URL(req.url);
  const search = url.searchParams.get("search");

  let authors = [];

  if (search) {
    authors = await prisma.author.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });
  } else {
    authors = await prisma.author.findMany();
  }

  return NextResponse.json(authors);
};

// export const GET = async (req) => {
//   const url = new URL(req.url);
//   const search = url.searchParams.get("search");

//   let _authors = [...authors];

//   if (search) {
//     _authors = _authors.filter((author) =>
//       lowerCaseCompare(author.name, search)
//     );
//   }

//   return NextResponse.json({ results: _authors }, { status: 200 });
// };

export const POST = async (req) => {
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

  let newAuthor;
  try {
    newAuthor = await prisma.author.create({
      data: {
        name: body.name,
        yearOfBirth: body.yearOfBirth,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Invalid data sent for author creation",
      },
      {
        status: 400,
      }
    );
  }
  return NextResponse.json(newAuthor, { status: 201 });
};
// export const POST = async (req) => {
//   //parse incoming data
//   let body;
//   try {
//     body = await req.json();
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Valid data must be submitted" },
//       { status: 400 }
//     );
//   }

//   //?validate incoming data
//   //simulate database push
//   let dbAuthors = [...authors];

//   const newAuthor = {
//     id: dbAuthors.length + 1,
//     ...body,
//   };

//   dbAuthors.push(newAuthor);
//   //return new array
//   return NextResponse.json({ dbAuthors });
// };
