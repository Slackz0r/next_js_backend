import { NextResponse } from "next/server";
import { getIdFromUrl } from "@/utils/helpers/apiHelpers";
import books from "@/data/books";

export async function GET(req) {
  const id = getIdFromUrl(req.url);
  console.log("ID", id);
  if (!id) {
    return NextResponse.json(
      {
        message: "Book not found",
      },
      {
        status: 404,
      }
    );
  }

  const book = books.find((b) => b.id == id);
  console.log("BOOK", book);
  if (!book) {
    return NextResponse.json(
      {
        message: "Book not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({ book });
}

export async function PUT(req) {
  const id = getIdFromUrl(req.url);

  return NextResponse.json({});
}

export async function DELETE(req) {
  return NextResponse.json({});
}
