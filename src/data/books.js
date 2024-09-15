export class BookGenre {
  static FANTASY = "fantasy";
  static CLASSIC = "classic";
  static BIOGRAPHY = "biography";
  static NOVEL = "novel";

  static genre = [this.FANTASY, this.CLASSIC, this.BIOGRAPHY, this.NOVEL];

  static isGenre(genre = "") {
    return this.genre.includes(genre);
  }
}

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genre: "Fiction",
    keywords: ["classic", "love", "money"],
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    genre: "Fiction",
    keywords: ["classic", "racism", "law"],
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "Fiction",
    keywords: ["classic", "dystopian", "surveillance"],
  },
  {
    id: 4,
    title: "Lord of the rings",
    author: "J.R.R. Tolkien",
    year: 1954,
    genre: "Fantasy",
    keywords: ["classic", "adventure", "elves"],
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    genre: "Fantasy",
    keywords: ["classic", "adventure", "dragons"],
  },
  {
    id: 6,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
    genre: "Fiction",
    keywords: ["classic", "coming of age", "angst"],
  },
  {
    id: 7,
    title: "Twilight",
    author: "Stephenie Meyer",
    year: 2005,
    genre: "Fantasy",
    keywords: ["vampires", "romance", "teen"],
  },
];

export default books;
