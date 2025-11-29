import * as prismic from '@prismicio/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Sample of book data to test with (matching the UIDs we saw)
const bookDataMap = {
  "the-treasure-of-lake-nyasa": {
    title: "The Treasure of Lake Nyasa",
    author: "Three Ghanaian cousins",
    category: "primary",
    description: "Three Ghanaian cousins follow an ancient map from their grandmother's trunk on a dangerous quest through forests, rivers, and caves, racing against a rival hunter to discover that the real treasure lies in friendship and shared experiences rather than gold.",
    pages: 93
  },
  "the-witch-doctors-apprentice": {
    title: "The Witch Doctor's Apprentice", 
    author: "A thirteen-year-old Ghanaian boy",
    category: "primary",
    description: "A thirteen-year-old Ghanaian boy becomes a witch doctor's apprentice to save his dying father and must resist dark power while battling supernatural forces and corruption, learning that true healing comes from community unity rather than individual strength.",
    pages: 84
  },
  "daughter-of-the-chief": {
    title: "Daughter of the Chief",
    author: "Afia Asante", 
    category: "junior-high",
    description: "Seventeen-year-old Afia Asante, torn between becoming her community's future queen mother and pursuing her passion for space science, must find a way to honour her heritage while following her dreams in a story that celebrates courage, identity, and the harmony between tradition and innovation.",
    pages: 164
  }
};

async function updateBooks() {
  try {
    console.log('🔄 Updating book data...\n');
    
    const client = prismic.createClient('maybridgepublishing', {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    });
    
    // Get all books 
    const books = await client.getAllByType('book');
    console.log(`📚 Found ${books.length} books\n`);
    
    // Show which books we can update
    books.forEach(book => {
      if (bookDataMap[book.uid]) {
        console.log(`✅ Can update: ${book.uid}`);
      } else {
        console.log(`⏸️  No data for: ${book.uid}`);
      }
    });
    
    console.log(`\n📊 Summary: Can update ${Object.keys(bookDataMap).length} out of ${books.length} books`);
    console.log('\n💡 To update the books, you would need write access to Prismic.');
    console.log('The books exist with proper UIDs but need content populated.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

updateBooks();