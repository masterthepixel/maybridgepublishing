'use client';

import { createClient } from "@/prismicio";
import { BookCard } from "./BookCard";
import Book, { BookTitle } from './ui/Book';
import { ShoppingCart } from 'lucide-react';
import { bookDescriptions } from '@/data/bookDescriptions';
import Link from 'next/link';

export async function PrimaryBooksSection() {
  const client = createClient();

  const books = await client.getAllByType("book", {
    orderings: [{ field: "my.book.title", direction: "asc" }],
  });

  // Filter books by tags
  const primaryBooks = books.filter((book: any) => book.tags?.includes("primary"));

  return (
    <section id="primary-books" className="mb-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8 mb-8">
          <div>
            <div className="max-w-prose md:max-w-none">
              <h2 className="text-2xl font-semibold text-zinc-900 sm:text-3xl">
                Primary Level Readers
              </h2>
              <p className="mt-4 text-pretty text-zinc-700">
                Engaging stories designed for young readers, featuring colorful characters and meaningful lessons. These books help build foundational reading skills while introducing children to the rich culture and traditions of Ghana.
              </p>
            </div>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1160" className="rounded" alt="Primary level books" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          {primaryBooks.map((book) => (
            <div key={book.id} className="relative flex flex-col text-zinc-700 bg-white shadow-md bg-clip-border rounded-xl w-full max-w-sm mx-auto hover:shadow-lg transition-shadow">
              {/* 3D Book Image Area with gradient background */}
              <div className="relative mx-4 mt-4 overflow-visible text-zinc-700 bg-gradient-to-t from-white via-red-200/40 to-red-600/40 bg-clip-border rounded-xl min-h-[300px] flex items-center justify-center p-4" style={{
                background: 'linear-gradient(to top, #ffffff, rgba(254, 202, 202, 0.4), rgba(220, 38, 38, 0.4))'
              }}>
                <Link href={`/books/${book.uid || 'untitled'}`} className="block">
                  <Book 
                    size="lg" 
                    className=""
                    image={book.data.cover_image?.url ?? undefined}
                    color="blue"
                  >
                    <BookTitle className="text-white text-lg font-bold leading-tight">
                      {(book.uid || 'untitled')
                        .split('-')
                        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </BookTitle>
                  </Book>
                </Link>
              </div>
              
              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="block font-sans text-base antialiased font-bold leading-relaxed text-blue-gray-900">
                      {(book.uid || 'untitled')
                        .split('-')
                        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </p>
                    <span className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full mt-0">
                      Primary Level
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {(book.data.amazon_url as any)?.url ? (
                      <Link 
                        href={(book.data.amazon_url as any).url}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <div className="bg-green-500 p-1.5 rounded-full cursor-pointer hover:bg-green-600 transition-colors">
                          <ShoppingCart size={14} className="text-white" />
                        </div>
                      </Link>
                    ) : (
                      <div className="bg-green-500 p-1.5 rounded-full">
                        <ShoppingCart size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>                {/* Description */}
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-zinc-700 opacity-75 mt-4">
                  {bookDescriptions[book.uid || '']?.description || `Discover the captivating world of ${(book.uid || 'this book')
                    .split('-')
                    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}, a story that brings together adventure, culture, and life lessons in an engaging narrative perfect for readers seeking authentic African literature.`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}