'use client';

import { createClient } from "@/prismicio";
import { BookCard } from "./BookCard";
import Book, { BookTitle } from './ui/Book';
import { ShoppingCart } from 'lucide-react';
import { bookDescriptions } from '@/data/bookDescriptions';

export async function JuniorHighBooksSection() {
  const client = createClient();

  // @ts-ignore - Book type will be generated after Slice Machine sync
  const books = await client.getAllByType("book", {
    orderings: [{ field: "my.book.title", direction: "asc" }],
  });

  // Filter books by tags
  const juniorHighBooks = books.filter((book: any) => book.tags?.includes("junior-high"));

  return (
    <>
      <section id="junior-high-books">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
            <div>
              <div className="max-w-prose md:max-w-none">
                <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                  Junior High Fiction
                </h2>
                <p className="mt-4 text-pretty text-gray-700">
                  Captivating stories that resonate with teenage readers, exploring themes of identity, friendship, and coming of age. These books tackle real-life challenges while celebrating African heritage and values.
                </p>
              </div>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1544717440-6baebeb963c4?auto=format&fit=crop&q=80&w=1160" className="rounded" alt="" />
            </div>
          </div>
        </div>
      </section>
      
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          {juniorHighBooks.map((book) => (
            <div key={book.id} className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full max-w-sm mx-auto">
              {/* 3D Book Image Area with gradient background */}
              <div className="relative mx-4 mt-4 overflow-visible text-gray-700 bg-gradient-to-t from-white via-yellow-200/40 to-yellow-500/40 bg-clip-border rounded-xl min-h-[300px] flex items-center justify-center p-4" style={{
                background: 'linear-gradient(to top, #ffffff, rgba(254, 240, 138, 0.4), rgba(234, 179, 8, 0.4))'
              }}>
                <div onClick={() => window.location.href = `/books/${book.uid || 'untitled'}`} className="cursor-pointer">
                  <Book 
                    size="lg" 
                    className=""
                    color="blue"
                  >
                    <BookTitle className="text-white text-lg font-bold leading-tight">
                      {(book.uid || 'untitled')
                        .split('-')
                        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </BookTitle>
                  </Book>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="block font-sans text-base antialiased font-bold leading-relaxed text-blue-gray-900">
                    Junior High
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="bg-green-500 p-1.5 rounded-full">
                      <ShoppingCart size={14} className="text-white" />
                    </div>
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-600">
                      Buy Now
                    </p>
                  </div>
                </div>
                
                {/* Author - only show if exists and is not default */}
                {book.data.author && book.data.author !== 'Maybridge Publishing Author' && (
                  <p className="block font-sans text-sm antialiased font-medium leading-relaxed text-gray-600 mb-2">
                    by {book.data.author}
                  </p>
                )}
                
                {/* Description */}
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
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
    </>
  );
}