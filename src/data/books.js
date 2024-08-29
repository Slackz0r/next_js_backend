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
    title: "Lord of the Rings",
    author: "J.R.R. Tolkien",
    year: 1954,
    genre: "Fantasy",
  },
  {
    id: 2,
    title: "Shantaram",
    author: "Gregory David Roberts",
    year: 2001,
    genre: "Biography",
  },
  {
    id: 3,
    title: "Game of Thrones",
    author: "George R.R. Martin",
    year: 1998,
    genre: "Fantasy",
  },
  {
    id: 4,
    title: "Don Quijote",
    author: "Vintage Cervantes",
    year: 1642,
    genre: "Novel",
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1803,
    genre: "Classic",
  },
];

export default books;
