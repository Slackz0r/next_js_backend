//Functions
import { NextResponse } from "next/server";
import { lowerCaseCompare, validateBookData } from "@/utils/helpers/apiHelpers";
//Data
import books from "@/data/books";

export async function GET(req) {
  const url = new URL(req.url);
  const search = url.searchParams.get("search");

  let _books = [...books];

  if (search) {
    _books = _books.filter(
      (book) =>
        lowerCaseCompare(book.title, search) ||
        lowerCaseCompare(book.author, search)
    );
  }

  return NextResponse.json({ results: _books });
}

export async function POST(req) {
  const body = await req.json();
  // try {
  //   body = req.json();
  // } catch (error) {
  //   return NextResponse.json({
  //     message: "Not valid JSON",
  //   });

  const [hasErrors, errors] = validateBookData(body);
  if (hasErrors) {
    return NextResponse.json(
      {
        errors,
      },
      {
        status: 400,
      }
    );
  }
  const id = books.length++;
  const book = {
    ...body,
    id,
  };
  books.push(book);

  return NextResponse.json(
    {
      books: book,
    },
    {
      status: 200,
    }
  );
}
