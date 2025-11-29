import * as prismic from '@prismicio/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function checkBooks() {
  try {
    console.log('📚 Checking books in Prismic CMS...\n');
    
    // Create read client
    const repositoryName = process.env.PRISMIC_REPOSITORY_NAME || 'maybridgepublishing';
    const accessToken = process.env.PRISMIC_ACCESS_TOKEN;
    
    const client = prismic.createClient(repositoryName, {
      accessToken: accessToken
    });
    
    // Fetch all books
    const allBooks = await client.getAllByType('book');
    console.log(`📊 Total books found: ${allBooks.length}`);
    
    if (allBooks.length === 0) {
      console.log('❌ No books found in Prismic CMS');
      return;
    }
    
    // Group by category
    const categories = {};
    allBooks.forEach(book => {
      const category = book.data.category || 'uncategorized';
      if (!categories[category]) categories[category] = [];
      categories[category].push(book);
    });
    
    console.log('\n📂 Books by category:');
    Object.keys(categories).sort().forEach(cat => {
      console.log(`   ${cat}: ${categories[cat].length} books`);
    });
    
    // Verify expected categories exist
    const expectedCategories = ['primary', 'junior-high', 'senior-high'];
    console.log('\n✅ Category verification:');
    expectedCategories.forEach(expected => {
      const found = categories[expected];
      if (found) {
        console.log(`   ✅ ${expected}: ${found.length} books found`);
      } else {
        console.log(`   ❌ ${expected}: No books found`);
      }
    });
    
    // Show sample books from each category
    console.log('\n📖 Sample books per category:');
    Object.keys(categories).sort().forEach(cat => {
      console.log(`\n${cat.toUpperCase()}:`);
      categories[cat].slice(0, 5).forEach((book, i) => {
        const title = book.data.title?.[0]?.text || book.data.title || 'Untitled';
        const author = book.data.author || 'Unknown';
        console.log(`   ${i+1}. "${title}" by ${author}`);
      });
      if (categories[cat].length > 5) {
        console.log(`   ... and ${categories[cat].length - 5} more`);
      }
    });
    
    // Debug: Show raw data structure of first book
    if (allBooks.length > 0) {
      console.log('\n🔍 DEBUG - First 3 books:');
      for (let i = 0; i < Math.min(3, allBooks.length); i++) {
        const book = allBooks[i];
        console.log(`\nBook ${i+1}:`);
        console.log('  ID:', book.id);
        console.log('  UID:', book.uid); 
        console.log('  Title:', book.data.title);
        console.log('  Author:', book.data.author);
        console.log('  Category:', book.data.category);
        console.log('  Has pages field:', 'pages' in book.data);
      }
    }
    
  } catch (error) {
    console.error('❌ Error fetching books:', error.message);
  }
}

checkBooks();