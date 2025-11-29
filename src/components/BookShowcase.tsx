import { createClient } from "@/prismicio";
import { BookCard } from "./BookCard";

export async function BookShowcase() {
  const client = createClient();

  // @ts-ignore - Book type will be generated after Slice Machine sync
  const books = await client.getAllByType("book", {
    orderings: [{ field: "my.book.title", direction: "asc" }],
  });

  // Filter books by tags instead of category field since that's where the data is
  const primaryBooks = books.filter((book: any) => book.tags?.includes("primary"));
  const juniorHighBooks = books.filter((book: any) => book.tags?.includes("junior-high"));
  const seniorHighBooks = books.filter((book: any) => book.tags?.includes("senior-high"));

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Books</h2>
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Primary Level Readers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {primaryBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6">Junior High Fiction</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {juniorHighBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6">Senior High Fiction</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {seniorHighBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}