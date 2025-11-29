import * as prismic from '@prismicio/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Test with just one book to diagnose the issue
const testBook = {
  title: "Cooking with Mama",
  mainCharacter: "Akosua", 
  description: "Every Saturday, Ama helps her mother sell kenkey and fish. But when Mama Akosua enters a regional cooking competition, Ama becomes her biggest cheerleader and kitchen partner, learning about resilience, creativity, and the flavours of Ghana that bring people together.",
  pages: 100,
  category: "primary"
};

async function testImport() {
  console.log('🧪 Testing Prismic import with single book...\n');
  
  try {
    // Test 1: Try with access token as write token
    console.log('📝 Test 1: Using access token as write token');
    const writeClient = prismic.createWriteClient('maybridgepublishing', {
      writeToken: process.env.PRISMIC_ACCESS_TOKEN
    });
    
    const migration = prismic.createMigration();
    
    migration.createDocument({
      type: 'book',
      uid: 'cooking-with-mama-test',
      lang: 'en-us',
      tags: ['Ghana', 'Young Adult', 'primary'],
      data: {
        title: [{ type: 'heading1', text: testBook.title, spans: [] }],
        author: testBook.mainCharacter,
        isbn: '978-1234567890',
        description: [{ type: 'paragraph', text: testBook.description, spans: [] }],
        excerpt: [{ type: 'paragraph', text: testBook.description.substring(0, 100) + '...', spans: [] }],
        category: testBook.category,
        editor_notes: [{
          type: 'paragraph',
          text: `This ${testBook.pages}-page book is part of the Maybridge Publishing USA collection.`,
          spans: []
        }],
        pages: testBook.pages
      }
    }, testBook.title);
    
    await writeClient.migrate(migration, {
      reporter: (event) => {
        console.log(`   📊 ${event.type}:`, JSON.stringify(event.data, null, 2));
      }
    });
    
    console.log('✅ Test 1: SUCCESS - Import worked with access token!');
    
  } catch (error) {
    console.log(`❌ Test 1: FAILED - ${error.message}`);
    
    // Test 2: Check if it's an authentication issue vs custom type issue
    if (error.message.includes('custom type')) {
      console.log('\n🔍 Diagnosis: Custom type "book" does not exist in Prismic');
      console.log('💡 Solution: Create the custom type first via Prismic interface or Slice Machine');
    } else if (error.message.includes('token') || error.message.includes('auth')) {
      console.log('\n🔍 Diagnosis: Authentication issue - need proper write token');
      console.log('💡 Solution: Get a write token from Prismic API & Security settings');
    } else {
      console.log('\n🔍 Unexpected error:', error);
    }
  }
  
  // Test 3: Check if we can read content (this should work with access token)
  try {
    console.log('\n📖 Test 2: Testing read access');
    const readClient = prismic.createClient('maybridgepublishing', {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    });
    
    const response = await readClient.getAllByType('book', { limit: 1 });
    console.log(`✅ Test 2: SUCCESS - Can read content, found ${response.length} existing books`);
    
  } catch (error) {
    console.log(`❌ Test 2: FAILED - ${error.message}`);
  }
}

// Run the test
testImport().catch(console.error);