import * as prismic from '@prismicio/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testSingleUpdate() {
  try {
    console.log('🧪 Testing single book update...\n');
    
    const client = prismic.createWriteClient('maybridgepublishing', {
      writeToken: process.env.PRISMIC_ACCESS_TOKEN
    });
    
    // Get all books
    const books = await client.getAllByType('book');
    console.log(`📚 Found ${books.length} books`);
    
    if (books.length > 0) {
      const firstBook = books[0];
      console.log(`🔍 Testing with book: ${firstBook.uid}`);
      console.log(`   Current title:`, firstBook.data.title);
      console.log(`   Current author:`, firstBook.data.author);
      console.log(`   Current category:`, firstBook.data.category);
      
      const migration = prismic.createMigration();
      
      // Try a simple update with correct API including UID
      migration.updateDocument({
        id: firstBook.id,
        type: 'book',
        uid: firstBook.uid,
        lang: firstBook.lang || 'en-us',
        data: {
          title: [{ type: 'heading1', text: "Test Book Title", spans: [] }],
          author: "Test Author",
          category: "primary"
        }
      });
      
      console.log('\n🔄 Attempting migration...');
      
      await client.migrate(migration, {
        reporter: (event) => {
          console.log(`📝 Event: ${event.type}`, event.data);
        }
      });
      
      console.log('✅ Test update successful!');
      
    } else {
      console.log('❌ No books found to test with');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error details:', error);
    
    if (error.response?.details) {
      console.log('\n🔍 Validation details:');
      error.response.details.forEach((detail, i) => {
        console.log(`  ${i + 1}.`, detail);
      });
    }
  }
}

testSingleUpdate();