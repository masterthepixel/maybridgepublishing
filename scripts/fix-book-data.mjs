import * as prismic from '@prismicio/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Book data from the original source
const bookData = [
  {
    uid: "cooking-with-mama",
    title: "Cooking with Mama",
    author: "Akosua",
    category: "primary"
  },
  {
    uid: "grandpas-secret-stories", 
    title: "Grandpa's Secret Stories",
    author: "Afi",
    category: "primary"
  },
  {
    uid: "my-embarrassing-big-brother",
    title: "My Embarrassing Big Brother", 
    author: "Kwesi",
    category: "primary"
  },
  // Add more books as needed...
];

async function fixBookData() {
  console.log('🔧 Fixing book data in Prismic...\n');
  
  try {
    // Create write client
    const client = prismic.createWriteClient('maybridgepublishing', {
      writeToken: process.env.PRISMIC_ACCESS_TOKEN
    });
    
    // Get all books
    const allBooks = await client.getAllByType('book');
    console.log(`📚 Found ${allBooks.length} books to update\n`);
    
    // For now, let's just update a few test books manually
    const migration = prismic.createMigration();
    
    // Find the first book and update it as a test
    if (allBooks.length > 0) {
      const firstBook = allBooks[0];
      console.log(`🔄 Updating book: ${firstBook.uid}`);
      
      migration.updateDocument(firstBook.id, {
        title: [{ type: 'heading1', text: "Test Book Title", spans: [] }],
        author: "Test Author",
        category: "primary",
        description: [{ type: 'paragraph', text: "This is a test description.", spans: [] }]
      });
    }
    
    // Execute migration
    await client.migrate(migration, {
      reporter: (event) => {
        console.log(`📝 ${event.type}: ${event.data?.title || 'Document updated'}`);
      }
    });
    
    console.log('✅ Book data update completed!');
    
  } catch (error) {
    console.error('❌ Error updating book data:', error.message);
  }
}

fixBookData();