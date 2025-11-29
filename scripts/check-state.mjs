import * as prismic from '@prismicio/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function checkDocumentState() {
  try {
    console.log('🔍 Checking document state...\n');
    
    const client = prismic.createClient('maybridgepublishing', {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    });
    
    // Get a specific document we know was updated
    const books = await client.getAllByType("book");
    const testBook = books.find(b => b.uid === 'the-treasure-of-lake-nyasa');
    
    if (testBook) {
      console.log('📖 Test book found:');
      console.log(`   ID: ${testBook.id}`);
      console.log(`   UID: ${testBook.uid}`);
      console.log(`   Publication state: ${testBook.first_publication_date ? 'Published' : 'Draft'}`);
      console.log(`   Last updated: ${testBook.last_publication_date || 'Never published'}`);
      console.log(`   Data keys:`, Object.keys(testBook.data));
      
      console.log('\n📋 Raw data:');
      console.log('   Title:', JSON.stringify(testBook.data.title, null, 2));
      console.log('   Author:', JSON.stringify(testBook.data.author));
      console.log('   Category:', JSON.stringify(testBook.data.category));
      console.log('   Description length:', testBook.data.description?.length || 0);
      
    } else {
      console.log('❌ Test book not found');
    }
    
    // Try using the write client to see draft content
    console.log('\n🔧 Checking with write client...');
    const writeClient = prismic.createWriteClient('maybridgepublishing', {
      writeToken: process.env.PRISMIC_ACCESS_TOKEN
    });
    
    try {
      // The write client might show us draft content
      const writeBooks = await writeClient.getAllByType("book");
      console.log(`📚 Write client found: ${writeBooks.length} books`);
      
      if (writeBooks.length > 0) {
        const writeSample = writeBooks[0];
        console.log('\n📋 Write client sample:');
        console.log('   Title:', JSON.stringify(writeSample.data.title, null, 2));
        console.log('   Author:', writeSample.data.author);
        console.log('   Category:', writeSample.data.category);
      }
      
    } catch (writeError) {
      console.log('❌ Write client access failed:', writeError.message);
    }
    
  } catch (error) {
    console.error('💥 Error:', error.message);
  }
}

checkDocumentState();