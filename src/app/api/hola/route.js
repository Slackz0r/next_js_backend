import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json(
    {
      message: "Not Implemented: Spanish support is not available yet.",
    },
    {
      status: 501,
    }
  );
}
