import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env.local') });

interface Book {
  title: string;
  author: string;
  description: string;
  pages: number;
  category: string;
}

function parseCatalogue(content: string): Book[] {
  const books: Book[] = [];
  const lines = content.split('\n');
  let currentCategory = '';

  for (const line of lines) {
    if (line.startsWith('## ')) {
      currentCategory = line.replace('## ', '').replace(' Level Readers', '').replace(' Fiction', '');
    } else if (line.match(/^\d+\. \*\*.*\*\* - .*/)) {
      const match = line.match(/^\d+\. \*\*(.*)\*\* - (.*)/);
      if (match) {
        const title = match[1];
        const author = match[2];
        // Next line is description
        const descIndex = lines.indexOf(line) + 1;
        let description = '';
        let pages = 0;
        if (descIndex < lines.length) {
          description = lines[descIndex].trim();
          // Next line might be Pages
          const pagesIndex = descIndex + 1;
          if (pagesIndex < lines.length && lines[pagesIndex].startsWith('Pages:')) {
            pages = parseInt(lines[pagesIndex].replace('Pages: ', ''));
          }
        }
        books.push({
          title,
          author,
          description,
          pages,
          category: currentCategory
        });
      }
    }
  }
  return books;
}

async function createDocument(book: Book, token: string) {
  const url = 'https://maybridgepublishing.prismic.io/api/v2/documents';
  const data = {
    type: 'book',
    data: {
      title: book.title,
      author: book.author,
      description: book.description,
      excerpt: book.description.substring(0, 150) + '...',
      category: book.category,
      tags: [],
      editor_notes: '',
      reviews: [],
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'repository': 'maybridgepublishing'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Failed to create document: ${response.statusText}`);
  }

  return response.json();
}

async function importBooks() {
  const token = process.env.PRISMIC_ACCESS_TOKEN;
  if (!token) {
    throw new Error('PRISMIC_ACCESS_TOKEN not set');
  }

  const cataloguePath = path.join(__dirname, '../../docs/prd/books-catalogue.md');
  const content = fs.readFileSync(cataloguePath, 'utf-8');
  const books = parseCatalogue(content);

  console.log(`Found ${books.length} books to import`);

  for (const book of books) {
    try {
      const result = await createDocument(book, token);
      console.log(`Created book: ${book.title}`);
    } catch (error) {
      console.error(`Error creating book ${book.title}:`, error);
    }
  }
}

importBooks().catch(console.error);