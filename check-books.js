const { createClient } = require('./src/prismicio');

const client = createClient();

async function checkBooks() {
  try {
    console.log('Fetching all books from Prismic...\n');
    
    // @ts-ignore - Book type will be generated after Slice Machine sync
    const allBooks = await client.getAllByType('book');
    console.log(`Total books found: ${allBooks.length}`);
    
    if (allBooks.length === 0) {
      console.log('No books found in Prismic CMS');
      return;
    }
    
    // Group by category
    const categories = {};
    allBooks.forEach(book => {
      const category = book.data.category || 'uncategorized';
      if (!categories[category]) categories[category] = [];
      categories[category].push(book);
    });
    
    console.log('\nBooks by category:');
    Object.keys(categories).forEach(cat => {
      console.log(`${cat}: ${categories[cat].length} books`);
    });
    
    // Show sample books from each category
    console.log('\nSample books per category:');
    Object.keys(categories).forEach(cat => {
      console.log(`\n${cat.toUpperCase()}:`);
      categories[cat].slice(0, 5).forEach((book, i) => {
        const title = book.data.title?.[0]?.text || book.data.title || 'Untitled';
        const author = book.data.author || 'Unknown';
        console.log(`  ${i+1}. "${title}" by ${author}`);
      });
      if (categories[cat].length > 5) {
        console.log(`  ... and ${categories[cat].length - 5} more`);
      }
    });
    
    // Verify expected categories exist
    const expectedCategories = ['primary', 'junior', 'senior'];
    console.log('\nCategory verification:');
    expectedCategories.forEach(expected => {
      const found = categories[expected];
      if (found) {
        console.log(`✅ ${expected}: ${found.length} books found`);
      } else {
        console.log(`❌ ${expected}: No books found`);
      }
    });
    
  } catch (error) {
    console.error('Error fetching books:', error.message);
  }
}

checkBooks();