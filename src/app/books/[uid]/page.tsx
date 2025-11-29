import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";
import Image from "next/image";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";

type Params = { uid: string };

// Temporary interface until Slice Machine generates proper types
interface BookData {
  title: any;
  author: string;
  isbn: string;
  description: any;
  excerpt: any;
  cover_image: { url: string };
  gallery: Array<{ image: { url: string }; caption: string }>;
  amazon_url: { url: string };
  category: string;
  tags: Array<{ tag: string }>;
  editor_notes: any;
  reviews: Array<{
    reviewer_name: string;
    rating: number;
    comment: any;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  // @ts-ignore - Book type will be generated after Slice Machine sync
  const book = await client.getByUID("book", uid).catch(() => notFound());
  const bookData = book.data as unknown as BookData;

  return {
    title: `${asText(bookData.title)} by ${bookData.author} - Maybridge Publishing`,
    description: asText(bookData.excerpt) || `${asText(bookData.title)} by ${bookData.author} - Educational book available from Maybridge Publishing`,
    openGraph: {
      title: `${asText(bookData.title)} by ${bookData.author}`,
      description: asText(bookData.excerpt) || undefined,
      images: [{ 
        url: bookData.cover_image.url || "",
        width: 600,
        height: 800,
        alt: `Cover of ${asText(bookData.title)}`
      }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${asText(bookData.title)} by ${bookData.author}`,
      description: asText(bookData.excerpt) || undefined,
      images: [bookData.cover_image.url || ""],
    },
    alternates: {
      canonical: `https://maybridgepublishing.com/books/${uid}`,
    },
  };
}

export default async function BookPage({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  // @ts-ignore - Book type will be generated after Slice Machine sync
  const book = await client.getByUID("book", uid).catch(() => notFound());
  const bookData = book.data as unknown as BookData;

  // Get related books from same category
  let relatedBooks: any[] = [];
  if (bookData.category) {
    try {
      // @ts-ignore - Book type will be generated after Slice Machine sync
      relatedBooks = await client.getAllByType("book", {
        filters: [
          "at(my.book.category, \"" + bookData.category + "\")"
        ],
        limit: 4, // Get 4 to exclude current book later
      }).then(books => books.filter(relatedBook => relatedBook.id !== book.id).slice(0, 3));
    } catch (error) {
      console.log("Error fetching related books:", error);
      relatedBooks = [];
    }
  }

  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case 'primary':
        return 'Primary Level Readers';
      case 'junior-high':
        return 'Junior High Fiction';
      case 'senior-high':
        return 'Senior High Fiction';
      default:
        return category;
    }
  };

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": asText(bookData.title),
    "author": {
      "@type": "Person",
      "name": bookData.author
    },
    "isbn": bookData.isbn,
    "description": asText(bookData.description),
    "genre": getCategoryDisplayName(bookData.category || ''),
    "image": bookData.cover_image.url,
    "publisher": {
      "@type": "Organization",
      "name": "Maybridge Publishing USA"
    },
    "offers": bookData.amazon_url.url ? {
      "@type": "Offer",
      "url": bookData.amazon_url.url,
      "seller": {
        "@type": "Organization",
        "name": "Amazon"
      },
      "availability": "https://schema.org/InStock"
    } : undefined
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Breadcrumbs */}
      <Bounded>
        <nav className="mb-8 text-sm text-gray-600">
          <ol className="flex space-x-2">
            <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><Link href="/#books" className="hover:text-gray-900">Books</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><Link href={`/#${bookData.category}`} className="hover:text-gray-900">
              {getCategoryDisplayName(bookData.category || '')}
            </Link></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-900 font-medium">{asText(bookData.title)}</li>
          </ol>
        </nav>
      </Bounded>

      {/* Hero Section */}
      <Bounded>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Cover Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md">
              <Image
                src={bookData.cover_image.url || ""}
                alt={`Cover of ${asText(bookData.title)}`}
                width={400}
                height={600}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          
          {/* Book Information */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full mb-4">
                {getCategoryDisplayName(bookData.category || '')}
              </span>
              <Heading as="h1" className="mb-2">
                <PrismicRichText field={bookData.title} />
              </Heading>
              <p className="text-xl text-gray-600 mb-4">by {bookData.author}</p>
              {bookData.isbn && (
                <p className="text-sm text-gray-500">ISBN: {bookData.isbn}</p>
              )}
            </div>

            {/* Excerpt */}
            {bookData.excerpt && (
              <div className="prose prose-lg text-gray-700">
                <PrismicRichText field={bookData.excerpt} />
              </div>
            )}

            {/* Tags */}
            {bookData.tags && bookData.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {bookData.tags.map((tagItem, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                    >
                      {tagItem.tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Purchase Section */}
            {bookData.amazon_url.url && (
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Purchase This Book</h3>
                <Link
                  href={bookData.amazon_url.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Buy on Amazon
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Bounded>

      {/* Description Section */}
      {bookData.description && (
        <Bounded>
          <div className="mb-16">
            <Heading as="h2" size="lg" className="mb-6">
              About This Book
            </Heading>
            <div className="prose prose-lg max-w-none">
              <PrismicRichText field={bookData.description} />
            </div>
          </div>
        </Bounded>
      )}

      {/* Gallery Section */}
      {bookData.gallery && bookData.gallery.length > 0 && (
        <Bounded>
          <div className="mb-16">
            <Heading as="h2" size="lg" className="mb-6">
              Gallery
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookData.gallery.map((item, index) => (
                <div key={index} className="space-y-2">
                  <Image
                    src={item.image.url || ""}
                    alt={item.caption || `Gallery image ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {item.caption && (
                    <p className="text-sm text-gray-600 text-center">{item.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Bounded>
      )}

      {/* Editor Notes */}
      {bookData.editor_notes && (
        <Bounded>
          <div className="mb-16 bg-gray-50 p-8 rounded-lg">
            <Heading as="h2" size="lg" className="mb-6">
              Editor's Notes
            </Heading>
            <div className="prose prose-lg max-w-none">
              <PrismicRichText field={bookData.editor_notes} />
            </div>
          </div>
        </Bounded>
      )}

      {/* Reviews Section */}
      {bookData.reviews && bookData.reviews.length > 0 && (
        <Bounded>
          <div className="mb-16">
            <Heading as="h2" size="lg" className="mb-6">
              Reviews
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookData.reviews.map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < (review.rating || 0)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      by {review.reviewer_name}
                    </span>
                  </div>
                  <div className="prose prose-sm">
                    <PrismicRichText field={review.comment} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Bounded>
      )}

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <Bounded>
          <div className="mb-16">
            <Heading as="h2" size="lg" className="mb-6">
              More {getCategoryDisplayName(bookData.category || '')} Books
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBooks.map((relatedBook) => {
                const relatedBookData = relatedBook.data as unknown as BookData;
                return (
                  <Link
                    key={relatedBook.id}
                    href={`/books/${relatedBook.uid}`}
                    className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border"
                  >
                    <div className="aspect-[3/4] mb-4">
                      <Image
                        src={relatedBookData.cover_image.url || ""}
                        alt={`Cover of ${asText(relatedBookData.title)}`}
                        width={200}
                        height={300}
                        className="w-full h-full object-cover rounded"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                      {asText(relatedBookData.title)}
                    </h3>
                    <p className="text-gray-600">by {relatedBookData.author}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </Bounded>
      )}

      {/* Social Sharing */}
      <Bounded>
        <div className="border-t pt-8">
          <h3 className="text-lg font-semibold mb-4">Share This Book</h3>
          <div className="flex space-x-4">
            <Link
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `${asText(bookData.title)} by ${bookData.author}`
              )}&url=${encodeURIComponent(
                `https://maybridgepublishing.com/books/${uid}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              Twitter
            </Link>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                `https://maybridgepublishing.com/books/${uid}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Link>
          </div>
        </div>
      </Bounded>
    </>
  );
}

export async function generateStaticParams() {
  const client = createClient();
  // @ts-ignore - Book type will be generated after Slice Machine sync
  const books = await client.getAllByType("book");

  return books.map((book) => {
    return { uid: book.uid };
  });
}