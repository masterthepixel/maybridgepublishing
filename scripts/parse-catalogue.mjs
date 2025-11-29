import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'docs', 'prd', 'extracted_text.txt');
const text = fs.readFileSync(filePath, 'utf-8');

// Split into sections
const sections = text.split('').filter(s => s.trim());

const books = [];

let currentCategory = '';

for (const section of sections) {
  const lines = section.split('\n').map(l => l.trim()).filter(l => l);

  if (lines.includes('PRIMARY LEVEL READERS')) {
    currentCategory = 'primary';
  } else if (lines.includes('JUNIOR HIGH FICTION')) {
    currentCategory = 'junior-high';
  } else if (lines.includes('SENIOR HIGH FICTION')) {
    currentCategory = 'senior-high';
  }

  if (currentCategory) {
    // Parse books in this section
    let i = 0;
    while (i < lines.length) {
      if (lines[i].includes('Pages:') && i > 0) {
        // Previous lines are title and description
        const pagesLine = lines[i];
        const pages = parseInt(pagesLine.split('Pages:')[1].trim());

        // Find title: the line before description
        let title = '';
        let description = '';
        let j = i - 1;
        while (j >= 0 && !lines[j].includes('Pages:')) {
          if (!title && lines[j].length < 100 && !lines[j].includes('Pages:')) {
            title = lines[j];
          } else if (title && !description) {
            description = lines[j];
          } else if (description) {
            description = lines[j] + ' ' + description;
          }
          j--;
        }

        if (title && description) {
          books.push({
            title,
            description,
            category: currentCategory,
            pages,
            author: 'Maybridge Publishing' // Placeholder
          });
        }
      }
      i++;
    }
  }
}

console.log(JSON.stringify(books, null, 2));