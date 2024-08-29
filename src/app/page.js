export default async function Home() {
  const books = await fetch("http://localhost:3000/api/books/").then(
    (response) => response.json()
  );

  console.log("BOOKS", books);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      BACKEND
    </main>
  );
}
