import * as prismic from '@prismicio/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// First few books to test with
const testBooks = [
  {
    uid: "cooking-with-mama",
    title: "Cooking with Mama",
    author: "Akosua",
    description: "Every Saturday, Ama helps her mother sell kenkey and fish. But when Mama Akosua enters a regional cooking competition, Ama becomes her biggest cheerleader and kitchen partner, learning about resilience, creativity, and the flavours of Ghana that bring people together.",
    pages: 100,
    category: "primary"
  },
  {
    uid: "the-treasure-of-lake-nyasa",
    title: "The Treasure of Lake Nyasa",
    author: "Three Ghanaian cousins",
    description: "Three Ghanaian cousins follow an ancient map from their grandmother's trunk on a dangerous quest through forests, rivers, and caves, racing against a rival hunter to discover that the real treasure lies in friendship and shared experiences rather than gold.",
    pages: 93,
    category: "primary"
  }
];

async function updateBooksOneByOne() {
  try {
    console.log('🔄 Updating books one by one...\n');
    
    const client = prismic.createWriteClient('maybridgepublishing', {
      writeToken: process.env.PRISMIC_ACCESS_TOKEN
    });
    
    // Get all books
    const existingBooks = await client.getAllByType('book');
    console.log(`📚 Found ${existingBooks.length} books\n`);
    
    // Create a map
    const existingBooksMap = {};
    existingBooks.forEach(book => {
      existingBooksMap[book.uid] = book;
    });
    
    let successful = 0;
    let failed = 0;
    
    for (const bookData of testBooks) {
      const existingBook = existingBooksMap[bookData.uid];
      
      if (!existingBook) {
        console.log(`⏸️  Skipping ${bookData.uid} - not found`);
        continue;
      }
      
      try {
        console.log(`🔄 Updating: ${bookData.title}`);
        
        const migration = prismic.createMigration();
        
        migration.updateDocument({
          id: existingBook.id,
          type: 'book',
          uid: existingBook.uid,
          lang: existingBook.lang || 'en-us',
          data: {
            title: [{ type: 'heading1', text: bookData.title, spans: [] }],
            author: bookData.author,
            category: bookData.category,
            description: [{ type: 'paragraph', text: bookData.description, spans: [] }]
          }
        });
        
        await client.migrate(migration, {
          reporter: (event) => {
            if (event.type === 'documents:updated') {
              console.log(`  ✅ Updated successfully`);
            }
          }
        });
        
        successful++;
        
      } catch (error) {
        console.error(`  ❌ Failed to update ${bookData.title}:`, error.message);
        failed++;
      }
      
      // Small delay between updates
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log(`\n📊 Results:`);
    console.log(`   ✅ Successful: ${successful}`);
    console.log(`   ❌ Failed: ${failed}`);
    
  } catch (error) {
    console.error('💥 Script failed:', error);
  }
}

updateBooksOneByOne();