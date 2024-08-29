//Functions
import { NextResponse } from "next/server";
import { lowerCaseCompare } from "@/utils/helpers/apiHelpers";
//Data
import products from "@/data/products";

export async function GET(req) {
  const url = new URL(req.url);

  const category = url.searchParams.get("category");
  const search = url.searchParams.get("search");
  const maxPrice = url.searchParams.get("max-price");
  let _products = [...products]; // Simulates a database call

  if (category) {
    _products = _products.filter(
      (product) => lowerCaseCompare(product.category, category)

      // product.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (search) {
    _products = _products.filter(
      (product) =>
        lowerCaseCompare(product.name, search) ||
        lowerCaseCompare(product.description, search)

      // product.name.toLowerCase().includes(search.toLowerCase()) ||
      // product.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (maxPrice) {
    const maxPriceNum = Number(maxPrice);

    if (!maxPriceNum) {
      return NextResponse.json(
        {
          message: "Error: Max price must be a number",
        },
        {
          status: 400,
        }
      );
    }
    _products = _products.filter((product) => product.price <= maxPriceNum);
  }

  return NextResponse.json({ results: _products });
}

export async function POST(req) {
  const body = await req.json();

  const id = products.length + 1;
  const product = {
    ...body,
    id,
  };
  console.log("REQUEST", body);
  return NextResponse.json(
    {
      product: product,
    },
    {
      status: 201,
    }
  );
}

export async function PUT(req) {
  const body = await req.json();
  const url = new URL(req.url);

  let _products = [...products];
  const id = parseInt(url.searchParams.get("id"));
  const productIndex = _products.findIndex((product) => product.id === id);

  const updatedProduct = {
    ..._products[productIndex],
    name: body.name,
    description: body.description,
  };

  return NextResponse.json(
    { product: updatedProduct },
    {
      status: 200,
    }
  );
}

export async function DELETE(req) {
  const url = new URL(req.url);

  let _products = [...products];
  const id = parseInt(url.searchParams.get("id"));

  const productIndex = _products.findIndex((product) => product.id === id);

  _products.splice(productIndex, 1);

  return NextResponse.json(
    {
      products: _products,
    },
    { status: 201 }
  );
}
