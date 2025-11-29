import type { Content } from "@prismicio/client";

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

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="aspect-[3/4] bg-gray-200 flex items-center justify-center">
        {book.data.cover_image?.url ? (
          <img
            src={book.data.cover_image.url}
            alt={book.data.cover_image.alt || ""}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">Cover Image</span>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-lg mb-2 line-clamp-2">
          {getDisplayTitle()}
        </h4>
        <p className="text-sm text-gray-600 mb-2">
          by {book.data.author || 'Unknown Author'}
        </p>
        <p className="text-sm text-gray-500 mb-3 line-clamp-3">
          {book.data.excerpt?.[0]?.text || 
           book.data.description?.[0]?.text || 
           'A compelling story from our collection of African literature.'}
        </p>
        <div className="flex gap-1 flex-wrap">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {category}
          </span>
          {book.tags?.includes('Ghana') && (
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Ghana
            </span>
          )}
        </div>
      </div>
    </div>
  );
}