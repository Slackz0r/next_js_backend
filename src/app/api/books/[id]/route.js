import { NextResponse } from "next/server";
import { getIdFromUrl, object404Respsonse } from "@/utils/helpers/apiHelpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req, options) => {
  const id = options.params.id;
  let book;

  try {
    book = await prisma.book.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(book);
  } catch (error) {
    console.log(error);
    return object404Respsonse(NextResponse, "Book");
  }
};

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

  let book;

  try {
    book = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        title: body.title,
        author: body.author,
      },
    });

    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error updating the book",
      },
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (req, options) => {
  const id = options.params.id;

  try {
    await prisma.book.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    object404Respsonse();
  }
};
