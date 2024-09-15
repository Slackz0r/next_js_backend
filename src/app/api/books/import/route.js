import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

  let importedBooks = [...body].map((book) => {
    return {
      title: book.title,
      author: book.author,
    };
  });

  let newBooks;

  try {
    newBooks = await prisma.book.createMany({
      data: importedBooks,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Invalid data sent for book creation",
      },
      {
        status: 400,
      }
    );
  }
};
