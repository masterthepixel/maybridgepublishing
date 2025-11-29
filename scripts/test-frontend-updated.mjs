import * as prismic from '@prismicio/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

console.log('🔍 Testing updated frontend logic...');

try {
  const client = prismic.createClient('maybridgepublishing', {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  console.log('📚 Fetching books with updated filtering...');
  const books = await client.getAllByType('book', {
    orderings: [{ field: 'my.book.title', direction: 'asc' }],
  });

  console.log(`📖 Total books found: ${books.length}`);

  // Filter books by tags (the new logic)
  const primaryBooks = books.filter((book) => book.tags?.includes('primary'));
  const juniorHighBooks = books.filter((book) => book.tags?.includes('junior-high'));
  const seniorHighBooks = books.filter((book) => book.tags?.includes('senior-high'));

  console.log('\n📂 Category breakdown (using tags):');
  console.log(`   Primary: ${primaryBooks.length} books`);
  console.log(`   Junior High: ${juniorHighBooks.length} books`);
  console.log(`   Senior High: ${seniorHighBooks.length} books`);

  // Show a sample of each category with their display titles
  console.log('\n📋 Sample books from each category:');
  
  if (primaryBooks.length > 0) {
    console.log('\n📚 Primary Level (first 3):');
    primaryBooks.slice(0, 3).forEach(book => {
      const displayTitle = book.data.title?.[0]?.text || 
        book.uid.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      console.log(`   - ${displayTitle} (${book.uid})`);
    });
  }

  if (juniorHighBooks.length > 0) {
    console.log('\n📚 Junior High (first 3):');
    juniorHighBooks.slice(0, 3).forEach(book => {
      const displayTitle = book.data.title?.[0]?.text || 
        book.uid.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      console.log(`   - ${displayTitle} (${book.uid})`);
    });
  }

  if (seniorHighBooks.length > 0) {
    console.log('\n📚 Senior High (first 3):');
    seniorHighBooks.slice(0, 3).forEach(book => {
      const displayTitle = book.data.title?.[0]?.text || 
        book.uid.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      console.log(`   - ${displayTitle} (${book.uid})`);
    });
  }

  console.log('\n✅ Frontend should now be displaying books correctly!');
  console.log('🌐 Visit http://localhost:3000 to see the books organized by category');

} catch (error) {
  console.error('❌ Frontend test failed:', error);
}