import * as prismic from '@prismicio/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

console.log('🏷️ Checking available tags and categories...');

try {
  const client = prismic.createClient('maybridgepublishing', {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  console.log('📚 Fetching all books to analyze tags...');
  const books = await client.getAllByType('book');
  
  console.log(`📖 Found ${books.length} books`);
  
  // Analyze what data is available
  const tagsSeen = new Set();
  const categoriesSeen = new Set();
  const titlesWithData = [];
  
  books.forEach(book => {
    // Check tags
    if (book.tags && book.tags.length > 0) {
      book.tags.forEach(tag => tagsSeen.add(tag));
    }
    
    // Check category field
    if (book.data.category) {
      categoriesSeen.add(book.data.category);
    }
    
    // Check if title has actual content
    if (book.data.title && book.data.title.length > 0) {
      titlesWithData.push({
        uid: book.uid,
        title: book.data.title,
        author: book.data.author,
        category: book.data.category,
        tags: book.tags
      });
    }
  });
  
  console.log('\n🏷️ Available tags:');
  Array.from(tagsSeen).sort().forEach(tag => {
    const count = books.filter(book => book.tags?.includes(tag)).length;
    console.log(`   ${tag}: ${count} books`);
  });
  
  console.log('\n📂 Available categories:');
  Array.from(categoriesSeen).sort().forEach(category => {
    const count = books.filter(book => book.data.category === category).length;
    console.log(`   ${category}: ${count} books`);
  });
  
  console.log('\n📚 Books with actual title content:');
  console.log(`   ${titlesWithData.length} books have title data`);
  
  if (titlesWithData.length > 0) {
    console.log('\n📋 Sample books with content:');
    titlesWithData.slice(0, 5).forEach(book => {
      console.log(`   ${book.uid}:`);
      console.log(`      Title: ${JSON.stringify(book.title)}`);
      console.log(`      Author: ${book.author}`);
      console.log(`      Category: ${book.category}`);
      console.log(`      Tags: ${JSON.stringify(book.tags)}`);
    });
  }
  
  // Check if we can use tags for categorization
  console.log('\n🔍 Tag-based categorization analysis:');
  const primaryTags = books.filter(book => book.tags?.includes('primary')).length;
  const juniorHighTags = books.filter(book => book.tags?.includes('junior-high')).length;
  const seniorHighTags = books.filter(book => book.tags?.includes('senior-high')).length;
  
  console.log(`   Books tagged 'primary': ${primaryTags}`);
  console.log(`   Books tagged 'junior-high': ${juniorHighTags}`);
  console.log(`   Books tagged 'senior-high': ${seniorHighTags}`);
  
  // Check raw document structure for one book
  if (books.length > 0) {
    console.log('\n📄 Raw document structure (first book):');
    console.log('   UID:', books[0].uid);
    console.log('   Tags:', books[0].tags);
    console.log('   Data keys:', Object.keys(books[0].data));
    console.log('   Full raw data:', JSON.stringify(books[0].data, null, 2));
  }

} catch (error) {
  console.error('❌ Tag analysis failed:', error);
}