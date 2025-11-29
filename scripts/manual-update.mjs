import * as prismic from '@prismicio/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function manualUpdate() {
  try {
    console.log('🔧 Manual book update test...\n');
    
    const writeClient = prismic.createWriteClient('maybridgepublishing', {
      writeToken: process.env.PRISMIC_ACCESS_TOKEN
    });
    
    // Get the first book
    const books = await writeClient.getAllByType("book");
    const testBook = books[0];
    
    console.log(`📖 Updating book: ${testBook.uid}`);
    console.log(`   Current title: ${JSON.stringify(testBook.data.title)}`);
    console.log(`   Current author: ${testBook.data.author}`);
    console.log(`   Current category: ${testBook.data.category}`);
    
    // Try updating with the simplest possible data
    console.log('\n🔄 Attempting simple update...');
    
    const migration = prismic.createMigration();
    
    migration.updateDocument({
      id: testBook.id,
      type: 'book',
      uid: testBook.uid,
      lang: 'en-us',
      data: {
        title: [{ type: 'heading1', text: "The Treasure of Lake Nyasa", spans: [] }],
        author: "Three Ghanaian cousins",
        category: "primary"
      }
    });
    
    const result = await writeClient.migrate(migration, {
      reporter: (event) => {
        console.log(`📝 ${event.type}:`, event.data);
      }
    });
    
    console.log('\n✅ Migration completed');
    console.log('Result:', result);
    
    // Wait a moment and then check if it worked
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('\n🔍 Checking if update worked...');
    const updatedBooks = await writeClient.getAllByType("book");
    const updatedBook = updatedBooks.find(b => b.id === testBook.id);
    
    if (updatedBook) {
      console.log(`📖 Updated book check:`);
      console.log(`   Title: ${JSON.stringify(updatedBook.data.title)}`);
      console.log(`   Author: ${updatedBook.data.author}`);
      console.log(`   Category: ${updatedBook.data.category}`);
    }
    
  } catch (error) {
    console.error('💥 Manual update failed:', error);
    if (error.response) {
      console.error('Response:', error.response);
    }
  }
}

manualUpdate();