import * as prismic from '@prismicio/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

console.log('🔧 Debug migration test...');

const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT;
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

try {
  const client = prismic.createClient(repositoryName, {
    accessToken: accessToken,
  });

  console.log('📚 Fetching a book to test...');
  const books = await client.getAllByType('book', { pageSize: 1 });
  const book = books[0];

  console.log(`📖 Found book: ${book.uid}`);
  console.log(`   Current title:`, book.data.title);
  console.log(`   Current author:`, book.data.author);
  console.log(`   Current category:`, book.data.category);

  // Create migration
  const migration = prismic.createMigration();

  console.log('\n🔄 Adding updateDocument to migration...');
  
  const testTitle = [{ type: 'heading1', text: 'Test Title', spans: [] }];
  const testAuthor = 'Test Author';
  const testCategory = 'primary';

  console.log('Data to update:', {
    id: book.id,
    type: 'book',
    uid: book.uid,
    lang: book.lang,
    data: {
      title: testTitle,
      author: testAuthor,
      category: testCategory
    }
  });

  migration.updateDocument({
    id: book.id,
    type: 'book',
    uid: book.uid,
    lang: book.lang,
    data: {
      title: testTitle,
      author: testAuthor,
      category: testCategory
    }
  });

  console.log('\n🚀 Executing migration...');
  
  const result = await client.migrate(migration, {
    writeToken: accessToken,
  });

  console.log('✅ Migration result:', result);

  // Check if it worked
  console.log('\n🔍 Re-fetching book to check update...');
  const updatedBooks = await client.getAllByType('book', { 
    pageSize: 100,
    filters: [
      prismic.filter.at('my.book.uid', book.uid)
    ]
  });
  
  if (updatedBooks.length > 0) {
    const updatedBook = updatedBooks[0];
    console.log(`📖 Updated book check:`);
    console.log(`   Title:`, updatedBook.data.title);
    console.log(`   Author:`, updatedBook.data.author);
    console.log(`   Category:`, updatedBook.data.category);
  } else {
    console.log('❌ Could not find updated book');
  }

} catch (error) {
  console.error('❌ Debug test failed:', error);
  if (error.response?.data) {
    console.error('Response data:', JSON.stringify(error.response.data, null, 2));
  }
}