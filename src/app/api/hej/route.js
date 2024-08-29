import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);

  const name = url.searchParams.get("name");
  const age = url.searchParams.get("age");
  const address = url.searchParams.get("address");
  console.log("REQUEST", req);

  return NextResponse.json(
    {
      message: `Hej, mitt namn är ${name}. Jag är ${age} år gammal och bor på ${address}`,
    },
    {
      status: 200,
    }
  );
}

export async function POST(req) {
  const url = new URL(req.url);

  const name = url.searchParams.get("name");
  const age = url.searchParams.get("age");
  const address = url.searchParams.get("address");
  console.log("REQUEST", req);

  return NextResponse.json(
    {
      message: `Hej, mitt namn är ${name}. Jag är ${age} år gammal och bor på ${address}`,
    },
    {
      status: 200,
    }
  );
}
