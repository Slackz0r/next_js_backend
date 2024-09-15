//Functions
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// import { lowerCaseCompare, validateBookData } from "@/utils/helpers/apiHelpers";

const prisma = new PrismaClient();

export async function GET(req) {
  const url = new URL(req.url);
  const search = url.searchParams.get("search");
  let books = [];
  if (search) {
    books = await prisma.book.findMany({
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
    });
  } else {
    books = await prisma.book.findMany();
  }

  return NextResponse.json(books);
}
// export async function GET(req) {
//   const url = new URL(req.url);
//   const search = url.searchParams.get("search");

//   await prisma.book.create({
//     data: { title: "LOTR", author: "Tolkien" },
//   });
//   let _books = [...books];

//   if (search) {
//     _books = _books.filter(
//       (book) =>
//         lowerCaseCompare(book.title, search) ||
//         lowerCaseCompare(book.author, search)
//     );
//   }

//   return NextResponse.json({ results: _books });
// }

export async function POST(req) {
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

  let newBook;
  try {
    newBook = await prisma.book.create({
      data: {
        title: body.title,
        author: body.author,
      },
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Invalid data sent for book creation",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(newBook, {
    status: 201,
  });
}
// export async function POST(req) {
//   const body = await req.json();
//   // try {
//   //   body = req.json();
//   // } catch (error) {
//   //   return NextResponse.json({
//   //     message: "Not valid JSON",
//   //   });

//   const [hasErrors, errors] = validateBookData(body);
//   if (hasErrors) {
//     return NextResponse.json(
//       {
//         errors,
//       },
//       {
//         status: 400,
//       }
//     );
//   }
//   const id = books.length++;
//   const book = {
//     ...body,
//     id,
//   };
//   books.push(book);

//   return NextResponse.json(
//     {
//       books: book,
//     },
//     {
//       status: 200,
//     }
//   );
// }
