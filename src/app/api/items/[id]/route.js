import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { object404Respsonse } from "@/utils/helpers/apiHelpers";

const prisma = new PrismaClient();

export const DELETE = async (req, options) => {
  const id = options.params.id;

  try {
    await prisma.item.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    object404Respsonse(NextResponse, "Item");
  }
  return NextResponse.json({
    status: 200,
  });
};

// export const PUT = async (req, options) => {
//   const id = options.params.id;
//   let body;

//   try {
//     body = await req.json();
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: "A valid JSON object has to be sent",
//       },
//       {
//         status: 400,
//       }
//     );
//   }

//   let item;

//   try {
//     item = await prisma.item.update({
//       where: { id: Number(id) },
//       data: {
//         name: body.name,
//         description: body.description,
//         quantity: body.quantity,
//         category: body.category,
//       },
//     });

//     return NextResponse.json(item, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: "Error updating the item",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// };

export const PUT = async (req, { params }) => {
  const id = params.id;

  let body;

  try {
    body = await req.json();
  } catch (error) {
    console.error("Invalid JSON:", error);
    return NextResponse.json(
      { message: "A valid JSON object has to be sent" },
      { status: 400 }
    );
  }

  try {
    // Make sure to use the correct model and update fields
    const item = await prisma.item.update({
      where: { id: Number(id) },
      data: {
        name: body.name,
        description: body.description,
        quantity: Number(body.quantity),
        category: body.category,
      },
    });

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error("Error updating the item:", error);
    return NextResponse.json(
      { message: "Error updating the item" },
      { status: 500 }
    );
  }
};
