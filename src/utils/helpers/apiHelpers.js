import { ProductCategory } from "@/data/products";

export function lowerCaseCompare(a = "", b = "") {
  return a.toLowerCase().includes(b.toLowerCase());
}

export function validateProductData(data) {
  let errors = {};
  if (!body.name) {
    errors.name = "A name is required";
    return NextResponse.json({
      status: 400,
    });
  }

  if (!data.description || data.description.length < 10) {
    errors.description =
      "A description is needed and has to be 10 characters or longer";
  }
  if (!data.price || !Number(data.price) || data.price < 0) {
    errors.price = "Price must be a number and greater than 0";
  }
  if (!ProductCategory.isCategory(data.category)) {
    errors.category = "You need to enter a valid category";
  }

  const hasErrors = Object.keys(errors).length > 0;
  return [hasErrors, errors];
}

export function validateBookData(data) {
  let errors = {};
  if (!body.title) {
    errors.title = "A name is required";
    return NextResponse.json({
      status: 400,
    });
  }

  if (!data.author) {
    errors.author = "An author is required";
  }
  if (!data.year || !Number(data.year)) {
    errors.year = "You must enter a valid year in numbers";
  }
  if (!ProductCategory.isCategory(data.genre)) {
    errors.genre = "You need to enter a valid category";
  }

  const hasErrors = Object.keys(errors).length > 0;
  return [hasErrors, errors];
}

export function getIdFromUrl(url) {
  const { pathname } = new URL(url);
  const startIndexOfId = pathname.substring(pathname.lastIndexOf("/") + 1);

  if (!startIndexOfId) {
    return "";
  }

  return startIndexOfId;
}

export function object404Respsonse(response, model = "") {
  return response.json(
    {
      message: `${model} not found`,
    },
    {
      status: 404,
    }
  );
}
