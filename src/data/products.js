export class ProductCategory {
  static VEGETABLE = "vegetable";
  static SAUCE = "sauce";

  static categories = [this.VEGETABLE, this.SAUCE];

  static isCategory(category = "") {
    return this.categories.includes(category);
  }
}

const products = [
  {
    name: "Potato",
    price: 10,
    id: 1,
    description:
      "It's a potato. Contains all the nutrients you need to survive, except 'Vitamin C'.",
    category: ProductCategory.VEGETABLE,
  },
  {
    name: "Cucumber",
    price: 15,
    id: 2,
    description: "It's a cucumber. Contains nothing but water.",
    category: ProductCategory.VEGETABLE,
  },
  {
    name: "Cucumber Sauce",
    price: 25,
    id: 3,
    description: "It's a sauce. Made of cucumber.",
    category: ProductCategory.SAUCE,
  },
  {
    name: "Salad Sauce",
    price: 30,
    id: 4,
    description: "It's a sauce. Made of different salads.",
    category: ProductCategory.SAUCE,
  },
];

export default products;
