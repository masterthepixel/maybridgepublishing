'use client';

import type { Content } from "@prismicio/client";
import Book, { BookTitle, BookButton } from './ui/Book';
import { ShoppingCart } from 'lucide-react';
import { bookDescriptions } from '@/data/bookDescriptions';

interface BookCardProps {
  // Using generic document type until Book types are generated
  book: any;
}

export function BookCard({ book }: BookCardProps) {
  // Get the category from tags
  const category = book.tags?.find((tag: string) => 
    ['primary', 'junior-high', 'senior-high'].includes(tag)
  ) || 'uncategorized';
  
  // Create a readable title from UID if no title exists
  const getDisplayTitle = () => {
    if (book.data.title?.[0]?.text) {
      return book.data.title[0].text;
    }
    if (book.data.title && typeof book.data.title === 'string') {
      return book.data.title;
    }
    // Convert UID to readable title as fallback
    return book.uid
      .split('-')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handlePurchase = () => {
    // Open Amazon link in new tab
    if (book.data.amazon_link?.url) {
      window.open(book.data.amazon_link.url, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback to Amazon search with book title
      const searchQuery = encodeURIComponent(getDisplayTitle());
      window.open(`https://amazon.com/s?k=${searchQuery}`, '_blank', 'noopener,noreferrer');
    }
  };

  const handleBookClick = () => {
    // Navigate to book detail page
    window.location.href = `/books/${book.uid}`;
  };

  // Get the actual book description from our data
  const bookData = bookDescriptions[book.uid];
  const description = bookData?.description || `Discover the captivating world of ${getDisplayTitle()}, a story that brings together adventure, culture, and life lessons in an engaging narrative perfect for readers seeking authentic African literature.`;

  return (
    <div className="relative flex flex-col text-zinc-700 bg-white shadow-md bg-clip-border rounded-xl w-full max-w-sm mx-auto">
      {/* 3D Book Image Area */}
      <div className="relative mx-4 mt-4 overflow-visible text-zinc-700 bg-gray-50 bg-clip-border rounded-xl min-h-[300px] flex items-center justify-center p-4">
        <div onClick={handleBookClick} className="cursor-pointer">
          <Book 
            size="lg" 
            className=""
            color="blue"
          >
            <BookTitle className="text-white text-lg font-bold leading-tight">
              {getDisplayTitle()}
            </BookTitle>
          </Book>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="block font-sans text-base antialiased font-bold leading-relaxed text-blue-gray-900">
            {category === 'primary' ? 'Primary Level' : 
             category === 'junior-high' ? 'Junior High' : 
             category === 'senior-high' ? 'Senior High' : 'Book'}
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
          <p className="block font-sans text-sm antialiased font-medium leading-relaxed text-zinc-600 mb-2">
            by {book.data.author}
          </p>
        )}
        
        {/* Description */}
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-zinc-700 opacity-75">
          {description}
        </p>
      </div>
    </div>
  );
}