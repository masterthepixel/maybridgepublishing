import * as prismic from '@prismicio/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testFetchBooks() {
  try {
    console.log('🔍 Testing book fetch for frontend...\n');
    
    // Create the same client that the frontend uses
    const repositoryName = process.env.PRISMIC_REPOSITORY_NAME || 'maybridgepublishing';
    const accessToken = process.env.PRISMIC_ACCESS_TOKEN;
    
    const client = prismic.createClient(repositoryName, {
      accessToken: accessToken
    });
    
    console.log(`📡 Using repository: ${repositoryName}`);
    console.log(`🔑 Using token: ${accessToken ? 'Token present' : 'No token'}\n`);
    
    // Try to fetch books the same way the frontend does
    console.log('📚 Fetching books with frontend query...');
    const books = await client.getAllByType("book", {
      orderings: [{ field: "my.book.title", direction: "asc" }],
    });
    
    console.log(`📊 Found ${books.length} books\n`);
    
    if (books.length > 0) {
      console.log('📖 Sample book data:');
      const sampleBook = books[0];
      console.log(`   ID: ${sampleBook.id}`);
      console.log(`   UID: ${sampleBook.uid}`);
      console.log(`   Title:`, sampleBook.data.title);
      console.log(`   Author:`, sampleBook.data.author);
      console.log(`   Category:`, sampleBook.data.category);
      console.log(`   Description:`, sampleBook.data.description);
      
      // Test the category filtering like BookShowcase does
      const primaryBooks = books.filter((book) => book.data.category === "primary");
      const juniorHighBooks = books.filter((book) => book.data.category === "junior-high");
      const seniorHighBooks = books.filter((book) => book.data.category === "senior-high");
      
      console.log('\n📂 Category breakdown:');
      console.log(`   Primary: ${primaryBooks.length} books`);
      console.log(`   Junior High: ${juniorHighBooks.length} books`);
      console.log(`   Senior High: ${seniorHighBooks.length} books`);
      
      if (primaryBooks.length > 0) {
        console.log('\n✅ Sample primary book:');
        const primary = primaryBooks[0];
        console.log(`   Title: ${primary.data.title?.[0]?.text || 'No title'}`);
        console.log(`   Author: ${primary.data.author || 'No author'}`);
        console.log(`   Category: ${primary.data.category || 'No category'}`);
      }
      
    } else {
      console.log('❌ No books found');
    }
    
  } catch (error) {
    console.error('💥 Error fetching books:', error.message);
    console.error('Full error:', error);
  }
}

testFetchBooks();